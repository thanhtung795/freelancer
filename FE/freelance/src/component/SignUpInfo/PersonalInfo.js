import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Row, Col } from 'antd';

const { Title } = Typography;

const PersonalInfo = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: 'abc@xyz.com',
    });

    const handleChange = (changedValues) => {
        setFormData(prev => ({ ...prev, ...changedValues }));
    };

    const handleNext = () => {
        form.validateFields()
            .then(() => {
                navigate('/SkillsSelector');
            })
            .catch((errorInfo) => {
                console.error('Validation Failed:', errorInfo);
            });
    };

    return (
        <>
            <Row justify="center">
                <Col xs={24} sm={16} md={12}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Thông tin cá nhân</Title>
                    <Form
                        layout="vertical"
                        form={form} 
                        initialValues={formData}
                        onValuesChange={handleChange}
                    >
                        <Form.Item
                            label="Họ tên"
                            name="fullName"
                            rules={[
                                { required: true, message: 'Vui lòng nhập họ tên!' },
                            ]}
                        >
                            <Input placeholder="Nhập họ tên của bạn" />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phoneNumber"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                { pattern: /^[0-9]+$/, message: 'Số điện thoại không hợp lệ!' }
                            ]}
                        >
                            <Input placeholder="Nhập số điện thoại của bạn" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                        >
                            <Input readOnly value={formData.email} />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                onClick={handleNext}
                                block
                                size="large"
                            >
                                Tiếp theo
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default PersonalInfo;