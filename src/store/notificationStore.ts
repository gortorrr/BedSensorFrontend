import { create } from "zustand";
import { notificationService } from "../services/notificationService";
import { Notification } from "../types/notification";

interface NotificationStore {
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
  loadAllNotificationByPatient: (patient_id: number, sensor_id: number) => Promise<Notification | null>;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  showAlert: false,
  setShowAlert: (value) => set({ showAlert: value }),

  loadAllNotificationByPatient: async (patient_id: number, sensor_id: number) => {
    try {
      const res = await notificationService.loadAllNotificationByPatient(patient_id, sensor_id);
      console.log("✅ API Response NotificationByPatient :", res);
      return (res as Notification) ?? null; // ✅ ถ้า res เป็น undefined → เปลี่ยนเป็น null
    } catch (error) {
      console.error("❌ โหลดข้อมูลแจ้งเตือนล้มเหลว:", error);
      return null; // ✅ คืนค่า null ถ้าเกิดข้อผิดพลาด
    }
  },
}));
