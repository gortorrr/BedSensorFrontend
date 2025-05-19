import { create } from "zustand";
import { Sensor } from "../types/sensor";
import { sensorService } from "../services/sensorService";

interface SensorStore {
  loadValueSensor: (sensor_id: number) => Promise<Sensor>;
  loadAllSensorFree: () => Promise<void>;
  saveSensorConfig: (sensor_id: number, sensor: Sensor) => Promise<void>;
  sensorsFree: Sensor[];
  getSensors: () => Promise<Sensor[]>;
  addSensor: (sensor: Sensor) => Promise<void>;
  deleteSensor: (sensor: number) => Promise<void>;
  editSensor: (sensor_id: number, sensor: Sensor) => Promise<void>;
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
  getSensors: async () => {
    const data = await sensorService.getSensors();
    return data.data;
  },
  addSensor: async (sensor: Sensor) => {
    await sensorService.addSensor(sensor);
  },
  deleteSensor: async (sensor_id: number) => {
    await sensorService.deleteSensor(sensor_id);
  },
  editSensor: async (sensor_id: number, sensor: Sensor) => {
    await sensorService.editSensor(sensor_id, sensor);
  },
}));
