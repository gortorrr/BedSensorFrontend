import { create } from "zustand";
import { Patient } from "../types/patient";
import { patientService } from "../services/patientService";

interface PatientStore {
  patients: Patient[];
  loadPatientsWait: () => Promise<void>;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],
  loadPatientsWait: async () => {
    const res = await patientService.loadAllPatientWait();
    set({ patients: res });
  },
}));
