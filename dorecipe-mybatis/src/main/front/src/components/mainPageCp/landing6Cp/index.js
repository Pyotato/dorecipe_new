import { useRef } from "react";
import styled from "styled-components";
import { colors } from "@theme/theme";
import KnowhowMain from "../knowhow";
const LandingCp6 = () => {
  const section6 = useRef();
  return (
    <>
      <TotalWrap className="knowhow" ref={section6}>
        <div className="sectionTitleWrap">
          <div className="fonSize2vw" style={{}}>
            생활 쏙! 노하우
          </div>
          <div className="fonSize1vw">홈쿠킹 고수들이 전하는 꿀팁!</div>
        </div>
        <KnowhowMain />
      </TotalWrap>
    </>
  );
};
export default LandingCp6;
const TotalWrap = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;

  & .sectionTitleWrap {
    width: 42vw;
    height: 20vh;
    z-index: 300;
    align-items: center;
    display: inline-flex;
    background-color: ${colors.color_yellow_brown};
    box-shadow: 2vw 2vh ${colors.color_yellow_beige_shadow};
  }

  & .fonSize2vw {
    font-size: 2vw;
    width: 100%;
    color: ${colors.color_milky_white};
    text-align: center;
  }
  & .fonSize1vw {
    font-size: 1vw;
    width: 100%;
    color: ${colors.color_milky_white};
  }
  & .swiper-button-next {
    color: ${colors.color_milktea_brown};
  }
  & .swiper-button-prev {
    color: ${colors.color_milktea_brown};
  }
`;
