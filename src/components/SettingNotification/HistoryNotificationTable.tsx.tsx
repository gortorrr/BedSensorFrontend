import React, { useEffect } from "react";
import { Bed } from "../../types/bed";
import { Notification } from "../../types/notification";

interface HistoryNotificationTableProps {
  notifications: Notification[];
  bed?: Bed;
}

const HistoryNotificationTable: React.FC<HistoryNotificationTableProps> = ({
  bed,
  notifications,
}) => {
  useEffect(() => {});

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#B7D6DE]">
            <th className="p-2 border">วัน/เวลา</th>
            <th className="p-2 border">อาคาร</th>
            <th className="p-2 border">ชั้น</th>
            <th className="p-2 border">ห้อง</th>
            <th className="p-2 border">เตียง</th>
            <th className="p-2 border">การแจ้งเตือน</th>
            <th className="p-2 border">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {notifications?.length > 0 ? (
            notifications.map((noti, index) => {
              // กำหนดสีของแถวตามประเภทของการแจ้งเตือน
              let rowColor = "bg-white";
              if (noti.notification_category === "Emergency") {
                rowColor = "bg-yellow-100";
              } else if (noti.notification_category === "SOS") {
                rowColor = "bg-red-200";
              }

              // กำหนดข้อความสถานะ
              let statusText = "ยังไม่จัดการ";
              if (noti.notification_accepted) {
                if (noti.notification_successed) {
                  statusText = "แจ้งเตือนเสร็จสิ้น";
                } else {
                  statusText = "กำลังดำเนินการ";
                }
              }

              return (
                <tr key={index} className={`text-center border-b ${rowColor}`}>
                  <td className="p-2 border">{noti.notification_createdate}</td>
                  <td className="p-2 border">
                    {bed?.room.floor.building.building_name}
                  </td>
                  <td className="p-2 border">{bed?.room.floor.floor_name}</td>
                  <td className="p-2 border">{bed?.room.room_name}</td>
                  <td className="p-2 border">{bed?.bed_name}</td>
                  <td className="p-2 border">
                    {
                      noti.sensor_notifications_config
                        .sensor_notifications_config_event
                    }
                  </td>
                  <td className="p-2 border">{statusText}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="p-4 text-center text-gray-500">
                ไม่มีข้อมูลการแจ้งเตือน
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryNotificationTable;
