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

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-[#2E5361] text-4xl font-bold mb-4 pl-4">
        รายการเตียงผู้ป่วย
      </h2>
      <div className="flex space-x-4 justify-between mb-4">
        {/* ช่องค้นหา + ไอคอนค้นหา */}
        <div className="relative flex-auto">
          <input
            type="text"
            placeholder="ค้นหาชื่อผู้ป่วย"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered border-2 border-solid border-gray-400 rounded-lg p-2 pr-10 bg-white w-full"
          />
          <Icon
            path={mdiMagnify}
            size={1}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#5E8892] text-white rounded-xl hover:bg-[#95BAC3]">
          <Icon path={mdiPlus} size={1} />
          <span>เพิ่มผู้ป่วย</span>
        </button>
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap" }}
        className="justify-stretch p-4 gap-3"
      >
        {filteredBeds.map((bed) => (
          <BedCard key={bed.bed_name} bed={bed} />
        ))}
      </div>
    </div>
  );
};

export default Home;
