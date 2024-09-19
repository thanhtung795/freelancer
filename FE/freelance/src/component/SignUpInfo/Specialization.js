import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';

const Specialization = () => {
  const history = useNavigate();
  const [specialization, setSpecialization] = useState('');
  const [skills, setSkills] = useState([]);

  const handleSpecializationChange = (e) => {
    setSpecialization(e.target.value);
    setSkills([]);
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSkills([...skills, value]);
    } else {
      setSkills(skills.filter(skill => skill !== value));
    }
  };

  const handleNext = () => {
    // Xử lý lưu dữ liệu
    history('/experience');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Chọn chuyên ngành và kỹ năng
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Chuyên ngành</InputLabel>
        <Select value={specialization} onChange={handleSpecializationChange}>
          <MenuItem value="webdev">Web Development</MenuItem>
          <MenuItem value="mobiledev">Mobile Development</MenuItem>
          <MenuItem value="design">Design</MenuItem>
        </Select>
      </FormControl>
      {specialization && (
        <FormGroup>
          <Typography variant="h6" gutterBottom>
            Kỹ năng
          </Typography>
          {specialization === 'webdev' && (
            <>
              <FormControlLabel
                control={<Checkbox onChange={handleSkillChange} value="react" />}
                label="React"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleSkillChange} value="nodejs" />}
                label="Node.js"
              />
            </>
          )}
          {/* Thêm các kỹ năng cho các chuyên ngành khác */}
        </FormGroup>
      )}
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleNext}>
          Tiếp theo
        </Button>
      </Box>
    </Container>
  );
};

export default Specialization;