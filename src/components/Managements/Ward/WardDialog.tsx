import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Ward } from "../../../types/ward";

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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-center mb-4">
          {initialData?.ward_id ? "แก้ไขวอร์ด" : "เพิ่มวอร์ดใหม่"}
        </h2>

        <div className="mb-3">
          <label className="block font-medium">ชื่อวอร์ด :</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            value={wardName}
            onChange={(e) => setWardName(e.target.value)}
            placeholder="กรุณากรอกชื่อวอร์ด"
          />
        </div>

        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <label className="block font-medium">อาคาร :</label>
            <select
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              className="w-full border rounded p-2 mt-1"
            >
              <option value="">กรุณาเลือกอาคาร</option>
              <option value="A">อาคาร A</option>
              <option value="B">อาคาร B</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-medium">ชั้น :</label>
            <select
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="w-full border rounded p-2 mt-1"
            >
              <option value="">กรุณาเลือกชั้น</option>
              <option value="1">ชั้น 1</option>
              <option value="2">ชั้น 2</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">ห้อง :</label>
          <div className="border rounded overflow-hidden">
            <table className="w-full table-fixed text-left">
              <thead className="bg-blue-100">
                <tr>
                  <th className="w-12 p-2">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleToggleAll}
                    />
                  </th>
                  <th className="p-2">ห้อง</th>
                </tr>
              </thead>
            </table>
            <div className="max-h-[200px] overflow-y-auto">
              <table className="w-full table-fixed text-left">
                <tbody>
                  {roomList.map((room) => (
                    <tr key={room.id} className="border-t">
                      <td className="w-12 p-2">
                        <input
                          type="checkbox"
                          checked={selectedRooms.includes(room.id)}
                          onChange={() => handleRoomToggle(room.id)}
                        />
                      </td>
                      <td className="p-2">{room.name}</td>
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
      </div>
    </div>,
    document.body
  );
};

export default WardDialog;
