import { useCallback, useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SmallBtn } from "../../_common/buttons";
import StepRecipe from "./recipeSteps";
import RecipeIngredients from "./recipeIngredients";
import { useSelector } from "react-redux";
import { ReactComponent as EmptyHeart } from "../../../assets/EmptyHeart.svg";
import { ReactComponent as FilledHeart } from "../../../assets/FilledHeart.svg";

const RecipeDetailModal = () => {
  const search = "/";
  let location = useLocation();
  const lastIndex = location.pathname.lastIndexOf(search);
  const param = location.pathname.substring(lastIndex).replace("/", ""); //레시피 번호 가져오기
  const user = useSelector((auth) => auth);
  const params = useParams();
  const navigate = useNavigate();
  const onClickBack = () => {
    navigate(-1);
  };

  console.log("user", user);
  // const [loginState, setLoginState] = useState("admin");
  const [loginState, setLoginState] = useState(user.auth.isLoggedIn);
  const [userState, setUserState] = useState(user.auth);
  const searchParam = params.recipeId;
  const [detailState, setDetailState] = useState([
    {
      // member_imagePath: "",
      recipe_num: 0,
      recipe_title: "",
      recipe_introduce: "",
      recipe_url: "",
      recipe_rpath: "",
      information_person: "",
      information_time: "",
      information_level: "",
      completion_path1: "",
      completion_path2: "",
      completion_path3: "",
      completion_path4: "",
      completion_tip: "",
      order_num: "",
      order_path: "",
      recipe_creDate: "",
      member_id: "",
      recipe_saveType: 0,
    },
  ]);
  const [ingredientState, setIngredientState] = useState([
    {
      recipe_num: param,

      ing_num: 0,
      ing_ingredient: "",
      ing_amount: "",
    },
  ]);
  const [recipe_likes, setRecipeLikes] = useState(0);
  const [heartState, setHeartState] = useState(0);
  const [heartClickState, setHeartClickState] = useState(null);

  useEffect(() => {
    if (searchParam !== undefined) {
      axios
        .get("http://localhost:9000/recipe/search/details/" + searchParam)
        // .get("/recipe/search/details/" + 1)
        // .get("/recipe/detail/search/" + searchParam)
        .then(function (response) {
          setDetailState(response.data);
          // console.log("/search/details/", response.data);
        })
        .catch((e) => console.log(e));
      axios
        .get("http://localhost:9000/recipe/getIngredientList/" + searchParam)
        .then(function (response) {
          setIngredientState(response.data);
        })
        .catch((e) => console.log(e));
      axios
        .get("http://localhost:9000/recipe/getRecipeLikes/" + searchParam)
        .then(function (response) {
          // console.log("getRecipeLikes", response);
          response.data ? setRecipeLikes(response.data) : setRecipeLikes(0);
        })
        .catch((e) => console.log(e));
      if (loginState) {
        axios
          .get("http://localhost:9000/recipe/checkLikeType", {
            params: {
              recipe_num: parseInt(searchParam),
              member_id: userState.user.username,
            },
          })
          .then((response) => {
            response.data === 1 ? setHeartState(1) : setHeartState(0);
            console.log("checkLikeType", response.data);
            response.data === ""
              ? setHeartClickState(0)
              : setHeartClickState(1);
          })
          .catch((e) => console.log(e));
      } else {
        setHeartState(0);
      }
    }
  }, []);

  useMemo(() => {
    axios
      .get("http://localhost:9000/recipe/getRecipeLikes/" + searchParam)
      .then(function (response) {
        // console.log("getRecipeLikes", response);
        response.data ? setRecipeLikes(response.data) : setRecipeLikes(0);
      })
      .catch((e) => console.log(e));
    if (loginState) {
      axios
        .get("http://localhost:9000/recipe/checkLikeType", {
          params: {
            recipe_num: parseInt(searchParam),
            member_id: userState.user.username,
          },
        })
        .then(function (response) {
          console.log("checkLikeType", response);
          response.data === 1 ? setHeartState(1) : setHeartState(0);
          // response.data === ""
          //   ? setHeartClickState(1)
          //   : setHeartClickState(response.data);
        })
        .catch((e) => console.log(e));
    } else {
      setHeartState(0);
    }
  }, [heartState, recipe_likes, searchParam]);

  const onLikeHandler = () => {
    const searchParam = params.recipeId;

    if (loginState) {
      if (heartState === 1) {
        // 좋아요를 누른 상태 ==> 좋아요 취소하기
        axios
          .get("http://localhost:9000/recipe/removeLikes", {
            params: {
              member_id: userState.user.username, //좋아요 누른 사람
              recipe_num: parseInt(searchParam),
            },
          })
          .then(() => {
            setHeartState(0);
            setHeartClickState(1);
          })
          .catch((e) => console.log(e));
      } else if (heartState === 0) {
        // update으로

        if (heartClickState === 0) {
          //insert로 (한번도 좋아요를 하지 않았을 경우)
          axios
            .get("http://localhost:9000/recipe/insertRecipeLikes", {
              params: {
                member_id: userState.user.username, //좋아요 누른 사람
                recipe_num: parseInt(searchParam),
              },
            })
            .then(() => {
              setHeartState(1);
              setHeartClickState(1);
            })
            .catch((e) => console.log(e)); //좋아요를 누르지 않은 상태
        } else if (heartClickState === 1) {
          axios
            .get("http://localhost:9000/recipe/giveLikes", {
              params: {
                member_id: userState.user.username, //좋아요 누른 사람
                recipe_num: parseInt(searchParam),
              },
            })
            .then(() => {
              setHeartState(1);
              setHeartClickState(1);
            })
            .catch((e) => console.log(e)); //좋아요를 누르지 않은 상태
        }
      } //좋아요 누르기
    } else {
      alert("로그인 후 이용가능합니다.");
    }
  };
  console.log("heartClickState", heartClickState);

  return (
    <>
      <>
        <BackGround>
          <SmallBtn className="backBtn" onClick={onClickBack}>
            {" "}
            돌아가기
          </SmallBtn>
          <RecipeWrap>
            <div>
              <div className="profileWrap">
                <img
                  src={detailState[0].member_imagePath}
                  alt={detailState[0].member_imagePath}
                />
                <span className="accented"> {detailState[0].member_id}</span>
              </div>
              <RecipeThumbnail>
                <img
                  src={detailState[0].recipe_rpath}
                  alt={detailState[0].recipe_rpath}
                />
              </RecipeThumbnail>
              <RecipeBasicInfo>
                <h2>{detailState[0].recipe_title}</h2>
                <div>
                  <span className="lvl">
                    {detailState[0].information_level}
                  </span>
                  <span className="time">
                    {detailState[0].information_time}
                  </span>
                </div>
                <div className="recipeIntro">
                  {detailState[0].recipe_introduce}
                </div>
              </RecipeBasicInfo>
              <IngredientsWrap>
                <div>
                  <span className="accented">재료</span>{" "}
                  <span>Ingredients</span>
                </div>
                <hr />
                <RecipeIngredients ingredientState={ingredientState} />
              </IngredientsWrap>
              <div>
                <CreDateLikeWrap>
                  <span className="accented"> 레시피 작성일</span>
                  <span className="accented">
                    {detailState[0].recipe_creDate.substring(0, 10)}
                  </span>
                  {/* <Likes className="accented clickable" onClick={onLikeHandler}> */}
                  <Likes className="accented clickable">
                    좋아요 {recipe_likes}{" "}
                    {heartState === 1 ? (
                      <FilledHeart onClick={() => onLikeHandler()} />
                    ) : (
                      <EmptyHeart onClick={() => onLikeHandler()} />
                    )}
                  </Likes>
                </CreDateLikeWrap>
              </div>
            </div>
            <div className="instructionWrap">
              <div>
                <span className="accented"> 조리 순서 </span>Steps
              </div>
              <hr />
              <StepRecipe detailState={detailState} />
            </div>
            <div style={{ marginTop: "1em" }}>
              <div>
                <span className="accented"> 완성 사진 </span>Completed Recipe
                Images
              </div>
              <hr />
              {detailState[0].completion_path1 == null ? (
                <div style={{ textAlign: "center" }}>
                  등록된 완성 사진이 없습니다.
                </div>
              ) : (
                <CompletedRecipeImages>
                  {detailState[0].completion_path1 == null ? (
                    <></>
                  ) : detailState[0].completion_path1 === "null" ? (
                    <div style={{ textAlign: "center" }}>
                      등록된 완성 사진이 없습니다.
                    </div>
                  ) : (
                    <Img
                      src={detailState[0].completion_path1}
                      alt={detailState[0].completion_path1}
                    />
                  )}
                  {detailState[0].completion_path2 == null ? (
                    <></>
                  ) : detailState[0].completion_path2 === "null" ? (
                    <></>
                  ) : (
                    <Img
                      src={detailState[0].completion_path2}
                      alt={detailState[0].completion_path2}
                    />
                  )}
                  {detailState[0].completion_path3 == null ? (
                    <></>
                  ) : detailState[0].completion_path3 === "null" ? (
                    <></>
                  ) : (
                    <Img
                      src={detailState[0].completion_path3}
                      alt={detailState[0].completion_path3}
                    />
                  )}
                  {detailState[0].completion_path4 == null ? (
                    <></>
                  ) : detailState[0].completion_path4 === "null" ? (
                    <></>
                  ) : (
                    <Img
                      src={detailState[0].completion_path4}
                      alt={detailState[0].completion_path4}
                    />
                  )}
                </CompletedRecipeImages>
              )}
            </div>
            <div style={{ marginTop: "1em" }}>
              <div>
                <span className="accented"> 레시피 꿀팁 </span>Recipe Tips
              </div>
              <hr />
              {detailState[0].completion_tip ? (
                detailState[0].completion_tip
              ) : (
                <div style={{ textAlign: "center" }}>
                  등록된 레시피 꿀팁이 없습니다.
                </div>
              )}
            </div>
          </RecipeWrap>
        </BackGround>
      </>
    </>
  );
};
const BackGround = styled.div`
  /* background-color: cadetblue; */
  margin: -6em auto;
  color: #463635;
  height: fit-content;
  padding: 3em;
  font-size: 14px;
  & .backBtn {
    float: right;
  }
  & .recipeIntro {
    margin: 1em 0;
  }
`;
const RecipeWrap = styled.div`
  margin: 0 auto;
  max-width: 40em;
  & .instructionWrap {
    & hr {
      margin: 0.5em 0;
      margin-bottom: 1em;
    }
    & .accented {
      font-size: 1.1em;
      font-weight: 700;
    }
  }
  & div .accented {
    font-size: 1.1em;
    font-weight: 700;
  }
  & div .clickable {
    cursor: pointer;
  }
`;
const CompletedRecipeImages = styled.div`
  display: inline-flex;
  justify-content: center;
  gap: 2em;
  width: 100%;
`;
const IngredientsWrap = styled.div`
  margin-bottom: 1em;
  & hr {
    margin: 0.5em 0;
  }
  & div .accented {
    font-size: 1.1em;
    font-weight: 700;
  }
`;
const RecipeThumbnail = styled.div`
  flex-wrap: wrap;
  display: flex;
  margin: 2em 0;
  justify-content: center;
  width: 100%;
  & img {
    /* max-width: 50em; */
    min-width: 15em;
    max-height: 24em;
  }
`;
const RecipeBasicInfo = styled.div`
  max-width: 60em;
  margin: 0 auto;
  & h2 {
    font-weight: 700;
  }
  & div {
    margin: 0 auto;
    min-width: 30em;
  }
  & div .lvl {
    margin-right: 1em;
    float: left;
    float: both;
  }
  & div .time {
    clear: left;
    float: both;
  }
`;
const Likes = styled.span`
  float: right;
`;
const CreDateLikeWrap = styled.div`
  margin: 1em 0;
  & .accented {
    font-size: 1.1em;
    font-weight: 700;
    margin-right: 0.2em;
  }
`;
const Img = styled.img`
  width: 8em;
  max-height: 8em;
  /* min-width: 8em;
  min-height: 8em; */
`;
export default RecipeDetailModal;
