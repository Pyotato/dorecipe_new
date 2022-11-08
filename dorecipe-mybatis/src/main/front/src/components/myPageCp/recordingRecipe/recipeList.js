import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecordList = ({ recipeState, recipeLength, setRecipeLength }) => {
  const user = useSelector((auth) => auth);
  const navigate = useNavigate();
  const goToDraftRecipe = () => {
    console.log("goToDraftRecipe", user);
    navigate("/recipe/update/" + recipeState.recipe_num);
  };
  const deleteRecipe = () => {
    console.log("삭제~", recipeState);
    axios
      .get("http://localhost:9000/recipe/delete/" + recipeState.recipe_num)
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
      {/* 작성중 레시피 */}
      <RecipeWrap>
        <li className="card recipe-box center wrap">
          <div>
            <FontAwesomeIcon
              className="createRecipeIcon"
              icon={faXmarkCircle}
              onClick={deleteRecipe}
            />
          </div>
          {/* <div className="card recipe-box center"> */}
          <img
            className="card-img-top card-img-size Rcard"
            src={recipeState.recipe_rpath}
            alt="profileImage"
          />
          <div
            onClick={goToDraftRecipe}
            className="card-title"
            style={{ cursor: "pointer" }}
          >
            {/* {recipeState.recipe_title} */}
            {recipeState.recipe_title.length < 12
              ? recipeState.recipe_title
              : recipeState.recipe_title.slice(0, 11) + "..."}
          </div>
          {recipeState.information_level}
          &nbsp;&nbsp;&nbsp;
          {recipeState.information_time}
          {/* </div> */}
        </li>
      </RecipeWrap>
    </>
  );
};
export default RecordList;
const RecipeWrap = styled.ul`
  display: inline-block;
  justify-content: flex-start;
  flex-wrap: nowrap;
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
  & .wrap {
    width: 12em;
  }
`;
