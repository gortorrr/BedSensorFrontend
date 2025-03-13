import { create } from "zustand";
import { Sensor_Notification_Config } from "../types/sensor_Notifications_config";
import { sensorNotificationsConfigService } from "../services/sensorNotificationsConfigService";

interface sensorNotificationsConfigStore {
  sensorNotiConfigs: Sensor_Notification_Config[];
  loadSensorNotificationConfig: (bed_id: number) => Promise<void>;
  saveSensorNotificationConfig: (
    bed_id: number,
    sensorNotificationConfig: Sensor_Notification_Config
  ) => Promise<void>;
}

export const useSensorNotificationsConfigStore =
  create<sensorNotificationsConfigStore>((set) => ({
    sensorNotiConfigs: [],
    loadSensorNotificationConfig: async (bed_id: number) => {
      set({ sensorNotiConfigs: [] });
      const res =
        await sensorNotificationsConfigService.loadSensorNotificationConfig(
          bed_id
        );
      console.log("res data ตรงนี้ ที่ store", res); // ✅ ป้องกัน error
      if (res) {
        set({ sensorNotiConfigs: Array.isArray(res) ? res : [res] }); // ✅ ป้องกัน error
      }
    },
    saveSensorNotificationConfig: async (
      sensor_id: number,
      sensorNotificationConfig: Sensor_Notification_Config
    ) => {
      await sensorNotificationsConfigService.saveSensorNotificationConfig(
        sensor_id,
        sensorNotificationConfig
      );
    },
  }));
