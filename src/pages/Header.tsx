import { useState, useEffect } from "react";
import { Bell, AlertCircle, FileClock } from "lucide-react";
import { BsClockHistory } from "react-icons/bs";

export default function Header() {
  const [time, setTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine); // ตรวจสอบสถานะเริ่มต้น

  // อัปเดตเวลาทุกวินาที
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ตรวจจับการเปลี่ยนแปลงของอินเทอร์เน็ต
  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  // ฟังก์ชันแปลงวันที่และเวลา
  const formatDate = (date: Date) => {
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")} | ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() + 543}`;
  };

  return (
    <header className="bg-[#2E5361] text-white flex items-center justify-between px-6 py-5 shadow-md">
      {/* สถานะระบบ และชื่อโรงพยาบาล */}
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`} />
        <span className="text-lg font-semibold">{isOnline ? "Online" : "Offline"}</span>
        <span className="text-[#95BAC3] text-lg font-semibold">
          โรงพยาบาลมหาวิทยาลัยบูรพา
        </span>
      </div>

      {/* แสดงเวลาและวันที่ */}
      <div className="text-sm">{formatDate(time)}</div>

      {/* ไอคอนแจ้งเตือน */}
      <div className="flex items-center space-x-4">
      <button 
        className="relative animate-pulse cursor-pointer hover:opacity-80 transition-opacity" 
        title="SOS Alert"
      >
        <AlertCircle className="w-8 h-8 text-red-600 drop-shadow-lg" />
        <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white px-2 py-1 rounded-full shadow-lg">
          SOS
        </span>
      </button>
      <button 
        className="cursor-pointer hover:scale-110 transition-transform" 
        title="Notifications"
      >
        <Bell className="w-6 h-6 text-yellow-500 fill-yellow-500" />
      </button>
      <button 
        className="flex items-center cursor-pointer hover:opacity-70 transition-opacity" 
        title="History"
      >
        <FileClock  className="w-6 h-6 text-yellow-500 fill-white-500" />
      </button>
    </div>

    </header>
  );
}
