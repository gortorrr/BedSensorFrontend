import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // 👈 เพิ่มเข้ามา
import AppRouter from "./routes/AppRouter";
import Navbar from "./pages/Navbar";
import Header from "./pages/Header";
import EmergencyAlert from "./pages/EmergencyAlert";
import SosAlert from "./pages/SosAlert";
import { useNotificationStore } from "./store/notificationStore";

interface User {
  name: string;
  role: string;
  profilePic: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [showSosAlert, setShowSosAlert] = useState(false);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);

  const {
    loadEmergencyNotAccepted,
    loadSosNotAccepted,
    loadEmergencyNotSuccessed,
    loadSosNotSuccessed,
  } = useNotificationStore();

  const location = useLocation(); // 👈 ดึง path ปัจจุบัน

  const N = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      loadEmergencyNotAccepted();
      loadEmergencyNotSuccessed();
      loadSosNotAccepted();
      loadSosNotSuccessed();
    }, N);

    return () => clearInterval(interval);
  }, []);

  // ✅ ถ้าเป็นหน้า /login ให้แสดงแค่ AppRouter
  if (location.pathname === "/login") {
    return <AppRouter />;
  }

  return (
    <div className="flex">
      <Navbar setUser={setUser} setIsOnline={setIsOnline} user={user} />

      <div className="flex-1 flex flex-col transition-all duration-500 top-0 left-0 w-full z-20 bg-[#e7f0f3]">
        <Header
          user={user}
          isOnline={isOnline}
          setShowSosAlert={setShowSosAlert}
          setShowEmergencyAlert={setShowEmergencyAlert}
        />

        <div
          className={`flex-1 overflow-auto bg-gray-50 transition-all duration-500  ${
            showSosAlert || showEmergencyAlert ? "mr-[360px]" : "mr-0"
          }`}
        >
          <AppRouter />
        </div>
      </div>

      <div
        className={`fixed right-3 top-23 h-[calc(100vh-103px)] w-[360px] rounded-3xl bg-white drop-shadow-lg z-20 transition-transform duration-500 ${
          showEmergencyAlert ? "translate-x-0" : "translate-x-[calc(100%+15px)]"
        }`}
      >
        <EmergencyAlert onClose={() => setShowEmergencyAlert(false)} />
      </div>

      <div
        className={`fixed right-3 top-23 h-[calc(100vh-103px)] w-[360px] rounded-3xl bg-white drop-shadow-lg z-20 transition-transform duration-500 ${
          showSosAlert ? "translate-x-0" : "translate-x-[calc(100%+15px)]"
        }`}
      >
        <SosAlert onClose={() => setShowSosAlert(false)} />
      </div>
    </div>
  );
};

export default App;
