import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from 'react-dom';

interface AddSensorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSensorDialog: React.FC<AddSensorDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const initialForm = {
    mac1: "",
    mac2: "",
    building: "",
    floor: "",
    room: "",
    bedNumber: "",
    sensorType: "",
    status: "",
  };

  const [form, setForm] = useState(initialForm);

  // Mock dropdown data — later replace with fetched data
  const buildingOptions = ["ตึกภายใน", "ตึกภายนอก"];
  const floorOptions = ["1", "2", "3"];
  const roomOptions = ["ห้องฉุกเฉิน 101", "ห้องผ่าตัด 201", "ห้องไอซียู 301"];
  const sensorTypeOptions = ["Bed Sensor", "Heart Rate", "SpO2", "Respiration"];

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleClose = () => {
    setForm(initialForm); // รีเซตฟอร์ม
    onClose(); // ปิด dialog
  };

  if (!isOpen) return null;

  //ReactDOM.createPortal ทำให้ backdrop-blur แผ่เต็มทั้งหน้าจอ
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
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                Mac Sensor I
              </label>
              <input
                id="mac1"
                type="text"
                value={form.mac1}
                onChange={(e) => handleChange("mac1", e.target.value)}
                placeholder="กรุณากรอก Mac Sensor I"
                className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">
                Mac Sensor II
              </label>
              <input
                id="mac2"
                type="text"
                value={form.mac2}
                onChange={(e) => handleChange("mac2", e.target.value)}
                placeholder="กรุณากรอก Mac Sensor II"
                className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">อาคาร</label>
              <select
                id="building"
                value={form.building}
                onChange={(e) => handleChange("building", e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full h-11 text-gray-400 cursor-pointer"
              >
                <option value="" disabled hidden className="text-gray-400">กรุณาเลือกอาคาร</option>
                {buildingOptions.map((b) => (
                  <option key={b} value={b} className="text-black">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">ชั้น</label>
              <select
                id="floor"
                value={form.floor}
                onChange={(e) => handleChange("floor", e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full h-11 text-gray-400 cursor-pointer"
              >
                <option value="" disabled hidden className="text-gray-400">กรุณาเลือกชั้น</option>
                {floorOptions.map((f) => (
                  <option key={f} value={f} className="text-black">
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">ห้อง</label>
              <select
                id="room"
                value={form.room}
                onChange={(e) => handleChange("room", e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full h-11 text-gray-400 cursor-pointer"
              >
                <option value="" disabled hidden className="text-gray-400">กรุณาเลือกห้อง</option>
                {roomOptions.map((r) => (
                  <option key={r} value={r} className="text-black">
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">
                หมายเลขเตียง
              </label>
              <input
                id="bedNumber"
                type="text"
                value={form.bedNumber}
                onChange={(e) => handleChange("bedNumber", e.target.value)}
                placeholder="กรุณากรอกหมายเลขเตียง"
                className="p-2 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">
                ประเภทเซ็นเซอร์
              </label>
              <select
                id="sensorType"
                value={form.sensorType}
                onChange={(e) => handleChange("sensorType", e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full h-11 text-gray-400 cursor-pointer"
              >
                <option value="" disabled hidden className="text-gray-400">กรุณาเลือกประเภทเซ็นเซอร์</option>
                {sensorTypeOptions.map((type) => (
                  <option key={type} value={type} className="text-black">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">สถานะ</label>
              <select
                id="status"
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full h-11 text-gray-400 cursor-pointer"
              >
                <option value="" disabled hidden className="text-gray-400">กรุณาเลือกสถานะ</option>
                <option value="Active" className="text-green-600">
                  Active
                </option>
                <option value="Inactive" className="text-red-600">
                  Inactive
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
              className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] cursor-pointer">
              บันทึก
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default AddSensorDialog;
