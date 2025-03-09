import { create } from "zustand";
import { Sensor } from "../types/sensor";
import { sensorService } from "../services/sensorService";

interface SensorStore {
  loadValueSensor: (sensor_id: number) => Promise<Sensor>;
}

export const useSensorStore = create<SensorStore>(() => ({
  loadValueSensor: async (sensor_id: number) => {
    const res = await sensorService.loadValueSensor(sensor_id);
    return res as Sensor;
  },
}));
