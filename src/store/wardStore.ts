import { create } from "zustand";
import { wardService } from "../services/wardService";
import { Ward } from "../types/ward";

interface WardStore {
  wards: Ward[];
  getWards: () => Promise<Ward[]>;
}

export const useWardStore = create<WardStore>((set) => ({
  wards: [],

  getWards: async () => {
    try {
      const data = await wardService.getWards();
      set({ wards: data }); // <-- อัปเดต state ด้วย set
      return data;
    } catch (err) {
      console.error("Failed to fetch wards:", err);
      return [];
    }
  },
}));
