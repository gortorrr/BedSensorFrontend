import { Sensor } from "../types/sensor";
import http from "./http";

export const sensorService = {
  async loadValueSensor(sensor_id: number): Promise<Sensor> {
    const response = await http.get(`sensors/getValueSensor/${sensor_id}`);
    return response.data; // นำข้อมูลที่ได้จาก response มาใช้
  },

  async loadAllSensorFree(): Promise<Sensor[]> {
    try {
      const response = await http.get("/sensors/sensorFree/all");
      return response.data; // นำข้อมูลที่ได้จาก response มาใช้
    } catch (error) {
      console.error("Error loading all sensors:", error);
      throw error; // หากเกิดข้อผิดพลาดให้โยนข้อผิดพลาดออกไป
    }
  },
};
