import { useState, useEffect } from "react";
import { Bell, FileClock } from "lucide-react";
import { useNotificationStore } from "../store/notificationStore";

interface User {
  name: string;
  role: string;
}

interface HeaderProps {
  user: User | null;
  isOnline: boolean;
}

export default function Header({ isOnline }: HeaderProps) {
  const [time, setTime] = useState(new Date());
  const notificationStore = useNotificationStore(); // ใช้ store

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} | ${date.getDate()}/${date.getMonth() + 1}/${
      date.getFullYear() + 543
    }`;
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#2E5361] text-white flex items-center justify-between px-6 py-5 shadow-md ">
        <div className="flex items-center space-x-3">
          {/* เปลี่ยนสถานะ Online / Offline */}
          <div
            className={`w-3 h-3 rounded-full ${
              isOnline ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-lg font-semibold">
            {isOnline ? "Online" : "Offline"}
          </span>
          <span className="text-[#95BAC3] text-lg font-semibold">
            โรงพยาบาลมหาวิทยาลัยบูรพา
          </span>
        </div>

        <div className="flex items-center space-x-4">
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
            onClick={() =>
              notificationStore.setShowAlert(!notificationStore.showAlert)
            } // เพิ่มการใช้ฟังก์ชันใน onClick
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
    </>
  );
}
