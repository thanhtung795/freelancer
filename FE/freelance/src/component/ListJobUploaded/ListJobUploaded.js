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
import { faEdit, faTrash, faArchive, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const { TabPane } = Tabs;

const ListJobUploaded = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const role = JSON.parse(localStorage.getItem("user"))?.data?.role === "client";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const clientId = parseInt(
          JSON.parse(localStorage.getItem("user")).data.idRole,
          10
        );
        const response = await fetch("http://localhost:8080/api/Jobs/getAllJobName");
        const data = await response.json();

        const filteredJobs = data.data.filter((job) => job.clientId === clientId);
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

  const handleAddJob = () => {
    message.info("Bạn đang trong thêm job");
    navigate("/job");
  };

  const handleViewDetails = (jobId) => {
    navigate(`/job-detail/${jobId}`);
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
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
                      style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
                      onClick={() => handleViewDetails(job.id)}
                    >
                      Xem Chi Tiết
                    </Button>
                    <div style={{ marginTop: 16 }} className="d-flex gap-2">
                      <Button
                        onClick={() => handleEdit(job.title)}
                        className="btn-edit"
                        icon={<FontAwesomeIcon icon={faEdit} />}
                      >
                        Edit
                      </Button>
                      <Popconfirm
                        title="Bạn có chắc chắn muốn xóa công việc này?"
                        onConfirm={() => handleDelete(job.title)}
                        okText="Có"
                        cancelText="Không"
                      >
                        <Button
                          type="danger"
                          className="btn-delete"
                          icon={<FontAwesomeIcon icon={faTrash} />}
                        >
                          Delete
                        </Button>
                      </Popconfirm>
                      <Button
                        type="default"
                        onClick={() => handleArchive(job.title)}
                        className="btn-archive"
                        icon={<FontAwesomeIcon icon={faArchive} />}
                      >
                        Archive
                      </Button>
                    </div>
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
                      style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
                      onClick={() => handleViewDetails(job.id)}
                    >
                      Xem Chi Tiết
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Hoàn thành" key="Hoàn thành">
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={filterJobsByStatus("Hoàn thành").slice(
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
                      style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
                      onClick={() => handleViewDetails(job.id)}
                    >
                      Xem Chi Tiết
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
                      style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
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
          total={filterJobsByStatus(activeTab).length}
          onChange={onChangePage}
        />
      </Col>
      {role && (
        <Col span={6}>
          <Button
            type="primary"
            onClick={handleAddJob}
            icon={<FontAwesomeIcon icon={faPlus} />}
          >
            Thêm Công Việc
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default ListJobUploaded;
