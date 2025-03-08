import React from "react";
import { Bed } from "../../types/bed";
import { FaBed } from "react-icons/fa"; // นำเข้าไอคอนเตียง

interface Props {
  bed_config: Bed | undefined;
}

const BedWindow: React.FC<Props> = ({ bed_config }) => {
  return (
    <>
      {bed_config && (
        <div className="border-2 border-gray-300 rounded-md w-full h-1/2 bg-gradient-to-br from-[#3A6170] to-[#D1DFE5] p-3 h-full">
        <div className="flex items-center p-3 text-xl font-semibold">
        <FaBed className="mr-2 text-3xl" />
        รายละเอียดเตียง
        </div>

          {/* อาคาร */}
          <div className="flex items-center p-3">
            <label htmlFor="building_name" className="pl-6 mr-2 font-medium">
              อาคาร:
            </label>
            <input
              id="building_name"
              type="text"
              className="border border-gray-300 rounded-xl pl-3 max-w-[300px]"
              value={bed_config?.room?.floor?.building?.building_name || ""}
              placeholder="Building Name"
              readOnly
            />
          </div>

          {/* ชั้น */}
          <div className="flex items-center p-3">
            <label htmlFor="floor_name" className="pl-6 mr-8">
              ชั้น:
            </label>
            <input
              id="floor_name"
              type="text"
              className="border border-gray-300 rounded-xl pl-3 max-w-[300px]"
              value={bed_config?.room?.floor?.floor_name || ""}
              placeholder="Floor Name"
              readOnly
            />
          </div>

          {/* ห้อง */}
          <div className="flex items-center p-3">
            <label htmlFor="room_name" className="pl-6 mr-6">
              ห้อง:
            </label>
            <input
              id="room_name"
              type="text"
              className="border border-gray-300 rounded-xl pl-3 max-w-[300px]"
              value={bed_config?.room?.room_name || ""}
              placeholder="Room Name"
              readOnly
            />
          </div>

          {/* เตียง */}
          <div className="flex items-center p-3">
            <label htmlFor="bed_name" className="pl-6 mr-4">
              เตียง:
            </label>
            <input
              id="bed_name"
              type="text"
              className="border border-gray-300 rounded-xl pl-3 max-w-[300px]"
              value={bed_config?.bed_name || ""}
              placeholder="Bed Name"
              readOnly
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BedWindow;
