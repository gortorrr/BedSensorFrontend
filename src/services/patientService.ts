import { ca } from "date-fns/locale";
import { Patient } from "../types/patient";
import http from "./http";

export const patientService = {
  async loadAllPatientWait(): Promise<Patient[]> {
    try {
      const response = await http.get("patients/patientWait/all");
      return response.data;
    } catch (error) {
      console.error("Error loading patient wait:", error);
      throw error;
    }
  },

  async getPatients(): Promise<Patient[]> {
    try {
      const response = await http.get("patients/all/full_details");
      return response.data;
    } catch (error) {
      console.error("Error loading patients:", error);
      throw error;
    }
  },
};
