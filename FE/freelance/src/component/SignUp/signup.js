import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Select, Row, Col } from 'antd';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../../services/AuthService";

const { Option } = Select;

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState({ code: null, name: "" });
  const [selectedDistrict, setSelectedDistrict] = useState({ code: null, name: "" });
  const [selectedWard, setSelectedWard] = useState({ name: "" });

  const handleProvinceChange = (value, option) => {
    setSelectedProvince({ code: value, name: option.label });
  };

  const handleDistrictChange = (value, option) => {
    setSelectedDistrict({ code: value, name: option.label });
  };

  const handleWardChange = (value, option) => {
    setSelectedWard({ code: value, name: option.label });
  };
  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await axios.get('https://api.mysupership.vn/v1/partner/areas/province');
        if (response.data && response.data.results) {
          setProvinces(response.data.results);
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    }
    fetchProvinces();
  }, []);

  useEffect(() => {
    async function fetchDistricts() {
      if (selectedProvince) {
        try {
          const response = await axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${selectedProvince.code}`);
          if (response.data && response.data.results) {
            setDistricts(response.data.results);
            form.setFieldsValue({ district: undefined, ward: undefined });
            setSelectedDistrict(null);
            setWards([]);
          }
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      }
    }
    fetchDistricts();
  }, [selectedProvince, form]);

  useEffect(() => {
    async function fetchWards() {
      if (selectedDistrict) {
        try {
          const response = await axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${selectedDistrict.code}`);
          if (response.data && response.data.results) {
            setWards(response.data.results);
            form.setFieldsValue({ ward: undefined });
          }
        } catch (error) {
          console.error('Error fetching wards:', error);
        }
      }
    }
    fetchWards();
  }, [selectedDistrict, form]);

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      values.role = new URLSearchParams(location.search).get('role') || 'client';
      values.address = `${selectedWard?.name || ''}, ${selectedDistrict?.name || ''}, ${selectedProvince?.name || ''}`;

      console.log('Success:', values);
      await AuthService.register(values);
      navigate('/login');
    } catch (error) {
      form.setFields([{
        name: 'email',
        errors: [error.response || 'Email đã tồn tại']
      }]);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 bg-light p-4 rounded mt-5">
          <h3 className="text-center mb-4">Đăng ký</h3>
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Họ"
                  name="firstName"
                  rules={[{ required: true, message: 'Vui lòng nhập họ của bạn' }]}
                >
                  <Input placeholder="Nhập họ của bạn" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tên"
                  name="lastName"
                  rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}
                >
                  <Input placeholder="Nhập tên của bạn" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn' }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              label="Tỉnh/Thành phố"
              name="province"
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
            >
              <Select
                showSearch
                placeholder="Chọn hoặc nhập tỉnh/thành phố"
                onChange={handleProvinceChange}  // Sử dụng hàm mới
                filterOption={filterOption}
                options={provinces.map(province => ({
                  value: province.code,
                  label: province.name
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Quận/Huyện"
              name="district"
              rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}
            >
              <Select
                showSearch
                placeholder="Chọn hoặc nhập quận/huyện"
                onChange={handleDistrictChange}
                disabled={!selectedProvince || !selectedProvince.code}
                filterOption={filterOption}
                options={districts.map(district => ({
                  value: district.code,
                  label: district.name
                }))}
              >
              </Select>
            </Form.Item>

            <Form.Item
              label="Phường/Xã"
              name="ward"
              rules={[{ required: true, message: 'Vui lòng chọn phường/xã' }]}
            >
              <Select
                showSearch
                placeholder="Chọn hoặc nhập phường/xã"
                onChange={handleWardChange}
                disabled={!selectedDistrict || !selectedDistrict.code}
                filterOption={filterOption}
                options={wards.map(ward => ({
                  value: ward.code,
                  label: ward.name
                }))}
              >
              </Select>
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email' }, { type: 'email', message: 'Email không hợp lệ' }]}
            >
              <Input placeholder="Nhập email của bạn" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
            >
              <Input.Password placeholder="Nhập mật khẩu của bạn" />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              dependencies={['password']}
              rules={[{
                required: true,
                message: 'Vui lòng xác nhận mật khẩu của bạn'
              }, ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              })]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>

            {/* Checkbox điều khoản */}
            <Form.Item name="acceptTerms1" valuePropName="checked" rules={[{ required: true, message: 'Bạn cần đồng ý với điều khoản này' }]}>
              <Checkbox>Gửi cho tôi các mẹo tìm kiếm tài năng.</Checkbox>
            </Form.Item>
            <Form.Item name="acceptTerms2" valuePropName="checked" rules={[{ required: true, message: 'Bạn cần đồng ý với điều khoản này' }]}>
              <Checkbox>Đồng ý với điều khoản dịch vụ của TalentHub.</Checkbox>
            </Form.Item>

            {/* Nút submit */}
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-100" loading={loading}>
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
