import { useState, useEffect } from "react";
import { Notification } from "../types/notification";
import { useNotificationStore } from "../store/notificationStore"; // ✅ Import Zustand Store
import NotificationList from "../components/Alert/NotificationList";

interface EmergencyAlertProps {
  onClose?: () => void;
}

export default function EmergencyAlert({ onClose }: EmergencyAlertProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationStore = useNotificationStore(); // ✅ ใช้ Zustand Store ที่ถูกต้อง

  //   [
  //     {
  //         "sensor_notifications_config_id": 291,
  //         "notification_successed": false,
  //         "notification_category": "Emergency",
  //         "notification_accepted": false,
  //         "notification_createdate": "2025-01-01T19:45:47",
  //         "notification_updatedate": "2025-03-04T14:22:38",
  //         "notification_id": 2,
  //         "sensor_notifications_config": {
  //             "sensor_id": 77,
  //             "sensor_notifications_config_event": "ออกซิเจนในเลือดต่ำมาก (< 95%)",
  //             "sensor_notifications_config_usage": true,
  //             "sensor_notifications_config_repeatnoti": 120,
  //             "sensor_notifications_config_rangetime": 120,
  //             "sensor_notifications_config_signal": "เฝ้าระวัง",
  //             "sensor_notifications_config_id": 291
  //         }
  //     }
  // ]
  useEffect(() => {
    setNotifications([
      {
        notification_id: 1,
        notification_name: "RM003 เตียง 3 (นอนตรง)",
        notification_category: "อัตราการเต้นหัวใจ",
        notification_accepted: false,
        notification_successed: false,
        notification_createdate: "2025-03-12 00:53:41.923954",
        notification_updatedate: "2025-03-12 00:53:41.923954",
      },
      {
        notification_id: 2,
        notification_name: "RM002 เตียง 2 (ขยับตัว)",
        notification_category: "การเคลื่อนไหว",
        notification_accepted: true,
        notification_successed: false,
        notification_createdate: "2025-03-15 00:53:41.923954",
        notification_updatedate: "2025-03-15 00:53:41.923954",
      },
      {
        notification_id: 1,
        notification_name: "RM003 เตียง 3 (นอนตรง)",
        notification_category: "อัตราการเต้นหัวใจ",
        notification_accepted: false,
        notification_successed: false,
        notification_createdate: "2025-03-12 00:53:41.923954",
        notification_updatedate: "2025-03-12 00:53:41.923954",
      },
    ]);
  }, []);

  // ฟังก์ชันเปลี่ยนสถานะ
  const updateStatus = (id: number, accepted?: string, successed?: boolean) => {
    setNotifications((prev) =>
      prev.map((noti) =>
        noti.notification_id === id
          ? {
              ...noti,
              notification_accepted: accepted ?? noti.notification_accepted,
              notification_successed: successed ?? noti.notification_successed,
              notification_updatedate: new Date(),
            }
          : noti
      )
    );
  };

  // ฟังก์ชันคํานวณเวลาที่ผ่านไปแล้ว
  const getTimeElapsed = (notificationDate: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - notificationDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return `${diffInSeconds} วินาทีที่แล้ว`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} นาทีที่แล้ว`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} ชั่วโมงที่แล้ว`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} วันที่แล้ว`;
    }
  };

  return (
    <div className="h-full flex flex-col z-20 border-2 border-[#2E5361] rounded-3xl">
      {/* Header ของ Sidebar */}
      <div className="flex justify-between items-center h-25 text-[#2E5361] p-4  rounded-3xl">
        <h3
          className="text-3xl font-semibold flex-grow text-center"
          style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}
        >
          {notificationStore.selectedAlertType} {/* ใช้ค่าจาก Zustand Store */}
        </h3>
        {/* แสดงรูปภาพ alarm เฉพาะเมื่อ selectedAlertType เป็น "แจ้งเตือนฉุกเฉิน" */}
        {notificationStore.selectedAlertType === "แจ้งเตือนฉุกเฉิน" && (
          <img
            src="src/assets/alarm.png"
            alt="alarm"
            className="mr-4 w-8 h-8"
          />
        )}{" "}
        <button
          onClick={onClose}
          className="text-[#2E5361] text-xl hover:text-gray-300 absolute top-3 right-3"
        >
          ✖
        </button>
      </div>

      {/* ถ้าไม่มีแจ้งเตือน */}
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center mt-5">ไม่มีการแจ้งเตือน</p>
      ) : (
        <NotificationList
          notifications={notifications}
          updateStatus={updateStatus}
          getTimeElapsed={getTimeElapsed}
        />
      )}
    </div>
  );
}
