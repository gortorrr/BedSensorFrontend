import { useState, useEffect } from "react";
import { Notification } from "../types/notification";
import { useNotificationStore } from "../store/notificationStore";
import NotificationList from "../components/Alert/NotificationList";
import { notificationWebSocketService } from "../services/notification.websocket";
import { sortNotificationByDate } from "../utils/sort";

interface SosAlertProps {
  onClose?: () => void;
}

export default function SosAlert({ onClose }: SosAlertProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsWithAccepted, setNotificationsWithAccepted] = useState<
    Notification[]
  >([]);

  const { selectedAlertType } = useNotificationStore();

  // รับ noti แบบยังไม่ accept
  useEffect(() => {
    notificationWebSocketService.connect("sos/pending", (data) => {
      setNotifications((prev) => sortNotificationByDate([...prev, data]));
    });

    return () => {
      notificationWebSocketService.disconnect("sos/pending");
    };
  }, []);

  // รับ noti ที่ accept แล้ว (แต่ยังไม่ success)
  useEffect(() => {
    notificationWebSocketService.connect("sos/accepted", (data) => {
      setNotificationsWithAccepted((prev) =>
        sortNotificationByDate([...prev, data])
      );
    });

    return () => {
      notificationWebSocketService.disconnect("sos/accepted");
    };
  }, []);

  const updateStatus = (
    id: number,
    accepted?: boolean,
    successed?: boolean
  ) => {
    setNotifications((prev) =>
      prev.map((noti) =>
        noti.notification_id === id
          ? {
              ...noti,
              notification_accepted:
                accepted !== undefined ? accepted : noti.notification_accepted,
              notification_successed:
                successed !== undefined
                  ? successed
                  : noti.notification_successed,
              notification_updatedate: new Date().toISOString(),
            }
          : noti
      )
    );
  };

  const getTimeElapsed = (notificationDate: string | Date): string => {
    const date =
      typeof notificationDate === "string"
        ? new Date(notificationDate)
        : notificationDate;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} วินาทีที่แล้ว`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} นาทีที่แล้ว`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} ชั่วโมงที่แล้ว`;
    return `${Math.floor(diffInSeconds / 86400)} วันที่แล้ว`;
  };

  return (
    <div className="h-full flex flex-col z-20 border-2 border-[#2E5361] rounded-3xl">
      <div className="flex justify-between items-center h-25 text-[#2E5361] p-4 rounded-3xl">
        <h3
          className="text-3xl font-semibold flex-grow text-center"
          style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}
        >
          {selectedAlertType}
        </h3>
        {selectedAlertType === "แจ้งเตือนฉุกเฉิน" && (
          <img
            src="src/assets/alarm.png"
            alt="Alarm"
            className="w-8 h-8 mr-4"
          />
        )}
        <button
          onClick={onClose}
          className="text-[#2E5361] text-xl hover:text-gray-300 absolute top-3 right-3 cursor-pointer"
          aria-label="Close alert"
        >
          ✖
        </button>
      </div>

      {notifications.length === 0 && notificationsWithAccepted.length === 0 ? (
        <p className="text-gray-500 text-center mt-5">ไม่มีการแจ้งเตือน</p>
      ) : (
        <NotificationList
          notifications={notifications}
          updateStatus={updateStatus}
          getTimeElapsed={getTimeElapsed}
          notificationsWithAccepted={notificationsWithAccepted}
        />
      )}
    </div>
  );
}
