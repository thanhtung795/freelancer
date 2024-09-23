import React from "react";
import "./styles.css";
import FindTalentComponentItem from "./FindTalentComponentItem/FindTalentComponentItem";

function FindTalentComponent() {
  const items = [
    {
      title: "Freelancers",
      description: "Làm việc với những freelancer giỏi nhất trong mọi lĩnh vực."
    },
    {
      title: "Các công ty",
      description: "Thuê các công ty hàng đầu để mở rộng doanh nghiệp của bạn."
    },
    {
      title: "Quản lý dự án",
      description: "Nhận sự trợ giúp trong việc quản lý các dự án phức tạp."
    }
  ];

  return (
    <div className="background-section rounded mb-3">
        <div></div>
      <div className="content">
        <h1>Tìm kiếm tài năng theo cách của bạn</h1>
        <p>
          Làm việc với mạng lưới các chuyên gia độc lập lớn nhất và hoàn thành công việc từ những việc nhỏ đến các dự án lớn.
        </p>
      </div>
      <div className="row w-100">
        {items.map((item, index) => (
          <FindTalentComponentItem
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default FindTalentComponent;
