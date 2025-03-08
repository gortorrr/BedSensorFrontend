import { History_Value_Sensor } from "./history_value_sensor";

export interface Sensor {
  sensor_id: number;
  sensor_type: string;
  sensor_status: boolean;
  sensor_mac_i?: string;
  sensor_mac_ii?: string;
  history_value_sensor: History_Value_Sensor[];
  sensor_unit?: string;
  sensor_name?: string;
}
