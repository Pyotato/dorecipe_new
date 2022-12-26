import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { MediumBtn } from "../_common/buttons";
import RecipeList from "./recipeList";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  StyledLink,
  TotalWrap,
  SelectedBtn,
  DefaultBtn,
  SubmitBtnWrap,
  SearchResults,
  SearchResultFlex,
} from "./style.js";
import SpinningFork from "../_common/animatedItems";

const DetailSearch = () => {
  const [optionState, setOptionState] = useState({
    categoryState: "전체",
    occasionStates: "전체",
    ingredientStates: "전체",
    cookingMethodStates: "전체",
  });

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.isLoggedIn);
  const auth = useSelector((state) => state.auth.user);
  const [authState, setAuthState] = useState();

  const createRecipeLink = () => {
    navigate("/recipe/create");
  };
  useEffect(() => {
    if (user) {
      setAuthState(auth);
    }
  }, []);

  const [categoryStates, setCategoryStates] = useState([
    "전체",
    "밑반찬",
    "메인반찬",
    "국/탕",
    "찌개",
    "디저트",
    "면/만두",
    "밥/죽/떡",
    "퓨전",
    "김치/젓갈/장류",
    "양념/소스/잼",
    "양식",
    "샐러드",
    "스프",
    "빵",
    "과자",
    "차/음료/술",
    "기타",
  ]);
  const [occasionStates, setOccasionStates] = useState([
    "전체",
    "일상",
    "초스피드",
    "술안주",
    "다이어트",
    "도시락",
    "영양식",
    "간식",
    "야식",
    "해장",
    "명절",
    "이유식",
    "연예인/유명인",
    "기타",
  ]);
  const [ingredientStates, setIngredientStates] = useState([
    "전체",
    "소고기",
    "돼지고기",
    "닭고기",
    "육류",
    "채소류",
    "해물류",
    "달걀/유제품",
    "가공식품류",
    "쌀",
    "밀가루",
    "건어물류",
    "버섯류",
    "과일류",
    "콩/견과류",
    "곡류",
    "기타",
  ]);
  const [cookingMethodStates, setCookingMethodStates] = useState([
    "전체",
    "볶음",
    "끓이기",
    "부침",
    "조림",
    "무침",
    "비빔",
    "찜",
    "절임",
    "튀김",
    "삶기",
    "굽기",
    "데치기",
    "회",
    "기타",
  ]);
  const [recipeState, setRecipeState] = useState([
    {
      recipe_num: 0,
      recipe_title: "",
      recipe_savetype: 0, //임시저장말고 등록한 거만 보이도록
      recipe_rpath: "",
      category_kind: "",
      category_theme: "",
      category_way: "",
      category_ing: "",
      information_person: "",
      information_time: "",
      information_level: "",
      completion_path1: "",
      completion_path2: "",
      completion_path3: "",
      completion_path4: "",
      completion_tip: "",
      recipe_creDate: "",
      member_id: "",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/recipe/all")
      .then(function (response) {
        console.log(response.data);
        setRecipeState(response.data);
        console.log("recipeState", recipeState);
      })
      .catch((e) => console.log(e));

    return () => {
      setOptionState({
        categoryState: "전체",
        occasionStates: "전체",
        ingredientStates: "전체",
        cookingMethodStates: "전체",
      });
    };
  }, []);

  const onClickOption = useCallback(
    (e) => {
      e.preventDefault();
      const { value } = e.target;
      const { selected } = e.target;
      console.log(value);
      console.log("selected", selected);

      if (selected === "종류별") {
        return setOptionState({
          categoryState: value,
          occasionStates: optionState.occasionStates,
          cookingMethodStates: optionState.cookingMethodStates,
          ingredientStates: optionState.ingredientStates,
        });
      }
      if (selected === "상황•테마별") {
        return setOptionState({
          categoryState: optionState.categoryState,
          occasionStates: value,
          cookingMethodStates: optionState.cookingMethodStates,
          ingredientStates: optionState.ingredientStates,
        });
      }
      if (selected === "방법별") {
        return setOptionState({
          categoryState: optionState.categoryState,
          occasionStates: optionState.occasionStates,
          cookingMethodStates: value,
          ingredientStates: optionState.ingredientStates,
        });
      }
      if (selected === "재료별") {
        return setOptionState({
          categoryState: optionState.categoryState,
          occasionStates: optionState.occasionStates,
          cookingMethodStates: optionState.cookingMethodStates,
          ingredientStates: value,
        });
      }
    },
    [optionState]
  );
  console.log("optionState", optionState);

  const onSearchRecipe = useCallback(
    async (e) => {
      e.preventDefault();
      const data = {
        recipe_num: 0,
        recipe_title: "",
        recipe_savetype: 0,
        recipe_rpath: "",
        category_kind: optionState.categoryState,
        category_theme: optionState.occasionStates,
        category_way: optionState.cookingMethodStates,
        category_ing: optionState.ingredientStates,
        information_person: "",
        information_time: "",
        information_level: "",
        completion_path1: "",
        completion_path2: "",
        completion_path3: "",
        completion_path4: "",
        completion_tip: "",
        recipe_creDate: "",
        member_id: "",
      };
      if (
        data.category_kind === "전체" &&
        data.category_theme === "전체" &&
        data.category_way === "전체" &&
        data.category_ing === "전체"
      ) {
        try {
          const response = await axios.get("http://localhost:9000/recipe/all");
          console.log(response.data);
          setRecipeState(response.data);
          console.log("recipeState", recipeState);
        } catch (e_1) {
          return console.log(e_1);
        }
      }
      try {
        const response_1 = await axios.get(
          "http://localhost:9000/recipe/detail/search",
          {
            params: {
              param1: data.category_kind,
              param2: data.category_theme,
              param3: data.category_way,
              param4: data.category_ing,
            },
          }
        );
        console.log(response_1.data);
        setRecipeState(response_1.data);
        console.log("recipeState", recipeState);
      } catch (e_2) {
        return console.log(e_2);
      }
    },
    [optionState]
  );

  return (
    <>
      <TotalWrap>
        <div>
          <h1>| F I L T E R |</h1>
        </div>
        <div>
          <div className="filterWrap">
            <div className="filterItems">
              <div className="items">종류별</div>
              <div sclassName="items">상황 • 테마별</div>
              <div className="items">재료별</div>
              <div className="items">방법별</div>
            </div>
            <div>
              <div className="totalOptionWrap">
                <div className="flexWrap">
                  {categoryStates.map((v) =>
                    v === optionState.categoryState ? (
                      <>
                        <SelectedBtn
                          onClick={onClickOption}
                          value={v}
                          selected={"종류별"}
                          key={v}
                        >
                          {v}
                        </SelectedBtn>
                      </>
                    ) : (
                      <>
                        <DefaultBtn
                          onClick={onClickOption}
                          value={v}
                          key={v}
                          selected={"종류별"}
                        >
                          {v}
                        </DefaultBtn>
                      </>
                    )
                  )}
                </div>
                <div className="totalSearch">
                  <div className="selectWrap">
                    {occasionStates.map((v) =>
                      v === optionState.occasionStates ? (
                        <>
                          <SelectedBtn
                            onClick={onClickOption}
                            value={v}
                            selected={"상황•테마별"}
                            key={v.recipe_num}
                          >
                            {v}
                          </SelectedBtn>
                        </>
                      ) : (
                        <>
                          <DefaultBtn
                            onClick={onClickOption}
                            value={v}
                            selected={"상황•테마별"}
                            key={v.recipe_num}
                          >
                            {v}
                          </DefaultBtn>
                        </>
                      )
                    )}
                  </div>
                </div>
                <div className="totalSearch" style={{ paddingTop: "1vw" }}>
                  <div className="selectWrap">
                    {ingredientStates.map((v) =>
                      v === optionState.ingredientStates ? (
                        <>
                          <SelectedBtn
                            key={v.recipe_num}
                            onClick={onClickOption}
                            value={v}
                            selected={"재료별"}
                          >
                            {v}
                          </SelectedBtn>
                        </>
                      ) : (
                        <>
                          <DefaultBtn
                            key={v.recipe_num}
                            onClick={onClickOption}
                            value={v}
                            selected={"재료별"}
                          >
                            {v}
                          </DefaultBtn>
                        </>
                      )
                    )}
                  </div>
                </div>
                <div className="totalSearch" style={{ paddingTop: "1vw" }}>
                  <div className="selectWrap">
                    {cookingMethodStates.map((v) =>
                      v === optionState.cookingMethodStates ? (
                        <>
                          <SelectedBtn
                            onClick={onClickOption}
                            value={v}
                            key={v.recipe_num}
                            selected={"방법별"}
                          >
                            {v}
                          </SelectedBtn>
                        </>
                      ) : (
                        <>
                          <DefaultBtn
                            onClick={onClickOption}
                            value={v}
                            key={v.recipe_num}
                            selected={"방법별"}
                          >
                            {v}
                          </DefaultBtn>
                        </>
                      )
                    )}
                  </div>
                </div>
                <SubmitBtnWrap>
                  <MediumBtn
                    onClick={onSearchRecipe}
                    style={{ fontSize: "1vw" }}
                  >
                    검색
                  </MediumBtn>
                </SubmitBtnWrap>
              </div>
            </div>
          </div>
          <div>
            <h1>| R E C I P E S |</h1>
          </div>
          <SearchResults>
            <SearchResultFlex>
              {recipeState.length > 0 ? (
                recipeState.map((e) => (
                  <>
                    <RecipeList key={e.recipe_num} recipeState={e} />
                  </>
                ))
              ) : user ? (
                <>
                  <div className="createRecipeLinkWrap">
                    <div>
                      <StyledLink>
                        <SpinningFork />
                        <div>
                          해당 검색어로 만들어진 레시피가 아직 없습니다.
                        </div>
                        {authState.roles.includes("ROLE_USER") && (
                          <div
                            onClick={createRecipeLink}
                            className="pointerCursor createRecipeLink"
                          >
                            [ 레시피 등록하러 가기 ]
                          </div>
                        )}
                      </StyledLink>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="createRecipeLinkWrap">
                    <div>
                      <SpinningFork />
                      <StyledLink>
                        <div>
                          해당 검색어로 만들어진 레시피가 아직 없습니다.
                        </div>
                      </StyledLink>
                    </div>
                  </div>
                </>
              )}
            </SearchResultFlex>
          </SearchResults>
        </div>
      </TotalWrap>
    </>
  );
};

export default DetailSearch;
