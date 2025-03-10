import { Bed } from "../types/bed";
import http from "./http";

export const bedService = {
  // async fetchBeds(): Promise<Bed[]> {
  //   return new Promise((resolve) => {
  //     setTimeout(() => resolve(beds), 500);
  //   });
  // },
  async loadBedActivatedAll(): Promise<Bed[]> {
    try {
      const response = await http.get("beds/activated/all");
      return response.data; // นำข้อมูลที่ได้จาก response มาใช้
    } catch (error) {
      console.error("Error loading activated beds:", error);
      throw error; // หากเกิดข้อผิดพลาดให้โยนข้อผิดพลาดออกไป
    }
  },

  async saveSelectedShowSensorId(
    bed_id: number,
    sensor_id: number
  ): Promise<Bed> {
    try {
      const response = await http.patch(
        `beds/${bed_id}/selectedShowSensorId/${sensor_id}`
      );
      return response.data; // นำข้อมูลที่ได้จาก response มาใช้
    } catch (error) {
      console.error("Error save selected show sensor id on bed:", error);
      throw error; // หากเกิดข้อผิดพลาดให้โยนข้อผิดพลาดออกไป
    }
  },

  async saveRemoveShowSensorId(
    bed_id: number,
    sensor_id: number
  ): Promise<Bed> {
    try {
      const response = await http.patch(
        `beds/${bed_id}/removeShowSensorId/${sensor_id}`
      );
      return response.data; // นำข้อมูลที่ได้จาก response มาใช้
    } catch (error) {
      console.error("Error save selected show sensor id on bed:", error);
      throw error; // หากเกิดข้อผิดพลาดให้โยนข้อผิดพลาดออกไป
    }
  },

  async saveBedConfig(bed_id: number, bed: Bed): Promise<Bed> {
    try {
      const response = await http.patch(`beds/${bed_id}/bedConfig`, bed);
      return response.data; // นำข้อมูลที่ได้จาก response มาใช้
    } catch (error) {
      console.error("Error save bed config:", error);
      throw error; // หากเกิดข้อผิดพลาดให้โยนข้อผิดพลาดออกไป
    }
  },
};
