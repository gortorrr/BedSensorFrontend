import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNotificationStore } from "../store/notificationStore";
// import SosAlert from "./SosAlert";
// import EmergencyAlert from "./EmergencyAlert";

interface User {
  name: string;
  role: string;
}

interface HeaderProps {
  user: User | null;
  isOnline: boolean;
  setShowSosAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEmergencyAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({
  isOnline,
  setShowSosAlert,
  setShowEmergencyAlert,
}: HeaderProps) {
  const [time, setTime] = useState(new Date());
  // const [showSosAlert, setShowSosAlert] = useState(false);
  // const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const notificationStore = useNotificationStore(); // ใช้ store

  // ใช้เพื่อตรวจสอบสถานะ SOS และ Emergency Alert
  const [isSosAlertOpen, setIsSosAlertOpen] = useState(false);
  const [isEmergencyAlertOpen, setIsEmergencyAlertOpen] = useState(false);

  const { emergencyDatas, sosDatas } = useNotificationStore();
  // Watch for changes in emergencyDatas and sosDatas
  useEffect(() => {
    if (sosDatas.length > 0) {
      toggleSosAlert(); // Trigger SOS alert toggle
    }
  }, [sosDatas.length]); // Dependency on sosDatas

  useEffect(() => {
    if (emergencyDatas.length > 0) {
      // ใช้ setTimeout เพื่อหน่วงเวลา 1 วินาที หลังจากการแจ้งเตือน SOS
      setTimeout(() => {
        toggleEmergencyAlert(); // Trigger emergency alert toggle
      }, 3000); // หน่วงเวลา 3 วินาที
    }
  }, [emergencyDatas.length]); // Dependency on emergencyDatas

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

  const toggleSosAlert = () => {
    // ถ้า SOS เปิดอยู่แล้วก็ปิด
    if (isSosAlertOpen) {
      setIsSosAlertOpen(false);
      setShowSosAlert(false);
    } else {
      setIsSosAlertOpen(true);
      setShowSosAlert(true);
      setShowEmergencyAlert(false); // ปิด Emergency ถ้า SOS เปิด
      notificationStore.setSelectedAlertType("ต้องการความช่วยเหลือ");
    }
  };

  const toggleEmergencyAlert = () => {
    // ถ้า Emergency เปิดอยู่แล้วก็ปิด
    if (isEmergencyAlertOpen) {
      setIsEmergencyAlertOpen(false);
      setShowEmergencyAlert(false);
    } else {
      setIsEmergencyAlertOpen(true);
      setShowEmergencyAlert(true);
      setShowSosAlert(false); // ปิด SOS ถ้า Emergency เปิด
      notificationStore.setSelectedAlertType("แจ้งเตือนฉุกเฉิน");
    }
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
            onClick={toggleSosAlert}
          >
            <span className="bg-red-700 text-xs text-white px-2 py-1 rounded-full shadow-md transform transition-all">
              SOS
            </span>
          </button>

          {/* ไอคอนแจ้งเตือน */}
          <button
            className="cursor-pointer hover:scale-125 transition-transform transform hover:shadow-lg hover:bg-[#5E8892] hover:text-white p-2 rounded-full"
            title="Emergency"
            onClick={toggleEmergencyAlert}
          >
            <Bell className="w-6 h-6 text-yellow-500 fill-yellow-500 transition-all" />
          </button>

          {/*
          <button
            className="cursor-pointer hover:scale-125 transition-transform transform hover:shadow-lg hover:bg-[#5E8892] hover:text-white p-2 rounded-full"
            title="History"
            onClick={() => {
              notificationStore.setShowAlert(!notificationStore.showAlert);
              notificationStore.setSelectedAlertType("ประวัติการแจ้งเตือน"); // ตั้งค่าหัวข้อเป็น "ประวัติการแจ้งเตือน"
            }}
          >
            <FileClock className="w-6 h-6 text-yellow-500 fill-white transition-all" />
          </button>
          */}
        </div>
      </header>
    </>
  );
}
