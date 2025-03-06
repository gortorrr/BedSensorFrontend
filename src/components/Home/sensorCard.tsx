import React, { useEffect, useState } from "react";
import { Sensor } from "../../types/sensor";
import SensorListDialog from "./sensorListDialog";
import { IoCloseCircle } from "react-icons/io5";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Props {
  sensor?: Sensor;
  sensorList: Sensor[];
  updateSensorSet: (sensor: Sensor) => void; // รับฟังก์ชันจาก BedCard
}

const SensorCard: React.FC<Props> = ({ sensor, sensorList, updateSensorSet }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | undefined>(sensor);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setSelectedSensor(sensor);
    setIsHovered(false); // รีเซ็ตสถานะ hover เมื่อมีการเลือกเซ็นเซอร์ใหม่
  }, [sensor]);

  const toggleDialog = () => {
    if (selectedSensor) {
      console.log("ถ้ามีการเลือกเซ็นเซอร์อยู่แล้ว, ไม่ให้เปิด dialog")
      return;
    }

    console.log("เปิด dialog sensorlist");
    console.log(sensorList);
    setIsDialogOpen(!isDialogOpen);
  };

  const handleSensorSelect = (sensor: Sensor) => {
    setSelectedSensor(sensor);
    setIsHovered(false); // รีเซ็ตสถานะ hover เมื่อเลือกเซ็นเซอร์
    setIsDialogOpen(false);

    // เรียกฟังก์ชันจาก BedCard เพื่อเพิ่มเซ็นเซอร์ไปที่ showSensorSet
    updateSensorSet(sensor);
  };

  const handleRemoveSensor = (e: React.MouseEvent) => {
    e.stopPropagation(); // หยุดการทำงานของ onClick ที่ทำให้เกิด hover
    setSelectedSensor(undefined); // ลบเซ็นเซอร์ที่เลือก
    setIsHovered(false); // รีเซ็ตสถานะ hover เมื่อเลือกลบ
  };

  return (
    <div
      className="relative border-2 border-gray-300 rounded-lg w-full h-1/3 bg-[#B7D6DE] p-1 transition-all overflow-hidden duration-250 "
      onClick={toggleDialog}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && selectedSensor && (
        <button
          className="absolute top-1 right-1 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md hover:bg-red-700 transition-all duration-150 "
          onClick={handleRemoveSensor}
          aria-label="Remove Sensor"
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
        <div className="flex items-center justify-center cursor-pointer pt-6">
          {/* <span className="text-4xl text-gray-500">➕</span> */}
          <i className="bi bi-patch-plus-fill text-4xl text-[#2E5361]"></i>
          {/* <i className="bi bi-plus-circle-fill text-4xl text-[#2E5361]"></i> */}
        </div>
      )}
      {isDialogOpen && (
        <SensorListDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          sensorList={sensorList}
          onSelect={handleSensorSelect}
        />
      )}
    </div>
  );
};

export default SensorCard;
