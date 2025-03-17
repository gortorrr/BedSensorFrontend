import React, { useState } from "react";
import Plot from "react-plotly.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, subDays } from "date-fns";
import { th } from "date-fns/locale";

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

  return (
    <div>
      {/* Date Picker UI */}
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
        </button>
      </div>

      {/* กราฟ Plotly */}
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: color, size: 6 },
            line: { shape: "spline" },
            name: title,
            hovertemplate:
              `<b>${title}</b><br>` +
              `📅 วันที่: %{x|%d/%m/%Y}<br>` +
              `🕒 เวลาเฉลี่ย: %{x|%H:%M} - %{x|%H:%M+30m}<br>` +
              `📊 ค่าเฉลี่ย: <b>%{y} ${unit}</b><br>` +
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
          xaxis: { title: "เวลา", type: "date" },
          yaxis: {
            title: `${title} (${unit})`,
            range: [actualMinValue - 10, actualMaxValue + 10],
          },
          height: 300,
          hovermode: "x unified",
        }}
        useResizeHandler
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default SensorGraph;
