import { Patient } from "./patient";
import { Room } from "./room";
import { Sensor } from "./sensor";

export interface Bed {
  bed_id: number;
  bed_name: string;
  bed_activated: boolean;
  room: Room;
  patient?: Patient;
  patient_id?: number;
  sensors: Sensor[];
  selectedShowSensorId?: number[];
}

export interface BedSaveConfig {
  bed_id: number;
  patient_id: number;
  sensors: { sensor_id: number; bed_id: number }[];
}
