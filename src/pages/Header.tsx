import { useState } from "react";
import { Bell, Settings, AlertCircle } from "lucide-react";

export default function Header() {
  const [isOnline, setIsOnline] = useState(true); // เปลี่ยนเป็น false ถ้าต้องการให้เป็น Offline

  return (
    <header className="bg-[#2E5361] text-white flex items-center justify-between px-6 py-3 shadow-md">
      {/* สถานะระบบ และชื่อโรงพยาบาล */}
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`} />
        <span className="text-lg font-semibold">โรงพยาบาลมหาวิทยาลัยบูรพา</span>
      </div>

      {/* ไอคอนแจ้งเตือน */}
      <div className="flex items-center space-x-4">
        <button className="relative">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white px-1 rounded-full">SOS</span>
        </button>
        <button>
          <Bell className="w-6 h-6" />
        </button>
        <button>
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
