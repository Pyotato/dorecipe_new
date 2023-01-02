import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "@theme/theme";
import { ReactComponent as MusicNote } from "@assets/MusicNote.svg";
import { ReactComponent as ArrowRight } from "@assets/ArrowRight.svg";
import { ReactComponent as LandingImg4 } from "@assets/LandingImg4.svg";
import { ReactComponent as Rectangle } from "@assets/Rectangle2.svg";
import { useMediaQuery } from "react-responsive";
import { imgSizes } from "../../../theme/theme";
const LandingCp2 = ({ userState }) => {
  const section2 = useRef();
  const isMobile = useMediaQuery({ query: "(max-width:767px)" });
  const navigate = useNavigate();
  return (
    <>
      <TotalWrap ref={section2}>
        {" "}
        <div className="goCreateRecipeWrap">
          {" "}
          {isMobile ? (
            <Rectangle className="rectangleShape rectangleShapeMobile" />
          ) : (
            <Rectangle className="rectangleShape" />
          )}
          <div className="textWrap">
            {" "}
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
          </div>{" "}
          {isMobile ? (
            <LandingImg4
              className="landingImg4"
              style={{
                zIndex: "600",
                width: imgSizes.img_size_uuul,
                float: "right",
                height: "32em",
                transform: " translateY(-50%)",
              }}
            />
          ) : (
            <LandingImg4
              className="landingImg4"
              style={{
                zIndex: "600",
                width: "50vw",
                float: "right",
                height: "32em",
                transform: " translateY(-60%)",
              }}
            />
          )}
        </div>
      </TotalWrap>
    </>
  );
};
export default LandingCp2;
const TotalWrap = styled.div`
  background-color: ${colors.color_beige_tinted_white};
  width: 100%;
  height: 100vh;
  overflow: hidden;
  & .textWrap {
    width: 55vw;
    font-size: 1.5vw;
    transform: translateX(4vw) translateY(-10%);
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
    height: 30vh;
  }

  & .hoverEffect:hover {
    color: ${colors.color_carrot_orange};
    cursor: pointer;
    stroke: ${colors.color_carrot_orange};
  }

  & .musicNoteWrap {
    width: 1.5vw;
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
  & .rectangleShapeMobile {
    transform: translate(-40%, -100%);
    height: ${imgSizes.img_size_base};
  }
`;
