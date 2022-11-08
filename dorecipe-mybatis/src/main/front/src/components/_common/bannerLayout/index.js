import styled from "styled-components";

import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./style.css";

const BannerLayout = ({ children }) => {
  return (
    <>
      <div>
        <FlexWrap>
          <Swiper
            // install Swiper modules
            modules={[Autoplay, Navigation, Pagination, A11y]}
            autoplay={{
              delay: 6500,
              disableOnInteraction: false,
            }}
            slidesPerView={3}
            loop={true}
            navigation
            // spaceBetween={0}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
          >
            {children}
          </Swiper>
        </FlexWrap>
      </div>
    </>
  );
};
export default BannerLayout;
const FlexWrap = styled.div`
  width: 100%;
  height: 12em;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
