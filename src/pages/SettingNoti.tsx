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
import { useSensorNotificationsConfigStore } from "../store/sensorNotificationsConfigStore";

const SettingNoti: React.FC = () => {
  const { bed_id } = useParams<{ bed_id?: string }>();
  const bed_id_num: number = Number(bed_id);
  const bedStore = useBedStore();
  const navigate = useNavigate();
  const useSenNotiCon = useSensorNotificationsConfigStore()
  const [activeTab, setActiveTab] = useState("settings");
  const [bed, setBed] = useState<Bed | undefined>();
  const [sensorList, setSensorList] = useState<Sensor[] | undefined>();
  const [selectedSensor, setSelectedSensor] = useState<Sensor | undefined>();
  const [sensorNotificationConfigs, setSensorNotificationConfigs] = useState<
    Sensor_Notification_Config[]
  >([]);
  const timelineData = [
    { time: "00:00", status: "เปลี่ยนแปลงบ่อย" },
    { time: "02:00", status: "นอนตะแคงซ้าย" },
    { time: "04:00", status: "นอนตะแคงขวา" },
    { time: "06:00", status: "ไม่อยู่ที่เตียง" },
    { time: "08:00", status: "นอนตรง" },
    { time: "10:00", status: "กำลังออกจากเตียง" },
    { time: "12:00", status: "นั่ง" },
    { time: "14:00", status: "อื่นๆ" },
    { time: "16:00", status: "ไม่อยู่ที่เตียง" },
    { time: "18:00", status: "เปลี่ยนแปลงบ่อย" },
    { time: "20:00", status: "กำลังออกจากเตียง" },
    { time: "22:00", status: "นอนตะแคงขวา" },
  ];

  useEffect(() => {
    useSenNotiCon.loadSensorNotificationConfig(bed_id_num)
    console.log(useSenNotiCon.sensorNotiConfigs)
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
      {activeTab === "settings" && (
        <NotificationTable
          sensorNotificationConfigs={useSenNotiCon.sensorNotiConfigs}
        />
      )}

      {activeTab === "timeline" && <TimelineGraph data={timelineData} />}

      {activeTab === "history" && (
        // มาทำหน้าได้เลย
        <div className="bg-white rounded-lg p-4 shadow-md"></div>
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
