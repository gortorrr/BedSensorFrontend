import { Bed } from "../types/bed";

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
    },
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
  },
];

export const bedService = {
  async fetchBeds(): Promise<Bed[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(beds), 500);
    });
  },
};
