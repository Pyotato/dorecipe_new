import styled from "styled-components";
import {
  borderRadii,
  colors,
  imgSizes,
  inputSizes,
  margins,
  paddings,
} from "../../theme/theme";

export const TotalWrap = styled.div`
  height: 100vh;
  background-image: url("/img/joinBackgroundImg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  padding: ${paddings.padding_uuuul} 0;

  & h1 {
    text-align: center;
    padding-bottom: ${paddings.padding_uul};
    color: ${colors.color_white};
  }

  & .flexRight {
    min-width: 27em;
  }
  & .flexLeft {
    min-width: 27em;
  }

  & .profileImg:hover {
    opacity: 30%;
    cursor: pointer;
  }
  & .profileImg {
    width: ${imgSizes.img_size_lg};
    height: ${imgSizes.img_size_lg};
    border-radius: ${borderRadii.radius_circle};
  }

  & .previewWrap {
    width: ${imgSizes.img_size_lg};
    margin: 0 auto;
    padding: ${paddings.padding_xl} 0;
  }

  & .removeFile {
    fill: ${colors.color_carrot_orange};
  }
  & .removeFile:hover {
    cursor: pointer;
  }
  & .form {
    height: fit-content;
  }

  & .selectMnth {
    display: inline-block;

    width: ${inputSizes.inputSize_tiny};
    margin: 0 ${margins.margin_base};
  }

  & .formWrap {
    background-color: ${colors.color_white};
    width: 65vw;
    min-width: 30em;
    margin: 0 auto;
  }

  & .fontSize1vw {
    font-size: 1vw;
  }
  & .fontSize0_5vw {
    font-size: 0.5vw;
  }
  & .flexitems {
    display: inline-flex;
    width: 100%;
    padding: 0 ${paddings.padding_uul};
    padding-bottom: ${paddings.padding_xxxl};
    align-items: stretch;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  & .selectSex {
    width: ${inputSizes.inputSize_xxxl};
  }

  & select {
    padding: 0.2vw;
    width: ${inputSizes.inputSize_xxl};
    margin-left: 1vw;
    border: 1px solid transparent;
    background-color: ${colors.color_pinkish_beige};
  }

  & input {
    width: ${inputSizes.inputSize_xxxl};
    border: 1px solid transparent;
    background-color: ${colors.color_pinkish_beige};
    padding: 0.2vw;
    margin-left: 1vw;
  }

  & .dayInput {
    display: inline-block;
    width: ${inputSizes.inputSize_xTiny};
    margin: 0 ${margins.margin_base};
  }
  & .inputYr {
    display: inline-block;
    width: ${inputSizes.inputSize_small};
    margin: 0 ${margins.margin_base};
  }

  & .formLabels {
    display: inline-block;
    margin-right: ${margins.margin_base};
  }

  & .flexFormItems {
    padding: 1vh 0;
  }
  & .floatRight {
    float: right;
  }

  & .hover:hover {
    cursor: pointer;
  }
`;
export const SubmitBtn = styled.div`
  width: 65vw;
  min-width: 30em;
  margin: 0 auto;
  background-color: ${colors.color_beige_brown};
  height: 9vh;
  text-align: center;
  padding: 3vh 0;

  &:hover {
    cursor: pointer;
    background-color: ${colors.color_carrot_orange};
    color: ${colors.color_beige_white};
  }
`;
export const WarningMsg = styled.div`
  display: inline-block;
  color: ${colors.color_gray_red3};
  font-size: smaller;
  font-weight: 400;
`;
