import { Room } from "./room";

export interface Ward {
  ward_id?: number;
  ward_name: string;
  room?: Room[];
}