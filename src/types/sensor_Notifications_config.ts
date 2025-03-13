import { Notification } from "./notification";
import { Sensor } from "./sensor";

export interface Sensor_Notification_Config {
    sensor_notification_config_id: number;
    sensor_notification_config_event: string;
    sensor_notification_config_usage: boolean;
    sensor_notification_config_repeatnoti: number;
    sensor_notification_config_rangetime: number;
    sensor_notification_config_signal: string;
    notification: Notification[];
    sensor_id:number;
    sensor:Sensor[];
}