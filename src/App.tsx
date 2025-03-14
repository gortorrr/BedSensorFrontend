import React, { useState } from "react";
import AppRouter from "./routes/AppRouter";
import Navbar from "./pages/Navbar";
import Header from "./pages/Header";
import { useNotificationStore } from "./store/notificationStore";
import EmergencyAlert from "./pages/EmergencyAlert";

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
    <div className="flex ">
      {/* ส่ง setUser และ setIsOnline ไปที่ Navbar */}
      <Navbar setUser={setUser} setIsOnline={setIsOnline} user={user} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-500 top-0 left-0 w-full z-20 bg-[#e7f0f3]">
        {/* Header - กำหนดให้คงที่ ไม่ขยับตาม */}
        <Header user={user} isOnline={isOnline} />

      {/* ส่วนเนื้อหา AppRouter ที่ขยับตาม Emergency Alert */}
      <div
          className={`flex-1 overflow-auto bg-gray-50 transition-all duration-500  ${
            showAlert ? "mr-[360px]" : "mr-0" // ขยับเนื้อหามาทางขวาเมื่อ emergency alert แสดง
          }`}
        >
          <AppRouter />
        </div>
      </div>

      {/* Emergency Alert Panel (Fixed Right) */}
      <div
        className={`fixed right-3 top-23 h-[calc(100vh-103px)] w-[360px] rounded-3xl bg-white drop-shadow-lg z-20 transition-transform duration-500 ${
          showAlert ? "translate-x-0" : "translate-x-[calc(100%+15px)]"
        }`}
      >
        <EmergencyAlert onClose={() => setShowAlert(false)} />
      </div>
    </div>

  );
};

export default App;
