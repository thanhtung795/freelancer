import React, { useState } from 'react';
import { Row, Col, Avatar, Input, Button, List, Card, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Freelancer', text: 'Chào bạn, mình có thể giúp gì cho bạn?', avatar: 'https://via.placeholder.com/50' },
    { id: 2, user: 'Client', text: 'Chào bạn, mình có một dự án cần hỗ trợ.', avatar: 'https://via.placeholder.com/50' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        user: 'Client',
        text: newMessage,
        avatar: 'https://via.placeholder.com/50',
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <Row className="my-container mx-auto my-4" gutter={16} justify="center">
      <Col span={6}>
        <Card title="Tin nhắn cũ" bordered={false} style={{ height: '100%' }}>
          <List
            itemLayout="horizontal"
            dataSource={messages.slice(-5)}
            renderItem={(message) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={message.avatar} />}
                  title={message.user}
                  description={<Text ellipsis>{message.text}</Text>}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>

      <Col span={12}>
        <Card title="Chat" bordered={false}>
          <div style={{ height: '400px', overflowY: 'auto', padding: '10px' }}>
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(message) => (
                <List.Item
                  style={{
                    justifyContent: message.user === 'Client' ? 'flex-end' : 'flex-start',
                  }}
                >
                  {message.user === 'Freelancer' && <Avatar src={message.avatar} />}
                  <div
                    style={{
                      maxWidth: '60%',
                      padding: '10px',
                      backgroundColor: message.user === 'Client' ? '#e6f7ff' : '#f5f5f5',
                      borderRadius: '10px',
                      textAlign: message.user === 'Client' ? 'right' : 'left',
                    }}
                  >
                    {message.text}
                  </div>
                  {message.user === 'Client' && <Avatar src={message.avatar} />}
                </List.Item>
              )}
            />
          </div>
        </Card>

        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
              suffix={
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  style={{ marginLeft: '10px' }}
                />
              }
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Chat;
