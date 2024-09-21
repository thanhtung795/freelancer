import React, { useState } from "react";
import "../css/job.css";
import axios from "axios";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Upload,
  message,
  Spin,
  Space,
  AutoComplete,
  TreeSelect,
} from "antd";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const JobForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([
    {
      title: "Chọn ngôn ngữ",
      value: "programming_languages",
      children: [
        { title: "JavaScript", value: "javascript" },
        { title: "Python", value: "python" },
        { title: "Java", value: "java" },
        { title: "C++", value: "cpp" },
        { title: "C#", value: "csharp" },
        { title: "Ruby", value: "ruby" },
        { title: "PHP", value: "php" },
        { title: "Go", value: "go" },
        { title: "Rust", value: "rust" },
        { title: "Swift", value: "swift" },
      ],
    },
  ]);

  const onFinish = async (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("mainSkill", values.mainSkill);
    formData.append("budget", values.budget);
    formData.append("duration", values.duration);
    if (values.files) {
      values.files.fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });
    }

    try {
      await axios.post("http://localhost:8080/api/post-job", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      message.success("Đăng tuyển thành công.");
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Đăng tuyển thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    // const skills = ["JavaScript", "React", "Node.js", "Python", "Java"];
    // setSkillOptions(() => {
    //   if (!value) {
    //     return [];
    //   }
    //   return skills
    //     .filter((skill) => skill.toLowerCase().includes(value.toLowerCase()))
    //     .map((skill) => ({
    //       label: skill,
    //       value: skill,
    //     }));
    // });
    // setOptions(() => {
    //   if (!value || value.includes("@")) {
    //     return [];
    //   }
    //   return ["gmail.com", "163.com", "qq.com"].map((domain) => ({
    //     label: `${value}@${domain}`,
    //     value: `${value}@${domain}`,
    //   }));
    // });
  };

  const [selected, setSelected] = useState("hours");
  const navigate = useNavigate();

  const handleCardClick = (type) => {
    setSelected(type);
  };

  const handleButtonClick = () => {
    navigate("/login");
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
            rules={[
              { required: true, message: "Vui lòng nhập tiêu đề công việc." },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Main Skill */}
          <Form.Item
            name="mainSkill"
            label="Kỹ năng chính"
            // rules={[{ required: true, message: "Vui lòng chọn kỹ năng chính!" }]}
          >
            <TreeSelect
              style={{ width: "100%" }}
              placeholder="Chọn kỹ năng chính"
              treeData={skillOptions}
              treeCheckable={true}
              showSearch
              onSearch={handleSearch}
              treeDefaultExpandAll
              fieldNames={{
                label: "title",
                value: "value",
                children: "children",
              }}
              value={form.getFieldValue("mainSkill") || []}
              onChange={(values) => form.setFieldsValue({ mainSkill: values })}
            />
          </Form.Item>

          {/* Duration */}
          <Form.Item
            name="duration"
            label="Thời gian"
            rules={[{ required: true, message: "Vui lòng chọn thời gian." }]}
          >
            <Select placeholder="Chọn thời gian">
              <Option value="1_week">1 Tuần</Option>
              <Option value="2_weeks">2 Tuần</Option>
              <Option value="1_month">1 Tháng</Option>
              <Option value="2_months">2 Tháng</Option>
              <Option value="more">Hơn 2 Tháng</Option>
            </Select>
          </Form.Item>
          {/* Budget */}
          <Form.Item label="Ngân sách">
            <div className="justify-content-center">
              <div className="col-12 mb-2">
                <div className="d-flex justify-content-between">
                  <div
                    className={`border px-2 py-1 flex-grow-1 me-2 w-100 ${
                      selected === "hours" ? "card-selected" : ""
                    }`}
                    onClick={() => handleCardClick("hours")}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <i className="fa-solid fa-clock"></i>

                        <div className="bi bi-person-fill me-2 fs-3 mb-5 py-2"></div>
                        <div className="ms-auto">
                          {selected == "hours" && (
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
                    className={`border px-2 py-1 w-100 flex-grow-1 ms-2 ${
                      selected === "fixed" ? "card-selected" : ""
                    }`}
                    onClick={() => handleCardClick("fixed")}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <i className="fa-solid fa-tag"></i>

                        <div className="bi bi-person-fill me-2 fs-3 mb-5 py-2"></div>
                        <div className="ms-auto">
                          {selected == "fixed" && (
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
                rules={[
                  { required: true, message: "Vui lòng nhập ngân sách từ." },
                ]}
              >
                <div className="w-100 d-flex align-items-center">
                  <InputNumber min={0} step={0.01} style={{ flexGrow: 1 }} />
                  {selected == "hours" && (
                    <span style={{ marginLeft: 8 }}>/ giờ</span>
                  )}
                </div>
              </Form.Item>

              <Form.Item
                className="w-100"
                name="ToBudget"
                label="Ngân sách đến"
                rules={[
                  { required: true, message: "Vui lòng nhập ngân sách đến." },
                ]}
              >
                <div className="w-100 d-flex align-items-center">
                  <InputNumber min={0} step={0.01} style={{ flexGrow: 1 }} />
                  {selected == "hours" && (
                    <span style={{ marginLeft: 8 }}>/ giờ</span>
                  )}
                </div>
              </Form.Item>
            </div>
          </Form.Item>

          {/* Job Description */}
          <Form.Item
            name="description"
            label="Mô tả công việc"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả công việc." },
            ]}
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
