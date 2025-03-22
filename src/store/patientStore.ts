import { create } from "zustand";
import { Patient } from "../types/patient";
import { patientService } from "../services/patientService";

interface PatientStore {
  patients: Patient[];
  loadPatientsWait: () => Promise<void>;
  removePatient: (patientId: number | undefined) => void; // Adjusted to number | undefined
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],
  loadPatientsWait: async () => {
    const res = await patientService.loadAllPatientWait();
    set({ patients: res });
  },
  removePatient: (patientId: number | undefined) => {
    set((state) => ({
      patients: state.patients.filter(
        (patient) => patient.patient_id !== patientId
      ),
    }));
  },
}));
