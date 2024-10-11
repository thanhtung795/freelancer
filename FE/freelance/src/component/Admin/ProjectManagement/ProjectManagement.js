import React, { useState, useEffect } from "react";
import { Table, Select, Button, Modal, message } from "antd";

const { Option } = Select;

const ProjectManagement = ({ setProjectData, projectData = [] }) => {
  const [statusFilter, setStatusFilter] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/Jobs/getAllJobName");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('project ', data)
      setProjectData(data.data);
    } catch (error) {
      message.error(`Lỗi khi lấy dữ liệu: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleStatusChange = async (value, projectId) => {
    // setStatusFilter(value);
    try {
      const response = await fetch(`http://localhost:8080/api/Jobs/changeStatus/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: value }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      message.success(`Trạng thái đã được cập nhật thành công`);
      fetchProjects();
    } catch (error) {
      message.error(`Cập nhật trạng thái thất bại: ${error.message}`);
    }
  };

  const handleDetailClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const filteredData = projectData.filter((project) => {
    const matchesStatus = statusFilter ? project.status === statusFilter : true;
    return matchesStatus;
  });

  const columns = [
    {
      title: "Tên Công Việc",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Quản Lý",
      dataIndex: "clientName",
      key: "clientName",
      sorter: (a, b) => a.clientName.localeCompare(b.clientName),
    },
    {
      title: "Ngày Bắt Đầu",
      dataIndex: "dateStart",
      key: "dateStart",
      sorter: (a, b) => new Date(a.dateStart) - new Date(b.dateStart),
    },
    {
      title: "Ngày Kết Thúc",
      dataIndex: "dateEnd",
      key: "dateEnd",
      sorter: (a, b) => new Date(a.dateEnd) - new Date(b.dateEnd),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text, project) => (
        <Select
          defaultValue={text}
          style={{ width: "100%" }}
          onChange={(value) => handleStatusChange(value, project.id)}
          allowClear
        >
          <Option value="Đang thực hiện">Đang thực hiện</Option>
          <Option value="Hoàn thành">Hoàn thành</Option>
          <Option value="Chờ xử lý">Chờ xử lý</Option>
          <Option value="Hủy bỏ">Hủy bỏ</Option>
        </Select>
      ),
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
              <strong>Tên Công Việc:</strong> {selectedProject.title}
            </p>
            <p>
              <strong>Quản Lý:</strong> {selectedProject.clientName}
            </p>
            <p>
              <strong>Ngày Bắt Đầu:</strong> {new Date(selectedProject.dateStart).toLocaleString()}
            </p>
            <p>
              <strong>Ngày Kết Thúc:</strong> {new Date(selectedProject.dateEnd).toLocaleString()}
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
