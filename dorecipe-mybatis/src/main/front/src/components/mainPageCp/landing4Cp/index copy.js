import { useRef } from "react";
import styled from "styled-components";
import { colors } from "@theme/theme";
import { ReactComponent as ForkSpoonKnife } from "@assets/ForkSpoonKnife.svg";
import { ReactComponent as MusicNote } from "@assets/MusicNote.svg";
import { ReactComponent as ArrowRight } from "@assets/ArrowRight.svg";
import { ReactComponent as MainMealKitAd1 } from "@assets/MainMealKitAd1.svg";
// import { ReactComponent as MainMealKitAd1 } from "@assets/MealKit1.svg";
import { ReactComponent as MainMealKitAd2 } from "@assets/MainMealKitAd2.svg";
import { ReactComponent as MainMealKitAd3 } from "@assets/MainMealKitAd3.svg";
import { ReactComponent as MainMealKitAd4 } from "@assets/MainMealKitAd4.svg";
import { useMediaQuery } from "react-responsive";
import { device, margins } from "../../../theme/theme";
const LandingCp4 = () => {
  const section4 = useRef();
  const isMobile = useMediaQuery({ query: device.device_tablet });
  return (
    <>
      <TotalWrap ref={section4}>
        <div className="topFlex">
          {isMobile ? (
            <div className="fonts2vw topWrapMobile">
              <div>요리 왕초보라면 </div>
              <div className="flexItems">
                도
                <MusicNote className="musicNote" />
                레시피가 추천하는
              </div>
              <div>밀키트로 가볍게 도전! </div>
              <div
                className="flexItems hoverEffect"
                style={{ marginTop: "2em" }}
              >
                <div>더 많은 밀키트 보러가기</div>
                <ArrowRight></ArrowRight>
              </div>
            </div>
          ) : (
            <div className="fonts2vw topWrap">
              <div>요리 왕초보라면 </div>
              <div className="flexItems">
                도
                <MusicNote className="musicNote" />
                레시피가 추천하는
              </div>
              <div>밀키트로 가볍게 도전! </div>
            </div>
          )}
          {isMobile ? (
            <div style={{ width: "50%" }}>
              <img
                src="/img/landingImg4.png"
                alt="밀키트 광고 이미지"
                style={{ width: "100%" }}
              />
            </div>
          ) : (
            <img
              src="/img/landingImg4.png"
              alt="밀키트 광고 이미지"
              style={{ width: "30vw", height: "100%" }}
            />
          )}
        </div>

        {isMobile ? (
          <div style={{ width: "100%" }}>
            {/* <div style={{ width: "33.3%" }}>
              <MainMealKitAd1 />
            </div>
            <div style={{ width: "33.3%" }}>
              <MainMealKitAd2 />
            </div> */}

            {/* <img
              style={{ width: "100%" }}
              // style={{ height: "100%" }}
              src="/img/landingImg5.png"
              alt="밀키트 광고 이미지2"
            />{" "} */}
          </div>
        ) : (
          <div className="btmFlex">
            <div style={{ width: "33.3%" }}>
              <MainMealKitAd1 />
            </div>
            <div style={{ width: "33.3%" }}>
              <MainMealKitAd2 />
            </div>
            <div style={{ width: "33.3%" }}>
              <div className="txtAlignCntr">
                <ForkSpoonKnife
                  style={{
                    fill: colors.color_brown,
                    width: "9vw",
                    height: "9vh",
                    marginTop: "10%",
                  }}
                />

                <div
                  style={{
                    width: "100%",
                    marginTop: "3vh",
                  }}
                  className="flexItems hoverEffect fonts2vw"
                >
                  <div>더 많은 밀키트 보러가기</div>
                  <ArrowRight></ArrowRight>
                </div>
              </div>
            </div>

            {/* <img
              style={{ width: "67%" }}
              src="/img/landingImg5.png"
              alt="밀키트 광고 이미지2"
            /> */}
            {/* <div className="txtAlignCntr">
              <ForkSpoonKnife
                style={{
                  fill: colors.color_brown,
                  width: "9vw",
                  height: "9vh",
                  marginTop: "10%",
                }}
              />

              <div
                style={{
                  width: "100%",
                  marginTop: "3vh",
                }}
                className="flexItems hoverEffect fonts2vw"
              >
                <div>더 많은 밀키트 보러가기</div>
                <ArrowRight></ArrowRight>
              </div>
            </div> */}
          </div>
        )}
      </TotalWrap>
    </>
  );
};
export default LandingCp4;
const TotalWrap = styled.div`
  background-color: ${colors.color_beige_white};
  width: 100%;
  height: 100vh;
  overflow: hidden;
  & .musicNote {
    width: 2vw;
    height: 4vh;
    fill: ${colors.color_brown};
  }
  & .textTotalWrap {
    display: inline-flex;
    position: absolute;
    margin-top: 30vh;
    width: 100%;
  }

  & .topWrap {
    width: 30%;
    margin-left: ${margins.margin_uuul};
  }
  & .topWrapMobile {
    width: 30%;
    margin-left: ${margins.margin_uul};
  }
  & .hoverEffect:hover {
    color: ${colors.color_carrot_orange};
    cursor: pointer;
    stroke: ${colors.color_carrot_orange};
  }

  & .fonts2vw {
    font-size: 2vw;
  }

  & .flexItems {
    display: inline-flex;
    align-items: center;
    gap: 0.2em;
    justify-content: center;
  }
  & .topFlex {
    display: inline-flex;
    align-items: center;
    width: 100%;
    height: 50%;
    justify-content: space-between;
  }
  & .btmFlex {
    display: inline-flex;
    width: 100%;
    height: 50%;
  }

  & .txtAlignCntr {
    text-align: center;
    /* width: 100%; */
    padding: 4vh 0;
    background-color: ${colors.color_beige_brown};
  }
`;
