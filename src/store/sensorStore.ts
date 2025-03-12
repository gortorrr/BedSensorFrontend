import { create } from "zustand";
import { Sensor } from "../types/sensor";
import { sensorService } from "../services/sensorService";

interface SensorStore {
  loadValueSensor: (sensor_id: number) => Promise<Sensor>;
  loadAllSensorFree: () => Promise<Sensor[]>;
  saveSensorConfig: (sensor_id: number,sensor:Sensor) => Promise<void>;
}

export const useSensorStore = create<SensorStore>(() => ({
  loadValueSensor: async (sensor_id: number) => {
    const res = await sensorService.loadValueSensor(sensor_id);
    return res as Sensor;
  },
  loadAllSensorFree: async () => {
    const res = await sensorService.loadAllSensorFree();
    return res as Sensor[];
  },
  saveSensorConfig: async (sensor_id: number, sensor: Sensor) => {
      sensorService.saveSensorConfig(sensor_id, sensor);
    },
}));
