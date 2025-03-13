import { create } from "zustand";

interface NotificationStore {
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  showAlert: false,
  setShowAlert: (value) => set({ showAlert: value }),
}));
