// src/pages/PatientManagement.tsx
import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiMagnify, mdiPlus } from "@mdi/js";
import { Patient } from "../../types/patient";
import DeletePatientDialog from "../../components/Managements/Patient/DeletePatientDialog";
import PatientDialog from "../../components/Managements/Patient/PatientDialog";
import { usePatientStore } from "../../store/patientStore";

const mockPatients: Patient[] = [
  {
    patient_id: 1,
    patient_name: "สมชาย ใจดี",
    patient_age: 65,
    patient_gender: "ชาย",
    patient_dob: "1960-04-12",
    patient_disease: "เบาหวาน",
    patient_status: "รักษาอยู่",
    patient_date_in: "2025-05-01",
    patient_bloodtype: "O",
  },
  {
    patient_id: 2,
    patient_name: "มณี ศรีสวย",
    patient_age: 54,
    patient_gender: "หญิง",
    patient_dob: "1971-10-03",
    patient_disease: "ความดัน",
    patient_status: "พักฟื้น",
    patient_date_in: "2025-04-25",
    patient_bloodtype: "A",
  },
  {
    patient_id: 3,
    patient_name: "สมปอง แสนดี",
    patient_age: 70,
    patient_gender: "ชาย",
    patient_dob: "1955-06-20",
    patient_disease: "หัวใจ",
    patient_status: "รอดูอาการ",
    patient_date_in: "2025-05-10",
    patient_bloodtype: "B",
  },
];

