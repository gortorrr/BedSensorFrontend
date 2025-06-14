import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import { Bed } from "../../types/bed";
import DeleteBedDialog from "../../components/Managements/Bed/DeleteBedDialog";
import { useBedStore } from "../../store/bedStore";
import BedDialog from "../../components/Managements/Bed/BedDialog";

const BedManagement: React.FC = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBedId, setSelectedBedId] = useState<number | null>(null);
  const bedStore = useBedStore();
  // mock data
  const [bedData, setBedData] = useState<Bed[]>([]);
  useEffect(() => {
    const fetchAllData = async () => {
      const resBeds = await bedStore.getBeds();
      setBedData(resBeds);
    };
    fetchAllData();
  }, []);
  const openDeleteDialog = (bedId: number) => {
    setSelectedBedId(bedId);
    setIsDeleteDialogOpen(true);
  };

  const openEditDialog = (bed: Bed) => {
    setSelectedBed(bed);
    setIsEditDialogOpen(true);
  };

  const openAddDialog = () => {
    setSelectedBed({
      bed_id: 0,
      bed_name: "",
      bed_activated: false,
      room: {
        room_id: 0,
        room_name: "",
        floor: {
          floor_id: 0,
          floor_name: "",
          building: {
            building_id: 0,
            building_name: "",
          },
        },
      },
      sensors: [], // ✅ ต้องใส่ตาม interface
      patient: undefined,
      patient_id: undefined,
      selectedShowSensorId: [], // ถ้ามีใช้ใน UI
    });
    setIsEditDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    bedStore.deleteBed(selectedBedId ?? 0);
    setIsDeleteDialogOpen(false);
    setSelectedBedId(null);
    window.location.reload();
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setSelectedBedId(null);
  };

  const filteredBeds = bedData.filter((b) => {
    const query = search.toLowerCase();
    return (
      b.room.room_name.toLowerCase().includes(query) ||
      b.room.floor.building.building_name.toLowerCase().includes(query) ||
      b.bed_name.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredBeds.length / itemsPerPage);

  const paginatedBeds = filteredBeds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
        <h1 className="text-3xl font-bold text-[#2E5361]">
          จัดการสถานที่เตียงผู้ป่วย
        </h1>
      </div>

      <div className="flex space-x-4 justify-between mb-8">
        <div className="relative flex-auto">
          <input
            id="searchBed"
            type="text"
            placeholder="ค้นหาเตียงผู้ป่วย"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // รีเซ็ตเมื่อมีการค้นหาใหม่
            }}
            className="input input-bordered border-2 border-gray-400 rounded-lg p-2 pr-10 bg-white w-full inset-shadow"
          />
          <Icon
            path={mdiMagnify}
            size={1}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        <button
          id="btnAddBed"
          onClick={openAddDialog}
          className="flex items-center gap-2 px-4 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] drop-shadow-md cursor-pointer transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
        >
          {/* <Icon path={mdiPlus} size={1} /> */}
          <img
            src="/src/assets/btnManagement/AddBed.png"
            alt="abbBed"
            className="w-7"
          />
          <span>เพิ่มเตียงใหม่</span>
        </button>
      </div>

      <table className="w-full border-collapse shadow-md">
        <thead className="bg-[#B7D6DE] h-16 font-bold text-center">
          <tr>
            <th className="p-2">ลำดับ</th>
            <th className="p-2">อาคาร</th>
            <th className="p-2">ชั้น</th>
            <th className="p-2 pl-12">ห้อง</th>
            <th className="p-2">หมายเลขเตียง</th>
            <th className="p-2 text-center">สถานะ</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedBeds.map((b, index) => (
            <tr
              key={b.bed_id}
              className="text-center bg-gradient-to-r from-white via-gray-100 to-white shadow-md even:bg-gradient-to-r even:from-[#A1B5BC] even:via-[#D1DFE5] even:to-[#e4ecef]"
            >
              <td className="p-2 h-16 py-4 text-center">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="p-2 h-16 py-4 text-center">
                {b.room.floor.building.building_name}
              </td>
              <td className="p-2 h-16 py-4 text-center">
                {b.room.floor.floor_name}
              </td>
              <td className="p-2 h-16 py-4 pl-12 text-center">
                {b.room.room_name}
              </td>
              <td className="p-2 h-16 py-4 text-center">{b.bed_name}</td>
              <td
                className={`p-2 h-16 py-4 text-center font-semibold ${
                  b.bed_activated ? "text-green-600" : "text-red-600"
                }`}
              >
                {b.bed_activated ? "Active" : "Inactive"}
              </td>

              <td className="p-2 h-16 py-4 pr-7 flex justify-end gap-2 text-right">
                <button
                  id="edit"
                  onClick={() => openEditDialog(b)}
                  className="mx-1 cursor-pointer w-7 h-7 transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
                >
                  <img src="/src/assets/edit.png" alt="edit" />
                </button>
                <button
                  id="delete"
                  onClick={() => openDeleteDialog(b.bed_id)}
                  className="mx-1 cursor-pointer w-7 h-7 transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
                >
                  <img src="/src/assets/delete.png" alt="delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-end mt-6">
        <div className="flex items-center gap-2">
          <button
            id="currentPage"
            onClick={() => changePage(1)}
            className="px-3 py-1 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] cursor-pointer"
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
            className="px-3 py-1 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] cursor-pointer"
            disabled={currentPage === totalPages}
          >
            หน้าสุดท้าย &raquo;
          </button>
        </div>
        <DeleteBedDialog
          isOpen={isDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
        {selectedBed && (
          <BedDialog
            isOpen={isEditDialogOpen}
            onClose={() => {
              setIsEditDialogOpen(false);
              setSelectedBed(null);
            }}
            initialBedData={selectedBed}
          />
        )}
      </div>
    </div>
  );
};

export default BedManagement;
