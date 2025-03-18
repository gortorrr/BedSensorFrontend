import React, { useEffect, useState } from "react";
import AppRouter from "./routes/AppRouter";
import Navbar from "./pages/Navbar";
import Header from "./pages/Header";
// import { useNotificationStore } from "./store/notificationStore";
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

  // const { showAlert, setShowAlert } = useNotificationStore();
  // const [showSosAlert, setShowSosAlert] = useNotificationStore();
  // const [showEmergencyAlert, setShowEmergencyAlert] = useNotificationStore();

  const [showSosAlert, setShowSosAlert] = useState(false);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);

  const { loadEmergencyNotAccepted, loadSosNotAccepted } =
    useNotificationStore();

  useEffect(() => {
    loadEmergencyNotAccepted();
    loadSosNotAccepted();
  }, []);

  //เผื่ออ๋าผ่านมาเห็น อันนี้อ่ะ มันลูปได้ละ แต่ว่านะอ๋านะ มันลูปได้จริง แต่ไม่รู้ว่าพอ load Noti มาเนี่ย มันจะอยู่บนสุดของหัวตารางมั้ย นั่นแหละประเด็น
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     loadEmergencyNotAccepted();
  //     loadSosNotAccepted();
  //   }, 5000); // 5000ms = 5 seconds

  // Clean up interval when component unmounts or dependencies change
  //   return () => clearInterval(interval);
  // }, []); // Empty dependency array ensures this runs once on mount and sets the interval

  return (
    <div className="flex ">
      {/* ส่ง setUser และ setIsOnline ไปที่ Navbar */}
      <Navbar setUser={setUser} setIsOnline={setIsOnline} user={user} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-500 top-0 left-0 w-full z-20 bg-[#e7f0f3]">
        {/* Header - กำหนดให้คงที่ ไม่ขยับตาม */}
        <Header
          user={user}
          isOnline={isOnline}
          setShowSosAlert={setShowSosAlert} // ส่ง set function ไปที่ Header
          setShowEmergencyAlert={setShowEmergencyAlert} // ส่ง set function ไปที่ Header
        />

        {/* ส่วนเนื้อหา AppRouter ที่ขยับตาม Emergency Alert */}
        <div
          className={`flex-1 overflow-auto bg-gray-50 transition-all duration-500  ${
            showSosAlert || showEmergencyAlert ? "mr-[360px]" : "mr-0" // ขยับเนื้อหามาทางขวาเมื่อ emergency alert แสดง
          }`}
        >
          <AppRouter />
        </div>
      </div>

      {/* Emergency Alert Panel (Fixed Right) */}
      <div
        className={`fixed right-3 top-23 h-[calc(100vh-103px)] w-[360px] rounded-3xl bg-white drop-shadow-lg z-20 transition-transform duration-500 ${
          showEmergencyAlert ? "translate-x-0" : "translate-x-[calc(100%+15px)]"
        }`}
      >
        <EmergencyAlert onClose={() => setShowEmergencyAlert(false)} />
      </div>

      {/* Sos Alert Panel (Fixed Right) */}
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
