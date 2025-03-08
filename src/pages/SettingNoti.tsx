import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBedStore } from "../store/bedStore";
import { Bed } from "../types/bed";
import { Sensor } from "../types/sensor";

const SettingNoti: React.FC = () => {
  const { bed_id } = useParams<{ bed_id?: string }>();
  const bedStore = useBedStore();
  const navigate = useNavigate();

  const [bed, setBed] = useState<Bed | undefined>();
  const [sensor, setSensor] = useState<Sensor[] | undefined>();

  useEffect(() => {
    console.log("🛏️ bed_id from URL:", bed_id);
    console.log("📦 bedStore.beds:", bedStore.beds);

    if (bed_id) {
      const bedIdNumber = parseInt(bed_id);
      console.log("🔍 Searching for bed with ID:", bedIdNumber);

      const foundBed = bedStore.beds.find(
        (item) => item.bed_id === bedIdNumber
      );

      if (foundBed) {
        console.log("✅ Found bed:", foundBed);
        setBed(foundBed);
        //setPatient(foundBed.patient);
        setSensor(foundBed.sensors);
      } else {
        console.warn("⚠️ No bed found with ID:", bedIdNumber);
      }
    }
  }, [bed_id, bedStore]);

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="p-4 bg-[#e7f0f3] min-h-screen">
      {/* Header */}
      <h2 className="text-3xl font-bold text-[#2E5361] mb-4">ตั้งค่าการแจ้งเตือน</h2>
      <div className="flex gap-2 mb-4">
        <button className="px-4 py-2 bg-white border rounded-lg">Bed Sensor</button>
        <button className="px-4 py-2 bg-white border rounded-lg">{bed?.room?.floor?.building?.building_name}</button>
        <button className="px-4 py-2 bg-white border rounded-lg">{bed?.room?.floor?.floor_name}</button>
        <button className="px-4 py-2 bg-white border rounded-lg">{bed?.room.room_name}</button>
        <button className="px-4 py-2 bg-white border rounded-lg">{bed?.bed_name}</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2">
        <button className="px-4 py-2 bg-[#5E8892] text-white rounded-t-lg">ตั้งค่าการแจ้งเตือน</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-t-lg">ไทม์ไลน์</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-t-lg">ประวัติการแจ้งเตือน</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#B7D6DE]">
              <th className="p-2 border">ไอคอน</th>
              {/*<th className="p-2 border">เหตุการณ์</th>*/}
              {/*<th className="p-2 border">การใช้</th>*/}
              <th className="p-2 border">การแจ้งเตือนซ้ำ</th>
              <th className="p-2 border">ระยะเวลาการแจ้งเตือน</th>
              <th className="p-2 border">สัญญาณ</th>
            </tr>
          </thead>
          <tbody>
            {/* ใช้ข้อมูลจากเซ็นเซอร์ */}
            {sensor?.map((item, index) => (
              <tr key={index} className="text-center border-b">
                <td className="p-2 border">🛏️</td>
                
                <td className="p-2 border">
                  <select className="p-1 border rounded">
                    <option>3 นาที</option>
                    <option>5 นาที</option>
                    <option>10 นาที</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <select className="p-1 border rounded">
                    <option>1 นาที</option>
                    <option>3 นาที</option>
                    <option>5 นาที</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <select className="p-1 border rounded">
                    <option>ปกติ</option>
                    <option>ช่วยเหลือ</option>
                    <option>อันตราย</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-6 gap-4">
        <button
          className="px-6 py-2 bg-[#5E8892] text-white rounded-xl hover:bg-[#95BAC3]"
        >
          บันทึก
        </button>
        <button
          onClick={handleCancel}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

export default SettingNoti;
