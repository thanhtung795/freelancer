import React from 'react';
import { Card, Avatar, Button } from 'antd';
import { StarOutlined } from '@ant-design/icons';

const { Meta } = Card;

const FreelancerCard = ({ freelancer }) => {
  return (
    <Card
      hoverable
      style={{ width: '100%', position: 'relative' }}
    >
      <Meta
        avatar={<Avatar src={freelancer.avatar} />}
        title={freelancer.name}
        description={freelancer.skills.join(', ')}
      />
      <p style={{ marginTop: '12px' }}>{freelancer.description}</p>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
        <span style={{ marginRight: '8px' }}>
          <StarOutlined style={{ color: '#fadb14' }} /> 
          <StarOutlined style={{ color: '#fadb14' }} />
          <StarOutlined style={{ color: '#fadb14' }} />
          <StarOutlined style={{ color: '#fadb14' }} />
          <StarOutlined style={{ color: '#fadb14' }} />
        </span>
        <span>(5/5)</span>
      </div>
      <Button 
        type="default" 
        style={{
          position: 'absolute',
          right: '20px',
          bottom: '120px',
          backgroundColor: '#f0f0f0',
          color: '#000',
          borderColor: '#d9d9d9',
          width: '120px',
          opacity: 1,
          transition: 'opacity 0.3s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = 0.7}
        onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
      >
        Xem Chi Tiết
      </Button>
      <Button 
        type="primary" 
        style={{
          position: 'absolute',
          right: '20px',
          bottom: '80px',
          backgroundColor: '#52c41a',
          borderColor: '#52c41a',
          width: '120px',
          opacity: 1,
          transition: 'opacity 0.3s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = 0.7}
        onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
      >
        Chấp Thuận
      </Button>
      <Button 
        type="default" 
        style={{
          position: 'absolute',
          right: '20px',
          bottom: '40px',
          backgroundColor: '#ff4d4f',
          color: '#fff',
          borderColor: '#ff4d4f',
          width: '120px',
          opacity: 1,
          transition: 'opacity 0.3s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = 0.7}
        onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
      >
        Loại
      </Button>
    </Card>
  );
};

export default FreelancerCard;
