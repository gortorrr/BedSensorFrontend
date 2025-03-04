import React, { useEffect, useState } from "react";
import { Sensor } from "../../types/sensor";
import SensorListDialog from "./sensorListDialog";

interface Props {
  sensor?: Sensor;
  sensorList: Sensor[];
}

const SensorCard: React.FC<Props> = ({ sensor, sensorList }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | undefined>(
    sensor
  );
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setSelectedSensor(sensor);
  }, [sensor]);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleSensorSelect = (sensor: Sensor) => {
    setSelectedSensor(sensor);
    setIsDialogOpen(false);
  };

  const handleRemoveSensor = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSensor(undefined);
  };

  return (
    <div
      className="relative border-2 border-gray-300 rounded-lg w-full h-1/3 bg-[#B7D6DE] p-1 transition-all duration-200"
      onClick={toggleDialog}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && selectedSensor && (
        <button
          className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md hover:bg-red-700 transition-all duration-150"
          onClick={handleRemoveSensor}
        >
          ×
        </button>
      )}
      {selectedSensor ? (
        <>
          <p className="font-normal">{selectedSensor.sensor_type}</p>
          <div className="flex items-center gap-5 pl-1">
            <img alt="" className="w-5 h-5" />
            <h5 className="text-xl font-bold text-center m-0">
              {selectedSensor.history_value_sensor?.slice(-1)[0]
                ?.history_value_sensor_value || "-"}
            </h5>
            <p className="font-normal text-right">%</p>
          </div>
          <div className="flex justify-center">
            <img src="/src/assets/rate2.png" alt="" className="w-14 h-7" />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center cursor-pointer pt-5">
          <span className="text-4xl text-gray-500">➕</span>
        </div>
      )}
      {isDialogOpen && (
        <SensorListDialog
          onClose={toggleDialog}
          sensorList={sensorList}
          onSelect={handleSensorSelect}
        />
      )}
    </div>
  );
};

export default SensorCard;
