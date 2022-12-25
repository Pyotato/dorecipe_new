import { useEffect, useState } from "react";
import MainLayout from "../../layout/mainLayOut";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SearchRecipe from "../../components/searchRecipeCp";

import styled from "styled-components";
import { colors } from "../../theme/theme";
import { useMemo } from "react";
const SearchRecipePage = () => {
  const params = useParams();

  const [state, setState] = useState([
    {
      recipe_num: 0,
      recipe_title: "",
      recipe_rpath: "",
      information_level: "",
      information_time: "",
    },
  ]);

  const navigate = useNavigate();

  const onClickSearchRecipes = () => {
    navigate("/recipes/search");
  };

  const search = params.searchId;
  function testAxios() {
    axios
      .get("http://localhost:9000/recipe/search/" + search)
      .then((result) => {
        setState(result.data);
      });
  }

  //검색내용이 달라질때 리랜더링
  useMemo(() => {
    testAxios();
  }, [search]);
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <MainLayout>
        <TotalWrap>
          <h1>
            <span className="carrot"> '{search}'</span>에 해당되는 레시피는 총{" "}
            <span className="carrot">'{state.length}개'</span>입니다.{" "}
          </h1>

          {state.length > 0 ? (
            <SearchResultFlex className="center">
              {state.map((e) => (
                <SearchRecipe key={e.recipe_num} state={e} search={search} />
              ))}
            </SearchResultFlex>
          ) : (
            <div className="notFound">
              <b className="carrot">'{search}'</b> 에 해당 되는 레시피가
              없습니다.
              <div onClick={onClickSearchRecipes}>
                <div className="locateToSearch">레시피 검색하러 가기</div>
              </div>
            </div>
          )}
        </TotalWrap>
      </MainLayout>
    </>
  );
};
export default SearchRecipePage;
const TotalWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 15vh 0;
  overflow-x: hidden;
  & h1 {
    text-align: center;
    padding-bottom: 3vh;
    color: ${colors.color_brown};
  }
  & .center {
    margin: 0 auto;
    width: 86%;
  }
  & .carrot {
    color: ${colors.color_carrot_orange};
  }
  & .notFound {
    text-align: center;
    padding: 20vh 0;
    line-height: 6;
  }

  & .locateToSearch:hover {
    cursor: pointer;
    transform: scale(1.5);
  }
`;

const SearchResultFlex = styled.div`
  width: 95%;
  height: 40em;
  margin: 0 auto;
  overflow-y: auto;
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
`;
