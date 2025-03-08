import { create } from "zustand";
import { Bed } from "../types/bed";
import { bedService } from "../services/bedService";

interface BedStore {
  loading: boolean;
  beds: Bed[]; // เก็บรายการเตียงทั้งหมด (Array)
  error: string | null; // ข้อความข้อผิดพลาด
  loadBeds: () => Promise<void>; // ฟังก์ชันโหลดข้อมูลเตียง
  saveSelectedShowSensorId: (
    bed_id: number,
    sensor_id: number
  ) => Promise<void>;
  saveRemoveShowSensorId: (bed_id: number, sensor_id: number) => Promise<void>;
}

export const useBedStore = create<BedStore>((set) => ({
  beds: [],
  loading: false,
  error: null,

  loadBeds: async () => {
    set({ loading: true, error: null }); // เริ่มต้นให้สถานะ loading เป็น true และ error เป็น null
    try {
      const response = await bedService.loadBedActivatedAll(); // เรียกใช้บริการเพื่อดึงข้อมูลเตียงทั้งหมด
      console.log("get ได้แล้ว");
      console.log("res data ตรงนี้ ที่ store", response); // ตรวจสอบข้อมูลที่ได้รับ

      // เก็บข้อมูลเตียงทั้งหมดโดยไม่กรอง
      set({ beds: response, loading: false }); // อัพเดตข้อมูลเตียงทั้งหมดและตั้ง loading เป็น false
    } catch (error) {
      console.error(error); // ล็อกข้อผิดพลาดที่เกิดขึ้น
      set({ error: "Failed to fetch beds", loading: false }); // อัพเดตสถานะ error และ loading
    }
  },

  saveSelectedShowSensorId: async (bed_id: number, sensor_id: number) => {
    bedService.saveSelectedShowSensorId(bed_id, sensor_id);
  },

  saveRemoveShowSensorId: async (bed_id: number, sensor_id: number) => {
    bedService.saveRemoveShowSensorId(bed_id, sensor_id);
  },
}));
// ฟังก์ชั่นเก่าอยู่ตรงนี้
// loadBeds: async () => {
//   const beds = await bedService.fetchBeds(); // ดึงข้อมูลจาก bedService
//   set({ beds });
// },
