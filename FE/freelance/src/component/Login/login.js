import React from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/signUp');
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-12 col-md-4 bg-light p-4 rounded mt-5"
          style={{ paddingTop: "40px", paddingBottom: "60px" }}
        >
          <h3 className="text-center">Đăng nhập</h3>
          <form>
            <div className="form-group d-flex justify-content-center">
              <input
                type="email"
                className="form-control w-100 w-md-75"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Nhập tên tài khoản hoặc email"
              />
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary w-100 w-md-75 mb-3"
                style={{ backgroundColor: "#4169E1" }}
              >
                Tiếp tục
              </button>
            </div>
            <hr className="my-4" />
            <div className="text-center">
              <button type="button" className="btn btn-danger w-100 mb-3">
                <i className="fab fa-google"></i> Đăng nhập với Google
              </button>
              <button
                type="button"
                className="btn bg-dark text-light w-100 mt-3"
              >
                <i className="fab fa-apple"></i> Đăng nhập với Apple
              </button>
            </div>
          </form>
          {/* Thông báo đăng ký */}
          <p className="text-muted text-center mt-5">
            Bạn đã có tài khoản chưa?
          </p>
          {/* Nút Đăng ký */}
          <div className="text-center mt-5">
            <button
              type="button"
              style={{
                color: "#4169E1",
                borderColor: "#4169E1", // Để border cùng màu với nền
                borderRadius: "5px", // Bo góc cho nút
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

export default Login;
