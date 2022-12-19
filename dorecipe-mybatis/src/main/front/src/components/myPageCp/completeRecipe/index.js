import { useEffect, useState } from "react";
import BasicSpinner from "../../../components/_common/loading";
import CompleteList from "./recipeList";

import styled from "styled-components";
import NullRecipe from "../nullRecipeList";

import { colors } from "../../../theme/theme";
import { useMemo } from "react";
import { useCallback } from "react";

const CompleteRecipeList = ({
  currentUser,
  recipeLength,
  recipeState,
  setRecipeState,
  setRecipeLength,
  incompleteRecipeLength,
  setIncompleteRecipeLength,
}) => {
  // 작성한 레시피
  const [completedRecipeState, setCompletedRecipeState] = useState([
    {
      recipe_num: 0,
      recipe_title: "로딩중",
      recipe_rpath: `로딩중`,
      recipe_savetype: 0,
      information_level: "로딩중",
      information_time: "로딩중",
    },
  ]);

  useEffect(() => {
    if (recipeLength > 0) {
      setCompletedRecipeState(recipeState);
    } else {
      setCompletedRecipeState("empty");
    }
  }, [recipeState]);

  useCallback(() => {
    // useMemo(() => {
    if (recipeLength === 0) {
      setCompletedRecipeState("empty");
    } else {
      setCompletedRecipeState(recipeState);
    }
  }, [recipeState]);

  const [loadingState, setLoadingState] = useState(true);
  console.log("completedRecipeState", completedRecipeState);
  return (
    <>
      <BasicFormSection>
        <div className="totalWrap">
          <div>
            <SectionTitle>작성 완료한 레시피</SectionTitle>
            <RecipeWrapItems>
              <Scrollable>
                <div>
                  {completedRecipeState === "empty" && recipeLength === 0 ? (
                    <>
                      <NullRecipe />
                    </>
                  ) : completedRecipeState[0].recipe_title === "로딩중" ? (
                    <>
                      <BasicSpinner />
                    </>
                  ) : (
                    recipeState.map((e) => (
                      <CompleteList
                        loadingState={loadingState}
                        setLoadingState={setLoadingState}
                        key={e.recipe_num}
                        setRecipeState={setRecipeState}
                        completedRecipeState={e}
                        recipeState={recipeState}
                        recipeLength={recipeLength}
                        setIncompleteRecipeLength={setIncompleteRecipeLength}
                        incompleteRecipeLength={incompleteRecipeLength}
                        setRecipeLength={setRecipeLength}
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
export default CompleteRecipeList;

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
