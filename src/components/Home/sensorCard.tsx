// src/components/SensorCard.tsx
import React, { useState } from "react";
import { Sensor } from "../../types/sensor";
import SensorListDialog from "./sensorListDialog";

interface Props {
  sensor?: Sensor;
  sensorList: Sensor[];
}

const SensorCard: React.FC<Props> = ({ sensor, sensorList }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  if (!sensor) {
    return (
      <div
        className="border-2 border-gray-300 rounded-lg w-full h-1/3 bg-[#B7D6DE] p-1 flex items-center justify-center cursor-pointer"
        onClick={toggleDialog}
      >
        <span className="text-4xl text-gray-500">➕</span>
        {isDialogOpen && (
          <SensorListDialog onClose={toggleDialog} sensorList={sensorList} />
        )}
      </div>
    );
  }

  return (
    <div className="border-2 border-gray-300 rounded-lg w-full h-1/3 bg-[#B7D6DE] p-1">
      <p className="font-normal">{sensor.sensor_type}</p>
      <div className="flex items-center gap-5 pl-1">
        <img alt="" className="w-5 h-5" />
        <h5 className="text-xl font-bold text-center m-0">
          {sensor.history_value_sensor?.slice(-1)[0]
            ?.history_value_sensor_value || ""}
        </h5>
        <p className="font-normal text-right">%</p>
      </div>
      <div className="flex justify-center">
        <img src="/src/assets/rate2.png" alt="" className="w-14 h-7" />
      </div>
      {isDialogOpen && (
        <SensorListDialog onClose={toggleDialog} sensorList={sensorList} />
      )}
    </div>
  );
};

export default SensorCard;
