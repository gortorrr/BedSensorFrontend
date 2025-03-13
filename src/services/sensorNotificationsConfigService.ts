
import { Sensor_Notification_Config } from "../types/sensor_Notifications_config";
import http from "./http";
import { AxiosError } from "axios"; // ✅ นำเข้า AxiosError (ถ้าใช้ axios)
export const sensorNotificationsConfigService = {


  async loadSensorNotificationConfig(bed_id: number): Promise<Sensor_Notification_Config | null> {
    try {
      const response = await http.get(`sensor_notifications_configs/sensor-notifications-config/${bed_id}`);
      return response.data; // ✅ คืนค่าข้อมูลที่ได้จาก API
    } catch (error: unknown) {
      if (error instanceof AxiosError) { // ✅ เช็กว่าเป็น AxiosError หรือไม่
        if (error.response?.status === 404) {
          console.warn(`Sensor notifications config not found for bed_id: ${bed_id}`);
          return null; // ✅ คืน `null` ถ้า API ส่ง 404
        }
      } else if (error instanceof Error) { // ✅ เช็กว่าเป็น JavaScript Error ปกติ
        console.error("Error loading sensor notification config:", error.message);
      } else {
        console.error("Unexpected error:", error); // ❌ ถ้าไม่ใช่ Error ปกติ ให้แสดงค่า error ทั้งหมด
      }
      throw error; // ❗ โยน error ออกไปให้ caller handle ต่อ
    }
  },
  async saveSensorNotificationConfig(bed_id: number,sensorNotificationConfig:Sensor_Notification_Config): Promise<Sensor_Notification_Config[]> {
    try {
      const response = await http.patch(`sensor_notifications_configs/update-sensor-notifications-config/${bed_id}`,sensorNotificationConfig);
      return response.data; // นำข้อมูลที่ได้จาก response มาใช้
    } catch (error) {
      console.error("Error loading sensorNotiConfig wait:", error);
      throw error;
    }
   
  },

  
};
