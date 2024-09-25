import React, { useState } from 'react';
import { Card, Radio, Button, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePaymentChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handlePaymentSubmit = () => {
    if (selectedMethod === 'credit-card' && !cardNumber) {
      alert('Vui lòng nhập số thẻ tín dụng');
      return;
    }
    alert(`Bạn đã chọn phương thức thanh toán: ${selectedMethod}`);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Chọn phương thức thanh toán</h1>

      <Card className="payment-card" style={{ marginBottom: '20px' }}>
        <Radio.Group onChange={handlePaymentChange} value={selectedMethod} style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
            <Radio value="credit-card">
              <FontAwesomeIcon icon={faCreditCard} /> Thẻ tín dụng
            </Radio>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
            <Radio value="wallet">
              <FontAwesomeIcon icon={faMoneyBillWave} /> Ví điện tử
            </Radio>
          </div>
        </Radio.Group>
      </Card>

      {selectedMethod === 'credit-card' && (
        <Card style={{ marginBottom: '20px' }}>
          <Input 
            placeholder="Số thẻ tín dụng"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Input 
            placeholder="Ngày hết hạn (MM/YY)"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Input 
            placeholder="Mã bảo mật (CVV)"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        </Card>
      )}

      {selectedMethod === 'wallet' && (
        <Card style={{ marginBottom: '20px' }}>
          <h3>Chọn ví điện tử</h3>
          <Radio.Group onChange={handlePaymentChange} value={selectedMethod} style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
              <Radio value="momo">MoMo</Radio>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
              <Radio value="viettel-money">Viettel Money</Radio>
            </div>
          </Radio.Group>
        </Card>
      )}

      <Button type="primary" onClick={handlePaymentSubmit} style={{ width: '100%' }}>
        Xác nhận thanh toán
      </Button>
    </div>
  );
};

export default Payment;
