import React, { useEffect, useState } from "react";
import { Sensor } from "../../types/sensor";
import SensorListDialog from "./sensorListDialog";
import { IoCloseCircle } from "react-icons/io5";

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
    setIsHovered(false); // รีเซ็ตสถานะ hover เมื่อมีการเลือกเซ็นเซอร์ใหม่
  }, [sensor]);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleSensorSelect = (sensor: Sensor) => {
    setSelectedSensor(sensor);
    setIsHovered(false); // รีเซ็ตสถานะ hover เมื่อเลือกเซ็นเซอร์
    setIsDialogOpen(false);
  };

  const handleRemoveSensor = (e: React.MouseEvent) => {
    e.stopPropagation(); // หยุดการทำงานของ onClick ที่ทำให้เกิด hover
    setSelectedSensor(undefined);
    setIsHovered(false); // รีเซ็ตสถานะ hover เมื่อเลือกลบ
  };

  return (
    <div
      className="relative border-2 border-gray-300 rounded-lg w-full h-1/3 bg-[#B7D6DE] p-1 transition-all duration-200 overflow-hidden"
      onClick={toggleDialog}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && selectedSensor && (
        <button
          className="absolute top-1 right-1 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md hover:bg-red-700 transition-all duration-150"
          onClick={handleRemoveSensor}
        >
          <IoCloseCircle />
        </button>
      )}
      {selectedSensor ? (
        <>
          <p className="font-normal">{selectedSensor.sensor_type}</p>
          <div className="flex items-center justify-between pl-1 pr-4 ">
            <img src="/src/assets/heart.png" alt="" className="w-7 h-7" />
            <div className="relative  w-full h-1/3 p-1">
              <h5 className="text-2xl font-bold text-center m-0">
                  {selectedSensor.history_value_sensor?.slice(-1)[0]
                    ?.history_value_sensor_value || "-"}
                </h5>
            </div>
            <p className="font-normal text-right">%</p>
          </div>
          <div className="flex justify-center -mt-2">
            <img src="/src/assets/rate2.png" alt="" className="w-16 h-9" />
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
