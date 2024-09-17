import React, { useState } from 'react';
import '../JoinAs/css/style.css'; // Import file CSS tùy chỉnh nếu có

function JoinAs() {
  const [selected, setSelected] = useState('client');

  const handleCardClick = (type) => {
    setSelected(type);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Tham gia với vai trò khách hàng hoặc freelancer.</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-between mb-3">
            <div
              className={`card flex-grow-1 me-2 ${selected === 'client' ? 'card-selected' : ''}`}
              onClick={() => handleCardClick('client')}
            >
              <div className="card-body" >
                <div className="d-flex justify-content-between ">
                <i className="bi bi-person-fill me-2 fs-3 mb-5"></i>
                <div className="ms-auto">
                  {selected === 'client' && <div className="circle-check"></div>}
                </div>
                </div>
                <div className="row">
                <h4>Tôi là khách hàng, đang tuyển dụng cho một dự án</h4>
                </div>
              </div>
            </div>
            <div
              className={`card flex-grow-1 ms-2 ${selected === 'freelancer' ? 'card-selected' : ''}`}
              onClick={() => handleCardClick('freelancer')}
            >
               <div className="card-body">
                <div className="d-flex justify-content-between ">
                <i className="bi bi-briefcase-fill me-2 fs-3 mb-5"></i>
                <div className="ms-auto">
                  {selected === 'freelancer' && <div className="circle-check"></div>}
                </div>
                </div>
                <div className="row">
                <h4>Tôi là freelancer, đang tìm kiếm công việc</h4>
                </div>
              </div>
            </div>
          </div>
          <button className="btn  w-100 mb-3" style={{ backgroundColor: '#4169E1', color: 'white' }}>
            {selected === 'client' ? 'Tham gia với vai trò Khách hàng' : 'Tham gia với vai trò Freelancer'}
          </button>
          <p className="text-center">
          Bạn đã có tài khoản chưa? <a href="#" className="text-success">Đăng nhập</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default JoinAs;
