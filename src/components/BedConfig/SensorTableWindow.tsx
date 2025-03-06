import React from "react";
import Icon from "@mdi/react";
import { mdiCog, mdiDelete } from "@mdi/js";
import { Sensor } from "../../types/sensor";

interface Props {
  sensors: Sensor[] | undefined;
}

const SensorTableWindow: React.FC<Props> = ({ sensors }) => {
  return (
    <>
      {sensors !== undefined && (
        <div className="flex flex-col border-2 border-gray-300 p-4 bg-[#F0F0F0] rounded-md min-h-[620px]">
          <h2 className="text-xl font-semibold mb-4">รายการเซ็นเซอร์</h2>
          <div className="overflow-x-auto ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#95BAC3]  ">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left  font-medium  text-black uppercase tracking-wider font-extrabold text-base"
                  >
                    เซ็นเซอร์
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end  font-medium  text-black uppercase tracking-wider font-extrabold text-base"
                  >
                    ดำเนินการ
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {sensors.map((sensor, index) => (
                  <tr key={index} className="odd:bg-white even:bg-[#A1B5BC]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {sensor.sensor_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-4 justify-end">
                        <Icon
                          path={mdiCog}
                          size={1}
                          className="text-gray-600 hover:text-gray-900 cursor-pointer"
                        />
                        <Icon
                          path={mdiDelete}
                          size={1}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default SensorTableWindow;
