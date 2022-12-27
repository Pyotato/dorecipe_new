import styled from "styled-components";
import { colors } from "@theme/theme";

export const EditImgPreview = styled.section`
  width: 100%;
  border: 1px solid ${colors.color_milktea_brown};
  height: 46vh;
  border-radius: 0.5rem;
  font-size: 2rem;
  overflow-y: scroll;
  /* overflow-x: hidden; */
  cursor: pointer;
  ::-webkit-scrollbar {
    width: 0.2rem;
  }
  ::-webkit-scrollbar-thumb {
    height: 30%;
    background-color: ${colors.color_milktea_brown};
  }
  ::-webkit-scrollbar-track {
    background-color: ${colors.color_beige_white};
  }

  & .inputBox {
    width: 100%;
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;

    height: 45vh;

    & > p {
      font-size: 0.625rem;
      color: #999;
    }
  }
`;

export const EditImgPreviewForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const EditImgPreviewInner = styled.div`
  max-width: 15em;
  max-height: 15em;
  z-index: 9999;
  margin: 0.2rem;
  z-index: 100;

  & > .fileBox {
    max-width: 32vw;
    height: 100%;

    z-index: 100;

    & img {
      width: 100%;
      :hover {
        opacity: 0.5;
      }

      z-index: 100;
    }

    & > p {
      font-size: 1rem;
      text-align: center;
      width: 100%;
      font-size: 1.5vw;
      font-weight: 600;
      color: ${colors.color_carrot_orange};
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
    }
  }
`;
export const FlexibleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
