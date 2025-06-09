import { create } from "zustand";
import { Building } from "../types/building";
import { locationService } from "../services/locationService";

interface LocationStore {
  getLocations: () => Promise<Building[]>;
}

export const useLocationStore = create<LocationStore>(() => ({
  getLocations: async () => {
      const data = locationService.getLocations();
      return data;
    },
}));
