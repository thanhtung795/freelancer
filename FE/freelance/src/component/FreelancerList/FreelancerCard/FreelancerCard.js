import React from 'react';
import { Card, Avatar, Button } from 'antd';
import { StarOutlined } from '@ant-design/icons';

const { Meta } = Card;

const FreelancerCard = ({ freelancer }) => {
  return (
    <Card
      hoverable
      style={{ width: '100%', position: 'relative' }} // Thêm position relative
    >
      <Meta
        avatar={<Avatar src={freelancer.avatar} />}
        title={freelancer.name}
        description={freelancer.skills.join(', ')}
      />
      <p style={{ marginTop: '12px' }}>{freelancer.description}</p>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
        {/* Hiển thị ngôi sao */}
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
        type="primary" 
        style={{
          position: 'absolute',
          right: '20px',
          bottom: '40px',
        }}
      >
        View Details
      </Button>
    </Card>
  );
};

export default FreelancerCard;
