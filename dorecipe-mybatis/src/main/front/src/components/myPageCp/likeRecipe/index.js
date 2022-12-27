import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import NullRecipe from "../nullRecipeList";

import BasicSpinner from "@commonCp/loading";
import { colors } from "@theme/theme";
import { useCallback } from "react";

const LikeRecipeList = ({ likedRecipeState }) => {
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState(true);

  const [likeStateFront, setLikeStateFront] = useState([
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
    if (likedRecipeState.length > 0) {
      setLikeStateFront(likedRecipeState);
      setLoadingState(false);
      return;
    } else {
      likeStateFront[0].recipe_num === 0 && setLikeStateFront(likedRecipeState);
    }
  }, [likedRecipeState]);

  useCallback(() => {
    if (likedRecipeState.length === 0) {
      setLikeStateFront("empty");
      return;
    } else {
      setLikeStateFront(likedRecipeState);
      setLoadingState(false);
    }
  }, [likedRecipeState]);

  return (
    <>
      <SectionTitle>내가 좋아하는 레시피들</SectionTitle>
      <RecipeWrapItems>
        <Scrollable>
          <div>
            {loadingState ? (
              <div className="spinnerWrap">
                <BasicSpinner />
              </div>
            ) : likeStateFront === "empty" ? (
              <>
                <NullRecipe />
              </>
            ) : (
              likeStateFront.map((e, index) => (
                <RecipeWrap key={index}>
                  <div>
                    <ItemWrap
                      onClick={() =>
                        navigate(`/recipe/search/details/${e.recipe_num}`)
                      }
                    >
                      <div>
                        <div>
                          {likeStateFront[0].recipe_title === "로딩중" ? (
                            <BasicSpinner />
                          ) : (
                            <img src={e.recipe_rpath} alt={e.recipe_rpath} />
                          )}
                        </div>
                      </div>
                      <div className="titleWrap">
                        {e.recipe_title.length < 35 ? (
                          <>{e.recipe_title}</>
                        ) : (
                          <>{e.recipe_title.substring(0, 35) + "..."}</>
                        )}
                      </div>
                      <div className="flexBox">
                        <div className="infoWrap"> {e.information_level}</div>
                        <div className="infoTimeWrap">{e.information_time}</div>
                      </div>
                    </ItemWrap>
                  </div>
                </RecipeWrap>
              ))
            )}
          </div>
        </Scrollable>
      </RecipeWrapItems>
    </>
  );
};

export default LikeRecipeList;

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
  & .spinnerWrap {
    width: fit-content;
    height: 50%;
    transform: translateY(75%);
    margin: 0 auto;
  }
`;

const RecipeWrapItems = styled.div`
  width: 95%;

  margin: 0 auto;
  overflow-y: auto;
`;

const SectionTitle = styled.div`
  background-color: ${colors.color_carrot_orange};
  color: ${colors.color_beige_tinted_white};
  float: left;

  width: 12em;
  text-align: center;
  padding: 1vw 1vh;
  margin-top: 4em;
  margin-bottom: 1em;
  font-weight: 700;
`;

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
  height: 24em;
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
