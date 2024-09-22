  import React from "react";
  import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  import "./styles.css";

  function MyAreaChart({ data }) {
    return (
      <div className="area-chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" label={{ value: 'Số lượng dự án', angle: -90, position: 'insideLeft',dx: 20 }} />
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                border: "none",
              }}
              formatter={(value, name) => {
                const label = name === 'completed' ? 'Hoàn thành' : 'Đang làm';
                return [value, label];
              }}
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="inProgress"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  export default MyAreaChart;
