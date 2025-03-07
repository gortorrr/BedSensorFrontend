import { Bed } from "../types/bed";
import http from "./http";


const beds: Bed[] = [
  {
    bed_id: 1,
    bed_name: "เตียง 1",
    bed_activated: true,
    room: {
      room_name: "RM001",
      floor: {
        floor_name: "ชั้น 1",
        building: { building_name: "อาคารผู้ป่วยใน" },
      },
    },
    patient: {
      patient_name: "พีระดา วังยายฉิม",
      patient_age: 21,
    },
    selectedShowSensorId: [1],
    sensors: [
      {
        sensor_type: "bed_sensor",
        sensor_status: true,
        sensor_unit: "",
        history_value_sensor: [
          {
            history_value_sensor_value: "นั่ง",
          },
        ],
      },
      {
        sensor_id: 1,
        sensor_type: "heart_rate",
        sensor_status: true,
        sensor_unit: "bpm",
        history_value_sensor: [
          {
            history_value_sensor_value: "78",
          },
        ],
      },
      {
        sensor_type: "spo2",

        sensor_status: true,
        sensor_unit: "%",
        history_value_sensor: [
          {
            history_value_sensor_value: "86",
          },
        ],
      },
      {
        sensor_type: "respiration",
        sensor_status: true,
        sensor_unit: "RPM",
        history_value_sensor: [
          {
            history_value_sensor_value: "22",
          },
        ],
      },
    ],
  },
  {
    bed_id: 2,
    bed_name: "เตียง 2",
    bed_activated: true,
    room: {
      room_name: "RM002",
      floor: {
        floor_name: "ชั้น 1",
        building: { building_name: "อาคารผู้ป่วยใน" },
      },
    },
    patient: {
      patient_name: "สิริภพ วงศ์ทิม",
    },
    selectedShowSensorId: [2],
    sensors: [
      {
        sensor_type: "bed_sensor",
        sensor_status: true,
        history_value_sensor: [
          {
            history_value_sensor_value: "นอนตะแคงซ้าย",
          },
        ],
      },
      {
        sensor_type: "heart_rate",
        sensor_status: true,
        sensor_unit: "bpm",
        history_value_sensor: [
          {
            history_value_sensor_value: "78",
          },
        ],
      },
      {
        sensor_type: "spo2",
        sensor_id: 2,
        sensor_status: true,
        sensor_unit: "%",
        history_value_sensor: [
          {
            history_value_sensor_value: "86",
          },
        ],
      },
      {
        sensor_type: "respiration",
        sensor_status: true,
        sensor_unit: "RPM",
        history_value_sensor: [
          {
            history_value_sensor_value: "22",
          },
        ],
      },
    ],
  },
  {
    bed_id: 3,
    bed_name: "เตียง 3",
    bed_activated: true,
    room: {
      room_name: "RM003",
      floor: {
        floor_name: "ชั้น 1",
        building: { building_name: "อาคารผู้ป่วยใน" },
      },
    },
    patient: {
      patient_name: "ศุภกร แสงจิต",
    },
    selectedShowSensorId: [3],
    sensors: [
      {
        sensor_type: "bed_sensor",
        sensor_status: true,
        history_value_sensor: [
          {
            history_value_sensor_value: "นอนตรง",
          },
        ],
      },
      {
        sensor_type: "heart_rate",
        sensor_status: true,
        sensor_unit: "bpm",
        history_value_sensor: [
          {
            history_value_sensor_value: "78",
          },
        ],
      },
      {
        sensor_type: "spo2",

        sensor_status: true,
        sensor_unit: "%",
        history_value_sensor: [
          {
            history_value_sensor_value: "86",
          },
        ],
      },
      {
        sensor_id: 3,
        sensor_type: "respiration",
        sensor_status: true,
        sensor_unit: "RPM",
        history_value_sensor: [
          {
            history_value_sensor_value: "22",
          },
        ],
      },
    ],
  },
  {
    bed_id: 4,
    bed_name: "เตียง 4",
    bed_activated: true,
    room: {
      room_name: "RM004",
      floor: {
        floor_name: "ชั้น 1",
        building: { building_name: "อาคารผู้ป่วยใน" },
      },
    },
    patient: {
      patient_name: "สิริกร ยี่ยวน",
    },
    sensors: [
      {
        sensor_type: "bed_sensor",
        sensor_status: true,
        history_value_sensor: [
          {
            history_value_sensor_value: "ไม่อยู่ที่เตียง",
          },
        ],
      },
      {
        sensor_type: "heart_rate",
        sensor_status: true,
        sensor_unit: "bpm",
        history_value_sensor: [
          {
            history_value_sensor_value: "78",
          },
        ],
      },
      {
        sensor_type: "spo2",

        sensor_status: true,
        sensor_unit: "%",
        history_value_sensor: [
          {
            history_value_sensor_value: "86",
          },
        ],
      },
      {
        sensor_type: "respiration",
        sensor_status: true,
        sensor_unit: "RPM",
        history_value_sensor: [
          {
            history_value_sensor_value: "22",
          },
        ],
      },
    ],
  },
];




export const bedService = {
  async fetchBeds(): Promise<Bed[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(beds), 500);
    });
  },
  async loadBedActivatedAll(): Promise<Bed[]> {
    try {
      const response = await http.get('beds/activated/all');
      return response.data; // นำข้อมูลที่ได้จาก response มาใช้
    } catch (error) {
      console.error('Error loading activated beds:', error);
      throw error; // หากเกิดข้อผิดพลาดให้โยนข้อผิดพลาดออกไป
    }
  },
  
};
