import React, { useState } from 'react';
import { Row, Col, List, Pagination, Select, Button } from 'antd';
import FreelancerCard from './FreelancerCard/FreelancerCard';
import SwipperBanner from './SwiperBanner/SwiperBanner';

const { Option } = Select;

const Filter = ({ onFilterChange }) => {
  const [skills, setSkills] = useState([]);
  const [rating, setRating] = useState('');

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
          style={{ flex: '1', marginRight: '10px' }} // Sử dụng flex để chiếm diện tích
          onChange={setSkills}
          allowClear
        >
          <Option value="JavaScript">JavaScript</Option>
          <Option value="React">React</Option>
          <Option value="Node.js">Node.js</Option>
          <Option value="UI/UX Design">UI/UX Design</Option>
          <Option value="Java">Java</Option>
          <Option value="PHP">PHP</Option>
        </Select>
        <Select
          placeholder="Chọn Xếp Hạng"
          style={{ flex: '0 0 20%', marginRight: '10px' }} // Chiều rộng cố định cho Select xếp hạng
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

const FreelancerListApplied = () => {
  const freelancers = [
    {
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      skills: ['JavaScript', 'React', 'Node.js'],
      description: 'Full-stack developer with 5 years of experience.',
      rating: 5,
    },
    {
      name: 'Alice Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      skills: ['UI/UX Design', 'Figma', 'Sketch'],
      description: 'Creative UI/UX designer with a passion for web design.',
      rating: 4,
    },
    {
      name: 'Mark Davis',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      skills: ['Java', 'Spring Boot', 'Microservices'],
      description: 'Experienced Java developer focused on microservices architecture.',
      rating: 5,
    },
    {
      name: 'Emily Clark',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      skills: ['PHP', 'Laravel', 'MySQL'],
      description: 'Backend developer specializing in PHP and Laravel framework.',
      rating: 4,
    },
  ];

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [filteredFreelancers, setFilteredFreelancers] = useState(freelancers);

  const onChange = (page) => {
    setCurrent(page);
  };

  const dataToDisplay = filteredFreelancers.slice((current - 1) * pageSize, current * pageSize);

  const handleFilterChange = ({ skills, rating }) => {
    const filtered = freelancers.filter(freelancer => {
      const matchesSkills = skills.length ? skills.every(skill => freelancer.skills.includes(skill)) : true;
      const matchesRating = rating ? freelancer.rating === Number(rating) : true;
      return matchesSkills && matchesRating;
    });
    setFilteredFreelancers(filtered);
    setCurrent(1); // Reset to first page when filtering
  };

  return (
    <Row gutter={16} className='my-container mx-auto my-4'>
      <Col span={18}> 
        <Filter onFilterChange={handleFilterChange} />
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={dataToDisplay}
          renderItem={freelancer => (
            <List.Item>
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
      </Col>
      <Col span={6}> 
        <SwipperBanner />
      </Col>
    </Row>
  );
};

export default FreelancerListApplied;
