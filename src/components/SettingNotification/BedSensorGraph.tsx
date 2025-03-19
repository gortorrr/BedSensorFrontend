import React, { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface TimelineGraphProps {
  data: { time: string; position: string }[];
}

const TimelineGraph: React.FC<TimelineGraphProps> = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [containerWidth, setContainerWidth] = useState(0);
  const graphContainerRef = useRef<HTMLDivElement>(null);

  // สร้าง ResizeObserver เพื่อติดตามการเปลี่ยนแปลงขนาดของ container
  useEffect(() => {
    if (!graphContainerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(graphContainerRef.current);

    // เช็คขนาดเริ่มต้นทันที
    setContainerWidth(graphContainerRef.current.offsetWidth);

    // Cleanup observer เมื่อ component unmount
    return () => {
      if (graphContainerRef.current) {
        resizeObserver.unobserve(graphContainerRef.current);
      }
    };
  }, []);

  const statusMapping: { [key: string]: number } = {
    ไม่อยู่ที่เตียง: 1,
    นั่งบนเตียง: 2,
    นอนตะแคงซ้าย: 3,
    นอนตะแคงขวา: 4,
    นอนตรง: 5,
  };

  const statusColors: { [key: string]: string } = {
    ไม่อยู่ที่เตียง: "#80002a",
    นั่งบนเตียง: "#ffcc00",
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
    console.log("📊 ข้อมูลที่ได้รับใน TimelineGraph:", data);
    console.log(
      "⏳ เวลาที่ใช้ในกราฟ:",
      data.map((d) => d.time)
    );

    return {
      x: statusData.map((d) => d.time),
      y: statusData.map((d) => statusMapping[d.position]),
      text: statusData.map(
        (d) =>
          `<span style="font-size: 14px; font-weight: bold;>🟢 สถานะ: ${
            d.position
          }</span><br>🕒 เวลา: ${format(new Date(d.time), "HH:mm")}`
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

      <div
        ref={graphContainerRef}
        className="bg-linear-to-r from-[#80a2ad] to-[#e9f6fc] rounded-lg w-full px-4"
        style={{ position: "relative" }}
      >
        {/* กราฟ */}
        <Plot
          data={traces.map((trace) => ({
            ...trace,
            line: { width: 4, dash: "solid" }, // เพิ่มความหนาแส้น
          }))}
          layout={{
            title: "⏳ Timeline ของกิจกรรม",
            font: { size: 16, color: "#000000", family: "Noto Serif Thai" },
            xaxis: {
              title: "เวลา",
              type: "date",
              range: [
                `${formattedSelectedDate}T00:00:00.000Z`,
                `${formattedSelectedDate}T23:59:59.999Z`,
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
              title: { text: "สถานะ", side: "top center" },
              font: { color: "#000000" },
              orientation: "h", // ย้าย Legend ไปด้านล่างของกราฟ
              x: 0.5, // จัดกึ่งกลาง
              y: -0.3, // ขยับลงมาด้านล่าง
              xanchor: "center",
              yanchor: "top",
            }, // ✅ Legend แยกแต่ละสถานะ
            height: 350,
            width: containerWidth > 0 ? containerWidth - 32 : undefined, // หักค่าขอบ padding ที่เป็น px-4 (16px + 16px)
            // กำหนดพื้นหลังเป็นไล่สี (gradient)
            paper_bgcolor: "transparent", // พื้นหลังของกราฟ
            plot_bgcolor: "transparent", // พื้นหลังที่อยู่ด้านในกราฟ (สำหรับพื้นที่แสดงข้อมูล)
            margin: { l: 80, r: 50, t: 80, b: 120 }, // ปรับ margin ให้พอดี
            // autosize: true, // ให้ปรับขนาดอัตโนมัติภายในพื้นที่ที่กำหนด
          }}
          config={{
            responsive: true,
            // displayModeBar: false // ซ่อนแถบเครื่องมือเพื่อประหยัดพื้นที่
          }}
          useResizeHandler={true}
          // className="mx-auto" // จัดให้อยู่ตรงกลาง
          style={{
            width: "100%",
            height: "100%",
          }}
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
