import { useEffect, useState } from "react";
import MainLayout from "../../layout/mainLayOut";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SearchRecipe from "../../components/searchRecipeCp";

import styled from "styled-components";
import { colors } from "../../theme/theme";
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
  console.log("searchState", state.length);
  useEffect(() => {
    testAxios();
  }, [search]); //검색내용이 달라질때 리랜더링

  return (
    <>
      <MainLayout>
        <TotalWrap>
          <h1>
            <span className="carrot"> '{search}'</span>에 해당되는 레시피는 총{" "}
            <span className="carrot">'{state.length}개'</span>입니다.{" "}
          </h1>
          {state.length > 0 ? (
            <div className="center">
              {state.map((e) => (
                <SearchRecipe key={e.recipe_num} state={e} search={search} />
              ))}
            </div>
          ) : (
            <div className="notFound">
              <b>'{search}'</b> 에 해당 되는 레시피가 없습니다.
              <div className="locateToSearch" onClick={onClickSearchRecipes}>
                레시피 검색하러 가기
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
  /* height: 100vh; */
  padding: 12vh;
  & h1 {
    text-align: center;
    padding-bottom: 3vh;
    color: ${colors.color_brown};
  }
  & .center {
    margin: 0 auto;
    /* width: 80vw; */
    /* width: 100%; */
  }
  & .carrot {
    color: ${colors.color_carrot_orange};
  }
`;
