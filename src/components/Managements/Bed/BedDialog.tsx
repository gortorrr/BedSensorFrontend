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
          className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {bedData.bed_id === 0 ? "เพิ่มข้อมูลเตียง" : "แก้ไขข้อมูลเตียง"}
          </h2>

          <div className="space-y-4">
            {/* อาคาร */}
            <div className="flex items-center">
              <label
                htmlFor="building"
                className="w-40 text-right mr-4 font-semibold text-gray-700"
              >
                อาคาร :
              </label>
              <select
                id="building"
                value={bedData.room.floor.building.building_name}
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
                className="w-60 p-2 border border-gray-300 rounded-md h-10"
              >
                <option value="">เลือกอาคาร</option>
                <option value="อาคารผู้ป่วยใน">อาคารผู้ป่วยใน</option>
                <option value="อาคารผู้ป่วยนอก">อาคารผู้ป่วยนอก</option>
              </select>
            </div>

            {/* ชั้น */}
            <div className="flex items-center">
              <label
                htmlFor="floor"
                className="w-40 text-right mr-4 font-semibold text-gray-700"
              >
                ชั้น :
              </label>
              <select
                id="floor"
                value={bedData.room.floor.floor_name}
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
                className="w-60 p-2 border border-gray-300 rounded-md h-10"
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>

            {/* ห้อง */}
            <div className="flex items-center">
              <label
                htmlFor="room"
                className="w-40 text-right mr-4 font-semibold text-gray-700"
              >
                ห้อง :
              </label>
              <select
                id="room"
                value={bedData.room.room_name}
                onChange={(e) =>
                  setBedData({
                    ...bedData,
                    room: {
                      ...bedData.room,
                      room_name: e.target.value,
                    },
                  })
                }
                className="w-60 p-2 border border-gray-300 rounded-md h-10"
              >
                <option value="1610">1610</option>
                <option value="1620">1620</option>
              </select>
            </div>

            {/* หมายเลขเตียง */}
            <div className="flex items-center">
              <label
                htmlFor="bed"
                className="w-40 text-right mr-4 font-semibold text-gray-700"
              >
                หมายเลขเตียง :
              </label>
              <select
                id="bed"
                value={bedData.bed_name}
                onChange={(e) =>
                  setBedData({ ...bedData, bed_name: e.target.value })
                }
                className="w-60 p-2 border border-gray-300 rounded-md h-10"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="5">5</option>
              </select>
            </div>

            {/* สถานะ */}
            <div className="flex items-center">
              <label
                htmlFor="status"
                className="w-40 text-right mr-4 font-semibold text-gray-700"
              >
                สถานะ :
              </label>
              <select
                id="status"
                value={bedData.bed_activated ? "Active" : "Inactive"}
                onChange={(e) =>
                  setBedData({
                    ...bedData,
                    bed_activated: e.target.value === "Active",
                  })
                }
                className={`w-60  p-2 border rounded-md h-10 ${
                  bedData.bed_activated
                    ? "text-green-600 border-green-500"
                    : "text-red-600 border-red-500"
                }`}
              >
                <option value="Active" className="text-green-600">
                  Active
                </option>
                <option value="Inactive" className="text-red-600">
                  Inactive
                </option>
              </select>
            </div>
          </div>

          {/* ปุ่มบันทึก/ยกเลิก */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              onClick={saveBed}
              className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] transform transition-transform hover:-translate-y-1 hover:scale-110"
            >
              บันทึก
            </button>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transform transition-transform hover:-translate-y-1 hover:scale-110"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default BedDialog;
