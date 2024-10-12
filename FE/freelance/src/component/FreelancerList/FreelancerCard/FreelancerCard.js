import React from 'react';
import { Card, Avatar, Tag, List, Typography, Space, Row, Col } from 'antd';
import { UserOutlined, EnvironmentOutlined, BookOutlined, ToolOutlined, CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;

const FreelancerCard = ({ freelancer }) => {
  const { name, avatar, skills, education, description, categoryTitle, address } = freelancer;

  const validSkills = skills.filter(skill => skill);
  const formatDate = (dateString) => {
    return moment(dateString).format('MM/YYYY');
  };
  return (
    <Card
      hoverable
      style={{
        marginBottom: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
      }}
    >
      <Row gutter={16} align="middle">
        <Col>
          <Avatar
            size={64}
            src={avatar ? `path-to-image/${avatar}` : null}
            icon={!avatar && <UserOutlined />}
          />
        </Col>
        <Col flex="auto">
          <Title level={3} style={{ margin: 0 }}>{name}</Title>
          <Text type="secondary">{categoryTitle || 'Chưa có ngành nghề'}</Text>
        </Col>
      </Row>

      <Paragraph
        ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}
        style={{ marginTop: '16px' }}
      >
        {description || 'Chưa có mô tả'}
      </Paragraph>

      <Space direction="vertical" size="middle" style={{ width: '100%', marginTop: '16px' }}>
        <div>
          <Space align="center">
            <EnvironmentOutlined />
            <Text className='me-1' strong>Địa chỉ:</Text>
          </Space>
          <Text>{address || 'Chưa có địa chỉ'}</Text>
        </div>

        <div>

          <div style={{ marginTop: '8px' }}>
          <Text className='me-1' strong>Kỹ năng:</Text>
            {validSkills.length > 0 ? (
              validSkills.map(skill => (
                <Tag color="blue" key={skill} style={{ marginBottom: '8px' }}>
                  {skill}
                </Tag>
              ))
            ) : (
              <Text type="secondary">Chưa có kỹ năng</Text>
            )}
          </div>
        </div>

        <div>
        <Space align="center">
          <BookOutlined />
          <Text strong>Học vấn:</Text>
        </Space>
        {education.length > 0 ? (
          <List
            size="small"
            dataSource={education}
            renderItem={edu => (
              <List.Item>
                <Space direction="vertical" size={4} style={{ width: '100%' }}>
                  <Text strong>{edu.schoolName}</Text>
                  <Space size={8}>
                    <Text type="secondary">{edu.mojorName}</Text>
                    <Text type="secondary">-</Text>
                    <Text type="secondary">{edu.degreeName}</Text>
                  </Space>
                  <Space size={8}>
                    <CalendarOutlined />
                    <Text>{formatDate(edu.dateStart)} - {formatDate(edu.dateEnd)}</Text>
                  </Space>
                  <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}>
                    {edu.description}
                  </Paragraph>
                </Space>
              </List.Item>
            )}
          />
        ) : (
          <Text type="secondary"> Chưa có thông tin học vấn</Text>
        )}
      </div>
      </Space>
    </Card>
  );
};

export default FreelancerCard;