import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "@theme/theme";
import { ReactComponent as LandingShape2 } from "@assets/LandingShape2.svg";
import { ReactComponent as LandingShape1 } from "@assets/LandingShape1.svg";
import { ReactComponent as MusicNote } from "@assets/MusicNote.svg";
import { ReactComponent as ArrowRight } from "@assets/ArrowRight.svg";
import { useMediaQuery } from "react-responsive";
import {
  device,
  deviceSizes,
  fontSizes,
  imgSizes,
  margins,
  paddings,
} from "../../../theme/theme";
const LandingCp3 = () => {
  const section3 = useRef();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: device.device_tablet });
  // const isMobile = useMediaQuery({ query: "(max-width:767px)" });
  // const device_tablet = useMediaQuery({ query: device.device_mobileL });
  return (
    <>
      <TotalWrap ref={section3}>
        {isMobile ? (
          <>
            {/* <div
              style={{
                width: "18rem",
                zIndex: "0",
                height: "100%",
                transform: "translateY(-12%)",
              }}
            >
              <LandingShape1 />
            </div> */}
          </>
        ) : (
          <>
            <div
              style={{
                display: "inline-flex",
                width: "100%",
                zIndex: "0",
                height: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8em",
              }}
            >
              <div style={{ width: "27rem" }}>
                <LandingShape1 />
              </div>
              <div style={{ width: "27rem" }}>
                <LandingShape2 />
              </div>
            </div>
          </>
        )}
        {isMobile ? (
          <div style={{ transform: "translateY(50%)", height: "50vh" }}>
            {/* <div style={{ transform: "translateY(-150%)", height: "50vh" }}> */}
            <div
              style={{
                width: "100%",
                // height: "10em",
                display: "inline-flex",
                alignItems: "center",
                overflow: "hidden",
                transform: "translateY(5%)",
              }}
            >
              <div style={{ width: "33.3%", overflow: "hidden" }}>
                <img
                  src="/img/landingImg(1).png"
                  alt="음식이미지2"
                  style={{ width: "100%", overflow: "hidden" }}
                  // style={{ height: "12em", width: "100%" }}
                  //
                />
              </div>
              <div style={{ width: "33.3%", overflow: "hidden" }}>
                <img
                  src="/img/landingImg(2).png"
                  alt="음식이미지2"
                  // style={{ height: "12em", width: "100%" }}
                  style={{ width: "100%", overflow: "hidden" }}
                  // style={{ width: "50%" }}
                />
              </div>
              <div style={{ width: "33.3%", overflow: "hidden" }}>
                <img
                  src="/img/landingImg(3).jpg"
                  // className="imgSize"
                  style={{ width: "100%", overflow: "hidden" }}
                  // style={{ height: "12em", width: "100%" }}
                  alt="음식이미지3"
                />
              </div>
            </div>

            <div
              style={{
                width: "100%",

                // display: "inline-flex",
                // alignItems: "center",
                // height: "50%",

                // overflow: "hidden",
              }}
            >
              {/* <div > */}
              <div className="isMobileWrap">
                <div>외식,배달 음식으로 떼운 끼니를</div>
                <div>우리들의 레시피로</div>
                <div className="flexItems">
                  건강하고 재밌는 식탁으로{" "}
                  <MusicNote
                    style={{
                      width: "1em",
                      // height: "4vh",
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
                {/* </div> */}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="textTotalWrap"
            style={{ transform: "translateX(-100%)" }}
          >
            <img
              src="/img/landingImg2.jpg"
              style={{ width: "45%" }}
              alt="음식이미지2"
            />
            <div className="linkWrap">
              <div className="fonts1_5em">외식,배달 음식으로 떼운 끼니를</div>
              <div className="fonts1_5em">우리들의 레시피로</div>
              <div className="fonts1_5em flexItems">
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
            <img
              src="/img/landingImg3.jpg"
              className="imgSize"
              alt="음식이미지3"
            />
          </div>
        )}
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
  & .isMobileWrap {
    background-color: ${colors.color_beige_white};
    /* width: 50%; */
    font-size: ${fontSizes.fontSize_small};
    padding: ${paddings.padding_base};
    height: 100%;
    & > div {
      padding-bottom: ${paddings.padding_base};
    }
  }

  & .textTotalWrap {
    display: inline-flex;
    position: absolute;
    margin-top: 30vh;
    width: 100%;
  }
  & .linkWrap {
    background-color: ${colors.color_beige_white};
    width: 35%;
    padding: ${paddings.padding_ul};
    /* height: 40vh; */

    & > div {
      padding-bottom: ${paddings.padding_base};
    }
  }

  & .hoverEffect:hover {
    color: ${colors.color_carrot_orange};
    cursor: pointer;
    stroke: ${colors.color_carrot_orange};
  }

  & .imgWrap {
    height: 100vh;
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
  }

  & .imgSize {
    /* height: 40vh; */
    width: 20%;
    overflow-x: hidden;
  }
`;
