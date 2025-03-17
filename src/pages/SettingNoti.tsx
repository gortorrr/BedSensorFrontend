import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useBedStore } from "../store/bedStore";
import { Bed } from "../types/bed";
import { Sensor } from "../types/sensor";
import { History_Value_Sensor } from "../types/history_value_sensor";
// import { Sensor_Notification_Config } from "../types/sensor_Notifications_config";
import SensorAndBedInfo from "../components/SettingNotification/SensorAndBedInfo";
import NotificationTabs from "../components/SettingNotification/NotificationTabs";
import NotificationTable from "../components/SettingNotification/NotificationTable";
import TimelineGraph from "../components/SettingNotification/BedSensorGraph.tsx";
import SensorGraph from "../components/SettingNotification/SensorGraph.tsx";
import { useSensorNotificationsConfigStore } from "../store/sensorNotificationsConfigStore";
import { usehistoryValueSensorStore } from "../store/historyValueSensorStore.ts";
import HistoryNotificationTable from "../components/SettingNotification/HistoryNotificationTable.tsx";
// import { sensorNotificationsConfigService } from "../services/sensorNotificationsConfigService.ts";
// import { Notification } from "../types/notification.ts";
// import { useNotificationStore } from "../store/notificationStore.ts";

const SettingNoti: React.FC = () => {
  const { bed_id } = useParams<{ bed_id?: string }>();
  // const bedStore = useBedStore();
  const navigate = useNavigate();
  // const NotificationStore = useNotificationStore();
  const useSenNotiCon = useSensorNotificationsConfigStore();
  const [activeTab, setActiveTab] = useState("settings");
  const [bed, setBed] = useState<Bed | undefined>();
  const [sensorList, setSensorList] = useState<Sensor[] | undefined>();
  const [selectedSensor, setSelectedSensor] = useState<Sensor | undefined>();
  const [sensorHistory, setSensorHistory] = useState<History_Value_Sensor[]>(
    []
  );
  const load1DayHistoryValue = usehistoryValueSensorStore(
    (state) => state.load1DayHistoryValue
  );

  // const [sensorNotificationConfigs, setSensorNotificationConfigs] = useState<
  //   Sensor_Notification_Config[]
  // >([]);

  // const [notifications, setNotifications] = useState<Notification[]>([]);

  // const updateNotifications = (newNotifications: Notification[]) => {
  // const updateNotifications = async (p: number, s: number) => {
  //   const res: Notification[] | null =
  //     await NotificationStore.loadAllNotificationByPatient(p, s);
  //   console.log("ทำไมวะ", res);
  //   if (res) {
  //     setNotifications(res);
  //   }
  // };

  // const selectSensorToConfig = async (sensor_id: number) => {
  //   const res: Notification[] | null =
  //     await NotificationStore.loadAllNotificationByPatient(p, s);
  //   console.log("ทำไมวะ", res);
  //   if (res) {
  //     setNotifications(res);
  //   }
  // };

  useEffect(() => {
    const loadData = async () => {
      const bedIdNumber: number = Number(bed_id);
      const res = await useSenNotiCon.loadBedWithSensorConfig(bedIdNumber);
      setBed(res);
      setSensorList(res?.sensors);
      if (res) {
        const defaultSensor =
          res.sensors.find((s) => s.sensor_type === "bed_sensor") ||
          res.sensors[0];
        setSelectedSensor(defaultSensor);
      }
    };

    loadData();
  }, [bed_id, useSenNotiCon]);

  useEffect(() => {
    const loadSensorHistory = async () => {
      if (selectedSensor) {
        const currentDate = new Date().toISOString().split("T")[0]; // วันที่ปัจจุบัน
        console.log(
          "📌 กำลังโหลดข้อมูลสำหรับ sensor:",
          selectedSensor.sensor_id,
          "วันที่:",
          currentDate
        );

        const historyData = await load1DayHistoryValue(
          selectedSensor.sensor_id,
          currentDate // ส่ง date_str เป็น argument ที่สอง
        );

        console.log("✅ ข้อมูลที่ได้จาก load1DayHistoryValue:", historyData);
        setSensorHistory(historyData);
      }
    };

    loadSensorHistory();
  }, [selectedSensor, load1DayHistoryValue]);

  // useEffect(() => {
  //   updateNotifications(1,4);
  //   const bedIdNumber: number = Number(bed_id);
  //   useSenNotiCon.loadSensorNotificationConfig(bedIdNumber);
  //   console.log(useSenNotiCon.sensorNotiConfigs);
  //   if (bed_id) {
  //     const foundBed = bedStore.beds.find(
  //       (item) => item.bed_id === bedIdNumber
  //     );

  //     if (foundBed) {
  //       setBed(foundBed);
  //       setSensorList(foundBed.sensors);

  //       const defaultSensor =
  //         foundBed.sensors.find((s) => s.sensor_name === "Bed Sensor") ||
  //         foundBed.sensors[0];

  //       setSelectedSensor(defaultSensor);

  //       if (defaultSensor) {
  //         setSensorNotificationConfigs(
  //           defaultSensor.sensor_notification_config || []
  //         );
  //         console.log(sensorNotificationConfigs);
  //       }
  //     }
  //   }

  // }, [bed_id, bedStore]);

  // const updateSensorSelectedToConfig = async (sensor_id) => {};

  const handleSensorChange = (sensorId: number) => {
    const newSensor = sensorList?.find((s) => s.sensor_id === sensorId);
    setSelectedSensor(newSensor);

    // setSensorNotificationConfigs(newSensor?.sensor_notification_config || []);
    // updateNotifications(1, 4);
  };
  // console.log("asdsd " + JSON.stringify(selectedSensor?.sensor_name, null, 2));
  // console.log("asdsd " + JSON.stringify(sensorList, null, 2));

  const handleCancel = () => {
    navigate("/");
  };

  console.log("📌 sensorHistory (ดิบ):", sensorHistory);

  console.log(
    "🔍 ตรวจสอบค่าที่จะส่งไปยัง TimelineGraph:",
    sensorHistory.map((item) => ({
      time: item.history_value_sensor_time ?? "",
      position: item.history_value_sensor_value,
    }))
  );

  return (
    <div className="p-4 bg-[#e7f0f3] min-h-screen ">
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
          <NotificationTable sensor={selectedSensor} />
        </>
      )}

      {activeTab === "timeline" && selectedSensor && (
        <>
          {selectedSensor.sensor_name === "Bed Sensor" && (
            <TimelineGraph
              data={sensorHistory.map((item) => ({
                time: item.history_value_sensor_time ?? "", // ✅ ใช้ฟิลด์ที่ถูกต้อง
                position: item.history_value_sensor_value, // ✅ ใช้ฟิลด์ที่ถูกต้อง
              }))}
            />
          )}
          {selectedSensor.sensor_name === "Heart Rate" && (
            <SensorGraph
              title="Heart Rate"
              unit="BPM"
              color="red"
              data={sensorHistory.map((item) => ({
                time: item.history_value_sensor_time ?? "", // ✅ ใช้ฟิลด์ที่ถูกต้อง
                value: parseFloat(item.history_value_sensor_value) || 0, // ✅ แปลง string -> number
              }))}
              minValue={50}
              maxValue={130}
            />
          )}
          {selectedSensor.sensor_name === "SpO2 Sensor" && (
            <SensorGraph
              title="SpO2"
              unit="%"
              color="blue"
              data={sensorHistory.map((item) => ({
                time: item.history_value_sensor_time ?? "", // ✅ ใช้ฟิลด์ที่ถูกต้อง
                value: parseFloat(item.history_value_sensor_value) || 0, // ✅ แปลง string -> number
              }))}
              minValue={85}
              maxValue={100}
            />
          )}
          {selectedSensor.sensor_name === "Respiration" && (
            <SensorGraph
              title="Respiration"
              unit="ครั้ง/นาที"
              color="orange"
              data={sensorHistory.map((item) => ({
                time: item.history_value_sensor_time ?? "", // ✅ ใช้ฟิลด์ที่ถูกต้อง
                value: parseFloat(item.history_value_sensor_value) || 0, // ✅ แปลง string -> number
              }))}
              minValue={15}
              maxValue={35}
            />
          )}
        </>
      )}

      {activeTab === "history" && selectedSensor && (
        <>
          {bed && (
            <HistoryNotificationTable
              bed={bed}
              patient_id={bed?.patient_id ?? 0}
              sensor_id={selectedSensor.sensor_id}
            ></HistoryNotificationTable>
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
