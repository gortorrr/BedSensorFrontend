import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiMagnify, mdiPlus } from "@mdi/js";
import { Bed } from "../../types/bed";

const BedManagement: React.FC = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // mock data
  const bedData: Bed[] = [
    {
      bed_id: 1,
      bed_name: "5",
      bed_activated: true,
      room: {
        room_id: 1,
        room_name: "1610",
        floor: {
          floor_id: 1,
          floor_name: "1",
          building: {
            building_id: 1,
            building_name: "อาคารผู้ป่วยใน",
          },
        },
      },
      sensors: [],
    },
    {
      bed_id: 2,
      bed_name: "2",
      bed_activated: true,
      room: {
        room_id: 2,
        room_name: "1605",
        floor: {
          floor_id: 1,
          floor_name: "1",
          building: {
            building_id: 1,
            building_name: "อาคารผู้ป่วยใน",
          },
        },
      },
      sensors: [],
    },
    {
      bed_id: 3,
      bed_name: "4",
      bed_activated: false,
      room: {
        room_id: 3,
        room_name: "1606",
        floor: {
          floor_id: 1,
          floor_name: "1",
          building: {
            building_id: 1,
            building_name: "อาคารผู้ป่วยใน",
          },
        },
      },
      sensors: [],
    },
    {
      bed_id: 4,
      bed_name: "7",
      bed_activated: true,
      room: {
        room_id: 4,
        room_name: "1606",
        floor: {
          floor_id: 1,
          floor_name: "1",
          building: {
            building_id: 1,
            building_name: "อาคารผู้ป่วยใน",
          },
        },
      },
      sensors: [],
    },
    {
      bed_id: 5,
      bed_name: "10",
      bed_activated: true,
      room: {
        room_id: 5,
        room_name: "1607",
        floor: {
          floor_id: 1,
          floor_name: "1",
          building: {
            building_id: 1,
            building_name: "อาคารผู้ป่วยใน",
          },
        },
      },
      sensors: [],
    },
  ];

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

        <button className="flex items-center gap-2 px-4 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] drop-shadow-md cursor-pointer">
          <Icon path={mdiPlus} size={1} />
          <span>เพิ่มเตียง</span>
        </button>
      </div>

      <table className="w-full border-collapse shadow-md">
        <thead className="bg-[#B7D6DE] h-16 font-bold text-center">
          <tr>
            <th className="p-2">ลำดับ</th>
            <th className="p-2">ชื่ออาคาร</th>
            <th className="p-2">ชั้น</th>
            <th className="p-2">ห้อง</th>
            <th className="p-2">ชื่อเตียง</th>
            <th className="p-2">สถานะการใช้งาน</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBeds.map((b, index) => (
            <tr key={b.bed_id} className="text-center bg-white even:bg-[#edf3f6]">
              <td className="p-2">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="p-2">{b.room.floor.building.building_name}</td>
              <td className="p-2">{b.room.floor.floor_name}</td>
              <td className="p-2">{b.room.room_name}</td>
              <td className="p-2">{b.bed_name}</td>
              <td
                className={`p-2 h-16 font-semibold ${
                  b.bed_activated ? "text-green-600" : "text-red-600"
                }`}
              >
                {b.bed_activated ? "Active" : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => changePage(1)}
            className="px-3 py-1 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892]"
            disabled={currentPage === 1}
          >
            &laquo; หน้าแรก
          </button>

          {getPageNumbers().map((pageNum) => (
            <button
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
            onClick={() => changePage(totalPages)}
            className="px-3 py-1 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892]"
            disabled={currentPage === totalPages}
          >
            หน้าสุดท้าย &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default BedManagement;
