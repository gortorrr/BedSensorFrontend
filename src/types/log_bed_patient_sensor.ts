import { Notification } from "./notification";

export interface Log_bed_patient_sensor {
  log_bed_patient_sensor_id?: number;
  bed_id?: number;
  patient_id?: number;
  sensor_id?: number;
  log_bed_patient_sensor_date?: string;
  notifications?: Notification[];
}
