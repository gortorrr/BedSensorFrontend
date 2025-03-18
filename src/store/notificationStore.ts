import { create } from "zustand";
// import { notificationService } from "../services/notificationService";
import { Notification } from "../types/notification";
import { Log_bed_patient_sensor } from "../types/log_bed_patient_sensor";
import { notificationService } from "../services/notificationService";
// import { sensorNotificationsConfigService } from "../services/sensorNotificationsConfigService";

interface NotificationStore {
  // NotificationByPatientAndSensor: Notification[];
  showAlert: boolean;
  selectedAlertType: string;
  LogHistoryNotifications: Log_bed_patient_sensor | null;
  notifications: Notification[];
  setSelectedAlertType: (type: string) => void;
  setShowAlert: (value: boolean) => void;
  acceptEmergencyByNotification: (notification_id: number) => Promise<void>;
  successEmergencyByNotification: (notification_id: number) => void;
  // loadLogHistoryNotifications: (
  //   bed_id: number,
  //   patient_id: number,
  //   sensor_id: number
  // ) => Promise<void>;
  loadEmergencyNotAccepted: () => Promise<void>;
  emergencyDatas: Notification[];
  loadSosNotAccepted: () => Promise<void>;
  sosDatas: Notification[];
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  // NotificationByPatientAndSensor: [],
  LogHistoryNotifications: {},
  emergencyDatas: [],
  sosDatas: [],
  notifications: [],
  showAlert: false,
  selectedAlertType: "", // ค่าเริ่มต้น
  setSelectedAlertType: (type) => set({ selectedAlertType: type }),

  setShowAlert: (value) => set({ showAlert: value }),

  acceptEmergencyByNotification: async (notification_id: number) => {
    notificationService.acceptEmergencyByNotification(notification_id);
  },

  successEmergencyByNotification: (notification_id: number) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.notification_id !== notification_id
      ),
    }));
  },
  loadEmergencyNotAccepted: async () => {
    // set({ emergencyDatas: [] });
    const res = await notificationService.loadEmergencyNotAccepted();
    set({ emergencyDatas: res });
    // console.log(res);
  },
  loadSosNotAccepted: async () => {
    // set({ sosDatas: [] });
    const res = await notificationService.loadSosNotAccepted();
    set({ sosDatas: res });
    // console.log(res);
  },
}));
// loadAllNotificationByPatient: async (patient_id: number, sensor_id: number) => {
//   set({NotificationByPatientAndSensor:[]})
//     const res = await notificationService.loadAllNotificationByPatient(patient_id, sensor_id);
//     console.log("✅ API Response NotificationByPatient :", res);
//     if (res) {
//       set({ NotificationByPatientAndSensor: Array.isArray(res) ? res : [res] }); // ✅ ป้องกัน error
//     } // ✅ ถ้า res เป็น undefined → เปลี่ยนเป็น null
// loadLogHistoryNotifications: async (
//   bed_id: number,
//   patient_id: number,
//   sensor_id: number
// ) => {
//   console.log(bed_id);
//   console.log(patient_id);
//   console.log(sensor_id);
//   const res = await sensorNotificationsConfigService.fetchNotification(
//     bed_id,
//     patient_id,
//     sensor_id
//   );
//   console.log("✅ API Response Log History Notifications:", res);
//   set({ LogHistoryNotifications: res ?? null });
// },
