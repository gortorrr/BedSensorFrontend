import { Sensor_Notification_Config } from "../types/sensor_Notifications_config";
import http from "./http";
import { AxiosError } from "axios"; // ✅ นำเข้า AxiosError (ถ้าใช้ axios)
// import { Notification } from "../types/notification";
import { Bed } from "../types/bed";
import { Log_bed_patient_sensor } from "../types/log_bed_patient_sensor";
export const sensorNotificationsConfigService = {
  async loadSensorNotificationConfig(
    bed_id: number
  ): Promise<Sensor_Notification_Config | null> {
    try {
      const response = await http.get(
        `sensor_notifications_configs/sensor-notifications-config/${bed_id}`
      );
      return response.data; // ✅ คืนค่าข้อมูลที่ได้จาก API
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // ✅ เช็กว่าเป็น AxiosError หรือไม่
        if (error.response?.status === 404) {
          console.warn(
            `Sensor notifications config not found for bed_id: ${bed_id}`
          );
          return null; // ✅ คืน `null` ถ้า API ส่ง 404
        }
      } else if (error instanceof Error) {
        // ✅ เช็กว่าเป็น JavaScript Error ปกติ
        console.error(
          "Error loading sensor notification config:",
          error.message
        );
      } else {
        console.error("Unexpected error:", error); // ❌ ถ้าไม่ใช่ Error ปกติ ให้แสดงค่า error ทั้งหมด
      }
      throw error; // ❗ โยน error ออกไปให้ caller handle ต่อ
    }
  },

  async saveSensorNotificationConfig(
    sensor_id: number,
    sensorNotificationConfig: Sensor_Notification_Config
  ): Promise<Sensor_Notification_Config[]> {
    try {
      const response = await http.patch(
        `sensor_notifications_configs/update-sensor-notifications-config/${sensor_id}`,
        sensorNotificationConfig
      );
      return response.data; // นำข้อมูลที่ได้จาก response มาใช้
    } catch (error) {
      console.error("Error loading sensorNotiConfig wait:", error);
      throw error;
    }
  },

  async fetchNotification(
    bed_id: number,
    patient_id: number,
    sensor_id: number
  ): Promise<Log_bed_patient_sensor | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // ค้นหาข้อมูลที่ตรงกับ bed_id, patient_id, และ sensor_id
        const result = logNotificationFetchExamData.find(
          (log) =>
            log.bed_id === bed_id &&
            log.patient_id === patient_id &&
            log.sensor_id === sensor_id
        );
        resolve(result); // ส่งคืนข้อมูลที่พบ หรือ undefined ถ้าไม่พบ
      }, 100);
    });
  },
  async loadBedWithSensorConfig(bed_id: number): Promise<Bed> {
    {
      const res = await http.get(`beds/sensor-config/${bed_id}`);
      return res.data;
    }
  },
};

const logNotificationFetchExamData: Log_bed_patient_sensor[] = [
  {
    log_bed_patient_sensor_id: 1,
    bed_id: 1,
    patient_id: 1,
    sensor_id: 1,
    notifications: [
      {
        sensor_notifications_config_id: 0,
        notification_id: 0,
        notification_successed: false,
        notification_category: "แฉ็งหัว",
        notification_accepted: false,
        log_bed_patient_sensor_id: 0,
        sensor_notifications_config: {
          sensor_notifications_config_id: 0,
          sensor_notifications_config_event: "แฉ็งหัว",
          sensor_notifications_config_usage: false,
          sensor_notifications_config_repeatnoti: 0,
          sensor_notifications_config_rangetime: 0,
          sensor_notifications_config_signal: "",
        },
      },
      {
        sensor_notifications_config_id: 0,
        notification_id: 0,
        notification_successed: false,
        notification_category: "แฉ็งหัว",
        notification_accepted: false,
        log_bed_patient_sensor_id: 0,
        sensor_notifications_config: {
          sensor_notifications_config_id: 0,
          sensor_notifications_config_event: "ส้มหยุด",
          sensor_notifications_config_usage: false,
          sensor_notifications_config_repeatnoti: 0,
          sensor_notifications_config_rangetime: 0,
          sensor_notifications_config_signal: "",
        },
      },
      {
        sensor_notifications_config_id: 0,
        notification_id: 0,
        notification_successed: false,
        notification_category: "แฉ็งหัว",
        notification_accepted: false,
        log_bed_patient_sensor_id: 0,
        sensor_notifications_config: {
          sensor_notifications_config_id: 0,
          sensor_notifications_config_event: "เปรต",
          sensor_notifications_config_usage: false,
          sensor_notifications_config_repeatnoti: 0,
          sensor_notifications_config_rangetime: 0,
          sensor_notifications_config_signal: "",
        },
      },
    ],
  },
  {
    log_bed_patient_sensor_id: 1,
    bed_id: 1,
    patient_id: 1,
    sensor_id: 2,
    notifications: [
      {
        sensor_notifications_config_id: 0,
        notification_id: 0,
        notification_successed: false,
        notification_category: "แฉ็งหัว",
        notification_accepted: false,
        log_bed_patient_sensor_id: 0,
        sensor_notifications_config: {
          sensor_notifications_config_id: 0,
          sensor_notifications_config_event: "หยาหนัด",
          sensor_notifications_config_usage: false,
          sensor_notifications_config_repeatnoti: 0,
          sensor_notifications_config_rangetime: 0,
          sensor_notifications_config_signal: "",
        },
      },
    ],
  },
];
