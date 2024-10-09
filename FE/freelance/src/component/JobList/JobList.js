import React, { useState } from "react";
import { Row, Col, List, Pagination, Select, Button, Empty } from "antd";
import JobCard from "./JobListCard/JobListCard";
import SwipperBanner from "./SwiperBanner/SwiperBanner";

const { Option } = Select;

const Filter = ({ onFilterChange }) => {
  const [skills, setSkills] = useState([]);
  const [rating, setRating] = useState("");

  const handleFilter = () => {
    onFilterChange({ skills, rating });
  };

  return (
    <Row gutter={16} style={{ marginBottom: "20px", width: "100%" }}>
      <Col span={24}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Select
            mode="multiple"
            placeholder="Chọn Kỹ Năng"
            style={{ flex: "1", marginRight: "10px" }}
            onChange={setSkills}
            allowClear
          >
            <Option value="JavaScript">JavaScript</Option>
            <Option value="React">React</Option>
            <Option value="Node.js">Node.js</Option>
            <Option value="UI/UX Design">Thiết Kế UI/UX</Option>
            <Option value="Java">Java</Option>
            <Option value="PHP">PHP</Option>
          </Select>
          <Select
            placeholder="Chọn Xếp Hạng"
            style={{ flex: "0 0 20%", marginRight: "10px" }}
            onChange={setRating}
            allowClear
          >
            <Option value="5">5 Sao</Option>
            <Option value="4">4 Sao</Option>
          </Select>
          <Button type="primary" onClick={handleFilter}>
            Lọc
          </Button>
        </div>
      </Col>
    </Row>
  );
};

const JobList = () => {
  const jobs = [
    {
      id: 1,
      title: "Lập Trình Viên Full-stack",
      company: "Công Ty Giải Pháp Công Nghệ",
      poster: {
        name: "Nguyễn Văn A",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      skills: ["JavaScript", "React", "Node.js"],
      description:
        "Chúng tôi đang tìm kiếm một lập trình viên Full-stack với 5 năm kinh nghiệm.",
    },
    {
      title: "Nhà Thiết Kế UI/UX",
      company: "Studio Sáng Tạo",
      poster: {
        name: "Trần Thị B",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      },
      skills: ["Thiết Kế UI/UX", "Figma", "Sketch"],
      description:
        "Gia nhập đội ngũ của chúng tôi với vai trò là một nhà thiết kế UI/UX sáng tạo.",
    },
    {
      title: "Lập Trình Viên Java",
      company: "Công Ty Doanh Nghiệp Inc.",
      poster: {
        name: "Phạm Văn C",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      },
      skills: ["Java", "Spring Boot", "Microservices"],
      description:
        "Chúng tôi cần một lập trình viên Java có kinh nghiệm với kiến trúc microservices.",
    },
    {
      title: "Lập Trình Viên Backend",
      company: "Công Ty Web Dev",
      poster: {
        name: "Lê Thị D",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      },
      skills: ["PHP", "Laravel", "MySQL"],
      description: "Lập trình viên Backend chuyên về PHP và Laravel framework.",
    },
  ];

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const onChange = (page) => {
    setCurrent(page);
  };

  const handleFilterChange = ({ skills, rating }) => {
    const filtered = jobs.filter((job) => {
      const matchesSkills = skills.length
        ? skills.every((skill) => job.skills.includes(skill))
        : true;
      return matchesSkills;
    });
    setFilteredJobs(filtered);
    setCurrent(1);
  };

  const dataToDisplay = filteredJobs.slice(
    (current - 1) * pageSize,
    current * pageSize
  );

  return (
    <Row gutter={16} className="my-container mx-auto my-4">
      <Col span={18}>
        <Filter onFilterChange={handleFilterChange} />
        {dataToDisplay.length > 0 ? (
          <>
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={dataToDisplay}
              renderItem={(job) => (
                <List.Item>
                  <JobCard job={job} />
                </List.Item>
              )}
            />
            <Pagination
              current={current}
              pageSize={pageSize}
              total={filteredJobs.length}
              onChange={onChange}
              showSizeChanger
              onShowSizeChange={(current, size) => {
                setCurrent(1);
                setPageSize(size);
              }}
            />
          </>
        ) : (
          <Empty description="Không có kết quả phù hợp" />
        )}
      </Col>
      <Col span={6}>
        <SwipperBanner />
      </Col>
    </Row>
  );
};

export default JobList;
