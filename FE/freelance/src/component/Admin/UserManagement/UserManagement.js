import React, { useState } from "react";
import {
  Table,
  Select,
  Row,
  Col,
  Button,
  Modal,
  Popconfirm,
  Input,
} from "antd";
import { CodeSandboxCircleFilled, EditOutlined } from "@ant-design/icons";
import "./UserManagement.css";
import { notification } from "antd";
import { ToastContainer } from "react-bootstrap";
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
  const [statusChangeUser, setStatusChangeUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const handleSkillsChange = (value) => {
    setSkillsFilter(value);
  };

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
  const handleConfirmStatusChange = async () => {
    if (statusChangeUser) {
      statusChangeUser.status = !statusChangeUser.status;
      console.log("new status ", statusChangeUser.status);
      try {
        await fetch(
          `http://localhost:8080/api/auth/changeStatus/${statusChangeUser.accountId}?status=${statusChangeUser.status}`,
          {
            method: "GET",
          }
        ).then(async (result) => {
          if (result.status == 200) {
            const response = await fetch(
              "http://localhost:8080/api/auth/accounts/skills/users"
            )
              .then((result) => result.json())
              .then((data) => {
                openNotification(
                  "success",
                  "Thành công",
                  `Trạng thái người dùng ${
                    statusChangeUser.status ? "được kích hoạt" : "được khóa"
                  } thành công.`
                );
                console.log('new data ', data.data)
                setUserData(data.data);
                handleCloseModal();
              });
          }
        });
      } catch (error) {
        console.error("Error changing status:", error);
        openNotification(
          "error",
          "Lỗi",
          "Có lỗi xảy ra khi thay đổi trạng thái người dùng."
        );
      }
    }
  };

  // const handleChangePassword = async () => {
  //   if (selectedUser) {
  //     try {
  //       await fetch(`http://localhost:8080/api/auth/changePassword/${selectedUser.accountId}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ password: newPassword }),
  //       });
  //       handleCloseModal();
  //     } catch (error) {
  //       console.error("Error changing password:", error);
  //     }
  //   }
  // };

  const handleChangePassword = async () => {
    if (selectedUser) {
      const updatedAccount = {
        id: selectedUser.accountId,
        email: selectedUser.email,
        password: newPassword,
        role: selectedUser.role,
        status: selectedUser.status,
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
        openNotification(
          "success",
          "Thành công",
          "Mật khẩu đã được đổi thành công."
        );
      } catch (error) {
        console.error("Error changing password:", error);
        openNotification("error", "Lỗi", "Có lỗi xảy ra khi đổi mật khẩu.");
      }
    }
  };

  const filteredData = userData.filter((user) => {
    const matchesSkills =
      skillsFilter.length > 0
        ? skillsFilter.every((skill) => user.skills.includes(skill))
        : true;
    return matchesSkills;
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
          onConfirm={async () => {
            setStatusChangeUser(user);
            await handleConfirmStatusChange();
          }}
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
            onChange={handleSkillsChange}
            allowClear
          >
            <Option value="Java">Java</Option>
            <Option value="JavaScript">JavaScript</Option>
            <Option value="HTML/CSS">HTML/CSS</Option>
          </Select>
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
            <p>
              <strong>Họ và Tên:</strong> {selectedUser.firstName}{" "}
              {selectedUser.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {selectedUser.phoneNumber}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {selectedUser.address}
            </p>
            <p>
              <strong>Kỹ năng:</strong> {selectedUser.skills.join(", ")}
            </p>
            <p>
              <strong>Mức lương theo giờ:</strong> ${selectedUser.hourlyRate}
            </p>
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
      <ToastContainer />
    </div>
  );
};

export default UserManagement;
