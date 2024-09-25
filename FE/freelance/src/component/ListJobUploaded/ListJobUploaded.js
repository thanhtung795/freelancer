import React, { useState } from "react";
import { Row, Col, List, Card, Button, Popconfirm, message, Pagination } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faArchive, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const jobs = [
  {
    title: "Web Developer",
    price: "$1000 - $1500",
    workTime: "Full-time",
    postedAt: "2 days ago",
    description: "Looking for a skilled web developer to join our team and help build dynamic web applications.",
  },
  {
    title: "UI/UX Designer",
    price: "$800 - $1200",
    workTime: "Part-time",
    postedAt: "1 week ago",
    description: "Seeking a creative UI/UX designer to improve user experiences and interfaces for our products.",
  },
  {
    title: "Data Scientist",
    price: "$1500 - $2000",
    workTime: "Contract",
    postedAt: "3 days ago",
    description: "Looking for a data scientist to analyze complex data sets and provide insights.",
  },
  {
    title: "Mobile App Developer",
    price: "$1200 - $1800",
    workTime: "Full-time",
    postedAt: "5 days ago",
    description: "Join our team as a mobile app developer to create user-friendly applications.",
  },
];

const ListJobUploaded = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const navigate = useNavigate(); 

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
    navigate('/job');
  };

  const handleNavigateArchive = () => {
    message.info("Bạn đang trong danh sách lưu trữ");
    navigate('/archived-list');
  };

  const handleNavigateDelete = () => {
    message.info("Bạn đang trong danh sách xóa");
    navigate('/deleted-list');
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const displayedJobs = jobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <Row gutter={16} className="my-container mx-auto my-4">
      <Col span={18}>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={displayedJobs}
          renderItem={(job) => (
            <List.Item>
              <Card title={job.title} className="job-card">
                <p><strong>Price:</strong> {job.price}</p>
                <p><strong>Work Time:</strong> {job.workTime}</p>
                <p><strong>Posted At:</strong> {job.postedAt}</p>
                <p>{job.description}</p>
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
              style={{ width: "100%", backgroundColor: "#4CAF50", borderColor: "#4CAF50" }} 
            >
              Add Job
            </Button>
            <Button
              type="danger"
              icon={<FontAwesomeIcon icon={faArchive} />}
              style={{ width: "100%", backgroundColor: "gray", borderColor: "#2196F3", color: "white" }} 
              onClick={handleNavigateArchive}
            >
              View Archived Jobs
            </Button>
            <Button
              type="danger"
              icon={<FontAwesomeIcon icon={faTrash} />}
              style={{ width: "100%", backgroundColor: "#F44336", borderColor: "#F44336", color: "white" }} 
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
