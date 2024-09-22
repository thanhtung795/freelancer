import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles.css"; // Đảm bảo rằng bạn đã tạo và kết nối file CSS

function TalentSkillItem({ title, rating, skills }) {
  return (
    <div className="container bg-light py-4 mb-2">
      <div className="d-flex flex-column align-items-center">
        {/* Phần trên */}
        <div className="mb-3 text-center">
          <h2 className="title">{title}</h2>
        </div>

        {/* Phần dưới */}
        <div className="d-flex gap-3 align-items-center">
          <div className="d-flex align-items-center gap-2">
            <i className="fa-solid fa-star star-icon"></i>
            <span className="rating-text">{rating}</span>
          </div>
          <div>
            <span className="skills-text">{skills} skills</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TalentSkillItem;
