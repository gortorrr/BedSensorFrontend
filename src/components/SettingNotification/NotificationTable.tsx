import React from "react";
import { Sensor } from "../../types/sensor";
import { Sensor_Notification_Config } from "../../types/sensor_Notifications_config";
// นำเข้ารูปภาพไอคอนต่างๆ
import LeftSide from "../../assets/LeftSide.png";
import RightSide from "../../assets/RightSide.png";
import Straight from "../../assets/Straight.png";
import Sit from "../../assets/Sit.png";
import NotHere from "../../assets/NotHere.png";
import { useNavigate } from "react-router-dom";
import { useSensorNotificationsConfigStore } from "../../store/sensorNotificationsConfigStore";

interface NotificationTableProps {
  sensor: Sensor;
  configs: Sensor_Notification_Config[];
  onConfigsChange: (configs: Sensor_Notification_Config[]) => void;
}

const NotificationTable: React.FC<NotificationTableProps> = ({
  sensor,
  configs,
  onConfigsChange,
}) => {
  const navigate = useNavigate();
  const { saveSensorNotificationConfig } = useSensorNotificationsConfigStore();

  // useEffect(() => {
  //   console.log("test");
  //   console.log(sensor);
  //   console.log(configs);
  // }, [sensor, configs]);

  const handleCancel = () => {
    navigate("/");
  };

  const handleConfirm = () => {
    console.log("Save");
    console.log(sensor);
    console.log(configs);
    saveSensorNotificationConfig(sensor.sensor_id, sensor);
    alert("บันทึกสำเร็จ");
  };

  // ฟังก์ชันสำหรับแสดงไอคอนขนาดเล็กตามประเภทของเหตุการณ์
  const renderSmallBedIcon = (eventType: string) => {
    // แมปค่าของเหตุการณ์กับไอคอนที่เหมาะสม
    const iconMap: { [key: string]: string } = {
      นั่งบนเตียง: Sit,
      ตะแคงซ้าย: LeftSide,
      ตะแคงขวา: RightSide,
      นอนหงาย: Straight,
      ไม่อยู่ที่เตียง: NotHere,
    };

    const icon = iconMap[eventType] || Straight; // ใช้ไอคอนนอนตรงเป็นค่าเริ่มต้น

    return (
      <div className="flex justify-center items-center">
        <img src={icon} alt={eventType} className="w-13 h-13" />
      </div>
    );
  };

  return (
    <div>
      <div className="bg-white rounded-lg p-3 shadow-md ">
        <table className="w-full border-collapse">
          <thead className="bg-[#B7D6DE] h-16 py-4 font-bold">
            <tr>
              {sensor.sensor_type === "bed_sensor" && (
                <th className="p-2">ไอคอน</th>
              )}
              <th className="p-2 text-left">เหตุการณ์</th>
              <th className="p-2">การใช้</th>
              <th className="p-2">การแจ้งเตือนซ้ำ</th>
              <th className="p-2">ระยะเวลาการแจ้งเตือน</th>
              <th className="p-2">สัญญาณ</th>
            </tr>
          </thead>

          <tbody>
            {sensor.sensor_notifications_config &&
            sensor.sensor_notifications_config.length > 0 ? (
              sensor.sensor_notifications_config.map((config, index) => (
                <tr key={index} className="odd:bg-white even:bg-[#A1B5BC]">
                  {sensor.sensor_type === "bed_sensor" && (
                    <td className="p-2 text-center">
                      {renderSmallBedIcon(
                        config.sensor_notifications_config_event
                      )}
                    </td>
                  )}
                  <td className="p-2 text-left pl-2">
                    {config.sensor_notifications_config_event}
                  </td>
                  <td className="p-2 pt-4 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={
                          config.sensor_notifications_config_usage
                        }
                        title="การใช้"
                        onChange={(e) => {
                          const updated = [...configs];
                          updated[index].sensor_notifications_config_usage =
                            e.target.checked;
                          onConfigsChange(updated);
                        }}
                      />
                      <div className="relative w-11 h-6 items-center bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#2E5361] dark:peer-checked:bg-black"></div>
                    </label>
                  </td>
                  <td className="p-2 text-center">
                    <select
                      className="p-1 rounded-2xl bg-white border"
                      defaultValue={
                        config.sensor_notifications_config_repeatnoti
                      }
                      title="เลือกค่าการแจ้งเตือนซ้ำ"
                      onChange={(e) => {
                        const updated = [...configs];
                        updated[index].sensor_notifications_config_repeatnoti =
                          parseInt(e.target.value);
                        onConfigsChange(updated);
                      }}
                    >
                      <option value={3}>3 นาที</option>
                      <option value={5}>5 นาที</option>
                      <option value={10}>10 นาที</option>
                    </select>
                  </td>
                  <td className="p-2 text-center">
                    <select
                      className="p-1 rounded-2xl bg-white border"
                      defaultValue={
                        config.sensor_notifications_config_rangetime
                      }
                      title="ระยะเวลาการแจ้งเตือน"
                      onChange={(e) => {
                        const updated = [...configs];
                        updated[index].sensor_notifications_config_rangetime =
                          parseInt(e.target.value);
                        onConfigsChange(updated);
                      }}
                    >
                      <option value={1}>1 นาที</option>
                      <option value={3}>3 นาที</option>
                      <option value={5}>5 นาที</option>
                    </select>
                  </td>
                  <td className="p-2 text-center">
                    <select
                      className="p-1 rounded-2xl bg-white border"
                      defaultValue={config.sensor_notifications_config_signal}
                      title="สัญญาณ"
                      onChange={(e) => {
                        const updated = [...configs];
                        updated[index].sensor_notifications_config_signal =
                          e.target.value;
                        onConfigsChange(updated);
                      }}
                    >
                      <option value="Normal">ปกติ</option>
                      <option value="SOS">ช่วยเหลือ</option>
                      <option value="Emergency">อันตราย</option>
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

      {/* Footer */}
      <div className="flex justify-end mt-6 gap-4">
        <button
          className="px-6 py-2 bg-[#5E8892] text-white rounded-xl hover:bg-[#95BAC3] cursor-pointer"
          onClick={handleConfirm}
        >
          บันทึก
        </button>
        <button
          onClick={handleCancel}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 cursor-pointer"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

export default NotificationTable;
