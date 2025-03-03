import React from "react";
import { Bed } from "../types/bed";

interface Props {
  bed: Bed;
}

const BedCard: React.FC<Props> = ({ bed }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/*แถวที่ 1: ห้อง + เตียง + ไอคอน */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <p>
          <strong></strong> {bed.room.room_name} {bed.bed_name}
        </p>
        <div className="flex gap-2 cursor-pointer justify-items-end">
          <span title="settingNoti">⋮</span>
          <span title="config">⚙️</span>
        </div>
      </div>

      {/* แถวที่ 2: ไอคอนเตียง */}
      <div style={{ fontSize: "80px", margin: "30px 0" }}>
        🛏️ 
      </div>

      {/* แถวที่ 3: ชื่อผู้ป่วย */}
      <p className="text-lg ">
        <strong></strong> {bed.patient?.patient_name}
      </p>
    </div>
  );
};

export default BedCard;
