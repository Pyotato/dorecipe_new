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
  editingRecipeState,
  setIncompleteRecipeState,
}) => {
  const user = useSelector((auth) => auth);
  const navigate = useNavigate();

  // console.log("editingRecipeState", editingRecipeState);

  const goToDraftRecipe = () => {
    console.log("goToDraftRecipe", user);
    navigate("/recipe/update/" + editingRecipeState.recipe_num);
  };
  const deleteRecipe = () => {
    console.log("삭제~", incompleteRecipeState);

    axios
      .get(
        "http://localhost:9000/recipe/delete/" + editingRecipeState.recipe_num
      )
      .then((result) => {
        console.log("result", result);
        const removeState = incompleteRecipeState.filter(
          (item) => item.recipe_num !== parseInt(editingRecipeState.recipe_num)
        );
        console.log("removeState", removeState);
        setIncompleteRecipeState(removeState);
        // setIncompleteRecipeLength()
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
          <div style={{ height: "20px", marginBottom: "1em" }}>
            {hoverBinState === 0 ? (
              <div className="binWrap">
                <div style={{ height: "1em" }}>
                  <RubbishBin
                    onMouseOver={() => {
                      setHoverBinState(1);
                    }}
                    className="deleteRecipe"
                    onClick={deleteRecipe}
                  />
                </div>
              </div>
            ) : (
              <div style={{ height: "20px" }}>
                <div>
                  <div className="binWrap">
                    <div
                      onMouseLeave={() => {
                        setHoverBinState(0);
                      }}
                      onClick={deleteRecipe}
                    >
                      <span
                        className="deleteRecipe"
                        style={{
                          display: "inline-block",

                          width: "100%",
                          padding: "4px 0",
                        }}
                      >
                        | 삭제 |
                      </span>
                    </div>
                  </div>{" "}
                </div>
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
                    src={editingRecipeState.recipe_rpath}
                    alt={editingRecipeState.recipe_rpath}
                  />
                )}
              </div>
            </div>
            <div className="titleWrap">
              {editingRecipeState.recipe_title.length < 35 ? (
                <>{editingRecipeState.recipe_title}</>
              ) : (
                <>{editingRecipeState.recipe_title.substring(0, 35) + "..."}</>
              )}
            </div>
            <div className="flexBox">
              <div className="infoWrap">
                {" "}
                {editingRecipeState.information_level}
              </div>
              <div className="infoTimeWrap">
                {editingRecipeState.information_time}
              </div>
            </div>
          </ItemWrap>
        </div>
      </RecipeWrap>
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

    height: 20px;
  }
  & .binWrap {
    height: 20px;

    width: 100%;
    text-align: right;
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

    padding-bottom: 1em;
    padding: 0.5vh 1vw;
    border-radius: 0 1vw 1vw 0;
    text-align: center;
  }
`;
