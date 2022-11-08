import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
          <div className="icon">
            <FontAwesomeIcon icon={faUtensils} className="userIcon" />
          </div>
        </StyledLink>
        <p>해당 목록이 비어있습니다.</p>
      </div>
    </>
  );
};
export default NullRecipe;
export const StyledLink = styled.div`
  cursor: pointer;
  padding-top: 1em;
  color: ${(props) => props.theme.accentedColor};
  overflow: hidden;
  & :hover {
    color: #8d3232;
  }
  & .icon:hover {
    cursor: pointer;
    transition: all ease 1s;
    transform: rotate(360deg);
    padding: 2em;
  }
`;
