import React, { useEffect } from "react";
import { Sensor } from "../../types/sensor";

interface Props {
  sensorList: Sensor[];
  onClose: () => void;
  onSelect: (sensor: Sensor) => void;
}

const SensorListDialog: React.FC<Props> = ({
  onClose,
  sensorList,
  onSelect,
}) => {
  const filteredSensorList = sensorList.filter(
    (sensor) => sensor.sensor_type !== "bed_sensor"
  );

  // Prevent scrolling on the body when dialog is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      {/* Overlay to prevent interactions with other components */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
        <div
          className="bg-white p-6 rounded-lg w-96 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl mb-4">Sensor List</h2>
          <ul>
            {filteredSensorList.map((sensor, index) => (
              <li
                key={index}
                className="border-b py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  onSelect(sensor);
                  onClose();
                }}
              >
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
    </>
  );
};

export default SensorListDialog;
