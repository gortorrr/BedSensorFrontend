import React from "react";

interface AddPatientDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPatientDialog: React.FC<AddPatientDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // (Mock Data)
  const patients = [
    { id: "P0014", name: "ศุภกร แสงจิต", age: 21, birthDate: "13-11-2003", gender: "ชาย", bloodType: "O", treatment: "ริดสีดวง" },
    { id: "P0015", name: "พีระดา วังยายฉิม", age: 21, birthDate: "13-12-1999", gender: "หญิง", bloodType: "AB", treatment: "ไข้หวัดใหญ่" },
    { id: "P0016", name: "สิริภพ วงศ์ทิม", age: 21, birthDate: "09-09-1967", gender: "ชาย", bloodType: "A", treatment: "ผ่าตัดไส้ติ่ง" },
    { id: "P0017", name: "สิริกร ยี่ยวน", age: 21, birthDate: "22-11-1989", gender: "หญิง", bloodType: "B", treatment: "โรคหัวใจขาดเลือด" },
  ];

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[900px] max-h-[80vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-4">รายการผู้ป่วยที่ไม่มีเตียง</h2>

        {/* ค้นหาผู้ป่วย */}
        <input
          type="text"
          placeholder="ค้นหาชื่อผู้ป่วย"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 text-lg"
        />

        {/* ตารางรายชื่อผู้ป่วย */}
        <div className="overflow-auto max-h-[50vh]">
          <table className="w-full border-collapse border border-gray-300 text-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-3">รหัสผู้ป่วย</th>
                <th className="border p-3">ชื่อ-นามสกุล</th>
                <th className="border p-3">อายุ</th>
                <th className="border p-3">หมู่เลือด</th>
                <th className="border p-3">การรักษา</th>
                <th className="border p-3">ดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-100">
                  <td className="border p-3">{patient.id}</td>
                  <td className="border p-3">{patient.name}</td>
                  <td className="border p-3 text-center">{patient.age}</td>
                  <td className="border p-3 text-center">{patient.bloodType}</td>
                  <td className="border p-3">{patient.treatment}</td>
                  <td className="border p-3 text-center">
                    <button className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892]">
                      เลือก
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ปุ่มยกเลิก */}
        <div className="mt-6 flex justify-end">
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
