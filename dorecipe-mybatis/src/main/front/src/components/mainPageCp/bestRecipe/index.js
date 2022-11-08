import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../_common/bannerLayout/style.css";
import axios from "axios";
const BestRecipe = () => {
  //axios로 레시피 받아와서 출력하기

  const [state, setState] = useState([
    {
      recipe_rank: 1,
      recipeImg: "/img/example1.png",
      recipe_name: "음식명",
      user_name: "사용자명",
    },
    {
      recipe_rank: 2,
      recipeImg: "/img/example2.png",
      recipe_name: "음식명",
      user_name: "사용자명",
    },
    {
      recipe_rank: 3,
      recipeImg: "/img/example3.png",
      recipe_name: "음식명",
      user_name: "사용자명",
    },
    {
      recipe_rank: 4,
      recipeImg: "/img/example4.png",
      recipe_name: "음식명",
      user_name: "사용자명",
    },
    {
      recipe_rank: 5,
      recipeImg: "/img/example5.png",
      recipe_name: "음식명",
      user_name: "사용자명",
    },
    {
      recipe_rank: 6,
      recipeImg: "/img/example1.png",
      recipe_name: "음식명",
      user_name: "사용자명",
    },
    {
      recipe_rank: 7,
      recipeImg: "/img/example2.png",
      recipe_name: "음식명",
      user_name: "사용자명",
    },
    {
      recipe_rank: 8,
      recipeImg: "/img/example3.png",
      recipe_name: "음식명",
      user_name: "사용자명",
    },
    {
      recipe_rank: 9,
      recipeImg: "/img/example4.png",
      recipe_name: "음식명",
      user_name: "사용자명",
    },
    {
      recipe_rank: 10,
      recipeImg: "/img/example5.png",
      recipe_name: "음식명",
      user_name: "사용자명",
    },
  ]);
  for (let i = 0; i < state.length; i++) {
    console.log(state[i].recipe_rank);
  }
  console.log(state);

  // useState(() => {
  //   axios
  //     // .get(process.env.REACT_APP_HOST + "/recipe/search/details/")
  //     .get("http://localhost:9000/recipe/search/details/")
  //     .then((result) => {
  //       console.log(result);
  //       setState(result.data);
  //     });
  // }, []);

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
                    <Link to={`recipe/${e.recipe_rank}`} className="links">
                      <RecipeWrap key={e}>
                        <RecipeRank key={e.recipe_rank}>
                          {e.recipe_rank}
                        </RecipeRank>{" "}
                        <RecipeImg>
                          <img
                            className="bannerimg"
                            src={e.recipeImg}
                            key={e.recipeImg}
                            alt="bannerimg"
                          ></img>
                        </RecipeImg>
                        <div className="recipe_name">{e.recipe_name}</div>
                        <div className="user_name">{e.user_name}</div>
                      </RecipeWrap>
                    </Link>
                    {/* ) : ( */}
                    {/* <Link to={`recipe/${e.recipe_rank}`} className="links">
                        <RecipeWrap key={e}>
                          <RecipeRank key={e.recipe_rank}>
                            {e.recipe_rank}
                          </RecipeRank>{" "}
                          <RecipeImg>
                            <img
                              className="bannerimg"
                              src={e.recipeImg}
                              key={e.recipeImg}
                              alt="bannerimg"
                            ></img>
                          </RecipeImg>
                          <div className="recipe_name">{e.recipe_name}</div>
                          <div className="user_name">{e.user_name}</div>
                        </RecipeWrap>
                      </Link> */}
                    {/* )} */}
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
  background-color: #fffdf5;
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
