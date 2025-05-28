import React, { useEffect, useState } from "react";
import { History_Value_Sensor } from "../../types/history_value_sensor";
import { Sensor } from "../../types/sensor";
import { useSensorStore } from "../../store/sensorStore";

const NotificationHistory: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedZone, setSelectedZone] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const sensorStore = useSensorStore();
  const itemsPerPage = 10;

  const fetchSensors = async () => {
    try {
      const data = await sensorStore.getSensors();
      console.log("✅ Sensors fetched:", data);
      setSensors(data);
    } catch (error) {
      console.error("❌ Error fetching sensors:", error);
    }
  };

  useEffect(() => {
    fetchSensors();
  }, []);

  const mockHistory: History_Value_Sensor[] = [
    {
      sensor_id: 3,
      history_value_sensor_id: 1,
      history_value_sensor_value:
        "อัตราการหายใจต่ำ (9 ครั้ง/นาที) ที่ ห้อง: RM205 เตียง: 26",
      history_value_sensor_time: "2025-01-01 13:20",
    },
    {
      sensor_id: 2,
      history_value_sensor_id: 2,
      history_value_sensor_value:
        "อัตราการเต้นของหัวใจ: หัวใจเต้นเร็ว (124 bpm) ที่ ห้อง: RM203 เตียง: 23",
      history_value_sensor_time: "2025-01-01 12:41",
    },
    {
      sensor_id: 2,
      history_value_sensor_id: 3,
      history_value_sensor_value:
        "อัตราการเต้นของหัวใจ: หัวใจเต้นช้า (48 bpm) ที่ ห้อง: RM108 เตียง: 18",
      history_value_sensor_time: "2025-01-01 11:23",
    },
    {
      sensor_id: 3,
      history_value_sensor_id: 4,
      history_value_sensor_value:
        "อัตราการหายใจต่ำ (8 ครั้ง/นาที) ที่ ห้อง: RM116 เตียง: 15",
      history_value_sensor_time: "2025-01-01 10:17",
    },
    {
      sensor_id: 3,
      history_value_sensor_id: 5,
      history_value_sensor_value:
        "อัตราการหายใจสูง (29 ครั้ง/นาที) ที่ ห้อง: RM112 เตียง: 11",
      history_value_sensor_time: "2025-01-02 09:56",
    },
    {
      sensor_id: 3,
      history_value_sensor_id: 6,
      history_value_sensor_value:
        "อัตราการหายใจต่ำ (10 ครั้ง/นาที) ที่ ห้อง: RM108 เตียง: 5",
      history_value_sensor_time: "2025-01-02 09:18",
    },
    {
      sensor_id: 2,
      history_value_sensor_id: 7,
      history_value_sensor_value:
        "อัตราการเต้นของหัวใจ: หัวใจเต้นเร็ว (120 bpm) ที่ ห้อง: RM105 เตียง: 2",
      history_value_sensor_time: "2025-01-03 08:35",
    },
  ];
  //ถ้าจะ test ว่ากรองได้จริงไหม sensor id bed = 1 hert rate id = 7
  const sensorOptions = [
    { label: "เซนเซอร์ทั้งหมด", value: "all" },
    { label: "Bed Sensor", value: "bed_sensor" },
    { label: "SpO2 Sensor", value: "spo2" },
    { label: "Respiration Sensor", value: "respiration" },
    { label: "Heart Rate Sensor", value: "heart_rate" },
  ];

  const filteredData = mockHistory
    .filter(
      (h) =>
        selectedDate === "" ||
        h.history_value_sensor_time?.startsWith(selectedDate)
    )
    .filter((h) => {
      if (selectedZone === "all") return true;

      const matchedSensor = sensors.find((s) => s.sensor_id === h.sensor_id);
      return matchedSensor?.sensor_type === selectedZone;
    })
    .sort((a, b) =>
      (b.history_value_sensor_time ?? "").localeCompare(
        a.history_value_sensor_time ?? ""
      )
    );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = (): number[] => {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    let startPage = currentPage - half;
    let endPage = currentPage + half;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(maxVisible, totalPages);
    }
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisible + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="p-6 bg-[#e7f0f3] min-h-screen">
      <h1 className="text-3xl font-bold text-[#2E5361] mb-4">
        ประวัติการแจ้งเตือน
      </h1>

      <div className="flex gap-4 flex-wrap md:flex-nowrap items-center mb-6">
        <input
          type="date"
          className="input input-bordered border-2 border-gray-400 rounded-lg p-2 bg-white w-full md:w-auto"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="select select-bordered border-2 border-gray-400 rounded-lg bg-white p-2 w-full md:w-auto"
          value={selectedZone}
          onChange={(e) => {
            setSelectedZone(e.target.value);
            setCurrentPage(1);
          }}
        >
          {sensorOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      
      {/* Table */}
      <table className="w-full border-collapse shadow-md">
        <thead className="bg-[#B7D6DE] h-16 font-bold text-center">
          <tr>
            <th className="p-2 text-left pl-16">การแจ้งเตือน</th>
            <th className="p-2">วันที่/เวลา</th>
            <th className="p-2">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((h) => (
            <tr
              key={h.history_value_sensor_id}
              className="text-center bg-white shadow-sm even:bg-gradient-to-r even:from-[#A1B5BC] even:via-[#D1DFE5] even:to-[#e4ecef]"
            >
              <td className="p-2 h-16 text-left pl-16">
                {h.history_value_sensor_value}
              </td>
              <td className="p-2 h-16">{h.history_value_sensor_time}</td>
              <td className="p-2 h-16 py-4 text-center flex justify-center gap-2">
                <button
                  id="detail"
                  className="mx-1 cursor-pointer w-7 h-7 transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
                >
                  <img src="/src/assets/review.png" alt="review" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            className="px-3 py-1 bg-[#95BAC3] rounded-xl hover:bg-[#5E8892] text-white cursor-pointer"
            disabled={currentPage === 1}
          >
            &laquo; หน้าแรก
          </button>

          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 rounded-xl cursor-pointer ${
                currentPage === pageNum
                  ? "bg-[#5E8892] text-white shadow-lg"
                  : "bg-white text-black"
              } hover:bg-[#5E8892]`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(totalPages)}
            className="px-3 py-1 bg-[#95BAC3] rounded-xl hover:bg-[#5E8892] text-white cursor-pointer"
            disabled={currentPage === totalPages}
          >
            หน้าสุดท้าย &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationHistory;
