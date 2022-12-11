import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../theme/theme";
import BasicSpinner from "../../_common/loading";
const RecipeList = ({ recipeState }) => {
  const navigate = useNavigate();

  const onClickRecipe = () => {
    navigate(`/recipe/search/details/${recipeState.recipe_num}`);
  };

  return (
    <>
      {" "}
      <RecipeWrap>
        <div>
          <ItemWrap onClick={onClickRecipe}>
            <div>
              <div>
                <img
                  src={recipeState.recipe_rpath}
                  alt={recipeState.recipe_rpath}
                />
              </div>
            </div>
            <div className="titleWrap">
              {recipeState.recipe_title.length < 35 ? (
                <>{recipeState.recipe_title}</>
              ) : (
                <>{recipeState.recipe_title.substring(0, 35) + "..."}</>
              )}
            </div>
            <div className="flexBox">
              <div className="infoWrap"> {recipeState.information_level}</div>
              <div className="infoTimeWrap">{recipeState.information_time}</div>
            </div>
          </ItemWrap>
        </div>
      </RecipeWrap>
    </>
  );
};

const RecipeWrap = styled.div`
  padding: 1em;
  display: inline-flex;
  border-radius: 1vw;
  /* height: 100%; */
  font-size: 1vw;
  background-color: ${colors.color_white};
  height: 50vh;
  margin: 1vw;
`;
const ItemWrap = styled.div`
  cursor: pointer;

  min-width: 13%;
  height: 96%;
  margin: 0;

  display: inline-flex;
  justify-content: space-evenly;
  flex-direction: column;

  & div {
    overflow-y: hidden;
    overflow-x: hidden;
    max-width: 14em;
    max-height: 12em;
  }
  & div img {
    border-radius: 1vw 1vw 0 0;
    width: 14em;
    height: 12em;
  }

  & .titleWrap {
    margin: 3vh 0;
    min-height: 3em;
  }

  & .flexBox {
    display: inline-flex;
  }

  & .infoWrap {
    border: 1px solid ${colors.color_black};
    width: 50%;
    border-right: transparent;
    border-radius: 1vw 0 0 1vw;
    text-align: center;
    height: 4vh;
    padding: 0.5vh 1vw;
  }

  & .infoTimeWrap {
    border: 1px solid ${colors.color_black};
    width: 50%;
    height: 4vh;
    /* padding: 1vh; */
    padding: 0.5vh 1vw;
    border-radius: 0 1vw 1vw 0;
    text-align: center;
  }
`;

export default RecipeList;
