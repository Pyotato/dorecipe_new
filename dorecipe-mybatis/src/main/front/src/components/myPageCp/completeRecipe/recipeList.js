import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import "./style.css";

const CompleteList = ({
  completedRecipeState,
  recipeLength,
  setRecipeLength,
}) => {
  const navigate = useNavigate();

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
      {/* 작성한 레시피 */}
      <RecipeWrap>
        <li className="card recipe-box recipeHover wrap">
          <div>
            <FontAwesomeIcon
              className="createRecipeIcon"
              icon={faXmarkCircle}
              onClick={deleteRecipe}
            />
          </div>
          <div onClick={onClickRecipeDetails}>
            <img
              className="card-img-top card-img-size CRcard "
              src={completedRecipeState.recipe_rpath}
              alt={completedRecipeState.recipe_rpath}
            />
          </div>
          <div className="card-title" onClick={onClickRecipeDetails}>
            {completedRecipeState.recipe_title.length < 12
              ? completedRecipeState.recipe_title
              : completedRecipeState.recipe_title.slice(0, 11) + "..."}
          </div>
          <Float>
            <div>{completedRecipeState.information_level}</div>
            {/* <div className="floatRight">{completedRecipeState.information_time}</div> */}
            <div>{completedRecipeState.information_time}</div>
          </Float>
        </li>
      </RecipeWrap>
    </>
  );
};
export default CompleteList;
const RecipeWrap = styled.ul`
  display: inline-block;
  justify-content: flex-start;
  flex-wrap: nowrap;
  text-align: center;
  // background-color: blue;
  & .createRecipeIcon {
    font-size: 1.7em;
    color: ${(props) => props.theme.accentedColor};
    z-index: 100;
    float: right;
    transform: translate(90%, -30%);
  }
  & .createRecipeIcon:hover {
    color: ${(props) => props.theme.mainColor};
  }
  & .recipeHover:hover {
    cursor: pointer;
  }
  /* &.float {
    display: inline-flex;
  } */
  /* &.floatRight {
    float: right;
    width: 7em;
    margin-right: 1em;
  } */
  & .wrap {
    width: 12em;
  }
`;
const Float = styled.div`
  /* gap: 1em; */
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
