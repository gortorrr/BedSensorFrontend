import React, { useEffect, useState } from "react";
import { Bed } from "../../types/bed";
import SensorCard from "./sensorCard";
import { Sensor } from "../../types/sensor";
import { useNavigate } from "react-router-dom";

interface Props {
  bed: Bed;
}

const BedCard: React.FC<Props> = ({ bed }) => {
  const navigate = useNavigate();

  const configBedById = () => {
    navigate(`/bed-config/${bed.bed_id}`); // ใช้ backticks และ template literals
  };
  const [showSensorSet, setShowSensorSet] = useState<Sensor[]>([]);

  useEffect(() => {
    if (bed.selectedShowSensorId && bed.selectedShowSensorId.length > 0) {
      const filteredSensors = bed.sensors.filter((sensor) =>
        bed.selectedShowSensorId?.includes(sensor.sensor_id ?? 0)
      );
      setShowSensorSet(filteredSensors);
    }
  }, [bed.selectedShowSensorId, bed.sensors]);

  return (
    <div className="grid grid-cols-6 rounded-lg m-1 p-2 bg-gray-200 ">
      <div className="col-span-4 border border-gray-300 rounded-lg p-4 m-2 w-72 flex flex-col items-center bg-white">
        {/* แถวที่ 1: ห้อง + เตียง + ไอคอน */}
        <div className="flex justify-between w-full items-center">
          <p>
            <strong></strong> {bed.room.room_name} {bed.bed_name}
          </p>
          <div className="flex gap-2 cursor-pointer">
            <span title="settingNoti">⋮</span>
            <span title="config" onClick={configBedById}>
              ⚙️
            </span>
          </div>
        </div>
        {/*แสดงค่าจากเซ็นเซอร์เตียง */}
        {bed.sensors
          ?.filter((sensor) => sensor.sensor_type === "bed_sensor")
          ?.map((bedsensor, index) => (
            <div key={index} className="text=xl my-6 mt-0">
              {bedsensor.history_value_sensor.slice(-1)[0]
                ?.history_value_sensor_value ?? 0}
            </div>
          ))}

        {/* แถวที่ 2: ไอคอนเตียง */}
        <div className="text-8xl my-8">🛏️</div>

        {/* แถวที่ 3: ชื่อผู้ป่วย */}
        <p className="text-lg">
          <strong></strong> {bed.patient?.patient_name}
        </p>
      </div>
      <div className="col-span-2 flex flex-col justify-start items-center gap-2 pl-2 max-h-[300px] overflow-y-auto">
      {/* Render SensorCards conditionally */}
        {showSensorSet.length > 0 ? (
          <SensorCard sensorList={bed.sensors} sensor={showSensorSet[0]} />
        ) : (
          <SensorCard sensorList={bed.sensors} />
        )}
        {showSensorSet.length > 1 ? (
          <SensorCard sensorList={bed.sensors} sensor={showSensorSet[1]} />
        ) : (
          <SensorCard sensorList={bed.sensors} />
        )}
        {showSensorSet.length > 2 ? (
          <SensorCard sensorList={bed.sensors} sensor={showSensorSet[2]} />
        ) : (
          <SensorCard sensorList={bed.sensors} />
        )}
      </div>
    </div>
  );
};

export default BedCard;
