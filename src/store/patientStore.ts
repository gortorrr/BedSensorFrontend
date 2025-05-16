import { create } from "zustand";
import { Patient } from "../types/patient";
import { patientService } from "../services/patientService";

interface PatientStore {
  patients: Patient[];
  loadPatientsWait: () => Promise<void>;
  removePatient: (patientId: number | undefined) => void; // Adjusted to number | undefined
  deletePatient: (patient_id: number) => void;
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
  deletePatient: async (patient_id: number) => {
    const res = await patientService.deletePatient(patient_id);
    console.log("deleted target", res);
  },
}));
