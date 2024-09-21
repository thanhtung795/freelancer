import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';

const PersonalInfo = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: 'abc@xyz.com',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {

        navigate('/SkillsSelector');
    };

    return (
        <>
            <Typography.Title level={2}>Thông tin cá nhân</Typography.Title>
            <Form layout="vertical">
                <Form.Item label="Họ tên">
                    <Input value={formData.fullName} onChange={handleChange} name="fullName" />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input value={formData.phoneNumber} onChange={handleChange} name="phoneNumber" />
                </Form.Item>
                <Form.Item label="Email" disabled>
                    <Input value={formData.email} name="email" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleNext}>
                        Tiếp theo
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default PersonalInfo;
