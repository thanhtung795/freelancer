import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function IconButton({ icon, size = "24px", color = "black", onClick, title }) {
  const iconStyles = {
    fontSize: size,
    color: color,
    cursor: "pointer",
    transform: icon === "fa-thumbs-down" ? "scaleX(-1)" : "none", // Quay ngược biểu tượng thumbs-down
  };

  return (
    <i
      className={`fa-regular ${icon}`}
      style={iconStyles}
      onClick={onClick}
      title={title}
    ></i>
  );
}

function ListBestJobs() {

  const jobList = [
    {
      id: 1,
      name: "Chuyên gia Phát triển AI",
      postedTime: "1 giờ trước",
      content:
        "Chúng tôi đang tìm kiếm chuyên gia phát triển AI để xây dựng hệ thống trí tuệ nhân tạo có khả năng học sâu và tối ưu hóa mô hình dự đoán. Ưu tiên ứng viên có kinh nghiệm với TensorFlow hoặc PyTorch.",
      price: "50.000.000",
      suggestedTime: "100 đến 200",
      location: "Toàn cầu (Làm từ xa)",
      skills: ["AI", "Machine Learning", "Python", "TensorFlow", "PyTorch"],
    },
    {
      id: 2,
      name: "Kỹ sư Blockchain cao cấp",
      postedTime: "3 giờ trước",
      content:
        "Cần tìm kỹ sư blockchain để xây dựng nền tảng tài chính phi tập trung (DeFi). Ưu tiên ứng viên có kinh nghiệm với Solidity và phát triển hợp đồng thông minh.",
      price: "70.000.000",
      suggestedTime: "120 đến 250",
      location: "Toàn cầu (Làm từ xa)",
      skills: ["Blockchain", "Solidity", "Ethereum", "DeFi"],
    },
    {
      id: 3,
      name: "Nhà phát triển Fullstack JavaScript",
      postedTime: "5 giờ trước",
      content:
        "Chúng tôi đang tìm một nhà phát triển Fullstack JavaScript để tham gia phát triển một ứng dụng web phức tạp. Yêu cầu có kiến thức chuyên sâu về React và Node.js.",
      price: "40.000.000",
      suggestedTime: "80 đến 150",
      location: "TP. Hồ Chí Minh",
      skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    },
    {
      id: 4,
      name: "Chuyên gia Data Scientist",
      postedTime: "1 ngày trước",
      content:
        "Tìm chuyên gia Data Scientist để phân tích và xử lý dữ liệu lớn cho các dự án của công ty. Yêu cầu kinh nghiệm làm việc với các mô hình thống kê phức tạp và xử lý dữ liệu bằng Python hoặc R.",
      price: "60.000.000",
      suggestedTime: "90 đến 180",
      location: "Hà Nội",
      skills: ["Data Science", "Big Data", "Python", "R", "SQL"],
    },
    {
      id: 5,
      name: "Kỹ sư An ninh mạng",
      postedTime: "2 ngày trước",
      content:
        "Cần tuyển kỹ sư an ninh mạng để bảo mật hệ thống và kiểm tra xâm nhập (penetration testing). Ứng viên có kiến thức về các tiêu chuẩn bảo mật và kinh nghiệm phát hiện lỗ hổng bảo mật sẽ được ưu tiên.",
      price: "55.000.000",
      suggestedTime: "60 đến 120",
      location: "Toàn cầu (Làm từ xa)",
      skills: ["Cybersecurity", "Penetration Testing", "Ethical Hacking", "Network Security"],
    },
  ];
  

  return (
    <div>
      {jobList.map((job) => (
        <div className="box-content row mt-4" key={job.id}>
          <div
            className="content-top d-flex justify-content-between align-items-center"
            id="content-top"
          >
            <div id="title-box" className="title-box">
              <span>Thời gian đã đăng: {job.postedTime}</span>
              <h3>{job.name}</h3>
            </div>
            <div
              id="icon-active"
              className="icon-active"
              style={{ display: "flex", gap: "10px" }}
            >
              <IconButton icon="fa-thumbs-down" size="30px" title="Dislike" />
              <IconButton icon="fa-heart" size="30px" title="Like" />
            </div>
          </div>
          <div className="row">
            <div className="body-content">
              <span>{job.content}</span>
              <div className="d-flex flex-wrap gap-2 mt-3">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="badge bg-bg-bg-secondary-subtle text-dark"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="sidebar-content d-flex align-content-center">
              <div className="Payment me-3">
                <IconButton
                  icon="fa-regular fa-circle-check me-2"
                  size="15px"
                  title="Payment"
                />
                <span>Thanh toán đã được xác minh</span>
              </div>
              <div className="Stars d-flex">
                <IconButton
                  icon="fa-solid fa-star"
                  size="15px"
                  color="yellow"
                  title="Stars"
                />
                <IconButton
                  icon="fa-solid fa-star"
                  size="15px"
                  color="yellow"
                  title="Stars"
                />
                <IconButton
                  icon="fa-solid fa-star"
                  size="15px"
                  color="yellow"
                  title="Stars"
                />
                <IconButton
                  icon="fa-solid fa-star"
                  size="15px"
                  color="yellow"
                  title="Stars"
                />
              </div>
              <div className="Price ms-3">
                <span>{job.price}</span>
                <span>đ</span>
              </div>
              <div className="Location ms-3">
                <IconButton
                  icon="fa-solid fa-location-dot"
                  size="15px"
                  title="Location"
                />
                <span>{job.location}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <span>Đề xuất: {job.suggestedTime}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListBestJobs;
