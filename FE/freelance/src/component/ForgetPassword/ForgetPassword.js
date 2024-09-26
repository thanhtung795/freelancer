import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert } from 'antd';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [randomCode, setRandomCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [message, setMessage] = useState('');

  const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const onEmailFinish = (values) => {
    const code = generateRandomCode();
    setRandomCode(code);
    setEmail(values.email);
    setMessage(`Mã xác nhận đã được gửi đến ${values.email}`);
    setStep(2);
  };

  const onCodeFinish = () => {
    if (inputCode === randomCode) {
      setMessage('Mã xác nhận đúng! Bạn có thể đặt lại mật khẩu.');
      // Chuyển hướng hoặc xử lý tiếp theo tại đây
    } else {
      setMessage('Mã xác nhận không đúng. Vui lòng thử lại.');
    }
  };

  return (
    <Card title="Quên mật khẩu" style={{ maxWidth: 400, margin: '0 auto' }}>
      {step === 1 ? (
        <Form
          name="forgot-password"
          onFinish={onEmailFinish}
          layout="vertical"
        >
          <Form.Item
            label="Nhập email của bạn"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          name="verify-code"
          onFinish={onCodeFinish}
          layout="vertical"
        >
          <Alert message={message} type="info" showIcon style={{ marginBottom: 16 }} />
          <Form.Item
            label="Nhập mã xác nhận"
            rules={[{ required: true, message: 'Vui lòng nhập mã xác nhận!' }]}
          >
            <Input
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Nhập mã xác nhận"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default ForgotPassword;
