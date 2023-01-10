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
} from "@theme/theme";
const MobileCp3 = () => {
  const section3 = useRef();
  const navigate = useNavigate();
  // const isMobile = useMediaQuery({ query: device.device_tablet });

  return (
    <>
      <TotalWrap ref={section3}>
        <div className="topText">
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
        </div>
        <div className="flexTotalWrap">
          <img
            src="/img/landingImg(1).png"
            className="flexSize"
            alt="음식이미지2"
          />

          <img
            src="/img/landingImg(2).png"
            className="flexSize"
            alt="음식이미지2"
          />
        </div>
        <div className="flexTotalWrap">
          <img
            src="/img/landingImg(3).jpg"
            alt="음식이미지3"
            className="flexSize"
          />

          <div className="textWrap">
            <div
              onClick={() => {
                navigate("/recipes/search");
              }}
              className="hoverEffect flexItems"
            >
              <div>더 많은 레시피 </div>
              <div>보러가기 </div>{" "}
              <ArrowRight className="hoverEffect"></ArrowRight>
            </div>
          </div>
        </div>
      </TotalWrap>
    </>
  );
};
export default MobileCp3;
const TotalWrap = styled.div`
  background-color: ${colors.color_pinkish_beige};
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: ${paddings.padding_base};

  & .flexTotalWrap {
    width: 100%;
    overflow: hidden;
    background-color: ${colors.color_beige_white};
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
    font-size: ${fontSizes.fontSize_lg};
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

  & .flexItems {
    display: inline-flex;
    align-items: center;
    gap: 0.2em;
    flex-wrap: wrap;
    width: 100%;
    & div {
    }
  }

  & .imgSize {
    width: 20%;
  }

  & .flexSize {
    width: 50%;

    height: 100%;

    & img {
      height: 100%;
    }
  }

  & .textWrap {
    width: 50%;
    font-size: ${fontSizes.fontSize_xl};
    height: 50%;
    display: inline-block;
    padding-left: ${paddings.padding_base};
    transform: translateY(-100%);
    background-color: ${colors.color_beige_white};
  }
  & .topText {
    width: 100%;
    background-color: ${colors.color_beige_white};
    padding: ${paddings.padding_base} ${paddings.padding_ul};

    & div {
      padding-bottom: ${paddings.padding_base};
    }
  }
`;
