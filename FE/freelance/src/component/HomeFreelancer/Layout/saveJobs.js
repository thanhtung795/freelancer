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
  
function saveJobs() {
    
    const savedJobs = [
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
    ];
    return (
        <div>
          {savedJobs.length > 0 ? (
            savedJobs.map((job) => (
              <div className="box-content row mt-4" key={job.id}>
                <div className="content-top d-flex justify-content-between align-items-center" id="content-top">
                  <div id="title-box" className="title-box">
                    <h3>{job.name}</h3>
                    <span>Thời gian đã lưu: {job.postedTime}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="body-content">
                    <span>{job.content}</span>
                    <div className="d-flex flex-wrap gap-2 mt-3">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="badge bg-bg-bg-secondary-subtle text-dark">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="sidebar-content d-flex align-content-center">
                    <div className="Price ms-3">
                      <span>{job.price}</span>
                      <span>đ</span>
                    </div>
                    <div className="Location ms-3">
                      <IconButton icon="fa-solid fa-location-dot" size="15px" title="Location" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Chưa có công việc nào được lưu.</p>
          )}
        </div>
      );
}

export default saveJobs;