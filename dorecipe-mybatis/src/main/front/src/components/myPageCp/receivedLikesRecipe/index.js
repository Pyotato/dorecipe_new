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

const ReceivedLikesRecipeList = ({ currentUser }) => {
  // let { memberId } = useParams();

  // 작성중 레시피
  const navigate = useNavigate();
  const [receivedLikesRecipes, setReceivedLikesRecipes] = useState([
    // "로딩중", // {
    //   recipe_num: 0,
    //   recipe_title: "",
    //   recipe_rpath: "",
    //   recipe_savetype: 0,
    //   information_level: "",
    //   information_time: "",
    // },
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
  // const currentUser = useSelector((user) => user.auth.user.username);
  useEffect(() => {
    axios
      .get("http://localhost:9000/recipe/getMyRecipesLikes", {
        params: { param1: currentUser.toString() },
      })
      .then((res) => {
        console.log("getMyRecipesLikes", res.data);
        setReceivedLikesRecipes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  }, []);

  return (
    <>
      <SectionTitle>좋아요를 받은 레시피들</SectionTitle>
      <RecipeWrapItems>
        <Scrollable>
          <div>
            {receivedLikesRecipes === "empty" ? (
              <>
                <NullRecipe />
              </>
            ) : receivedLikesRecipes[0].recipe_title === "로딩중" ? (
              <>
                <BasicSpinner />
              </>
            ) : (
              receivedLikesRecipes.map((e) => (
                <RecipeWrap>
                  <div>
                    <ItemWrap
                      onClick={() =>
                        navigate(`/recipe/search/details/${e.recipe_num}`)
                      }
                    >
                      <div>
                        <div>
                          {receivedLikesRecipes[0].recipe_title === "로딩중" ? (
                            <BasicSpinner />
                          ) : (
                            <img src={e.recipe_rpath} alt={e.recipe_rpath} />
                          )}
                        </div>{" "}
                      </div>
                      <div>
                        <div className="heart">{e.likes_count}</div>
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

      {/* <div>좋아요를 받은 {currentUser}님의 레시피들</div>
      {receivedLikesRecipes[0] === "로딩중" ? (
        <>
          <BasicSpinner />
        </>
      ) : (
        <>
          {receivedLikesRecipes.map((e) => (
            <>
              <div
                key={e.recipe_num}
                onClick={() => {
                  navigate(`/recipe/search/details/${e.recipe_num}`);
                }}
              >
                <div>{e.recipe_title}</div>
                <div>{e.likes_count}</div>
                <div>{e.recipe_num}</div>
                <div>{e.information_level}</div>
                <div>{e.information_time}</div>
                <div>
                  <img
                    style={{ width: "9em" }}
                    src={e.recipe_rpath}
                    alt={e.recipe_rpath}
                  />
                </div>
              </div>
            </>
          ))}
        </>
      )} */}

      {/* 좋아요한 레시피 */}
      {/* <div className="container-sm myPage-box2 center">
        <div>
          <SectionTitle>
            좋아요한 레시피
            <span className="likeRecipeTotal"> */}
      {/* <FontAwesomeIcon icon={faHeart} className="heart" />총{" "} */}
      {/* {likeState.length}개
            </span>
          </SectionTitle>
          <Scrollable>
            <div>
              {likeState.length > 1 ? (
                likeState.map((e) => (
                  <LikeRecipeList key={e.recipe_num} likeState={e} />
                ))
              ) : (
                <NullRecipe />
              )}
            </div>
          </Scrollable>
          {
                    likeState.length !== 0
                    ?
                    likeState.map((e) => (
                        <LikeRecipeList
                            likeState={e}
                        />
                    ))
                    :
                    <NullRecipe />
                }
        </div>
      </div> */}
    </>
  );
};

export default ReceivedLikesRecipeList;
// const SectionTitle = styled.div`
//   background-color: #8d3232;
//   display: inline-block;
//   width: 90%;
//   margin: 1em 3em;
//   color: #fffdf5;
//   height: 2.4em;
//   font-size: 21px;
//   font-weight: 700;
//   padding: 0.5em 0;
//   padding-left: 0.5em;
//   text-align: center;
// `;

// const Scrollable = styled.section`
//   width: 100%;
//   margin: 1em auto;

//   & > div {
//     padding: 2rem;
//     height: 27em;
//     overflow-y: auto;
//     margin: 0 auto;

//     ::-webkit-scrollbar {
//       width: 0.5rem;
//     }
//     ::-webkit-scrollbar-thumb {
//       height: 30%;
//       background-color: #463635;
//     }
//     ::-webkit-scrollbar-track {
//       background-color: #fffdf5;
//       border: 1px solid #463635;
//     }
//   }
// `;

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
