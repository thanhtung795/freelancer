import React, { useState } from "react";
import { Table, Select, Row, Col, Button, Modal } from "antd"; 
import "./UserManagement.css";

const { Option } = Select;

const UserManagement = ({ userData = [] }) => {
  const [ratingFilter, setRatingFilter] = useState(null);
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 

  const handleRatingChange = (value) => {
    setRatingFilter(value);
  };

  const handleSkillsChange = (value) => {
    setSkillsFilter(value);
  };

  const handleDetailClick = (user) => {
    setSelectedUser(user); // Lưu người dùng đã chọn vào state
  };

  const handleCloseModal = () => {
    setSelectedUser(null); // Đóng modal
  };

  const filteredData = userData.filter(user => {
    const matchesRating = ratingFilter !== null ? user.rating === ratingFilter : true;
    const matchesSkills = skillsFilter.length > 0 ? skillsFilter.every(skill => user.skills.includes(skill)) : true;
    return matchesRating && matchesSkills;
  });

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
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
        <Col span={8}>
          <Select
            placeholder="Chọn xếp hạng"
            style={{ width: "100%" }}
            onChange={handleRatingChange}
            allowClear
          >
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
            <Option value={5}>5</Option>
          </Select>
        </Col>
        <Col span={16}>
          <Select
            mode="multiple"
            placeholder="Chọn kỹ năng"
            style={{ width: "100%" }}
            onChange={handleSkillsChange}
            allowClear
          >
            <Option value="React">React</Option>
            <Option value="Node.js">Node.js</Option>
            <Option value="JavaScript">JavaScript</Option>
            <Option value="CSS">CSS</Option>
            <Option value="HTML">HTML</Option>
          </Select>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        style={{ width: "100%", marginTop: "20px" }} 
      />

      <Modal
        title="Chi tiết người dùng"
        visible={!!selectedUser}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedUser && (
          <div>
            <p><strong>Tên:</strong> {selectedUser.name}</p>
            <p><strong>Tuổi:</strong> {selectedUser.age}</p>
            <p><strong>Địa chỉ:</strong> {selectedUser.address}</p>
            <p><strong>Kỹ năng:</strong> {selectedUser.skills.join(", ")}</p>
            <p><strong>Xếp hạng:</strong> {selectedUser.rating}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;
