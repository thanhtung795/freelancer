import React, { useState } from "react";
import { Table, Select, Row, Col, Button, Modal } from "antd";

const { Option } = Select;

const ProjectManagement = ({ projectData = [] }) => {
  const [statusFilter, setStatusFilter] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  const handleDetailClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const filteredData = projectData.filter((project) => {
    const matchesStatus =
      statusFilter !== null ? project.status === statusFilter : true;
    return matchesStatus;
  });

  const columns = [
    {
      title: "Tên Dự Án",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (a, b) => a.projectName.localeCompare(b.projectName),
    },
    {
      title: "Quản Lý",
      dataIndex: "manager",
      key: "manager",
      sorter: (a, b) => a.manager.localeCompare(b.manager),
    },
    {
      title: "Ngày Bắt Đầu",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
    },
    {
      title: "Ngày Kết Thúc",
      dataIndex: "endDate",
      key: "endDate",
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Chi tiết",
      key: "detail",
      render: (text, project) => (
        <Button type="primary" onClick={() => handleDetailClick(project)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="project-management-container">
      <Row gutter={16} style={{ marginBottom: "16px" }}>
        <Col span={8}>
          <Select
            placeholder="Chọn trạng thái"
            style={{ width: "100%" }}
            onChange={handleStatusChange}
            allowClear
          >
            <Option value="In Progress">Đang hoạt động</Option>
            <Option value="Completed">Hoàn thành</Option>
            <Option value="Pending">Chưa hoàn thành</Option>
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
        title="Chi tiết dự án"
        visible={!!selectedProject}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedProject && (
          <div>
            <p>
              <strong>Tên Dự Án:</strong> {selectedProject.projectName}
            </p>
            <p>
              <strong>Quản Lý:</strong> {selectedProject.manager}
            </p>
            <p>
              <strong>Ngày Bắt Đầu:</strong> {selectedProject.startDate}
            </p>
            <p>
              <strong>Ngày Kết Thúc:</strong> {selectedProject.endDate}
            </p>
            <p>
              <strong>Trạng Thái:</strong> {selectedProject.status}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProjectManagement;
