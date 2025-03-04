import React from "react";
import { Bed } from "../../types/bed";
import SensorCard from "./SensorCard";

interface Props {
  bed: Bed;
}

const BedCard: React.FC<Props> = ({ bed }) => {
  return (
    <div className="grid grid-cols-6 rounded-lg m-1 p-2 bg-gray-200">
      <div className="col-span-4 border border-gray-300 rounded-lg p-4 m-2 w-72 flex flex-col items-center bg-white">
        {/* แถวที่ 1: ห้อง + เตียง + ไอคอน */}
        <div className="flex justify-between w-full items-center">
          <p>
            <strong></strong> {bed.room.room_name} {bed.bed_name}
          </p>
          <div className="flex gap-2 cursor-pointer">
            <span title="settingNoti">⋮</span>
            <span title="config">⚙️</span>
          </div>
        </div>

        {/* แถวที่ 2: ไอคอนเตียง */}
        <div className="text-8xl my-8">🛏️</div>

        {/* แถวที่ 3: ชื่อผู้ป่วย */}
        <p className="text-lg">
          <strong></strong> {bed.patient?.patient_name}
        </p>
      </div>
      <div className="col-span-2 flex flex-col justify-between items-center gap-2 pl-2">
        <SensorCard sensorList={bed.sensors}></SensorCard>
        <SensorCard sensorList={bed.sensors}></SensorCard>
        <SensorCard sensorList={bed.sensors}></SensorCard>
      </div>
    </div>
  );
};

export default BedCard;
