import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { colors } from "@theme/theme";
import BasicSpinner from "@commonCp/loading";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BestRecipe = () => {
  const navigate = useNavigate();
  function useBestRecipes() {
    return useQuery({
      queryKey: ["bestRecipes"],
      queryFn: async () => {
        const { data } = await axios.get(
          "http://localhost:9000/recipe/getBestRecipes"
        );
        return data;
      },
    });
  }
  const { status, data, error, isFetching } = useBestRecipes();

  return (
    <>
      <BestRecipeWrap>
        {status === "loading" ? (
          <div className="loaderTotalWrap">
            <div className="loaderWrap">
              <BasicSpinner displayState={"block"} />
            </div>
          </div>
        ) : (
          <>
            <TotalWrap className="top">
              {data.map((e, index) => {
                return (
                  index < 5 && (
                    <div className="itemWrap" key={index}>
                      <div
                        className="flexItem "
                        onClick={() => {
                          navigate(`/recipe/search/details/${e.recipe_num}`);
                        }}
                      >
                        {" "}
                        <RecipeRank>{index + 1}</RecipeRank>{" "}
                        <RecipeImg>
                          <img
                            className="bannerimg"
                            src={e.recipe_rpath}
                            alt="bannerimg"
                          />
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
                    </div>
                  )
                );
              })}
            </TotalWrap>
            <TotalWrap className="top">
              {data.map((e, index) => {
                return (
                  index > 4 && (
                    <div className="itemWrap" key={index}>
                      <div
                        className="flexItem "
                        onClick={() => {
                          navigate(`/recipe/search/details/${e.recipe_num}`);
                        }}
                      >
                        {" "}
                        <RecipeRank>{index + 1}</RecipeRank>{" "}
                        <RecipeImg>
                          <img
                            className="bannerimg"
                            src={e.recipe_rpath}
                            alt="bannerimg"
                          />
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
                    </div>
                  )
                );
              })}
            </TotalWrap>
          </>
        )}
      </BestRecipeWrap>
    </>
  );
};
export default BestRecipe;

const BestRecipeWrap = styled.div`
  margin-top: 3em;
  & .loaderTotalWrap {
    width: 100%;
    height: 100vh;
    display: inline-flex;
    align-items: center;
  }

  & .loaderWrap {
    margin: 0 auto;
    text-align: center;
    width: 100%;
  }
`;

const TotalWrap = styled.div`
  display: inline-flex;
  width: 100%;
  font-size: 1vw;
  justify-content: space-evenly;
  margin-top: 3em;

  & > .itemWrap {
    width: 13vw;
    height: 40vh;

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
    height: 40vh;
  }
  & .flexItem:hover {
    cursor: pointer;
  }

  & .recipeName {
    height: 4em;
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
    padding-bottom: 1em;
  }
  & .floatRight {
    float: right;
    padding-bottom: 1em;
    padding-right: 1em;
  }
`;

const RecipeImg = styled.div`
  width: 18vw;

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
  color: ${colors.color_carrot_orange};
  width: 3em;
  height: 3em;
  font-weight: 700;
  background-color: ${colors.color_beige_white};
  padding-top: 1vw;
  text-align: center;
  border-radius: 1vw 0 0 0;
`;
