import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  List,
  Card,
  Button,
  Popconfirm,
  message,
  Pagination,
  Tabs,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faArchive } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const { TabPane } = Tabs;

const ListJobApplied = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const idRole = parseInt(
          JSON.parse(localStorage.getItem("user")).data.idRole,
          10
        );
        const response = await fetch(
          `http://localhost:8080/api/freelancers/JobsOfFreelancer/${idRole}`
        );
        const data = await response.json();
        const filteredJobs = data.data.jobs || [];
        setJobs(filteredJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = (title) => {
    message.success(`Job "${title}" has been deleted.`);
  };

  const handleArchive = (title) => {
    message.success(`Job "${title}" has been archived.`);
  };

  const handleEdit = (title) => {
    message.info(`Editing job "${title}".`);
  };

  const handleViewDetails = (jobId) => {
    navigate(`/job-detail/${jobId}`);
  };

  const handleCancelApplication = async (job) => {
    try {
      const response = await fetch(`http://localhost:8080/api/jobs/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Đã hủy" }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel application");
      }

      const updatedJobs = jobs.map((j) =>
        j.id === job.id ? { ...j, status: "Đã hủy" } : j
      );
      setJobs(updatedJobs);
      message.success(`Đã hủy ứng tuyển công việc "${job.title}"`);
    } catch (error) {
      message.error(`Không thể hủy ứng tuyển: ${error.message}`);
    }
  };

  const filterJobsByStatus = (status) => {
    if (status === "all") {
      return jobs;
    }
    return jobs.filter((job) => job.status === status);
  };

  const displayedJobs = filterJobsByStatus(activeTab).slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Row gutter={16} className="my-container mx-auto my-4">
      <Col span={18}>
        <Tabs defaultActiveKey="all" onChange={setActiveTab}>
          <TabPane tab="Tất cả" key="all">
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={displayedJobs}
              renderItem={(job) => (
                <List.Item>
                  <Card title={job.title} className="job-card">
                    <p>
                      <strong>Lương: </strong> {job.fromPrice} - {job.toPrice}
                    </p>
                    <p>
                      <strong>Thời gian làm việc: </strong> {job.hourWork} hours
                    </p>
                    <p>
                      <strong>Trạng thái: </strong> {job.status}
                    </p>
                    <p>
                      <strong>Họ và tên: </strong>{" "}
                      {job.firstName + " " + job.lastName}
                    </p>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#1890ff",
                        borderColor: "#1890ff",
                      }}
                      onClick={() => handleViewDetails(job.id)}
                    >
                      Xem Chi Tiết
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Đang thực hiện" key="Đang thực hiện">
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={filterJobsByStatus("Đang thực hiện").slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )}
              renderItem={(job) => (
                <List.Item>
                  <Card title={job.title} className="job-card">
                    <p>
                      <strong>Lương: </strong> {job.fromPrice} - {job.toPrice}
                    </p>
                    <p>
                      <strong>Thời gian làm việc: </strong> {job.hourWork} hours
                    </p>
                    <p>
                      <strong>Trạng thái: </strong> {job.status}
                    </p>
                    <p>
                      <strong>Họ và tên: </strong>{" "}
                      {job.firstName + " " + job.lastName}
                    </p>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#1890ff",
                        borderColor: "#1890ff",
                      }}
                      onClick={() => handleViewDetails(job.id)}
                    >
                      Xem Chi Tiết
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Đã ứng tuyển" key="Đã ứng tuyển">
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={filterJobsByStatus("Đã ứng tuyển").slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )}
              renderItem={(job) => (
                <List.Item>
                  <Card title={job.title} className="job-card">
                    <p>
                      <strong>Lương: </strong> {job.fromPrice} - {job.toPrice}
                    </p>
                    <p>
                      <strong>Thời gian làm việc: </strong> {job.hourWork} hours
                    </p>
                    <p>
                      <strong>Trạng thái: </strong> {job.status}
                    </p>
                    <p>
                      <strong>Họ và tên: </strong>{" "}
                      {job.firstName + " " + job.lastName}
                    </p>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#1890ff",
                        borderColor: "#1890ff",
                      }}
                      onClick={() => handleViewDetails(job.id)}
                    >
                      Xem Chi Tiết
                    </Button>
                    <Button
                      type="danger"
                      onClick={() => handleCancelApplication(job)}
                      style={{ marginLeft: 16 }}
                    >
                      Hủy ứng tuyển
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Đã hủy" key="Đã hủy">
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={filterJobsByStatus("Đã hủy").slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )}
              renderItem={(job) => (
                <List.Item>
                  <Card title={job.title} className="job-card">
                    <p>
                      <strong>Lương: </strong> {job.fromPrice} - {job.toPrice}
                    </p>
                    <p>
                      <strong>Thời gian làm việc: </strong> {job.hourWork} hours
                    </p>
                    <p>
                      <strong>Trạng thái: </strong> {job.status}
                    </p>
                    <p>
                      <strong>Họ và tên: </strong>{" "}
                      {job.firstName + " " + job.lastName}
                    </p>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#1890ff",
                        borderColor: "#1890ff",
                      }}
                      onClick={() => handleViewDetails(job.id)}
                    >
                      Xem Chi Tiết
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={jobs.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: 16 }}
        />
      </Col>
    </Row>
  );
};

export default ListJobApplied;
