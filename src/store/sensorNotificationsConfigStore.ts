import { create } from "zustand";
import { Sensor_Notification_Config } from "../types/sensor_Notifications_config";
import { sensorNotificationsConfigService } from "../services/sensorNotificationsConfigService";

interface sensorNotificationsConfigStore {
  loadSensorNotificationConfig: (bed_id: number) => Promise<Sensor_Notification_Config>;
  saveSensorNotificationConfig: (bed_id: number,sensorNotificationConfig:Sensor_Notification_Config) => Promise<void>;
}

export const useSensorStore = create<sensorNotificationsConfigStore>(() => ({
  loadSensorNotificationConfig: async (bed_id: number) => {
    const res = await sensorNotificationsConfigService.loadSensorNotificationConfig(bed_id);
    return res as Sensor_Notification_Config;
  },
  saveSensorNotificationConfig: async (bed_id: number,sensorNotificationConfig:Sensor_Notification_Config) => {
   await sensorNotificationsConfigService.saveSensorNotificationConfig(bed_id,sensorNotificationConfig);
  },
}));