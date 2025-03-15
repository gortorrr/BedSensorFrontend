import React, { useState } from "react";
import Plot from "react-plotly.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

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
    นอนตะแคงซ้าย: "#FBA518",
    นอนตะแคงขวา: "#e63946",
    นอนตรง: "#A89C29",
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

    <div className="bg-white rounded-lg p-3 shadow-md ">
      <div className="px-2">
        {/* Date Picker */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-md font-medium">วัน / เดือน / ปี</span>
        <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date!)}
          dateFormat="dd/MM/yyyy"
          className="custom-date-picker p-2 border-1 rounded-xl text-center font-semibold shadow-md"
        />
        <CalendarIcon className="absolute right-2 top-1.5 text-gray-500" />
        </div>
        
        <MdKeyboardDoubleArrowLeft 
          onClick={() => setSelectedDate(subDays(selectedDate, 1))}
          style={{ marginLeft: 10, fontSize: 30, cursor: "pointer" }}
        />
        <MdKeyboardDoubleArrowRight
          onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          style={{ marginLeft: 5, fontSize: 30, cursor: "pointer" }}
        />
        {/* <button
          onClick={() => setSelectedDate(subDays(selectedDate, 1))}
          style={{ marginLeft: 10, fontSize: 20, cursor: "pointer" }}
        >
          «
        </button>
        <button
          onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          style={{ marginLeft: 5, cursor: "pointer" }}
        >
          »
        </button> */}
      </div>
      
      </div>

      <div className="bg-linear-to-r from-[#80a2ad] to-[#e9f6fc] rounded-lg" >
        {/* กราฟ */}
        <Plot
          data={traces.map((trace) => ({
            ...trace,
            line: { width: 4, dash: 'solid' }, // เพิ่มความหนาแส้น
          }))}
          layout={{
            title: "⏳ Timeline ของกิจกรรม",
            font: { size: 16, color: "#000000", family: "Noto Serif Thai" },
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
              tickangle: 0, // ✅ แสดงข้อความแนวนอนชัดเจน
              automargin: true, // ✅ ป้องกันการตัดข้อความ
            },
            legend: { 
              title: { text: "สถานะ", side: "top center"} ,
              font: { color: "#000000" },
              orientation: "h", // ย้าย Legend ไปด้านล่างของกราฟ
              x: 0.5, // จัดกึ่งกลาง
              y: -0.3, // ขยับลงมาด้านล่าง
              xanchor: "center",
              yanchor: "top",
                    }, // ✅ Legend แยกแต่ละสถานะ
            height: 350,
            // กำหนดพื้นหลังเป็นไล่สี (gradient)
            paper_bgcolor: "transparent", // พื้นหลังของกราฟ
            plot_bgcolor: "transparent", // พื้นหลังที่อยู่ด้านในกราฟ (สำหรับพื้นที่แสดงข้อมูล)
            
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
      
    </div>
  );
};

export default TimelineGraph;
