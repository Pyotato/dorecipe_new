import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "@theme/theme";
import { ReactComponent as MusicNote } from "@assets/MusicNote.svg";
import { ReactComponent as ArrowRight } from "@assets/ArrowRight.svg";
import { ReactComponent as LandingImg4 } from "@assets/LandingImg4.svg";
import { ReactComponent as Rectangle } from "@assets/Rectangle2.svg";

import { fontSizes, margins, paddings } from "@theme/theme";
const DefaultCp2 = ({ userState }) => {
  const section2 = useRef();

  const navigate = useNavigate();
  return (
    <>
      <TotalWrap ref={section2}>
        <div className="goCreateRecipeWrap">
          <Rectangle className="rectangleShape" />
          <div className="textWrap  isLaptop">
            <div>나만 알고 있는</div>
            <div>집밥 레시피랑 요리팁을</div>
            <div className="flexWrap">
              공유하고 싶다면
              <div className="musicNoteWrap">
                <MusicNote style={{ fill: colors.color_black_brown }} />
              </div>
            </div>
            <div>
              <div
                onClick={() => {
                  if (!userState.auth.isLoggedIn) {
                    navigate("/login");
                  } else {
                    navigate("/recipe/create");
                  }
                }}
                className="hoverEffect flexWrap"
              >
                레시피 공유하러 가기<ArrowRight></ArrowRight>
              </div>
            </div>
          </div>
          <LandingImg4 className="landingImg4 " />
        </div>
      </TotalWrap>
    </>
  );
};
export default DefaultCp2;
const TotalWrap = styled.div`
  background-color: ${colors.color_beige_tinted_white};
  width: 100%;
  height: 100vh;
  overflow: hidden;

  & .textWrap {
    height: 30%;
    font-size: ${fontSizes.fontSize_lg};

    & > div {
      padding-bottom: ${paddings.padding_base};
    }

    & svg {
      width: 1em;
    }
  }

  & .landingImg4 {
    top: -6em;
    right: 0;
    z-index: 600;
    width: 32em;
    height: 32em;
    position: absolute;
  }

  & .isLaptop {
    height: 100%;

    transform: translateY(-22%);
    padding: ${paddings.padding_ul};
  }

  & .goCreateRecipeWrap {
    background-color: ${colors.color_beige_white};
    width: 100%;
    position: absolute;
    top: 150%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    z-index: 600;
    height: 15em;
  }

  & .musicNoteWrap {
    display: inline-block;
    height: 4vh;
    fill: ${colors.color_beige_brown};
  }

  & .flexWrap {
    display: inline-flex;
    gap: 0.2em;
    align-items: center;
  }

  & .rectangleShape {
    transform: translateY(-100%);
  }
`;
