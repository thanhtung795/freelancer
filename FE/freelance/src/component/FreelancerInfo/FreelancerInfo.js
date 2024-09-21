import React from 'react';
import { Layout, Row, Col, Card, Avatar, Typography, Tag, Button, Space } from 'antd';
import { Edit, EyeIcon, Share } from 'lucide-react';
const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const FreelancerInfo = () => {
    const profileData = {
        name: 'Quang Bùi.',
        location: 'Ho Chi Minh City, Vietnam',
        title: 'Web-Development',
        rate: '$4.00/hr',
        intro: 'Aim to the moon',
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
                            <Title level={5}>{profileData.title} <Edit /></Title>
                            <Paragraph>{profileData.intro}</Paragraph>
                        </Col>
                        <Col>
                            <Text strong>{profileData.rate} <Edit /></Text>
                        </Col>
                    </Row>
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Thông tin cá nhân" extra={<Edit />}>
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Lịch sử làm việc" extra={<Edit />}>
                    <Text type="secondary">Chưa có thông tin</Text>
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Kĩ năng" extra={<Edit />}>
                    {profileData.skills.map(skill => <Tag key={skill}>{skill}</Tag>)}
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Các dự án của bạn" extra={<Edit />}>
                    <Button type="primary">Quản lý dự án</Button>
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Chứng thực từ khách hàng" extra={<Edit />}>
                    <Text type="secondary">Chưa có</Text>
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Các chứng nhận" extra={<Edit />}>
                    <Text type="secondary">Chưa có</Text>
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Employment history" extra={<Edit />}>
                    <Text type="secondary">Chưa có</Text>
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Các kinh nghiệm khác" extra={<Edit />}>
                    <Text type="secondary">Chưa có</Text>
                </Card>
            </Content>
        </Layout>
    );
};

export default FreelancerInfo;