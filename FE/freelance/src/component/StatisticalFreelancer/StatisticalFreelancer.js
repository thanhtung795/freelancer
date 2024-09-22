import React from "react";
import PieChart from "./StatisticalFreelancerChart/PieChart/PieChart";
import MyLineChart from "./StatisticalFreelancerChart/LineChart/LineChart";
import MyRadialBarChart from "./StatisticalFreelancerChart/RadialBarChart/RadialBarChart";
import MyAreaChart from "./StatisticalFreelancerChart/AreaChart/AreaChart";
import MyComposedChart from "./StatisticalFreelancerChart/ComposedChart/ComposedChart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const pieChartData = [
  { name: 'Công việc hoàn thành', value: 120 },
  { name: 'Công việc đang làm', value: 30 },
  { name: 'Chờ đánh giá', value: 15 },
  { name: 'Công việc bị hủy', value: 5 },
];

const lineChartData = [
  { name: 'Tháng 1', income: 500 },
  { name: 'Tháng 2', income: 800 },
  { name: 'Tháng 3', income: 1200 },
  { name: 'Tháng 4', income: 950 },
  { name: 'Tháng 5', income: 1100 },
  { name: 'Tháng 6', income: 1350 },
  { name: 'Tháng 7', income: 1400 },
  { name: 'Tháng 8', income: 1600 },
  { name: 'Tháng 9', income: 1500 },
  { name: 'Tháng 10', income: 1700 },
  { name: 'Tháng 11', income: 1800 },
  { name: 'Tháng 12', income: 2000 },
];

const radialBarChartData = [
  { name: 'Đánh giá 5 sao', value: 80, total: 100, fill: '#8884d8' },
  { name: 'Đánh giá 4 sao', value: 15, total: 100, fill: '#83a6ed' },
  { name: 'Đánh giá 3 sao', value: 4, total: 100, fill: '#8dd1e1' },
  { name: 'Đánh giá 2 sao', value: 1, total: 100, fill: '#82ca9d' },
  { name: 'Đánh giá 1 sao', value: 0, total: 100, fill: '#ffc658' },
];


const areaChartData = [
  { name: 'Tháng 1', completed: 5, inProgress: 3 },
  { name: 'Tháng 2', completed: 6, inProgress: 4 },
  { name: 'Tháng 3', completed: 8, inProgress: 5 },
  { name: 'Tháng 4', completed: 7, inProgress: 6 },
  { name: 'Tháng 5', completed: 9, inProgress: 6 },
  { name: 'Tháng 6', completed: 11, inProgress: 7 },
  { name: 'Tháng 7', completed: 10, inProgress: 8 },
  { name: 'Tháng 8', completed: 12, inProgress: 9 },
  { name: 'Tháng 9', completed: 15, inProgress: 10 },
  { name: 'Tháng 10', completed: 14, inProgress: 11 },
  { name: 'Tháng 11', completed: 16, inProgress: 12 },
  { name: 'Tháng 12', completed: 18, inProgress: 14 },
];

const composedChartData = [
  { name: 'Tháng 1', income: 500, expense: 300, profit: 200 },
  { name: 'Tháng 2', income: 800, expense: 400, profit: 400 },
  { name: 'Tháng 3', income: 1200, expense: 500, profit: 700 },
  { name: 'Tháng 4', income: 950, expense: 450, profit: 500 },
  { name: 'Tháng 5', income: 1100, expense: 600, profit: 500 },
  { name: 'Tháng 6', income: 1350, expense: 700, profit: 650 },
  { name: 'Tháng 7', income: 1400, expense: 750, profit: 650 },
  { name: 'Tháng 8', income: 1600, expense: 800, profit: 800 },
  { name: 'Tháng 9', income: 1500, expense: 600, profit: 900 },
  { name: 'Tháng 10', income: 1700, expense: 700, profit: 1000 },
  { name: 'Tháng 11', income: 1800, expense: 800, profit: 1000 },
  { name: 'Tháng 12', income: 2000, expense: 900, profit: 1100 },
];

const StatisticalFreelancer = () => (
  <div className="my-container">
    <div className="row">
      <div className="col-12">
        <div className="border border-secondary rounded overflow-auto p-3 chart-container">
          <h5 className="chart-title py-4">Thống kê công việc</h5>
          <PieChart data={pieChartData} />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-md-6 mb-4">
        <div className="border border-secondary rounded overflow-auto p-3 chart-container">
          <h5 className="chart-title py-4">Đánh giá của khách hàng</h5>
          <MyRadialBarChart data={radialBarChartData} />
        </div>
      </div>
      <div className="col-12 col-md-6 mb-4">
        <div className="border border-secondary rounded overflow-auto p-3 chart-container">
          <h5 className="chart-title py-4">Số lượng dự án theo thời gian</h5>
          <MyAreaChart data={areaChartData} />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-md-6 mb-4">
        <div className="border border-secondary rounded overflow-auto p-3 chart-container">
          <h5 className="chart-title py-4">Thu nhập và chi phí</h5>
          <MyComposedChart data={composedChartData} />
        </div>
      </div>
      <div className="col-12 col-md-6 mb-4">
        <div className="border border-secondary rounded overflow-auto p-3 chart-container">
          <h5 className="chart-title py-4">Thu nhập theo tháng</h5>
          <MyLineChart data={lineChartData} />
        </div>
      </div>
    </div>
  </div>
);

export default StatisticalFreelancer;
