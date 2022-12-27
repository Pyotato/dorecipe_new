import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "@theme/theme";

import { ReactComponent as RubbishBin } from "@assets/RubbishBin.svg";

const CompleteList = ({
  completedRecipeState,
  recipeLength,
  setRecipeLength,

  setRecipeState,
  recipeState,

  setIncompleteRecipeLength,
  incompleteRecipeLength,
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
        const filtered = recipeState.filter(
          (e) => e.recipe_num !== completedRecipeState.recipe_num
        );
        setRecipeState(filtered);
      })
      .catch(() => {
        console.log("삭제실패");
      });
  };

  const setRecipeEdit = () => {
    axios
      .get(
        "http://localhost:9000/recipe/updateRecipeSaveTypeTo1/" +
          completedRecipeState.recipe_num
      )
      .then((result) => {
        console.log("result", result);
        const filtered = recipeState.filter(
          (e) => e.recipe_num !== completedRecipeState.recipe_num
        );
        setRecipeState(filtered);
        setRecipeLength(filtered.length);
        setIncompleteRecipeLength(incompleteRecipeLength + 1);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <RecipeWrap>
        <div>
          <div>
            {hoverBinState === 0 ? (
              <>
                <div className="binWrap">
                  <div className="deleteRecipe" onClick={setRecipeEdit}>
                    수정
                  </div>
                  <RubbishBin
                    onMouseOver={() => {
                      setHoverBinState(1);
                    }}
                    className="deleteRecipe"
                    onClick={() => deleteRecipe()}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="binWrap">
                  <div
                    className="deleteRecipe"
                    onClick={() => {
                      setRecipeEdit();
                      setIncompleteRecipeLength(incompleteRecipeLength + 1);
                    }}
                  >
                    수정
                  </div>
                  <div
                    className="deleteRecipe"
                    onMouseLeave={() => {
                      setHoverBinState(0);
                    }}
                    onClick={() => deleteRecipe()}
                  >
                    | 삭제 |
                  </div>
                </div>
              </>
            )}
          </div>

          <ItemWrap onClick={() => onClickRecipeDetails()}>
            <div>
              <div>
                <img
                  src={completedRecipeState.recipe_rpath}
                  alt={completedRecipeState.recipe_rpath}
                />
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

    margin-bottom: 0.6em;
  }
  & .binWrap {
    display: inline-flex;
    width: 100%;
    text-align: right;
    justify-content: space-between;
    align-items: center;

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
