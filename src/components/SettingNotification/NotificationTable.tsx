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
        <thead className="bg-[#95BAC3]">
          <tr>
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
              <tr key={index} className="border-b odd:bg-white even:bg-[#A1B5BC]">
                <td className="p-2 border text-center text-4xl">🛏️</td>
                <td className="p-2 border text-left">
                  {config.sensor_notifications_config_event}
                </td>
                <td className="p-2 pt-4 border text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={config.sensor_notifications_config_usage}
                    title="การใช้"
                  />
                  <div className="relative w-11 h-6 items-center bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#2E5361] dark:peer-checked:bg-blue-600"></div>
                  </label>
                </td>
                <td className="p-2 border text-center">
                  <select
                    className="p-1 border rounded bg-white"
                    defaultValue={config.sensor_notifications_config_repeatnoti}
                    title="เลือกค่าการแจ้งเตือนซ้ำ"
                  >
                    <option value={3}>3 นาที</option>
                    <option value={5}>5 นาที</option>
                    <option value={10}>10 นาที</option>
                  </select>
                </td>
                <td className="p-2 border text-center">
                  <select
                    className="p-1 border rounded bg-white"
                    defaultValue={config.sensor_notifications_config_rangetime}
                    title="ระยะเวลาการแจ้งเตือน"
                  >
                    <option value={1}>1 นาที</option>
                    <option value={3}>3 นาที</option>
                    <option value={5}>5 นาที</option>
                  </select>
                </td>
                <td className="p-2 border text-center">
                  <select
                    className="p-1 border rounded bg-white"
                    defaultValue={config.sensor_notifications_config_signal}
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
