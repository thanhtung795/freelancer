import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Avatar, Typography, Tag, Button, message, Upload, Input, Select, DatePicker, Form, Modal, Divider } from 'antd';
import { EditOutlined, EyeOutlined, ShareAltOutlined, UploadOutlined, SaveOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const FreelancerInfo = () => {
    const [form] = Form.useForm();
    const [profileData, setProfileData] = useState({
        fullName: '',
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
    const [majors, setMajors] = useState([]);
    const [newMajor, setNewMajor] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newSchool, setNewSchool] = useState('');
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setIdRole(user.data);
            } catch (error) {
                console.error('Lỗi khi phân tích dữ liệu người dùng đã lưu:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (idRole) {
            fetchFreelancerInfo(idRole.idRole);
            fetchDegrees();
            fetchSchools();
            fetchSkills();
            fetchCategories();
            fetchProvinces();
            fetchMajors();
        }
    }, [idRole]);
    const fetchMajors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/majors');
            setMajors(response.data);
        } catch (error) {
            console.error('Error fetching majors:', error);
        }
    };
    const fetchFreelancerInfo = async (idRole) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/getFreelancerById/${idRole}`);
            const freelancerData = response.data.data;
            if (freelancerData) {
                setProfileData({
                    fullName: `${freelancerData.firstName || ''} ${freelancerData.lastName || ''}`.trim(),
                    address: freelancerData.address || '',
                    title: freelancerData.categoryTitle || 'Chưa có ngành nghề',
                    image: freelancerData.image || '',
                    skills: freelancerData.skills
                        .filter(skill => skill.id && skill.skillName)
                        .map(skill => skill.id),
                    education: freelancerData.eduInfoFreelancerDTOList || [],
                });

                if (freelancerData.address) {
                    const addressParts = freelancerData.address.split(', ');
                    if (addressParts.length >= 4) {
                        form.setFieldsValue({
                            addressDetail: addressParts[0],
                            ward: addressParts[1],
                            district: addressParts[2],
                            province: addressParts[3]
                        });
                    }
                }
            }
        } catch (error) {
            console.error('Lỗi khi tải thông tin freelancer:', error);
            message.error('Không thể tải thông tin freelancer');
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

    const handleAddNewSchool = async () => {
        if (!newSchool) return;
        try {
            const response = await axios.post('http://localhost:8080/api/school', { schoolName: newSchool });
            const newSchoolData = response.data.data;
            setSchools([...schools, newSchoolData]);
            setNewSchool('');
            message.success('New school added successfully');
        } catch (error) {
            console.error('Error adding new school:', error);
            message.error('Failed to add new school');
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
            console.error('Lỗi khi tải danh sách quận/huyện:', error);
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
            console.error('Lỗi khi tải danh sách phường/xã:', error);
        }
    };

    const handleAddNewMajor = async () => {
        if (!newMajor) return;
        try {
            const response = await axios.post('http://localhost:8080/api/majors', { majorName: newMajor });
            const newMajorData = response.data;
            setMajors([...majors, newMajorData]);
            setNewMajor('');
            message.success('New major added successfully');
        } catch (error) {
            console.error('Error adding new major:', error);
            message.error('Failed to add new major');
        }
    };

    const handleAddNewCategory = async () => {
        if (!newCategory) return;
        try {
            const response = await axios.post('http://localhost:8080/api/categories', { categoryTitle: newCategory });
            const newCategoryData = response.data;
            setCategories([...categories, newCategoryData]);
            setNewCategory('');
            message.success('New category added successfully');
        } catch (error) {
            console.error('Error adding new category:', error);
            message.error('Failed to add new category');
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
        const fileName = `avatar${idRole.idRole}${fileList[0].name.slice(fileList[0].name.lastIndexOf('.'))}`;
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
                fetchFreelancerInfo(idRole.idRole);
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
            await axios.put(`http://localhost:8080/api/freelancers/${idRole.idRole}/update-image?image=${imageName}`);
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
                await axios.put(`http://localhost:8080/api/freelancers/${idRole.idRole}/update-category?categoryId=${value}`);
            } else if (field === 'fullName') {
                const [firstName, ...lastNameParts] = value.split(' ');
                const lastName = lastNameParts.join(' ');
                await axios.put(`http://localhost:8080/api/users/${idRole.id}`, { firstName, lastName });
            } else if (field === 'address') {
                const { province, district, ward, addressDetail } = value;
                const provinceName = provinces.find(p => p.code === province)?.name || '';
                const districtName = districts.find(d => d.code === district)?.name || '';
                const wardName = wards.find(w => w.code === ward)?.name || '';
                const fullAddress = `${addressDetail}, ${wardName}, ${districtName}, ${provinceName}`;
                await axios.put(`http://localhost:8080/api/users/${idRole.id}`, { address: fullAddress });
            } else {
                await axios.put(`http://localhost:8080/api/users/${idRole.id}`, { [field]: value });
            }
            message.success(`${field === 'fullName' ? 'Họ tên' : field === 'address' ? 'Địa chỉ' : field} đã được cập nhật thành công`);
            fetchFreelancerInfo(idRole.idRole);
            setEditing({ ...editing, [field]: false });
        } catch (error) {
            console.error(`Lỗi khi cập nhật ${field}:`, error);
            message.error(`Không thể cập nhật ${field}`);
        }
    };

    const handleAddEducation = async (values) => {
        try {
            await axios.post('http://localhost:8080/api/education', {
                freelancerId: idRole.idRole,
                ...values,
                dateStart: values.dateStart.format('YYYY-MM-DD'),
                dateEnd: values.dateEnd.format('YYYY-MM-DD'),
            });
            message.success('Education added successfully');
            fetchFreelancerInfo(idRole.idRole);
            setEditing({ ...editing, education: false });
        } catch (error) {
            console.error('Error adding education:', error);
            message.error('Failed to add education');
        }
    };

    const handleSkillChange = async (selectedSkills) => {
        try {
            await axios.delete(`http://localhost:8080/api/freelancerSkill/${idRole.idRole}`);
            for (const skillId of selectedSkills) {
                await axios.post('http://localhost:8080/api/freelancerSkill', {
                    freelancerId: idRole.idRole,
                    skillId: skillId
                });
            }
            message.success('Skills updated successfully');
            fetchFreelancerInfo(idRole.idRole);
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
                    <>
                        <Select
                            style={{ width: '100%' }}
                            onChange={(value) => handleSave(field, value)}
                            defaultValue={value}
                        >
                            {categories.map(cat => <Option key={cat.id} value={cat.id}>{cat.categoryTitle}</Option>)}
                        </Select>
                        <Input
                            style={{ marginTop: '10px' }}
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Enter new category"
                        />
                        <Button onClick={handleAddNewCategory} style={{ marginTop: '10px' }}>Add New Category</Button>
                    </>
                ) : inputType === 'address' ? (
                    <Form form={form} onFinish={(values) => handleSave('address', values)}>
                        <Form.Item name="province" rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}>
                            <Select
                                placeholder="Chọn tỉnh/thành phố"
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
                        <Form.Item name="district" rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}>
                            <Select
                                placeholder="Chọn quận/huyện"
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
                        <Form.Item name="ward" rules={[{ required: true, message: 'Vui lòng chọn phường/xã' }]}>
                            <Select
                                placeholder="Chọn phường/xã"
                                onChange={(value) => setSelectedWard(wards.find(w => w.code === value))}
                                disabled={!selectedDistrict}
                            >
                                {wards.map(ward => (
                                    <Option key={ward.code} value={ward.code}>{ward.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="addressDetail" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết' }]}>
                            <Input placeholder="Nhập địa chỉ chi tiết" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Lưu địa chỉ</Button>
                            <Button
                                icon={<CloseOutlined />}
                                onClick={() => setEditing({ ...editing, address: false })}
                                style={{ marginLeft: '10px' }}
                            >
                                Hủy
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <>
                        <Select 
                            mode="multiple" 
                            style={{ width: '100%' }} 
                            onChange={(value) => handleSave(field, value)}
                            defaultValue={value}
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
                    </>
                )}
            </Form.Item>
        ) : (
            <>
                <Text>{value || 'Not updated'}</Text>
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
                                                <div style={{ marginTop: 8 }}>Tải lên</div>
                                            </div>}
                                        </Upload>
                                        <Button
                                            onClick={handleAvatarUpload}
                                            icon={<UploadOutlined />}
                                            type="primary"
                                            style={{ marginTop: '8px' }}
                                        >
                                            Tải lên ảnh đại diện
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
                                <img alt="avatar" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                            <div style={{ textAlign: 'center' }}>
                                <Title level={4}>{renderEditableField('fullName', profileData.fullName)}</Title>
                                <Paragraph>{renderEditableField('address', profileData.address, 'address')}</Paragraph>
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Row style={{ margin: '8px 5px' }}>
                            <Button icon={<EyeOutlined />} type="primary" block>Xem trang công khai</Button>
                        </Row>
                        <Row style={{ margin: '8px 5px' }}>
                            <Button icon={<ShareAltOutlined />} block>Chia sẻ hồ sơ</Button>
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
                

                <Card style={{ marginBottom: '20px' }} title="Kỹ năng" extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('skills')} />}>
                    {editing.skills ? (
                        <>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Chọn kỹ năng"
                                defaultValue={profileData.skills}
                                onChange={handleSkillChange}
                            >
                                {allSkills.map(skill => <Option key={skill.id} value={skill.id}>{skill.skillName}</Option>)}
                            </Select>
                            <Input
                                style={{ marginTop: '10px' }}
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Nhập kỹ năng mới"
                            />
                            <Button onClick={handleAddNewSkill} style={{ marginTop: '10px' }}>Thêm kỹ năng mới</Button>
                            <Button
                                icon={<CloseOutlined />}
                                onClick={() => setEditing({ ...editing, skills: false })}
                                style={{ marginTop: '10px', marginLeft: '10px' }}
                            >
                                Hủy
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
                            <Text>{edu.degreeName} in {edu.mojorName}</Text>
                            <br />
                            <Text type="secondary">{moment(edu.dateStart).format('YYYY')} - {moment(edu.dateEnd).format('YYYY')}</Text>
                            <Paragraph>{edu.description}</Paragraph>
                        </div>
                    ))}
                    {editing.education && (
                        <Form onFinish={handleAddEducation}>
                            <Form.Item name="schoolId" rules={[{ required: true, message: 'Please select or enter a school' }]}>
                                <Select
                                    placeholder="Select or enter school"
                                    dropdownRender={menu => (
                                        <div>
                                            {menu}
                                            <Divider style={{ margin: '4px 0' }} />
                                            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                                <Input style={{ flex: 'auto' }} value={newSchool} onChange={e => setNewSchool(e.target.value)} />
                                                <a
                                                    style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                                    onClick={handleAddNewSchool}
                                                >
                                                    <PlusOutlined /> Add school
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                >
                                    {schools.map(school => (
                                        <Option key={school.id} value={school.id}>{school.schoolName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="degreeId" rules={[{ required: true, message: 'Please select a degree' }]}>
                                <Select placeholder="Select degree">
                                    {degrees.map(degree => <Option key={degree.id} value={degree.id}>{degree.degreeTitle}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item name="majorId" rules={[{ required: true, message: 'Please select or enter a major' }]}>
                                <Select
                                    placeholder="Select or enter major"
                                    dropdownRender={menu => (
                                        <div>
                                            {menu}
                                            <Divider style={{ margin: '4px 0' }} />
                                            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                                <Input style={{ flex: 'auto' }} value={newMajor} onChange={e => setNewMajor(e.target.value)} />
                                                <a
                                                    style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                                    onClick={handleAddNewMajor}
                                                >
                                                    <PlusOutlined /> Add major
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                >
                                    {majors.map(major => (
                                        <Option key={major.majorId} value={major.majorId}>{major.majorName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="dateStart" rules={[{ required: true, message: 'Please select start date' }]}>
                                <DatePicker placeholder="Start date" />
                            </Form.Item>
                            <Form.Item name="dateEnd" rules={[{ required: true, message: 'Please select end date' }]}>
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
            </Content>
        </Layout>
    );
};

export default FreelancerInfo;
