import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const Category = () => {
  return (
    <div className="detail-item">
      <h3>Thể loại</h3>
      <p>Thiết kế Web</p>
      <FaPencilAlt className="edit-icon" />
    </div>
  );
};

export default Category;