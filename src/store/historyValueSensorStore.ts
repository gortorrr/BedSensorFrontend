import { create } from "zustand";
import { History_Value_Sensor } from "../types/history_value_sensor";
import { historyValueSensorService } from "../services/historyValueSensorService";


interface historyValueSensorStore {
  historySensor: History_Value_Sensor[];
  load1DayHistoryValue(sensor_id: number,date_str: string): Promise<void>
}
export const useSensorNotificationsConfigStore =
  create<historyValueSensorStore>((set) => ({
    historySensor: [],
    load1DayHistoryValue: async (sensor_id: number,date_str: string) => {
      set({ historySensor: [] });
      const res =
        await historyValueSensorService.load1DayHistoryValue(sensor_id,date_str);//2025-03-05
      console.log("res data ตรงนี้ ที่ store", res); // ✅ ป้องกัน error
      if (res) {
        set({ historySensor: Array.isArray(res) ? res : [res] }); // ✅ ป้องกัน error
      }
    },
  }));
