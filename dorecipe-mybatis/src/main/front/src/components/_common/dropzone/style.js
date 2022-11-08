import styled from "styled-components";

export const EditImgPreview = styled.section`
  width: 100%;
  border: 1px solid ${(props) => props.theme.mainColor};
  border-radius: 0.5rem;
  font-size: 2rem;
  cursor: pointer;
  max-height: 18em;
  min-height: 6em;

  padding: 3rem;
  & > .inputBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;

    & > p {
      font-size: 0.625rem;
      color: #999;
    }
  }
`;

export const EditImgPreviewForm = styled.div`
  padding: 0.3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const EditImgPreviewInner = styled.div`
  max-width: 15em;
  max-height: 15em;
  z-index: 9999;
  margin: 0.2rem;

  :hover {
    opacity: 0.5;
  }

  & > .fileBox {
    position: relative;
    width: 100%;
    height: 100%;

    & > img {
      max-width: 12em;
      max-height: 12em;
      padding: 1em;
    }

    & > p {
      font-size: 1rem;
      color: #8d3232;
      text-align: center;
      width: 100%;
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
