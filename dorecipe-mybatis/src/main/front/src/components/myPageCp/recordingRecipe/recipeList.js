import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BasicSpinner from "../../_common/loading";
import { useState } from "react";
import { ReactComponent as RubbishBin } from ".././../../assets/RubbishBin.svg";
import { colors } from "../../../theme/theme";

const RecordList = ({
  incompleteRecipeState,
  incompleteRecipeLength,
  setIncompleteRecipeLength,
  loadingState,
  setIncompleteRecipeState,
}) => {
  const user = useSelector((auth) => auth);
  const navigate = useNavigate();
  const goToDraftRecipe = () => {
    console.log("goToDraftRecipe", user);
    navigate("/recipe/update/" + incompleteRecipeState.recipe_num);
  };
  const deleteRecipe = () => {
    console.log("삭제~", incompleteRecipeState);

    axios
      .get(
        "http://localhost:9000/recipe/delete/" +
          incompleteRecipeState.recipe_num
      )
      .then((result) => {
        console.log("result", result);
        // const removeState = incompleteRecipeState.filter(
        //   (item) =>
        //     item.recipe_num !== parseInt(incompleteRecipeState.recipe_num)
        // );
        // console.log("incompleteRecipeState", incompleteRecipeState);
        setIncompleteRecipeLength(incompleteRecipeLength - 1);
      })
      .catch((e) => {
        console.log("삭제실패", e);
      });
  };
  const [hoverBinState, setHoverBinState] = useState(0);
  return (
    <>
      {/* 작성중 레시피 */}

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
                  onClick={deleteRecipe}
                  // onClick={() => deleteRecipe()}
                />
              </div>
            ) : (
              <div
                // className="binWrap"
                className="binWrap deleteRecipe"
                onMouseLeave={() => {
                  setHoverBinState(0);
                }}
                onClick={deleteRecipe}
                style={{
                  transform: "translateY(-30%)",
                  margin: "1em 0 0.1em",
                }}
              >
                | 삭제 |
              </div>
            )}
          </div>
          <ItemWrap onClick={goToDraftRecipe}>
            <div>
              <div>
                {loadingState ? (
                  <BasicSpinner />
                ) : (
                  <img
                    src={incompleteRecipeState.recipe_rpath}
                    alt={incompleteRecipeState.recipe_rpath}
                  />
                )}
              </div>
            </div>
            <div className="titleWrap">
              {incompleteRecipeState.recipe_title.length < 35 ? (
                <>{incompleteRecipeState.recipe_title}</>
              ) : (
                <>
                  {incompleteRecipeState.recipe_title.substring(0, 35) + "..."}
                </>
              )}
            </div>
            <div className="flexBox">
              <div className="infoWrap">
                {" "}
                {incompleteRecipeState.information_level}
              </div>
              <div className="infoTimeWrap">
                {incompleteRecipeState.information_time}
              </div>
            </div>
          </ItemWrap>
        </div>
      </RecipeWrap>

      {/* <RecipeWrap>
        <li className="card recipe-box center wrap">
          <div>
            <FontAwesomeIcon
              className="createRecipeIcon"
              icon={faXmarkCircle}
              onClick={deleteRecipe}
            />
          </div>
          {/* <div className="card recipe-box center"> *
          <img
            className="card-img-top card-img-size Rcard"
            src={incompleteRecipeState.recipe_rpath}
            alt="profileImage"
          />
          <div
            onClick={goToDraftRecipe}
            className="card-title"
            style={{ cursor: "pointer" }}
          >
            {/* {recipeState.recipe_title} 
            {incompleteRecipeState.recipe_title.length < 12
              ? incompleteRecipeState.recipe_title
              : incompleteRecipeState.recipe_title.slice(0, 11) + "..."}
          </div>
          {incompleteRecipeState.information_level}
          &nbsp;&nbsp;&nbsp;
          {incompleteRecipeState.information_time}
          {/* </div> 
        </li>
      </RecipeWrap> */}
    </>
  );
};
export default RecordList;

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
