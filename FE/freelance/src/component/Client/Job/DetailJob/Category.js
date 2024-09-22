import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const Category = () => {
  return (
    <div className="detail-item">
      <h3>Category</h3>
      <p>Web Design</p>
      <FaPencilAlt className="edit-icon" />
    </div>
  );
};

export default Category;