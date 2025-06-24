// src/expense-tracker/SummaryChart.jsx
import React, { useState, useLayoutEffect, useRef, useMemo } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { gsap } from 'gsap';

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const SummaryChart = ({ expenses, debts, workDays }) => {
  const chartContainerRef = useRef(null);

  const [viewMode, setViewMode] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const allDates = [...expenses, ...debts, ...workDays].map(item => {
      // Đảm bảo item.date tồn tại trước khi tạo Date object
      return item.date ? new Date(item.date) : null;
  }).filter(date => date !== null); // Lọc bỏ các giá trị null

  const availableYears = useMemo(() => {
    const years = new Set(allDates.map(date => date.getFullYear()));
    // Bao gồm năm hiện tại nếu chưa có dữ liệu nào
    if (years.size === 0) {
        years.add(new Date().getFullYear());
    }
    return [...years].sort((a, b) => b - a);
  }, [allDates]);

  // Luôn hiển thị 12 tháng, cho phép chọn bất kỳ tháng nào trong năm được chọn
  const monthsInYear = Array.from({ length: 12 }, (_, i) => i + 1);

  // --- Logic tính toán dữ liệu cho biểu đồ và thông tin tóm tắt ---
  const { monthlyData, monthlySummaryText } = useMemo(() => {
    const filteredExpenses = expenses.filter(exp => {
      const date = new Date(exp.date);
      return date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
    });
    const filteredDebts = debts.filter(debt => {
      const date = new Date(debt.date);
      return date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
    });
    const filteredWorkDays = workDays.filter(work => {
      const date = new Date(work.date);
      return date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
    });

    const totalIncome = filteredWorkDays.reduce((sum, item) => sum + (item.income || 0), 0);
    const totalExpenses = filteredExpenses.reduce((sum, item) => sum + (item.amount || 0), 0);

    const debtsOwedList = {}; // { person: amount }
    const debtsOwedByOthersList = {}; // { person: amount }

    filteredDebts.forEach(debt => {
      if (debt.type === 'owe') {
        debtsOwedList[debt.person] = (debtsOwedList[debt.person] || 0) + (debt.amount || 0);
      } else if (debt.type === 'owed') {
        debtsOwedByOthersList[debt.person] = (debtsOwedByOthersList[debt.person] || 0) + (debt.amount || 0);
      }
    });

    const totalDebtsOwed = Object.values(debtsOwedList).reduce((sum, val) => sum + val, 0);
    const totalDebtsOwedByOthers = Object.values(debtsOwedByOthersList).reduce((sum, val) => sum + val, 0);

    const workDaysCount = filteredWorkDays.length;
    const expenseDaysCount = new Set(filteredExpenses.map(exp => exp.date)).size;

    // --- Biểu đồ Pie ---
    const pieChartData = {
      labels: ['Tổng Thu Nhập', 'Tổng Chi Tiêu', 'Tổng Nợ Phải Trả', 'Tổng Nợ Phải Thu'],
      datasets: [
        {
          data: [totalIncome, totalExpenses, totalDebtsOwed, totalDebtsOwedByOthers],
          backgroundColor: [
            'rgba(75, 192, 192, 0.7)', // Income (teal/green)
            'rgba(255, 99, 132, 0.7)', // Expenses (red)
            'rgba(255, 206, 86, 0.7)', // Debts Owe (yellow)
            'rgba(54, 162, 235, 0.7)', // Debts Owed (blue)
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) label += ': ';
                        if (context.parsed !== null) label += new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(context.parsed);
                        return label;
                    }
                }
            }
        }
    };

    // --- Thông tin tóm tắt dạng văn bản ---
    const summaryText = {
      workDaysCount: workDaysCount,
      expenseDaysCount: expenseDaysCount,
      debtsOwed: Object.entries(debtsOwedList).map(([person, amount]) =>
        `${person}: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}`
      ),
      debtsOwedByOthers: Object.entries(debtsOwedByOthersList).map(([person, amount]) =>
        `${person}: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}`
      ),
    };

    return { monthlyData: { pieChartData, pieChartOptions, hasData: Object.values({totalIncome, totalExpenses, totalDebtsOwed, totalDebtsOwedByOthers}).some(val => val > 0) }, monthlySummaryText: summaryText };
  }, [expenses, debts, workDays, selectedMonth, selectedYear]);

  // --- Logic tính toán dữ liệu cho biểu đồ BAR (dùng cho năm) ---
  const calculateYearlyData = useMemo(() => {
    const monthlySummary = {}; // { 'YYYY-MM': { income, expense, debtOwed, debtOwedByOthers } }

    const processItem = (item, type) => {
      const date = new Date(item.date);
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlySummary[yearMonth]) {
        monthlySummary[yearMonth] = { income: 0, expense: 0, debtOwed: 0, debtOwedByOthers: 0 };
      }

      if (type === 'expense') monthlySummary[yearMonth].expense += item.amount;
      else if (type === 'income') monthlySummary[yearMonth].income += item.income;
      else if (type === 'debtOwe') monthlySummary[yearMonth].debtOwed += item.amount;
      else if (type === 'debtOwedByOthers') monthlySummary[yearMonth].debtOwedByOthers += item.amount;
    };

    expenses.forEach(exp => processItem(exp, 'expense'));
    workDays.forEach(work => processItem(work, 'income'));
    debts.forEach(debt => processItem(debt, debt.type === 'owe' ? 'debtOwe' : 'debtOwedByOthers'));

    // Đảm bảo tất cả 12 tháng đều có trong labels, kể cả khi không có dữ liệu
    const sortedKeys = Array.from({length: 12}, (_, i) => `${selectedYear}-${String(i + 1).padStart(2, '0')}`);

    const labels = sortedKeys.map(key => `Tháng ${key.split('-')[1]}`);
    const incomes = sortedKeys.map(key => (monthlySummary[key] ? monthlySummary[key].income : 0));
    const expensesData = sortedKeys.map(key => (monthlySummary[key] ? monthlySummary[key].expense : 0));
    const debtsOwed = sortedKeys.map(key => (monthlySummary[key] ? monthlySummary[key].debtOwed : 0));
    const debtsOwedByOthers = sortedKeys.map(key => (monthlySummary[key] ? monthlySummary[key].debtOwedByOthers : 0));

    return { labels, incomes, expensesData, debtsOwed, debtsOwedByOthers };
  }, [expenses, debts, workDays, selectedYear]);


  // --- Dữ liệu và options cho biểu đồ hàng năm (Bar Chart) ---
  const yearlyChartData = useMemo(() => {
    const { labels, incomes, expensesData, debtsOwed, debtsOwedByOthers } = calculateYearlyData;
    return {
      labels: labels,
      datasets: [
        {
          label: 'Thu Nhập',
          data: incomes,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Chi Tiêu',
          data: expensesData,
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Nợ Phải Trả',
          data: debtsOwed,
          backgroundColor: 'rgba(255, 206, 86, 0.7)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
        },
        {
          label: 'Nợ Phải Thu',
          data: debtsOwedByOthers,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [calculateYearlyData]);

  const yearlyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Tháng',
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số tiền (VND)',
        },
        ticks: {
            callback: function(value) {
                return new Intl.NumberFormat('vi-VN').format(value);
            }
        }
      },
    },
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) label += new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(context.parsed.y);
            return label;
          }
        }
      }
    }
  };


  // GSAP Animation
  useLayoutEffect(() => {
    if (chartContainerRef.current) {
      gsap.fromTo(chartContainerRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.6 }
      );
    }
  }, [viewMode, selectedMonth, selectedYear, expenses, debts, workDays]);


  const hasYearlyData = calculateYearlyData.incomes.some(val => val > 0) || calculateYearlyData.expensesData.some(val => val > 0) || calculateYearlyData.debtsOwed.some(val => val > 0) || calculateYearlyData.debtsOwedByOthers.some(val => val > 0);

  return (
    <div className="w-full h-auto">
      <div className="flex justify-center items-center space-x-4 mb-6">
        <button
          onClick={() => setViewMode('monthly')}
          className={`px-4 py-2 rounded-md font-semibold ${viewMode === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Xem theo tháng
        </button>
        <button
          onClick={() => setViewMode('yearly')}
          className={`px-4 py-2 rounded-md font-semibold ${viewMode === 'yearly' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Xem theo năm
        </button>
      </div>

      <div className="flex justify-center items-center space-x-4 mb-6">
        <label htmlFor="selectYear" className="text-gray-700">Năm:</label>
        <select
          id="selectYear"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          {availableYears.length > 0 ? (
            availableYears.map(year => <option key={year} value={year}>{year}</option>)
          ) : (
            // Bao gồm năm hiện tại nếu không có năm nào trong dữ liệu
            <option key={new Date().getFullYear()} value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
          )}
        </select>

        {viewMode === 'monthly' && (
          <>
            <label htmlFor="selectMonth" className="text-gray-700">Tháng:</label>
            <select
              id="selectMonth"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {[...Array(12).keys()].map(i => (
                <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
              ))}
            </select>
          </>
        )}
      </div>

      <div ref={chartContainerRef} className="w-full h-80 flex items-center justify-center">
        {viewMode === 'monthly' && (
          monthlyData.hasData ? (
            <Pie data={monthlyData.pieChartData} options={monthlyData.pieChartOptions} />
          ) : (
            <p className="text-gray-500 text-center">Chưa có dữ liệu cho Tháng {selectedMonth}/{selectedYear}.</p>
          )
        )}

        {viewMode === 'yearly' && (
          hasYearlyData ? (
            <Bar data={yearlyChartData} options={yearlyChartOptions} />
          ) : (
            <p className="text-gray-500 text-center">Chưa có dữ liệu cho Năm {selectedYear}.</p>
          )
        )}
      </div>

      {/* THÔNG TIN TÓM TẮT DẠNG VĂN BẢN CHO CHẾ ĐỘ XEM THEO THÁNG */}
      {viewMode === 'monthly' && monthlyData.hasData && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
          <h4 className="text-lg font-semibold mb-3 text-gray-800">Tóm tắt tháng {selectedMonth}/{selectedYear}:</h4>
          <p className="text-gray-700">
            Bạn đã đi làm được **{monthlySummaryText.workDaysCount}** ngày.
          </p>
          <p className="text-gray-700">
            Bạn đã chi tiêu vào **{monthlySummaryText.expenseDaysCount}** ngày.
          </p>

          {monthlySummaryText.debtsOwed.length > 0 && (
            <div className="mt-3">
              <p className="text-gray-700 font-medium">Bạn nợ:</p>
              <ul className="list-disc list-inside text-red-600">
                {monthlySummaryText.debtsOwed.map((debt, index) => (
                  <li key={`owed-${index}`}>{debt}</li>
                ))}
              </ul>
            </div>
          )}

          {monthlySummaryText.debtsOwedByOthers.length > 0 && (
            <div className="mt-3">
              <p className="text-gray-700 font-medium">Người khác nợ bạn:</p>
              <ul className="list-disc list-inside text-green-600">
                {monthlySummaryText.debtsOwedByOthers.map((debt, index) => (
                  <li key={`owedby-${index}`}>{debt}</li>
                ))}
              </ul>
            </div>
          )}

          {!monthlySummaryText.debtsOwed.length && !monthlySummaryText.debtsOwedByOthers.length && (
              <p className="text-gray-700 mt-2">Không có khoản nợ nào trong tháng này.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SummaryChart;