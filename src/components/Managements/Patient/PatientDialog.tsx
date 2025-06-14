import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { Patient } from "../../../types/patient";
import AddUserIcon from "../../../assets/btnManagement/AddUser.png";
import { usePatientStore } from "../../../store/patientStore";

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
  const patientStore = usePatientStore();

  const isFormValid =
    (patientData.patient_name?.trim() ?? "") !== "" &&
    (patientData.patient_age ?? 0) > 0 &&
    (patientData.patient_dob?.trim() ?? "") !== "" &&
    (patientData.patient_gender?.trim() ?? "") !== "" &&
    (patientData.patient_bloodtype?.trim() ?? "") !== "" &&
    (patientData.patient_date_in?.trim() ?? "") !== "";

  useEffect(() => {
    if (isOpen) {
      setPatientData(initialPatientData);
      setImage(null);
      console.log(initialPatientData.image_path);
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
    if (initialPatientData.patient_id == 0) {
      const data = await patientStore.addPatient(patientData);
      initialPatientData.patient_id = data.patient_id;
    } else {
      await patientStore.editPatient(patientData);
    }

    if (image && initialPatientData.patient_id) {
      patientStore.addImageToPatient(image, initialPatientData.patient_id);
    }
    alert("บันทึกสำเร็จ");
    onClose();
    window.location.reload();
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

          {/* กล่องหลักที่รวมรูปและฟอร์มไว้แนวนอน */}
          <div className="flex gap-6 mb-4">
            {/* รูปผู้ป่วย */}
            <div className="flex-shrink-0">
              <label className="cursor-pointer relative w-32 h-32 rounded-md border border-gray-300 flex items-center justify-center overflow-hidden shadow-md hover:shadow-lg transition">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src={AddUserIcon}
                    alt="default"
                    className="w-20 h-23 opacity-50"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>

            {/* ฟอร์มผู้ป่วย */}
            <div className="grid grid-cols-2 gap-4 flex-grow">
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  รหัสผู้ป่วย
                </label>
                <input
                  type="text"
                  value={patientData.patient_id}
                  className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 bg-gray-100"
                  disabled
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  value={patientData.patient_name}
                  placeholder="กรุณากรอกชื่อ-นามสกุล"
                  className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
                  onChange={(e) =>
                    setPatientData({
                      ...patientData,
                      patient_name: e.target.value,
                    })
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
                <label className="block mb-1 text-sm text-gray-700">
                  วันเกิด
                </label>
                <input
                  type="date"
                  value={patientData.patient_dob}
                  onChange={(e) =>
                    setPatientData({
                      ...patientData,
                      patient_dob: e.target.value,
                    })
                  }
                  className="p-2 border border-gray-300 rounded-md w-full h-11"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">เพศ</label>
                <select
                  value={patientData.patient_gender}
                  onChange={(e) =>
                    setPatientData({
                      ...patientData,
                      patient_gender: e.target.value,
                    })
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
                <label className="block mb-1 text-sm text-gray-700">
                  หมู่เลือด
                </label>
                <select
                  value={patientData.patient_bloodtype}
                  onChange={(e) =>
                    setPatientData({
                      ...patientData,
                      patient_bloodtype: e.target.value,
                    })
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
                <label className="block mb-1 text-sm text-gray-700">
                  โรคประจำตัว
                </label>
                <input
                  type="text"
                  value={patientData.patient_disease}
                  onChange={(e) =>
                    setPatientData({
                      ...patientData,
                      patient_disease: e.target.value,
                    })
                  }
                  placeholder="กรุณากรอกโรคประจำตัว"
                  className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  วันที่เข้ารักษา
                </label>
                <input
                  type="date"
                  value={patientData.patient_date_in}
                  onChange={(e) =>
                    setPatientData({
                      ...patientData,
                      patient_date_in: e.target.value,
                    })
                  }
                  className="p-2 border border-gray-300 rounded-md w-full h-11"
                />
              </div>
            </div>
          </div>
          {!isFormValid && (
            <div className="text-sm text-red-500 text-right mt-2">
              *กรุณากรอกชื่อ-นามสกุล อายุ วันเกิด เพศ หมู่เลือด
              และวันที่เข้ารักษาให้ครบถ้วน เพื่อดำเนินการต่อไป
            </div>
          )}

          {/* ปุ่ม */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`px-6 py-2 rounded-xl transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110
    ${
      isFormValid
        ? "bg-[#95BAC3] text-white hover:bg-[#5E8892]"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
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
