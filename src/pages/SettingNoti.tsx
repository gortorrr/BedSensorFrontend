import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBedStore } from "../store/bedStore";
import { Bed } from "../types/bed";
import { Sensor } from "../types/sensor";
import { Sensor_Notification_Config } from "../types/sensor_Notifications_config";
import SensorAndBedInfo from "../components/SettingNotification/SensorAndBedInfo";
import NotificationTabs from "../components/SettingNotification/NotificationTabs";
import NotificationTable from "../components/SettingNotification/NotificationTable";
import TimelineGraph from "../components/SettingNotification/TimelineGraph";

const SettingNoti: React.FC = () => {
  const { bed_id } = useParams<{ bed_id?: string }>();
  const bedStore = useBedStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("settings");
  const [bed, setBed] = useState<Bed | undefined>();
  const [sensorList, setSensorList] = useState<Sensor[] | undefined>();
  const [selectedSensor, setSelectedSensor] = useState<Sensor | undefined>();
  const [sensorNotificationConfigs, setSensorNotificationConfigs] = useState<
    Sensor_Notification_Config[]
  >([]);

  const timelineData = [
    { time: "2025-03-12 08:47:48.181523", status: "ไม่อยู่บนเตียง" },
    { time: "2025-03-12 08:47:48.181523", status: "ไม่อยู่บนเตียง" },
  ];

  useEffect(() => {
    if (bed_id) {
      const bedIdNumber = parseInt(bed_id);
      const foundBed = bedStore.beds.find(
        (item) => item.bed_id === bedIdNumber
      );

      if (foundBed) {
        setBed(foundBed);
        setSensorList(foundBed.sensors);

        const defaultSensor =
          foundBed.sensors.find((s) => s.sensor_name === "Bed Sensor") ||
          foundBed.sensors[0];

        setSelectedSensor(defaultSensor);

        if (defaultSensor) {
          setSensorNotificationConfigs(
            defaultSensor.sensor_notification_config || []
          );
        }
      }
    }
  }, [bed_id, bedStore]);

  const handleSensorChange = (sensorId: number) => {
    const newSensor = sensorList?.find((s) => s.sensor_id === sensorId);
    setSelectedSensor(newSensor);
    setSensorNotificationConfigs(newSensor?.sensor_notification_config || []);
  };
  console.log("asdsd " + JSON.stringify(selectedSensor?.sensor_name, null, 2));
  // console.log("asdsd " + JSON.stringify(sensorList, null, 2));

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="p-4 bg-[#e7f0f3] min-h-screen">
      <h2 className="text-3xl font-bold text-[#2E5361] mb-4">
        ตั้งค่าการแจ้งเตือน
      </h2>

      {/* Dropdown และปุ่มเลือกเซ็นเซอร์/เตียง */}
      <SensorAndBedInfo
        sensorList={sensorList}
        selectedSensor={selectedSensor}
        bed={bed}
        onSensorChange={handleSensorChange}
      />

      {/* Tabs */}
      <NotificationTabs onTabChange={setActiveTab} />

      {/* Table */}
      {activeTab === "settings" && selectedSensor && (
        <>
          {selectedSensor.sensor_name === "Bed Sensor" && (
            <NotificationTable
              sensorNotificationConfigs={sensorNotificationConfigs}
            />
          )}

          {selectedSensor.sensor_name === "Heart Rate" && (
            <p className="text-red-500 font-semibold">แสดงข้อมูล Heart Rate</p>
          )}

          {selectedSensor.sensor_name === "SpO2 Sensor" && (
            <p className="text-green-500 font-semibold">
              แสดงข้อมูล SpO2 Sensor
            </p>
          )}

          {selectedSensor.sensor_name === "Respiration" && (
            <p className="text-blue-500 font-semibold">
              แสดงข้อมูล Respiration
            </p>
          )}
        </>
      )}

      {activeTab === "timeline" && selectedSensor && (
        <>
          {selectedSensor.sensor_name === "Bed Sensor" && (
            <TimelineGraph data={timelineData} />
          )}
          {selectedSensor.sensor_name === "Heart Rate" && (
            <p className="text-red-500 font-semibold">ไทม์ไลน์ Heart Rate</p>
          )}
          {selectedSensor.sensor_name === "SpO2 Sensor" && (
            <p className="text-green-500 font-semibold">ไทม์ไลน์ SpO2 Sensor</p>
          )}
          {selectedSensor.sensor_name === "Respiration" && (
            <p className="text-blue-500 font-semibold">ไทม์ไลน์ Respiration</p>
          )}
        </>
      )}

      {activeTab === "history" && selectedSensor && (
        <>
          {selectedSensor.sensor_name === "Bed Sensor" && (
            <div className="bg-white rounded-lg p-4 shadow-md">
              ประวัติของ Bed Sensor
            </div>
          )}
          {selectedSensor.sensor_name === "Heart Rate" && (
            <div className="bg-white rounded-lg p-4 shadow-md text-red-500">
              ประวัติ Heart Rate
            </div>
          )}
          {selectedSensor.sensor_name === "SpO2 Sensor" && (
            <div className="bg-white rounded-lg p-4 shadow-md text-green-500">
              ประวัติ SpO2 Sensor
            </div>
          )}
          {selectedSensor.sensor_name === "Respiration" && (
            <div className="bg-white rounded-lg p-4 shadow-md text-blue-500">
              ประวัติ Respiration
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <div className="flex justify-end mt-6 gap-4">
        <button className="px-6 py-2 bg-[#5E8892] text-white rounded-xl hover:bg-[#95BAC3] cursor-pointer">
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

export default SettingNoti;
