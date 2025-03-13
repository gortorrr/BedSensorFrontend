import { create } from "zustand";
import { Sensor_Notification_Config } from "../types/sensor_Notifications_config";
import { sensorNotificationsConfigService } from "../services/sensorNotificationsConfigService";

interface sensorNotificationsConfigStore {
  sensorNotiConfig: Sensor_Notification_Config | null;
  loadSensorNotificationConfig: (bed_id: number) => Promise<void>;
  saveSensorNotificationConfig: (bed_id: number,sensorNotificationConfig:Sensor_Notification_Config) => Promise<void>;
}

export const useSensorNotificationsConfigStore = create<sensorNotificationsConfigStore>((set) => ({
  sensorNotiConfig: null,
  loadSensorNotificationConfig: async (bed_id: number) => {
    const res = await sensorNotificationsConfigService.loadSensorNotificationConfig(bed_id);
    console.log("res data ตรงนี้ ที่ store", res);  // ✅ ป้องกัน error 
    set({sensorNotiConfig:res});
  },
  saveSensorNotificationConfig: async (bed_id: number, sensorNotificationConfig: Sensor_Notification_Config) => {
    await sensorNotificationsConfigService.saveSensorNotificationConfig(bed_id, sensorNotificationConfig);
  },
}));
