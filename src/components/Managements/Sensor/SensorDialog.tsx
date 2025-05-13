import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { Sensor } from "../../../types/sensor";
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
  const sensorStore = useSensorStore();

  const sensorTypeOptions = ["bed_sensor", "heart_rate", "spo2", "respiration"];

  useEffect(() => {
    if (isOpen) {
      setSensorData(initialSensorData);
    }
    console.log(initialSensorData);
  }, [isOpen]);

  const handleClose = () => {
    const clearSensorData: Sensor = {
      sensor_id: 0,
      sensor_type: "",
      sensor_status: false,
      history_value_sensor: [],
    };
    setSensorData(clearSensorData);
    onClose();
  };

  const saveSensor = () => {
    if (initialSensorData.sensor_id == 0) {
      sensorStore.addSensor(sensorData);
      handleClose();
      window.location.reload();
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
          {initialSensorData.sensor_id !== 0 || undefined ? (
            <h2 className="text-2xl font-semibold mb-4 text-center">
              ตั้งค่าข้อมูลเซ็นเซอร์
            </h2>
          ) : (
            <h2 className="text-2xl font-semibold mb-4 text-center">
              เพิ่มข้อมูลเซ็นเซอร์
            </h2>
          )}
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

            {/* ประเภท */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                ประเภทเซ็นเซอร์
              </label>
              <select
                id="sensorType"
                value={sensorData.sensor_type}
                className={`p-2 border border-gray-300 rounded-md w-full h-11 cursor-pointer ${
                  sensorData.sensor_type ? "text-black" : "text-gray-400"
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
                  ${
                    sensorData.sensor_status ? "text-green-600" : "text-red-600"
                  }`}
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
          <div className="flex items-center justify-between mt-6">
            <div>
              {initialSensorData.bed_id !== null ? (
                <label className="block mb-1 text-sm text-gray-600 ">
                  สถานที่ติดตั้ง :{" "}
                  {initialSensorData.bed?.room?.floor?.building?.building_name}{" "}
                  {initialSensorData.bed?.room?.floor?.floor_name}{" "}
                  {initialSensorData.bed?.room?.room_name}{" "}
                  {initialSensorData.bed?.bed_name}
                </label>
              ) : (
                <label className="block mb-1 text-sm text-red-500 ">
                  ยังไม่ติดตั้งเซ็นเซอร์
                </label>
              )}
            </div>
            <div className="flex gap-4">
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
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default SensorDialog;
