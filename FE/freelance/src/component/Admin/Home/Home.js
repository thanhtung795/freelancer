import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Autoplay } from 'swiper/modules';

const InBanner = ({ titleTop, titleBot, buttonTitle, backgroundImage }) => {
  const bannerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const textContainerStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '8px', 
    color: 'white', 
  };

  return (
    <div style={bannerStyle}>
      <div style={textContainerStyle}>
        <h2 className="text-white">{titleTop}</h2>
        <p className="text-white">{titleBot}</p>
        <button>{buttonTitle}</button>
      </div>
    </div>
  );
};

export default function Home() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={false}
        navigation={false}
        modules={[Autoplay]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <InBanner
            titleTop="Lên vị trí hàng đầu trong danh sách của khách hàng"
            titleBot="Boosted Proposals mang lại thu nhập cao hơn 10 lần cho chi tiêu quảng cáo"
            buttonTitle="Tăng cường ngay bây giờ"
            backgroundImage="https://th.bing.com/th/id/OIP.5tHwJwhij3QgGqKjLFuVIQHaD4?w=290&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          />
        </SwiperSlide>
        <SwiperSlide>
          <InBanner
            titleTop="Khám phá cơ hội mới"
            titleBot="Nâng cao khả năng của bạn với các đề xuất nổi bật"
            buttonTitle="Khám phá ngay"
            backgroundImage="https://th.bing.com/th/id/OIP.mlR5h8_4LSTv1d8VlrEnEwHaFB?w=223&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          />
        </SwiperSlide>
        <SwiperSlide>
          <InBanner
            titleTop="Tăng cường sự hiện diện"
            titleBot="Hãy để khách hàng thấy bạn nổi bật hơn"
            buttonTitle="Xem chi tiết"
            backgroundImage="https://th.bing.com/th/id/OIP.kHF-84w03yFKTYnRUeNAqgHaDt?w=294&h=175&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          />
        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
