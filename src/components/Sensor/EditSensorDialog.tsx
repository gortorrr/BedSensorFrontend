import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Sensor {
  mac1: string;
  mac2: string;
  building: string;
  floor: string;
  room: string;
  bedNumber: string;
  sensorType: string;
  status: string;
}

interface EditSensorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sensor: Sensor;
}

const EditSensorDialog: React.FC<EditSensorDialogProps> = ({
  isOpen,
  onClose,
  sensor,
}) => {
  const [form, setForm] = useState<Sensor>({
    mac1: "",
    mac2: "",
    building: "",
    floor: "",
    room: "",
    bedNumber: "",
    sensorType: "",
    status: "",
  });

  const buildingOptions = ["ตึกภายใน", "ตึกภายนอก"];
  const floorOptions = ["1", "2", "3"];
  const roomOptions = ["ห้องฉุกเฉิน 101", "ห้องผ่าตัด 201", "ห้องไอซียู 301"];
  const sensorTypeOptions = ["Bed Sensor", "Heart Rate", "SpO2", "Respiration"];

  useEffect(() => {
    if (isOpen && sensor) {
      setForm(sensor);
    }
  }, [isOpen, sensor]);

  const handleChange = (field: keyof Sensor, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    onClose();
  };


  if (!isOpen) return null;

  return (
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
            แก้ไขข้อมูลเซ็นเซอร์
          </h2>

          <div className="grid grid-cols-2 gap-4 ">
            <InputField id="mac1" label="Mac Sensor I" value={form.mac1} onChange={(v) => handleChange("mac1", v)} />
            <InputField id="mac2" label="Mac Sensor II" value={form.mac2} onChange={(v) => handleChange("mac2", v)} />
            <SelectField id="building" label="อาคาร" options={buildingOptions} value={form.building} onChange={(v) => handleChange("building", v)} />
            <SelectField id="floor" label="ชั้น" options={floorOptions} value={form.floor} onChange={(v) => handleChange("floor", v)} />
            <SelectField id="room" label="ห้อง" options={roomOptions} value={form.room} onChange={(v) => handleChange("room", v)} />
            <InputField id="bedNumber" label="หมายเลขเตียง" value={form.bedNumber} onChange={(v) => handleChange("bedNumber", v)} />
            <SelectField id="sensorType" label="ประเภทเซ็นเซอร์" options={sensorTypeOptions} value={form.sensorType} onChange={(v) => handleChange("sensorType", v)} />
            <SelectField id="status" label="สถานะ" options={["Active", "Inactive"]} value={form.status} onChange={(v) => handleChange("status", v)} />
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
            >
              บันทึก
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Reusable input field
const InputField = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="block mb-1 text-sm text-gray-700">{label}</label>
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border border-gray-300 rounded-md w-full h-11"
    />
  </div>
);

// Reusable select field
const SelectField = ({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="block mb-1 text-sm text-gray-700">{label}</label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border border-gray-300 rounded-md w-full h-11 text-black cursor-pointer"
    >
      <option value="" disabled hidden></option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default EditSensorDialog;
