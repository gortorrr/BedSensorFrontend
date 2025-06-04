import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import {
  mdiHomePlus,
  mdiPencil,
  mdiTrashCan,
  mdiMagnify,
  mdiChevronDown,
  mdiChevronRight,
} from "@mdi/js";

type Room = {
  id: number;
  name: string;
  status: "Active" | "Inactive";
};

type Floor = {
  id: number;
  name: string;
  rooms: Room[];
};

type Building = {
  id: number;
  name: string;
  floors: Floor[];
};

const WardManagement: React.FC = () => {
  const [search, setSearch] = useState("");
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [expandedBuildings, setExpandedBuildings] = useState<Set<number>>(new Set());
  const [expandedFloors, setExpandedFloors] = useState<Set<string>>(new Set());

  // dummy data
  useEffect(() => {
  setBuildings([
    {
      id: 1,
      name: "อาคารผู้ป่วยใน",
      floors: [
        {
          id: 1,
          name: "ชั้น 1",
          rooms: [
            { id: 201, name: "ห้องผ่าตัด 201", status: "Active" },
            { id: 501, name: "ห้องพิเศษ 501", status: "Active" },
            { id: 401, name: "ห้องพักฟื้น 401", status: "Active" },
            { id: 301, name: "ห้องไอซียู 301", status: "Active" },
          ],
        },
        {
          id: 2,
          name: "ชั้น 2",
          rooms: [
            { id: 202, name: "ห้องพักฟื้น 202", status: "Inactive" },
            { id: 502, name: "ห้องพิเศษ 502", status: "Active" },
            { id: 302, name: "ห้องไอซียู 302", status: "Active" },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "อาคารผู้ป่วยนอก",
      floors: [],
    },
    {
      id: 3,
      name: "อาคารผ่าตัด",
      floors: [],
    },
  ]);
}, []);

const toggleBuilding = (buildingId: number) => {
  setExpandedBuildings((prev) => {
    const updated = new Set(prev);
    if (updated.has(buildingId)) {
      updated.delete(buildingId);
    } else {
      updated.add(buildingId);
    }
    return updated;
  });
};

const toggleFloor = (buildingId: number, floorId: number) => {
  const key = `${buildingId}-${floorId}`;
  setExpandedFloors((prev) => {
    const updated = new Set(prev);
    if (updated.has(key)) {
      updated.delete(key);
    } else {
      updated.add(key);
    }
    return updated;
  });
};


  const filteredBuildings = buildings.filter((building) =>
    building.name.includes(search)
  );

  return (
    <div className="p-6 bg-[#e7f0f3] min-h-screen">
      <h1 className="text-3xl font-bold text-[#2E5361] mb-4">จัดการอาคาร</h1>

      <div className="flex space-x-4 justify-between mb-6">
        <div className="relative flex-auto">
          <input
            type="text"
            placeholder="ค้นชื่ออาคาร"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered border-2 border-gray-400 rounded-lg p-2 pr-10 bg-white w-full"
          />
          <Icon
            path={mdiMagnify}
            size={1}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        <button
          className="ml-4 flex items-center gap-2 px-4 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] shadow-md transform hover:-translate-y-1 hover:scale-105 transition-transform"
        >
          <Icon path={mdiHomePlus} size={1} />
          เพิ่มอาคารใหม่
        </button>
      </div>

      <div className="bg-white rounded-none shadow-md overflow-hidden">
        {filteredBuildings.map((building) => {
          const isBuildingExpanded = expandedBuildings.has(building.id);
          return (
            <div key={building.id} className="border-b border-gray-300">
              <div
                className="flex justify-between items-center p-4 bg-[#B7D6DE] cursor-pointer"
                onClick={() => toggleBuilding(building.id)}
              >
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Icon
                    path={isBuildingExpanded ? mdiChevronDown : mdiChevronRight}
                    size={1}
                  />
                  {building.name}
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-blue-600">
                    <Icon path={mdiPencil} size={1} />
                  </button>
                  <button className="text-red-600">
                    <Icon path={mdiTrashCan} size={1} />
                  </button>
                </div>
              </div>

              {isBuildingExpanded &&
                building.floors.map((floor) => {
                  const floorKey = `${building.id}-${floor.id}`;
                  const isFloorExpanded = expandedFloors.has(floorKey);

                  return (
                    <div key={floor.id} className="ml-6">
                      <div
                        className="flex justify-between items-center p-3 bg-[#D9E9EF] cursor-pointer"
                        onClick={() => toggleFloor(building.id, floor.id)}
                      >
                        <div className="flex items-center gap-2 font-semibold">
                          <Icon
                            path={isFloorExpanded ? mdiChevronDown : mdiChevronRight}
                            size={0.9}
                          />
                          {floor.name}
                        </div>
                        <button className="bg-[#95BAC3] text-white rounded-lg px-3 py-1 text-sm hover:bg-[#5E8892]">
                          เพิ่มห้อง
                        </button>
                      </div>

                      {isFloorExpanded && (
                        <div className="ml-10">
                          {floor.rooms.map((room) => (
                            <div
                              key={room.id}
                              className="flex justify-between items-center p-3 border-b border-gray-200 bg-gradient-to-r from-white via-gray-100 to-white"
                            >
                              <div>{room.name}</div>
                              <div className="flex gap-4 items-center">
                                <span className="text-green-600 font-medium">
                                  {room.status}
                                </span>
                                <button className="text-blue-600">
                                  <Icon path={mdiPencil} size={1} />
                                </button>
                                <button className="text-red-600">
                                  <Icon path={mdiTrashCan} size={1} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WardManagement;
