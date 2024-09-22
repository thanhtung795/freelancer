import React from 'react';
import { FaCheck, FaPencilAlt } from 'react-icons/fa';

const Description = () => {
  return (
    <div className="detail-item">
      <div className="description-content">
        <p>Talent type needed for your work</p>
        <p>Clear expectations about your task or deliverable</p>
        <p>This skills required for your work</p>
        <p>Confirm your budget and time frame to work</p>
      </div>
      <FaPencilAlt className="edit-icon" />
    </div>
  );
};

export default Description;