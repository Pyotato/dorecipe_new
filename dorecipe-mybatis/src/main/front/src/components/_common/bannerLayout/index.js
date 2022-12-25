import styled from "styled-components";

import { Autoplay, Navigation, Pagination, A11y } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { colors } from "../../../theme/theme";

const BannerLayout = ({ children }) => {
  return (
    <>
      <div>
        <FlexWrap>
          <Swiper
            modules={[Autoplay, Navigation, Pagination, A11y]}
            autoplay={{
              delay: 6500,
              disableOnInteraction: false,
            }}
            slidesPerView={3}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
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

  & .swiper-pagination-bullet-active {
    background-color: ${colors.color_white};
  }
`;
