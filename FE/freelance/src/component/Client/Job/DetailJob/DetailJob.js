import React from 'react';
import { FaCheck, FaPencilAlt } from 'react-icons/fa';

const DetailJob = () => {
  return (
    <div className="job-details">
      <h1>Job details</h1>
      <button className="post-btn">Post this job</button>

      <div className="detail-item">
        <h2>Build responsive WordPress site with booking/payment functionality</h2>
        <FaPencilAlt className="edit-icon" />
      </div>

      <div className="detail-item">
        <p>Talent type needed for your work</p>
        <FaCheck className="check-icon" />
      </div>

      <div className="detail-item">
        <p>Clear expectations about your task or deliverable</p>
        <FaCheck className="check-icon" />
      </div>

      <div className="detail-item">
        <p>This skills required for your work</p>
        <FaCheck className="check-icon" />
      </div>

      <div className="detail-item">
        <p>Confirm your budget and time frame to work</p>
        <FaCheck className="check-icon" />
      </div>

      <div className="detail-item">
        <h3>Category</h3>
        <p>Web Design</p>
        <FaPencilAlt className="edit-icon" />
      </div>

      <div className="detail-item">
        <h3>Skills</h3>
        <div className="skill-tag">WordPress</div>
        <FaPencilAlt className="edit-icon" />
      </div>

      <div className="detail-item">
        <h3>Scope</h3>
        <p>Large - More than 6 months, Entry level: Complex to the opportunity</p>
        <FaPencilAlt className="edit-icon" />
      </div>

      <div className="detail-item">
        <h3>Budget</h3>
        <FaPencilAlt className="edit-icon" />
      </div>
    </div>
  );
};

export default DetailJob;