const PatientManagement: React.FC = () => {
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient>({
    patient_id: 0,
    patient_name: "",
    patient_age: 0,
    patient_gender: "",
    patient_dob: "",
    patient_disease: "",
    patient_status: "",
    patient_date_in: "",
    patient_bloodtype: "",
  });

  const patientStore = usePatientStore();

  const filteredPatients = mockPatients.filter((p) =>
    p.patient_name.toLowerCase().includes(search.toLowerCase())
  );

  function openAddForm(): void {
    setSelectedPatient({
      patient_id: 0,
      patient_name: "",
      patient_age: 0,
      patient_gender: "",
      patient_dob: "",
      patient_disease: "",
      patient_status: "",
      patient_date_in: "",
      patient_bloodtype: "",
    });
    setIsFormOpen(true);
  }

  const openEditForm = (patient: Patient): void => {
    setSelectedPatient(patient);
    setIsFormOpen(true);
  };

  const [patientIdDeleteTarget, setPatientIdDeleteTarget] = useState<number>(0);
  const openDeleteDialog = (patient_id: number) => {
    setIsDeleteDialogOpen(true);
    setPatientIdDeleteTarget(patient_id);
  };
  const handleDeletePatient = (patient_id: number) => {
    patientStore.deletePatient(patient_id);
    setIsDeleteDialogOpen(false);
    window.location.reload();
  };

  // pagination state และ config
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // เปลี่ยนหน้าถัดไปหรือหน้าก่อนหน้า
  const changePage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // คำนวณ page numbers ที่จะแสดงแบบ dynamic 5 หน้า
  const getPageNumbers = (): number[] => {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);

    let startPage = currentPage - half;
    let endPage = currentPage + half;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(maxVisible, totalPages);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisible + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="p-6 bg-[#e7f0f3] min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-[#2E5361]">ข้อมูลผู้ป่วย</h1>
      </div>

      <div className="flex justify-between mb-6">
        <div className="relative flex-auto mr-4">
          <input
            id="searchPatient"
            type="text"
            placeholder="ค้นหาชื่อผู้ป่วย"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered border-2 border-gray-400 rounded-lg p-2 pr-10 bg-white w-full inset-shadow"
          />
          <Icon
            path={mdiMagnify}
            size={1}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        <PatientDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          initialPatientData={selectedPatient}
        />

        <button
          id="btnAddPatient"
          className="flex items-center gap-2 px-4 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] drop-shadow-md cursor-pointer"
          onClick={openAddForm}
        >
          <Icon path={mdiPlus} size={1} />
          <span>เพิ่มผู้ป่วย</span>
        </button>
      </div>

      <table className="w-full border-collapse shadow-md">
        <thead className="bg-[#B7D6DE] h-16 font-bold text-center">
          <tr>
            <th className="p-2">รหัสผู้ป่วย</th>
            <th className="p-2">ชื่อ-นามสกุล</th>
            <th className="p-2">อายุ</th>
            <th className="p-2">เพศ</th>
            <th className="p-2">หมู่เลือด</th>
            <th className="p-2">โรคประจำตัว</th>
            <th className="p-2">สถานะ</th>
            <th className="p-2">วันที่เข้าโรงพยาบาล</th>
            <th className="p-2">อาคาร</th>
            <th className="p-2">ห้อง</th>
            <th className="p-2">หมายเลขเตียง</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedPatients.map((p, index) => (
            <tr
              key={p.patient_id}
              className="text-center bg-gradient-to-r from-white via-gray-100 to-white shadow-md even:bg-gradient-to-r even:from-[#A1B5BC] even:via-[#D1DFE5] even:to-[#e4ecef]"
            >
              <td className="p-2 h-16 py-4 text-center">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="p-2 h-16">{p.patient_name}</td>
              <td className="p-2 h-16">{p.patient_age}</td>
              <td className="p-2 h-16">{p.patient_gender}</td>
              <td className="p-2 h-16">{p.patient_bloodtype}</td>
              <td className="p-2 h-16">{p.patient_disease}</td>
              <td className="p-2 h-16">{p.patient_status}</td>
              <td className="p-2 h-16">{p.patient_date_in}</td>
              <td className="p-2 h-16">{}</td>
              <td className="p-2 h-16">{}</td>
              <td className="p-2 h-16">{}</td>
              <td className="flex justify-center gap-2">
                <td className="p-2 h-16 py-4 text-center">
                  <button id="detail" className="mx-1 cursor-pointer text-xl">
                    📄
                  </button>
                  <button
                    id="edit"
                    onClick={() => openEditForm(p)}
                    className="mx-1 cursor-pointer text-xl"
                  >
                    🖊️
                  </button>
                  <button
                    id="delete"
                    onClick={() => openDeleteDialog(p.patient_id ?? 0)}
                    className="mx-1 cursor-pointer text-xl"
                  >
                    🗑️
                  </button>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination แบบ dynamic */}
      <div className="flex justify-end mt-6">
        <div className="flex items-center gap-2">
          <button
            id="currentPage"
            onClick={() => changePage(1)}
            className="px-3 py-1 bg-[#95BAC3] rounded-xl hover:bg-[#5E8892] text-white cursor-pointer"
            disabled={currentPage === 1}
          >
            &laquo; หน้าแรก
          </button>

          {getPageNumbers().map((pageNum) => (
            <button
              id="pageNum"
              key={pageNum}
              onClick={() => changePage(pageNum)}
              className={`px-3 py-1 rounded-xl cursor-pointer ${
                currentPage === pageNum
                  ? "bg-[#5E8892] text-white shadow-lg"
                  : "bg-white text-black inset-shadow"
              } hover:bg-[#5E8892]`}
            >
              {pageNum}
            </button>
          ))}

          <button
            id="lastPage"
            onClick={() => changePage(totalPages)}
            className="px-3 py-1 bg-[#95BAC3] rounded-xl hover:bg-[#5E8892] text-white cursor-pointer"
            disabled={currentPage === totalPages}
          >
            หน้าสุดท้าย &raquo;
          </button>
        </div>
      </div>

      <DeletePatientDialog
        isOpen={isDeleteDialogOpen}
        onCancel={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => handleDeletePatient(patientIdDeleteTarget)}
      />
    </div>
  );
};

export default PatientManagement;
