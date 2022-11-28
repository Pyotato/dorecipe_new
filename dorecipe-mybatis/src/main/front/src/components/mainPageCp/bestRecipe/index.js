import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../_common/bannerLayout/style.css";
import axios from "axios";
import { colors } from "../../../theme/theme";
import { ReactComponent as ArrowRight } from "../../../assets/ArrowRight.svg";
import BasicSpinner from "../../_common/loading";

const BestRecipe = () => {
  const [state, setState] = useState([]);
  const navigate = useNavigate();
  const [recipeArrayState, setRecipeArrayState] = useState([]);
  const bestRecipes = [{}];
  const [loadingState, setLoadingState] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:9000/recipe/getBestRecipes")
      .then((result) => {
        for (let i = 0; i < result.data.length; i++) {
          recipeArrayState.push(result.data[i].recipe_num);
        }
        setRecipeArrayState(recipeArrayState);
      })
      .then(() => {
        console.log("recipeArray", recipeArrayState);
        for (let i = 0; i < recipeArrayState.length; i++) {
          axios
            .get(
              `http://localhost:9000/recipe/getBestLikedRecipes/${recipeArrayState[i]}`
            )
            .then((result) => {
              bestRecipes.push({
                recipe_rank: i + 1,
                recipe_num: result.data[0].recipe_num,
                recipe_rpath: result.data[0].recipe_rpath,
                recipe_title: result.data[0].recipe_title,
                information_level: result.data[0].information_level,
                information_time: result.data[0].information_time,
              });
              // setState(bestRecipes);
              // setLoadingState(0);
            })
            .then(() => {
              setState(bestRecipes);
            })
            .then(() => {
              setLoadingState(0);
              // alert(loadingState);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  // }, [/]);

  return (
    <>
      <BestRecipeWrap>
        <TotalWrap className="top">
          {state.map((e) => {
            return (
              <>
                {
                  //  loadingState === 1 ? (
                  //   <BasicSpinner />
                  // ) : (
                  e.recipe_rank < 6 && (
                    <>
                      <div className="itemWrap" key={e}>
                        {loadingState === 1 ? (
                          <BasicSpinner />
                        ) : (
                          <>
                            <div
                              className="flexItem"
                              onClick={() => {
                                navigate(
                                  `/recipe/search/details/${e.recipe_num}`
                                );
                              }}
                            >
                              {" "}
                              <RecipeRank key={e.recipe_rank}>
                                {e.recipe_rank}
                              </RecipeRank>
                              <RecipeImg>
                                <img
                                  className="bannerimg"
                                  src={e.recipe_rpath}
                                  key={e.recipe_rpath}
                                  alt="bannerimg"
                                ></img>
                              </RecipeImg>
                              <div className="recipeName">{e.recipe_title}</div>
                              <div>
                                <span className="floatLeft">
                                  {e.information_level}
                                </span>
                                <span className="floatRight">
                                  {e.information_time}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )
                  // )
                }
              </>
            );
          })}
        </TotalWrap>

        <TotalWrap>
          {state.map((e) => {
            return (
              <>
                {e.recipe_rank > 5 && e.recipe_rank < 11 && (
                  <>
                    <div className="itemWrap" key={e}>
                      <div
                        className="flexItem"
                        onClick={() => {
                          navigate(`/recipe/search/details/${e.recipe_num}`);
                        }}
                      >
                        {" "}
                        <RecipeRank key={e.recipe_rank}>
                          {e.recipe_rank}
                        </RecipeRank>
                        <RecipeImg>
                          <img
                            className="bannerimg"
                            src={e.recipe_rpath}
                            key={e.recipe_rpath}
                            alt="bannerimg"
                          ></img>
                        </RecipeImg>
                        <div className="recipeName">
                          {e.recipe_title.length > 40 ? (
                            <>
                              {e.recipe_title.substring(0, 26) + "  ..."}
                              <div
                                className="hoverForMoreInfo"
                                style={{ marginTop: "1vh" }}
                              >
                                더보기 &gt;
                              </div>
                            </>
                          ) : (
                            e.recipe_title
                          )}
                        </div>
                        {/* <div className="recipeName">{e.recipe_title}</div> */}
                        <div>
                          <span className="floatLeft">
                            {e.information_level}
                          </span>
                          <span className="floatRight">
                            {e.information_time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            );
          })}
        </TotalWrap>
      </BestRecipeWrap>
    </>
  );
};
export default BestRecipe;

const BestRecipeWrap = styled.div`
  margin-top: 3em;
`;

const TotalWrap = styled.div`
  display: inline-flex;
  width: 100%;
  font-size: 1vw;
  font-family: "mainFont";
  justify-content: space-evenly;
  margin-top: 3em;
  & > .itemWrap {
    width: 13vw;
    height: 50vh;
    background-color: ${colors.color_greyish_white};
    border-radius: 1vw;
    overflow-x: hidden;
    overflow-y: hidden;
    z-index: 100;
  }
  & .flexItem {
    display: inline-flex;
    flex-direction: column;
    width: 13vw;
    /* height: 100%; */
  }
  & .flexItem:hover {
    cursor: pointer;
  }

  & .recipeName {
    height: 7em;
    padding: 1em;
    font-weight: 700;
    text-align: justify;
    transform: translateY(-7vh);
  }

  & .recipeName:hover {
    color: ${colors.color_carrot_orange};
  }

  & .hoverForMoreInfo {
    color: ${colors.color_carrot_orange};
  }

  & .floatLeft {
    float: left;
    padding-left: 1em;
  }
  & .floatRight {
    float: right;
    padding-right: 1em;
  }
`;

const RecipeImg = styled.div`
  width: 18vw;
  /* height: 24vh; */
  overflow-x: hidden;
  overflow-y: hidden;
  transform: translateY(-7vh);

  & > img {
    width: 13vw;
    height: 21vh;
    margin-top: 7vh;
    z-index: 600;
    border-color: transparent;
    padding-bottom: 0.5em;
  }
`;
const RecipeRank = styled.div`
  position: absolute;
  z-index: 700;
  /* float: right; */
  color: ${colors.color_carrot_orange};
  width: 3em;
  height: 3em;
  font-weight: 700;
  background-color: ${colors.color_beige_white};
  padding-top: 1vw;
  text-align: center;
  border-radius: 1vw 0 0 0;
`;
