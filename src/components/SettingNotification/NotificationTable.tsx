import React from "react";
import { Sensor_Notification_Config } from "../../types/sensor_Notifications_config";

interface NotificationTableProps {
  sensorNotificationConfigs: Sensor_Notification_Config[];
}

const NotificationTable: React.FC<NotificationTableProps> = ({
  sensorNotificationConfigs,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#B7D6DE]">
            <th className="p-2 border">ไอคอน</th>
            <th className="p-2 border">เหตุการณ์</th>
            <th className="p-2 border">การใช้</th>
            <th className="p-2 border">การแจ้งเตือนซ้ำ</th>
            <th className="p-2 border">ระยะเวลาการแจ้งเตือน</th>
            <th className="p-2 border">สัญญาณ</th>
          </tr>
        </thead>
        <tbody>
          {sensorNotificationConfigs.length > 0 ? (
            sensorNotificationConfigs.map((config, index) => (
              <tr key={index} className="text-center border-b">
                <td className="p-2 border">🛏️</td>
                <td className="p-2 border">
                  {config.sensor_notification_config_event}
                </td>
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    className="scale-125"
                    defaultChecked={config.sensor_notification_config_usage}
                    title="การใช้"
                  />
                </td>
                <td className="p-2 border">
                  <select
                    className="p-1 border rounded"
                    defaultValue={config.sensor_notification_config_repeatnoti}
                    title="เลือกค่าการแจ้งเตือนซ้ำ"
                  >
                    <option value={3}>3 นาที</option>
                    <option value={5}>5 นาที</option>
                    <option value={10}>10 นาที</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <select
                    className="p-1 border rounded"
                    defaultValue={config.sensor_notification_config_rangetime}
                    title="ระยะเวลาการแจ้งเตือน"
                  >
                    <option value={1}>1 นาที</option>
                    <option value={3}>3 นาที</option>
                    <option value={5}>5 นาที</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <select
                    className="p-1 border rounded"
                    defaultValue={config.sensor_notification_config_signal}
                    title="สัญญาณ"
                  >
                    <option value="ปกติ">ปกติ</option>
                    <option value="ช่วยเหลือ">ช่วยเหลือ</option>
                    <option value="อันตราย">อันตราย</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                ไม่มีข้อมูลแจ้งเตือนสำหรับเซ็นเซอร์นี้
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationTable;
