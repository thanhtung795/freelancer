import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Typography, Input, List, Card, Row, Col} from 'antd';

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
    if (!currentExperience.company || !currentExperience.position || !currentExperience.startDate || !currentExperience.endDate) {
      return;
    }
    setExperiences([...experiences, currentExperience]);
    setCurrentExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleButtonClick = () => {
    navigate('/description');
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16}>
        <Card title={<Typography.Title level={4}>Kinh nghiệm làm việc</Typography.Title>}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="Tên công ty" required>
                  <Input
                    value={currentExperience.company}
                    onChange={handleInputChange}
                    name="company"
                    placeholder="Nhập tên công ty"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Vị trí" required>
                  <Input
                    value={currentExperience.position}
                    onChange={handleInputChange}
                    name="position"
                    placeholder="Nhập vị trí làm việc"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="Ngày bắt đầu" required>
                  <Input
                    type="date"
                    value={currentExperience.startDate}
                    onChange={handleInputChange}
                    name="startDate"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Ngày kết thúc" required>
                  <Input
                    type="date"
                    value={currentExperience.endDate}
                    onChange={handleInputChange}
                    name="endDate"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                type="primary"
                onClick={handleAddExperience}
                block
                disabled={!currentExperience.company || !currentExperience.position || !currentExperience.startDate || !currentExperience.endDate}
              >
                Thêm kinh nghiệm
              </Button>
            </Form.Item>

            {experiences.length > 0 && (
              <List
                header={<Typography.Title level={5}>Danh sách kinh nghiệm</Typography.Title>}
                dataSource={experiences}
                renderItem={(exp, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      title={`${exp.position} tại ${exp.company}`}
                      description={`${exp.startDate} - ${exp.endDate}`}
                    />
                  </List.Item>
                )}
              />
            )}

            <Form.Item>
              <Button type="primary" onClick={handleButtonClick} block>
                Tiếp theo
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
export default Experience;