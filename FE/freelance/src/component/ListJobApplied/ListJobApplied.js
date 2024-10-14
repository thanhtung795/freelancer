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
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faArchive,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const ListJobApplied = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const role = JSON.parse(localStorage.getItem("user"))?.data?.role == "client";

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
        console.log("clientId ", idRole);
        console.log("data ", data.data.jobs);

        const filteredJobs = data.data.jobs
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

  const handleNavigateArchive = () => {
    message.info("Bạn đang trong danh sách lưu trữ");
    navigate("/archived-list");
  };

  const handleNavigateDelete = () => {
    message.info("Bạn đang trong danh sách xóa");
    navigate("/deleted-list");
  };

  const handleViewDetails = (jobId) => {
    navigate(`/job-detail/${jobId}`);
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const displayedJobs = jobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Row gutter={16} className="my-container mx-auto my-4">
      <Col span={18}>
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
                  {job.fristName + " " + job.lasName}
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
                    title="Are you sure you want to delete this job?"
                    onConfirm={() => handleDelete(job.title)}
                    okText="Yes"
                    cancelText="No"
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
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={jobs.length}
          onChange={onChangePage}
          style={{ textAlign: "center", marginTop: 16 }}
        />
      </Col>
      {role ? (
        <Col span={6} style={{ textAlign: "center" }}>
          <div className="stats">
            <h3>Total Jobs: {jobs.length}</h3>
            <div style={{ marginTop: 16 }} className="d-flex flex-column gap-2">
              <Button
                type="primary"
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={handleAddJob}
                style={{
                  width: "100%",
                  backgroundColor: "#4CAF50",
                  borderColor: "#4CAF50",
                }}
              >
                Add Job
              </Button>
              <Button
                type="danger"
                icon={<FontAwesomeIcon icon={faArchive} />}
                style={{
                  width: "100%",
                  backgroundColor: "gray",
                  borderColor: "#2196F3",
                  color: "white",
                }}
                onClick={handleNavigateArchive}
              >
                View Archived Jobs
              </Button>
              <Button
                type="danger"
                icon={<FontAwesomeIcon icon={faTrash} />}
                style={{
                  width: "100%",
                  backgroundColor: "#F44336",
                  borderColor: "#F44336",
                  color: "white",
                }}
                onClick={handleNavigateDelete}
              >
                View Deleted Jobs
              </Button>
            </div>
          </div>
        </Col>
      ) : (
        ""
      )}
    </Row>
  );
};

export default ListJobApplied;
