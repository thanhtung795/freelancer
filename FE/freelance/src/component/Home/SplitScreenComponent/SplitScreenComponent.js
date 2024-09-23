import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Link } from "react-router-dom";

function SplitScreenComponent() {
  return (
    <div className="container-fluid d-flex flex-column flex-md-row p-0 rounded-container">
      <div className="col-md-6 p-0 rounded-left">
        <img
          src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload//q_auto,dpr_2.0,f_auto/brontes/for-talents/find-great-work@2x.jpg"
          alt="Tìm việc làm tuyệt vời"
          className="img-fluid w-100"
          style={{ height: "100vh", objectFit: "cover" }}
        />
      </div>

      <div className="col-md-6 d-flex flex-column justify-content-center p-4 text-white bg-dark rounded-right">
        <div className="for-talent-content">
          <div className="for-talent-content-first-section mb-4">
            <p className="headline mb-4">Dành cho nhân tài</p>
            <h1 className="display-rebrand mb-4">
              <span>Tìm việc làm<br /> tuyệt vời</span>
            </h1>
            <span className="subtitle mb-4">
              Gặp gỡ những khách hàng bạn mong muốn làm việc cùng và đưa<br /> sự nghiệp hoặc doanh nghiệp của bạn lên tầm cao mới.
            </span>
          </div>

          <hr className="hr-separator mb-4" />

          <div className="find-talent-footer">
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <div className="overview-item">
                  Tìm kiếm cơ hội cho mọi giai đoạn sự nghiệp freelance của bạn
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="overview-item">
                  Kiểm soát thời gian, địa điểm và cách bạn làm việc
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="overview-item">
                  Khám phá các cách khác nhau để kiếm tiền
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Link to="/signup" className="btn btn-primary">
                Tìm cơ hội
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplitScreenComponent;
