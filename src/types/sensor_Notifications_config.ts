import { Notification } from "./notification";

export interface Sensor_Notification_Config {
    sensor_notification_config_id: number;
    sensor_notification_config_event: string;
    sensor_notification_config_usage: boolean;
    sensor_notification_config_repeatnoti: number;
    sensor_notification_config_rangetime: number;
    sensor_notification_config_signal: string;
    notification: Notification[];
}