import { create } from "zustand";
import { Bed } from "../types/bed";
import { bedService } from "../services/bedService";

interface BedStore {
  beds: Bed[]; // เก็บรายการเตียงทั้งหมด (Array)
  loadBeds: () => Promise<void>; // ฟังก์ชันโหลดข้อมูลเตียง
}

export const useBedStore = create<BedStore>((set) => ({
  beds: [],
  loadBeds: async () => {
    const beds = await bedService.fetchBeds(); // ดึงข้อมูลจาก bedService
    set({ beds });
  },
}));
