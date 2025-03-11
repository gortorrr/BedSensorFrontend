import { useState, useEffect } from "react";
import { Notification } from "../../types/notification";

interface EmergencyAlertProps {
  onClose: () => void;
}

export default function EmergencyAlert({ onClose }: EmergencyAlertProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications([
      {
        notification_id: 1,
        notification_name: "RM003 เตียง 3 (นอนตรง)",
        notification_category: "อัตราการเต้นหัวใจ",
        notification_accepted: "รอการตอบรับ",
        notification_successed: false,
        notification_createdate: new Date(),
        notification_updatedate: new Date(),
      },
      {
        notification_id: 2,
        notification_name: "RM002 เตียง 2 (ขยับตัว)",
        notification_category: "การเคลื่อนไหว",
        notification_accepted: "กำลังดำเนินการ",
        notification_successed: false,
        notification_createdate: new Date(),
        notification_updatedate: new Date(),
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

  return (
    <div className="h-full flex flex-col">
      {/* Header ของ Sidebar */}
      <div className="flex justify-between items-center bg-[#2E5361] text-white p-4 shadow-md">
        <h3 className="text-lg font-semibold">แจ้งเตือนฉุกเฉิน 🚨</h3>
        <button onClick={onClose} className="text-white text-xl hover:text-gray-300">
          ✖
        </button>
      </div>

      {/* ถ้าไม่มีแจ้งเตือน */}
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center mt-5">ไม่มีการแจ้งเตือน</p>
      ) : (
        <div className="p-4 space-y-4 overflow-auto flex-1">
          {notifications.map((noti) => (
            <div key={noti.notification_id} className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="font-semibold text-[#2E5361]">{noti.notification_name}</p>
              <p className="text-sm text-gray-600">ประเภท: {noti.notification_category}</p>

              {/* แสดงสถานะ */}
              <p
                className={`text-sm font-semibold ${
                  noti.notification_successed
                    ? "text-gray-400"
                    : noti.notification_accepted === "รอการตอบรับ"
                    ? "text-gray-500"
                    : noti.notification_accepted === "กำลังดำเนินการ"
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                สถานะ: {noti.notification_successed ? "เสร็จสิ้น" : noti.notification_accepted}
              </p>

              {/* ปุ่มแสดงเป็นข้อความแทน */}
              <div className="flex space-x-3 mt-2">
                {/* แสดงปุ่ม "รับทราบ" ตลอดเวลา */}
                {!noti.notification_successed && (
                  <button
                    onClick={() => updateStatus(noti.notification_id, "กำลังดำเนินการ")}
                    className="text-blue-600 hover:underline focus:outline-none cursor-pointer"
                  >
                    รับทราบ
                  </button>
                )}

                {/* แสดงปุ่ม "เสร็จสิ้น" ตลอดเวลา */}
                {!noti.notification_successed && (
                  <button
                    onClick={() => updateStatus(noti.notification_id, undefined, true)}
                    className="text-green-600 hover:underline focus:outline-none cursor-pointer"
                  >
                    เสร็จสิ้น
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
