import React, { useState, useEffect } from 'react';
import { Row, Col, List, Pagination, Select, Button, Empty } from 'antd';
import FreelancerCard from './FreelancerCard/FreelancerCard';
import SwipperBanner from './SwiperBanner/SwiperBanner';
import axios from 'axios';

const { Option } = Select;

const Filter = ({ onFilterChange }) => {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [skillOptions, setSkillOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

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

    // Fetch categories from the API
    axios.get('http://localhost:8080/api/categories')
      .then(response => {
        setCategoryOptions(response.data); // Save the fetched categories
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleFilter = () => {
    onFilterChange({ skills, selectedCategory });
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
            placeholder="Chọn Ngành nghề"
            style={{ flex: '1', marginRight: '10px' }}
            onChange={setSelectedCategory}
            allowClear
          >
            {categoryOptions.map(category => (
              <Option key={category.id} value={category.categoryTitle}>
                {category.categoryTitle}
              </Option>
            ))}
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
    axios.get('http://localhost:8080/api/users/getAllInfoFreelancer')
      .then(response => {
        const data = response.data.data.map(freelancer => ({
          id: freelancer.freelancerId,
          name: `${freelancer.firstName} ${freelancer.lastName}`.trim(),
          address:  `${freelancer.address}`,
          avatar: freelancer.image,
          skills: freelancer.skills.map(skill => skill.skillName),
          categoryTitle: freelancer.categoryTitle,
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

  const handleFilterChange = ({ skills, selectedCategory }) => {
    const filtered = freelancers.filter(freelancer => {
      const matchesSkills = skills.length ? skills.every(skill => freelancer.skills.includes(skill)) : true;
      const matchesCategory = selectedCategory ? freelancer.categoryTitle === selectedCategory : true;
      return matchesSkills && matchesCategory;
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
