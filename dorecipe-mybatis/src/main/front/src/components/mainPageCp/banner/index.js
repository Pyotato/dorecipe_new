import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./style.css";
import styled from "styled-components";

const Banner = () => {
  return (
    <MainBannerWrap>
      {" "}
      <Swiper
        // install Swiper modules
        modules={[Autoplay, Navigation, Pagination, A11y]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide className="slide1">
          {" "}
          <img
            className="bannerimg"
            src="/img/banner2.png"
            alt="bannerimg"
          ></img>
        </SwiperSlide>
        <SwiperSlide className="slide1">
          {" "}
          <img
            className="bannerimg"
            src="/img/banner3.png"
            alt="bannerimg"
          ></img>
        </SwiperSlide>
        <SwiperSlide className="slide1">
          {" "}
          <img
            className="bannerimg"
            src="/img/banner4.png"
            alt="bannerimg"
          ></img>
        </SwiperSlide>
        <SwiperSlide className="slide1">
          {" "}
          <img
            className="bannerimg"
            src="/img/banner5.png"
            alt="bannerimg"
          ></img>
        </SwiperSlide>
      </Swiper>
    </MainBannerWrap>
  );
};
export default Banner;

const MainBannerWrap = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;
