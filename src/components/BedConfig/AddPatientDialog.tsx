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
      patient_dob: "2003-11-13",
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
      patient_dob: "1999-12-13",
      patient_gender: "หญิง",
      patient_bloodtype: "AB",
      patient_disease: "ไข้หวัดใหญ่",
      patient_status: "เข้ารับการรักษา",
      patient_date_in: "2025-03-15",
    },
  ];

  const filteredPatients = patients.filter((patient) =>
    (patient.patient_name?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[900px] max-h-[80vh] overflow-auto">
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
                <th className="border p-3">รหัส</th>
                <th className="border p-3">ชื่อ</th>
                <th className="border p-3">อายุ</th>
                <th className="border p-3">เลือด</th>
                <th className="border p-3">โรค</th>
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
                    {patient.patient_bloodtype}
                  </td>
                  <td className="border p-3">{patient.patient_disease}</td>
                  <td className="border p-3 text-center">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
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

        <button
          className="mt-4 px-6 py-2 bg-gray-300 rounded-xl"
          onClick={onClose}
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

export default AddPatientDialog;
