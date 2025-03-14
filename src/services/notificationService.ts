import http from "./http";
import { AxiosError } from "axios"; // ✅ นำเข้า AxiosError (ถ้าใช้ axios)
import { Notification } from "../types/notification";

export const notificationService = {
  async loadAllNotificationByPatient(
    patient_id: number,
    sensor_id: number
  ): Promise<Notification | null> {
    try {
      const response = await http.get(
        `notifications/patient/${patient_id}/sensor/${sensor_id}`
      );
      return response.data; // ✅ คืนค่าข้อมูลที่ได้จาก API
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // ✅ เช็กว่าเป็น AxiosError หรือไม่
        if (error.response?.status === 404) {
          console.warn(
            `Notification not found for patient_id: ${patient_id} and sensor_id: ${sensor_id}`
          );
          return null; // ✅ คืน `null` ถ้า API ส่ง 404
        }
      } else if (error instanceof Error) {
        // ✅ เช็กว่าเป็น JavaScript Error ปกติ
        console.error("Error loading history value sensor:", error.message);
      } else {
        console.error("Unexpected error:", error); // ❌ ถ้าไม่ใช่ Error ปกติ ให้แสดงค่า error ทั้งหมด
      }
      throw error; // ❗ โยน error ออกไปให้ caller handle ต่อ
    }
  },
};
