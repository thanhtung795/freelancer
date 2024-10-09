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

const UserManagement = ({ setUserData, userData = [] }) => {
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/accounts/skills/users");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserData(data.data);
    } catch (error) {
      openNotification("error", "Thất bại", `Lỗi khi lấy dữ liệu: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchUsers();
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
      await fetch(
        `http://localhost:8080/api/auth/changeStatus/${user.accountId}?status=${newStatus}`,
        { method: "GET" }
      );

      openNotification("success", "Thành công", `Trạng thái người dùng ${newStatus ? "được kích hoạt" : "được khóa"} thành công.`);
      fetchUsers();
    } catch (error) {
      openNotification("error", "Lỗi", "Có lỗi xảy ra khi thay đổi trạng thái người dùng.");
    }
  };

  const handleChangePassword = async () => {
    if (selectedUser) {
      const updatedAccount = {
        ...selectedUser,
        password: newPassword,
      };

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
        openNotification("success", "Thành công", "Mật khẩu đã được đổi thành công.");
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
    return skillsFilter.length === 0 || skillsFilter.every((skill) => user.skills.includes(skill));
  });

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
            <span key={index} className="skill-badge">{skill}</span>
          ))}
        </>
      ),
    },
    {
      title: "Mức lương theo giờ",
      dataIndex: "hourlyRate",
      key: "hourlyRate",
      render: (rate) => `$${rate.toFixed(2)}`,
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
          <Button type="primary" onClick={exportToExcel} style={{ marginRight: 8 }}>
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
        rowKey="accountId"
      />

      <Modal
        title="Chi tiết người dùng"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Huỷ
          </Button>,
          <Button key="submit" type="primary" onClick={handleChangePassword}>
            Lưu mật khẩu mới
          </Button>,
        ]}
      >
        {selectedUser && (
          <div>
            <p><strong>Họ và Tên:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Số điện thoại:</strong> {selectedUser.phoneNumber}</p>
            <p><strong>Địa chỉ:</strong> {selectedUser.address}</p>
            <p><strong>Kỹ năng:</strong> {selectedUser.skills.join(", ")}</p>
            <p><strong>Mức lương theo giờ:</strong> ${selectedUser.hourlyRate}</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Input.Password
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ marginRight: 8, width: "calc(100% - 30px)" }}
                disabled={!isEditingPassword}
              />
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsEditingPassword(!isEditingPassword)}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;
