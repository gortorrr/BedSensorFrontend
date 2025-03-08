import React, { useState } from "react";
import type { Patient } from "../../types/patient";

interface AddPatientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPatient: (patient: Patient) => void;
}

const AddPatientDialog: React.FC<AddPatientDialogProps> = ({
  isOpen,
  onClose,
  onSelectPatient,
}) => {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const patients: Patient[] = [
    {
      patient_id: 14,
      patient_name: "ศุภกร แสงจิต",
      patient_age: 21,
      patient_dob: "09-11-2003",
      patient_gender: "ชาย",
      patient_bloodtype: "O",
      patient_disease: "ริดสีดวง",
      patient_status: "ไม่เข้ารับการรักษา",
      patient_date_in: "2025-02-01",
    },
    {
      patient_id: 15,
      patient_name: "พีระดา วังยายฉิม",
      patient_age: 21,
      patient_dob: "13-12-2000",
      patient_gender: "หญิง",
      patient_bloodtype: "AB",
      patient_disease: "ไข้หวัดใหญ่",
      patient_status: "เข้ารับการรักษา",
      patient_date_in: "2025-03-15",
    },
    {
      patient_id: 16,
      patient_name: "สิริภพ วงศ์ทิม",
      patient_age: 21,
      patient_dob: "11-11-1967",
      patient_gender: "ชาย",
      patient_bloodtype: "A",
      patient_disease: "ผ่าตัดไส้ติ่ง",
      patient_status: "ไม่เข้ารับการรักษา",
      patient_date_in: "20-02-2025",
    },
    {
      patient_id: 17,
      patient_name: "สิริกร ยี่ยวน",
      patient_age: 21,
      patient_dob: "22-05-1989",
      patient_gender: "หญิง",
      patient_bloodtype: "B",
      patient_disease: "โรคหัวใจขาดเลือด",
      patient_status: "เข้ารับการรักษา",
      patient_date_in: "10-03-2025",
    },
  ];

  const filteredPatients = patients.filter((patient) =>
    (patient.patient_name?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent backdrop-blur-sm bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[1000px] max-h-[80vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-4">เลือกผู้ป่วย</h2>

        <input
          type="text"
          placeholder="ค้นหาชื่อผู้ป่วย"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 text-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="overflow-auto max-h-[50vh]">
          <table className="w-full border-collapse border border-gray-300 text-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-3">รหัสผู้ป่วย</th>
                <th className="border p-3">ชื่อ-นามสกุล</th>
                <th className="border p-3">อายุ</th>
                <th className="border p-3">วันเกิด</th>
                <th className="border p-3">เพศ</th>
                <th className="border p-3">หมู่เลือด</th>
                <th className="border p-3">การรักษา</th>
                <th className="border p-3">เลือก</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.patient_id} className="hover:bg-gray-100">
                  <td className="border p-3">{patient.patient_id}</td>
                  <td className="border p-3">{patient.patient_name}</td>
                  <td className="border p-3 text-center">
                    {patient.patient_age}
                  </td>
                  <td className="border p-3 text-center">
                    {patient.patient_dob}
                  </td>
                  <td className="border p-3 text-center">
                    {patient.patient_gender}
                  </td>
                  <td className="border p-3 text-center">
                    {patient.patient_bloodtype}
                  </td>
                  <td className="border p-3">{patient.patient_disease}</td>
                  <td className="border p-3 text-center">
                    <button
                      className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892]"
                      onClick={() => onSelectPatient(patient)}
                    >
                      เลือก
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400"
            onClick={onClose}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPatientDialog;
