import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "@theme/theme";
import { ReactComponent as LandingShape2 } from "@assets/LandingShape2.svg";
import { ReactComponent as LandingShape1 } from "@assets/LandingShape1.svg";
import { ReactComponent as MusicNote } from "@assets/MusicNote.svg";
import { ReactComponent as ArrowRight } from "@assets/ArrowRight.svg";
import { fontSizes, paddings } from "@theme/theme";
const DefaultCp3 = () => {
  const section3 = useRef();
  const navigate = useNavigate();

  return (
    <>
      <TotalWrap ref={section3}>
        <>
          <div className="inlineFlexWrap">
            <div>
              <LandingShape1 />
            </div>
            <div>
              <LandingShape2 />
            </div>
          </div>
        </>

        <div className="textTotalWrap">
          <img
            src="/img/landingImg2.jpg"
            style={{ width: "45%" }}
            alt="음식이미지2"
          />
          <div className="linkWrap">
            <div className="fonts1_5em  flexItems">
              <div>외식,배달 음식으로 </div>
              <div>떼운 끼니를</div>
            </div>
            <div className="fonts1_5em">우리들의 레시피로</div>
            <div className="fonts1_5em flexItems">
              <div>건강하고 재밌는 </div>
              <div className="flexItems" style={{ flexWrap: "nowrap" }}>
                식탁으로
                <MusicNote
                  style={{
                    width: "1.5vw",
                    height: "4vh",
                    fill: colors.color_brown,
                  }}
                />
              </div>
            </div>
            <div
              onClick={() => {
                navigate("/recipes/search");
              }}
              className="hoverEffect fonts2vw flexItems"
              style={{ flexWrap: "nowrap" }}
            >
              <div>더 많은 레시피 </div>
              <div>보러가기</div>

              <ArrowRight className="hoverEffect"></ArrowRight>
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
export default DefaultCp3;
const TotalWrap = styled.div`
  background-color: ${colors.color_pinkish_beige};
  width: 100%;
  height: 100vh;
  overflow: hidden;

  & .inlineFlexWrap {
    display: inline-flex;
    width: 100%;
    z-index: 0;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 8em;

    & svg {
      width: 27rem;
    }
  }

  & .textTotalWrap {
    display: inline-flex;
    position: absolute;
    margin-top: 30vh;
    width: 100%;
    transform: translateX(-100%);
    height: 18em;
  }
  & .linkWrap {
    background-color: ${colors.color_beige_white};
    width: 35%;
    padding: ${paddings.padding_ul};

    & > div {
      padding-bottom: ${paddings.padding_base};
    }
  }

  & .fonts1_5em {
    font-size: ${fontSizes.fontSize_lg};
  }
  & .fonts2vw {
    margin-top: 2vh;
    font-size: 2vw;
  }

  & .flexItems {
    display: inline-flex;
    align-items: center;
    gap: 0.2em;
    width: 100;
    flex-wrap: wrap;
  }

  & .imgSize {
    width: 20%;
    overflow-x: hidden;
  }
`;
