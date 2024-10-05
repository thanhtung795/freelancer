import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, List, Avatar } from 'antd';
import { MessageOutlined, SendOutlined, RobotOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Tạo ref cho input
  const inputRef = useRef(null);

  // Tự động focus khi mở chat
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      text: message,
      type: 'user'
    };

    setMessages([...messages, userMessage]);
    setIsLoading(true);
    setMessage('');

    try {
      const res = await axios.post("http://localhost:8080/api/dialogflow/send", null, {
        params: { message }
      });
      
      const botMessage = {
        text: res.data,
        type: 'bot'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      // Tự động focus vào input sau khi nhận được response
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Styles
  const chatContainerStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column'
  };

  const chatWindowStyle = {
    display: isOpen ? 'flex' : 'none',
    flexDirection: 'column',
    width: '300px',
    height: '400px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    marginBottom: '10px'
  };

  const chatHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    backgroundColor: '#1890ff',
    color: 'white',
    borderRadius: '8px 8px 0 0'
  };

  const messageListStyle = {
    flex: 1,
    overflow: 'auto',
    padding: '10px'
  };

  const inputContainerStyle = {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #f0f0f0'
  };

  const toggleButtonStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  };

  return (
    <div style={chatContainerStyle}>
      <div style={chatWindowStyle}>
        <div style={chatHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <RobotOutlined style={{ marginRight: 8 }} />
            <span>Chat Assistant</span>
          </div>
          <CloseOutlined onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
        </div>
        
        <div style={messageListStyle}>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={item => (
              <List.Item style={{ 
                justifyContent: item.type === 'user' ? 'flex-end' : 'flex-start',
                padding: '5px 0'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  flexDirection: item.type === 'user' ? 'row-reverse' : 'row'
                }}>
                  <Avatar 
                    icon={item.type === 'bot' ? <RobotOutlined /> : <UserOutlined />}
                    style={{ 
                      backgroundColor: item.type === 'user' ? '#1890ff' : '#f56a00',
                      marginRight: item.type === 'user' ? '0' : '8px',
                      marginLeft: item.type === 'user' ? '8px' : '0'
                    }}
                  />
                  <div style={{
                    backgroundColor: item.type === 'user' ? '#1890ff' : '#f0f0f0',
                    color: item.type === 'user' ? 'white' : 'black',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    maxWidth: '70%'
                  }}>
                    {item.text}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
        
        <div style={inputContainerStyle}>
          <Input
            ref={inputRef}
            placeholder="Type a message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            suffix={
              <SendOutlined
                onClick={sendMessage}
                style={{ cursor: 'pointer', color: '#1890ff' }}
              />
            }
          />
        </div>
      </div>

      <Button
        type="primary"
        style={toggleButtonStyle}
        icon={<MessageOutlined />}
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default ChatBot;