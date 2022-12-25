import { useRef } from "react";
import styled from "styled-components";
import { colors } from "../../../theme/theme";
import { ReactComponent as LandingShape3 } from "../../../assets/LandingShape3.svg";
import { ReactComponent as LandingShape4 } from "../../../assets/LandingShape4.svg";
import BestRecipe from "../bestRecipe";
const LandingCp5 = () => {
  const section5 = useRef();

  return (
    <>
      <TotalWrap ref={section5}>
        <div className="sectionTitleWrap">
          <LandingShape3
            style={{
              zIndex: "0",
              width: "60vh",
              height: "40vh",
              viewBox: "100vh",
            }}
          ></LandingShape3>
          <div
            style={{
              transform: "translateX(3vw) translateY(-36vh)",
            }}
          >
            BEST RECIPE! 우리들이 눈여겨본 레시피!
          </div>{" "}
        </div>{" "}
        <BestRecipe />
        <LandingShape4
          style={{
            zIndex: "0",
            width: "30vw",
            height: "60vh",
            right: "0",
            float: "right",
            transform: "translateY(-60%)",
            opacity: 0.8,
          }}
        ></LandingShape4>
      </TotalWrap>
    </>
  );
};
export default LandingCp5;
const TotalWrap = styled.div`
  background-color: ${colors.color_milktea_brown};
  width: 100%;
  height: 112vh;
  overflow: hidden;

  & .sectionTitleWrap {
    font-size: 2vw;
    width: 100%;
    height: 6vh;
    color: ${colors.color_greyish_white};
  }
`;
