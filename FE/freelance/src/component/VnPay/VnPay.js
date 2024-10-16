import React, { useState } from 'react';

const ButtonComponent = ({ onClick, text, type = 'button', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded"
      {...props}
    >
      {text}
    </button>
  );
};

const VnPay = () => {
  const [amount, setAmount] = useState('');

  const handlePayment = async () => {
    try {
      // Sử dụng URLSearchParams để tạo query string
      const params = new URLSearchParams({ amount: amount });
      const response = await fetch(`http://localhost:8080/api/payment/vnpay?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Không nhận được URL thanh toán');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra khi xử lý thanh toán');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Nhập số tiền"
        className="border border-gray-300 rounded px-3 py-2"
      />
      <ButtonComponent
        onClick={handlePayment}
        text="Thanh toán qua VnPay"
        disabled={!amount}
      />
    </div>
  );
};

export default VnPay;