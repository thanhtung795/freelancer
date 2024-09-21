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
          alt="Find Great Work"
          className="img-fluid w-100"
          style={{ height: "100vh", objectFit: "cover" }}
        />
      </div>

      <div className="col-md-6 d-flex flex-column justify-content-center p-4 text-white bg-dark rounded-right">
        <div className="for-talent-content">
          <div className="for-talent-content-first-section mb-4">
            <p className="headline mb-4">For talent</p>
            <h1 className="display-rebrand mb-4">
              <span>Find great<br /> work</span>
            </h1>
            <span className="subtitle mb-4">
              Meet clients you’re excited to work with and take<br /> your career or business to new heights.
            </span>
          </div>

          <hr className="hr-separator mb-4" />

          <div className="find-talent-footer">
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <div className="overview-item">
                  Find opportunities for every stage of your freelance career
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="overview-item">
                  Control when, where, and how you work
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="overview-item">
                  Explore different ways to earn
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Link to="/signup" className="btn btn-primary">
                Find opportunities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplitScreenComponent;
