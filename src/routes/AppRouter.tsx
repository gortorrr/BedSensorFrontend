import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.tsx";
import BedConfig from "../pages/BedConfig.tsx";
import SettingNoti from "../pages/SettingNoti.tsx";

import EmergencyAlert from "../pages/emergencyAlert.tsx";
import { useNotificationStore } from "../store/notificationStore.ts"; // Import ตัวแจ้งเตือนฉุกเฉิน

const AppRouter: React.FC = () => {
  const { showAlert, setShowAlert } = useNotificationStore();

  return (
    <div className="overflow-auto flex bg-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bed-config/:bed_id" element={<BedConfig />} />
        <Route path="/setting-noti/:bed_id" element={<SettingNoti />} />
      </Routes>

      {/* Emergency Alert - แสดงเฉพาะเมื่อ showAlert เป็น true */}
      {showAlert && (
        <div className="sticky right-0 w-[88%] h-full bg-white z-20">
          <EmergencyAlert onClose={() => setShowAlert(false)} />
        </div>
      )}
    </div>
  );
};

export default AppRouter;
