import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "@theme/theme";
import { ReactComponent as MusicNote } from "@assets/MusicNote.svg";
import { ReactComponent as ArrowRight } from "@assets/ArrowRight.svg";
import { ReactComponent as LandingImg4 } from "@assets/LandingImg4.svg";

import { fontSizes, paddings } from "@theme/theme";

const MobileCp2 = ({ userState }) => {
  const section2 = useRef();

  const navigate = useNavigate();
  return (
    <>
      <TotalWrap ref={section2}>
        <div className="totalFlexWrap">
          <LandingImg4 className="landingImg4" />

          <div className="mobileText">
            <div>
              <div className="flexWrap">
                <div>나만 알고 있는 </div>
                <div>집밥 레시피랑 요리팁을</div>
              </div>

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
          </div>
        </div>
      </TotalWrap>
    </>
  );
};
export default MobileCp2;
const TotalWrap = styled.div`
  background-color: ${colors.color_beige_tinted_white};
  width: 100%;
  height: 100vh;
  overflow: hidden;

  & .totalFlexWrap {
    display: inline-flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  & .mobileText {
    font-size: ${fontSizes.fontSize_small};
    padding: ${paddings.padding_xxl} ${paddings.padding_ul};
    background-color: ${colors.color_beige_white};
    align-items: center;
    width: 100%;
    height: 30%;
    display: inline-flex;

    & .flexWrap {
      padding-bottom: ${paddings.padding_small};
      flex-wrap: wrap;
    }

    & svg {
      width: 1em;
    }
  }

  & .landingImg4 {
    padding: ${paddings.padding_ul} ${paddings.padding_xxl};
    height: 70%;
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

  & .isMobile {
    z-index: 0;
    height: 50vh;
    padding: ${paddings.padding_xxl};
  }
`;
