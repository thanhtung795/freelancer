// src/services/websocket.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

class WebSocketService {
    constructor() {
        this.client = null;
        this.connected = false;
        this.messageCallbacks = new Set();
        this.signalCallbacks = new Set();
    }

    connect(userId) {
        if (this.connected) return;

        const socket = new SockJS('http://localhost:8080/ws');
        this.client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,

            onConnect: () => {
                console.log('Connected to WebSocket');
                this.connected = true;

                // Subscribe to personal messages
                this.client.subscribe(`/user/${userId}/queue/messages`, (message) => {
                    try {
                        const data = JSON.parse(message.body);
                        this.messageCallbacks.forEach(callback => callback(data));
                    } catch (error) {
                        console.error('Error parsing message:', error);
                    }
                });

                // Subscribe to WebRTC signals
                this.client.subscribe(`/topic/webrtc.${userId}`, (message) => {
                    try {
                        const data = JSON.parse(message.body);
                        this.signalCallbacks.forEach(callback => callback(data));
                    } catch (error) {
                        console.error('Error parsing signal:', error);
                    }
                });
            },

            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                this.connected = false;
                setTimeout(() => this.connect(userId), 5000);
            },

            onStompError: (frame) => {
                console.error('STOMP error:', frame);
            }
        });

        try {
            this.client.activate();
        } catch (error) {
            console.error('Error activating WebSocket:', error);
        }
    }

    disconnect() {
        if (this.client) {
            this.client.deactivate();
            this.connected = false;
            this.messageCallbacks.clear();
            this.signalCallbacks.clear();
        }
    }

    addMessageListener(callback) {
        if (typeof callback === 'function') {
            this.messageCallbacks.add(callback);
        }
    }

    removeMessageListener(callback) {
        this.messageCallbacks.delete(callback);
    }

    addSignalListener(callback) {
        if (typeof callback === 'function') {
            this.signalCallbacks.add(callback);
        }
    }

    removeSignalListener(callback) {
        this.signalCallbacks.delete(callback);
    }

    sendMessage(message) {
        if (!this.client || !this.connected) {
            console.error('WebSocket not connected');
            return;
        }

        try {
            this.client.publish({
                destination: '/app/chat',
                body: JSON.stringify(message)
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    sendSignal(signal) {
        if (!this.client || !this.connected) {
            console.error('WebSocket not connected');
            return;
        }

        try {
            this.client.publish({
                destination: '/app/webrtc.signal',
                body: JSON.stringify(signal)
            });
        } catch (error) {
            console.error('Error sending signal:', error);
        }
    }
}

export default new WebSocketService();