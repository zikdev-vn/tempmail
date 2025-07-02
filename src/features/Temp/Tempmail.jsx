import React, { useState, useEffect, useRef, Suspense } from 'react';

import axios from 'axios';
import TrashIcon from '../../components/icons/TrashIcon';
import CopyIcon from '../../components/icons/CopyIcon';
import ArrowUpOn from '../../components/icons/ArrowUpOn';
import LoadingV2 from '../../components/icons/loadingV2';
import Button from "../../components/Button/Button"
import Refresh from '../../components/icons/Refresh';
import { gsap } from 'gsap';
import { useFadeUpOnMount ,useBlurScaleIn } from '../../hooks/useGsapAnimations';
import { createEmail, deleteEmail ,getEmails } from '../../services/tempmail/mailapi'; 

const TempMail = () => {
  const [tempEmail, setTempEmail] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null); // ✅ khai báo biến này
  const [showEmailEffect, setShowEmailEffect] = useState(true);
  const [loading, setLoading] = useState(true);
  const [emailHistory, setEmailHistory] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const [deletedEmail, setDeletedEmail] = useState(null);
  const itemRefs = useRef({});




  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(tempEmail);
    alert('Email đã được sao chép!');
  };



  const handleCreateEmail = async () => {
    try {
      setLoading(true);
      setTempEmail(null);
      const email = await createEmail();  // Gọi API tạo email
      const createdAt = Date.now();

      setTempEmail(email);
      localStorage.setItem("currentTempEmail", email);
      localStorage.setItem("currentTempEmailCreatedAt", createdAt);

      setMessages([]);
      setLoading(false);

      const oldEmails = JSON.parse(localStorage.getItem("emailHistory")) || [];
      const updatedEmails = [email, ...oldEmails.filter(e => e !== email)].slice(0, 20);
      localStorage.setItem("emailHistory", JSON.stringify(updatedEmails));
      setEmailHistory(updatedEmails);
    } catch (err) {
      console.error("Lỗi tạo email:", err);
      alert("Không thể tạo email.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!tempEmail) return;

    const createdAt = parseInt(localStorage.getItem("currentTempEmailCreatedAt") || "0", 10);
    const now = Date.now();
    const maxLife = 10 * 60 * 1000; // 10 phút
    const timeLeft = maxLife - (now - createdAt);

    if (timeLeft <= 0) {
      alert("Email tạm thời đã hết hạn!");
      localStorage.removeItem("currentTempEmail");
      localStorage.removeItem("currentTempEmailCreatedAt");
      setTempEmail(null);
      return;
    }

    setRemainingTime(timeLeft);

    let mailIntervalId;
    let countdownIntervalId;

    const startMailFetching = () => {
      if (!mailIntervalId) {
        mailIntervalId = setInterval(async () => {
          try {
            const inboxMessages = await getEmails(tempEmail);  // Gọi API lấy email
            setMessages(inboxMessages);
          } catch (err) {
            console.error("Lỗi khi lấy email:", err);
          }
        }, 5000);
      }
    };

    const stopMailFetching = () => {
      if (mailIntervalId) {
        clearInterval(mailIntervalId);
        mailIntervalId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startMailFetching();
      } else {
        stopMailFetching();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (document.visibilityState === "visible") {
      startMailFetching();
    }

    const timeoutId = setTimeout(() => {
      stopMailFetching();
      alert("Email tạm thời đã hết hạn!");
      setTempEmail(null);
      localStorage.removeItem("currentTempEmail");
      localStorage.removeItem("currentTempEmailCreatedAt");
    }, timeLeft);

    countdownIntervalId = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1000) {
          clearInterval(countdownIntervalId);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => {
      stopMailFetching();
      clearTimeout(timeoutId);
      clearInterval(countdownIntervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [tempEmail]);

  
  const handleDeleteEmail = async (emailToDelete) => {
    const confirmDelete = window.confirm(`Bạn có chắc muốn xóa email ${emailToDelete}?`);
    if (!confirmDelete) return;

    try {
      await deleteEmail(emailToDelete);  // Gọi API xóa email

      if (emailToDelete === tempEmail) {
        setTempEmail(null);
        setMessages([]);
        localStorage.removeItem("currentTempEmail");
        localStorage.removeItem("currentTempEmailCreatedAt");
      }

      const updatedHistory = emailHistory.filter((e) => e !== emailToDelete);
      localStorage.setItem("emailHistory", JSON.stringify(updatedHistory));
      setEmailHistory(updatedHistory);
    } catch (err) {
      console.error("Lỗi khi xóa email:", err);
      alert("Xóa email thất bại!");
    }
  };
    

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

const handleExtendEmail = (email) => {
  const now = Date.now();
  localStorage.setItem("currentTempEmail", email);
  localStorage.setItem("currentTempEmailCreatedAt", now.toString());
  setTempEmail(email);
};
//useFadeUpOnMount(".container-mail");
useBlurScaleIn(".container-mail")
  return (
    
<div className="container-mail relative z-20 bg-gray-100 text-gray-700 flex flex-col lg:flex-row w-full max-w-full mx-auto mt-3 gap-4 overflow-hidden px-4 sm:px-6">
  {/* Cột chính: hộp thư */}
  <div className="relative flex flex-col justify-start w-full min-h-screen font-sans bg-gray-100 overflow-hidden">
    <div className="relative z-20 mt-4 lg:mt-0 rounded-lg w-full max-w-3xl mx-auto bg-white shadow-xl border border-gray-300 overflow-y-auto h-full max-h-[calc(100vh-40px)] p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        TempMail zikdev.io.vn
      </h1>

      {tempEmail && (
        <div className="text-gray-800 text-center text-sm sm:text-base mb-4">
          ⏰ Email hết hạn sau: <strong>{formatTime(remainingTime)}</strong>
        </div>
      )}

      {/* Email hiển thị */}
      <div className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-100">
        <p className="mb-2 text-sm sm:text-base">Địa chỉ email tạm thời của bạn:</p>
        <div className="flex justify-between items-center bg-gray-200 p-3 rounded-md text-sm sm:text-base">
          <strong className="break-all">{tempEmail}</strong>
          <CopyIcon size={20} onClick={copyEmailToClipboard} />
        </div>

        <div className="flex items-center justify-center p-3">
          <Button
            onClick={handleCreateEmail}
            className="mt-4 w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm sm:text-base font-semibold hover:bg-gray-400 transition-colors"
          >
            Tạo email mới
          </Button>
        </div>

        {/* Lịch sử email */}
        <div className="mb-6 p-4 border border-gray-300 rounded-md bg-white">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Email đã tạo gần đây</h2>
          {emailHistory.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">Chưa có email nào được tạo.</p>
          ) : (
            <ul className="list-none p-0 max-h-48 overflow-y-auto space-y-2">
              {emailHistory.map((email, index) => {
                const handleAnimatedDelete = () => {
                  const itemEl = itemRefs.current[email];
                  if (!itemEl) return;
                  gsap.to(itemEl, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    onComplete: async () => {
                      await handleDeleteEmail(email);
                      setDeletedEmail(email);
                      setTimeout(() => setDeletedEmail(null), 2000);
                    },
                  });
                };

                return (
                  <li
                    key={index}
                    ref={(el) => {
                      if (el) itemRefs.current[email] = el;
                    }}
                    className="bg-gray-200 p-3 rounded-md flex justify-between items-center hover:bg-gray-300 transition-colors text-sm"
                  >
                    {deletedEmail === email ? (
                      <span className="text-green-600 font-medium">Done</span>
                    ) : (
                      <>
                        <span
                          onClick={() => setTempEmail(email)}
                          className="cursor-pointer hover:underline"
                        >
                          {email}
                        </span>
                        <div className="flex gap-2">
                          <TrashIcon onClick={handleAnimatedDelete} title="Delete" />
                          <Refresh width={20} height={20} onClick={() => handleExtendEmail(email)} />
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Hộp thư đến */}
      <div className="mb-6 p-4 border border-gray-300 rounded-md bg-white">
        <h2 className="text-xl font-bold mb-4 text-center">Hộp Thư Đến</h2>
        {loading ? (
          <div className="flex justify-center items-center text-gray-500">
            <LoadingV2 size={24} />
          </div>
        ) : !tempEmail ? (
          <p className="text-center text-gray-500 text-sm">Nhấn "Tạo email mới" để bắt đầu.</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">Không có tin nhắn nào. Đang chờ email...</p>
        ) : (
          <ul className="list-none p-0">
            {messages.map((msg, index) => (
              <li
                key={index}
                onClick={() => setSelectedMessage(msg)}
                className="bg-gray-100 mb-2 p-3 rounded-md cursor-pointer hover:bg-gray-200 transition-colors text-sm sm:text-base"
              >
                <strong className="text-base">{msg.subject}</strong>
                <span className="block text-gray-600 text-sm">Từ: {msg.from}</span>
                <small className="block text-gray-500 text-xs mt-1">
                  {new Date(msg.timestamp).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chi tiết email */}
      {selectedMessage && (
        <div className="p-4 border border-gray-300 rounded-md bg-gray-100">
          <h2 className="text-xl font-bold mb-4 text-center">Chi Tiết Email</h2>
          <p className="mb-2 text-sm">
            <strong>Từ:</strong> {selectedMessage.from}
          </p>
          <p className="mb-2 text-sm">
            <strong>Chủ đề:</strong> {selectedMessage.subject}
          </p>
          <p className="font-semibold text-sm mb-2">Nội dung:</p>
          {selectedMessage.html ? (
            <div
              className="bg-white p-3 rounded-md max-h-60 overflow-y-auto text-gray-700 text-sm"
              dangerouslySetInnerHTML={{ __html: selectedMessage.html }}
            />
          ) : (
            <p className="bg-white p-3 rounded-md max-h-60 overflow-y-auto text-gray-700 whitespace-pre-wrap text-sm">
              {selectedMessage.body}
            </p>
          )}
          <button
            onClick={() => setSelectedMessage(null)}
            className="flex justify-center items-center bg-gray-300 w-full mt-4 hover:bg-gray-400 transition-colors py-2 rounded"
          >
            <ArrowUpOn width={20} height={20} />
          </button>
        </div>
      )}
    </div>
  </div>

  {/* Cột phụ: Thông tin server */}
  <div className="w-full lg:w-[40%] bg-white rounded-lg p-4 border border-gray-300 shadow-xl overflow-y-auto h-full max-h-[calc(100vh-40px)]">
    <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Thông tin Server</h2>
    <ul className="space-y-2 text-sm">
      <li><strong>🟢 Trạng thái:</strong> Đang hoạt động</li>
      <li><strong>🌐 IP:</strong> temp.zikdev.io</li>
      <li><strong>🕒 Uptime:</strong> 12 ngày 5 giờ</li>
      <li><strong>📦 Bộ nhớ:</strong> Loading...</li>
      <li><strong>📨 Email xử lý:</strong> {emailHistory.length} email</li>
    </ul>
  </div>
</div>

);

};

export default TempMail;
