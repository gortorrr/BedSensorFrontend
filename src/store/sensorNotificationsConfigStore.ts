import { create } from "zustand";
import { Sensor_Notification_Config } from "../types/sensor_Notifications_config";
import { sensorNotificationsConfigService } from "../services/sensorNotificationsConfigService";

interface sensorNotificationsConfigStore {
  loadSensorNotificationConfig: (sensor_id: number) => Promise<Sensor_Notification_Config>;
}

export const useSensorStore = create<sensorNotificationsConfigStore>(() => ({
  loadSensorNotificationConfig: async (bed_id: number) => {
    const res = await sensorNotificationsConfigService.loadSensorNotificationConfig(bed_id);
    return res as Sensor_Notification_Config;
  }
}));