import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Input, Row, Space, Tag, Typography, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const skillCategories = {
  'Web Design': ['WordPress', 'WooCommerce', 'Web Development', 'PHP', 'CSS', 'JavaScript', 'HTML', 'HTML5', 'WordPress Plugin', 'Ecommerce Website', 'CSS3', 'MySQL', 'jQuery', 'Website Customization'],
  'Mobile Development': ['iOS', 'Android', 'React Native', 'Flutter', 'Kotlin', 'Swift'],
  'Data Science': ['Python', 'R', 'Machine Learning', 'Data Visualization', 'Big Data'],
  'Cloud Computing': ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
  'Cybersecurity': ['Network Security', 'Ethical Hacking', 'Cryptography', 'Incident Response']
};

const SkillsSelector = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const filteredSkills = Object.entries(skillCategories).reduce((acc, [category, skills]) => {
    const filtered = skills.filter(skill =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  return (
    <Space direction="vertical" size="large" style={{ display: 'flex', padding: '24px' }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16}>
          <Card title={false} bordered={false}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '16px' }}>Chọn các kỹ năng cần thiết cho công việc của bạn</Title>
            <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '24px' }}>
              Để có kết quả tốt nhất, hãy thêm 3-5 kỹ năng
            </Text>
            <Card bordered={false} style={{ backgroundColor: '#f5f5f5', padding: '16px' }}>
              <Space wrap style={{ marginBottom: '16px' }}>
                {selectedSkills.map(skill => (
                  <Tag
                    key={skill}
                    closable
                    onClose={() => handleSkillToggle(skill)}
                    color="blue"
                  >
                    {skill}
                  </Tag>
                ))}
              </Space>
              <Input
                placeholder="Tìm kiếm kỹ năng hoặc thêm kỹ năng của bạn"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<SearchOutlined />}
                style={{ marginBottom: '16px' }}
                allowClear
              />
            </Card>
          </Card>
        </Col>
      </Row>

      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24}>
          <Title level={4} style={{ textAlign: 'center', marginBottom: '16px' }}>Kỹ năng phổ biến theo danh mục</Title>
        </Col>
        {Object.entries(filteredSkills).map(([category, skills]) => (
          <Col xs={24} sm={12} md={8} key={category}>
            <Card
              title={<Text strong>{category}</Text>}
              size="small"
              bordered={false}
              style={{ borderRadius: '8px', backgroundColor: '#fafafa' }}
            >
              <Space wrap>
                {skills.map(skill => (
                  <Tag
                  key={skill}
                  color={selectedSkills.includes(skill) ? 'blue' : 'default'}
                    style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                    onClick={() => handleSkillToggle(skill)}
                    onMouseEnter={(e) => e.target.style.borderColor = '#1890ff'}
                    onMouseLeave={(e) => e.target.style.borderColor = selectedSkills.includes(skill) ? '#1890ff' : '#d9d9d9'}
                  >
                    {skill} {selectedSkills.includes(skill) ? '✓' : '+'}
                  </Tag>
                ))}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Row justify="center" style={{ marginTop: '24px' }}>
        <Col>
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => navigate('/experience')}
              size="large"
              style={{
                borderRadius: '8px',
                padding: '0 40px',
              }}
            >
              Tiếp theo
            </Button>

            <Button
              type="default"
              onClick={() => navigate('/experience')}
              size="large"
              style={{
                borderRadius: '8px',
                padding: '0 40px',
              }}
            >
              Bỏ qua
            </Button>
          </Space>
        </Col>
      </Row>
    </Space>
  );
};

export default SkillsSelector;