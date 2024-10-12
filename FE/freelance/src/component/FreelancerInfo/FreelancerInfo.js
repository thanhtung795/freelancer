import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Avatar, Typography, Tag, Button, message, Upload, Input, Select, DatePicker, Form, Modal } from 'antd';
import { EditOutlined, EyeOutlined, ShareAltOutlined, UploadOutlined, SaveOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const FreelancerInfo = () => {
    const [form] = Form.useForm();
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        title: '',
        intro: '',
        skills: [],
        image: '',
        education: [],
    });
    const [loading, setLoading] = useState(false);
    const [idRole, setIdRole] = useState();
    const [editing, setEditing] = useState({});
    const [degrees, setDegrees] = useState([]);
    const [schools, setSchools] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const [categories, setCategories] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

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
            fetchDegrees();
            fetchSchools();
            fetchSkills();
            fetchCategories();
            fetchProvinces();
        }
    }, [idRole]);

    const fetchFreelancerInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/getAllInfoFreelancer');
            const freelancerData = response.data.data.find(f => f.freelancerId === idRole);
            if (freelancerData) {
                setProfileData({
                    firstName: freelancerData.firstName || '',
                    lastName: freelancerData.lastName || '',
                    address: freelancerData.address || '',
                    title: freelancerData.categoryTitle || 'Chưa có ngành nghề',
                    image: freelancerData.image || '',
                    skills: freelancerData.skills
                        .filter(skill => skill.id && skill.skillName)
                        .map(skill => skill.id),
                    education: freelancerData.eduInfoFreelancerDTOList || [],
                });
            }
        } catch (error) {
            console.error('Error fetching freelancer info:', error);
            message.error('Failed to load freelancer information');
        }
    };

    const fetchDegrees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/degrees');
            setDegrees(response.data.data);
        } catch (error) {
            console.error('Error fetching degrees:', error);
        }
    };

    const fetchSchools = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/school');
            setSchools(response.data.data);
        } catch (error) {
            console.error('Error fetching schools:', error);
        }
    };

    const fetchSkills = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/skills');
            setAllSkills(response.data.data);
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProvinces = async () => {
        try {
            const response = await axios.get('https://api.mysupership.vn/v1/partner/areas/province');
            if (response.data && response.data.results) {
                setProvinces(response.data.results);
            }
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    const fetchDistricts = async (provinceCode) => {
        try {
            const response = await axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${provinceCode}`);
            if (response.data && response.data.results) {
                setDistricts(response.data.results);
                form.setFieldsValue({ district: undefined, ward: undefined });
                setSelectedDistrict(null);
                setWards([]);
            }
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const fetchWards = async (districtCode) => {
        try {
            const response = await axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${districtCode}`);
            if (response.data && response.data.results) {
                setWards(response.data.results);
                form.setFieldsValue({ ward: undefined });
            }
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    const handleChange = ({ fileList }) => setFileList(fileList);

    const handleAvatarUpload = async () => {
        if (fileList.length === 0) {
            message.error('Please select an image to upload');
            return;
        }

        const formData = new FormData();
        const fileName = `avatar${idRole}${fileList[0].name.slice(fileList[0].name.lastIndexOf('.'))}`;
        formData.append('file', fileList[0].originFileObj, fileName);

        try {
            const response = await axios.post(
                'http://localhost:8080/api/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.success) {
                message.success('Avatar uploaded successfully');
                await updateImageName(fileName);
                fetchFreelancerInfo();
                setFileList([]);
                setEditing({ ...editing, avatar: false });
            } else {
                message.error('Failed to upload avatar');
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            message.error('Failed to upload avatar');
        }
    };

    const updateImageName = async (imageName) => {
        try {
            await axios.put(`http://localhost:8080/api/freelancers/${idRole}/update-image?image=${imageName}`);
            message.success('Image name updated successfully');
        } catch (error) {
            console.error('Error updating image name:', error);
            message.error('Failed to update image name');
        }
    };

    const handleEdit = (field) => {
        setEditing({ ...editing, [field]: !editing[field] });
    };

    const handleSave = async (field, value) => {
        try {
            if (field === 'title') {
                await axios.put(`http://localhost:8080/api/freelancers/${idRole}/update-category?categoryId=${value}`);
            } else {
                await axios.put(`http://localhost:8080/api/users/${idRole}`, { [field]: value });
            }
            message.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`);
            fetchFreelancerInfo();
            setEditing({ ...editing, [field]: false });
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
            message.error(`Failed to update ${field}`);
        }
    };

    const handleAddEducation = async (values) => {
        try {
            await axios.post('http://localhost:8080/api/education', {
                freelancerId: idRole,
                ...values,
                dateStart: values.dateStart.format('YYYY-MM-DD'),
                dateEnd: values.dateEnd.format('YYYY-MM-DD'),
            });
            message.success('Education added successfully');
            fetchFreelancerInfo();
            setEditing({ ...editing, education: false });
        } catch (error) {
            console.error('Error adding education:', error);
            message.error('Failed to add education');
        }
    };

    const handleSkillChange = async (selectedSkills) => {
        try {
            await axios.delete(`http://localhost:8080/api/freelancerSkill/${idRole}`);
            for (const skillId of selectedSkills) {
                await axios.post('http://localhost:8080/api/freelancerSkill', {
                    freelancerId: idRole,
                    skillId: skillId
                });
            }
            message.success('Skills updated successfully');
            fetchFreelancerInfo();
        } catch (error) {
            console.error('Error updating skills:', error);
            message.error('Failed to update skills');
        }
    };

    const handleAddNewSkill = async () => {
        if (!newSkill) return;
        try {
            const response = await axios.post('http://localhost:8080/api/skills', { skillName: newSkill });
            const newSkillId = response.data.data.id;
            setAllSkills([...allSkills, { id: newSkillId, skillName: newSkill }]);
            setNewSkill('');
            message.success('New skill added successfully');
        } catch (error) {
            console.error('Error adding new skill:', error);
            message.error('Failed to add new skill');
        }
    };

    const renderEditableField = (field, value, inputType = 'input') => {
        return editing[field] ? (
            <Form.Item name={field} initialValue={value}>
                {inputType === 'input' ? (
                    <Input
                        defaultValue={value}
                        onBlur={(e) => handleSave(field, e.target.value)}
                    />
                ) : inputType === 'category' ? (
                    <Select style={{ width: '100%' }} onChange={(value) => handleSave(field, value)}>
                        {categories.map(cat => <Option key={cat.id} value={cat.id}>{cat.categoryTitle}</Option>)}
                    </Select>
                ) : (
                    <Select style={{ width: '100%' }} onChange={(value) => handleSave(field, value)}>
                        {allSkills.map(skill => <Option key={skill.id} value={skill.id}>{skill.skillName}</Option>)}
                    </Select>
                )}
                <Button
                    icon={<CloseOutlined />}
                    onClick={() => setEditing({ ...editing, [field]: false })}
                    style={{ marginTop: '10px' }}
                >
                    Cancel
                </Button>
            </Form.Item>
        ) : (
            <>
                <Text>{value || 'Chưa cập nhật'}</Text>
                <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(field)}
                    style={{ marginLeft: '10px' }}
                />
            </>
        );
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    return (
        <Layout style={{ minHeight: '100vh', margin: '50px' }}>
            <Header style={{ backgroundColor: '#f0f2f5', padding: '0 24px', height: 'auto' }}>
                <Row justify="space-between" align="middle" style={{ backgroundColor: '#fff', width: '100%' }}>
                    <Col>
                        <Card style={{ marginBottom: '20px', width: '100%' }}>
                            <div style={{ position: 'relative', textAlign: 'center', marginBottom: 16 }}>
                                <Avatar
                                    size={150}
                                    src={`http://localhost:8080/uploads/images/${profileData.image}`}
                                    style={{ marginBottom: '16px' }}
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 'calc(50% - 75px)',
                                        cursor: 'pointer',
                                        background: '#fff',
                                        borderRadius: '50%',
                                        padding: '5px',
                                    }}
                                    onClick={() => handleEdit('avatar')}
                                >
                                    <EditOutlined />
                                </div>
                                {editing.avatar && (
                                    <div style={{ textAlign: 'center' }}>
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            showUploadList={false}
                                            beforeUpload={() => false}
                                            onChange={handleChange}
                                            onPreview={handlePreview}
                                        >
                                            {fileList.length >= 1 ? null : <div>
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </div>}
                                        </Upload>
                                        <Button
                                            onClick={handleAvatarUpload}
                                            icon={<UploadOutlined />}
                                            type="primary"
                                            style={{ marginTop: '8px' }}
                                        >
                                            Upload Avatar
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
                                <img alt="avatar" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                            <div style={{ textAlign: 'center' }}>
                                <Title level={4}>{renderEditableField('firstName', profileData.firstName)}</Title>
                                <Title level={4}>{renderEditableField('lastName', profileData.lastName)}</Title>
                                <Paragraph>{renderEditableField('address', profileData.address, 'address')}</Paragraph>
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Row style={{ margin: '8px 5px' }}>
                            <Button icon={<EyeOutlined />} type="primary" block>See public view</Button>
                        </Row>
                        <Row style={{ margin: '8px 5px' }}>
                            <Button icon={<ShareAltOutlined />} block>Share profile</Button>
                        </Row>
                    </Col>
                </Row>
            </Header>
            <Content style={{ padding: '24px' }}>
                <Card style={{ marginBottom: '20px' }}>
                    <Row justify="space-between">
                        <Col>
                            <Title level={5}>{renderEditableField('title', profileData.title, 'category')}</Title>
                            <Paragraph>{renderEditableField('intro', profileData.intro)}</Paragraph>
                        </Col>
                    </Row>
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Skills" extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('skills')} />}>
                    {editing.skills ? (
                        <>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Select skills"
                                defaultValue={profileData.skills}
                                onChange={handleSkillChange}
                            >
                                {allSkills.map(skill => <Option key={skill.id} value={skill.id}>{skill.skillName}</Option>)}
                            </Select>
                            <Input
                                style={{ marginTop: '10px' }}
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Enter new skill"
                            />
                            <Button onClick={handleAddNewSkill} style={{ marginTop: '10px' }}>Add New Skill</Button>
                            <Button
                                icon={<CloseOutlined />}
                                onClick={() => setEditing({ ...editing, skills: false })}
                                style={{ marginTop: '10px', marginLeft: '10px' }}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        profileData.skills
                            .map(skillId => {
                                const skill = allSkills.find(s => s.id === skillId);
                                return skill ? <Tag key={skill.id}>{skill.skillName}</Tag> : null;
                            })
                    )}
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Education" extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('education')} />}>
                    {profileData.education.map((edu, index) => (
                        <div key={index}>
                            <Text strong>{edu.schoolName}</Text>
                            <br />
                            <Text>{edu.degreeName} in {edu.majorName}</Text>
                            <br />
                            <Text type="secondary">{moment(edu.dateStart).format('YYYY')} - {moment(edu.dateEnd).format('YYYY')}</Text>
                            <Paragraph>{edu.description}</Paragraph>
                        </div>
                    ))}
                    {editing.education && (
                        <Form onFinish={handleAddEducation}>
                            <Form.Item name="schoolId" rules={[{ required: true }]}>
                                <Select placeholder="Select school">
                                    {schools.map(school => <Option key={school.id} value={school.id}>{school.schoolName}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item name="degreeId" rules={[{ required: true }]}>
                                <Select placeholder="Select degree">
                                    {degrees.map(degree => <Option key={degree.id} value={degree.id}>{degree.degreeTitle}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item name="majorId" rules={[{ required: true }]}>
                                <Input placeholder="Enter major" />
                            </Form.Item>
                            <Form.Item name="dateStart" rules={[{ required: true }]}>
                                <DatePicker placeholder="Start date" />
                            </Form.Item>
                            <Form.Item name="dateEnd" rules={[{ required: true }]}>
                                <DatePicker placeholder="End date" />
                            </Form.Item>
                            <Form.Item name="description">
                                <Input.TextArea placeholder="Description" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Add Education</Button>
                                <Button
                                    icon={<CloseOutlined />}
                                    onClick={() => setEditing({ ...editing, education: false })}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Cancel
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </Card>

                <Card style={{ marginBottom: '20px' }} title="Address" extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('address')} />}>
                    {editing.address ? (
                        <Form form={form} onFinish={(values) => handleSave('address', `${values.addressDetail}, ${values.ward}, ${values.district}, ${values.province}`)}>
                            <Form.Item name="province" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Select province"
                                    onChange={(value) => {
                                        setSelectedProvince(provinces.find(p => p.code === value));
                                        fetchDistricts(value);
                                    }}
                                >
                                    {provinces.map(province => (
                                        <Option key={province.code} value={province.code}>{province.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="district" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Select district"
                                    onChange={(value) => {
                                        setSelectedDistrict(districts.find(d => d.code === value));
                                        fetchWards(value);
                                    }}
                                    disabled={!selectedProvince}
                                >
                                    {districts.map(district => (
                                        <Option key={district.code} value={district.code}>{district.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="ward" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Select ward"
                                    onChange={(value) => setSelectedWard(wards.find(w => w.code === value))}
                                    disabled={!selectedDistrict}
                                >
                                    {wards.map(ward => (
                                        <Option key={ward.code} value={ward.code}>{ward.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="addressDetail" rules={[{ required: true }]}>
                                <Input placeholder="Enter detailed address" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Save Address</Button>
                                <Button
                                    icon={<CloseOutlined />}
                                    onClick={() => setEditing({ ...editing, address: false })}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Cancel
                                </Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        <Paragraph>{profileData.address || 'Address not set'}</Paragraph>
                    )}
                </Card>
            </Content>
        </Layout>
    );
};

export default FreelancerInfo;