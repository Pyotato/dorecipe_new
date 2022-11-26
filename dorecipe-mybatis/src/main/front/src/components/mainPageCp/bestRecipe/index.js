import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../_common/bannerLayout/style.css";
import axios from "axios";
import { useMemo } from "react";
import { useCallback } from "react";
const BestRecipe = () => {
  //axios로 레시피 받아와서 출력하기

  const [state, setState] = useState([
    {
      recipe_rank: 1,
      recipe_num: "",
      recipe_rpath: "/img/example1.png",
      recipe_name: "음식명",
      information_level: "",
      information_time: "",
      // user_name: "사용자명",
    },
    {
      recipe_rank: 2,
      recipe_num: "",
      recipe_rpath: "/img/example2.png",
      recipe_name: "음식명",
      information_level: "",
      information_time: "",
      // user_name: "사용자명",
    },
    {
      recipe_rank: 3,
      recipe_num: "",
      recipe_rpath: "/img/example3.png",
      recipe_name: "음식명",
      information_level: "",
      information_time: "",
    },
    {
      recipe_rank: 4,
      recipe_num: "",
      recipe_rpath: "/img/example3.png",
      recipe_name: "음식명",
      information_level: "",
      information_time: "",
    },
    {
      recipe_rank: 5,
      recipe_num: "",
      recipe_rpath: "/img/example5.png",
      recipe_name: "음식명",
      information_level: "",
      information_time: "",
    },
    {
      recipe_rank: 6,
      recipe_num: "",
      recipe_rpath: "/img/example6.png",
      recipe_name: "음식명",
      information_level: "",
      information_time: "",
    },
    {
      recipe_rank: 7,
      recipe_num: "",
      recipe_rpath: "/img/example7.png",
      recipe_name: "음식명",
      information_level: "",
      information_time: "",
    },
    {
      recipe_rank: 8,
      recipe_num: "",
      recipe_rpath: "/img/example8.png",
      recipe_name: "음식명",
      information_level: "",
      information_time: "",
    },
    {
      recipe_rank: 9,
      recipe_num: "",
      recipe_rpath: "/img/example9.png",
      recipe_name: "음식명",
      information_level: "",
      information_time: "",
    },
    {
      recipe_rank: 10,
      recipe_num: "",
      recipe_rpath: "/img/example10.png",
      recipe_name: "음식명",
      information_level: "",
      information_time: "",
    },
  ]);

  // const recipeArray = [];
  const [bestRecipeState, setBestRecipeState] = useState([]);
  const [recipeArrayState, setRecipeArrayState] = useState([]);
  const bestRecipes = [];

  useState(() => {
    axios
      // .get(process.env.REACT_APP_HOST + "/recipe/search/details/")
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
              // {
              //   param: { recipe_num: parseInt(recipeArray[0]) },
              // }
            )
            .then((result) => {
              // console.log("result", result.data[0].recipe_num);
              bestRecipes.push({
                recipe_rank: i + 1,
                recipe_num: result.data[0].recipe_num,
                recipe_rpath: result.data[0].recipe_rpath,
                recipe_name: result.data[0].recipe_name,
                information_level: result.data[0].information_level,
                information_time: result.data[0].information_time,
              });
              setState(bestRecipes);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
  }, [recipeArrayState]);
  console.log("bestRecipes", bestRecipes);
  console.log("state", state);
  console.log("bestRecipes", bestRecipes);
  return (
    <>
      <BestRecipeWrap>
        <h3>BEST 레시피</h3>
        <div>
          {state.map((e) => {
            return (
              <>
                <FlexWrap>
                  <div key={e}>
                    {/* {e.recipe_rank < 5 ? ( */}
                    <Link
                      to={`/recipe/search/details/${e.recipe_num}`}
                      className="links"
                    >
                      <RecipeWrap key={e}>
                        <RecipeRank key={e.recipe_rank}>
                          {e.recipe_rank}
                        </RecipeRank>{" "}
                        <RecipeImg>
                          <img
                            className="bannerimg"
                            src={e.recipe_rpath}
                            key={e.recipe_rpath}
                            alt="bannerimg"
                          ></img>
                        </RecipeImg>
                        <div
                          style={{ height: "9em", zIndex: "900" }}
                          className="recipe_name"
                        >
                          {e.recipe_name}
                        </div>
                        <div className="user_name">{e.user_name}</div>
                      </RecipeWrap>
                    </Link>
                  </div>
                </FlexWrap>
              </>
            );
          })}
        </div>
      </BestRecipeWrap>
    </>
  );
};
export default BestRecipe;
const BestRecipeWrap = styled.div`
  width: 80%;
  margin: 3em auto;
  padding: 1em;
  /* background-color: #fffdf5; */
  & h3 {
    color: #463635;
    font-weight: 700;
  }
`;

const RecipeWrap = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: 0 1em;
  & > Link {
    text-decoration: none;
  }
`;

const FlexWrap = styled.div`
  width: fit-content;
  display: inline-flex;
  flex-wrap: no-wrap;
  justify-content: space-evenly;
`;
const RecipeImg = styled.div`
  & > img {
    width: 12em;
    padding-bottom: 0.5em;
  }
`;
const RecipeRank = styled.div`
  border: 1px solid ${(props) => props.theme.accentedColor};
  display: inline-block;
  padding-top: 0.5em;
  font-size: 1em;
  width: 3em;
  height: 3em;
  color: #fffdf5;
  text-align: center;
  border-radius: 0.6em;
  background-color: #463635;
  transform: translate(-30%, 70%);
`;
