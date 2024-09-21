import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './styles.css'; 

function MyLineChart({ data }) {
  return (
    <div className="line-chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" stroke="#666" />
          <YAxis stroke="#666" label={{ value: 'Thu nhập', angle: -90, position: 'insideLeft', offset: 0, dx: 4 }} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '5px', border: 'none' }} />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#ff7300" strokeWidth={2} activeDot={{ r: 8 }} name="Thu nhập" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MyLineChart;
