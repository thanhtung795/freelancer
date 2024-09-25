import React, { useState } from "react";
import { Row, Col, Card, Button, message, Pagination, Tabs, List } from "antd";
import "./ListToDoJob.css";

const jobs = {
  submitted: [
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
  ],
  working: [
    {
      title: "Data Scientist",
      price: "$1500 - $2000",
      workTime: "Contract",
      postedAt: "3 days ago",
      description: "Looking for a data scientist to analyze complex data sets and provide insights.",
    },
  ],
  completed: [
    {
      title: "Mobile App Developer",
      price: "$1200 - $1800",
      workTime: "Full-time",
      postedAt: "5 days ago",
      description: "Join our team as a mobile app developer to create user-friendly applications.",
    },
  ],
};

const ListToDoJob = () => {
  const [currentTab, setCurrentTab] = useState("submitted");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const handleRemoveApplication = (title) => {
    message.success(`You have removed your application for "${title}".`);
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const displayedJobs = jobs[currentTab].slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="background-container">
      <Row gutter={16} className="my-container-list-job my-container mx-auto my-4">
        <Col span={24}>
          <Tabs defaultActiveKey="submitted" onChange={setCurrentTab}>
            <Tabs.TabPane tab="Đã Nộp" key="submitted" />
            <Tabs.TabPane tab="Đang Làm" key="working" />
            <Tabs.TabPane tab="Đã Làm" key="completed" />
          </Tabs>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={displayedJobs}
            renderItem={(job) => (
              <List.Item>
                <Card title={job.title} className="job-card">
                  <p>
                    <strong>Price:</strong> {job.price}
                  </p>
                  <p>
                    <strong>Work Time:</strong> {job.workTime}
                  </p>
                  <p>
                    <strong>Posted At:</strong> {job.postedAt}
                  </p>
                  <p>{job.description}</p>
                  {currentTab === "submitted" && (
                    <div style={{ marginTop: 16 }}>
                      <Button onClick={() => handleRemoveApplication(job.title)} type="default" className="btn-delete">
                        Bỏ apply
                      </Button>
                    </div>
                  )}
                </Card>
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={jobs[currentTab].length}
            onChange={onChangePage}
            style={{ textAlign: 'center', marginTop: 16 }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ListToDoJob;
