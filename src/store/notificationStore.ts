import { create } from "zustand";
import { notificationService } from "../services/notificationService";
import { Notification } from "../types/notification";

interface NotificationStore {
  NotificationByPatientAndSensor: Notification[];
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
  loadAllNotificationByPatient: (
    patient_id: number,
    sensor_id: number
  ) => Promise<Notification[] | null>;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  NotificationByPatientAndSensor: [],
  showAlert: false,
  setShowAlert: (value) => set({ showAlert: value }),

  loadAllNotificationByPatient: async (
    patient_id: number,
    sensor_id: number
  ) => {
    //สามารถดูตัวอย่างการเรียกได้ Setting Noti
    try {
      const res = await notificationService.loadAllNotificationByPatient(
        patient_id,
        sensor_id
      );
      console.log("✅ API Response NotificationByPatient :", res);

      const notifications = Array.isArray(res) ? res : res ? [res] : []; // ✅ ป้องกัน API คืนค่า undefined หรือ object เดี่ยว

      return notifications; // ✅ คืนค่าเป็น Notification[]
    } catch (error) {
      console.error("❌ โหลดข้อมูลแจ้งเตือนล้มเหลว:", error);
      return []; // ✅ คืนค่าเป็น array ว่างถ้าเกิดข้อผิดพลาด
    }
  },
}));
// loadAllNotificationByPatient: async (patient_id: number, sensor_id: number) => {
//   set({NotificationByPatientAndSensor:[]})
//     const res = await notificationService.loadAllNotificationByPatient(patient_id, sensor_id);
//     console.log("✅ API Response NotificationByPatient :", res);
//     if (res) {
//       set({ NotificationByPatientAndSensor: Array.isArray(res) ? res : [res] }); // ✅ ป้องกัน error
//     } // ✅ ถ้า res เป็น undefined → เปลี่ยนเป็น null
