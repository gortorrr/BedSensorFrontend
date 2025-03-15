import React from "react";
import { Notification } from "../../types/notification";

interface NotificationCardProps {
  notification: Notification;
  updateStatus: (id: number, accepted?: string, successed?: boolean) => void;
  getTimeElapsed: (notificationDate: Date) => string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  updateStatus,
  getTimeElapsed,
}) => {
  return (
    <div className="flex items-center p-4 bg-slate-100 rounded-lg shadow">
      {/* แถบสีแนวตั้ง */}
      <div className="h-25 w-2 bg-[#FF0000] mr-4"></div>

      <div className="flex-1 justify-end">
        <p className="font-semibold text-[#2E5361]">
          {/* {notification.notification_name} */}
        </p>
        <p className="text-gray-600">
          ประเภท: {notification.notification_category}
        </p>

        {/* เวลาที่ผ่านไปของการแจ้งเตือน */}
        <p className="text-gray-500 text-sm">
          {getTimeElapsed(
            new Date(notification.notification_createdate ?? new Date())
          )}
        </p>

        {/* แสดงสถานะ */}
        <p
          className={`font-semibold ${
            notification.notification_successed
            //   ? "text-gray-400"
            //   : notification.notification_accepted === "รอการตอบรับ"
            //   ? "text-gray-500"
            //   : notification.notification_accepted === "กำลังดำเนินการ"
            //   ? "text-yellow-500"
            //   : "text-gray-400"
          }`}
        >
          สถานะ:{" "}
          {notification.notification_successed
            ? "เสร็จสิ้น"
            : notification.notification_accepted}
        </p>

        {/* ปุ่มแสดงเป็นข้อความแทน */}
        <div className="flex space-x-3 mt-2">
          {/* แสดงปุ่ม "รับทราบ" ตลอดเวลา */}
          {!notification.notification_successed && (
            <button
              onClick={() =>
                updateStatus(notification.notification_id, "กำลังดำเนินการ")
              }
              className="text-[#007FCF] font-semibold hover:text-[#7cb1d0] cursor-pointer"
            >
              รับทราบ
            </button>
          )}

          {/* แสดงปุ่ม "เสร็จสิ้น" ตลอดเวลา */}
          {!notification.notification_successed && (
            <button
              onClick={() =>
                updateStatus(notification.notification_id, undefined, true)
              }
              className="text-[#22c265] font-semibold hover:text-[#7bdebf] animate-jump1 cursor-pointer"
            >
              เสร็จสิ้น
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface NotificationListProps {
  notifications: Notification[];
  updateStatus: (id: number, accepted?: string, successed?: boolean) => void;
  getTimeElapsed: (notificationDate: Date) => string;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  updateStatus,
  getTimeElapsed,
}) => {
  return (
    <div className="p-4 space-y-4 overflow-auto ">
      {notifications.map((noti) => (
        <NotificationCard
          key={noti.notification_id}
          notification={noti}
          updateStatus={updateStatus}
          getTimeElapsed={getTimeElapsed}
        />
      ))}
    </div>
  );
};

export default NotificationList;
