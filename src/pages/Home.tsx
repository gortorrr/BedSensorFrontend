import React, { useEffect, useState } from "react";
//import { useBedStore } from "../store/bedStore";
import BedCard from "../components/bedCard";
import { useBedStore } from "../store/bedStore";
import Icon from "@mdi/react";
import { mdiMagnify, mdiPlus } from "@mdi/js";

const Home: React.FC = () => {
  const { beds, loadBeds } = useBedStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBeds();
  }, [loadBeds]);

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-[#2E5361] text-4xl font-bold mb-4 pl-4">
        รายการเตียงผู้ป่วย
      </h2>
      <div className="flex space-x-4 justify-between mb-4">
        <input
          type="text"
          placeholder="ค้นหาชื่อผู้ป่วย"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered border-2 border-solid border-gray-400 rounded-lg p-1.5 bg-white flex-auto cursor-pointer"
        />
        <button className="flex items-center gap-2 px-4 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892]">
          <Icon path={mdiMagnify} size={1} />
          <span>ค้นหา</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892]">
          <Icon path={mdiPlus} size={1} />
          <span>เพิ่มผู้ป่วย</span>
        </button>
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap" }}
        className="justify-stretch p-4 gap-3"
      >
        {beds
          .filter((bed) => bed.bed_activated) //แสดงเฉพาะเตียงที่ใช้งานอยู่
          .map((bed) => (
            <BedCard key={bed.bed_name} bed={bed} />
          ))}
      </div>
    </div>
  );
};

export default Home;


