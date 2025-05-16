import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home.tsx";
import BedConfig from "../pages/BedConfig.tsx";
import SettingNoti from "../pages/SettingNoti.tsx";
import SensorManagement from "../pages/Managements/SensorManagement.tsx";
import Login from "../pages/Login.tsx";
import PatientManagement from "../pages/Managements/PatientManagement.tsx";
import AddPatientHome from "../pages/AddPatientHome.tsx";
import BedManagement from "../pages/Managements/BedManagement.tsx";
import UserManagement from "../pages/Managements/UserManagement.tsx";
// import EmergencyAlert from "../pages/EmergencyAlert.tsx";
// import { useNotificationStore } from "../store/notificationStore.ts"; // Import ตัวแจ้งเตือนฉุกเฉิน

const AppRouter: React.FC = () => {
  // const { showAlert, setShowAlert } = useNotificationStore();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={`bg-white ${isHome ? "overflow-auto flex" : ""}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bed-config/:bed_id" element={<BedConfig />} />
        <Route path="/setting-noti/:bed_id" element={<SettingNoti />} />
        <Route path="/sensor-management" element={<SensorManagement />} />
        <Route path="/patient-management" element={<PatientManagement />} />
        <Route path="/bed-management" element={<BedManagement />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/add-patient-home" element={<AddPatientHome />} />
      </Routes>

      {/* Emergency Alert - ปรับการแสดงผลตาม path */}
      {/* {showAlert && (
        <div
          className={`bg-white z-20 ${
            isHome
              ? "sticky right-0 w-[88%] h-full"
              : "absolute right-0 w-90 h-full  top-20 z-20"
          }`}
        >
          <EmergencyAlert onClose={() => setShowAlert(false)} />
        </div>
      )} */}
    </div>
  );
};

export default AppRouter;
