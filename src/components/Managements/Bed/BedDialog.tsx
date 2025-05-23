import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { Bed } from "../../../types/bed";
import { useBedStore } from "../../../store/bedStore";

interface BedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialBedData: Bed;
}

const BedDialog: React.FC<BedDialogProps> = ({
  isOpen,
  onClose,
  initialBedData,
}) => {
  const [bedData, setBedData] = useState<Bed>(initialBedData);
  const bedStore = useBedStore();

  useEffect(() => {
    if (isOpen) {
      setBedData(initialBedData);
    }
  }, [isOpen, initialBedData]);

  const handleClose = () => {
    onClose();
  };

  const saveBed = async () => {
    try {
      if (!bedData.bed_id) {
        console.log(bedData.bed_name);
        await bedStore.addBed(bedData);
      } else {
        await bedStore.editBed(bedData.bed_id, bedData);
      }
      handleClose();
      window.location.reload(); // คุณสามารถเปลี่ยนเป็นการ refresh state แทน reload ก็ได้
    } catch (err) {
      console.error("❌ Failed to save bed:", err);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="fixed inset-0 z-50 flex justify-center items-center"
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {bedData.bed_id === 0 ? "เพิ่มข้อมูลเตียง" : "แก้ไขข้อมูลเตียง"}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* อาคาร */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                ชื่ออาคาร
              </label>
              <input
                id="buildingName"
                type="text"
                value={bedData.room.floor.building.building_name}
                placeholder="กรุณากรอกชื่ออาคาร"
                onChange={(e) =>
                  setBedData({
                    ...bedData,
                    room: {
                      ...bedData.room,
                      floor: {
                        ...bedData.room.floor,
                        building: {
                          ...bedData.room.floor.building,
                          building_name: e.target.value,
                        },
                      },
                    },
                  })
                }
                className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
              />
            </div>

            {/* ชั้น */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">ชั้น</label>
              <input
                id="floorName"
                type="text"
                value={bedData.room.floor.floor_name}
                placeholder="กรุณากรอกชั้น"
                onChange={(e) =>
                  setBedData({
                    ...bedData,
                    room: {
                      ...bedData.room,
                      floor: {
                        ...bedData.room.floor,
                        floor_name: e.target.value,
                      },
                    },
                  })
                }
                className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
              />
            </div>

            {/* ห้อง */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                ชื่อห้อง
              </label>
              <input
                id="roomName"
                type="text"
                value={bedData.room.room_name}
                placeholder="กรุณากรอกชื่อห้อง"
                onChange={(e) =>
                  setBedData({
                    ...bedData,
                    room: {
                      ...bedData.room,
                      room_name: e.target.value,
                    },
                  })
                }
                className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
              />
            </div>

            {/* หมายเลขเตียง */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                หมายเลขเตียง
              </label>
              <input
                id="bed_name"
                type="text"
                value={bedData.bed_name}
                placeholder="กรุณากรอกหมายเลขเตียง"
                onChange={(e) =>
                  setBedData({ ...bedData, bed_name: e.target.value })
                }
                className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
              />
            </div>

            {/* สถานะเตียง */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">สถานะ</label>
              <select
                id="bed_status"
                value={bedData.bed_activated ? "Active" : "Inactive"}
                onChange={(e) =>
                  setBedData({
                    ...bedData,
                    bed_activated: e.target.value === "Active",
                  })
                }
                className={`p-2 border border-gray-300 rounded-md w-full h-11 cursor-pointer ${
                  bedData.bed_activated ? "text-green-600" : "text-red-600"
                }`}
              >
                <option value="Inactive" className="text-red-600">
                  Inactive
                </option>
                <option value="Active" className="text-green-600">
                  Active
                </option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end mt-6">
            <div className="flex gap-4">
              <button
                id="btnCancel"
                onClick={handleClose}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 cursor-pointer transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
              >
                ยกเลิก
              </button>
              <button
                id="btnSave"
                className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] cursor-pointer transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
                onClick={saveBed}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default BedDialog;
