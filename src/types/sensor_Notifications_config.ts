import { Notification } from "./notification";
import { Sensor } from "./sensor";

export interface Sensor_Notification_Config {
  sensor_notifications_config_id: number;
  sensor_notifications_config_event: string;
  sensor_notifications_config_usage: boolean;
  sensor_notifications_config_repeatnoti: number;
  sensor_notifications_config_rangetime: number;
  sensor_notifications_config_signal: string;
  notification?: Notification[];
  sensor_id?: number;
  sensor?: Sensor;
}
