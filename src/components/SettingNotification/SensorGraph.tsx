import React, { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, subDays } from "date-fns";
import { th } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

interface SensorGraphProps {
  title: string;
  unit: string;
  color: string;
  data: { time: string; value: number }[];
  minValue?: number;
  maxValue?: number;
}

const SensorGraph: React.FC<SensorGraphProps> = ({
  title,
  unit,
  color,
  data,
  minValue,
  maxValue,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // กรองข้อมูลเฉพาะวันที่เลือก
  const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");
  const filteredData = data.filter((d) =>
    d.time.startsWith(formattedSelectedDate)
  );

  // ✅ **ฟังก์ชันรวมข้อมูลทุก 30 นาที**
  const aggregateData = (data: { time: string; value: number }[]) => {
    const grouped: { [key: string]: number[] } = {};

    data.forEach(({ time, value }) => {
      const dateObj = new Date(time);
      const hour = dateObj.getHours();
      const minute = Math.floor(dateObj.getMinutes() / 30) * 30; // แบ่งเป็นช่วง 30 นาที
      const key = `${hour}:${minute.toString().padStart(2, "0")}`;

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(value);
    });

    return Object.entries(grouped).map(([time, values]) => ({
      time: `${formattedSelectedDate} ${time}:00`, // ให้มีวันที่ด้วย
      value: values.reduce((sum, val) => sum + val, 0) / values.length, // ค่าเฉลี่ย
    }));
  };

  // ✅ **สร้างข้อมูลใหม่ที่กรุ๊ปแล้ว**
  const aggregatedData = aggregateData(filteredData);

  const xValues = aggregatedData.map((d) => d.time);
  const yValues = aggregatedData.map((d) => d.value);

  const actualMinValue = minValue ?? Math.min(...yValues);
  const actualMaxValue = maxValue ?? Math.max(...yValues);

  const [containerWidth, setContainerWidth] = useState(0);
    const graphContainerRef = useRef<HTMLDivElement>(null);
  
     // สร้าง ResizeObserver เพื่อติดตามการเปลี่ยนแปลงขนาดของ container
     useEffect(() => {
      if (!graphContainerRef.current) return;
      
      const resizeObserver = new ResizeObserver(entries => {
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

  return (
    <div className="bg-white rounded-lg p-3 shadow-md ">
    <div className="px-2">
      {/* Date Picker UI */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-md font-medium">วัน / เดือน / ปี</span>
        <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date!)}
          dateFormat="dd/MM/yyyy"
          locale={th}
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
          style={{ marginLeft: 10, cursor: "pointer", fontSize: "18px" }}
        >
          «
        </button>
        <button
          onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          style={{ marginLeft: 5, cursor: "pointer", fontSize: "18px" }}
        >
          »
        </button> */}
        </div>
      </div>

      <div 
        ref={graphContainerRef}
        className="bg-linear-to-r from-[#80a2ad] to-[#e9f6fc] rounded-lg w-full px-4"
        style={{ position: 'relative' }} 
        >
      {/* กราฟ Plotly */}
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: color, size: 7 },
            line: { shape: "spline", width: 4 },
            name: title,
            hovertemplate:
              `<b style="font-size: 16px; color: #2d6a4f;">${title}</b><br>` +
              `<span style="font-size: 14px; color: #6c757d;">📅 <span style="font-weight: bold;">วันที่:</span> %{x|%d/%m/%Y}</span><br>` +
              `<span style="font-size: 14px; color: #6c757d;">🕒 <span style="font-weight: bold;">เวลาเฉลี่ย:</span> %{x|%H:%M} - %{x|%H:%M+30m}</span><br>` +
              `<span style="font-size: 14px; color: #f39c12;">📊 <span style="font-weight: bold;">ค่าเฉลี่ย:</span> <b>%{y} ${unit}</b></span><br>` +
              `<extra></extra>`,
          },
          {
            x: xValues,
            y: Array(yValues.length).fill(actualMinValue),
            type: "scatter",
            mode: "lines",
            line: { color: "orange", dash: "dash" },
            name: "ค่าต่ำสุด",
            hoverinfo: "skip",
          },
          {
            x: xValues,
            y: Array(yValues.length).fill(actualMaxValue),
            type: "scatter",
            mode: "lines",
            line: { color: "orange", dash: "dash" },
            name: "ค่าสูงสุด",
            hoverinfo: "skip",
          },
        ]}
        layout={{
          title: `${title} (${unit})`,
          font: { size: 16, color: "#000000", family: "Noto Serif Thai" },
          xaxis: { title: "เวลา", type: "date" },
          yaxis: {
            title: `${title} (${unit})`,
            tickangle: 0, // ✅ แสดงข้อความแนวนอนชัดเจน
            automargin: true, // ✅ ป้องกันการตัดข้อความ
            range: [actualMinValue - 10, actualMaxValue + 10],
          },
          legend: { 
            title: { side: "top center"} ,
            font: { color: "#000000" },
            orientation: "h", // ย้าย Legend ไปด้านล่างของกราฟ
            x: 0.5, // จัดกึ่งกลาง
            y: -0.3, // ขยับลงมาด้านล่าง
            xanchor: "center",
            yanchor: "top",
                  }, // ✅ Legend แยกแต่ละสถานะ
          height: 300,
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
            width: '100%',
            height: '100%',
          }}
        />
    </div>
    </div>
  );
};

export default SensorGraph;
