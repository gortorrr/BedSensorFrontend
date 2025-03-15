import { create } from "zustand";
import { Sensor } from "../types/sensor";
import { sensorService } from "../services/sensorService";

interface SensorStore {
  loadValueSensor: (sensor_id: number) => Promise<Sensor>;
  loadAllSensorFree: () => Promise<void>;
  saveSensorConfig: (sensor_id: number, sensor: Sensor) => Promise<void>;
  sensorsFree: Sensor[];
}

export const useSensorStore = create<SensorStore>((set) => ({
  sensorsFree: [],
  loadValueSensor: async (sensor_id: number) => {
    const res = await sensorService.loadValueSensor(sensor_id);
    return res as Sensor;
  },
  loadAllSensorFree: async () => {
    const res = await sensorService.loadAllSensorFree();
    set({ sensorsFree: res });
  },
  saveSensorConfig: async (sensor_id: number, sensor: Sensor) => {
    sensorService.saveSensorConfig(sensor_id, sensor);
  },
}));
