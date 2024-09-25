import React, { useState } from "react";
import { Layout, Menu } from "antd";
import UserManagement from "./UserManagement/UserManagement";
import ProjectManagement from "./ProjectManagement/ProjectManagement";
import Statistics from './Statistics/Statistics';
import Home from "./Home/Home";

const { Sider, Content } = Layout;

const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState("1");

  const handleMenuClick = (key) => {
    setSelectedMenu(key);
  };

  const userData = [
    { key: '1', name: 'John Doe', age: 32, address: '10 Downing Street', skills: ['React', 'Node.js'], createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000, role: 'freelancer' },
    { key: '2', name: 'Jane Doe', age: 28, address: '20 Downing Street', skills: ['React', 'Node.js'], createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000, role: 'client' },
    { key: '3', name: 'Jim Green', age: 42, address: '30 Downing Street', skills: ['React', 'Node.js'], createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000, role: 'freelancer' },
    { key: '4', name: 'Joe Black', age: 32, address: '40 Downing Street', skills: ['React', 'Node.js'], createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000, role: 'client' },
    { key: '5', name: 'John Smith', age: 36, address: '50 Downing Street', skills: ['React', 'Node.js'], createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000, role: 'freelancer' },
    { key: '6', name: 'James Bond', age: 35, address: '60 Downing Street', skills: ['React', 'Node.js'], createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, role: 'client' },
  ];

  const projectData = [
    { key: '1', projectName: 'Project Alpha', manager: 'John Doe', startDate: '2024-01-01', endDate: '2024-06-30', status: 'In Progress', createdAt: new Date('2024-01-15').getTime() },
    { key: '2', projectName: 'Project Beta', manager: 'Jane Doe', startDate: '2024-02-01', endDate: '2024-08-15', status: 'Completed', createdAt: new Date('2024-02-15').getTime() },
    { key: '3', projectName: 'Project Gamma', manager: 'Jim Green', startDate: '2024-03-01', endDate: '2024-09-30', status: 'Pending', createdAt: new Date('2024-03-15').getTime() },
    { key: '4', projectName: 'Project Delta', manager: 'Joe Black', startDate: '2024-04-01', endDate: '2024-10-15', status: 'In Progress', createdAt: new Date('2024-04-15').getTime() },
  ];

  const userColumns = [
    { title: 'Tên', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: 'Tuổi', dataIndex: 'age', key: 'age', sorter: (a, b) => a.age - b.age },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address', sorter: (a, b) => a.address.localeCompare(b.address) },
  ];

  const projectColumns = [
    { title: 'Tên Dự Án', dataIndex: 'projectName', key: 'projectName', sorter: (a, b) => a.projectName.localeCompare(b.projectName) },
    { title: 'Quản Lý', dataIndex: 'manager', key: 'manager', sorter: (a, b) => a.manager.localeCompare(b.manager) },
    { title: 'Ngày Bắt Đầu', dataIndex: 'startDate', key: 'startDate', sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate) },
    { title: 'Ngày Kết Thúc', dataIndex: 'endDate', key: 'endDate', sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate) },
    { title: 'Trạng Thái', dataIndex: 'status', key: 'status', sorter: (a, b) => a.status.localeCompare(b.status) },
  ];

  return (
    <Layout style={{ height: "600px" }}>
      <Sider width={200} style={{ left: 0, top: 0, height: "600px", background: "#fff" }}>
        <Menu mode="inline" defaultSelectedKeys={["1"]} style={{ height: "100%", borderRight: 0 }} onClick={({ key }) => handleMenuClick(key)}>
          <Menu.Item key="1">Trang chủ</Menu.Item>
          <Menu.Item key="2">Quản lý người dùng</Menu.Item>
          <Menu.Item key="3">Quản lý dự án</Menu.Item>
          <Menu.Item key="4">Thống kê</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: "20px", height: "calc(100vh - 64px)", overflowY: "auto" }}>
          {selectedMenu === "1" && <Home />}
          {selectedMenu === "2" && <UserManagement userData={userData} />}
          {selectedMenu === "3" && <ProjectManagement projectData={projectData} />}
          {selectedMenu === "4" && <Statistics userData={userData} projectData={projectData} />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
