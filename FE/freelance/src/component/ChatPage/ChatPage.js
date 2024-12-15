// src/pages/ChatPage.js
import React, { useState, useEffect, useRef } from 'react';
import { Layout, Card, Input, Button, List, Avatar, Typography, Row, Col, Space, Modal, message } from 'antd';
import {
    SendOutlined,
    VideoCameraOutlined,
    DesktopOutlined,
    AudioOutlined,
    UserOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import WebSocketService from '../../services/websocket';
import { useParams } from 'react-router-dom';
import './ChatPage.css';

const { Header, Content } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;

const ChatPage = () => {
    const { currentUserID, otherUserID } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isVideoCallActive, setIsVideoCallActive] = useState(false);
    const [isCallModalVisible, setIsCallModalVisible] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const messagesEndRef = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);
    const localStream = useRef(null);

    useEffect(() => {
        loadUserData();
        return () => cleanup();
    }, [currentUserID, otherUserID]);

    useEffect(() => {
        if (currentUserID) {
            initializeWebSocket();
        }
        return () => WebSocketService.disconnect();
    }, [currentUserID]);

    const loadUserData = async () => {
        try {
            const [currentUserResponse, otherUserResponse] = await Promise.all([
                fetch(`http://localhost:8080/api/users/${currentUserID}`),
                fetch(`http://localhost:8080/api/users/${otherUserID}`)
            ]);

            const [currentUserData, otherUserData] = await Promise.all([
                currentUserResponse.json(),
                otherUserResponse.json()
            ]);

            setCurrentUser(currentUserData);
            setOtherUser(otherUserData);

            // Load chat history after users are loaded
            await loadChatHistory();
        } catch (error) {
            message.error('Error loading user data');
            console.error('Error loading user data:', error);
        }
    };

    const loadChatHistory = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/messages/conversation/${currentUserID}/${otherUserID}`
            );
            const data = await response.json();
            setMessages(data);
            scrollToBottom();
        } catch (error) {
            message.error('Error loading chat history');
            console.error('Error loading chat history:', error);
        }
    };

    const initializeWebSocket = () => {
        WebSocketService.connect(currentUserID);
        WebSocketService.addMessageListener(handleNewMessage);
        WebSocketService.addSignalListener(handleWebRTCSignal);
    };

    const handleNewMessage = (message) => {
        setMessages(prevMessages => {
            // Check if message already exists
            const messageExists = prevMessages.some(m => m.id === message.id);
            if (!messageExists) {
                return [...prevMessages, message];
            }
            return prevMessages;
        });
        scrollToBottom();
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatMessageTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const message = {
            content: newMessage,
            senderId: parseInt(currentUserID),
            receiverId: parseInt(otherUserID),
            messageType: 'TEXT',
            sentAt: new Date().toISOString()
        };

        WebSocketService.sendMessage(message);

        // Optimistic update
        setMessages(prev => [...prev, message]);
        setNewMessage('');
        scrollToBottom();
    };

    const startVideoCall = async () => {
        try {
            if (!localVideoRef.current || !remoteVideoRef.current) {
                message.error('Video elements not ready');
                return;
            }

            localStream.current = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            localVideoRef.current.srcObject = localStream.current;

            const configuration = {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:stun1.l.google.com:19302' }
                ]
            };

            peerConnection.current = new RTCPeerConnection(configuration);

            localStream.current.getTracks().forEach(track => {
                peerConnection.current.addTrack(track, localStream.current);
            });

            peerConnection.current.ontrack = (event) => {
                if (remoteVideoRef.current && event.streams[0]) {
                    remoteVideoRef.current.srcObject = event.streams[0];
                }
            };

            peerConnection.current.onicecandidate = (event) => {
                if (event.candidate) {
                    WebSocketService.sendSignal({
                        type: 'ICE_CANDIDATE',
                        roomId: `${currentUserID}-${otherUserID}`,
                        candidate: event.candidate
                    });
                }
            };

            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);

            WebSocketService.sendSignal({
                type: 'OFFER',
                roomId: `${currentUserID}-${otherUserID}`,
                userId: currentUserID,
                offer: {
                    type: 'offer',
                    sdp: offer.sdp
                }
            });

            setIsVideoCallActive(true);
            setIsCallModalVisible(true);
        } catch (error) {
            message.error('Error starting video call');
            console.error('Error starting video call:', error);
        }
    };

    const handleWebRTCSignal = async (signal) => {
        try {
            if (!peerConnection.current) return;

            switch (signal.type) {
                case 'OFFER':
                    await peerConnection.current.setRemoteDescription(
                        new RTCSessionDescription(signal.offer)
                    );
                    const answer = await peerConnection.current.createAnswer();
                    await peerConnection.current.setLocalDescription(answer);

                    WebSocketService.sendSignal({
                        type: 'ANSWER',
                        roomId: `${currentUserID}-${otherUserID}`,
                        userId: currentUserID,
                        answer: {
                            type: 'answer',
                            sdp: answer.sdp
                        }
                    });
                    setIsCallModalVisible(true);
                    break;

                case 'ANSWER':
                    await peerConnection.current.setRemoteDescription(
                        new RTCSessionDescription(signal.answer)
                    );
                    break;

                case 'ICE_CANDIDATE':
                    if (signal.candidate) {
                        await peerConnection.current.addIceCandidate(
                            new RTCIceCandidate(signal.candidate)
                        );
                    }
                    break;

                default:
                    console.warn('Unknown signal type:', signal.type);
            }
        } catch (error) {
            message.error('Error handling WebRTC signal');
            console.error('Error handling WebRTC signal:', error);
        }
    };

    const startScreenShare = async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true
            });

            const screenTrack = screenStream.getVideoTracks()[0];
            const senders = peerConnection.current.getSenders();
            const videoSender = senders.find(sender =>
                sender.track.kind === 'video'
            );

            if (videoSender) {
                await videoSender.replaceTrack(screenTrack);
                setIsScreenSharing(true);

                screenTrack.onended = async () => {
                    const cameraTrack = localStream.current.getVideoTracks()[0];
                    await videoSender.replaceTrack(cameraTrack);
                    setIsScreenSharing(false);
                };
            }
        } catch (error) {
            message.error('Error sharing screen');
            console.error('Error sharing screen:', error);
        }
    };

    const toggleMute = () => {
        if (localStream.current) {
            const audioTrack = localStream.current.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            setIsMuted(!isMuted);
        }
    };

    const endCall = () => {
        if (localStream.current) {
            localStream.current.getTracks().forEach(track => track.stop());
        }
        if (peerConnection.current) {
            peerConnection.current.close();
        }
        setIsVideoCallActive(false);
        setIsCallModalVisible(false);
        setIsScreenSharing(false);
        setIsMuted(false);
    };

    const cleanup = () => {
        endCall();
        WebSocketService.removeMessageListener(handleNewMessage);
        WebSocketService.removeSignalListener(handleWebRTCSignal);
    };

    return (
        <Layout className="chat-layout">
            <Header className="chat-header">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Space align="center">
                            <Avatar
                                size={40}
                                icon={<UserOutlined />}
                                src={otherUser?.image}
                            />
                            <div>
                                <Title level={4} className="user-name">
                                    {otherUser?.firstName} {otherUser?.lastName}
                                </Title>
                                <Text type="secondary">Online</Text>
                            </div>
                        </Space>
                    </Col>
                    <Col>
                        <Space>
                            <Button
                                type="primary"
                                icon={<VideoCameraOutlined />}
                                onClick={startVideoCall}
                            >
                                Video Call
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Header>

            <Content className="chat-content">
                <Card className="chat-card">
                    <List
                        className="message-list"
                        dataSource={messages}
                        renderItem={message => (
                            <List.Item
                                className={`message-item ${message.senderId === parseInt(currentUserID)
                                    ? 'message-sent'
                                    : 'message-received'
                                    }`}
                            >
                                <div className="message-bubble">
                                    <Text className="message-text">
                                        {message.content}
                                    </Text>
                                    <Text className="message-time" type="secondary">
                                        {message.sentAt ? new Date(message.sentAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) : ''}
                                    </Text>
                                </div>
                            </List.Item>
                        )}
                    />

                    <div ref={messagesEndRef} />

                    <div className="message-input">
                        <TextArea
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            onPressEnter={e => {
                                if (!e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                            placeholder="Type a message..."
                            autoSize={{ minRows: 1, maxRows: 4 }}
                        />
                        <Button
                            type="primary"
                            icon={<SendOutlined />}
                            onClick={sendMessage}
                            className="mt-2"
                        >
                            Send
                        </Button>
                    </div>
                </Card>
            </Content>
            {isVideoCallActive && (
                <Col span={8}>
                    <Card title="Video Call" className="video-container">
                        <div className="relative">
                            <video
                                ref={remoteVideoRef}
                                autoPlay
                                playsInline
                                className="w-full rounded-lg"
                            />
                            <video
                                ref={localVideoRef}
                                autoPlay
                                playsInline
                                muted
                                className="absolute bottom-4 right-4 w-1/4 rounded-lg"
                            />
                        </div>
                        <div className="video-controls">
                            <Button
                                icon={isMuted ? <AudioOutlined /> : <AudioOutlined />}
                                onClick={toggleMute}
                            />
                            <Button
                                icon={<DesktopOutlined />}
                                onClick={startScreenShare}
                                type={isScreenSharing ? 'primary' : 'default'}
                            />
                            <Button
                                icon={<CloseCircleOutlined />}
                                onClick={endCall}
                                type="primary"
                                danger
                            />
                        </div>
                    </Card>
                </Col>
            )}

            <Modal
                title="Video Call"
                visible={isCallModalVisible}
                onCancel={endCall}
                footer={[
                    <Button key="mute" onClick={toggleMute} type={isMuted ? 'primary' : 'default'}>
                        <AudioOutlined />
                    </Button>,
                    <Button
                        key="screen"
                        onClick={startScreenShare}
                        type={isScreenSharing ? 'primary' : 'default'}
                        disabled={!isVideoCallActive}
                    >
                        <DesktopOutlined />
                    </Button>,
                    <Button key="end" type="primary" danger onClick={endCall}>
                        <CloseCircleOutlined />
                    </Button>
                ]}
                width={800}
                centered
            >
                <div className="video-container">
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="remote-video"
                    />
                    <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="local-video"
                    />
                </div>
            </Modal>
        </Layout>
    );
}

export default ChatPage;