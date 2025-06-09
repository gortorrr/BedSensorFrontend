import { Floor } from "./floor";

export interface Room {
  room_id?: number;
  room_name: string;
  floor: Floor;
  ward_id?: number | null;
}
