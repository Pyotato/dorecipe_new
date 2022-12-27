import styled from "styled-components";
import { colors, fontSizes } from "@theme/theme";
import { paddings } from "../../../theme/theme";
const BasicSpinner = ({ displayState }) => {
  return (
    <SpinnerWrap>
      <Spinner className="loader"></Spinner>
      <div style={{ display: displayState }} className="alt">
        Loading...
      </div>
    </SpinnerWrap>
  );
};

export default BasicSpinner;
const SpinnerWrap = styled.div`
  margin: 0 auto;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  column-gap: 1em;
  & .alt {
    width: 100%;
    padding-top: ${paddings.padding_base};
    text-align: center;
  }
`;

const Spinner = styled.div`
  & {
    border: 8px solid ${colors.color_milky_white};
    border-top: 8px solid ${colors.color_carrot_orange};
    border-radius: 50%;
    width: ${fontSizes.fontSize_xxxl};
    height: ${fontSizes.fontSize_xxxl};

    animation: spin 1s linear infinite;
  }
  & .loader {
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
