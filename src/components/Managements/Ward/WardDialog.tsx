import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Ward } from "../../../types/ward";
import { AnimatePresence, motion } from "framer-motion";

interface WardDialogProps {
  open: boolean;
  onClose: () => void;
  initialData?: Ward | null;
}

const roomList = [
  { id: 201, name: "ห้องผ่าตัด 201" },
  { id: 202, name: "ห้องผู้ป่วย 202" },
  { id: 203, name: "ห้องผู้ป่วย 203" },
  { id: 204, name: "ห้องผู้ป่วย 204" },
  { id: 205, name: "ห้องผู้ป่วย 205" },
  { id: 301, name: "ห้องฉุกเฉิน 301" },
  { id: 302, name: "ห้องฉุกเฉิน 302" },
  { id: 401, name: "ห้องพักฟื้น 401" },
  { id: 402, name: "ห้องพักฟื้น 402" },
  { id: 501, name: "ห้องพิเศษ 501" },
];

const WardDialog: React.FC<WardDialogProps> = ({
  open,
  onClose,
  initialData,
}) => {
  const [wardName, setWardName] = useState("");
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");

  useEffect(() => {
    if (open) {
      setWardName(initialData?.ward_name || "");
      setSelectedRooms(
        initialData?.room
          ?.map((r) => r.room_id)
          .filter((id): id is number => id !== undefined) || []
      );
    }
  }, [open, initialData]);

  const allSelected = selectedRooms.length === roomList.length;

  const handleRoomToggle = (roomId: number) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId]
    );
  };

  const handleToggleAll = () => {
    setSelectedRooms(allSelected ? [] : roomList.map((room) => room.id));
  };

  if (!open) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="fixed inset-0 z-50 flex justify-center items-center"
      >
          <div className="bg-white rounded-xl p-6 w-[500px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-center text-[#2E5361] mb-4">
              {initialData?.ward_id ? "แก้ไขวอร์ด" : "เพิ่มวอร์ดใหม่"}
            </h2>

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

            <div className="flex gap-4 mb-3">
              <div className="flex-1">
                <label className="block mb-1 text-black font-medium text-lg">อาคาร :</label>
                <select
                  id="building"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  className={`p-2 border border-gray-300 rounded-md w-full h-11 cursor-pointer ${
                  building ? "text-black" : "text-gray-400"
                }`}
                >
                  <option value="" disabled hidden>กรุณาเลือกอาคาร</option>
                  <option className="text-black" value="A">อาคาร A</option>
                  <option className="text-black" value="B">อาคาร B</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-black font-medium text-lg">ชั้น :</label>
                <select
                  id="floor"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className={`p-2 border border-gray-300 rounded-md w-full h-11 cursor-pointer ${
                  floor ? "text-black" : "text-gray-400"
                }`}
                >
                  <option value="" disabled hidden>กรุณาเลือกชั้น</option>
                  <option className="text-black" value="1">ชั้น 1</option>
                  <option className="text-black" value="2">ชั้น 2</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-black font-medium text-lg mb-2">ห้อง :</label>
              <div className="border rounded overflow-hidden">
                <table className="w-full table-fixed text-left">
                  <thead className="bg-[#B7D6DE]">
                    <tr>
                      <th className="w-15 p-2 text-center border-r">
                        <label className="relative flex cursor-pointer items-center justify-center p-3">
                        <input
                          id="selectAll"
                          type="checkbox"
                          checked={allSelected}
                          onChange={handleToggleAll}
                          className="peer relative h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow hover:shadow-md transition-all
                           before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12
                           before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-600
                           before:opacity-0 before:transition-opacity checked:border-slate-800 checked:bg-slate-800
                           checked:before:bg-slate-600 hover:before:opacity-10"
                        />
                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                        </label>
                      </th>
                      <th className="p-4">ห้อง</th>
                    </tr>
                  </thead>
                </table>
                <div className="max-h-[180px] overflow-y-auto">
                  <table className="w-full table-fixed text-left">
                    <tbody>
                      {roomList.map((room) => (
                        <tr key={room.id} className="border-t">
                          <td className="w-15 p-2 text-center border-r">
                            <label className="relative flex cursor-pointer items-center justify-center p-3">
                            <input
                              id="select"
                              type="checkbox"
                              checked={selectedRooms.includes(room.id)}
                              onChange={() => handleRoomToggle(room.id)}
                              className="peer relative h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow hover:shadow-md transition-all
                                before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12
                                before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-400
                                before:opacity-0 before:transition-opacity checked:border-slate-800 checked:bg-slate-800
                                checked:before:bg-slate-400 hover:before:opacity-10"
                            />
                            <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                            </label>
                          </td>
                          <td className="p-4">{room.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                id="btnCancle"
                onClick={onClose}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 cursor-pointer transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
              >
                ยกเลิก
              </button>
              <button
                id="btnSave"
                className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] cursor-pointer transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
              >
                บันทึก
              </button>
            </div>
        </div>,
        </motion.div>
      </AnimatePresence>,
      document.body
  );
};

export default WardDialog;
