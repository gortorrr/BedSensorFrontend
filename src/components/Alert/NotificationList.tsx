import React from "react";
import { Notification } from "../../types/notification";
import { useNotificationStore } from "../../store/notificationStore";

interface NotificationCardProps {
  notification: Notification;
  updateStatus: (id: number, accepted?: boolean, successed?: boolean) => void;
  getTimeElapsed: (notificationDate: Date) => string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  updateStatus,
  getTimeElapsed,
}) => {
  const notificationStore = useNotificationStore();
  const handleTabClick = (notification: Notification) => {
    updateStatus(notification.notification_id, true, undefined);
    console.log(notification.notification_id);
    if (notification.notification_category === "Emergency") {
      notificationStore.acceptEmergencyByNotification(
        notification.notification_id
      );
    } else if (notification.notification_category === "SOS") {
      notificationStore.acceptSos(notification.notification_id);
    }
  };

  const handleCompleteClick = () => {
    // อัปเดตสถานะเป็น "เสร็จสิ้น"
    updateStatus(notification.notification_id, undefined, true);
    console.log(notification.notification_id);
    if (notification.notification_accepted !== true) {
      console.log("not accepeted cant success");
    } else {
      if (notification.notification_category === "Emergency") {
        notificationStore.successEmergencyByNotification(
          notification.notification_id
        ); // ลบการแจ้งเตือนจากลิสต์
      } else if (notification.notification_category === "SOS") {
        notificationStore.successSos(notification.notification_id);
      }
    }
  };

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
              ? "text-gray-400"
              : notification.notification_accepted === false
              ? "text-gray-500"
              : notification.notification_accepted === true
              ? "text-yellow-500"
              : "text-gray-400"
          }`}
        >
          สถานะ:{" "}
          {notification.notification_successed
            ? "เสร็จสิ้น"
            : notification.notification_accepted
            ? "กำลังดำเนินการ"
            : "รอการตอบรับ"}
        </p>

        {/* ปุ่มแสดงเป็นข้อความแทน */}
        <div className="flex space-x-3 mt-2">
          {/* แสดงปุ่ม "รับทราบ" ตลอดเวลา */}
          {!notification.notification_successed &&
            !notification.notification_accepted && (
              <button
                onClick={() => handleTabClick(notification)}
                className="text-[#007FCF] font-semibold hover:text-[#7cb1d0] cursor-pointer"
              >
                รับทราบ
              </button>
            )}

          {/* แสดงปุ่ม "เสร็จสิ้น" ถ้าได้รับการยอมรับ */}
          {!notification.notification_successed &&
            notification.notification_accepted !== false && (
              <button
                onClick={handleCompleteClick}
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
  notificationsWithAccepted: Notification[];
  updateStatus: (id: number, accepted?: boolean, successed?: boolean) => void;
  getTimeElapsed: (notificationDate: Date) => string;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  updateStatus,
  getTimeElapsed,
  notificationsWithAccepted,
}) => {
  return (
    <div className="p-4 space-y-4 overflow-auto flex-1">
      {notifications.map((noti) => (
        <NotificationCard
          key={noti.notification_id}
          notification={noti}
          updateStatus={updateStatus}
          getTimeElapsed={getTimeElapsed}
        />
      ))}
      {notificationsWithAccepted.map((notiWA) => (
        <NotificationCard
          key={notiWA.notification_id}
          notification={notiWA}
          updateStatus={updateStatus}
          getTimeElapsed={getTimeElapsed}
        />
      ))}
    </div>
  );
};

export default NotificationList;
