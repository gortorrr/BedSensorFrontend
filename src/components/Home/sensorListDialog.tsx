import React from "react";
import { Sensor } from "../../types/sensor";

interface Props {
  sensorList: Sensor[];
  onClose: () => void;
}

const SensorListDialog: React.FC<Props> = ({ onClose, sensorList }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4">Sensor List</h2>
        <ul>
          {sensorList.map((sensor, index) => (
            <li key={index} className="border-b py-2">
              {sensor.sensor_type}
            </li>
          ))}
        </ul>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SensorListDialog;
