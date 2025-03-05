import { useState, useEffect } from "react";
import { Bell, FileClock } from "lucide-react";

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

  {/* แสดงเวลาอยู่ข้างหน้า SOS */}
  <div className="flex items-center space-x-4">
    {/* เวลา */}
    <div className="text-sm text-right">{formatDate(time)}</div>

    {/* SOS Button */}
    <button 
      className="relative animate-pulse cursor-pointer hover:scale-105 transition-transform hover:opacity-110 flex items-center justify-center p-2 rounded-full bg-red-600 shadow-md"
      title="SOS Alert"
    >
      <span className="bg-red-700 text-xs text-white px-2 py-1 rounded-full shadow-md transform transition-all">
        SOS
      </span>
    </button>

    {/* ไอคอนแจ้งเตือน */}
    <button 
      className="cursor-pointer hover:scale-125 transition-transform transform hover:shadow-lg hover:bg-[#5E8892] hover:text-white p-2 rounded-full"
      title="Notifications"
    >
      <Bell className="w-6 h-6 text-yellow-500 fill-yellow-500 transition-all" />
    </button>

    <button 
      className="cursor-pointer hover:scale-125 transition-transform transform hover:shadow-lg hover:bg-[#5E8892] hover:text-white p-2 rounded-full"
      title="History"
    >
      <FileClock className="w-6 h-6 text-yellow-500 fill-white transition-all" />
    </button>
  </div>
</header>

  
  );
}
