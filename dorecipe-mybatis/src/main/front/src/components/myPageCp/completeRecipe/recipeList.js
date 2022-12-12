import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../theme/theme";
import BasicSpinner from "../../_common/loading";
import { ReactComponent as RubbishBin } from ".././../../assets/RubbishBin.svg";

const CompleteList = ({
  completedRecipeState,
  recipeLength,
  setRecipeLength,
  loadingState,
}) => {
  const navigate = useNavigate();
  const [hoverBinState, setHoverBinState] = useState(0);
  const onClickRecipeDetails = () => {
    navigate(`/recipe/search/details/${completedRecipeState.recipe_num}`);
  };

  const deleteRecipe = () => {
    axios
      .get(
        "http://localhost:9000/recipe/delete/" + completedRecipeState.recipe_num
      )
      .then((result) => {
        console.log("result", result);
        setRecipeLength(recipeLength - 1);
      })
      .catch(() => {
        console.log("삭제실패");
      });
  };

  return (
    <>
      {/* 작성 완료한 레시피 */}

      <RecipeWrap>
        <div>
          <div className="binWrap">
            {hoverBinState === 0 ? (
              <div className="binWrap">
                <RubbishBin
                  onMouseOver={() => {
                    setHoverBinState(1);
                  }}
                  className="deleteRecipe"
                  onClick={() => deleteRecipe()}
                />
              </div>
            ) : (
              <div
                // className="binWrap"
                className="binWrap deleteRecipe"
                onMouseLeave={() => {
                  setHoverBinState(0);
                }}
                onClick={() => deleteRecipe()}
                style={{
                  transform: "translateY(-30%)",
                  margin: "1em 0 0.1em",
                }}
              >
                | 삭제 |
              </div>
            )}
          </div>
          <ItemWrap onClick={() => onClickRecipeDetails()}>
            <div>
              <div>
                {loadingState ? (
                  <BasicSpinner />
                ) : (
                  <img
                    src={completedRecipeState.recipe_rpath}
                    alt={completedRecipeState.recipe_rpath}
                  />
                )}
              </div>
            </div>
            <div className="titleWrap">
              {completedRecipeState.recipe_title.length < 35 ? (
                <>{completedRecipeState.recipe_title}</>
              ) : (
                <>
                  {completedRecipeState.recipe_title.substring(0, 35) + "..."}
                </>
              )}
            </div>
            <div className="flexBox">
              <div className="infoWrap">
                {" "}
                {completedRecipeState.information_level}
              </div>
              <div className="infoTimeWrap">
                {completedRecipeState.information_time}
              </div>
            </div>
          </ItemWrap>
        </div>
      </RecipeWrap>
    </>
  );
};
export default CompleteList;

const RecipeWrap = styled.div`
  padding: 1em;
  display: inline-flex;
  border-radius: 1vw;
  font-size: 1vw;
  background-color: ${colors.color_white};
  transform: translateY(-5%);
  padding-bottom: 3vh;
  margin: 1vw;

  & .deleteRecipe {
    fill: ${colors.color_black_brown};
    height: 24px;
  }
  & .binWrap {
    display: block;
    width: 100%;
    text-align: right;
    /* transform: translateX(5%); */
    fill: ${colors.color_black_brown};
  }
  & .deleteRecipe:hover {
    fill: ${colors.color_carrot_orange};
    color: ${colors.color_carrot_orange};
    cursor: pointer;
  }
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
    margin-bottom: 1em;
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
    padding-bottom: 1em;
    padding: 0.5vh 1vw;
    border-radius: 0 1vw 1vw 0;
    text-align: center;
  }
`;
