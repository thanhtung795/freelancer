import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
} from '@mui/material';

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

        navigate('/specialization');
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Thông tin cá nhân
            </Typography>
            <form>
                <TextField
                    fullWidth
                    label="Họ tên"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Số điện thoại"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    disabled
                />
                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        Tiếp theo
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default PersonalInfo;