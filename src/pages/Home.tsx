import React, { useEffect, useState } from "react";
//import { useBedStore } from "../store/bedStore";
import BedCard from "../components/Home/bedCard";
import { useBedStore } from "../store/bedStore";
import Icon from "@mdi/react";
import { mdiMagnify, mdiPlus } from "@mdi/js";
import { Bed } from "../types/bed";

const Home: React.FC = () => {
  const { beds, loadBeds } = useBedStore();
  const [search, setSearch] = useState("");
  const [isClicked, setIsClicked] = useState(false); // State สำหรับจัดการการคลิกปุ่ม

  useEffect(() => {
    loadBeds();
  }, [loadBeds]);

  const filteredBeds: Bed[] = beds.filter(
    (bed: Bed) =>
      bed.bed_activated &&
      (!search ||
        (bed.patient?.patient_name?.toLowerCase() || "").includes(
          search.toLowerCase()
        ))  
  );

  const handleAddPatientClick = () => {
    setIsClicked(true); // เมื่อคลิกให้ตั้งค่า isClicked เป็น true
    // รีเซ็ตการคลิกหลังจากอนิเมชันเสร็จ
    setTimeout(() => {
      setIsClicked(false); // รีเซ็ต state หลังจาก 1 วินาที
    }, 300);
  };
  
  return (
    <div style={{ padding: "20px" , backgroundColor: "#e7f0f3" }}>
      <h2 className="text-[#2E5361] text-5xl font-bold mb-4 pl-4 py-2">
        รายการเตียงผู้ป่วย
      </h2>
      <div className="flex space-x-4 justify-between mb-4">
        {/* ช่องค้นหา + ไอคอนค้นหา */}
        <div className="relative flex-auto pl-4">
          <input
            type="text"
            placeholder="ค้นหาชื่อผู้ป่วย"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered border-2 border-solid border-gray-400 rounded-lg p-2 pr-10 bg-white w-full drop-shadow-md"
          />
          <Icon
            path={mdiMagnify}
            size={1}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        <button
          className={`flex items-center gap-2 px-4 py-2 bg-[#5E8892] text-white rounded-xl hover:bg-[#95BAC3] cursor-pointer ${
            isClicked ? "animate-jump" : ""
          }`}
          onClick={handleAddPatientClick} // เรียกใช้ handleAddPatientClick เมื่อคลิก
        >
          <Icon path={mdiPlus} size={1} />
          <span>เพิ่มผู้ป่วย</span>
        </button>
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap" }}
        className="justify-stretch p-4 gap-3"
      >
        {filteredBeds.map((bed) => (
          <BedCard key={bed.bed_id} bed={bed} />
        ))}
      </div>
    </div>
  );
};

//   return (
//     <div className="overflow-x-auto">
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 px-4 py-2">ID</th>
//             <th className="border border-gray-300 px-4 py-2">ชื่อเตียง</th>
//             <th className="border border-gray-300 px-4 py-2">สถานะ</th>
//             <th className="border border-gray-300 px-4 py-2">ห้อง</th>
//             <th className="border border-gray-300 px-4 py-2">ผู้ป่วย</th>
//             <th className="border border-gray-300 px-4 py-2">จัดการ</th>
//           </tr>
//         </thead>
//         <tbody>
//           {beds.map((bed) => (
//             <tr key={bed.bed_id} className="hover:bg-gray-100">
//               <td className="border border-gray-300 px-4 py-2">{bed.bed_id}</td>
//               <td className="border border-gray-300 px-4 py-2">{bed.bed_name}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {bed.bed_activated ? "ใช้งานอยู่" : "ปิดใช้งาน"}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {bed.room?.room_name || "ไม่มีห้อง"}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {bed.patient?.patient_name || "ไม่มีผู้ป่วย"}
//               </td>
//               <td className="border border-gray-300 px-4 py-2 flex gap-2">
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

export default Home;
