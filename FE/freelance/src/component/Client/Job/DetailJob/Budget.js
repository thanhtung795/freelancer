import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const Budget = () => {
  return (
    <div className="detail-item">
      <h3>Ngân sách</h3>
      <p>10.000.000 - 20.000.000 đồng</p>
      <FaPencilAlt className="edit-icon" />
    </div>
  );
};

export default Budget;