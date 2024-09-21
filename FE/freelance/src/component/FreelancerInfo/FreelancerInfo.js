import React from 'react';
import { Layout, Row, Col, Card, Avatar, Typography, Tag, Button, Space } from 'antd';
import { EditOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Edit, Eye, EyeIcon, Share } from 'lucide-react';
const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const FreelancerInfo = () => {
    const profileData = {
        name: 'Quang Bùi.',
        location: 'Ho Chi Minh City, Vietnam',
        title: 'Web-Development',
        rate: '$4.00/hr',
        intro: '',
        skills: ['Web API', 'Web Application', 'Java', 'Java GUI', 'Javascript', 'React', 'Bootstrap', 'Responsive Design'],
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ backgroundColor: '#f0f2f5', padding: '0 24px', height: 'auto' }}>
                <Row justify="space-between" align="middle" style={{ backgroundColor: '#fff', width: '100%' }}>
                    <Col>
                        <Card style={{ marginBottom: '20px', width: '100%' }}>
                            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                                <Avatar size={64} src="https://xsgames.co/randomusers/avatar.php?g=male" />
                                <Title level={4} style={{ margin: '8px 0' }}>{profileData.name}</Title>
                                <Text type="secondary">{profileData.location}</Text>

                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Row style={{ margin: '8px 5px' }}>
                            <Button icon={<EyeIcon />} type="primary" block>See public view</Button>
                        </Row>
                        <Row style={{ margin: '8px 5px' }}>
                            <Button icon={<Edit />} block>Profile settings</Button>
                        </Row>
                        <Row style={{ margin: '8px 5px' }}>
                            <Button icon={<Share />} block>Share profile</Button>
                        </Row>
                    </Col>
                </Row>
            </Header>
            <Content style={{ padding: '24px' }}>
                <Card style={{ marginBottom: '20px' }}>
                    <Row justify="space-between">
                        <Col>
                            <Title level={5}>{profileData.title} <EditOutlined /></Title>
                            <Paragraph>{profileData.intro}</Paragraph>
                        </Col>
                        <Col>
                            <Text strong>{profileData.rate} <EditOutlined /></Text>
                        </Col>
                    </Row>
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Portfolio" extra={<EditOutlined />}>
                    {/* Portfolio content */}
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Work history" extra={<EditOutlined />}>
                    {/* Work history content */}
                    <Text type="secondary">No items</Text>
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Skills" extra={<EditOutlined />}>
                    {profileData.skills.map(skill => <Tag key={skill}>{skill}</Tag>)}
                </Card>

                {/* Other sections like Your project catalog, Testimonials, Certifications, etc. */}
                <Card style={{ marginBottom: '20px' }} title="Your project catalog" extra={<EditOutlined />}>
                    <Button type="primary">Manage projects</Button>
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Testimonials" extra={<EditOutlined />}>
                    <Text type="secondary">Endorsements from past clients</Text>
                    {/* Content for testimonials */}
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Certifications" extra={<EditOutlined />}>
                    {/* Content for certifications */}
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Employment history" extra={<EditOutlined />}>
                    {/* Content for employment history */}
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Other experiences" extra={<EditOutlined />}>
                    {/* Content for other experiences */}
                </Card>
            </Content>
        </Layout>
    );
};

export default FreelancerInfo;