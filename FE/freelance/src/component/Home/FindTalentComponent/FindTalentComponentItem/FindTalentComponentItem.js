import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles.css";

function FindTalentComponentItem({ title, description }) {
  return (
    <div className="col-12 col-lg-4 mb-2" style={{cursor: "pointer"}}>
      <div
        className="py-4 rounded px-4 hover-bg-white"
        style={{ backgroundColor: "green", borderRadius: "15px" }}
      >
        <div className="d-flex flex-column align-items-center model-name">
          <div className="mb-3 text-start w-100">
            <h2 className="title">{title}</h2>
          </div>
          <span className="mb-0 model-name w-100 text-start">
            <span data-qa="model-name">
              {description}
              <sup>TM</sup>
            </span>{" "}
          
          </span>
        </div>
      </div>
    </div>
  );
}

export default FindTalentComponentItem;
