import { Building } from "./building";

export interface Floor {
  floor_id?: number;
  floor_name: string;
  building: Building;
}
