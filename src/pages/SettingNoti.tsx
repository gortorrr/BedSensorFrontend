import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBedStore } from "../store/bedStore";
import { Bed } from "../types/bed";
import { Sensor } from "../types/sensor";
import { Sensor_Notification_Config } from "../types/sensor_Notifications_config";

const SettingNoti: React.FC = () => {
  const { bed_id } = useParams<{ bed_id?: string }>();
  const bedStore = useBedStore();
  const navigate = useNavigate();

  const [bed, setBed] = useState<Bed | undefined>();
  const [sensorList, setSensorList] = useState<Sensor[] | undefined>();
  const [selectedSensor, setSelectedSensor] = useState<Sensor | undefined>();
  const [sensorNotificationConfigs, setSensorNotificationConfigs] = useState<
    Sensor_Notification_Config[]
  >([]);

  useEffect(() => {
    console.log("🛏️ bed_id from URL:", bed_id);
    console.log("📦 bedStore.beds:", bedStore.beds);

    if (bed_id) {
      const bedIdNumber = parseInt(bed_id);
      console.log("🔍 Searching for bed with ID:", bedIdNumber);

      const foundBed = bedStore.beds.find(
        (item) => item.bed_id === bedIdNumber
      );

      if (foundBed) {
        console.log("✅ Found bed:", foundBed);
        setBed(foundBed);
        setSensorList(foundBed.sensors);

        // ✅ ตั้งค่าเซ็นเซอร์เริ่มต้นเป็น "Bed Sensor" หรือเซ็นเซอร์ตัวแรก
        const defaultSensor =
          foundBed.sensors.find((s) => s.sensor_name === "Bed Sensor") ||
          foundBed.sensors[0];
        setSelectedSensor(defaultSensor);

        // ✅ ถ้ามีเซ็นเซอร์ให้โหลด Notification Configs
        if (defaultSensor) {
          setSensorNotificationConfigs(
            defaultSensor.sensor_notification_config || []
          );
        }
      } else {
        console.warn("⚠️ No bed found with ID:", bedIdNumber);
      }
    }
  }, [bed_id, bedStore]);

  // เมื่อเปลี่ยนเซ็นเซอร์ ให้เปลี่ยนค่าการตั้งค่าแจ้งเตือนด้วย
  const handleSensorChange = (sensorId: number) => {
    const newSensor = sensorList?.find((s) => s.sensor_id === sensorId);
    setSelectedSensor(newSensor);
    setSensorNotificationConfigs(newSensor?.sensor_notification_config || []);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="p-4 bg-[#e7f0f3] min-h-screen">
      {/* Header */}
      <h2 className="text-3xl font-bold text-[#2E5361] mb-4">ตั้งค่าการแจ้งเตือน</h2>
      <div className="flex gap-2 mb-4">
        {/* Dropdown สำหรับเลือกเซ็นเซอร์ */}
        <select
          className="px-4 py-2  bg-white border rounded-lg inset-shadow cursor-pointer"
          value={selectedSensor?.sensor_id}
          onChange={(e) => handleSensorChange(parseInt(e.target.value))}
        >
          {sensorList?.map((sensor) => (
            <option key={sensor.sensor_id} value={sensor.sensor_id}>
              {sensor.sensor_name}
            </option>
          ))}
        </select>
        <button className="px-4 py-2 bg-white border rounded-lg inset-shadow">{bed?.room?.floor?.building?.building_name}</button>
        <button className="px-4 py-2 bg-white border rounded-lg inset-shadow">{bed?.room?.floor?.floor_name}</button>
        <button className="px-4 py-2 bg-white border rounded-lg inset-shadow">{bed?.room.room_name}</button>
        <button className="px-4 py-2 bg-white border rounded-lg inset-shadow">{bed?.bed_name}</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2">
        <button className="px-4 py-2 bg-[#5E8892] text-white rounded-t-lg cursor-pointer drop-shadow-md">ตั้งค่าการแจ้งเตือน</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-t-lg cursor-pointer">ไทม์ไลน์</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-t-lg cursor-pointer">ประวัติการแจ้งเตือน</button>
      </div>

      {/* Table */}
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
            {sensorNotificationConfigs &&
            sensorNotificationConfigs.length > 0 ? (
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
                    />
                  </td>
                  <td className="p-2 border">
                    <select
                      className="p-1 border rounded"
                      defaultValue={
                        config.sensor_notification_config_repeatnoti
                      }
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

      {/* Footer */}
      <div className="flex justify-end mt-6 gap-4">
        <button className="px-6 py-2 bg-[#5E8892] text-white rounded-xl hover:bg-[#95BAC3]">
          บันทึก
        </button>
        <button
          onClick={handleCancel}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

export default SettingNoti;
