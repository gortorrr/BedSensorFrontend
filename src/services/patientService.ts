import { Patient } from "../types/patient";
import http from "./http";

export const patientService = {
  async loadAllPatientWait(): Promise<Patient[]> {
    try {
      const response = await http.get("/patientWait/all");
      return response.data;
    } catch (error) {
      console.error("Error loading patient wait:", error);
      throw error;
    }
  },
};
