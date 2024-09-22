import React from 'react';
import { Layout, Menu, Card, Button, Typography } from 'antd';
import { UserOutlined, BankOutlined, PhoneOutlined, EditOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const ClientInfo = () => {
  return (
    <Layout style={{ minHeight: '100vh', margin: '50px' }}>
      <Sider width={200} theme="light">
        <Title level={4} style={{ padding: '16px' }}>Settings</Title>
        <Menu mode="vertical" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">My Info</Menu.Item>
          <Menu.Item key="2">Billing & Payments</Menu.Item>
          <Menu.Item key="3">Password & Security</Menu.Item>
          <Menu.Item key="4">Membership Settings</Menu.Item>
          <Menu.Item key="5">Teams</Menu.Item>
          <Menu.Item key="6">Notification Settings</Menu.Item>
          <Menu.Item key="7">Meetings & Permissions</Menu.Item>
          <Menu.Item key="8">Tax Information</Menu.Item>
          <Menu.Item key="9">Connected Services</Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Title level={3}>My Info</Title>
        <Text type="secondary">This is a client account</Text>
        
        <Card title="Account" extra={<EditOutlined />} style={{ marginTop: 16 }}>
          <UserOutlined style={{ fontSize: '24px', marginRight: '16px' }} />
          <Text strong>B**** h***</Text>
          <br />
          <Text type="secondary">Client Management</Text>
          <br />
          <Text>Bui Minh Quang Fpt Hcm</Text>
          <br />
          <Text type="secondary">b****@fpt.edu.vn</Text>
        </Card>
        
        <Card title="Company details" extra={<EditOutlined />} style={{ marginTop: 16 }}>
          <BankOutlined style={{ fontSize: '24px', marginRight: '16px' }} />
          <Text>Bui Minh Quang Fpt Hcm</Text>
        </Card>
        
        <Card title="Company contacts" extra={<EditOutlined />} style={{ marginTop: 16 }}>
          <PhoneOutlined style={{ fontSize: '24px', marginRight: '16px' }} />
          <Text strong>B**** h***</Text>
          <br />
          <Text>Phone</Text>
          <br />
          <Text>Time Zone</Text>
          <br />
          <Text>JTC-10700 Bangkok, Jakarta, Hanoi</Text>
          <br />
          <Text>Vietnam</Text>
        </Card>
        
        <Card style={{ marginTop: 16 }}>
          <Text>This is a client account</Text>
          <br />
          <Button type="primary" style={{ marginRight: 8 }}>Create New Account</Button>
          <Button>Close account</Button>
          <Button type="link">Transfer Ownership</Button>
        </Card>
        
        <Card title="AI preference" style={{ marginTop: 16 }}>
          <Text>Choose how your Upwork data is used for AI training and improvement. Learn more</Text>
          <br />
          <Text type="secondary">Your data is not being used to train our AI</Text>
          <br />
          <Button type="primary">Change preference</Button>
        </Card>
      </Content>
    </Layout>
  );
};

export default ClientInfo;