import React from 'react';
import { Form, Input, Button, Card } from 'antd';

const ChangePassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('newPassword') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Xác nhận mật khẩu không khớp!'));
    },
  });

  return (
    <Card title="Đổi mật khẩu" style={{ width: '100%', margin: '0 auto' }} className='my-4'>
      <Form
        form={form}
        name="change-password"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu cũ!' },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu cũ" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
            validateConfirmPassword,
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu mới" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePassword;
