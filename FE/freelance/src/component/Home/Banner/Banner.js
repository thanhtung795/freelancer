import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="my-container">
      <div className="row align-items-center">
        
        <div className="col-lg-6 d-flex align-items-center">
          <div className="col-md-7 col-lg-7 info-holder position-relative">
            <h1 className="hero-title display-rebrand mb-3 black-title">
              <span>
                <span role="text">Cách làm việc</span>
              </span>
            </h1>
            <p className="mb-8 subtitle">
              <span>
                <span role="text">
                  Quên đi những quy tắc cũ. Bạn có thể có được <br className="d-lg-none d-md-block d-sm-block" />
                  những người giỏi nhất.<br className="d-none d-lg-block" />
                  Ngay bây giờ. Ngay tại đây.
                </span>
              </span>
            </p>
            <div className="hero-cta d-flex flex-wrap mb-0">
              <Link to="/signUp" className="up-n-link air3-btn air3-btn-primary mb-0">
                <Button style={{ backgroundColor:"#2671e0"}} className="me-2">
                  Bắt đầu
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-6 d-flex justify-content-center">
          <img
            src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/c_scale,w_440,h_300,f_auto,q_auto,dpr_2.0/brontes/hero/searching-talent@2x.png"
            alt="Upwork"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
