import React, { useState, useEffect } from "react";
import {
  Table,
  Select,
  Row,
  Col,
  Button,
  Modal,
  Popconfirm,
  Input,
  notification,
  Tabs,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./UserManagement.css";

const openNotification = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
    placement: "topRight",
  });
};

const { Option } = Select;
const { TabPane } = Tabs;

const UserManagement = ({ setUserData, userData = [] }) => {
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [clients, setClients] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/accounts/skills/users"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserData(data.data);
    } catch (error) {
      openNotification(
        "error",
        "Thất bại",
        `Lỗi khi lấy dữ liệu: ${error.message}`
      );
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/clients/with-company"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log('data ', data.data)
      setClients(data.data);
    } catch (error) {
      openNotification(
        "error",
        "Thất bại",
        `Lỗi khi lấy dữ liệu khách hàng: ${error.message}`
      );
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchClients();
  }, []);

  const handleDetailClick = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    setNewPassword("");
    setIsEditingPassword(false);
  };

  const handleConfirmStatusChange = async (user) => {
    try {
      const newStatus = !user.status;
      console.log('user ', user)
      await fetch(
        `http://localhost:8080/api/auth/changeStatus/${user.accountId || user.clientId}?status=${newStatus}`,
        { method: "GET" }
      );

      openNotification(
        "success",
        "Thành công",
        `Trạng thái người dùng ${
          newStatus ? "được kích hoạt" : "được khóa"
        } thành công.`
      );
      fetchUsers();
      fetchClients();
    } catch (error) {
      openNotification(
        "error",
        "Lỗi",
        "Có lỗi xảy ra khi thay đổi trạng thái người dùng."
      );
    }
  };

  const handleChangePassword = async () => {
    if (selectedUser) {
      const updatedAccount = { ...selectedUser, password: newPassword };

      try {
        const response = await fetch(
          `http://localhost:8080/api/auth/accounts/${selectedUser.accountId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAccount),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update password");
        }

        handleCloseModal();
        openNotification(
          "success",
          "Thành công",
          "Mật khẩu đã được đổi thành công."
        );
      } catch (error) {
        openNotification("error", "Lỗi", "Có lỗi xảy ra khi đổi mật khẩu.");
      }
    }
  };

  const exportToExcel = () => {
    const link = document.createElement("a");
    link.href = "http://localhost:8080/api/auth/download/accounts/excel";
    link.setAttribute("download", "Users.xlsx");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const exportToPdf = () => {
    const link = document.createElement("a");
    link.href = "http://localhost:8080/api/auth/download/accounts/pdf";
    link.setAttribute("download", "Users.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const filteredData = userData.filter((user) => {
    return (
      skillsFilter.length === 0 ||
      skillsFilter.every((skill) => user.skills.includes(skill))
    );
  });

  const clientColumns = [
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, client) => `${client.firstName} ${client.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Công ty",
      dataIndex: "company",
      key: "company",
      render: (company) => company?.companyName || "Chưa có",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, client) => (
        <>
          <Button type="primary" onClick={() => handleDetailClick(client)}>
            Xem chi tiết
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn thay đổi trạng thái?"
            onConfirm={() => handleConfirmStatusChange(client)}
            okText="Có"
            cancelText="Không"
          >
            {/* <Button type="default">
              {client.status ? "Khóa" : "Kích hoạt"}
            </Button> */}
          </Popconfirm>
        </>
      ),
    },
  ];

  const columns = [
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, user) => `${user.firstName} ${user.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Kỹ năng",
      dataIndex: "skills",
      key: "skills",
      render: (skills) => (
        <>
          {skills.map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill}
            </span>
          ))}
        </>
      ),
    },
    {
      title: "Mức lương theo giờ",
      dataIndex: "hourlyRate",
      key: "hourlyRate",
      render: (rate) => (rate ? `$${rate.toFixed(2)}` : "Chưa có"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Đang hoạt động" : "Bị khóa"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, user) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn thay đổi trạng thái?"
          onConfirm={() => handleConfirmStatusChange(user)}
          okText="Có"
          cancelText="Không"
        >
          <Button type="default">{user.status ? "Khóa" : "Kích hoạt"}</Button>
        </Popconfirm>
      ),
    },
    {
      title: "Chi tiết",
      key: "detail",
      render: (text, user) => (
        <Button type="primary" onClick={() => handleDetailClick(user)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="user-management-container">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Người dùng freelancer" key="1">
          <Row gutter={16} style={{ marginBottom: "16px" }}>
            <Col span={16}>
              <Select
                mode="multiple"
                placeholder="Chọn kỹ năng"
                style={{ width: "100%" }}
                onChange={setSkillsFilter}
                allowClear
              >
                <Option value="Java">Java</Option>
                <Option value="JavaScript">JavaScript</Option>
                <Option value="HTML/CSS">HTML/CSS</Option>
              </Select>
            </Col>
            <Col span={8}>
              <Button
                type="primary"
                onClick={exportToExcel}
                style={{ marginRight: 8 }}
              >
                Xuất Excel
              </Button>
              <Button type="default" onClick={exportToPdf}>
                Xuất PDF
              </Button>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 5 }}
            style={{ width: "100%", marginTop: "20px" }}
          />
        </TabPane>
        <TabPane tab="Khách hàng" key="2">
          <Table
            columns={clientColumns}
            dataSource={clients}
            pagination={{ pageSize: 5 }}
            style={{ width: "100%", marginTop: "20px" }}
          />
        </TabPane>
      </Tabs>

      <Modal
        title="Chi tiết người dùng"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
      >
        <Row gutter={16}>
          <Col span={12}>
            <h4>Tên:</h4>
            <p>
              {selectedUser?.firstName} {selectedUser?.lastName}
            </p>
          </Col>
          <Col span={12}>
            <h4>Email:</h4>
            <p>{selectedUser?.email}</p>
          </Col>
          <Col span={12}>
            <h4>Địa chỉ:</h4>
            <p>{selectedUser?.address || "Chưa có"}</p>
          </Col>
          <Col span={12}>
            <h4>Số điện thoại:</h4>
            <p>{selectedUser?.phoneNumber}</p>
          </Col>

          {selectedUser?.role === "freelancer" && ( 
            <>
              <Col span={12}>
                <h4>Kỹ năng:</h4>
                <p>{selectedUser?.skills.join(", ")}</p>
              </Col>
              <Col span={12}>
                <h4>Mức lương theo giờ:</h4>
                <p>
                  {selectedUser?.hourlyRate
                    ? `$${selectedUser.hourlyRate.toFixed(2)}`
                    : "Chưa có"}
                </p>
              </Col>
            </>
          )}

          {selectedUser?.role === "client" && ( 
            <Col span={12}>
              <h4>Tên công ty:</h4>
              <p>{selectedUser?.company?.companyName || "Chưa có"}</p>
            </Col>
          )}

        

          <Col span={12}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsEditingPassword(true)}
            >
              Đổi mật khẩu
            </Button>
          </Col>
        </Row>

        {isEditingPassword && (
          <div style={{ marginTop: "20px" }}>
            <Input.Password
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: "300px", marginBottom: "10px" }}
            />
            <Button type="primary" onClick={handleChangePassword}>
              Lưu
            </Button>
            <Button
              type="default"
              onClick={handleCloseModal}
              style={{ marginLeft: "10px" }}
            >
              Hủy
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;
