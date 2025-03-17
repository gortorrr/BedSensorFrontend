import React, { useEffect } from "react";
// import { Bed } from "../../types/bed";
// import { useNotificationStore } from "../../store/notificationStore";
import { Bed } from "../../types/bed";
import { useSensorNotificationsConfigStore } from "../../store/sensorNotificationsConfigStore";
// import { Notification } from "../../types/notification";

interface HistoryNotificationTableProps {
  bed: Bed;
  patient_id: number;
  sensor_id: number;
}

const HistoryNotificationTable: React.FC<HistoryNotificationTableProps> = ({
  bed,
  patient_id,
  sensor_id,
}) => {
  // const { loadLogHistoryNotifications, LogHistoryNotifications } =
  //   useNotificationStore();
  const {
    loadLogNotifications,
    // logAllNotifications,
    targetLog,
    targetLogHistory,
  } = useSensorNotificationsConfigStore();

  useEffect(() => {
    // เรียกใช้ฟังก์ชัน loadLogHistoryNotifications เมื่อ bed_id, patient_id, หรือ sensor_id เปลี่ยน
    // if (bed.bed_id && patient_id && sensor_id) {
    //   loadLogHistoryNotifications(bed.bed_id, patient_id, sensor_id);
    // }
    // console.log();
    loadLogNotifications(bed.bed_id, patient_id);
  }, [bed.bed_id, patient_id, loadLogNotifications]);

  useEffect(() => {
    // เรียกใช้ฟังก์ชัน loadLogHistoryNotifications เมื่อ bed_id, patient_id, หรือ sensor_id เปลี่ยน
    if (bed.bed_id && patient_id && sensor_id) {
      targetLog(bed.bed_id, patient_id, sensor_id);
    }
  }, [bed.bed_id, patient_id, sensor_id, targetLog]);

  return (
    <div className="bg-white rounded-lg p-3 shadow-md">
      <table className="w-full border-collapse">
        <thead className="h-16">
          <tr className="bg-[#B7D6DE]">
            <th className="p-2 ">วัน/เวลา</th>
            <th className="p-2 ">อาคาร</th>
            <th className="p-2 ">ชั้น</th>
            <th className="p-2 ">ห้อง</th>
            <th className="p-2 ">เตียง</th>
            <th className="p-2 ">การแจ้งเตือน</th>
            <th className="p-2 ">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {targetLogHistory?.notifications &&
          targetLogHistory?.notifications.length > 0 ? (
            targetLogHistory?.notifications.map((noti, index) => {
              // กำหนดสีของแถวตามประเภทของการแจ้งเตือน
              let rowColor = index % 2 === 0 ? "bg-white" : "bg-[#A1B5BC]";

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
                <tr key={index} className={`text-center  ${rowColor}`}>
                  <td className="p-2 h-13">{noti.notification_createdate}</td>
                  <td className="p-2 h-13">
                    {bed?.room.floor.building.building_name}
                  </td>
                  <td className="p-2 h-13">{bed?.room.floor.floor_name}</td>
                  <td className="p-2 h-13">{bed?.room.room_name}</td>
                  <td className="p-2 h-13">{bed?.bed_name}</td>
                  <td className="p-2 h-13">
                    {
                      noti.sensor_notifications_config
                        .sensor_notifications_config_event
                    }
                  </td>
                  <td className="p-2 ">{statusText}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="p-4 text-center text-gray-500">
                ไม่มีข้อมูลการแจ้งเตือน {bed.bed_id}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryNotificationTable;
