import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { colors, fontSizes } from "@theme/theme";

const SpinningFork = () => {
  return (
    <Wrap>
      <FontAwesomeIcon icon={faUtensils} className="userIcon" />
    </Wrap>
  );
};
export default SpinningFork;
const Wrap = styled.div`
  color: ${colors.color_gray_red};
  & .userIcon {
    font-size: ${fontSizes.fontSize_titleSize};
  }
  & .userIcon:hover {
    animation-name: "fork-spin";
    animation-duration: 700ms;
    animation-delay: 90ms;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    cursor: pointer;
  }

  @keyframes fork-spin {
    0% {
      transform: rotate(0deg);
    }
    50% {
      color: ${colors.color_carrot_orange};
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
