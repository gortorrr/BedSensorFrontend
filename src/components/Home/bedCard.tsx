import React, { useEffect, useState } from "react";
import { Bed } from "../../types/bed";
import SensorCard from "./sensorCard";
import { Sensor } from "../../types/sensor";
import { useNavigate } from "react-router-dom";
import BedIcon from "./BedIcon";
import { HiDotsHorizontal } from "react-icons/hi";

interface Props {
  bed: Bed;
}

const BedCard: React.FC<Props> = ({ bed }) => {
  const navigate = useNavigate();

  const goToSettingNoti = () => {
    // console.log("Navigating to SettingNoti with bed_id:", bed.bed_id);
    navigate(`/setting-noti/${bed.bed_id}`);
  };

  const configBedById = () => {
    // console.log("Navigating to bed config with bed_id:", bed.bed_id); // Log ค่าก่อน navigate
    navigate(`/bed-config/${bed.bed_id}`); // ใช้ backticks และ template literals
  };
  const [showSensorSet, setShowSensorSet] = useState<Sensor[]>([]);

  // ฟังก์ชันที่ใช้ในการส่งเซ็นเซอร์ไปที่ showSensorSet
  const updateShowSensorSet = (sensor: Sensor) => {
    setShowSensorSet((prevState) => {
      const exists = prevState.some(
        (s) => s.sensor_type === sensor.sensor_type
      );

      if (exists) {
        // ถ้ามีอยู่แล้ว -> ให้ลบออก
        return prevState.filter((s) => s.sensor_type !== sensor.sensor_type);
      } else {
        // ถ้ายังไม่มี -> ให้เพิ่มเข้าไป
        return [...prevState, sensor];
      }
    });

    // console.log(exists ? "Removed sensor from showSensorSet:" : "Added sensor to showSensorSet:", sensor);
  };

  const getFilteredSensorList = () => {
    return bed.sensors.filter(
      (sensor) =>
        !showSensorSet.some(
          (selectedSensor) => selectedSensor.sensor_type === sensor.sensor_type
        )
    );
  };

  useEffect(() => {
    if (bed.selectedShowSensorId && bed.selectedShowSensorId.length > 0) {
      const filteredSensors = bed.sensors.filter((sensor) =>
        bed.selectedShowSensorId?.includes(sensor.sensor_id ?? 0)
      );
      setShowSensorSet(filteredSensors);
    }
  }, [bed.selectedShowSensorId, bed.sensors]);

  return (
    <div
      id="bedCard"
      className="grid grid-cols-6 rounded-lg m-1 p-2 bg-gray-200"
    >
      <div className="col-span-4 border border-black rounded-lg p-4  w-72 h-[300px] flex flex-col items-center bg-white overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {/* แถวที่ 1: ห้อง + เตียง + ไอคอน */}
        <div className="flex justify-between w-full items-center">
          <p
            id="bedName"
            className="text-lg px-2 bg-[#B7D6DE] rounded-full drop-shadow-md"
          >
            <strong></strong> {bed.room.room_name} {bed.bed_name}
          </p>
          <div className="flex gap-1 cursor-pointer justify-end">
            <HiDotsHorizontal
              title="settingNoti"
              onClick={goToSettingNoti}
              size={20}
              id="settingNoti"
            />
            {/* <span title="settingNoti" onClick={goToSettingNoti}>
              ⋮
            </span> */}
            <span
              title="config"
              onClick={configBedById}
              className="text-xl justify-end"
              id="configBed"
            >
              ⚙️
            </span>
          </div>
        </div>
        {/* แสดงค่าจากเซ็นเซอร์เตียง */}
        {!bed.patient ? (
          <div className=" my-3 text-red-500" id="noPatient">
            ไม่มีผู้ป่วย
          </div>
        ) : (
          <>
            {bed.sensors
              ?.filter((sensor) => sensor.sensor_type === "bed_sensor")
              .map((bedsensor, index) => (
                <div key={index} className=" my-3 " id="bedSensor">
                  {bedsensor.history_value_sensor.slice(-1)[0]
                    ?.history_value_sensor_value ?? 0}
                </div>
              ))}
          </>
        )}

        {/* แถวที่ 2: ไอคอนเตียง */}
        <BedIcon
          bedsensors={bed.sensors?.filter(
            (sensor) => sensor.sensor_type === "bed_sensor"
          )}
          patient={bed.patient}
          addPatient={configBedById}
        />
        {/* แถวที่ 3: ชื่อผู้ป่วย */}
        <p id="patientName" className="text-lg mt-auto">
          <strong></strong> {bed.patient?.patient_name}
        </p>
      </div>
      <div
        id="sensorSection"
        className="col-span-2 flex flex-col justify-start items-center gap-2 pl-2 max-h-[300px] overflow-y-auto"
      >
        {/* Render SensorCards conditionally */}
        {showSensorSet.length > 0 ? (
          <SensorCard
            sensor={showSensorSet[0]} // ส่งข้อมูลจาก showSensorSet แทน
            sensorList={getFilteredSensorList()} // ใช้แค่ค่าใน showSensorSet
            updateSensorSet={updateShowSensorSet}
            patient={bed.patient}
            bed_id={bed.bed_id}
          />
        ) : (
          <SensorCard
            sensorList={getFilteredSensorList()}
            updateSensorSet={updateShowSensorSet}
            patient={bed.patient}
            bed_id={bed.bed_id}
          />
        )}
        {showSensorSet.length > 1 ? (
          <SensorCard
            sensor={showSensorSet[1]} // ส่งข้อมูลจาก showSensorSet แทน
            sensorList={getFilteredSensorList()} // ใช้แค่ค่าใน showSensorSet
            updateSensorSet={updateShowSensorSet}
            patient={bed.patient}
            bed_id={bed.bed_id}
          />
        ) : (
          <SensorCard
            sensorList={getFilteredSensorList()}
            updateSensorSet={updateShowSensorSet}
            patient={bed.patient}
            bed_id={bed.bed_id}
          />
        )}
        {showSensorSet.length > 2 ? (
          <SensorCard
            sensor={showSensorSet[2]} // ส่งข้อมูลจาก showSensorSet แทน
            sensorList={getFilteredSensorList()} // ใช้แค่ค่าใน showSensorSet
            updateSensorSet={updateShowSensorSet}
            patient={bed.patient}
            bed_id={bed.bed_id}
          />
        ) : (
          <SensorCard
            sensorList={getFilteredSensorList()}
            updateSensorSet={updateShowSensorSet}
            patient={bed.patient}
            bed_id={bed.bed_id}
          />
        )}
      </div>
    </div>
  );
};

export default BedCard;
