import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBedStore } from "../store/bedStore";
import { Bed } from "../types/bed";
import { Sensor } from "../types/sensor";
import { Sensor_Notification_Config } from "../types/sensor_Notifications_config";
import SensorAndBedInfo from "../components/SettingNotification/SensorAndBedInfo";
import NotificationTabs from "../components/SettingNotification/NotificationTabs";
import NotificationTable from "../components/SettingNotification/NotificationTable";
import TimelineGraph from "../components/SettingNotification/BedSensorGraph.tsx";
import SensorGraph from "../components/SettingNotification/SensorGraph.tsx";
import { useSensorNotificationsConfigStore } from "../store/sensorNotificationsConfigStore";
import HistoryNotificationTable from "../components/SettingNotification/HistoryNotificationTable.tsx";
// import { sensorNotificationsConfigService } from "../services/sensorNotificationsConfigService.ts";
import { Notification } from "../types/notification.ts";
import { useNotificationStore } from "../store/notificationStore.ts";

const SettingNoti: React.FC = () => {
  const { bed_id } = useParams<{ bed_id?: string }>();
  const bedStore = useBedStore();
  const navigate = useNavigate();
  const NotificationStore = useNotificationStore();
  const useSenNotiCon = useSensorNotificationsConfigStore();
  const [activeTab, setActiveTab] = useState("settings");
  const [bed, setBed] = useState<Bed | undefined>();
  const [sensorList, setSensorList] = useState<Sensor[] | undefined>();
  const [selectedSensor, setSelectedSensor] = useState<Sensor | undefined>();
  const [sensorNotificationConfigs, setSensorNotificationConfigs] = useState<
    Sensor_Notification_Config[]
  >([]);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  // const updateNotifications = (newNotifications: Notification[]) => {
  const updateNotifications = async (p:number,s:number) => {
    const res: Notification[] | null = await NotificationStore.loadAllNotificationByPatient(p, s);
    console.log("ทำไมวะ",res)
    if(res){
    setNotifications(res);
    }
  };

  const timelineData = [
    { time: "2025-03-12 00:53:41.923954", position: "ไม่อยู่ที่เตียง" },
    { time: "2025-03-12 10:53:46.923954", position: "ไม่อยู่ที่เตียง" },
    { time: "2025-03-12 10:53:51.923954", position: "นั่ง" },
    { time: "2025-03-12 13:53:56.923954", position: "นั่ง" },
    { time: "2025-03-12 13:54:01.923954", position: "นอนตรง" },
    { time: "2025-03-12 14:54:06.923954", position: "นอนตรง" },
    { time: "2025-03-12 15:53:46.923954", position: "นอนตะแคงซ้าย" },
    { time: "2025-03-12 18:53:46.923954", position: "นอนตะแคงซ้าย" },
    { time: "2025-03-12 18:54:41.923954", position: "นอนตะแคงขวา" },
    { time: "2025-03-12 20:54:46.923954", position: "นอนตะแคงขวา" },
  ];

  const mockHeartRateData = [
    { time: "2025-03-12 00:00:00", value: 70 },
    { time: "2025-03-12 01:00:00", value: 75 },
    { time: "2025-03-12 01:30:05", value: 60 },
    { time: "2025-03-12 01:30:10", value: 60 },
    { time: "2025-03-12 01:30:15", value: 60 },
    { time: "2025-03-12 02:00:00", value: 80 },
    { time: "2025-03-12 03:00:00", value: 65 },
    { time: "2025-03-12 04:00:00", value: 72 },
    { time: "2025-03-12 05:00:00", value: 78 },
    { time: "2025-03-12 06:00:00", value: 68 },
    { time: "2025-03-12 07:00:00", value: 82 },
    { time: "2025-03-12 08:00:00", value: 76 },
    { time: "2025-03-12 09:00:00", value: 79 },
  ];

  const mockSpO2Data = [
    { time: "2025-03-12 00:00:00", value: 96 },
    { time: "2025-03-12 01:00:00", value: 95 },
    { time: "2025-03-12 02:00:00", value: 94 },
    { time: "2025-03-12 03:00:00", value: 97 },
    { time: "2025-03-12 04:00:00", value: 96 },
    { time: "2025-03-12 05:00:00", value: 95 },
    { time: "2025-03-12 06:00:00", value: 96 },
    { time: "2025-03-12 07:00:00", value: 94 },
    { time: "2025-03-12 08:00:00", value: 97 },
    { time: "2025-03-12 09:00:00", value: 98 },
  ];

  const mockRespirationData = [
    { time: "2025-03-12 00:00:00", value: 20 },
    { time: "2025-03-12 01:00:00", value: 22 },
    { time: "2025-03-12 02:00:00", value: 19 },
    { time: "2025-03-12 03:00:00", value: 21 },
    { time: "2025-03-12 04:00:00", value: 20 },
    { time: "2025-03-12 05:00:00", value: 23 },
    { time: "2025-03-12 06:00:00", value: 21 },
    { time: "2025-03-12 07:00:00", value: 22 },
    { time: "2025-03-12 08:00:00", value: 24 },
    { time: "2025-03-12 09:00:00", value: 20 },
  ];

  useEffect(() => {
    updateNotifications(1,4);
    const bedIdNumber: number = Number(bed_id);
    useSenNotiCon.loadSensorNotificationConfig(bedIdNumber);
    console.log(useSenNotiCon.sensorNotiConfigs);
    if (bed_id) {
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
          console.log(sensorNotificationConfigs);
        }
      }
    }
    
  }, [bed_id, bedStore]);

  const handleSensorChange = (sensorId: number) => {
    const newSensor = sensorList?.find((s) => s.sensor_id === sensorId);
    setSelectedSensor(newSensor);
    setSensorNotificationConfigs(newSensor?.sensor_notification_config || []);
    updateNotifications(1,4);
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
              sensorNotificationConfigs={useSenNotiCon.sensorNotiConfigs}
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
            <SensorGraph
              title="Heart Rate"
              unit="BPM"
              color="red"
              data={mockHeartRateData}
              minValue={50}
              maxValue={130}
            />
          )}
          {selectedSensor.sensor_name === "SpO2 Sensor" && (
            <SensorGraph
              title="SpO2"
              unit="%"
              color="blue"
              data={mockSpO2Data}
              minValue={85}
              maxValue={100}
            />
          )}
          {selectedSensor.sensor_name === "Respiration" && (
            <SensorGraph
              title="Respiration"
              unit="ครั้ง/นาที"
              color="orange"
              data={mockRespirationData}
              minValue={15}
              maxValue={35}
            />
          )}
        </>
      )}

      {activeTab === "history" && selectedSensor && (
        <>
          {selectedSensor.sensor_name === "Bed Sensor" && (
            <HistoryNotificationTable
              bed={bed}
              notifications={notifications}
            ></HistoryNotificationTable>
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
          <div>yellow = Emergency</div>
          <div>red = SOS</div>
          <div>I think we should re design this page later</div>
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
