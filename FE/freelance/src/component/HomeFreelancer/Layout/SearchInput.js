import React, { useState } from 'react';

function Input({ type, id, className, placeholder }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <input
      type={type}
      id={id}
      className={className}
      placeholder={placeholder}
      style={{
        width: '100%',
        border: isHovered ? '2px solid #4169E1' : '1px solid #ccc', 
        outline: 'none', // Loại bỏ đường viền mặc định của input khi click
        padding: '8px', // Thêm padding để có không gian xung quanh input
        transition: 'border 0.3s ease', // Hiệu ứng mượt khi thay đổi viền
      }}
      onMouseEnter={() => setIsHovered(true)} // Khi hover vào
      onMouseLeave={() => setIsHovered(false)} // Khi rời chuột
    />
  );
}

function SearchInput() {
  return (
    <div className="search-input-container w-100">
      <Input 
        type="text"
        id="search-input"
        className="search-input w-100 rounded-5 mt-4"
        placeholder="Nhập từ khóa tìm kiếm"
      />
    </div>
  );
}

export default SearchInput;
