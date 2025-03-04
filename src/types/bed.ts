import { Patient } from "./patient";
import { Room } from "./room";
import { Sensor } from "./sensor";

export interface Bed {
  bed_id: number;
  bed_name: string;
  bed_activated: boolean;
  room: Room;
  patient?: Patient;
  sensors: Sensor[];
  selectedShowSensorId?: number[];
}
