import React from "react";
import type { Patient } from "../../types/patient";
import Icon from "@mdi/react";
import { mdiNoteEditOutline, mdiDelete } from "@mdi/js";
import { PlusCircle } from "lucide-react";

interface Props {
  patient_config: Patient | undefined;
}

const PatientWindow: React.FC<Props> = ({ patient_config }) => {
  if (!patient_config) {
    return (
      <div className="border-2 border-gray-300 rounded-md w-full bg-gray-100 p-3 mt-3 h-full shadow-md">
        <div className="p-3 text-xl font-semibold">รายละเอียดผู้ป่วย</div>
        <div className="flex justify-center items-center p-5">
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all">
            <PlusCircle size={24} />
            <span className="text-lg">เพิ่มผู้ป่วย</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {patient_config !== undefined && (
        <div className="border-2 border-gray-300 rounded-md w-full bg-gradient-to-br from-[#2E5361] to-[#D1DFE5] p-3 mt-3 h-full">
          <div className="p-3 text-xl font-semibold">รายละเอียดผู้ป่วย</div>

          <div className="grid grid-cols-2">
            {/* รหัสผู้ป่วย */}
            <div className="flex items-center p-3">
              <label
                htmlFor="patient_id"
                className="text-right pl-6 mr-2 font-medium"
              >
                รหัสผู้ป่วย:
              </label>
              <input
                id="patient_id"
                type="text"
                className="border border-gray-300 rounded-xl max-w-[250px] pl-3"
                placeholder="กรอกรหัสผู้ป่วย"
              />
            </div>

            {/* ชื่อ-นามสกุล */}
            <div className="flex items-center p-3">
              <label
                htmlFor="patient_name"
                className="text-right pl-6 mr-2 font-medium"
              >
                ชื่อ-นามสกุล:
              </label>
              <input
                id="patient_name"
                type="text"
                className="border border-gray-300 rounded-xl max-w-[250px] pl-3"
                value={patient_config?.patient_name || ""}
                placeholder="Enter patient name"
                readOnly
              />
            </div>

            {/* อายุ */}
            <div className="flex items-center p-3">
              <label htmlFor="patient_age" className="pl-6 mr-12 font-medium">
                อายุ:
              </label>
              <input
                id="patient_age"
                type="text"
                className="border border-gray-300 rounded-xl max-w-[250px] pl-3"
                value={patient_config?.patient_age || ""}
                placeholder="Enter patient age"
                readOnly
              />
            </div>

            {/* วันเกิด */}
            <div className="flex items-center p-3 pr-2">
              <label
                htmlFor="patient_birthdate"
                className="pl-6 mr-11 font-medium"
              >
                วันเกิด:
              </label>
              <input
                id="patient_birthdate"
                type="date"
                className="border border-gray-300 rounded-xl max-w-[250px] pl-3"
              />
            </div>

            {/* เพศ */}
            <div className="flex items-center p-3">
              <label
                htmlFor="patient_gender"
                className="pl-6 mr-12 font-medium"
              >
                เพศ:
              </label>
              <select
                id="patient_gender"
                className="border border-gray-300 rounded-xl max-w-[250px] pl-3"
              >
                <option value="">เลือกเพศ</option>
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
                <option value="other">อื่น ๆ</option>
              </select>
            </div>

            {/* หมู่เลือด */}
            <div className="flex items-center p-3 pr-2">
              <label htmlFor="patient_blood" className="pl-6 mr-8 font-medium">
                หมู่เลือด:
              </label>
              <select
                id="patient_blood"
                className="border border-gray-300 rounded-xl max-w-[250px] pl-3"
              >
                <option value="">เลือกหมู่เลือด</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
            </div>

            {/* การรักษา */}
            <div className="flex items-center p-3">
              <label
                htmlFor="patient_treatment"
                className="pl-6 mr-3 font-medium"
              >
                การรักษา:
              </label>
              <input
                id="patient_treatment"
                type="text"
                className="border border-gray-300 rounded-xl max-w-[250px] pl-3"
                placeholder="กรอกรายละเอียดการรักษา"
              />
            </div>

            {/* ปุ่มแก้ไขและลบ */}
            <div className="flex justify-end mr-2 gap-3">
              {/* ปุ่มแก้ไข */}
              <button
                type="button"
                title="Edit patient details"
                aria-label="Edit patient details"
                className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Icon path={mdiNoteEditOutline} size={1} />
              </button>

              {/* ปุ่มลบ */}
              <button
                type="button"
                title="Delete patient record"
                aria-label="Delete patient record"
                className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                <Icon path={mdiDelete} size={1} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientWindow;
