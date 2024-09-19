import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from '@mui/material';

const Description = () => {
    const [description, setDescription] = useState('');
    const navigate = useNavigate(); 
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };
  
    const handleButtonClick = () => {

      navigate('/personal-info'); 
    };
  
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Mô tả bản thân
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={10}
        label="Mô tả (ít nhất 200 từ)"
        value={description}
        onChange={handleDescriptionChange}
        margin="normal"
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Hoàn thành
        </Button>
      </Box>
    </Container>
  );
};

export default Description;