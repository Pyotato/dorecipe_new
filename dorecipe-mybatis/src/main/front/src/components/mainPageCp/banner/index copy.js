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
    <Swiper
      // install Swiper modules
      // modules={[Navigation, Pagination, Scrollbar, A11y]}
      modules={[Autoplay, Navigation, Pagination, A11y]}
      // spaceBetween={1}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      slidesPerView={1}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <MainBannerWrap>
        <SwiperSlide className="slide1">
          <Swiper
            // install Swiper modules
            // modules={[Navigation, Pagination, Scrollbar, A11y]}
            modules={[Autoplay, A11y]}
            // spaceBetween={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            loop={true}
            // navigation
            // pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
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
        </SwiperSlide>
      </MainBannerWrap>
      <SwiperSlide className="slide1"> </SwiperSlide>
      <SwiperSlide className="slide1"> 오ㅇ잉</SwiperSlide>
      <SwiperSlide className="slide1"> 테스트</SwiperSlide>
    </Swiper>
  );
};
export default Banner;

const MainBannerWrap = styled.div`
  width: 50vw;
  & > SwiperSlide {
    width: 50%;
  }
  & > SwiperSlide > Swiper {
    width: 50vw;
  }
`;
