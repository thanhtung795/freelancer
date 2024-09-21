import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const Budget = () => {
  return (
    <div className="detail-item">
      <h3>Budget</h3>
      <p>$500 - $1000</p>
      <FaPencilAlt className="edit-icon" />
    </div>
  );
};

export default Budget;