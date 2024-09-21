import React from "react";
import {
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import './styles.css'; 

const MyComposedChart = ({ data }) => (
  <div className="composed-chart-container">
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" stroke="#666"  />
        <YAxis stroke="#666" label={{ value: 'Số tiền', angle: -90, position: 'insideLeft', offset: 0,dx: 10 }} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '5px', border: 'none' }} />
        <Legend />
        <Area type="monotone" dataKey="profit" fill="#8884d8" stroke="#8884d8" name="Lợi nhuận" />
        <Bar dataKey="expense" barSize={20} fill="#413ea0" name="Chi phí" />
        <Line type="monotone" dataKey="income" stroke="#ff7300" name="Thu nhập" />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

export default MyComposedChart;
