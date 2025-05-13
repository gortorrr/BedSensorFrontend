import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { Sensor } from "../../../types/sensor";
import { useBedStore } from "../../../store/bedStore";
import { Building } from "../../../types/building";
import { Bed } from "../../../types/bed";
import { useSensorStore } from "../../../store/sensorStore";

interface SensorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialSensorData: Sensor;
}

const SensorDialog: React.FC<SensorDialogProps> = ({
  isOpen,
  onClose,
  initialSensorData,
}) => {
  const [sensorData, setSensorData] = useState<Sensor>(initialSensorData);
  const bedStore = useBedStore();
  const sensorStore = useSensorStore();
  const [dataOptions, setDataOptions] = useState<Building[]>([]);
  const [buildingOptions, setBuildingOptions] = useState<string[]>([]);
  const [floorOptions, setFloorOptions] = useState<string[]>([]);
  const [roomOptions, setRoomOptions] = useState<string[]>([]);

  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const sensorTypeOptions = ["bed_ensor", "heart_rate", "spo2", "respiration"];

  // โหลดข้อมูล location
  useEffect(() => {
    const fetchLocations = async () => {
      const data = await bedStore.getLocations();
      setDataOptions(data);
      const buildingNames = data.map((b) => b.building_name);
      setBuildingOptions(buildingNames);
    };

    if (isOpen) {
      setSensorData(initialSensorData);
      fetchLocations();
    }
  }, [isOpen]);

  // ตั้งค่าอาคารหากเป็นการแก้ไข
  useEffect(() => {
    if (initialSensorData.sensor_id !== 0 && dataOptions.length > 0) {
      const building =
        initialSensorData.bed?.room.floor.building.building_name ?? "";
      if (building) {
        setSelectedBuilding(building);
      }
    }
  }, [dataOptions, initialSensorData]);

  // ตั้งค่าชั้นเมื่ออาคารถูกเลือก
  useEffect(() => {
    const targetBuilding = dataOptions.find(
      (b) => b.building_name === selectedBuilding
    );
    const floors =
      targetBuilding?.floor?.map((floor) => floor.floor_name) || [];
    setFloorOptions(floors);

    if (initialSensorData.sensor_id !== 0) {
      const floor = initialSensorData.bed?.room.floor.floor_name ?? "";
      if (floor) {
        setSelectedFloor(floor);
      }
    } else {
      setSelectedFloor("");
      setSelectedRoom("");
    }
  }, [selectedBuilding]);

  // ตั้งค่าห้องเมื่อชั้นถูกเลือก
  useEffect(() => {
    const targetBuilding = dataOptions.find(
      (b) => b.building_name === selectedBuilding
    );
    const targetFloor = targetBuilding?.floor?.find(
      (f) => f.floor_name === selectedFloor
    );
    const rooms = targetFloor?.room?.map((room) => room.room_name) || [];
    setRoomOptions(rooms);

    if (initialSensorData.sensor_id !== 0) {
      const room = initialSensorData.bed?.room.room_name ?? "";
      if (room) {
        setSelectedRoom(room);
      }
    } else {
      setSelectedRoom("");
    }
  }, [selectedFloor]);

  const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const floor = e.target.value;
    setSelectedFloor(floor);
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const room = e.target.value;
    setSelectedRoom(room);
  };

  const handleClose = () => {
    const clearSensorData: Sensor = {
      sensor_id: 0,
      sensor_type: "",
      sensor_status: false,
      history_value_sensor: [],
    };
    setSensorData(clearSensorData);
    setSelectedBuilding("");
    setSelectedFloor("");
    setSelectedRoom("");
    onClose();
  };

  const saveSensor = () => {
    if (initialSensorData.sensor_id == 0) {
      sensorStore.addSensor(sensorData);
    } else {
      console.log("สำหรับ edit");
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-transparent backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="fixed inset-0 z-50 flex justify-center items-center"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[90vh] overflow-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            เพิ่มข้อมูลเซ็นเซอร์
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Mac Sensor I */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                Mac Sensor I
              </label>
              <input
                id="mac1"
                type="text"
                value={sensorData.sensor_mac_i}
                placeholder="กรุณากรอก Mac Sensor I"
                onChange={(e) =>
                  setSensorData({ ...sensorData, sensor_mac_i: e.target.value })
                }
                className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
              />
            </div>

            {/* Mac Sensor II */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                Mac Sensor II
              </label>
              <input
                id="mac2"
                type="text"
                value={sensorData.sensor_mac_ii}
                placeholder="กรุณากรอก Mac Sensor II"
                onChange={(e) =>
                  setSensorData({
                    ...sensorData,
                    sensor_mac_ii: e.target.value,
                  })
                }
                className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
              />
            </div>

            {/* Sensor Name */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                ชื่อเซ็นเซอร์
              </label>
              <input
                id="sensor_name"
                type="text"
                value={sensorData.sensor_name}
                placeholder="กรุณากรอกชื่อเซ็นเซอร์"
                onChange={(e) =>
                  setSensorData({ ...sensorData, sensor_name: e.target.value })
                }
                className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
              />
            </div>

            {/* Sensor Unit */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">หน่วย</label>
              <input
                id="sensor_unit"
                type="text"
                value={sensorData.sensor_unit}
                placeholder="กรุณากรอกหน่วยของเซ็นเซอร์"
                onChange={(e) =>
                  setSensorData({ ...sensorData, sensor_unit: e.target.value })
                }
                className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
              />
            </div>

            {/* อาคาร */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">อาคาร</label>
              <select
                id="building"
                value={selectedBuilding}
                onChange={(e) => setSelectedBuilding(e.target.value)}
                className={`p-2 border border-gray-300 rounded-md w-full h-11 cursor-pointer 
                            ${selectedBuilding ? 'text-black' : 'text-gray-400'
                          }`}
              >
                <option value="" disabled hidden>
                  กรุณาเลือกอาคาร
                </option>
                {buildingOptions.map((b) => (
                  <option key={b} value={b} className="text-black">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* ชั้น */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">ชั้น</label>
              <select
                id="floor"
                value={selectedFloor}
                onChange={handleFloorChange}
                className={`p-2 border border-gray-300 rounded-md w-full h-11 cursor-pointer
                           ${selectedFloor ? 'text-black' : 'text-gray-400'
                          }`}
              >
                <option value="" disabled hidden>
                  กรุณาเลือกชั้น
                </option>
                {floorOptions.map((f) => (
                  <option key={f} value={f} className="text-black">
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* ห้อง */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">ห้อง</label>
              <select
                id="room"
                value={selectedRoom}
                onChange={handleRoomChange}
                className={`p-2 border border-gray-300 rounded-md w-full h-11 cursor-pointer 
                            ${selectedRoom ? 'text-black' : 'text-gray-400'
                          }`}
                disabled={selectedFloor === ""}
              >
                <option value="" disabled hidden>
                  กรุณาเลือกห้อง
                </option>
                {roomOptions.map((r) => (
                  <option key={r} value={r} className="text-black">
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* เตียง */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                หมายเลขเตียง
              </label>
              <input
                id="bedNumber"
                type="text"
                value={sensorData.bed?.bed_name}
                placeholder="กรุณากรอกหมายเลขเตียง"
                className="p-2 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
                onChange={(e) => {
                  setSensorData({
                    ...sensorData,
                    bed: {
                      ...sensorData.bed,
                      bed_name: e.target.value,
                      bed_id: sensorData.bed?.bed_id as number, // Bypass type check (use with caution)
                    } as Bed, // Force type assertion to match the Bed type
                  });
                }}
              />
            </div>

            {/* ประเภท */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                ประเภทเซ็นเซอร์
              </label>
              <select
                id="sensorType"
                value={sensorData.sensor_type}
                className={`p-2 border border-gray-300 rounded-md w-full h-11 cursor-pointer ${
                            sensorData.sensor_type ? 'text-black' : 'text-gray-400'
                          }`}
                onChange={(e) =>
                  setSensorData({ ...sensorData, sensor_type: e.target.value })
                }
              >
                <option value="" disabled hidden>
                  กรุณาเลือกประเภทเซ็นเซอร์
                </option>
                {sensorTypeOptions.map((type) => (
                  <option key={type} value={type} className="text-black">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* สถานะ */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">สถานะ</label>
              <select
                id="status"
                value={sensorData.sensor_status ? "Active" : "Inactive"} // เลือกค่า Active หรือ Inactive ตามสถานะ
                className={`p-2 border border-gray-300 rounded-md w-full h-11 cursor-pointer 
                  ${sensorData.sensor_status ? "text-green-600" : "text-red-600"}`}
                onChange={(e) => {
                  const status = e.target.value === "Active"; // ถ้าเลือก Active จะเป็น true
                  setSensorData({
                    ...sensorData,
                    sensor_status: status,
                  });
                }}
              >
                <option value="Inactive" className="text-red-600">
                  Inactive
                </option>
                <option value="Active" className="text-green-600">
                  Active
                </option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              id="btnCancel"
              onClick={handleClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              id="btnSave"
              className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] cursor-pointer"
              onClick={saveSensor}
            >
              บันทึก
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default SensorDialog;
