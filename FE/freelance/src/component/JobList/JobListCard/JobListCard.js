import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Card, Avatar, Button, Row, Col } from 'antd';
import {
  ClockCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  FileTextOutlined,
  TagOutlined,
  ProjectOutlined,
  FileOutlined,
  HeartOutlined,
  HeartFilled,
} from '@ant-design/icons';

const { Meta } = Card;

const JobCard = ({ job }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate(); 

  const handleViewDetails = () => {
    navigate(`/job-detail/${job.id}`); 
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const calculateTimeAgo = (dateStart) => {
    const now = new Date();
    const startDate = new Date(dateStart);
    const differenceInMilliseconds = now - startDate;
    const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    if (differenceInDays > 0) {
      return `${differenceInDays} ngày trước`;
    } else if (differenceInHours > 0) {
      return `${differenceInHours} giờ trước`;
    } else {
      return `${differenceInMinutes} phút trước`;
    }
  };

  const timeAgo = calculateTimeAgo(job.dateStart);

  return (
    <Card
      hoverable
      style={{
        width: '100%',
        position: 'relative',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '16px',
        padding: '16px',
        backgroundColor: '#ffffff',
      }}
    >
      <Meta
        avatar={<Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />}
        title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{`${job.firstName} ${job.lastName}`}</span>
          <span style={{ color: '#999' }}>
            <FileTextOutlined style={{ marginRight: '4px' }} />
            {timeAgo}
          </span>
        </div>}
        description={`${job.categoryName} - ${job.title}`}
      />

      <Row gutter={16} style={{ marginTop: '12px', color: '#555' }}>
        <Col span={12}>
          <p>
            <TeamOutlined style={{ marginRight: '4px', color: '#1890ff' }} />
            Phạm vi: <strong>{job.scope}</strong>
          </p>
        </Col>
        <Col span={12}>
          <p>
            <ClockCircleOutlined style={{ marginRight: '4px', color: '#1890ff' }} />
            Giờ làm việc: <strong>{job.hourwork}</strong>
          </p>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '12px', color: '#555' }}>
        <Col span={12}>
          <p>
            <DollarOutlined style={{ marginRight: '4px', color: '#1890ff' }} />
            Giá từ: <strong>${job.fromPrice}</strong>
          </p>
        </Col>
        <Col span={12}>
          <p>
            <TagOutlined style={{ marginRight: '4px', color: '#1890ff' }} />
            Trạng thái: <strong>{job.status}</strong>
          </p>
        </Col>
      </Row>

      <h4 style={{ margin: '12px 0', color: '#333', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
        <FileOutlined style={{ marginRight: '4px', color: '#1890ff' }} />
        Mô tả công việc:
      </h4>
      <p style={{ color: '#555', marginBottom: '12px', lineHeight: '1.5' }}>
        <strong style={{ fontSize: '16px' }}>Công việc: </strong>
        <span>{job.description}</span>
      </p>

      <h4 style={{ margin: '12px 0', color: '#333', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
        <ProjectOutlined style={{ marginRight: '4px', color: '#1890ff' }} />
        Kỹ năng yêu cầu:
      </h4>
      <div style={{ marginTop: '12px' }}>
        {job.skills.map((skill, index) => (
          <span 
            key={index} 
            style={{
              backgroundColor: '#f0f0f0',
              borderRadius: '20px',
              padding: '4px 12px',
              marginRight: '8px',
              display: 'inline-block'
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button 
          type="primary" 
          style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
          onClick={handleViewDetails}
        >
          Xem Chi Tiết
        </Button>
        <Button 
          type="text" 
          style={{ color: isFavorited ? 'red' : '#555', fontSize: '24px' }} 
          onClick={handleFavoriteToggle}
        >
          {isFavorited ? <HeartFilled /> : <HeartOutlined />}
        </Button>
      </div>
    </Card>
  );
};

export default JobCard;
