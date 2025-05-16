import React, { useState } from "react";
import { Bed } from "../types/bed";

const mockBeds: Bed[] = [
  {
    bed_id: 1,
    bed_name: "41",
    bed_activated: true,
    room: {
      room_id: 1,
      room_name: "RM041",
      floor: {
        floor_id: 4,
        floor_name: "4",
        building: {
          building_id: 1,
          building_name: "อาคารผู้ป่วยใน",
        },
      },
    },
    patient: undefined,
    sensors: [],
  },
  {
    bed_id: 2,
    bed_name: "42",
    bed_activated: true,
    room: {
      room_id: 2,
      room_name: "RM042",
      floor: {
        floor_id: 4,
        floor_name: "4",
        building: {
          building_id: 1,
          building_name: "อาคารผู้ป่วยใน",
        },
      },
    },
    patient: undefined,
    sensors: [],
  },
  {
    bed_id: 3,
    bed_name: "46",
    bed_activated: true,
    room: {
      room_id: 3,
      room_name: "RM043",
      floor: {
        floor_id: 4,
        floor_name: "4",
        building: {
          building_id: 1,
          building_name: "อาคารผู้ป่วยใน",
        },
      },
    },
    patient: undefined,
    sensors: [],
  },
  {
    bed_id: 4,
    bed_name: "52",
    bed_activated: true,
    room: {
      room_id: 4,
      room_name: "RM052",
      floor: {
        floor_id: 5,
        floor_name: "5",
        building: {
          building_id: 1,
          building_name: "อาคารผู้ป่วยใน",
        },
      },
    },
    patient: undefined,
    sensors: [],
  },
];

const AddPatientHome: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");

  const filteredBeds = mockBeds.filter((bed) => {
    return (
      (selectedBuilding === "" ||
        bed.room.floor.building.building_name === selectedBuilding) &&
      (selectedFloor === "" || bed.room.floor.floor_name === selectedFloor)
    );
  });

  return (
    <div className="p-6 bg-[#e7f0f3] min-h-screen">
      <h1 className="text-3xl font-bold text-[#2E5361] mb-6">
        รายการเตียงผู้ป่วย
      </h1>

      <div className="flex gap-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="building">ค้นหาเตียงว่าง</label>
          <select
            id="building"
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            className="border border-gray-400 rounded-lg p-2"
          >
            <option value="">อาคาร</option>
            <option value="อาคารผู้ป่วยใน">อาคารผู้ป่วยใน</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="floor">&nbsp;</label>
          <select
            id="floor"
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="border border-gray-400 rounded-lg p-2"
          >
            <option value="">ชั้น</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead className="bg-[#95BAC3] text-black h-12 text-center">
          <tr>
            <th className="p-2">อาคาร</th>
            <th className="p-2">ชั้น</th>
            <th className="p-2">หมายเลขห้อง</th>
            <th className="p-2">เตียง</th>
            <th className="p-2">ดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {filteredBeds.map((bed) => (
            <tr
              key={bed.bed_id}
              className="text-center h-12 even:bg-[#D1DFE5] odd:bg-white"
            >
              <td>{bed.room.floor.building.building_name}</td>
              <td>{bed.room.floor.floor_name}</td>
              <td>{bed.room.room_name}</td>
              <td>{bed.bed_name}</td>
              <td>
                <button className="bg-[#95BAC3] text-white px-4 py-1 rounded-md hover:bg-[#5E8892] shadow-md transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110">
                  เลือก
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-right">
        <button className="bg-[#95BAC3] text-white px-6 py-2 rounded-xl hover:bg-[#5E8892] shadow-lg transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110">
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

export default AddPatientHome;
