import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sensor } from "../../types/sensor";

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
  const [form, setForm] = useState<Partial<Sensor>>({});

  const buildingOptions = ["ตึกภายใน", "ตึกภายนอก"];
  const floorOptions = ["1", "2", "3"];
  const roomOptions = ["ห้องฉุกเฉิน 101", "ห้องผ่าตัด 201", "ห้องไอซียู 301"];
  const sensorTypeOptions = ["Bed Sensor", "Heart Rate", "SpO2", "Respiration"];

  // รีเซตค่าฟอร์มเมื่อ dialog เปิดใหม่
  useEffect(() => {
    if (isOpen && sensor) {
      setForm(sensor);
    }
  }, [isOpen, sensor]);

  const handleChange = (field: keyof Sensor, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setForm({}); // รีเซตค่าฟอร์มเมื่อกดปิด dialog
    onClose(); // ปิด dialog
  };

  const statusOptions = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black bg-opacity-20 backdrop-blur-sm"
        onClick={handleClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 50 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[90vh] overflow-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            แก้ไขข้อมูลเซ็นเซอร์
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Mac Sensor I"
              value={form.sensor_mac_i || ""}
              onChange={(v) => handleChange("sensor_mac_i", v)}
            />
            <InputField
              label="Mac Sensor II"
              value={form.sensor_mac_ii || ""}
              onChange={(v) => handleChange("sensor_mac_ii", v)}
            />
            <SelectField
              label="อาคาร"
              options={buildingOptions.map((b) => ({ label: b, value: b }))}
              value={form.bed?.room.floor.building.building_name || ""}
              onChange={(v) => handleChange("building", v)}
            />

            <SelectField
              label="ชั้น"
              options={floorOptions.map((f) => ({ label: f, value: f }))}
              value={form.bed?.room.floor.floor_name || ""}
              onChange={(v) => handleChange("floor", v)}
            />

            <SelectField
              label="ห้อง"
              options={roomOptions.map((r) => ({ label: r, value: r }))}
              value={form.bed?.room.room_name || ""}
              onChange={(v) => handleChange("room", v)}
            />
            <InputField
              label="หมายเลขเตียง"
              value={form.bed?.bed_name || ""}
              onChange={(v) => handleChange("bed", v)}
            />

            <SelectField
              label="ประเภทเซ็นเซอร์"
              options={sensorTypeOptions.map((s) => ({ label: s, value: s }))}
              value={form.sensor_type || ""}
              onChange={(v) => handleChange("sensor_type", v)}
            />
            <SelectField
              label="สถานะ"
              options={statusOptions}
              value={form.sensor_status}
              onChange={(v) => handleChange("sensor_status", v === "true")}
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400"
            >
              ยกเลิก
            </button>
            <button
              className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892]"
              onClick={() => {
                // TODO: ส่ง form กลับ backend
                console.log("ส่งข้อมูล", form);
              }}
            >
              บันทึก
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// 📦 Input Field
const InputField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="block mb-1 text-sm text-gray-700">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border border-gray-300 rounded-md w-full"
    />
  </div>
);

// 📦 Select Field
const SelectField = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { label: string; value: string }[];  // เปลี่ยนจาก boolean เป็น string
  value: string | undefined;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="block mb-1 text-sm text-gray-700">{label}</label>
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border border-gray-300 rounded-md w-full text-black"
    >
      <option value="" disabled hidden>
        เลือก
      </option>
      {options.map((opt) => (
        <option key={opt.label} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default EditSensorDialog;
