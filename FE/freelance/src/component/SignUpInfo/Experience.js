import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const Experience = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (e) => {
    setCurrentExperience({
      ...currentExperience,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, currentExperience]);
    setCurrentExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleButtonClick = () => {
    // Xử lý lưu dữ liệu
    navigate('/description');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Kinh nghiệm làm việc
      </Typography>
      <form>
        <TextField
          fullWidth
          label="Tên công ty"
          name="company"
          value={currentExperience.company}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Vị trí"
          name="position"
          value={currentExperience.position}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Ngày bắt đầu"
          name="startDate"
          type="date"
          value={currentExperience.startDate}
          onChange={handleInputChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Ngày kết thúc"
          name="endDate"
          type="date"
          value={currentExperience.endDate}
          onChange={handleInputChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="outlined" color="primary" onClick={handleAddExperience}>
          Thêm kinh nghiệm
        </Button>
      </form>
      <List>
        {experiences.map((exp, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${exp.position} tại ${exp.company}`}
              secondary={`${exp.startDate} - ${exp.endDate}`}
            />
          </ListItem>
        ))}
      </List>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Tiếp theo
        </Button>
      </Box>
    </Container>
  );
};

export default Experience;