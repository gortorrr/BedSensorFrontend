import React, { useState } from "react";
import { Chart } from "react-google-charts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, startOfDay, addHours, addDays, subDays } from "date-fns";
import { th } from "date-fns/locale";

interface TimelineGraphProps {
  data: { time: string; status: string }[];
}

const statusColors: { [key: string]: string } = {
  เปลี่ยนแปลงบ่อย: "#80002a",
  นอนตะแคงซ้าย: "#ffcc66",
  นอนตะแคงขวา: "#99cc99",
  ไม่อยู่ที่เตียง: "#e63946",
  นอนตรง: "#d4e157",
  กำลังออกจากเตียง: "#ff7043",
  นั่ง: "#ffb74d",
  อื่นๆ: "#66cdaa",
};

const convertToChartData = (
  data: { time: string; status: string }[],
  selectedDate: Date
) => {
  const startOfSelectedDay = startOfDay(selectedDate);
  const chartData = [
    [
      { type: "string", id: "Time" },
      { type: "string", id: "Status" },
      { type: "date", id: "Start" },
      { type: "date", id: "End" },
      { role: "style", type: "string" },
    ],
  ];

  // จัดกลุ่มข้อมูลตามชั่วโมง
  for (let i = 0; i < 24; i++) {
    const hourStart = new Date(addHours(startOfSelectedDay, i)); // ใช้ new Date()
    const hourEnd = new Date(addHours(hourStart, 1)); // ใช้ new Date()

    // ดึงข้อมูลที่อยู่ในชั่วโมงนี้
    const statusesInHour = data
      .map((d) => ({
        time: new Date(parseISO(d.time)), // แปลง string เป็น Date
        status: d.status,
      }))
      .filter((d) => d.time >= hourStart && d.time < hourEnd);

    // เลือกสถานะที่พบบ่อยที่สุด
    let mostCommonStatus = "ไม่มีข้อมูล";
    if (statusesInHour.length > 0) {
      const statusCounts = statusesInHour.reduce((acc, entry) => {
        acc[entry.status] = (acc[entry.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      mostCommonStatus = Object.keys(statusCounts).reduce((a, b) =>
        statusCounts[a] > statusCounts[b] ? a : b
      );
    }

    // ดึงสีของสถานะ
    const color = statusColors[mostCommonStatus] || "#ddd";

    // เพิ่มข้อมูลเข้าไป
    chartData.push(["Timeline", mostCommonStatus, hourStart, hourEnd, color]);
  }

  return chartData;
};

const options = {
  timeline: { showRowLabels: false },
};

const TimelineGraph: React.FC<TimelineGraphProps> = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 12));
  const chartData = convertToChartData(data, selectedDate);

  const handleNextDay = () => {
    setSelectedDate((prev) => addDays(prev, 1));
  };

  const handlePreviousDay = () => {
    setSelectedDate((prev) => subDays(prev, 1));
  };

  return (
    <div
      style={{
        backgroundColor: "#e7f0f3",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <span style={{ marginRight: 10, fontWeight: "bold" }}>
          วัน / เดือน / ปี
        </span>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date!)}
          dateFormat="dd/MM/yyyy"
          locale={th}
          className="custom-date-picker"
        />
        <button
          onClick={handlePreviousDay}
          style={{ marginLeft: 10, cursor: "pointer" }}
        >
          «
        </button>
        <button
          onClick={handleNextDay}
          style={{ marginLeft: 5, cursor: "pointer" }}
        >
          »
        </button>
      </div>
      <Chart
        chartType="Timeline"
        data={chartData}
        width="100%"
        height="400px"
        options={options}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        {Object.entries(statusColors).map(([status, color]) => (
          <div
            key={status}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 15,
              marginBottom: 5,
            }}
          >
            <div
              style={{
                width: 15,
                height: 15,
                backgroundColor: color,
                borderRadius: "50%",
                marginRight: 5,
              }}
            ></div>
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineGraph;
