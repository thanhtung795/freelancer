import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Descriptions, Tag, Button, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faClock,
  faLightbulb,
  faMoneyBillWave,
  faCheckCircle,
  faCalendar,
  faTrash,
  faBuilding,
  faGlobe,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const HeartIcon = styled(FontAwesomeIcon)`
  font-size: 1.5em;
  margin-right: 5px;
`;

const JobDetailJob = ({ isClient }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = JSON.parse(localStorage.getItem("user"))?.data?.role === 'client';

  useEffect(() => {
    fetch(`http://localhost:8080/api/Jobs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setJobData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = () => {
    const freelancerId = parseInt(JSON.parse(localStorage.getItem("user")).data.idRole, 10);
    const body = {
      freelancerID: freelancerId,
      jobID: parseInt(id, 10),
      isSelected: true,
      status: 'Đã ứng tuyển',
    };

    fetch('http://localhost:8080/api/freelancerJobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then(() => {
        message.success('Ứng tuyển thành công!');
        navigate("/list-job-applied");
      })
      .catch((error) => {
        console.error('Error:', error);
        message.error('Có lỗi xảy ra khi ứng tuyển!');
      });
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (!jobData) {
    return <p>Không có dữ liệu công việc nào.</p>;
  }

  const { company, skills } = jobData;

  return (
    <Row gutter={16} className="my-container mx-auto my-4">
      <Col span={16}>
        <Card title={<Title level={2}>{jobData.title}</Title>} bordered={false}>
          <Descriptions column={1}>
            <Descriptions.Item
              label={
                <span>
                  <HeartIcon icon={faMapMarkerAlt} style={{ color: '#52c41a' }} /> Quy mô dự án
                </span>
              }
            >
              {jobData.scope === 'medium' ? 'vừa' : jobData.scope === 'small' ? 'nhỏ' : 'lớn'}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <HeartIcon icon={faClock} style={{ color: '#faad14' }} /> Số Giờ Làm Việc
                </span>
              }
            >
              {jobData.hourWork} giờ
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <HeartIcon icon={faLightbulb} style={{ color: '#1890ff' }} /> Cơ Hội Việc Làm
                </span>
              }
            >
              {jobData.jobOpportunity ? 'Có' : 'Không'}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <HeartIcon icon={faMoneyBillWave} style={{ color: '#f5222d' }} /> Mức Lương
                </span>
              }
            >
              {jobData.fromPrice} - {jobData.toPrice} USD ({jobData.typePrice})
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <HeartIcon icon={faCheckCircle} style={{ color: '#52c41a' }} /> Trạng Thái
                </span>
              }
            >
              {jobData.status}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <HeartIcon icon={faCalendar} style={{ color: '#1890ff' }} /> Ngày Bắt Đầu
                </span>
              }
            >
              {jobData.dateStart ? new Date(jobData.dateStart).toLocaleDateString() : 'Chưa xác định'}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <HeartIcon icon={faCalendar} style={{ color: '#faad14' }} /> Ngày Kết Thúc
                </span>
              }
            >
              {jobData.dateEnd ? new Date(jobData.dateEnd).toLocaleDateString() : 'Chưa xác định'}
            </Descriptions.Item>
            <Descriptions.Item label="Kỹ Năng">
              {skills &&
                skills.map((skill) => (
                  <Tag
                    key={skill}
                    color="default"
                    style={{
                      backgroundColor: '#f0f0f0',
                      borderRadius: '20px',
                      marginRight: '5px',
                    }}
                  >
                    {skill}
                  </Tag>
                ))}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="Thông Tin Công Ty" bordered={false} style={{ marginTop: '16px' }}>
          <Descriptions column={1}>
            <Descriptions.Item
              label={
                <span>
                  <HeartIcon icon={faBuilding} style={{ color: '#1890ff' }} /> Tên Công Ty
                </span>
              }
            >
              {company.companyName}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <HeartIcon icon={faMapMarkerAlt} style={{ color: '#52c41a' }} /> Vị Trí
                </span>
              }
            >
              {company.location}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <HeartIcon icon={faGlobe} style={{ color: '#faad14' }} /> Website
                </span>
              }
            >
              <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">
                {company.website}
              </a>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <HeartIcon icon={faBuilding} style={{ color: '#52c41a' }} /> Quy Mô
                </span>
              }
            >
              {company.size}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <HeartIcon icon={faLightbulb} style={{ color: '#1890ff' }} /> Ngành Nghề
                </span>
              }
            >
              {company.industry}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <HeartIcon icon={faCheckCircle} style={{ color: '#52c41a' }} /> Mô Tả
                </span>
              }
            >
              {company.description || 'Chưa có mô tả'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Mô Tả Công Việc" bordered={false}>
          <p>{jobData.description || 'Chưa có mô tả'}</p>
          <Row gutter={16} style={{ marginTop: '16px' }}>
            {!role ? (
              <Col span={24}>
                <Button type="primary" style={{ width: '100%' }} onClick={handleSubmit}>
                  <FontAwesomeIcon icon={faEye} /> Ứng tuyển
                </Button>
              </Col>
            ) : (
              <>
                <Col span={8}>
                  <Button type="primary" style={{ width: '100%' }}>
                    <FontAwesomeIcon icon={faEye} /> Công Khai
                  </Button>
                </Col>
                <Col span={8}>
                  <Button type="default" style={{ width: '100%' }} className="btn-archive">
                    <FontAwesomeIcon icon={faEyeSlash} /> Ẩn
                  </Button>
                </Col>
                <Col span={8}>
                  <Button type="danger" style={{ width: '100%' }} className="btn-delete">
                    <FontAwesomeIcon icon={faTrash} /> Xóa
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default JobDetailJob;
