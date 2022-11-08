import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const RecipeList = ({ recipeState }) => {
  const navigate = useNavigate();

  const onClickRecipe = () => {
    navigate(`/recipe/search/details/${recipeState.recipe_num}`);
  };

  return (
    <>
      {" "}
      <RecipeWrap>
        <>
          <ItemWrap onClick={onClickRecipe}>
            <div>
              <>
                <img
                  src={recipeState.recipe_rpath}
                  alt={recipeState.recipe_rpath}
                />
              </>
            </div>
            <div>
              {recipeState.recipe_title.length < 35 ? (
                <>{recipeState.recipe_title}</>
              ) : (
                <>{recipeState.recipe_title.substring(0, 35) + "..."}</>
              )}
            </div>
            <div>
              <span>{recipeState.information_level}</span>
              <span className="floatRight">{recipeState.information_time}</span>
            </div>
          </ItemWrap>
        </>
      </RecipeWrap>
    </>
  );
};

const RecipeWrap = styled.div`
  padding: 1em;
  display: inline-flex;
`;
const ItemWrap = styled.div`
  display: inline-flex;
  cursor: pointer;
  min-width: 13%;
  margin: 0;
  flex-direction: column;
  & div {
    overflow-y: hidden;
    overflow-x: hidden;
    max-width: 16em;
    max-height: 12em;
  }
  & div img {
    width: 16em;
    height: 12em;
  }
  & floatRight {
    float: right;
  }
`;

export default RecipeList;
