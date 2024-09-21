import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Typography, Input, Row, Col, Card, Image } from 'antd';

const { TextArea } = Input;
const { Title, Text } = Typography;

const Description = () => {
    const [description, setDescription] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const navigate = useNavigate(); 

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setDescription(value);
        setWordCount(value.split(/\s+/).filter(word => word.length > 0).length); // Đếm số từ
    };

    const handleButtonClick = () => {
        if (wordCount >= 200) {
            navigate('/freelancer-info'); 
        }
    };

    return (
        <Row justify="center" style={{ minHeight: '100vh', alignItems: 'flex-start', paddingTop: '50px' }} gutter={32}>
            <Col xs={24} sm={24} md={12} lg={12}>
                <Form layout="vertical">
                    <Title level={3} style={{ textAlign: 'center' }}>Mô tả bản thân</Title>
                    <Form.Item
                        label="Mô tả (ít nhất 200 từ)"
                        validateStatus={wordCount < 200 ? 'error' : 'success'}
                        help={wordCount < 200 ? `Bạn đã nhập ${wordCount} từ, cần ít nhất 200 từ.` : null}
                    >
                        <TextArea
                            rows={10}
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Hãy mô tả về bản thân bạn..."
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={handleButtonClick}
                            block
                            size="large"
                            disabled={wordCount < 200}
                        >
                            Hoàn thành
                        </Button>
                    </Form.Item>
                </Form>
            </Col>

            <Col xs={24} sm={24} md={10} lg={8}>
                <Card 
                    bordered={false}
                    style={{ backgroundColor: '#fafafa', padding: '16px' }}
                >     
                    <Image height={200} src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRy5QMODyHm-LaMpgXOqMIUHPbQ-Y51jAZR_UJYC-9Dv1IL3ovh' />
                    <Typography.Paragraph style={{ marginTop: '16px' }}>
                        Tôi là một người có tinh thần làm việc chăm chỉ và luôn sẵn sàng học hỏi những điều mới. Với kinh nghiệm 3 năm làm việc trong lĩnh vực phát triển phần mềm, tôi đã tham gia vào nhiều dự án với các đội ngũ khác nhau, từ đó rèn luyện khả năng làm việc nhóm và giải quyết vấn đề. Tôi có đam mê với công nghệ và luôn cố gắng cập nhật những xu hướng mới nhất trong ngành. Ngoài ra, tôi còn có kỹ năng giao tiếp tốt, giúp tôi dễ dàng trao đổi và hợp tác với khách hàng cũng như đồng nghiệp.
                    </Typography.Paragraph>
                </Card>
            </Col>
        </Row>
    );
};

export default Description;