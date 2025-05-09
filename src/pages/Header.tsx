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
  const notificationCount = emergencyDatas?.length || 0;
  const notificationCountSos = sosDatas?.length || 0;

  // Watch for changes in emergencyDatas and sosDatas
  useEffect(() => {
    if (sosDatas.length > 0) {
      // toggleSosAlert(); // Trigger SOS alert toggle
      setIsSosAlertOpen(true);
      setShowSosAlert(true);
      setShowEmergencyAlert(false);
      notificationStore.setSelectedAlertType("ต้องการความช่วยเหลือ");
    }
  }, [sosDatas.length]); // Dependency on sosDatas

  useEffect(() => {
    if (emergencyDatas.length > 0) {
      // ใช้ setTimeout เพื่อหน่วงเวลา 1 วินาที หลังจากการแจ้งเตือน SOS
      setTimeout(() => {
        setIsEmergencyAlertOpen(true);
        setShowEmergencyAlert(true);
        setShowSosAlert(false); // ปิด SOS ถ้า Emergency เปิด
        notificationStore.setSelectedAlertType("แจ้งเตือนฉุกเฉิน"); // Trigger emergency alert toggle // Trigger emergency alert toggle
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
      <header
        id="main-header"
        className="sticky top-0 z-20 bg-[#2E5361] text-white flex items-center justify-between px-6 py-5 shadow-md "
      >
        <div id="header-status-group" className="flex items-center space-x-3">
          {/* เปลี่ยนสถานะ Online / Offline */}
          <div
            id="status-indicator"
            className={`w-3 h-3 rounded-full ${
              isOnline ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span id="status-text" className="text-lg font-semibold">
            {isOnline ? "Online" : "Offline"}
          </span>
          <span
            id="hospital-name"
            className="text-[#95BAC3] text-lg font-semibold"
          >
            โรงพยาบาลมหาวิทยาลัยบูรพา
          </span>
        </div>

        <div id="header-actions" className="flex items-center space-x-4">
          <div id="header-time" className="text-sm text-right">
            {formatDate(time)}
          </div>

          {/* SOS Button */}
          <button
            id="btn-sos-alert"
            className="relative cursor-pointer hover:scale-105 transition-transform hover:opacity-110 flex items-center justify-center p-2 rounded-full"
            title="SOS Alert"
            onClick={toggleSosAlert}
          >
            <span
              id="sos-label"
              className="bg-red-700 text-xs text-white px-3 py-2 rounded-full shadow-md transform transition-all"
            >
              SOS
            </span>
            {/* ✅ แสดงตัวเลขแจ้งเตือนเมื่อ > 0 */}
            {notificationCountSos > 0 && (
              <span
                id="sos-badge"
                className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full"
              >
                {notificationCountSos}
              </span>
            )}{" "}
          </button>

          {/* ไอคอนแจ้งเตือน */}
          {/* ปุ่มแจ้งเตือน Emergency */}
          <button
            id="btn-emergency-alert"
            className="relative cursor-pointer hover:scale-125 transition-transform transform hover:shadow-sm hover:bg-[#5E8892] hover:text-white p-2 rounded-full"
            title="Emergency"
            onClick={toggleEmergencyAlert}
          >
            <Bell
              id="bell-icon"
              className="relative w-6 h-6 text-yellow-500 fill-yellow-500 transition-all drop-shadow-lg"
            />

            {/* ✅ แสดงตัวเลขแจ้งเตือนเมื่อ > 0 */}
            {notificationCount > 0 && (
              <span
                id="emergency-badge"
                className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full"
              >
                {notificationCount}
              </span>
            )}
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
