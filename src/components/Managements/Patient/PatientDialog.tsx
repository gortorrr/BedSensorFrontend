import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
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

  useEffect(() => {
    if (isOpen) {
      setPatientData(initialPatientData);
    }
    console.log(initialPatientData);
  }, [isOpen]);

  const handleClose = () => {
    onClose();
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
          {initialPatientData.patient_id !== 0 || undefined ? (
            <h2 className="text-2xl font-semibold mb-4 text-center">
              แก้ไขข้อมูลผู้ป่วย
            </h2>
          ) : (
            <h2 className="text-2xl font-semibold mb-4 text-center">
              เพิ่มข้อมูลผู้ป่วย
            </h2>
          )}

          <div className="grid grid-cols-2 gap-4">
            {/* <div>
              <label className="block mb-1 text-sm text-gray-700">
                รหัสผู้ป่วย
              </label>
              <input
                type="number"
                value={patientData.patient_id}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    patient_id: Number(e.target.value),
                  })
                }
                placeholder="กรุณากรอกรหัสผู้ป่วย"
                className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
              />
            </div> */}

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
              <label className="block mb-1 text-sm text-gray-700">สถานะ</label>
              <select
                value={patientData.patient_status}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    patient_status: e.target.value,
                  })
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

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400"
            >
              ยกเลิก
            </button>
            <button className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892]">
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
