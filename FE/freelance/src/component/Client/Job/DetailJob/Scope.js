import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const Scope = () => {
  return (
    <div className="detail-item">
      <h3>Phạm vi</h3>
      <p>Lớn, Kéo dài hơn 6 tháng, Yêu cầu kinh nghiệm, Có cơ hội hợp tác lâu dài</p>
      <FaPencilAlt className="edit-icon" />
    </div>
  );
};

export default Scope;