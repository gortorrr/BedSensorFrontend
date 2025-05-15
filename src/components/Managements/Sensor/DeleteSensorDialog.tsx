import React, { useEffect, useState } from "react";
import { Sensor } from "../../../types/sensor";
import { useSensorStore } from "../../../store/sensorStore";

interface DeleteSensorDialogProps {
  isOpen: boolean;
  //onConfirm: () => void;
  onCancel: () => void;
  initialSensorData: Sensor;
}

const DeleteSensorDialog: React.FC<DeleteSensorDialogProps> = ({
  isOpen,
  onCancel,
  initialSensorData,
}) => {
  const sensorStore = useSensorStore();
  const [sensorData, setSensorData] = useState<Sensor>(initialSensorData);
  useEffect(() => {
    if (isOpen) {
      setSensorData(initialSensorData);
    }
    console.log(initialSensorData);
  }, [isOpen]);

  const handleCancel = () => {
    const clearSensorData: Sensor = {
      sensor_id: 0,
      sensor_type: "",
      sensor_status: false,
      history_value_sensor: [],
    };
    setSensorData(clearSensorData);
    onCancel();
  };
  const saveDeleteSensor = () => {
    if (initialSensorData.sensor_id > 0) {
      sensorStore.deleteSensor(sensorData.sensor_id);
      handleCancel();
      window.location.reload();
    } else {
      console.log(initialSensorData.sensor_id);
      console.log("สำหรับ saveDeleteSensor");
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-0 flex justify-center items-center z-50 transition-transform bg-transparent backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 shadow-xl w-80 text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          ยืนยันการลบข้อมูล
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          คุณต้องการลบเซ็นเซอร์นี้หรือไม่?
        </p>
        <div className="flex justify-around">
          <button
            onClick={saveDeleteSensor}
            className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] cursor-pointer"
          >
            ยืนยัน
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 cursor-pointer"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSensorDialog;
