import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Typography, Input } from 'antd';

const Description = () => {
    const [description, setDescription] = useState('');
    const navigate = useNavigate(); 
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };
  
    const handleButtonClick = () => {

      navigate('/personal-info'); 
    };
  
  return (
    <Form layout="vertical">
      <Typography.Title level={3}>Mô tả bản thân</Typography.Title>
      <Form.Item label="Mô tả (ít nhất 200 từ)">
        <Input.TextArea
          rows={10}
          value={description}
          onChange={handleDescriptionChange}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleButtonClick}>
          Hoàn thành
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Description;
