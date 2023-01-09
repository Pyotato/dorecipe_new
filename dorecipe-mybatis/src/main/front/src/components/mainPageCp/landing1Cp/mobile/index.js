import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeaderSearch from "@layout/mainLayOut/header/search";
import styled from "styled-components";
import { colors, fontSizes, margins } from "@theme/theme";

const MobileCp1 = () => {
  const section1 = useRef();
  const navigate = useNavigate();

  return (
    <>
      <TotalWrap ref={section1}>
        <ImgWrap>
          <img src="/img/landingImg1.png" alt="음식이미지1" />
        </ImgWrap>

        <div className="logoSection">
          <div className="quickAccessTotalWrap">
            |{" "}
            <div className="quickAccessWrap">
              <span
                onClick={() => navigate("/recipes/search")}
                className="hoverEffect"
              >
                레시피 상세 검색
              </span>{" "}
            </div>
            |{" "}
            <div className="quickAccessWrap">
              <span
                className="hoverEffect"
                onClick={() => navigate("/notice/list")}
              >
                공지사항
              </span>{" "}
            </div>
            |{" "}
            <div className="quickAccessWrap">
              <span
                className="hoverEffect"
                onClick={() => navigate("/event/list")}
              >
                이벤트
              </span>{" "}
            </div>
            |{" "}
          </div>

          <div>
            <HeaderSearch />
          </div>
        </div>
      </TotalWrap>
    </>
  );
};
export default MobileCp1;
const TotalWrap = styled.div`
  background-color: ${colors.color_greyish_beige_brown};
  width: 100%;
  height: 100vh;
  flex-direction: column;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: ${fontSizes.fontSize_base};

  & .logoSection {
    width: 100%;
    height: 20%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  & .quickAccessTotalWrap {
    margin: ${margins.margin_lg} 0;
    font-size: 1vw;
    display: inline-flex;
    gap: 1vw;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  & .quickAccessWrap {
    min-width: 5vw;
    text-align: center;
  }
`;
const ImgWrap = styled.div`
  width: 100%;
  height: 80%;
  overflow: hidden;
  & img {
    height: 100%;
  }
`;
