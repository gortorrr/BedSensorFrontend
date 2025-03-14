import { useState, useEffect } from "react";
import { Notification } from "../types/notification";

interface EmergencyAlertProps {
  onClose?: () => void;
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
    <div className="h-full flex flex-col z-20 border-2 border-[#2E5361] rounded-3xl">
      {/* Header ของ Sidebar */}
      <div className="flex justify-between items-center h-25 text-[#2E5361] p-4  rounded-3xl">
        <h3 className="text-3xl font-semibold flex-grow text-center" style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}>แจ้งเตือนฉุกเฉิน</h3>
        <img src="src\assets\alarm.png" alt="alarm" className="mr-5 w-8 h-8" />
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
        <div className="p-4 space-y-4 overflow-auto flex-1">
          {notifications.map((noti) => (
            <div
              key={noti.notification_id}
              className="flex items-center p-4 bg-slate-100 rounded-lg shadow"
            >
              {/* แถบสีแนวตั้ง */}
              <div className="h-25 w-2 bg-[#FF0000] mr-4"></div>

              <div className="flex-1 justify-end">
              <p className="font-semibold text-[#2E5361]">
                {noti.notification_name}
              </p>
              <p className=" text-gray-600">
                ประเภท: {noti.notification_category}
              </p>

              {/* แสดงสถานะ */}
              <p
                className={`font-semibold ${
                  noti.notification_successed
                    ? "text-gray-400"
                    : noti.notification_accepted === "รอการตอบรับ"
                    ? "text-gray-500"
                    : noti.notification_accepted === "กำลังดำเนินการ"
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                สถานะ:{" "}
                {noti.notification_successed
                  ? "เสร็จสิ้น"
                  : noti.notification_accepted}
              </p>

              {/* ปุ่มแสดงเป็นข้อความแทน */}
              <div className="flex space-x-3 mt-2">
                {/* แสดงปุ่ม "รับทราบ" ตลอดเวลา */}
                {!noti.notification_successed && (
                  <button
                    onClick={() =>
                      updateStatus(noti.notification_id, "กำลังดำเนินการ")
                    }
                    className="text-[#007FCF] font-semibold hover:text-[#7cb1d0] cursor-pointer "
                  >
                    รับทราบ
                  </button>
                )}

                {/* แสดงปุ่ม "เสร็จสิ้น" ตลอดเวลา */}
                {!noti.notification_successed && (
                  <button
                    onClick={() =>
                      updateStatus(noti.notification_id, undefined, true)
                    }
                    className="text-[#22c265] font-semibold hover:text-[#7bdebf] animate-jump1 cursor-pointer"
                  >
                    เสร็จสิ้น
                  </button>
                )}
              </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
