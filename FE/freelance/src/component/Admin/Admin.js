import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import UserManagement from "./UserManagement/UserManagement";
import ProjectManagement from "./ProjectManagement/ProjectManagement";
import Statistics from './Statistics/Statistics';
import Home from "./Home/Home";

const { Sider, Content } = Layout;

const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState("1");
  const [userData, setUserData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/auth/accounts/skills/users");
        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/Jobs/getAllJobName");
        const data = await response.json();
        setProjectData(data.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, []);



  


  const handleMenuClick = (key) => {
    setSelectedMenu(key);
  };

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
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <>
              {selectedMenu === "1" && <Home />}
              {selectedMenu === "2" && <UserManagement setUserData={setUserData} userData={userData} />}
              {selectedMenu === "3" && <ProjectManagement setProjectData={setProjectData} projectData={projectData} />}
              {selectedMenu === "4" && <Statistics userData={userData} projectData={projectData} />}
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
