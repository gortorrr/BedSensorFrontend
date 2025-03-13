import React, { useState } from "react";
import AppRouter from "./routes/AppRouter";
import Navbar from "./pages/Navbar";
import Header from "./pages/Header";
import EmergencyAlert from "./pages/emergencyAlert";
import { useNotificationStore } from "./store/notificationStore"; // Import ตัวแจ้งเตือนฉุกเฉิน

interface User {
  name: string;
  role: string;
  profilePic: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const { showAlert, setShowAlert } = useNotificationStore();

  return (
    <div className="flex h-screen">
      {/* NavBar - ติดซ้าย */}
      <Navbar setUser={setUser} setIsOnline={setIsOnline} user={user} />

      {/* ส่วนตรงกลาง (Header + AppRouter) */}
      <div className="flex flex-col flex-1">
        {/* Header - ติดบน ไม่ถูกทับ */}
        <Header user={user} isOnline={isOnline} />

        {/* ส่วนเนื้อหา AppRouter */}
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          <AppRouter />
        </div>
      </div>

      {/* Emergency Alert - แสดงเฉพาะเมื่อ showAlert เป็น true */}
      {showAlert && (
        <div className="w-90  h-full absolute bg-white right-0 top-20 z-20">
          <EmergencyAlert onClose={() => setShowAlert(false)} />
        </div>
      )}
    </div>
  );
};

export default App;
