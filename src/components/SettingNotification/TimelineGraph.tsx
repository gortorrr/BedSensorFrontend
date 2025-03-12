import React, { useState } from "react";
import Plot from "react-plotly.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, subDays } from "date-fns";
import { th } from "date-fns/locale";

interface TimelineGraphProps {
  data: { time: string; status: string }[];
}

const TimelineGraph: React.FC<TimelineGraphProps> = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const statusMapping: { [key: string]: number } = {
    เปลี่ยนแปลงบ่อย: 1,
    นอนตะแคงซ้าย: 2,
    นอนตะแคงขวา: 3,
    ไม่อยู่ที่เตียง: 4,
    นอนตรง: 5,
    กำลังออกจากเตียง: 6,
    นั่ง: 7,
    อื่นๆ: 8,
  };

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

  const handleNextDay = () => {
    setSelectedDate((prev) => addDays(prev, 1));
  };

  const handlePreviousDay = () => {
    setSelectedDate((prev) => subDays(prev, 1));
  };

  //   const formattedDate = format(selectedDate, "dd/MM/yyyy", { locale: th });

  const trace = {
    x: data.map((d) => d.time),
    y: data.map((d) => statusMapping[d.status]),
    text: data.map((d) => d.status),
    type: "scatter",
    mode: "markers+lines",
    marker: {
      color: data.map((d) => statusColors[d.status]),
      size: 10,
    },
    line: { shape: "hv" },
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <span style={{ marginRight: 10 }}>วัน / เดือน / ปี</span>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date!)}
          dateFormat="dd/MM/yyyy"
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
      <Plot
        data={[trace]}
        layout={{
          title: "⏳ Timeline ของกิจกรรม",
          xaxis: { title: "เวลา", type: "category" },
          yaxis: {
            title: "สถานะ",
            tickvals: Object.values(statusMapping),
            ticktext: Object.keys(statusMapping),
          },
          height: 350,
        }}
        useResizeHandler
        style={{ width: "100%" }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 10 }}>
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
                width: 12,
                height: 12,
                backgroundColor: color,
                marginRight: 5,
              }}
            ></div>
            <span style={{ fontSize: "14px" }}>{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineGraph;
