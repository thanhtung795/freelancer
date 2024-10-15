import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Descriptions, Tag, Button, message, List, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faClock,
  faLightbulb,
  faMoneyBillWave,
  faCheckCircle,
  faCalendar,
  faBuilding,
  faGlobe,
  faEye,
  faUser,
  faEnvelope,
  faPhone,
  faThumbsUp,
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
  const [appliedFreelancers, setAppliedFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = JSON.parse(localStorage.getItem("user"))?.data?.role === 'client';


  useEffect(() => {
    const fetchJobData = fetch(`http://localhost:8080/api/Jobs/${id}`).then(res => res.json());
    const fetchAppliedFreelancers = fetch(`http://localhost:8080/api/freelancers/freelancerApply/${id}`).then(res => res.json());

    Promise.all([fetchJobData, fetchAppliedFreelancers])
      .then(([jobResponse, freelancersResponse]) => {
        setJobData(jobResponse.data);
        if (freelancersResponse.success) {
          setAppliedFreelancers(freelancersResponse.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [id]);
  function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }
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
  const handleAccept = async (freelancerId) => {
    console.log('freelancerId:', freelancerId);
    try {
      await fetch('http://localhost:8080/api/freelancerJobs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          freelancerID: freelancerId,
          jobID: parseInt(id, 10),
          isSelected: true,
          status: "Đang thực hiện"
        }),
      });

      const rejectPromises = appliedFreelancers
        .filter(freelancer => freelancer.freelancerId !== freelancerId)
        .map(freelancer =>
          fetch('http://localhost:8080/api/freelancerJobs', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              freelancerID: freelancer.freelancerId,
              jobID: parseInt(id, 10),
              isSelected: true,
              status: "Đã hủy"
            }),
          })
        );

      await Promise.all(rejectPromises);

      message.success('Freelancer accepted successfully!');
      const response = await fetch(`http://localhost:8080/api/freelancers/freelancerApply/${id}`);
      const data = await response.json();
      if (data.success) {
        setAppliedFreelancers(data.data);
      }
    } catch (error) {
      console.error('Error accepting freelancer:', error);
      message.error('An error occurred while accepting the freelancer.');
    }
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
            ) : null}
          </Row>
        </Card>

        {role && (
        <Card title="Ứng viên" bordered={true}>
          {appliedFreelancers.length > 0 ? (
            <div className='' style={{ maxHeight: '500px', maxWidth: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
              <List
                itemLayout="horizontal"
                dataSource={appliedFreelancers}
                renderItem={item => (
                  <List.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card
                      hoverable
                      style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', whiteSpace: 'normal' }}
                      cover={<img alt="example" src={`http://localhost:8080/uploads/images/${item.image}` || 'https://via.placeholder.com/40'} style={{ width: 100, height: 'auto' }} />}
                    >
                      <Card.Meta
                        title={`${item.firstName} ${item.lastName}`}
                        description={
                          <>
                            <p>
                              <FontAwesomeIcon icon={faEnvelope} /> {item.email}
                            </p>
                            <p>
                              <FontAwesomeIcon icon={faPhone} /> {item.phoneNumber}
                            </p>
                            <p><FontAwesomeIcon icon={faMoneyBillWave} /> {formatPrice(item.hourlyRate)}/giờ</p>
                            <p>
                              <FontAwesomeIcon icon={faMapMarkerAlt} /> {item.address}
                            </p>
                            <p>
                              <FontAwesomeIcon icon={faUser} /> Trạng thái: {item.status}
                            </p>
                            <Button
                              type="primary"
                              icon={<FontAwesomeIcon icon={faThumbsUp} />}
                              onClick={() => handleAccept(item.freelancerId)}
                              disabled={item.status === "Đang thực hiện" || item.status === "Đã hủy"}
                            >
                              Chấp thuận
                            </Button>
                          </>
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          ) : (
            <p>Chưa có freelancer nào ứng tuyển.</p>
          )}
        </Card>
        )}
      </Col>
    </Row>
  );
};

export default JobDetailJob;