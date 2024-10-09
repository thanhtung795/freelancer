import React from 'react';
import { Card, Avatar, Button } from 'antd';

const { Meta } = Card;

const JobCard = ({ job }) => {
  const handleViewDetails = () => {
    console.log(`Xem chi tiết cho công việc: ${job.id}`);
  };

  return (
    <Card
      hoverable
      style={{ width: '100%', position: 'relative' }}
    >
      <Meta
        avatar={<Avatar src={job.poster.avatar} />}
        title={job.poster.name}
        description={`${job.company} - Cần Tuyển ${job.title}`}
      />
      <p style={{ marginTop: '12px' }}>{job.description}</p>

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

      <Button 
        type="primary" 
        style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', marginTop: '12px' }}
        onClick={handleViewDetails}
      >
        Xem Chi Tiết
      </Button>
    </Card>
  );
};

export default JobCard;
