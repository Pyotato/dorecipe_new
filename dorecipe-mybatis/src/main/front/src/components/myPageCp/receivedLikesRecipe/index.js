import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import NullRecipe from "../nullRecipeList";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import BasicSpinner from "../../_common/loading";
import { colors } from "../../../theme/theme";
import { useCallback } from "react";
import { CompleteRecipeState } from "../RecipeStates";

const ReceivedLikesRecipeList = ({
  currentUser,
  receivedLikesRecipes,
  setReceivedLikesRecipesLength,
}) => {
  /** 100k 식으로 간단히 표기 */
  const likeFormat = Intl.NumberFormat(undefined, { notation: "compact" });
  // 작성중 레시피
  const navigate = useNavigate();
  // 랜더링시 데이터값을 불러오지 않았거나
  // 데이터길이가 0일떄
  // 랜더링 시 .recipe_title 값이 undefined거나 map을 하려할떄 에러 발생 방지
  const [receivedLikesRecipesFront, setReceivedLikesRecipesFront] = useState([
    {
      recipe_num: 0,
      recipe_title: "로딩중",
      recipe_rpath: `로딩중`,
      recipe_savetype: 0,
      likes_count: 0,
      information_level: "로딩중",
      information_time: "로딩중",
    },
  ]);

  useEffect(() => {
    if (receivedLikesRecipes.length > 0) {
      setReceivedLikesRecipesFront(receivedLikesRecipes);

      setReceivedLikesRecipesLength(receivedLikesRecipes.length);
    } else {
      setReceivedLikesRecipesFront("empty");
    }
  }, [receivedLikesRecipes]);

  return (
    <>
      <SectionTitle>좋아요를 받은 레시피들</SectionTitle>
      <RecipeWrapItems>
        <Scrollable>
          <div>
            {receivedLikesRecipesFront === "empty" ? (
              <>
                <NullRecipe />
              </>
            ) : receivedLikesRecipesFront[0].recipe_title === "로딩중" ? (
              <>
                <BasicSpinner />
              </>
            ) : (
              receivedLikesRecipes.length > 0 &&
              receivedLikesRecipes.map((e, index) => (
                <RecipeWrap key={index}>
                  <div>
                    <ItemWrap
                      onClick={() =>
                        navigate(`/recipe/search/details/${e.recipe_num}`)
                      }
                    >
                      <div>
                        <div>
                          {receivedLikesRecipesFront[0].recipe_title ===
                          "로딩중" ? (
                            <BasicSpinner />
                          ) : (
                            <img src={e.recipe_rpath} alt={e.recipe_rpath} />
                          )}
                        </div>{" "}
                      </div>
                      <div>
                        <div className="heart">
                          {likeFormat.format(e.likes_count)}
                        </div>
                        {/* <div className="heart">{e.likes_count}</div> */}
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="heart faHeart"
                        />
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

export default ReceivedLikesRecipeList;

const Scrollable = styled.section`
  clear: both;
  width: 95%;
  margin: 1em auto;

  & > div {
    height: 53vh;

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
  /* height: 30em; */
  margin: 0 auto;
  overflow-y: auto;
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

  & .heart {
    color: ${colors.color_carrot_orange};
    /* text-align: right; */
    float: right;
    padding-left: 0.5em;
    font-size: 12px;
    /* width: 100%; */
    /* height: 1em; */
    padding-top: 0.2em;
  }
  & .faHeart {
    padding-top: 0.5em;
  }
`;
const ItemWrap = styled.div`
  cursor: pointer;
  min-width: 13%;
  min-height: 20vh;

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
