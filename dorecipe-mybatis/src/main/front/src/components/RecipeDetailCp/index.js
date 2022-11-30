import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { MediumBtn } from "../_common/buttons";
import RecipeList from "./recipeList";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { colors } from "../../theme/theme";

const DetailSearch = () => {
  const [optionState, setOptionState] = useState([
    "전체",
    "전체",
    "전체",
    "전체",
  ]);
  const [selectedCategoryState, setSelectedCategoryList] = useState(["전체"]);
  const [selectedOccasionState, setSelectedOccasionList] = useState(["전체"]);
  const [selectedIngredientsState, setSelectedIngredientList] = useState([
    "전체",
  ]);
  const [selectedCookingMethodState, setSelectedCookingMethodList] = useState([
    "전체",
  ]);

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
      recipe_savetype: 1, //임시저장말고 등록한 거만 보이도록
      // recipe_savetype: 1, //임시저장말고 등록한 거만 보이도록
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

  const onClickOption = useCallback(
    (e) => {
      e.preventDefault();
      const { value } = e.target;
      const { selected } = e.target;
      console.log(value);
      console.log("selected", selected);

      if (!selectedCategoryState.includes(value) && selected === "종류별") {
        const copySelectedCategoryState = [...selectedCategoryState];
        const filtered = copySelectedCategoryState.filter(
          (word) => word === value
        );
        const filteredState = filtered.concat([value]);
        console.log("filteredState", filteredState);
        setSelectedCategoryList(filteredState);
        setOptionState(
          filtered
            .concat([value])
            .concat(selectedOccasionState)
            .concat(selectedIngredientsState)
            .concat(selectedCookingMethodState)
        );
      }
      if (
        !selectedOccasionState.includes(value) &&
        selected === "상황•테마별"
      ) {
        const copySelectedOccasionState = [...selectedOccasionState];
        const filtered = copySelectedOccasionState.filter(
          (word) => word === value
        );
        const filteredState = filtered.concat([value]);
        setSelectedOccasionList(filteredState);
        setOptionState(
          selectedCategoryState
            .concat(filteredState)
            .concat(selectedIngredientsState)
            .concat(selectedCookingMethodState)
        );
      }
      if (!selectedIngredientsState.includes(value) && selected === "재료별") {
        const copySelectedIngredientState = [...selectedIngredientsState];
        const filtered = copySelectedIngredientState.filter(
          (word) => word === value
        );

        const filteredState = filtered.concat([value]);
        setSelectedIngredientList(filteredState);
        setOptionState(
          selectedCategoryState
            .concat(selectedOccasionState)
            .concat(filteredState)
            .concat(selectedCookingMethodState)
        );
      }
      if (
        !selectedCookingMethodState.includes(value) &&
        selected === "방법별"
      ) {
        const copySelectedCookingMethodState = [...selectedCookingMethodState];
        const filtered = copySelectedCookingMethodState.filter(
          (word) => word === value
        );

        const filteredState = filtered.concat([value]);
        setSelectedCookingMethodList(filteredState);
        setOptionState(
          selectedCategoryState
            .concat(selectedOccasionState)
            .concat(selectedIngredientsState)
            .concat(filteredState)
        );
      }
    },
    [
      selectedCategoryState,
      selectedOccasionState,
      selectedIngredientsState,
      selectedCookingMethodState,
    ]
  );

  //페이지 마운트 했을때 한번만 전체레시피 보이기
  useEffect(() => {
    axios
      .get("http://localhost:9000/recipe/detail/search/", {
        params: {
          param1: "전체",
          param2: "전체",
          param3: "전체",
          param4: "전체",
          param5: 1, //0 = 저장 1=임시저장
        },
      })
      .then(function (response) {
        console.log(response.data);
        setRecipeState(response.data);
        // setResponseData(response.data);
        // console.log("responseData", responseData);
      })
      .catch((e) => console.log(e));
  }, []);
  // const [responseData, setResponseData] = useState([]);
  const searchRecipe = useCallback(
    (e) => {
      e.preventDefault();
      const data = {
        recipe_num: 0,
        recipe_title: "",
        recipe_savetype: 1, //임시저장
        recipe_rpath: "",
        category_kind: optionState[0],
        category_theme: optionState[1],
        category_way: optionState[2],
        category_ing: optionState[3],
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
      axios
        .get("http://localhost:9000/recipe/detail/search/", {
          params: {
            param1: data.category_kind,
            param2: data.category_theme,
            param3: data.category_way,
            param4: data.category_ing,
            param5: 1, //임시저장
          },
        })
        .then(function (response) {
          console.log(response.data);
          setRecipeState(response.data);
          console.log("recipeState", recipeState);
        })
        .catch((e) => console.log(e));
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
          <div
            style={{
              backgroundColor: "white",
              display: "inline-flex",
              border: "1px solid black",
              width: "80%",
              marginLeft: "10vw",
            }}
          >
            <div
              style={{
                backgroundColor: "#C2B196",
                borderRight: "1px solid black",
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                width: "18vw",

                justifyContent: "space-evenly",
              }}
            >
              <div style={{ height: "10%" }}>종류별</div>
              <div style={{ height: "10%" }}>상황 • 테마별</div>
              <div style={{ height: "10%" }}>재료별</div>
              <div style={{ height: "10%" }}>방법별</div>
            </div>
            <div>
              <div
                style={{
                  width: "100%",
                  display: "inline-flex",
                  flexDirection: "column",
                  gap: "1.5vw",
                  padding: "1vh 1vw",
                  paddingTop: "4vh",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    width: "68vw",

                    display: "inline-flex",

                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  {categoryStates.map((v) =>
                    v === selectedCategoryState[0] ? (
                      <>
                        <SelectedBtn
                          onClick={onClickOption}
                          value={v}
                          selected={"종류별"}
                          key={v.recipe_num}
                          style={{ fontFamily: "mainFont", fontSize: "1vw" }}
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
                          style={{ fontFamily: "mainFont", fontSize: "1vw" }}
                          selected={"종류별"}
                        >
                          {v}
                        </DefaultBtn>
                      </>
                    )
                  )}
                  {/* </div> */}
                </div>
                <div className="totalSearch">
                  <div className="selectWrap">
                    {occasionStates.map((v) =>
                      v === selectedOccasionState[0] ? (
                        <>
                          <SelectedBtn
                            onClick={onClickOption}
                            value={v}
                            style={{ fontFamily: "mainFont", fontSize: "1vw" }}
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
                            style={{ fontFamily: "mainFont", fontSize: "1vw" }}
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
                      v === selectedIngredientsState[0] ? (
                        <>
                          <SelectedBtn
                            key={v.recipe_num}
                            style={{
                              fontFamily: "mainFont",
                              fontSize: "1vw",
                            }}
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
                            style={{ fontFamily: "mainFont", fontSize: "1vw" }}
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
                      v === selectedCookingMethodState[0] ? (
                        <>
                          <SelectedBtn
                            onClick={onClickOption}
                            style={{
                              fontFamily: "mainFont",
                              fontSize: "1vw",
                            }}
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
                            style={{ fontFamily: "mainFont", fontSize: "1vw" }}
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
                    onClick={searchRecipe}
                    style={{ fontFamily: "mainFont", fontSize: "1vw" }}
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
                        <div className="icon pointerCursor">
                          <FontAwesomeIcon
                            icon={faUtensils}
                            className="userIcon"
                          />
                        </div>
                        해당 검색어로 만들어진 레시피가 아직 없습니다.
                        {authState.roles.includes("ROLE_USER") && (
                          <div onClick={createRecipeLink}>
                            [ 레시피 등록하러 가기 ]{" "}
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
                      <StyledLink>
                        <div className="icon">
                          <FontAwesomeIcon
                            icon={faUtensils}
                            className="userIcon"
                          />
                        </div>
                        해당 검색어로 만들어진 레시피가 아직 없습니다.
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

const TotalWrap = styled.div`
  width: 100%;
  font-family: "mainFont";
  background-color: ${colors.color_beige_white};
  font-size: 1vw;
  padding-bottom: 9vh;

  & h1 {
    padding-top: 13vh;
    padding-bottom: 4vh;
    text-align: center;
    color: ${colors.color_brown};
  }

  & .categoryWrap {
    font-size: 1vw;
    background-color: ${colors.color_bg_white};
  }
`;

const SelectedBtn = styled.button`
  color: ${colors.color_white};
  background-color: ${colors.color_brown};
  width: fit-content;
  padding: 0.5vw;
  border: transparent;
  border-radius: 0.7vw;

  &:hover {
    cursor: pointer;
  }
`;
const DefaultBtn = styled.button`
  background-color: transparent;
  color: ${colors.color_brown};
  min-width: 3em;
  max-width: fit-content;
  padding: 0.5em;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
const SubmitBtnWrap = styled.div`
  & button {
    float: right;
  }
`;

const SearchResults = styled.div`
  width: 80vw;
  margin: 0 auto;
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

const StyledLink = styled.div`
  /* cursor: pointer; */
  padding-top: 1em;
  color: ${(props) => props.theme.accentedColor};
  overflow: hidden;
  & :hover {
    color: #8d3232;
  }
  & .icon:hover {
    transition: all ease 1s;
    transform: rotate(360deg);
    padding: 2em;
  }
  & .pointerCursor:hover {
    cursor: pointer;
  }
`;
