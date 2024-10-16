import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  List,
  Card,
  Button,
  message,
  Pagination,
  Tabs,
  Tag,
  Typography,
  Badge,
  Space
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faMoneyBillWave,
  faClock,
  faUser,
  faFolder,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const { TabPane } = Tabs;
const { Text } = Typography;

// Move these functions outside of the component so they can be shared
const getStatusColor = (status) => {
  switch (status) {
    case "Đã ứng tuyển":
      return "blue";
    case "Đang thực hiện":
      return "green";
    case "Đã hủy":
      return "red";
    default:
      return "default";
  }
};

const formatPrice = (job) => {
  return `${job.fromPrice} - ${job.toPrice} ${job.typePrice === "hourly_rate" ? "/giờ" : ""}`;
};

const ListJobApplied = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [jobCounts, setJobCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      const allStatuses = ["Đã ứng tuyển", "Đang thực hiện", "Đã hủy", "Hoàn thành"];
      const jobsByStatus = { all: [] };
      const counts = { all: 0 };
  
      // Fetch jobs for each status and accumulate in the "all" tab
      for (const status of allStatuses) {
        const result = await fetchJobs(status);
        if (result) {
          jobsByStatus[status] = result.jobs || [];
          counts[status] = jobsByStatus[status].length;
          counts.all += counts[status]; // Accumulate the total count
  
          // Add jobs of this status to the "all" tab
          jobsByStatus.all = [...jobsByStatus.all, ...jobsByStatus[status]];
        }
      }
  
      setJobs(jobsByStatus);
      setJobCounts(counts);
    };
  
    loadJobs();
  }, []);
  
  const fetchJobs = async (status = null) => {
    try {
      const idRole = parseInt(
        JSON.parse(localStorage.getItem("user")).data.idRole,
        10
      );
      let url = `http://localhost:8080/api/freelancers/JobsOFreeByIdAndStatus/${idRole}`;
      
      if (status) {
        url += `?status=${encodeURIComponent(status)}`;
      }
  
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success && data.data) {
        return data.data;
      } else {
        console.log("Invalid response structure:", data);
        return null;
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return null;
    }
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

      // Update job counts
      setJobCounts(prev => ({
        ...prev,
        "Đã ứng tuyển": prev["Đã ứng tuyển"] - 1,
        "Đã hủy": prev["Đã hủy"] + 1,
      }));
    } catch (error) {
      message.error(`Không thể hủy ứng tuyển: ${error.message}`);
    }
  };



  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
  };
  const getDisplayedJobs = () => {
    return jobs[activeTab] || [];
  };

  return (
    <Row gutter={16} className="my-container mx-auto my-4">
      <Col span={18}>
        <Tabs defaultActiveKey="all" onChange={handleTabChange}>
          {Object.keys(jobCounts).map(status => (
            <TabPane 
              tab={
                <Badge count={jobCounts[status]} showZero>
                  {status === "all" ? "Tất cả" : status}
                </Badge>
              } 
              key={status}
            >
              <JobList 
                jobs={getDisplayedJobs().slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )}
                handleViewDetails={handleViewDetails} 
                handleCancelApplication={handleCancelApplication}
                getStatusColor={getStatusColor}
                formatPrice={formatPrice}
              />
            </TabPane>
          ))}
        </Tabs>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={getDisplayedJobs().length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: 16 }}
        />
      </Col>
    </Row>
  );
};

const JobList = ({ jobs, handleViewDetails, handleCancelApplication, getStatusColor, formatPrice }) => (
  <List
    grid={{ gutter: 16, column: 1 }}
    dataSource={jobs}
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
            !job.status === "Đã hủy" || !job.status === "Hoàn thành" ? (
              <Tag color={getStatusColor(job.status)}>{job.status}</Tag>
            ) : null
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
            {/* <strong>Họ và tên: </strong> {job.firstName + " " + job.lastName} */}
            <strong>Họ và tên: </strong> {"Quang Bùi"}
          </Text>
          <br />
          <br />
          {/* <Text>
            <FontAwesomeIcon icon={faTags} /> <strong>Kỹ năng: </strong>{" "}
          </Text>
          {job.skills && job.skills.map((skill) => (
            <Tag key={skill} color="blue">
              {skill}
            </Tag>
          ))} */}
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
          {job.status === "Đã ứng tuyển" && (
            <Button
              type="danger"
              onClick={() => handleCancelApplication(job)}
              style={{ marginLeft: 16, marginTop: 16 }}
            >
              Hủy ứng tuyển
            </Button>
          )}
        </Card>
      </List.Item>
    )}
  />
);

export default ListJobApplied;  