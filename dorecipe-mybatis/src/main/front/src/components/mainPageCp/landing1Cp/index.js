import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeaderSearch from "../../../layout/mainLayOut/header/search";
import { LogoOnLandingPage } from "../../_common/logo";
import styled from "styled-components";
import { colors } from "../../../theme/theme";

const LandingCp1 = () => {
  const section1 = useRef();
  const navigate = useNavigate();
  return (
    <>
      <TotalWrap ref={section1}>
        <div className="logoSection">
          <LogoOnLandingPage />
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
        <div className="imgWrap">
          <img
            src="/img/landingImg1.png"
            className="landingImgWrap"
            alt="음식이미지1"
          />
        </div>
      </TotalWrap>
    </>
  );
};
export default LandingCp1;
const TotalWrap = styled.div`
  background-color: ${colors.color_greyish_beige_brown};
  width: 100%;
  height: 100vh;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  & .logoSection {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  & .quickAccessTotalWrap {
    margin: 5vh 0;
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

  & .hoverEffect:hover {
    color: ${colors.color_carrot_orange};
    cursor: pointer;
  }

  & .imgWrap {
    height: 100vh;
  }

  & .landingImgWrap {
    width: 50vw;
    height: 100vh;
  }
`;
