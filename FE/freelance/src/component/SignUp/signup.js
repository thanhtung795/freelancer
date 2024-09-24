import React from "react";
import './css/style.css'; // Import file CSS tùy chỉnh

function SignUp() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 bg-light p-4 rounded mt-5">
          <div className="row mb-4">
            <div className="col-6">
              <button type="button" className="btn btn-danger w-100 rounded-custom ">
                <i className="fab fa-google"></i> Đăng nhập với Google
              </button>
            </div>
            <div className="col-6">
              <button type="button" className="btn btn-light bg-light  w-100 rounded-custom border border-secondary">
                <i className="fab fa-apple"></i> Đăng nhập với Apple
              </button>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12 text-center">
              <hr className="my-4" />
            </div>
          </div>
          <h3 className="text-center mb-4">
            Đăng ký
          </h3>
          <form>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="firstName">Họ</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Nhập họ của bạn"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="lastName">Tên</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Nhập tên của bạn"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Nhập email của bạn"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Nhập mật khẩu của bạn"
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Quốc gia</label>
              <select id="country" className="form-control">
                <option>Chọn quốc gia</option>
                <option>Việt Nam</option>
                <option>Hoa Kỳ</option>
                <option>Nhật Bản</option>
                <option>Hàn Quốc</option>
                {/* Thêm các quốc gia khác nếu cần */}
              </select>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn w-100 " 
              style={{ backgroundColor: "#4169E1" ,color:"white"}}
              >
                Đăng ký
              </button>
            </div>
          </form>
        <div className="form-check mt-3 mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
          Gửi cho tôi các email với mẹo tìm kiếm tài năng phù hợp với nhu cầu của tôi.
          </label>

         </div>
         <div className="form-check mt-3 mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
          Có, tôi hiểu và đồng ý với dịch vụ của TalentHub.
          </label>

         </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
