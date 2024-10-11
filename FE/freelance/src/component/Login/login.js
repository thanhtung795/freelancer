import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService"; 
import { message } from "antd";

function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');

  const handleButtonClick = () => {
    navigate('/joinAs');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('userRole', response.data.role);
      if (response.data.role === 'freelancer') {
        window.location.href = '/home-freelancer';
      } else if (response.data.role === 'client') {
        window.location.href = '/';
      } else if (response.data.role === 'admin') {
        window.location.href = '/admin';
      }
    } catch (err) {
      message.error(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-12 col-md-4 bg-light p-4 rounded mt-5"
          style={{ paddingTop: "40px", paddingBottom: "60px" }}
        >
          <h3 className="text-center">Đăng nhập</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={step === 1 ? handleEmailSubmit : handleLogin}>
            {step === 1 ? (
              <div className="form-group d-flex justify-content-center">
                <input
                  type="email"
                  className="form-control w-100 w-md-75"
                  placeholder="Nhập tên tài khoản hoặc email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div className="form-group d-flex justify-content-center">
                <input
                  type="password"
                  className="form-control w-100 w-md-75"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary w-100 w-md-75 mb-3"
                style={{ backgroundColor: "#4169E1" }}
              >
                {step === 1 ? 'Tiếp tục' : 'Đăng nhập'}
              </button>
            </div>
          </form>
          <hr className="my-4" />
          <div className="text-center">
            <button type="button" className="btn btn-danger w-100 mb-3">
              <i className="fab fa-google"></i> Đăng nhập với Google
            </button>
            <button type="button" className="btn bg-dark text-light w-100 mt-3">
              <i className="fab fa-apple"></i> Đăng nhập với Apple
            </button>
          </div>
          <p className="text-muted text-center mt-5">
            Bạn đã có tài khoản chưa?
          </p>
          <div className="text-center mt-5">
            <button
              type="button"
              style={{
                color: "#4169E1",
                borderColor: "#4169E1",
                borderRadius: "5px",
              }}
              className="w-50"
              onClick={handleButtonClick}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;