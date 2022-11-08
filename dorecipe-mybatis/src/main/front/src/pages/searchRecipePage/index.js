import { useEffect, useState } from "react";
import MainLayout from "../../layout/mainLayOut";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SearchRecipe from "../../components/SearchRecipeCp";
import "./style.css";
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
  }, []);

  return (
    <>
      <MainLayout>
        <h2>| Recipes |</h2>
        {state.length > 0 ? (
          <div className="center">
            {state.map((e) => (
              <SearchRecipe key={e.recipe_num} state={e} />
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
      </MainLayout>
    </>
  );
};
export default SearchRecipePage;
