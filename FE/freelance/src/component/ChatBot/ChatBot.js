import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, List, Avatar, Spin } from 'antd';
import { MessageOutlined, SendOutlined, RobotOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);
  const messageListRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isLoading]);

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
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

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

  const loadingContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 0'
  };

  const typingAnimation = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: '8px 12px',
    borderRadius: '12px',
    maxWidth: '70%'
  };

  const dotStyle = {
    width: '8px',
    height: '8px',
    margin: '0 2px',
    backgroundColor: '#666',
    borderRadius: '50%',
    animation: 'bounce 1.4s infinite ease-in-out',
    animationFillMode: 'both'
  };

  const keyframes = `
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1.0); }
    }
  `;

  return (
    <div style={chatContainerStyle}>
      <style>{keyframes}</style>
      <div style={chatWindowStyle}>
        <div style={chatHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/favicon.png" width={20} alt="Avatar" style={{ marginRight: 8 }} />
            <span>Chat Assistant</span>
          </div>
          <CloseOutlined onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
        </div>
        <div ref={messageListRef} style={messageListStyle}>
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
          {isLoading && (
            <div style={loadingContainerStyle}>
              <Avatar
                icon={<img src="/favicon.png" width={20} alt="Avatar" />}
                style={{
                  backgroundColor: '#f56a00',
                  marginRight: '8px'
                }}
              />
              <div style={typingAnimation}>
                <div style={{ ...dotStyle, animationDelay: '-0.32s' }}></div>
                <div style={{ ...dotStyle, animationDelay: '-0.16s' }}></div>
                <div style={dotStyle}></div>
              </div>
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          padding: '10px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <Input
            ref={inputRef}
            placeholder="Type a message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            suffix={
              isLoading ? (
                <Spin size="small" />
              ) : (
                <SendOutlined
                  onClick={sendMessage}
                  style={{ cursor: 'pointer', color: '#1890ff' }}
                />
              )
            }
          />
        </div>
      </div>

      <Button
        type="primary"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end'
        }}
        icon={<MessageOutlined />}
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default ChatBot;