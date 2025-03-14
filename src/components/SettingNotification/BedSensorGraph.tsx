import React, { useState } from "react";
import Plot from "react-plotly.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, subDays } from "date-fns";

interface TimelineGraphProps {
  data: { time: string; position: string }[];
}

const TimelineGraph: React.FC<TimelineGraphProps> = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 12));

  const statusMapping: { [key: string]: number } = {
    ไม่อยู่ที่เตียง: 1,
    นั่ง: 2,
    นอนตะแคงซ้าย: 3,
    นอนตะแคงขวา: 4,
    นอนตรง: 5,
  };

  const statusColors: { [key: string]: string } = {
    ไม่อยู่ที่เตียง: "#80002a",
    นั่ง: "#ffcc00",
    นอนตะแคงซ้าย: "#99cc99",
    นอนตะแคงขวา: "#e63946",
    นอนตรง: "#d4e157",
  };

  // แปลงวันที่ที่เลือกให้เป็น format "yyyy-MM-dd"
  const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");

  // กรองข้อมูลเฉพาะวันที่เลือก
  const filteredData = data
    .filter((d) => d.time.startsWith(formattedSelectedDate))
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  // ✅ แยกข้อมูลเป็น trace ตามแต่ละสถานะ และปรับโครงสร้างให้ถูกต้อง
  const traces: Plotly.Data[] = Object.keys(statusMapping).map((status) => {
    const statusData = filteredData.filter((d) => d.position === status);

    return {
      x: statusData.map((d) => d.time),
      y: statusData.map((d) => statusMapping[d.position]),
      text: statusData.map(
        (d) =>
          `🟢 สถานะ: ${d.position}<br>🕒 เวลา: ${format(
            new Date(d.time),
            "HH:mm"
          )}`
      ),
      type: "scatter" as const, // ✅ แก้ไขให้ถูกต้อง
      mode: "lines+markers",
      name: status,
      marker: {
        color: statusColors[status],
        size: 8,
      },
      line: { shape: "hv" },
      hoverinfo: "x+y+text", // ✅ แก้ให้โชว์ข้อมูลให้ครบ
    };
  });

  return (
    <div>
      {/* Date Picker */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <span style={{ marginRight: 10 }}>วัน / เดือน / ปี</span>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date!)}
          dateFormat="dd/MM/yyyy"
          className="custom-date-picker"
        />
        <button
          onClick={() => setSelectedDate(subDays(selectedDate, 1))}
          style={{ marginLeft: 10, cursor: "pointer" }}
        >
          «
        </button>
        <button
          onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          style={{ marginLeft: 5, cursor: "pointer" }}
        >
          »
        </button>
      </div>

      {/* กราฟ */}
      <Plot
        data={traces}
        layout={{
          title: "⏳ Timeline ของกิจกรรม",
          xaxis: {
            title: "เวลา",
            type: "date",
            range: [
              `${formattedSelectedDate}T00:00:00`,
              `${formattedSelectedDate}T23:59:59`,
            ], // ✅ แสดงตั้งแต่ 00:00 - 24:00
          },
          yaxis: {
            title: "สถานะ",
            tickvals: Object.values(statusMapping),
            ticktext: Object.keys(statusMapping),
          },
          legend: { title: { text: "สถานะ" } }, // ✅ Legend แยกแต่ละสถานะ
          height: 350,
        }}
        useResizeHandler
        style={{ width: "100%" }}
      />

      {/* คำอธิบายสี */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 10 }}>
        {Object.entries(statusColors).map(([status]) => (
          <div
            key={status}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 15,
              marginBottom: 5,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TimelineGraph;
