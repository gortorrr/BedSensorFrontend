import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { AddBed, Bed } from "../../../types/bed";
import { useBedStore } from "../../../store/bedStore";
import { Building } from "../../../types/building";
import { Floor } from "../../../types/floor";

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
  const [locations, setLocations] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );
  const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);

  const bedStore = useBedStore();

  useEffect(() => {
    const fetchLocationsData = async () => {
      const res = await bedStore.getLocations();
      setLocations(res);
    };
    fetchLocationsData();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setBedData(initialBedData);

      // Preselect building and floor from initialBedData
      const building = locations.find(
        (b) => b.building_id === initialBedData.room.floor.building.building_id
      );
      setSelectedBuilding(building || null);

      const floor = building?.floor?.find(
        (f) => f.floor_id === initialBedData.room.floor.floor_id
      );
      setSelectedFloor(floor || null);
    }
  }, [isOpen, initialBedData, locations]);

  const handleClose = () => {
    onClose();
  };

  const saveBed = async () => {
    try {
      if (!bedData.bed_id) {
        const addBedPayload: AddBed = {
          bed_name: bedData.bed_name,
          room_id: bedData.room.room_id,
        };
        console.log("จะส่ง:", addBedPayload);
        await bedStore.addBed(addBedPayload); // <-- ส่งแค่ข้อมูลที่จำเป็น
      } else {
        await bedStore.editBed(bedData.bed_id, bedData);
      }
      handleClose();
      window.location.reload(); // เปลี่ยนเป็น refresh state ได้หากต้องการ
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
              <label className="w-40 text-right mr-4 font-semibold text-gray-700">
                อาคาร :
              </label>
              <select
                value={bedData.room.floor.building.building_name}
                onChange={(e) => {
                  const building =
                    locations.find((b) => b.building_name === e.target.value) ||
                    null;
                  setSelectedBuilding(building);
                  setSelectedFloor(null);
                  setBedData({
                    ...bedData,
                    room: {
                      room_id: 0,
                      room_name: "",
                      floor: {
                        floor_id: 0,
                        floor_name: "",
                        building: {
                          building_id: building?.building_id ?? 0,
                          building_name: building?.building_name ?? "",
                        },
                      },
                    },
                  });
                }}
                className="w-60 p-2 border border-gray-300 rounded-md h-10"
              >
                <option value="">เลือกอาคาร</option>
                {locations.map((b) => (
                  <option key={b.building_id} value={b.building_name}>
                    {b.building_name}
                  </option>
                ))}
              </select>
            </div>

            {/* ชั้น */}
            <div className="flex items-center">
              <label className="w-40 text-right mr-4 font-semibold text-gray-700">
                ชั้น :
              </label>
              <select
                value={bedData.room.floor.floor_name}
                onChange={(e) => {
                  const floor =
                    selectedBuilding?.floor?.find(
                      (f) => f.floor_name === e.target.value
                    ) || null;
                  setSelectedFloor(floor);
                  setBedData({
                    ...bedData,
                    room: {
                      room_id: 0,
                      room_name: "",
                      floor: {
                        floor_id: floor?.floor_id ?? 0,
                        floor_name: floor?.floor_name ?? "",
                        building: {
                          building_id: selectedBuilding?.building_id ?? 0,
                          building_name: selectedBuilding?.building_name ?? "",
                        },
                      },
                    },
                  });
                }}
                disabled={!selectedBuilding}
                className="w-60 p-2 border border-gray-300 rounded-md h-10"
              >
                <option value="">เลือกชั้น</option>
                {selectedBuilding?.floor?.map((f) => (
                  <option key={f.floor_id} value={f.floor_name}>
                    {f.floor_name}
                  </option>
                ))}
              </select>
            </div>

            {/* ห้อง */}
            <div className="flex items-center">
              <label className="w-40 text-right mr-4 font-semibold text-gray-700">
                ห้อง :
              </label>
              <select
                value={bedData.room.room_id}
                onChange={(e) => {
                  const roomId = parseInt(e.target.value, 10);
                  const room =
                    selectedFloor?.room?.find((r) => r.room_id === roomId) ||
                    null;
                  setBedData({
                    ...bedData,
                    room: {
                      ...bedData.room,
                      room_id: room?.room_id ?? 0,
                      room_name: room?.room_name ?? "",
                    },
                  });
                }}
                disabled={!selectedFloor}
                className="w-60 p-2 border border-gray-300 rounded-md h-10"
              >
                <option value="">เลือกห้อง</option>
                {selectedFloor?.room?.map((r) => (
                  <option key={r.room_id} value={r.room_id}>
                    {r.room_name}
                  </option>
                ))}
              </select>
            </div>

            {/* หมายเลขเตียง */}
            <div className="flex items-center">
              <label className="w-40 text-right mr-4 font-semibold text-gray-700">
                หมายเลขเตียง :
              </label>
              <input
                type="text"
                value={bedData.bed_name}
                onChange={(e) =>
                  setBedData({ ...bedData, bed_name: e.target.value })
                }
                className="w-60 p-2 border border-gray-300 rounded-md h-10"
                placeholder="กรุณากรอกหมายเลขเตียง"
              />
            </div>

            {/* สถานะ */}
            <div className="flex items-center">
              <label className="w-40 text-right mr-4 font-semibold text-gray-700">
                สถานะ :
              </label>
              <select
                value={bedData.bed_activated ? "Active" : "Inactive"}
                disabled={!bedData.bed_id} // ✅ ปิดตอนเพิ่ม
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

          {/* ปุ่ม */}
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
