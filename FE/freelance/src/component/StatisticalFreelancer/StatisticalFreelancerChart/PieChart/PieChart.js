import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './styles.css'; // Import CSS file for additional styling

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MyPieChart = ({ data }) => {
  return (
    <div className="pie-chart-container">
      <PieChart width={800} height={400}>
        <Pie
          data={data}
          cx={400}
          cy={200}
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" align="center" />
      </PieChart>
    </div>
  );
};

export default MyPieChart;
