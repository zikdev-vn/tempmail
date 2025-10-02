import React, { useState, useEffect, useRef } from "react";
import CopyIcon from "../../components/icons/CopyIcon";
import TrashIcon from "../../components/icons/TrashIcon";
import ArrowUpOn from "../../components/icons/ArrowUpOn";
import Refresh from "../../components/icons/Refresh";
import { gsap } from "gsap";
import { getEmails , deleteEmail } from "../../services/tempmail/mailapi";

const TempMail = () => {
  const [tempEmail, setTempEmail] = useState(null);
  const [messages, setMessages] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [emailHistory, setEmailHistory] = useState([]);
  const [deletedEmail, setDeletedEmail] = useState(null);
  const itemRefs = useRef({});

  const iframeRef = useRef(null);

  // Copy email
  const copyEmailToClipboard = () => {
    if (tempEmail) {
      navigator.clipboard.writeText(tempEmail);
      alert("Email đã được sao chép!");
    }
  };
useEffect(() => {
  if (!tempEmail) return;

  const fetchInbox = async () => {
    try {
      if (remainingTime > 0) {   // check trong hàm
        const inbox = await getEmails(tempEmail);
        setMessages(inbox);
      }
    } catch (e) {
      console.warn("Lỗi khi lấy mail:", e.message);
    }
  };

  // Gọi lần đầu
  fetchInbox();

  // Poll mỗi 5s
  const intervalId = setInterval(fetchInbox, 5000);

  return () => clearInterval(intervalId);
}, [tempEmail]); // ❌ bỏ remainingTime

  // Khôi phục email hết hạn trước
  const restoreEmail = (email) => {
    const now = Date.now();
    localStorage.setItem("currentTempEmail", email);
    localStorage.setItem("currentTempEmailCreatedAt", now.toString());
    setTempEmail(email);
    setRemainingTime(10 * 60 * 1000); // 10 phút mặc định
  };

  // Xóa email
const handleDeleteEmail = async (emailToDelete) => {
  if (!window.confirm(`Bạn có chắc muốn xóa email ${emailToDelete}?`)) return;

  try {
    // Gọi API xóa email ở server
    const msg = await deleteEmail(emailToDelete);
    console.log("Kết quả backend:", msg);

    // Cập nhật lịch sử phía frontend
    const updatedHistory = emailHistory.filter((e) => e !== emailToDelete);
    localStorage.setItem("emailHistory", JSON.stringify(updatedHistory));
    setEmailHistory(updatedHistory);

    // Nếu xóa email hiện tại → clear luôn state
    if (emailToDelete === tempEmail) {
      setTempEmail(null);
      setMessages([]);
      setRemainingTime(0);
    }
  } catch (e) {
    console.warn("Lỗi khi xóa email:", e.message);
    alert("Không thể xóa email, thử lại sau!");
  }
};

  // Nhận dữ liệu từ iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.data) return;
      const { email, expireAt, messages: inboxMessages } = event.data;

      if (email && email !== tempEmail) {
        setTempEmail(email);

        // Cập nhật lịch sử
        const oldHistory = JSON.parse(localStorage.getItem("emailHistory")) || [];
        const updatedHistory = [email, ...oldHistory.filter((e) => e !== email)].slice(0, 20);
        localStorage.setItem("emailHistory", JSON.stringify(updatedHistory));
        setEmailHistory(updatedHistory);
      }

      if (expireAt) {
        const timeLeft = expireAt - Date.now();
        setRemainingTime(timeLeft > 0 ? timeLeft : 0);
      }

      if (inboxMessages) setMessages(inboxMessages);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [tempEmail]);

  // Countdown
  useEffect(() => {
    if (remainingTime <= 0) return;
    const interval = setInterval(() => {
      setRemainingTime((prev) => (prev <= 1000 ? 0 : prev - 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="container-mail flex flex-col lg:flex-row gap-4 p-4 bg-gray-900">
      {/* Cột chính */}
      <div className="flex-1 bg-gray-900 shadow rounded p-4 max-h-[calc(100vh-40px)] overflow-y-auto">
        <h1 className="text-2xl font-bold text-center mb-4">TempMail zikdev.io.vn</h1>

        {tempEmail && (
          <div className="text-center mb-4">
            ⏰ Email hết hạn sau: <strong>{formatTime(remainingTime)}</strong>
          </div>
        )}

        {/* Email và nút copy */}
        <div className="flex justify-between items-center bg-gray-900 p-3 rounded-md mb-4">
          <strong className="break-all">{tempEmail || "Chưa có email"}</strong>
          <CopyIcon size={20} onClick={copyEmailToClipboard} />
        </div>

        {/* Lịch sử email */}
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Email đã tạo gần đây</h2>
          {emailHistory.length === 0 ? (
            <p className="text-gray-500 text-sm">Chưa có email nào được tạo.</p>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {emailHistory.map((email, idx) => (
                <li
                  key={idx}
                  ref={(el) => (itemRefs.current[email] = el)}
                  className="flex justify-between items-center p-2 bg-gray-900 rounded hover:bg-gray-800 transition"
                >
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => restoreEmail(email)}
                  >
                    {email}
                  </span>
                  <div className="flex gap-2 bg-zinc-300 border-radius-9">
                    <TrashIcon onClick={() => handleDeleteEmail(email)} />
                    <Refresh onClick={() => restoreEmail(email)} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Hộp thư */}
<div>
  <h2 className="text-lg font-bold mb-2">Hộp Thư Đến</h2>
  {messages.length === 0 ? (
    <p className="text-gray-500 text-sm">Không có tin nhắn nào.</p>
  ) : (
    <ul className="space-y-2">
      {messages.map((msg, idx) => (
        <li
          key={idx}
          className="p-2 bg-gray-900 rounded hover:bg-gray-800 cursor-pointer"
          onClick={() => setSelectedMessage(msg)}
        >
          <strong>{msg.subject}</strong> - <span className="text-gray-200">{msg.from}</span>
          <div className="text-xs text-gray-200">
            {new Date(msg.timestamp).toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  )}
</div>

        {/* Chi tiết email */}
        {selectedMessage && (
          <div className="mt-2 p-2 bg-gray-900 rounded">
            <h3 className="font-bold mb-1">Chi tiết Email</h3>
            <p><strong>Từ:</strong> {selectedMessage.from}</p>
            <p><strong>Chủ đề:</strong> {selectedMessage.subject}</p>
            <div
              className="bg-gray-900 p-2 rounded max-h-60 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: selectedMessage.html || selectedMessage.body }}
            />
            <button
              className="mt-2 w-full bg-gray-900 py-1 rounded hover:bg-gray-700"
              onClick={() => setSelectedMessage(null)}
            >
              <ArrowUpOn />
            </button>
          </div>
        )}
      </div>

      {/* Cột phụ: iframe */}
      <div className="w-full lg:w-[40%] bg-gray-900 shadow rounded p-4 max-h-[calc(100vh-40px)]">
        <h2 className="text-lg font-bold text-center mb-2">TempMail</h2>
        <iframe
          ref={iframeRef}
          src="http://localhost:8000/api/gmail-new?lang=en"
          title="TempMail"
          style={{ width: "100%", height: "500px", border: "1px solid gray" }}
        />
      </div>
    </div>
  );
};

export default TempMail;
