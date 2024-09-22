import React from 'react';
import { FaCheck, FaPencilAlt } from 'react-icons/fa';

const Description = () => {
  return (
    <div className="detail-item">
      <div className="description-content">
        <p>Ứng viên tôi đang tìm kiếm:</p>
        <p>Mong muốn cộng tác mãnh liệt</p>
        <p>Đáp ứng mọi kỹ năng để thực hiện dự án</p>
        <p>Khả năng giao tiếp tốt</p>
      </div>
      <FaPencilAlt className="edit-icon" />
    </div>
  );
};

export default Description;