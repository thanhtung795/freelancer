import React, { useState, useEffect } from "react";
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
  const [jobs, setJobs] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/Jobs/getAllJobName");
        const data = await response.json();
        console.log('data ', data.data)
        setJobs(data.data);  
        setFilteredJobs(data.data); 
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const onChange = (page) => {
    setCurrent(page);
  };

  const handleFilterChange = ({ skills, rating }) => {
    const filtered = jobs.filter((job) => {
      const matchesSkills = skills.length
        ? skills.every((skill) => job.skills.includes(skill))
        : true;
      const matchesRating = rating ? job.rating === rating : true; 
      return matchesSkills && matchesRating;
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
