import React, { useState } from 'react';
import { Row, Col, Card, Typography, Descriptions, Tag, Rate, Button, Pagination } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faClock,
  faLightbulb,
  faMoneyBillWave,
  faCheckCircle,
  faCalendar,
  faMoneyCheckAlt,
  faEye,
  faEyeSlash,
  faTrash,
  faThumbsUp,
  faThumbsDown,
  faBuilding,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';

const { Title } = Typography;

const Comment = ({ userImage, userName, commentText, likes, dislikes }) => (
  <Card style={{ marginBottom: '16px' }}>
    <Row className='d-flex gap-2'>
      <Col span={3}>
        <img src={userImage} alt={userName} style={{ width: '100%', borderRadius: '50%' }} />
      </Col>
      <Col span={20}>
        <p><strong>{userName}</strong></p>
        <p>{commentText}</p>
        <div>
          <Button icon={<FontAwesomeIcon icon={faThumbsUp} />} style={{ marginRight: '8px' }}>
            {likes}
          </Button>
          <Button icon={<FontAwesomeIcon icon={faThumbsDown} />}>
            {dislikes}
          </Button>
        </div>
      </Col>
    </Row>
  </Card>
);

const JobDetail = () => {
  const jobData = {
    title: 'Lập Trình Viên Frontend',
    location: 'HCM',
    workingHours: '9:00 - 18:00',
    jobOpportunity: 'Cơ hội làm việc với các dự án lớn',
    salary: '15,000,000 VND',
    status: 'Đang tuyển',
    postedDate: '2024-09-23',
    paymentMethod: 'Theo giờ',
    skills: ['JavaScript', 'React', 'Node.js'],
    rating: 4,
    description: 'Mô tả công việc: Tham gia phát triển và bảo trì các ứng dụng web, làm việc với các thành viên trong nhóm để hoàn thiện sản phẩm.',
  };

  const companyData = {
    name: 'Công Ty TNHH ABC',
    location: 'HCM',
    website: 'www.abc.com',
    size: '50 - 100 nhân viên',
    industry: 'Công nghệ thông tin',
    description: 'Công ty chuyên cung cấp các giải pháp phần mềm và dịch vụ công nghệ thông tin cho khách hàng.',
  };

  const comments = [
    {
      userImage: 'https://via.placeholder.com/50',
      userName: 'Nguyễn Văn A',
      commentText: 'Công việc rất thú vị, tôi đã học được nhiều điều.',
      likes: 5,
      dislikes: 1,
    },
    {
      userImage: 'https://via.placeholder.com/50',
      userName: 'Trần Thị B',
      commentText: 'Mô tả công việc không rõ ràng lắm.',
      likes: 2,
      dislikes: 4,
    },
    {
      userImage: 'https://via.placeholder.com/50',
      userName: 'Lê Văn C',
      commentText: 'Rất hài lòng với môi trường làm việc tại công ty.',
      likes: 8,
      dislikes: 0,
    },
    {
      userImage: 'https://via.placeholder.com/50',
      userName: 'Phạm Thị D',
      commentText: 'Công việc phù hợp với sở thích của tôi!',
      likes: 4,
      dislikes: 2,
    },
    {
      userImage: 'https://via.placeholder.com/50',
      userName: 'Trần Minh E',
      commentText: 'Tôi thấy cần cải thiện một số điểm trong mô tả công việc.',
      likes: 1,
      dislikes: 3,
    },
    {
      userImage: 'https://via.placeholder.com/50',
      userName: 'Nguyễn Thị F',
      commentText: 'Có cơ hội thăng tiến tốt!',
      likes: 6,
      dislikes: 1,
    },
  ];
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const paginatedComments = comments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <Row gutter={16} className="my-container mx-auto my-4">
      <Col span={16}>
        <Card title={<Title level={2}>{jobData.title}</Title>} bordered={false}>
          <Descriptions column={1}>
            <Descriptions.Item label={<span><FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#52c41a' }} /> Vị Trí</span>}>
              {jobData.location}
            </Descriptions.Item>
            <Descriptions.Item label={<span><FontAwesomeIcon icon={faClock} style={{ color: '#faad14' }} /> Giờ Làm Việc</span>}>
              {jobData.workingHours}
            </Descriptions.Item>
            <Descriptions.Item label={<span><FontAwesomeIcon icon={faLightbulb} style={{ color: '#1890ff' }} /> Cơ Hội Làm Việc</span>}>
              {jobData.jobOpportunity}
            </Descriptions.Item>
            <Descriptions.Item label={<span><FontAwesomeIcon icon={faMoneyBillWave} style={{ color: '#f5222d' }} /> Lương</span>}>
              {jobData.salary}
            </Descriptions.Item>
            <Descriptions.Item label={<span><FontAwesomeIcon icon={faCheckCircle} style={{ color: '#52c41a' }} /> Trạng Thái</span>}>
              {jobData.status}
            </Descriptions.Item>
            <Descriptions.Item label={<span><FontAwesomeIcon icon={faCalendar} style={{ color: '#1890ff' }} /> Ngày Đăng</span>}>
              {jobData.postedDate}
            </Descriptions.Item>
            <Descriptions.Item label={<span><FontAwesomeIcon icon={faMoneyCheckAlt} style={{ color: '#faad14' }} /> Kiểu Thanh Toán</span>}>
              {jobData.paymentMethod}
            </Descriptions.Item>
            <Descriptions.Item label="Kỹ Năng">
              {jobData.skills.map(skill => (
                <Tag key={skill} color="default" style={{ backgroundColor: '#f0f0f0', borderRadius: '20px', marginRight: '5px' }}>
                  {skill}
                </Tag>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Đánh Giá">
              <Rate disabled value={jobData.rating} />
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="Thông Tin Công Ty" bordered={false} style={{ marginTop: '16px' }}>
          <Descriptions column={1}>
            <Descriptions.Item label={<span><FontAwesomeIcon icon={faBuilding} style={{ color: '#1890ff' }} /> Tên Công Ty</span>}>
              {companyData.name}
            </Descriptions.Item>
            <Descriptions.Item label={<span><FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#52c41a' }} /> Vị Trí</span>}>
              {companyData.location}
            </Descriptions.Item>
            <Descriptions.Item label={<span><FontAwesomeIcon icon={faGlobe} style={{ color: '#faad14' }} /> Website</span>}>
              {companyData.website}
            </Descriptions.Item>
            <Descriptions.Item label={<span><FontAwesomeIcon icon={faBuilding} style={{ color: '#52c41a' }} /> Quy Mô</span>}>
              {companyData.size}
            </Descriptions.Item>
            <Descriptions.Item label={<span><FontAwesomeIcon icon={faLightbulb} style={{ color: '#1890ff' }} /> Ngành Nghề</span>}>
              {companyData.industry}
            </Descriptions.Item>
            <Descriptions.Item label={<span><FontAwesomeIcon icon={faCheckCircle} style={{ color: '#52c41a' }} /> Mô Tả</span>}>
              {companyData.description}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Mô Tả Công Việc" bordered={false}>
          <p>{jobData.description}</p>
          <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col span={8}>
              <Button type="primary" style={{ width: '100%' }}>
                <FontAwesomeIcon icon={faEye} /> Công Khai
              </Button>
            </Col>
            <Col span={8}>
              <Button type="default" style={{ width: '100%' }} className='btn-archive'>
                <FontAwesomeIcon icon={faEyeSlash} /> Ẩn
              </Button>
            </Col>
            <Col span={8}>
              <Button type="danger" style={{ width: '100%' }} className='btn-delete'>
                <FontAwesomeIcon icon={faTrash} /> Xóa
              </Button>
            </Col>
          </Row>
        </Card>
        <Card title="Nhận Xét" bordered={false} style={{ marginTop: '16px' }}>
          {paginatedComments.map((comment, index) => (
            <Comment key={index} {...comment} />
          ))}
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={comments.length}
            onChange={handleChangePage}
            style={{ marginTop: '16px', textAlign: 'center' }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default JobDetail;
