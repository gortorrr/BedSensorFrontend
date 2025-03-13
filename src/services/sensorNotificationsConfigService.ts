
import { Sensor_Notification_Config } from "../types/sensor_Notifications_config";
import http from "./http";

export const sensorNotificationsConfigService = {
  async loadSensorNotificationConfig(bed_id: number): Promise<Sensor_Notification_Config> {
    const response = await http.get(`sensor_notifications_configs/sensor-notifications-config/${bed_id}`);
    return response.data; // นำข้อมูลที่ได้จาก response มาใช้
  },
  async saveSensorNotificationConfig(bed_id: number,sensorNotificationConfig:Sensor_Notification_Config): Promise<Sensor_Notification_Config> {
    const response = await http.patch(`sensor_notifications_configs/update-sensor-notifications-config/${bed_id}`,sensorNotificationConfig);
    return response.data; // นำข้อมูลที่ได้จาก response มาใช้
  },

  
};
