import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  DatePicker,
  Select,
  Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: 'abc@xyz.com',
    dateOfBirth: null,
    country: '',
    streetAddress: '',
    aptSuite: '',
    city: '',
    stateProvince: '',
    zipPostalCode: '',
    profilePicture: null,
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all'); 
        const data = await response.json();
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách quốc gia:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (changedValues, allValues) => {
    setFormData((prev) => ({ ...prev, ...changedValues }));
  };

  const handleNext = () => {
    form
      .validateFields()
      .then(() => {
        console.log('Dữ liệu form:', formData); // Kiểm tra dữ liệu thu thập được
        navigate('/SkillsSelector');
      })
      .catch((errorInfo) => {
        console.error('Validation Failed:', errorInfo);
      });
  };

  const handleUpload = ({ fileList }) => {
    setFormData((prev) => ({ ...prev, profilePicture: fileList[0] }));
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleCountryChange = async (countryName) => {
    form.setFieldsValue({ city: undefined }); // Reset thành phố khi thay đổi quốc gia
    setFormData((prev) => ({ ...prev, country: countryName, city: '' }));
    // Gọi API để lấy danh sách thành phố dựa trên quốc gia đã chọn
    try {
      const response = await fetch(
        'https://countriesnow.space/api/v0.1/countries/cities',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: countryName }),
        }
      );

      const data = await response.json();

      if (data.error) {
        console.error('Lỗi khi lấy danh sách thành phố:', data.msg);
        setCities([]);
      } else {
        setCities(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách thành phố:', error);
      setCities([]);
    }
  };

  return (
    <>
      <Row justify="center">
        <Col xs={22} sm={20} md={16} lg={12}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
            Thông tin cá nhân
          </Title>
          <Form
            layout="vertical"
            form={form}
            initialValues={formData}
            onValuesChange={handleChange}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Form.Item
                  label="Ảnh đại diện"
                  name="profilePicture"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[
                    { required: true, message: 'Vui lòng tải lên ảnh đại diện!' },
                  ]}
                >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    beforeUpload={() => false} // Ngăn chặn upload tự động
                    accept="image/*"
                    maxCount={1}
                    onChange={handleUpload}
                  >
                    {formData.profilePicture ? null : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </Col>

              {/* Họ tên */}
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Họ tên"
                  name="fullName"
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                  <Input placeholder="Nhập họ tên của bạn" />
                </Form.Item>
              </Col>

              {/* Số điện thoại */}
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                    {
                      pattern: /^[0-9]+$/,
                      message: 'Số điện thoại không hợp lệ!',
                    },
                  ]}
                >
                  <Input placeholder="Nhập số điện thoại của bạn" />
                </Form.Item>
              </Col>

              {/* Email */}
              <Col xs={24} sm={12}>
                <Form.Item label="Email" name="email">
                  <Input readOnly value={formData.email} />
                </Form.Item>
              </Col>

              {/* Ngày sinh */}
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Ngày sinh"
                  name="dateOfBirth"
                  rules={[
                    { required: true, message: 'Vui lòng chọn ngày sinh!' },
                  ]}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    style={{ width: '100%' }}
                    placeholder="Chọn ngày sinh"
                  />
                </Form.Item>
              </Col>

              {/* Quốc gia */}
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Quốc gia"
                  name="country"
                  rules={[
                    { required: true, message: 'Vui lòng chọn quốc gia!' },
                  ]}
                >
                  <Select
                    placeholder="Chọn quốc gia"
                    onChange={handleCountryChange}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {countries.map((country) => (
                      <Option
                        key={country.cca3}
                        value={country.name.common}
                      >
                        {country.name.common}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              {/* Thành phố */}
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Thành phố"
                  name="city"
                  rules={[
                    { required: true, message: 'Vui lòng chọn thành phố!' },
                  ]}
                >
                  <Select
                    placeholder="Chọn thành phố"
                    disabled={cities.length === 0}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {cities.map((city) => (
                      <Option key={city} value={city}>
                        {city}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              {/* Địa chỉ */}
              <Col xs={24}>
                <Form.Item
                  label="Địa chỉ"
                  name="streetAddress"
                  rules={[
                    { required: true, message: 'Vui lòng nhập địa chỉ!' },
                  ]}
                >
                  <Input placeholder="Nhập địa chỉ của bạn" />
                </Form.Item>
              </Col>

              {/* Căn hộ/Suite */}
              <Col xs={24} sm={12}>
                <Form.Item label="Căn hộ/Suite" name="aptSuite">
                  <Input placeholder="Nhập căn hộ/suite (tùy chọn)" />
                </Form.Item>
              </Col>

              {/* Bang/Tỉnh */}
              <Col xs={24} sm={12}>
                <Form.Item label="Bang/Tỉnh" name="stateProvince">
                  <Input placeholder="Nhập bang/tỉnh" />
                </Form.Item>
              </Col>

              {/* Mã bưu điện/Mã vùng */}
              <Col xs={24} sm={12}>
                <Form.Item label="Mã bưu điện/Mã vùng" name="zipPostalCode">
                  <Input placeholder="Nhập mã bưu điện/mã vùng" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                type="primary"
                onClick={handleNext}
                block
                size="large"
              >
                Tiếp theo
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default PersonalInfo;