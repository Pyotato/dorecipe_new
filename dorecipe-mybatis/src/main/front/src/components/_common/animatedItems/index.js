import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { colors, fontSizes } from "../../../theme/theme";

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
    animation-duration: 360ms;
    animation-delay: 90ms;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    cursor: pointer;
  }

  @keyframes fork-spin {
    from {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
      color: ${colors.color_carrot_orange};
    }
  }
`;
