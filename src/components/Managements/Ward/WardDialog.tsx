import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Ward } from "../../../types/ward";
import { AnimatePresence, motion } from "framer-motion";
import { Building } from "../../../types/building";
import { useBedStore } from "../../../store/bedStore";
import { useWardStore } from "../../../store/wardStore";

interface WardDialogProps {
  open: boolean;
  onClose: () => void;
  initialData?: Ward | null;
}

const WardDialog: React.FC<WardDialogProps> = ({ open, onClose, initialData }) => {
  const [wardName, setWardName] = useState("");
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [buildingId, setBuildingId] = useState<number | "">("");
  const [locations, setLocations] = useState<Building[]>([]);
  const [floorId, setFloorId] = useState<number | "">("");
  const bedStore = useBedStore();
  const wardStore = useWardStore();
  const buildingOptions = locations;
  const selectedBuilding = buildingOptions.find((b) => b.building_id === buildingId);
  const floorOptions = selectedBuilding?.floor ?? [];
  const selectedFloor = floorOptions.find((f) => f.floor_id === floorId);
  const roomOptions = selectedFloor?.room?.filter((r) => r.ward_id === null) ?? [];

  useEffect(() => {
      const fetchLocationsData = async () => {
        const res = await bedStore.getLocations();
        setLocations(res);
      };
      fetchLocationsData();
    }, []);
  useEffect(() => {
    if (open) {
      setWardName(initialData?.ward_name || "");
      const selected = initialData?.room?.[0];
      setBuildingId(selected?.floor?.building.building_id || "");
      setFloorId(selected?.floor?.floor_id || "");
      setSelectedRooms(initialData?.room?.map((r) => r.room_id!).filter(Boolean) || []);
    }
  }, [open, initialData]);

  useEffect(() => {
    setSelectedRooms([]); // reset เมื่อเลือก building หรือ floor ใหม่
  }, [buildingId, floorId]);

  const allSelected = selectedRooms.length === roomOptions.length;

  const handleRoomToggle = (roomId: number) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]
    );
  };

  const handleToggleAll = () => {
    setSelectedRooms(allSelected ? [] : roomOptions.map((room) => room.room_id!));
  };

  const handleSubmit = async () => {
  if (!wardName || selectedRooms.length === 0) {
    alert("กรุณากรอกชื่อวอร์ดและเลือกห้องอย่างน้อยหนึ่งห้อง");
    return;
  }

  const payload = {
    ward_name: wardName,
    room_ids: selectedRooms,
  };

  try {
    await wardStore.addWard(payload);
    onClose();
    window.location.reload(); // ปิด dialog หลังจากสำเร็จ
  } catch (err) {
    console.error("Error adding ward:", err);
    alert("เกิดข้อผิดพลาดในการเพิ่มวอร์ด");
  }
};


  if (!open) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
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
          className="bg-white rounded-xl p-6 w-[500px] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-3xl font-bold text-center text-[#2E5361] mb-4">
            {initialData?.ward_id ? "แก้ไขวอร์ด" : "เพิ่มวอร์ดใหม่"}
          </h2>

          {/* Ward Name */}
          <div className="mb-3">
            <label className="block mb-1 text-black font-medium text-lg">ชื่อวอร์ด :</label>
            <input
              id="wardName"
              type="text"
              className="p-2 pl-3 border border-gray-300 rounded-md w-full h-11 placeholder:text-gray-400"
              value={wardName}
              onChange={(e) => setWardName(e.target.value)}
              placeholder="กรุณากรอกชื่อวอร์ด"
            />
          </div>

          {/* Building and Floor */}
          <div className="flex gap-4 mb-3">
            <div className="flex-1">
              <label className="block mb-1 text-black font-medium text-lg">อาคาร :</label>
              <select
                value={buildingId}
                onChange={(e) => setBuildingId(Number(e.target.value) || "")}
                className="p-2 border border-gray-300 rounded-md w-full h-11 text-black"
              >
                <option value="">กรุณาเลือกอาคาร</option>
                {buildingOptions.map((b) => (
                  <option key={b.building_id} value={b.building_id}>
                    {b.building_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-black font-medium text-lg">ชั้น :</label>
              <select
                value={floorId}
                onChange={(e) => setFloorId(Number(e.target.value) || "")}
                disabled={buildingId === ""}
                className="p-2 border border-gray-300 rounded-md w-full h-11 text-black bg-white disabled:bg-gray-100 disabled:text-gray-400"
              >
                <option value="">กรุณาเลือกชั้น</option>
                {floorOptions.map((f) => (
                  <option key={f.floor_id} value={f.floor_id}>
                    {f.floor_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Room Selection */}
          <div className="mb-4">
            <label className="block text-black font-medium text-lg mb-2">ห้อง :</label>
            <div className="border rounded overflow-hidden">
              <table className="w-full table-fixed text-left">
                <thead className="bg-[#B7D6DE]">
                  <tr>
                    <th className="w-15 p-2 text-center border-r">
                      <input
                        type="checkbox"
                        disabled={floorId === ""}
                        checked={allSelected}
                        onChange={handleToggleAll}
                      />
                    </th>
                    <th className="p-4">ห้อง</th>
                  </tr>
                </thead>
              </table>
              <div className="max-h-[180px] overflow-y-auto">
                <table className="w-full table-fixed text-left">
                  <tbody>
                    {roomOptions.map((room) => (
                      <tr key={room.room_id} className="border-t">
                        <td className="w-15 p-2 text-center border-r">
                          <input
                            type="checkbox"
                            disabled={floorId === ""}
                            checked={selectedRooms.includes(room.room_id!)}
                            onChange={() => handleRoomToggle(room.room_id!)}
                          />
                        </td>
                        <td className="p-4">{room.room_name}</td>
                      </tr>
                    ))}
                    {roomOptions.length === 0 && (
                      <tr>
                        <td colSpan={2} className="text-center p-4 text-gray-400">
                          กรุณาเลือกอาคารและชั้นก่อน
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892]"
            >
              บันทึก
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default WardDialog;
