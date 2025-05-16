// src/pages/BedManagement.tsx
import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiMagnify, mdiPlus } from "@mdi/js";
import { Bed } from "../../types/bed";

const BedManagement: React.FC = () => {
  const [search, setSearch] = useState("");

  // mock data
  const bedData: Bed[] = [
    {
      bed_id: 1,
      bed_name: "5",
      bed_activated: true,
      room: {
        room_id: 1,
        room_name: "1610",
        floor: {
          floor_id: 1,
          floor_name: "1",
          building: {
            building_id: 1,
            building_name: "อาคารผู้ป่วยใน",
          },
        },
      },
      sensors: [],
    },
    {
      bed_id: 2,
      bed_name: "2",
      bed_activated: true,
      room: {
        room_id: 2,
        room_name: "1605",
        floor: {
          floor_id: 1,
          floor_name: "1",
          building: {
            building_id: 1,
            building_name: "อาคารผู้ป่วยใน",
          },
        },
      },
      sensors: [],
    },
    {
      bed_id: 3,
      bed_name: "4",
      bed_activated: false,
      room: {
        room_id: 3,
        room_name: "1606",
        floor: {
          floor_id: 1,
          floor_name: "1",
          building: {
            building_id: 1,
            building_name: "อาคารผู้ป่วยใน",
          },
        },
      },
      sensors: [],
    },
    {
      bed_id: 4,
      bed_name: "7",
      bed_activated: true,
      room: {
        room_id: 4,
        room_name: "1606",
        floor: {
          floor_id: 1,
          floor_name: "1",
          building: {
            building_id: 1,
            building_name: "อาคารผู้ป่วยใน",
          },
        },
      },
      sensors: [],
    },
    {
      bed_id: 5,
      bed_name: "10",
      bed_activated: true,
      room: {
        room_id: 5,
        room_name: "1607",
        floor: {
          floor_id: 1,
          floor_name: "1",
          building: {
            building_id: 1,
            building_name: "อาคารผู้ป่วยใน",
          },
        },
      },
      sensors: [],
    },
  ];

  const filteredBeds = bedData.filter((b) => {
    const query = search.toLowerCase();
    return (
      b.room.room_name.toLowerCase().includes(query) ||
      b.room.floor.building.building_name.toLowerCase().includes(query) ||
      b.bed_name.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6 bg-[#e7f0f3] min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-[#2E5361]">
          จัดการสถานที่เตียงผู้ป่วย
        </h1>
      </div>

      <div className="flex space-x-4 justify-between mb-8">
        <div className="relative flex-auto">
          <input
            type="text"
            placeholder="ค้นหาเตียงผู้ป่วย"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered border-2 border-gray-400 rounded-lg p-2 pr-10 bg-white w-full inset-shadow"
          />
          <Icon
            path={mdiMagnify}
            size={1}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] drop-shadow-md cursor-pointer">
          <Icon path={mdiPlus} size={1} />
          <span>เพิ่มเตียงใหม่</span>
        </button>
      </div>

      <table className="w-full border-collapse shadow-md">
        <thead className="bg-[#B7D6DE] h-16 font-bold text-center">
          <tr>
            <th className="p-2">อาคาร</th>
            <th className="p-2">ชั้น</th>
            <th className="p-2">ห้อง</th>
            <th className="p-2">หมายเลขเตียง</th>
            <th className="p-2">สถานะ</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredBeds.map((bed) => (
            <tr
              key={bed.bed_id}
              className="text-center bg-white even:bg-[#edf3f6]"
            >
              <td className="p-2 h-16">
                {bed.room.floor.building.building_name}
              </td>
              <td className="p-2 h-16">{bed.room.floor.floor_name}</td>
              <td className="p-2 h-16">{bed.room.room_name}</td>
              <td className="p-2 h-16">{bed.bed_name}</td>
              <td
                className={`p-2 h-16 font-semibold ${
                  bed.bed_activated ? "text-green-600" : "text-red-600"
                }`}
              >
                {bed.bed_activated ? "Active" : "Inactive"}
              </td>

              <td className="p-2 h-16 py-4 text-center flex justify-center gap-2">
                <button className="mx-1 cursor-pointer w-7 h-7 transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110">
                  <img src="/src/assets/edit.png" alt="edit" />
                </button>
                <button className="mx-1 cursor-pointer w-7 h-7 transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110">
                  <img src="/src/assets/delete.png" alt="delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BedManagement;
