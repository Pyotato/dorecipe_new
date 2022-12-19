import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import RecordList from "./recipeList";

import styled from "styled-components";
import NullRecipe from "../nullRecipeList";
import { useSelector } from "react-redux";
import { editingRecipeState } from "../RecipeStates";
import { colors } from "../../../theme/theme";
import BasicSpinner from "../../../components/_common/loading";
import { useMemo } from "react";

const RecordingRecipeList = ({
  currentUser,
  recipeLength,
  recipeState,
  setRecipeState,
  setRecipeLength,
  incompleteRecipeState,
  setIncompleteRecipeState,
  incompleteRecipeLength,
  setIncompleteRecipeLength,
}) => {
  const [editingRecipeState, setEditingRecipeState] = useState([
    {
      recipe_num: 0,
      recipe_title: "로딩중",
      recipe_rpath: `로딩중`,
      recipe_savetype: 0,
      information_level: "로딩중",
      information_time: "로딩중",
    },
  ]); //미완성레시피 삭제 감지
  const [loadingState, setLoadingState] = useState(true);
  // const [incompleteRecipeLength, setIncompleteRecipeLength] = useState(0); //레시피 삭제 감지

  useEffect(() => {
    if (incompleteRecipeState.length > 0) {
      setEditingRecipeState(incompleteRecipeState);
      setIncompleteRecipeLength(incompleteRecipeState.length);
    } else {
      setEditingRecipeState("empty");
    }
  }, [incompleteRecipeState]);
  console.log("incompleteRecipeState", incompleteRecipeState);
  console.log("editingRecipeState", editingRecipeState);

  useCallback(() => {
    // useMemo(() => {
    if (incompleteRecipeLength > 0) {
      setIncompleteRecipeState(incompleteRecipeState);
      setIncompleteRecipeLength(incompleteRecipeState.length);
    } else {
      setEditingRecipeState(incompleteRecipeState);
      setIncompleteRecipeLength(0);
    }
  }, [incompleteRecipeState, incompleteRecipeLength]);

  return (
    <>
      <BasicFormSection>
        <div className="totalWrap">
          <div>
            <SectionTitle>작성중인 레시피</SectionTitle>
            <RecipeWrapItems>
              <Scrollable>
                <div>
                  {editingRecipeState === "empty" ? (
                    <>
                      <NullRecipe />
                    </>
                  ) : editingRecipeState[0].recipe_title === "로딩중" ? (
                    <>
                      <BasicSpinner />
                    </>
                  ) : (
                    incompleteRecipeState.map((e) => (
                      <RecordList
                        // loadingState={loadingState}
                        key={e.recipe_num}
                        incompleteRecipeState={incompleteRecipeState}
                        editingRecipeState={e}
                        incompleteRecipeLength={incompleteRecipeLength}
                        setEditingRecipeState={setEditingRecipeState}
                        setIncompleteRecipeState={setIncompleteRecipeState}
                        setIncompleteRecipeLength={setIncompleteRecipeLength}
                      />
                    ))
                  )}
                </div>
              </Scrollable>
            </RecipeWrapItems>
          </div>
        </div>
      </BasicFormSection>
    </>
  );
};
export default RecordingRecipeList;

const Scrollable = styled.section`
  clear: both;
  width: 95%;
  margin: 1em auto;

  & > div {
    height: 58vh;

    overflow-x: hidden;
    margin: 0 auto;
    padding: 1em 0;

    ::-webkit-scrollbar {
      width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
      height: 30%;
      background-color: ${colors.color_milktea_brown};
    }
    ::-webkit-scrollbar-track {
      background-color: ${colors.color_greyish_white};
      border: 1px solid ${colors.color_milktea_brown};
    }
    & .createRecipeLinkWrap {
      width: 100%;
      margin: 0 auto;
      text-align: center;
      height: 20em;
    }
  }
`;

const RecipeWrapItems = styled.div`
  width: 95%;
  height: 40em;
  margin: 0 auto;
  overflow-y: auto;
`;

const BasicFormSection = styled.div`
  width: 85%;
  margin-top: 12vh;
  margin: 12vh auto;
  border-radius: 2vw;
  padding-bottom: 6vh;
  min-height: 82vh;
  height: fit-content;
  margin-bottom: 15vh;
  background-color: ${colors.color_beige_brown};

  & .marginExtra {
    margin-top: 21vh;
  }

  & .carrot {
    color: ${colors.color_carrot_orange};
  }
  & .accented {
    color: ${colors.color_black_brown};
  }
  & .svgStrokes {
    stroke: ${colors.color_black_brown};
  }

  & .totalWrap {
    height: 20em;
  }
  /* & .sectionInfo { */
  /* margin-top: 12vh; */
  /* margin-bottom: 3em; */
  /* display: inline-block;
    margin-left: 0.5em;
    width: fit-content; */
  /* font-size: 1.2vw; */
  /* } */
`;

const SectionTitle = styled.div`
  background-color: ${colors.color_carrot_orange};
  color: ${colors.color_beige_tinted_white};
  float: left;
  /* width: 8em; */
  width: 12em;
  text-align: center;
  padding: 1vw 1vh;
  margin-top: 4em;
  margin-bottom: 1em;
  font-weight: 700;
`;
