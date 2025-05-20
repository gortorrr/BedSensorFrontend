import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import axios from "axios";
import { Patient } from "../../../types/patient";

interface PatientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialPatientData: Patient;
}

const PatientDialog: React.FC<PatientDialogProps> = ({
  isOpen,
  onClose,
  initialPatientData,
}) => {
  const [patientData, setPatientData] = useState<Patient>(initialPatientData);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
  if (isOpen) {
    setPatientData(initialPatientData);
    setImage(null);
    console.log(initialPatientData.image_path)
    if (initialPatientData.image_path) {
      setPreview(`http://localhost:8000${initialPatientData.image_path}`);
    } else {
      setPreview(null);
    }
  }
}, [isOpen, initialPatientData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.entries(patientData).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (image) {
      formData.append("file", image);
    }

    try {
      await axios.post(`http://localhost:8000/patients/${initialPatientData.patient_id}/upload_image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("บันทึกสำเร็จ");
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="fixed inset-0 z-50 flex justify-center items-center"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-[700px] max-h-[90vh] overflow-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {initialPatientData.patient_id !== 0
              ? "แก้ไขข้อมูลผู้ป่วย"
              : "เพิ่มข้อมูลผู้ป่วย"}
          </h2>

          {/* รูปภาพ */}
          <div className="col-span-2 flex justify-center mb-4">
            <label className="cursor-pointer relative w-32 h-32 rounded-md border border-gray-300 flex items-center justify-center overflow-hidden shadow-md hover:shadow-lg transition">
              {preview ? (
                <img src={preview} alt="preview" className="object-cover w-full h-full" />
              ) : (
                <img
                  src="/default-user-icon.png"
                  alt="default"
                  className="w-12 h-12 opacity-50"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {!preview && (
                <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow">
                  <span className="text-xl text-gray-600 font-bold">+</span>
                </div>
              )}
            </label>
          </div>

          {/* ฟอร์มข้อมูล */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-gray-700">ชื่อ-นามสกุล</label>
              <input
                type="text"
                value={patientData.patient_name}
                placeholder="กรุณากรอกชื่อ-นามสกุล"
                className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
                onChange={(e) =>
                  setPatientData({ ...patientData, patient_name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">อายุ</label>
              <input
                type="number"
                min={1}
                value={patientData.patient_age}
                placeholder="กรุณากรอกอายุ"
                className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    patient_age: Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">เพศ</label>
              <select
                value={patientData.patient_gender}
                onChange={(e) =>
                  setPatientData({ ...patientData, patient_gender: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md w-full h-11 cursor-pointer"
              >
                <option value="" disabled hidden>
                  กรุณาเลือกเพศ
                </option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">หมู่เลือด</label>
              <select
                value={patientData.patient_bloodtype}
                onChange={(e) =>
                  setPatientData({ ...patientData, patient_bloodtype: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md w-full h-11 cursor-pointer"
              >
                <option value="" disabled hidden>
                  กรุณาเลือกหมู่เลือด
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">วันเกิด</label>
              <input
                type="date"
                value={patientData.patient_dob}
                onChange={(e) =>
                  setPatientData({ ...patientData, patient_dob: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md w-full h-11"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">โรคประจำตัว</label>
              <input
                type="text"
                value={patientData.patient_disease}
                onChange={(e) =>
                  setPatientData({ ...patientData, patient_disease: e.target.value })
                }
                placeholder="กรุณากรอกโรคประจำตัว"
                className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">สถานะ</label>
              <select
                value={patientData.patient_status}
                onChange={(e) =>
                  setPatientData({ ...patientData, patient_status: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md w-full h-11 cursor-pointer"
              >
                <option value="" disabled hidden>
                  กรุณาเลือกสถานะ
                </option>
                <option value="stable">คงที่</option>
                <option value="recover">ฟื้นตัว</option>
                <option value="crisis">วิกฤต</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">วันที่เข้ารักษา</label>
              <input
                type="date"
                value={patientData.patient_date_in}
                onChange={(e) =>
                  setPatientData({ ...patientData, patient_date_in: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md w-full h-11"
              />
            </div>
          </div>

          {/* ปุ่ม */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892]"
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

export default PatientDialog;
