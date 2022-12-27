import { useRef } from "react";
import styled from "styled-components";
import { colors } from "@theme/theme";
import { ReactComponent as ForkSpoonKnife } from "@assets/ForkSpoonKnife.svg";
import { ReactComponent as MusicNote } from "@assets/MusicNote.svg";
import { ReactComponent as ArrowRight } from "@assets/ArrowRight.svg";
const LandingCp4 = () => {
  const section4 = useRef();
  return (
    <>
      <TotalWrap ref={section4}>
        <div className="topFlex">
          <div style={{ width: "80%", marginLeft: "6vw" }} className="fonts2vw">
            <div>요리 왕초보라면 </div>
            <div className="flexItems">
              도
              <MusicNote
                style={{
                  width: "2vw",
                  height: "4vh",
                  fill: colors.color_brown,
                }}
              />
              레시피가 추천하는
            </div>
            <div>밀키트로 가볍게 도전! </div>
          </div>
          <img
            src="/img/landingImg4.png"
            alt="밀키트 광고 이미지"
            style={{ width: "30vw", height: "100%" }}
          />
        </div>
        <div className="btmFlex">
          <img
            style={{ width: "50vw" }}
            src="/img/landingImg5.png"
            alt="밀키트 광고 이미지2"
          />
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

  & .textTotalWrap {
    display: inline-flex;
    position: absolute;
    margin-top: 30vh;
    width: 100%;
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
    width: 100%;
    padding: 4vh 0;
    background-color: ${colors.color_beige_brown};
  }
`;
