import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Avatar, Typography, Tag, Button, message, Upload } from 'antd';
import { Edit, EyeIcon, Share, UploadIcon } from 'lucide-react';
import axios from 'axios';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const FreelancerInfo = () => {
    const [profileData, setProfileData] = useState({
        name: '',
        location: '',
        title: '',
        rate: '',
        intro: '',
        skills: [],
        image: '',
    });
    const [loading, setLoading] = useState(false);

    const [idRole, setIdRole] = useState();


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setIdRole(user.data.idRole);
            } catch (error) {
                console.error('Error parsing stored user:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (idRole) {
            fetchFreelancerInfo();
        }
    }, [idRole]);

    const fetchFreelancerInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/getAllInfoFreelancer');
            const freelancerData = response.data.data.find(f => f.freelancerId === idRole);
            console.log(freelancerData)
            if (freelancerData) {
                setProfileData({
                    name: `${freelancerData.firstName || ''} ${freelancerData.lastName || ''}`.trim(),
                    location: freelancerData.address || '',
                    title: freelancerData.categoryTitle || 'Not specified',
                    image: freelancerData.image || '',
                    skills: freelancerData.skills
                        .filter(skill => skill.skillName)
                        .map(skill => skill.skillName),
                });
            }
        } catch (error) {
            console.error('Error fetching freelancer info:', error);
            message.error('Failed to load freelancer information');
        }
    };

    const handleAvatarChange = async (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            const formData = new FormData();
            formData.append('file', info.file.originFileObj);

            try {
                const response = await axios.post(
                    'http://localhost:8080/api/upload',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        params: {
                            fileName: `freelancerAvt${idRole}`
                        }
                    }
                );

                if (response.data.success) {
                    message.success('Avatar uploaded successfully');
                    fetchFreelancerInfo(); // Refresh data to get new avatar
                } else {
                    message.error('Failed to upload avatar');
                }
            } catch (error) {
                console.error('Error uploading avatar:', error);
                message.error('Failed to upload avatar');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', margin: '50px' }}>
            <Header style={{ backgroundColor: '#f0f2f5', padding: '0 24px', height: 'auto' }}>
                <Row justify="space-between" align="middle" style={{ backgroundColor: '#fff', width: '100%' }}>
                    <Col>
                        <Card style={{ marginBottom: '20px', width: '100%' }}>
                            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                                <Upload
                                    name="avatar"
                                    listType="picture-circle"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    onChange={handleAvatarChange}
                                >
                                    {profileData.image ? (
                                        <Avatar
                                            size={64}
                                            src={profileData.image}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    ) : (
                                        <div>
                                            <UploadIcon />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    )}
                                </Upload>
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
                    </Row>
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Kĩ năng" extra={<Edit />}>
                    {profileData.skills.map(skill => <Tag key={skill}>{skill}</Tag>)}
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