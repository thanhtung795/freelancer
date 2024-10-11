import React, { useState, useEffect } from "react";
import "../css/job.css";
import axios from "axios";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  message,
  Spin,
  Space,
  notification 
} from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

const JobForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selected, setSelected] = useState("hourly_rate");
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  let clientId;
  if (user) {
    const parsedUser = JSON.parse(user);
    clientId = parsedUser.data.idRole;
  } else {
    console.log("No user found in localStorage.");
  }

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        message.error("Không thể lấy danh mục.");
      }
    };
    fetchCategories();
  }, []);

  // Fetch skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/skills");
        setSkills(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy kỹ năng:", error);
        message.error("Không thể lấy kỹ năng.");
      }
    };
    fetchSkills();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    function removeTimezone(dateString) {
      return dateString.substring(0, 19);
    }
    const jobData = {
      title: values.title,
      scope: values.scope,
      hourWork: values.hourWork,
      jobOpportunity: values.jobOpportunity,
      fromPrice: values.FromBudget,
      toPrice: values.ToBudget,
      typePrice: selected === "hourly_rate" ? "hourly_rate" : "fixed",
      status: "Đang thực hiện",
      dateStart: removeTimezone(values.dateStart.format()),
      dateEnd: removeTimezone(values.dateEnd.format()),
      dateCreate: removeTimezone(moment().format()),
      clientId: clientId,
      categoryId: values.category,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/Jobs", jobData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success === true) {
        notification.success({
          message: 'Thành công',
          description: 'Đã đăng job thành công.',
          placement: 'topRight',
        });

        const jobId = response.data.data.id;
        await Promise.all(
          selectedSkills.map(skillId => {
            return axios.post('http://localhost:8080/api/jobskills', {
              jobId: jobId,
              skillId: skillId,
            });
          })
        );

        form.resetFields();
      } 
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Thất bại',
        description: 'Đăng tuyển thất bại.',
        placement: 'topRight',
      });
    } finally {
      setLoading(false);
    }
};


  const handleCardClick = (type) => {
    setSelected(type);
  };

  return (
    <div className="form-container w-50 mx-auto border p-4 main-color">
      {loading ? (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          scrollToFirstError
        >
          <h3 style={{ color: "#4169E1" }}>Mô tả công việc</h3>

          {/* Job Title */}
          <Form.Item
            name="title"
            label="Tiêu đề công việc"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề công việc." }]}
          >
            <Input />
          </Form.Item>

          {/* Category (Danh mục) */}
          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select
              showSearch
              placeholder="Chọn danh mục"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.categoryTitle}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Skills */}
          <Form.Item
            name="skills"
            label="Kỹ năng"
            rules={[{ required: true, message: "Vui lòng chọn ít nhất một kỹ năng!" }]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn kỹ năng"
              onChange={setSelectedSkills}
            >
              {skills.map((skill) => (
                <Option key={skill.id} value={skill.id}>
                  {skill.skillName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Scope */}
          <Form.Item
            name="scope"
            label="Quy mô dự án"
            rules={[{ required: true, message: "Vui lòng chọn quy mô dự án" }]}
          >
            <Select placeholder="Chọn quy mô">
              <Option value="small">Nhỏ</Option>
              <Option value="medium">Trung bình</Option>
              <Option value="large">Lớn</Option>
            </Select>
          </Form.Item>

          {/* Hour Work */}
          <Form.Item
            name="hourWork"
            label="Số giờ làm việc"
            rules={[{ required: true, message: "Vui lòng nhập số giờ làm việc." }]}
          >
            <InputNumber min={0} step={0.01} />
          </Form.Item>

          {/* Job Opportunity */}
          <Form.Item
            name="jobOpportunity"
            label="Cơ hội việc làm"
            rules={[{ required: true, message: "Vui lòng chọn cơ hội việc làm." }]}
          >
            <Select placeholder="Chọn cơ hội">
              <Option value={true}>Có</Option>
              <Option value={false}>Không</Option>
            </Select>
          </Form.Item>

          {/* Budget */}
          <Form.Item label="Ngân sách">
            <div className="justify-content-center">
              <div className="col-12 mb-2">
                <div className="d-flex justify-content-between">
                  <div
                    className={`border px-2 py-1 flex-grow-1 me-2 w-100 ${selected === "hourly_rate" ? "card-selected" : ""
                      }`}
                    onClick={() => handleCardClick("hourly_rate")}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <i className="fa-solid fa-clock"></i>

                        <div className="bi bi-person-fill me-2 fs-3 mb-5 py-2"></div>
                        <div className="ms-auto">
                          {selected === "hourly_rate" && (
                            <div className="circle-check"></div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <p>Giá theo giờ</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`border px-2 py-1 w-100 flex-grow-1 ms-2 ${selected === "fixed" ? "card-selected" : ""
                      }`}
                    onClick={() => handleCardClick("fixed")}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <i className="fa-solid fa-tag"></i>

                        <div className="bi bi-person-fill me-2 fs-3 mb-5 py-2"></div>
                        <div className="ms-auto">
                          {selected === "fixed" && (
                            <div className="circle-check"></div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <p>Giá cố định</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between gap-3">
              <Form.Item
                className="w-100"
                name="FromBudget"
                label="Ngân sách từ"
                rules={[{ required: true, message: "Vui lòng nhập ngân sách từ." }]}
              >
                <div className="w-100 d-flex align-items-center">
                  <InputNumber min={0} step={0.01} style={{ flexGrow: 1 }} />
                  {selected === "hourly_rate" && (
                    <span style={{ marginLeft: 8 }}>/ giờ</span>
                  )}
                </div>
              </Form.Item>

              <Form.Item
                className="w-100"
                name="ToBudget"
                label="Ngân sách đến"
                rules={[{ required: true, message: "Vui lòng nhập ngân sách đến." }]}
              >
                <div className="w-100 d-flex align-items-center">
                  <InputNumber min={0} step={0.01} style={{ flexGrow: 1 }} />
                  {selected === "hourly_rate" && (
                    <span style={{ marginLeft: 8 }}>/ giờ</span>
                  )}
                </div>
              </Form.Item>
            </div>
          </Form.Item>

          {/* Job Duration */}
          <Form.Item
            name="dateStart"
            label="Ngày bắt đầu"
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu." }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="dateEnd"
            label="Ngày kết thúc"
            rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc." }]}
          >
            <DatePicker />
          </Form.Item>

          {/* Job Description */}
          <Form.Item
            name="description"
            label="Mô tả công việc"
            rules={[{ required: true, message: "Vui lòng nhập mô tả công việc." }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button className="main-color-bg" htmlType="submit">
              Đăng việc
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default JobForm;
