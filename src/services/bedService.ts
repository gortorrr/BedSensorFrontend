import { Bed, BedSaveConfig } from "../types/bed";
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
      // const response = await http.get("beds");
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

  async saveBedConfig(
    bed_id: number,
    bed: BedSaveConfig
  ): Promise<BedSaveConfig> {
    try {
      const response = await http.patch(`beds/${bed_id}/bedConfig`, bed);
      return response.data; // นำข้อมูลที่ได้จาก response มาใช้
    } catch (error) {
      console.error("Error save bed config:", error);
      throw error; // หากเกิดข้อผิดพลาดให้โยนข้อผิดพลาดออกไป
    }
  },

  async loadBedSensorConfig(bed_id: number): Promise<Bed> {
    try {
      const response = await http.get(
        `/sensor_notifications_configs/sensor-notifications-config/${bed_id}`
      );
      return response.data; // นำข้อมูลที่ได้จาก response มาใช้
    } catch (error) {
      console.error("Error save bed config:", error);
      throw error; // หากเกิดข้อผิดพลาดให้โยนข้อผิดพลาดออกไป
    }
  },

  async removePatientFromBed(bed_id: number, patient_id: number): Promise<Bed> {
    try {
      const response = await http.put(
        `/beds/${bed_id}/remove-patient/${patient_id}`
      );
      return response.data; // นำข้อมูลที่ได้จาก response มาใช้
    } catch (error) {
      console.error("Error save bed config:", error);
      throw error; // หากเกิดข้อผิดพลาดให้โยนข้อผิดพลาดออกไป
    }
  },

  async getLocations() {
    const res = await http.get("/buildings");
    return res.data;
  },
  async getBedsFree() {
    const res = await http.get("/beds/free/all");
    return res.data;
  },
  async getBed(bed_id: number) {
    const res = await http.get(`/beds/${bed_id}`);
    return res.data;
  },
  async getBeds() {
    const res = await http.get(`/beds`);
    return res.data;
  },
  async deleteBed(bed_id: number) {
    const res = await http.delete(`/beds/${bed_id}`);
    return res.data;
  },
  async addBed(bed: Bed): Promise<Bed> {
    try {
      const response = await http.post("beds", bed);
      return response.data;
    } catch (error) {
      console.error("Error adding bed:", error);
      throw error;
    }
  },

  async editBed(bed_id: number, bed: Bed): Promise<Bed> {
    try {
      const response = await http.patch(`beds/edit/${bed_id}`, bed);
      return response.data;
    } catch (error) {
      console.error("Error editing bed:", error);
      throw error;
    }
  },
};
