import React, { useState } from "react";

interface NotificationTabsProps {
  onTabChange: (tab: string) => void;
}

const NotificationTabs: React.FC<NotificationTabsProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("settings");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex gap-2 justify-start">
      <button
        className={`px-6 py-2 rounded-full cursor-pointer text-sm font-medium transition-colors ${
          activeTab === "settings"
            ? "bg-[#85A8B8] text-white"
            : "bg-gray-300 text-gray-700"
        }`}
        onClick={() => handleTabClick("settings")}
      >
        ตั้งค่าการแจ้งเตือน
      </button>
      <button
        className={`px-6 py-2 rounded-full cursor-pointer text-sm font-medium transition-colors ${
          activeTab === "timeline"
            ? "bg-[#85A8B8] text-white"
            : "bg-gray-300 text-gray-700"
        }`}
        onClick={() => handleTabClick("timeline")}
      >
        ไทม์ไลน์
      </button>
      <button
        className={`px-6 py-2 rounded-full cursor-pointer text-sm font-medium transition-colors ${
          activeTab === "history"
            ? "bg-[#85A8B8] text-white"
            : "bg-gray-300 text-gray-700"
        }`}
        onClick={() => handleTabClick("history")}
      >
        ประวัติการแจ้งเตือน
      </button>
    </div>
  );
};

export default NotificationTabs;
