import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "@theme/theme";
import SpinningFork from "@commonCp/animatedItems";

const NullRecipe = () => {
  const navigate = useNavigate();

  const createRecipe = () => {
    navigate("/recipe/create");
  };

  return (
    <>
      <div
        className="memberInfo center"
        style={{ display: "block" }}
        onClick={createRecipe}
      >
        <StyledLink>
          <SpinningFork />
          <div>해당 목록이 비어있습니다.</div>
        </StyledLink>
      </div>
    </>
  );
};
export default NullRecipe;
export const StyledLink = styled.div`
  padding-top: 1em;
  color: ${colors.color_gray_red};
  & div {
    margin: 1em;
    text-align: center;
  }
`;
