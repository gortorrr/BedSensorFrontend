import { create } from "zustand";
import { notificationService } from "../services/notificationService";
import { Notification } from "../types/notification";

interface NotificationStore {
  NotificationByPatientAndSensor:Notification[]
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
  loadAllNotificationByPatient: (patient_id: number, sensor_id: number) => Promise<void | null>;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  NotificationByPatientAndSensor:[],
  showAlert: false,
  setShowAlert: (value) => set({ showAlert: value }),

  loadAllNotificationByPatient: async (patient_id: number, sensor_id: number) => {
    set({NotificationByPatientAndSensor:[]})
      const res = await notificationService.loadAllNotificationByPatient(patient_id, sensor_id);
      console.log("✅ API Response NotificationByPatient :", res);
      if (res) {
        set({ NotificationByPatientAndSensor: Array.isArray(res) ? res : [res] }); // ✅ ป้องกัน error
      } // ✅ ถ้า res เป็น undefined → เปลี่ยนเป็น null
  }
}));
