import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import NullRecipe from "../nullRecipeList";

import BasicSpinner from "../../_common/loading";
import { colors } from "../../../theme/theme";

const LikeRecipeList = ({ currentUser }) => {
  // let { memberId } = useParams();

  // 작성중 레시피
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState(true);

  const [recipeLength, setRecipeLength] = useState(0); //레시피 삭제 감지

  const [likeState, setLikeState] = useState([
    {
      recipe_num: 0,
      recipe_title: "로딩중",
      recipe_rpath: `로딩중`,
      recipe_savetype: 0,
      information_level: "로딩중",
      information_time: "로딩중",
    },
  ]);
  const [hoverBinState, setHoverBinState] = useState(0);
  // const currentUser = useSelector((user) => user.auth.user.username);
  // useMemo(() => {
  //   axios
  //     .get("http://localhost:9000/recipe/getLikedRecipes", {
  //       params: { param1: currentUser.toString() },
  //     })
  //     .then((res) => {
  //       console.log("getLikedRecipes", res.data);
  //       setLikeState(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // }
  // }, [likeState]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/recipe/getLikedRecipes", {
        params: { param1: currentUser.toString() },
      })
      .then((res) => {
        console.log("getLikedRecipes", res.data);
        setLikeState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* <BasicFormSection> */}
      {/* <div> */}
      <SectionTitle>내가 좋아하는 레시피들</SectionTitle>
      <RecipeWrapItems>
        <Scrollable>
          <div>
            {likeState === "empty" ? (
              <>
                <NullRecipe />
              </>
            ) : likeState[0].recipe_title === "로딩중" ? (
              <>
                <BasicSpinner />
              </>
            ) : (
              likeState.map((e) => (
                <RecipeWrap>
                  <div>
                    <ItemWrap
                      onClick={() =>
                        navigate(`/recipe/search/details/${e.recipe_num}`)
                      }
                    >
                      <div>
                        <div>
                          {likeState[0].recipe_title === "로딩중" ? (
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
      {/* </div> */}
      {/* </BasicFormSection> */}
      {/* <div>{currentUser}님이 좋아하는 레시피들</div>
      {likeState[0] === "로딩중" ? (
        <>
          <BasicSpinner />
        </>
      ) : (
        <>
          {likeState.map((e) => (
            <>
              <div
                key={e}
                onClick={() => {
                  navigate(`/recipe/search/details/${e.recipe_num}`);
                }}
              >
                <div>{e.recipe_title}</div>
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
`;

const RecipeWrapItems = styled.div`
  width: 95%;
  /* height: 30em; */
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
