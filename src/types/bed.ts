import { Patient } from "./patient";
import { Room } from "./room";

export interface Bed {
  bed_id: number;
  bed_name: string;
  bed_activated: boolean;
  room: Room;
  patient?: Patient;
}