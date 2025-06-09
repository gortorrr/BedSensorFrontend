import { create } from "zustand";
import { wardService } from "../services/wardService";
import { AddWard, Ward } from "../types/ward";

interface WardStore {
  wards: Ward[];
  getWards: () => Promise<Ward[]>;
  addWard: (addWard: AddWard) => Promise<void>;
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
  addWard: async (addWard: AddWard) => {
    await wardService.addWard(addWard);
  },
}));
