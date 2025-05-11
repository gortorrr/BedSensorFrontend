// src/pages/SensorManagement.tsx
import React, { useState } from "react";
import { Sensor } from "../types/sensor";
import { mdiMagnify, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import AddSensorDialog from "../components/Sensor/AddSensorDialog";

const sensors: Sensor[] = [
  {
    sensor_id: 1,
    sensor_type: "Bed Sensor",
    sensor_status: true,
    sensor_mac_i: "C4:4F:33:0C:AC:49",
    sensor_mac_ii: "C4:4F:33:0C:AC:45",
    history_value_sensor: [],
    bed_id: 101,
    bed: {
      bed_id: 101,
      bed_name: "เตียง 101",
      bed_activated: true,
      sensors: [],
      room: {
        room_id: 1,
        room_name: "ห้อง 101",
        floor: {
          floor_id: 1,
          floor_name: "ชั้น 1",
          building: {
            building_id: 1,
            building_name: "อาคาร A",
          },
        },
      },
    },
  },
  {
    sensor_id: 2,
    sensor_type: "Temperature Sensor",
    sensor_status: false,
    sensor_mac_i: "D4:5A:67:1D:BC:33",
    sensor_mac_ii: "D4:5A:67:1D:BC:30",
    history_value_sensor: [],
    bed_id: 102,
    bed: {
      bed_id: 102,
      bed_name: "เตียง 102",
      bed_activated: false,
      sensors: [],
      room: {
        room_id: 2,
        room_name: "ห้อง 102",
        floor: {
          floor_id: 1,
          floor_name: "ชั้น 1",
          building: {
            building_id: 1,
            building_name: "อาคาร A",
          },
        },
      },
    },
  },
  {
    sensor_id: 3,
    sensor_type: "Heart Rate Sensor",
    sensor_status: true,
    sensor_mac_i: "E7:8F:99:AB:CD:11",
    sensor_mac_ii: "E7:8F:99:AB:CD:10",
    history_value_sensor: [],
    bed_id: 201,
    bed: {
      bed_id: 201,
      bed_name: "เตียง 201",
      bed_activated: true,
      sensors: [],
      room: {
        room_id: 3,
        room_name: "ห้อง 201",
        floor: {
          floor_id: 2,
          floor_name: "ชั้น 2",
          building: {
            building_id: 2,
            building_name: "อาคาร B",
          },
        },
      },
    },
  },
];

const SensorManagement: React.FC = () => {
  const [search, setSearch] = useState("");
   const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredSensors = sensors.filter((sensor) => {
    const keyword = search.toLowerCase();
    return (
      sensor.sensor_mac_i?.toLowerCase().includes(keyword) ||
      sensor.sensor_mac_ii?.toLowerCase().includes(keyword) ||
      sensor.sensor_type?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">จัดการเซ็นเซอร์</h1>
      </div>
      <div className="flex space-x-4 justify-between mb-4">
        {/* ช่องค้นหา + ไอคอนค้นหา */}
        <div className="relative flex-auto pl-4 ">
          <input
            id="searchSensor"
            type="text"
            placeholder="ค้นหาเซ็นเซอร์"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered border-2 border-solid border-gray-400 rounded-lg p-2 pr-10 bg-white w-full inset-shadow"
          />
          <Icon
            path={mdiMagnify}
            size={1}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>
        <button
        id="btnAddSensor"
        className="flex items-center gap-2 px-4 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] drop-shadow-md cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <Icon path={mdiPlus} size={1} />
        <span>เพิ่มเซ็นเซอร์</span>
      </button>

      {/* Dialog เพิ่มเซ็นเซอร์ */}
      <AddSensorDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      </div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">ลำดับ</th>
            <th className="border p-2">Mac Sensor I</th>
            <th className="border p-2">Mac Sensor II</th>
            <th className="border p-2">อาคาร</th>
            <th className="border p-2">ห้อง</th>
            <th className="border p-2">หมายเลขเตียง</th>
            <th className="border p-2">ประเภทเซ็นเซอร์</th>
            <th className="border p-2">สถานะ</th>
            <th className="border p-2 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {filteredSensors.map((sensor, index) => (
            <tr key={sensor.sensor_id} className="hover:bg-gray-50">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{sensor.sensor_mac_i}</td>
              <td className="border p-2">{sensor.sensor_mac_ii}</td>
              <td className="border p-2">
                {sensor.bed?.room?.floor?.building?.building_name}
              </td>
              <td className="border p-2">{sensor.bed?.room?.room_name}</td>
              <td className="border p-2">{sensor.bed?.bed_name}</td>

              <td className="border p-2">{sensor.sensor_type}</td>
              <td className="border p-2">
                <span
                  className={
                    sensor.sensor_status ? "text-green-600" : "text-red-600"
                  }
                >
                  {sensor.sensor_status ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="border p-2 text-center">
                <button className="text-blue-600 hover:underline mx-1">
                  🖊️
                </button>
                <button className="text-red-600 hover:underline mx-1">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorManagement;
