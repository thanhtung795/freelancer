import React from "react";
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../../services/AuthService";
import './css/style.css';

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      values.role = new URLSearchParams(location.search).get('role') || 'client';
      await AuthService.register(values);
      navigate('/login');
    } catch (error) {
      form.setFields([
        {
          name: 'email',
          errors: [error.response || 'Email đã tồn tại']
        }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 bg-light p-4 rounded mt-5">
          <h3 className="text-center mb-4">Đăng ký</h3>
          <Row gutter={16} className="mb-4">
            <Col span={12}>
              <Button
                type="primary"
                icon={<i className="fab fa-google"></i>} // Icon của Google
                className="w-100"
                style={{ backgroundColor: "#DB4437", borderColor: "#DB4437" }}
              >
                Đăng nhập với Google
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type="primary"
                icon={<i className="fab fa-github"></i>} // Icon của GitHub
                className="w-100"
                style={{ backgroundColor: "#333", borderColor: "#333" }}
              >
                Đăng nhập với GitHub
              </Button>
            </Col>
          </Row>

          <Form
            form={form}
            onFinish={handleSubmit} // Hàm gọi khi submit thành công
            layout="vertical"
          >
            <div className="row">
              <div className="col-md-6">
                <Form.Item
                  label="Họ"
                  name="firstName"
                  rules={[{ required: true, message: 'Vui lòng nhập họ của bạn' }]}
                >
                  <Input placeholder="Nhập họ của bạn" />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  label="Tên"
                  name="lastName"
                  rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}
                >
                  <Input placeholder="Nhập tên của bạn" />
                </Form.Item>
              </div>
            </div>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email của bạn' },
                { type: 'email', message: 'Email không hợp lệ' }
              ]}
            >
              <Input placeholder="Nhập email của bạn" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn' }]}
            >
              <Input.Password placeholder="Nhập mật khẩu của bạn" />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu của bạn' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu của bạn" />
            </Form.Item>

            {/* Điều khoản */}
            <Form.Item name="acceptTerms1" valuePropName="checked" rules={[{ required: true, message: 'Bạn cần đồng ý với điều khoản này' }]}>
              <Checkbox>Gửi cho tôi các email với mẹo tìm kiếm tài năng phù hợp với nhu cầu của tôi.</Checkbox>
            </Form.Item>
            <Form.Item name="acceptTerms2" valuePropName="checked" rules={[{ required: true, message: 'Bạn cần đồng ý với điều khoản này' }]}>
              <Checkbox>Có, tôi hiểu và đồng ý với dịch vụ của TalentHub.</Checkbox>
            </Form.Item>

            {/* Nút submit */}
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-100"
                loading={loading} // Hiển thị trạng thái loading khi đang submit
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
