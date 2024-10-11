import React, { useState, useEffect } from 'react';
import { Row, Col, List, Pagination, Select, Button, Empty } from 'antd';
import FreelancerCard from './FreelancerCard/FreelancerCard';
import SwipperBanner from './SwiperBanner/SwiperBanner';
import axios from 'axios';

const { Option } = Select;

const Filter = ({ onFilterChange }) => {
  const [skills, setSkills] = useState([]); // For selected skills
  const [rating, setRating] = useState('');
  const [skillOptions, setSkillOptions] = useState([]); // For skills from API

  // Fetch skills from the API on component load
  useEffect(() => {
    axios.get('http://localhost:8080/api/skills')
      .then(response => {
        if (response.data.success) {
          setSkillOptions(response.data.data); // Save the fetched skills
        }
      })
      .catch(error => {
        console.error('Error fetching skills:', error);
      });
  }, []);

  const handleFilter = () => {
    onFilterChange({ skills, rating });
  };

  return (
    <Row gutter={16} style={{ marginBottom: '20px', width: '100%' }}>
      <Col span={24}> 
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Select
            mode="multiple"
            placeholder="Chọn Kỹ Năng"
            style={{ flex: '1', marginRight: '10px' }} 
            onChange={setSkills}
            allowClear
          >
            {skillOptions.map(skill => (
              <Option key={skill.id} value={skill.skillName}>
                {skill.skillName}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Chọn Xếp Hạng"
            style={{ flex: '0 0 20%', marginRight: '10px' }} 
            onChange={setRating}
            allowClear
          >
            <Option value="5">5</Option>
            <Option value="4">4</Option>
          </Select>
          <Button type="primary" onClick={handleFilter}>
            Lọc
          </Button>
        </div>
      </Col>
    </Row>
  );
};

const FreelancerList = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:8080/api/users/getAllInfoFreelancer')
      .then(response => {
        const data = response.data.data.map(freelancer => ({
          id: freelancer.freelancerId,
          name: `${freelancer.lastName} ${freelancer.address}`,
          avatar: freelancer.image,
          skills: freelancer.skills.map(skill => skill.skillName),
          education: freelancer.eduInfoFreelancerDTOList,
          description: freelancer.eduInfoFreelancerDTOList[0]?.description || '',
        }));
        setFreelancers(data);
        setFilteredFreelancers(data);
      })
      .catch(error => {
        console.error('Error fetching freelancers:', error);
      });
  }, []);

  const onChange = (page) => {
    setCurrent(page);
  };

  const handleFilterChange = ({ skills, rating }) => {
    const filtered = freelancers.filter(freelancer => {
      const matchesSkills = skills.length ? skills.every(skill => freelancer.skills.includes(skill)) : true;
      const matchesRating = rating ? freelancer.rating === Number(rating) : true;
      return matchesSkills && matchesRating;
    });
    setFilteredFreelancers(filtered);
    setCurrent(1); 
  };

  const dataToDisplay = filteredFreelancers.slice((current - 1) * pageSize, current * pageSize);

  return (
    <Row gutter={16} className="my-container mx-auto my-4">
      <Col span={18}> 
        <Filter onFilterChange={handleFilterChange} />
        {dataToDisplay.length > 0 ? (
          <>
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={dataToDisplay}
              renderItem={freelancer => (
                <List.Item key={freelancer.id}>
                  <FreelancerCard freelancer={freelancer} />
                </List.Item>
              )}
            />
            <Pagination 
              current={current} 
              pageSize={pageSize} 
              total={filteredFreelancers.length} 
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

export default FreelancerList;
