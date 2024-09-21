import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import './styles.css'; 

function MyRadialBarChart({ data }) {
  return (
    <div className="radial-chart-container">
      <RadialBarChart
        width={500}
        height={250}
        innerRadius="10%"
        outerRadius="80%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar
          minAngle={15}
          label={{ fill: '#333', position: 'insideStart', fontSize: '16px', fontWeight: '400' }} 
          background
          clockWise={true}
          dataKey="value"
          name='Đánh giá'

        />
        <Legend
          iconSize={10}
          width={120}
          height={140}
          layout="vertical"
          verticalAlign="top"
          align="right"
          wrapperStyle={{ fontSize: '16px', color: '#555' }} 
        />
        <Tooltip />
      </RadialBarChart>
    </div>
  );
}

export default MyRadialBarChart;
