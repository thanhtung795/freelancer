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

const allJobs = [
  {
    id: 1,
    clientId: 1,
    title: "Website Development",
    scope: "large",
    hourWork: 150.0,
    jobOpportunity: true,
    fromPrice: 1000.0,
    toPrice: 5000.0,
    typePrice: "fixed",
    status: "Hủy bỏ",
    dateStart: "2024-01-01T00:00:00",
    dateEnd: "2024-02-02T00:00:00",
    dateCreate: null,
    firstName: "Bob",
    lastName: "Johnson",
    categoryName: "Web Development",
    skills: ["JavaScript", "Python"],
  },
  {
    id: 2,
    clientId: 2,
    title: "Mobile App Development",
    scope: "medium",
    hourWork: 120.0,
    jobOpportunity: true,
    fromPrice: 800.0,
    toPrice: 3000.0,
    typePrice: "fixed",
    status: "Đang hoạt động",
    dateStart: "2024-03-01T00:00:00",
    dateEnd: "2024-04-01T00:00:00",
    dateCreate: null,
    firstName: "Alice",
    lastName: "Smith",
    categoryName: "Mobile Development",
    skills: ["React Native", "Java"],
  },
  {
    id: 3,
    clientId: 1,
    title: "E-commerce Website",
    scope: "large",
    hourWork: 200.0,
    jobOpportunity: true,
    fromPrice: 1500.0,
    toPrice: 7000.0,
    typePrice: "fixed",
    status: "Đang hoạt động",
    dateStart: "2024-02-10T00:00:00",
    dateEnd: "2024-03-10T00:00:00",
    dateCreate: null,
    firstName: "Charlie",
    lastName: "Brown",
    categoryName: "Web Development",
    skills: ["PHP", "Laravel"],
  },
  {
    id: 4,
    clientId: 3,
    title: "SEO Optimization",
    scope: "small",
    hourWork: 100.0,
    jobOpportunity: true,
    fromPrice: 500.0,
    toPrice: 2500.0,
    typePrice: "fixed",
    status: "Hủy bỏ",
    dateStart: "2024-05-01T00:00:00",
    dateEnd: "2024-06-01T00:00:00",
    dateCreate: null,
    firstName: "David",
    lastName: "Williams",
    categoryName: "Digital Marketing",
    skills: ["SEO", "Content Marketing"],
  },
  
];

const ListJobUploaded = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const clientId = parseInt(JSON.parse(localStorage.getItem('user')).data.idRole, 10);

        const response = await fetch("http://localhost:8080/api/Jobs/getAllJobName");
        const data = await response.json();
        console.log('clientId ', clientId)
        console.log('data ', data.data)
        
        const filteredJobs = data.data.filter((job) => job.clientId === clientId);
        setJobs(filteredJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs()
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
                  <strong>Price:</strong> {job.fromPrice} - {job.toPrice}
                </p>
                <p>
                  <strong>Work Time:</strong> {job.hourWork} hours
                </p>
                <p>
                  <strong>Status:</strong> {job.status}
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
    </Row>
  );
};

export default ListJobUploaded;
