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

function ListNewJobss() {
  const jobList = [
    {
      id: 1,
      name: "Ứng dụng Android",
      postedTime: "18 giờ trước",
      content:
        "Chúng tôi đang tìm kiếm một nhà phát triển ứng dụng Android có thể hỗ trợ dự án hiện tại. Nếu bạn có kinh nghiệm, vui lòng gửi liên kết ứng dụng của bạn.",
      price: "2.000.000",
      suggestedTime: "20 đến 50",
      location: "Việt Nam",
      skills: ["Android", "iOS", "React"],
    },
    {
      id: 2,
      name: "Nhà phát triển iOS",
      postedTime: "1 ngày trước",
      content:
        "Cần tìm nhà phát triển iOS cho một dự án dài hạn. Vui lòng liên hệ với chúng tôi kèm theo portfolio của bạn.",
      price: "3.500.000",
      suggestedTime: "15 đến 30",
      location: "Hà Nội",
      skills: ["iOS", "Swift", "Objective-C"],
    },
    {
      id: 3,
      name: "Nhà phát triển Web",
      postedTime: "2 ngày trước",
      content:
        "Chúng tôi đang tìm kiếm một nhà phát triển web có kinh nghiệm để làm việc với dự án dài hạn. Yêu cầu có kiến thức về HTML, CSS và JavaScript.",
      price: "5.000.000",
      suggestedTime: "10 đến 20",
      location: "TP. Hồ Chí Minh",
      skills: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: 4,
      name: "Lập trình viên Python",
      postedTime: "3 ngày trước",
      content:
        "Cần tìm lập trình viên Python có kinh nghiệm để phát triển ứng dụng backend. Nếu bạn quan tâm, vui lòng liên hệ với chúng tôi.",
      price: "6.000.000",
      suggestedTime: "30 đến 40",
      location: "Đà Nẵng",
      skills: ["Python", "Django", "Flask"],
    },
    {
      id: 5,
      name: "Nhà phát triển React",
      postedTime: "5 ngày trước",
      content:
        "Chúng tôi đang tìm kiếm một lập trình viên React để tham gia phát triển ứng dụng front-end. Ứng viên cần có kinh nghiệm làm việc với REST API và Redux.",
      price: "4.500.000",
      suggestedTime: "25 đến 35",
      location: "Hải Phòng",
      skills: ["React", "Redux", "REST API"],
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

export default ListNewJobss;
