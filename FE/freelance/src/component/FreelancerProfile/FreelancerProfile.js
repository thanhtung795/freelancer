import React, { useState } from 'react';
import { Layout, Menu, Card, Button, Typography, Input, Form } from 'antd';
import { UserOutlined, BankOutlined, PhoneOutlined, EditOutlined } from '@ant-design/icons';
import ChangePassword from '../ChangePassword/ChangePassword';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const FreelancerProfile = () => {
  const [selectedTab, setSelectedTab] = useState('1');
  const [editingSection, setEditingSection] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: 'Bùi Minh Quang',
    email: 'b****@fpt.edu.vn',
    company: 'Bùi Minh Quang FPT HCM',
    phone: 'JTC-10700 Bangkok, Jakarta, Hà Nội',
    country: 'Việt Nam',
  });

  const handleMenuClick = (key) => {
    setSelectedTab(key);
    setEditingSection(null);
  };

  const handleEditClick = (section) => {
    setEditingSection(section);
  };

  const handleSaveClick = () => {
    setEditingSection(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <Layout style={{ minHeight: '100vh', margin: '50px' }}>
      <Sider width={200} theme="light">
        <Title level={4} style={{ padding: '16px' }}>Cài đặt</Title>
        <Menu mode="vertical" defaultSelectedKeys={['1']} onClick={({ key }) => handleMenuClick(key)}>
          <Menu.Item key="1">Thông tin</Menu.Item>
          <Menu.Item key="2">Thay đổi mật khẩu</Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        {selectedTab === '1' && (
          <>
            <Title level={3}>Thông tin của tôi</Title>
            <Card
              title="Tài khoản"
              extra={<EditOutlined onClick={() => handleEditClick('account')} />}
              style={{ marginTop: 16 }}
            >
              {editingSection === 'account' ? (
                <Form layout="vertical">
                  <Form.Item label="Tên">
                    <Input name="name" value={userInfo.name} onChange={handleInputChange} />
                  </Form.Item>
                  <Form.Item label="Email">
                    <Input name="email" value={userInfo.email} onChange={handleInputChange} />
                  </Form.Item>
                  <Button type="primary" onClick={handleSaveClick}>Lưu</Button>
                </Form>
              ) : (
                <>
                  <UserOutlined style={{ fontSize: '24px', marginRight: '16px' }} />
                  <Text strong>{userInfo.name}</Text>
                  <br />
                  <Text type="secondary">Quản lý khách hàng</Text>
                  <br />
                  <Text>{userInfo.company}</Text>
                  <br />
                  <Text type="secondary">{userInfo.email}</Text>
                </>
              )}
            </Card>

            <Card
              title="Chi tiết công ty"
              extra={<EditOutlined onClick={() => handleEditClick('company')} />}
              style={{ marginTop: 16 }}
            >
              {editingSection === 'company' ? (
                <Form layout="vertical">
                  <Form.Item label="Tên công ty">
                    <Input name="company" value={userInfo.company} onChange={handleInputChange} />
                  </Form.Item>
                  <Button type="primary" onClick={handleSaveClick}>Lưu</Button>
                </Form>
              ) : (
                <>
                  <BankOutlined style={{ fontSize: '24px', marginRight: '16px' }} />
                  <Text>{userInfo.company}</Text>
                </>
              )}
            </Card>

            <Card
              title="Liên hệ công ty"
              extra={<EditOutlined onClick={() => handleEditClick('contacts')} />}
              style={{ marginTop: 16 }}
            >
              {editingSection === 'contacts' ? (
                <Form layout="vertical">
                  <Form.Item label="Điện thoại">
                    <Input name="phone" value={userInfo.phone} onChange={handleInputChange} />
                  </Form.Item>
                  <Form.Item label="Quốc gia">
                    <Input name="country" value={userInfo.country} onChange={handleInputChange} />
                  </Form.Item>
                  <Button type="primary" onClick={handleSaveClick}>Lưu</Button>
                </Form>
              ) : (
                <>
                  <PhoneOutlined style={{ fontSize: '24px', marginRight: '16px' }} />
                  <Text strong>{userInfo.name}</Text>
                  <br />
                  <Text>{userInfo.phone}</Text>
                  <br />
                  <Text>{userInfo.country}</Text>
                </>
              )}
            </Card>
          </>
        )}

        {selectedTab === '2' && (
          <>
            <ChangePassword />
          </>
        )}
      </Content>
    </Layout>
  );
};

export default FreelancerProfile;
