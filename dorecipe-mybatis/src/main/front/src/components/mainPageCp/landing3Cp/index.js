import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../theme/theme";
import { ReactComponent as LandingShape2 } from "../../../assets/LandingShape2.svg";
import { ReactComponent as LandingShape1 } from "../../../assets/LandingShape1.svg";
import { ReactComponent as MusicNote } from "../../../assets/MusicNote.svg";
import { ReactComponent as ArrowRight } from "../../../assets/ArrowRight.svg";
const LandingCp3 = () => {
  const section3 = useRef();
  const navigate = useNavigate();
  return (
    <>
      <TotalWrap ref={section3}>
        <LandingShape2
          style={{
            width: "30%",
            position: "absolute",
            right: "0",
          }}
        />
        <LandingShape1
          style={{
            width: "30vw",
            height: "100vh",
            position: "absolute",
            left: "0",
          }}
        />
        <div className="textTotalWrap">
          <img
            src="/img/landingImg2.jpg"
            style={{ height: "40vh", width: "40vw" }}
            alt="음식이미지2"
          />
          <div className="linkWrap">
            <div
              style={{
                zIndex: "720",
                padding: "6vh 6vw",
              }}
            >
              <div className="fonts1_5vw">외식,배달 음식으로 떼운 끼니를</div>
              <div className="fonts1_5vw">우리들의 레시피로</div>
              <div className="fonts1_5vw flexItems">
                건강하고 재밌는 식탁으로{" "}
                <MusicNote
                  style={{
                    width: "1.5vw",
                    height: "4vh",
                    fill: colors.color_brown,
                  }}
                />
              </div>
              <div
                onClick={() => {
                  navigate("/recipes/search");
                }}
                className="hoverEffect fonts2vw flexItems"
              >
                더 많은 레시피 보러가기
                <ArrowRight className="hoverEffect"></ArrowRight>
              </div>
            </div>
          </div>
          <img
            src="/img/landingImg3.jpg"
            className="imgSize"
            alt="음식이미지3"
          />
        </div>
      </TotalWrap>
    </>
  );
};
export default LandingCp3;
const TotalWrap = styled.div`
  background-color: ${colors.color_pinkish_beige};
  width: 100%;
  height: 100vh;
  overflow: hidden;

  & .textTotalWrap {
    display: inline-flex;
    position: absolute;
    margin-top: 30vh;
    width: 100%;
  }
  & .linkWrap {
    background-color: ${colors.color_beige_white};
    width: 60%;
    height: 40vh;
  }

  & .hoverEffect:hover {
    color: ${colors.color_carrot_orange};
    cursor: pointer;
    stroke: ${colors.color_carrot_orange};
  }

  & .imgWrap {
    height: 100vh;
    background-color: red;
  }
  & .fonts1_5vw {
    font-size: 1.5vw;
  }
  & .fonts2vw {
    margin-top: 2vh;
    font-size: 2vw;
  }

  & .flexItems {
    display: inline-flex;
    align-items: center;
    gap: 0.2em;
  }

  & .imgSize {
    height: 40vh;
    width: 40vw;
    overflow-x: hidden;
  }
`;
