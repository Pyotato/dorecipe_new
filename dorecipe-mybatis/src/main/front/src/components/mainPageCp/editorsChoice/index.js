import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

import BannerLayout from "../../_common/bannerLayout";

import { SwiperSlide } from "swiper/react";

const EditorsChoiceSection = () => {
  //axios로 노하우 받아와서 출력하기
  // http://localhost:3000/recipe/search/details/99

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

  return (
    <>
      <BestRecipeWrap>
        <h3>잡숴러가 추천하는 레시피</h3>
        <BannerLayout>
          {state.map((e) => {
            return (
              <>
                <SwiperSlide className="slide1" key={e.recipe_rank}>
                  <Link to={`notice/${e.recipe_name}`} className="links">
                    {/* <RecipeWrap key={e}> */}
                    <RecipeWrap key={e.recipe_rank}>
                      {/* <RecipeRank>{e.recipe_rank}</RecipeRank>{" "} */}
                      <RecipeImg key={e.recipeImg}>
                        <img
                          className="bannerimg"
                          src={e.recipeImg}
                          alt="bannerimg"
                        ></img>
                      </RecipeImg>
                      <div className="recipe_name" key={e.recipe_name}>
                        {e.recipe_name}
                      </div>
                      <div className="user_name" key={e.user_name}>
                        {e.user_name}
                      </div>
                    </RecipeWrap>
                  </Link>
                </SwiperSlide>
              </>
            );
          })}
        </BannerLayout>
      </BestRecipeWrap>
    </>
  );
};
export default EditorsChoiceSection;
const BestRecipeWrap = styled.div`
  width: 80%;
  height: 23em;
  background-color: #fffdf5;
  padding: 1em;

  margin: 3em auto;
  & h3 {
    color: #463635;
    font-weight: 700;
  }
`;

const RecipeWrap = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 3em 4em;
  & > Link {
    text-decoration: none;
  }
`;

const RecipeImg = styled.div`
  & > img {
    width: 15em;
    padding-bottom: 0.5em;
  }
`;
