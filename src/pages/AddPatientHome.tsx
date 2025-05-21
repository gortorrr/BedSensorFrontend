import React, { useEffect, useState } from "react";
import { Bed } from "../types/bed";
import { Building } from "../types/building";
import { useBedStore } from "../store/bedStore";
import { useNavigate } from "react-router-dom";

const AddPatientHome: React.FC = () => {
  const [buildingOptions, setBuildingOptions] = useState<string[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [floorOptions, setFloorOptions] = useState<string[]>([]);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [roomOptions, setRoomOptions] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [bedsData, setBedsData] = useState<Bed[]>([]);
  const bedStore = useBedStore();
  const navigate = useNavigate();
  const [$locations, setLocations] = useState<Building[]>([]);

  useEffect(() => {
    const fetchBedsFreeData = async () => {
      const res = await bedStore.getBedsFree();
      setBedsData(res);
    };
    const fetchLocationsData = async () => {
      const res = await bedStore.getLocations();
      setLocations(res);
    };
    fetchBedsFreeData();
    fetchLocationsData();
  }, []);

  // เมื่อข้อมูลสถานที่โหลดแล้วให้สร้างตัวเลือก "อาคาร"
  useEffect(() => {
    const buildings: string[] = [""];
    $locations.forEach((item) => {
      buildings.push(item.building_name);
    });
    setBuildingOptions(buildings);
  }, [$locations]);

  // เมื่อเลือกอาคารใหม่ รีเซ็ตชั้นและห้อง และสร้างตัวเลือก "ชั้น"
  useEffect(() => {
    setSelectedFloor("");
    setSelectedRoom("");
    const floors: string[] = [""];
    $locations.forEach((item) => {
      if (item.building_name === selectedBuilding) {
        item.floor?.forEach((f) => {
          floors.push(f.floor_name);
        });
      }
    });
    setFloorOptions(floors);
  }, [selectedBuilding]);

  // เมื่อเลือกชั้นใหม่ รีเซ็ตห้อง และสร้างตัวเลือก "ห้อง"
  useEffect(() => {
    setSelectedRoom("");
    const rooms: string[] = [""];
    $locations.forEach((item) => {
      if (item.building_name === selectedBuilding) {
        item.floor?.forEach((f) => {
          if (f.floor_name === selectedFloor) {
            f.room?.forEach((r) => {
              rooms.push(r.room_name);
            });
          }
        });
      }
    });
    setRoomOptions(rooms);
  }, [selectedFloor]);

  // ฟิลเตอร์เตียงว่างตามอาคาร/ชั้น/ห้อง
  const filteredBeds = bedsData.filter((bed) => {
    const matchBuilding =
      selectedBuilding === "" ||
      bed.room.floor.building.building_name === selectedBuilding;
    const matchFloor =
      selectedFloor === "" || bed.room.floor.floor_name === selectedFloor;
    const matchRoom =
      selectedRoom === "" || bed.room.room_name === selectedRoom;

    return matchBuilding && matchFloor && matchRoom;
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
            <option value="">เลือกอาคาร</option>
            {buildingOptions.slice(1).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="floor">&nbsp;</label>
          <select
            id="floor"
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="border border-gray-400 rounded-lg p-2"
            disabled={!selectedBuilding}
          >
            <option value="">เลือกชั้น</option>
            {floorOptions.slice(1).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="room">&nbsp;</label>
          <select
            id="room"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="border border-gray-400 rounded-lg p-2"
            disabled={!selectedFloor}
          >
            <option value="">เลือกห้อง</option>
            {roomOptions.slice(1).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead className="bg-[#95BAC3] text-black h-12 text-center">
          <tr>
            <th className="p-2">อาคาร</th>
            <th className="p-2">ชั้น</th>
            <th className="p-2">ห้อง</th>
            <th className="p-2">หมายเลขเตียง</th>
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
                <button
                  className="bg-[#95BAC3] text-white px-4 py-1 rounded-md hover:bg-[#5E8892] shadow-md transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
                  onClick={() => navigate(`/bed-config/${bed.bed_id}`)}
                >
                  เลือก
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-right">
        <button
          className="bg-[#95BAC3] text-white px-6 py-2 rounded-xl hover:bg-[#5E8892] shadow-lg transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
          onClick={() => navigate(-1)}
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

export default AddPatientHome;
