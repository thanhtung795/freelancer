import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Typography, Input, List, } from 'antd';

const Experience = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (e) => {
    setCurrentExperience({
      ...currentExperience,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, currentExperience]);
    setCurrentExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleButtonClick = () => {
    navigate('/description');
  };

  return (
    <Form layout="vertical">
      <Typography.Title level={4}>Kinh nghiệm làm việc</Typography.Title>
      <Form.Item label="Tên công ty">
        <Input
          value={currentExperience.company}
          onChange={handleInputChange}
          name="company"
        />
      </Form.Item>
      <Form.Item label="Vị trí">
        <Input
          value={currentExperience.position}
          onChange={handleInputChange}
          name="position"
        />
      </Form.Item>
      <Form.Item label="Ngày bắt đầu">
        <Input
          type="date"
          value={currentExperience.startDate}
          onChange={handleInputChange}
          name="startDate"
        />
      </Form.Item>
      <Form.Item label="Ngày kết thúc">
        <Input
          type="date"
          value={currentExperience.endDate}
          onChange={handleInputChange}
          name="endDate"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleAddExperience}>
          Thêm kinh nghiệm
        </Button>
      </Form.Item>
      <List>
        {experiences.map((exp, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              title={`${exp.position} tại ${exp.company}`}
              description={`${exp.startDate} - ${exp.endDate}`}
            />
          </List.Item>
        ))}
      </List>
      <Form.Item>
        <Button type="primary" onClick={handleButtonClick}>
          Tiếp theo
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Experience;
