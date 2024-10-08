import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faUser, faProjectDiagram, faChartPie, faChartLine } from "@fortawesome/free-solid-svg-icons"; 

const { Option } = Select;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Statistics = ({ projectData = [], userData = [] }) => {
  const [timePeriod, setTimePeriod] = useState("week");

  const handleTimeChange = (value) => {
    setTimePeriod(value);
  };

  const getUserStats = () => {
    const stats = {
      week: userData.filter(
        (user) => new Date(user.createdAt) >= Date.now() - 7 * 24 * 60 * 60 * 1000
      ).length,
      month: userData.filter(
        (user) => new Date(user.createdAt) >= Date.now() - 30 * 24 * 60 * 60 * 1000
      ).length,
      year: userData.filter(
        (user) => new Date(user.createdAt) >= Date.now() - 365 * 24 * 60 * 60 * 1000
      ).length,
    };
    return stats[timePeriod];
  };

  const getJobStats = () => {
    const stats = {
      week: projectData.filter(
        (job) => new Date(job.dateCreate) >= Date.now() - 7 * 24 * 60 * 60 * 1000
      ).length,
      month: projectData.filter(
        (job) => new Date(job.dateCreate) >= Date.now() - 30 * 24 * 60 * 60 * 1000
      ).length,
      year: projectData.filter(
        (job) => new Date(job.dateCreate) >= Date.now() - 365 * 24 * 60 * 60 * 1000
      ).length,
    };
    return stats[timePeriod];
  };

  const getFreelancerClientStats = () => {
    return {
      freelancers: userData.filter((user) => user.role === "freelancer").length,
      clients: userData.filter((user) => user.role === "client").length,
    };
  };

  const userStats = getUserStats();
  const jobStats = getJobStats();
  const { freelancers, clients } = getFreelancerClientStats();

  const data = [
    { name: "Freelancers", value: freelancers },
    { name: "Clients", value: clients },
  ];

  const lineChartData = projectData.reduce((acc, job) => {
    const date = new Date(job.dateCreate).toLocaleDateString();
    const existing = acc.find((entry) => entry.date === date);

    if (existing) {
      existing.jobCount += 1;
    } else {
      acc.push({ date, jobCount: Math.floor(Math.random() * (5 - 10 + 1)) + 5});
    }
    return acc;
  }, []);

  return (
    <div>
      <h2>Thống Kê</h2>
      <Select
        defaultValue="week"
        style={{ width: 120 }}
        onChange={handleTimeChange}
      >
        <Option value="week">Tuần</Option>
        <Option value="month">Tháng</Option>
        <Option value="year">Năm</Option>
      </Select>
      
      <Card style={{ marginTop: 20 }}>
        <h3>
          <FontAwesomeIcon icon={faUser} style={{ marginRight: 8 }} />
          Số lượng người sử dụng: {userStats}
        </h3>
        <h3>
          <FontAwesomeIcon icon={faProjectDiagram} style={{ marginRight: 8 }} />
          Số lượt đăng job: {jobStats}
        </h3>
      </Card>

      <Card style={{ marginTop: 20 }}>
        <h3>
          <FontAwesomeIcon icon={faChartPie} style={{ marginRight: 8 }} />
          Thống kê Freelancer và Client
        </h3>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={({ name }) => name}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Card>

      <Card style={{ marginTop: 20 }}>
        <h3>
          <FontAwesomeIcon icon={faChartLine} style={{ marginRight: 8 }} />
          Thống kê số lượng job theo thời gian
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineChartData}> 
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="jobCount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Statistics;
