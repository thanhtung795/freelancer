import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const Skill = () => {
  return (
    <div className="detail-item">
      <h3>Kỹ năng</h3>
      <div className="skill-tag">WordPress</div>
      <div className="skill-tag">Java Spring Boot</div>
      <FaPencilAlt className="edit-icon" />
    </div>
  );
};

export default Skill;