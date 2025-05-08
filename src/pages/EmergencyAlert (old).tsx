// import { useEffect, useState } from "react";
// import { Notification } from "../types/notification";
// import { useNotificationStore } from "../store/notificationStore";
// import NotificationList from "../components/Alert/NotificationList";

// interface EmergencyAlertProps {
//   onClose?: () => void;
// }

// export default function EmergencyAlert({ onClose }: EmergencyAlertProps) {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const { emergencyDatas, selectedAlertType, emergencyDataWithAccepted } =
//     useNotificationStore();
//   const [notificationsWithAccepted, setNotificationsWithAccepted] = useState<
//     Notification[]
//   >([]);

//   // useEffect(() => {
//   //   setNotifications(emergencyDatas);
//   // });

//   useEffect(() => {
//     setNotifications(
//       [...emergencyDatas].sort((a, b) => {
//         const dateA = a.notification_createdate
//           ? new Date(a.notification_createdate).getTime()
//           : 0;
//         const dateB = b.notification_createdate
//           ? new Date(b.notification_createdate).getTime()
//           : 0;
//         return dateB - dateA; // เรียงจากใหม่ไปเก่า
//       })
//     );
//   }, [emergencyDatas]);

//   useEffect(() => {
//     setNotificationsWithAccepted(
//       [...emergencyDataWithAccepted].sort((a, b) => {
//         const dateA = a.notification_createdate
//           ? new Date(a.notification_createdate).getTime()
//           : 0;
//         const dateB = b.notification_createdate
//           ? new Date(b.notification_createdate).getTime()
//           : 0;
//         return dateB - dateA; // เรียงจากใหม่ไปเก่า
//       })
//     );
//   }, [emergencyDataWithAccepted]);

//   // const { loadEmergencyNotAccepted } = useNotificationStore();

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const data = await loadEmergencyNotAccepted();
//   //     setNotifications(data); // ✅ ใช้ค่าที่เป็น `Notification[]`
//   //   };
//   //   fetchData();
//   // }, []);

//   // useEffect(() => {
//   //   setNotifications((prev) => [
//   //     ...prev,
//   //     {
//   //       sensor_notifications_config_id: 291,
//   //       notification_successed: false,
//   //       notification_category: "Emergency",
//   //       notification_accepted: false,
//   //       notification_createdate: "2025-01-01T19:45:47",
//   //       notification_updatedate: "2025-03-04T14:22:38",
//   //       notification_id: 2,
//   //       sensor_notifications_config: {
//   //         sensor_id: 77,
//   //         sensor_notifications_config_event: "ออกซิเจนในเลือดต่ำมาก (< 95%)",
//   //         sensor_notifications_config_usage: true,
//   //         sensor_notifications_config_repeatnoti: 120,
//   //         sensor_notifications_config_rangetime: 120,
//   //         sensor_notifications_config_signal: "อันตราย",
//   //         sensor_notifications_config_id: 291,
//   //       },
//   //       log_bed_patient_sensor_id: 1,
//   //     },
//   //   ]);
//   // }, []);

//   const updateStatus = (
//     id: number,
//     accepted?: boolean,
//     successed?: boolean
//   ) => {
//     setNotifications((prev) =>
//       prev.map((noti) =>
//         noti.notification_id === id
//           ? {
//               ...noti,
//               notification_accepted:
//                 accepted !== undefined ? accepted : noti.notification_accepted,
//               notification_successed:
//                 successed !== undefined
//                   ? successed
//                   : noti.notification_successed,
//               notification_updatedate: new Date().toISOString(),
//             }
//           : noti
//       )
//     );
//   };

//   const getTimeElapsed = (notificationDate: string | Date): string => {
//     const date =
//       typeof notificationDate === "string"
//         ? new Date(notificationDate)
//         : notificationDate;
//     const now = new Date();
//     const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

//     if (diffInSeconds < 60) return `${diffInSeconds} วินาทีที่แล้ว`;
//     if (diffInSeconds < 3600)
//       return `${Math.floor(diffInSeconds / 60)} นาทีที่แล้ว`;
//     if (diffInSeconds < 86400)
//       return `${Math.floor(diffInSeconds / 3600)} ชั่วโมงที่แล้ว`;
//     return `${Math.floor(diffInSeconds / 86400)} วันที่แล้ว`;
//   };

//   return (
//     <div className="h-full flex flex-col z-20 border-2 border-[#2E5361] rounded-3xl">
//       <div className="flex justify-between items-center h-25 text-[#2E5361] p-4 rounded-3xl">
//         <h3
//           className="text-3xl font-semibold flex-grow text-center"
//           style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}
//         >
//           {selectedAlertType}
//         </h3>
//         {selectedAlertType === "แจ้งเตือนฉุกเฉิน" && (
//           <img
//             src="src\assets\alarm.png"
//             alt="Alarm"
//             className="w-8 h-8 mr-4"
//           />
//         )}
//         <button
//           onClick={onClose}
//           className="text-[#2E5361] text-xl hover:text-gray-300 absolute top-3 right-3 cursor-pointer"
//           aria-label="Close alert"
//         >
//           ✖
//         </button>
//       </div>

//       {notifications.length === 0 && notificationsWithAccepted.length === 0 ? (
//         <p className="text-gray-500 text-center mt-5">ไม่มีการแจ้งเตือน</p>
//       ) : (
//         <>
//           <NotificationList
//             notifications={notifications}
//             updateStatus={updateStatus}
//             getTimeElapsed={getTimeElapsed}
//             notificationsWithAccepted={notificationsWithAccepted}
//           />
//         </>
//       )}
//     </div>
//   );
// }
