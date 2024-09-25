import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Autoplay } from 'swiper/modules';

const InBanner = ({ titleTop, titleBot, buttonTitle }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f2f5' }}>
      <h2>{titleTop}</h2>
      <p>{titleBot}</p>
      <button>{buttonTitle}</button>
    </div>
  );
};

export default function SwipperBanner() {
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
        pagination={false} // Tắt pagination
        navigation={false} // Tắt navigation
        modules={[Autoplay]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <InBanner
            titleTop="Lên vị trí hàng đầu trong danh sách của khách hàng"
            titleBot="Boosted Proposals mang lại thu nhập cao hơn 10 lần cho chi tiêu quảng cáo"
            buttonTitle="Tăng cường ngay bây giờ"
          />
        </SwiperSlide>
        <SwiperSlide>
          <InBanner
            titleTop="Khám phá cơ hội mới"
            titleBot="Nâng cao khả năng của bạn với các đề xuất nổi bật"
            buttonTitle="Khám phá ngay"
          />
        </SwiperSlide>
        <SwiperSlide>
          <InBanner
            titleTop="Tăng cường sự hiện diện"
            titleBot="Hãy để khách hàng thấy bạn nổi bật hơn"
            buttonTitle="Xem chi tiết"
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
