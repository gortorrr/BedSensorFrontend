import { Notification } from "../types/notification";

export function sortNotificationByDate(notis: Notification[]): Notification[] {
  return [...notis].sort((a, b) => {
    const dateA = a.notification_createdate
      ? new Date(a.notification_createdate).getTime()
      : 0;
    const dateB = b.notification_createdate
      ? new Date(b.notification_createdate).getTime()
      : 0;
    return dateB - dateA; // เรียงจากใหม่ → เก่า
  });
}
