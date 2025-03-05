import React, { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Header from "./pages/Header";

interface User {
  name: string;
  role: string;
  profilePic: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div className="flex">
      {/* ส่ง setUser และ setIsOnline ไปที่ Navbar */}
      <Navbar setUser={setUser} setIsOnline={setIsOnline} user={user} />

      <div className="flex-1">
        {/* ส่ง user และ isOnline ไปที่ Header */}
        <Header user={user} isOnline={isOnline} />
        <Home />
      </div>
    </div>
  );
};

export default App;