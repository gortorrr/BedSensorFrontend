import http from "./http";
import { Notification } from "../types/notification";

export const notificationService = {
  async loadAllNotificationByPatient(
    patient_id: number,
    sensor_id: number
  ): Promise<Notification[]> {
    try {
      const response = await http.get(
        `notifications/patient/${patient_id}/sensor/${sensor_id}`
      );
      return response.data; // ✅ คืนค่าข้อมูลที่ได้จาก API
    } catch (error) {
      console.error("Error loading notifications by patient:", error);
      throw error;
    }
  },

  async loadEmergencyNotAccepted(): Promise<Notification[]> {
    try {
      const response = await http.get(
        `notifications//notifications_not_accepted/sos`
      );
      return response.data; // ✅ คืนค่าข้อมูลที่ได้จาก API
    } catch (error) {
      console.error(
        "Error loading notifications emergency not accepted:",
        error
      );
      throw error;
    }
  },
};
