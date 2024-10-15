import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  List,
  Card,
  Button,
  Pagination,
  Tabs,
  Select,
  Typography,
  Tag,
  Badge
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBriefcase,
  faClock,
  faMoneyBillWave,
  faUser,
  faFolder,
  faTags
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const { TabPane } = Tabs;
const { Option } = Select;
const { Text, Title } = Typography;

const ListJobUploaded = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const [jobs, setJobs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();
  const role = JSON.parse(localStorage.getItem("user"))?.data?.role === "client";

  useEffect(() => {
    const fetchJobs = async () => {
      const clientId = role ? parseInt(JSON.parse(localStorage.getItem("user")).data.idRole, 10) : 0;
      const response = await fetch("http://localhost:8080/api/Jobs/getAllJobName");
      const data = await response.json();
      setJobs(data.data.filter((job) => !role || job.clientId === clientId));
    };

    fetchJobs();
  }, [role]);
  const handleViewDetails = (jobId) => {
    navigate(`/job-detail/${jobId}`);
  };

  const handleAddJob = () => {
    navigate("/job");
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const filterJobsByCategory = (category) => {
    if (category === "all") {
      return jobs;
    }
    return jobs.filter((job) => job.categoryName === category);
  };

  const filterJobsBySkills = (jobs) => {
    if (selectedSkills.length === 0) {
      return jobs;
    }
    return jobs.filter((job) =>
      job.skills.some((skill) => selectedSkills.includes(skill))
    );
  };

  const filteredJobs = filterJobsBySkills(filterJobsByCategory(activeCategory));

  const displayedJobs = filteredJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const allSkills = [...new Set(jobs.flatMap((job) => job.skills))];

  const formatPrice = (job) => {
    if (job.typePrice === "hourly_rate") {
      return `${job.fromPrice}/giờ - ${job.toPrice}/giờ`;
    }
    return `${job.fromPrice} - ${job.toPrice}`;
  };

  const categories = ["all", ...new Set(jobs.map((job) => job.categoryName))];

  const getStatusColor = (status) => {
    switch (status) {
      case "Đang thực hiện":
        return "processing";
      case "Hoàn thành":
        return "success";
      case "Đã hủy":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Row gutter={16} className="my-container mx-auto my-4">
      <Col span={18}>
        <Title level={2}>
          <FontAwesomeIcon icon={faBriefcase} /> Danh sách Công việc
        </Title>
        <Tabs defaultActiveKey="all" onChange={setActiveCategory}>
          {categories.map((category) => (
            <TabPane
              tab={
                <span>
                  {category === "all" ? "Tất cả" : category}{" "}
                  <Badge count={filterJobsByCategory(category).length} />
                </span>
              }
              key={category}
            >
              <Select
                mode="multiple"
                style={{ width: "100%", marginBottom: 16 }}
                placeholder="Lọc theo kỹ năng"
                onChange={setSelectedSkills}
                value={selectedSkills}
              >
                {allSkills.map((skill) => (
                  <Option key={skill} value={skill}>
                    {skill}
                  </Option>
                ))}
              </Select>
              <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={displayedJobs}
                renderItem={(job) => (
                  <List.Item>
                    <Card
                      title={
                        <span>
                          <FontAwesomeIcon icon={faBriefcase} /> {job.title}
                        </span>
                      }
                      className="job-card"
                      extra={
                        <Tag color={getStatusColor(job.status)}>{job.status}</Tag>
                      }
                    >
                      <Text>
                        <FontAwesomeIcon icon={faMoneyBillWave} />{" "}
                        <strong>Lương: </strong> {formatPrice(job)}
                      </Text>
                      <br />
                      <Text>
                        <FontAwesomeIcon icon={faClock} />{" "}
                        <strong>Thời gian làm việc: </strong> {job.hourWork} giờ
                      </Text>
                      <br />
                      <Text>
                        <FontAwesomeIcon icon={faUser} />{" "}
                        <strong>Họ và tên: </strong> {job.firstName + " " + job.lastName}
                      </Text>
                      <br />
                      <Text>
                        <FontAwesomeIcon icon={faFolder} />{" "}
                        <strong>Danh mục: </strong> {job.categoryName}
                      </Text>
                      <br />
                      <Text>
                        <FontAwesomeIcon icon={faTags} /> <strong>Kỹ năng: </strong>{" "}
                      </Text>
                      {job.skills.map((skill) => (
                        <Tag key={skill} color="blue">
                          {skill}
                        </Tag>
                      ))}
                      <br />
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#1890ff",
                          borderColor: "#1890ff",
                          marginTop: 16,
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
          ))}
        </Tabs>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredJobs.length}
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