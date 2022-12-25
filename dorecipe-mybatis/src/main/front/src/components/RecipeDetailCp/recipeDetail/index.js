import { useCallback, useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import StepRecipe from "./recipeSteps";
import RecipeIngredients from "./recipeIngredients";
import { useSelector } from "react-redux";
import { ReactComponent as EmptyHeart } from "../../../assets/EmptyHeart.svg";
import { ReactComponent as FilledHeart } from "../../../assets/FilledHeart.svg";
import { ReactComponent as DefaultProfile } from "../../../assets/DefaultProfile.svg";
import { ReactComponent as Ranking } from "../../../assets/Ranking.svg";
import { ReactComponent as Timer } from "../../../assets/Timer.svg";
import CommentCp from "../../commentCp";
import NotFoundPage from "../../../pages/errorPage";
import { colors } from "../../../theme/theme";

const RecipeDetailModal = () => {
  const search = "/";
  let location = useLocation();
  const lastIndex = location.pathname.lastIndexOf(search);
  const param = location.pathname.substring(lastIndex).replace("/", ""); //레시피 번호 가져오기
  const user = useSelector((auth) => auth);
  const params = useParams();
  const navigate = useNavigate();
  const recipeId = params.recipeId;
  console.log("user", user);
  console.log("recipeId", recipeId);
  // const [loginState, setLoginState] = useState("admin");
  const [loginState, setLoginState] = useState(user.auth.isLoggedIn);
  const [userState, setUserState] = useState(user.auth);
  // const params = params.recipeId;
  const [dataErrorState, setDataErrorState] = useState();
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
      member_imagePath: "",
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
  const [recipeWriterState, setRecipeWriterState] = useState([
    {
      member_id: "",

      member_imagePath: "",

      member_nickname: "",
    },
  ]);
  const [heartClickState, setHeartClickState] = useState(null);

  useEffect(() => {
    if (recipeId !== undefined) {
      axios
        .get("http://localhost:9000/recipe/search/details/" + recipeId)
        .then(function (response) {
          setDetailState(response.data);
          console.log("/search/details/", response.data);

          axios
            .get("http://localhost:9000/member/getProfileImgNickName", {
              params: { member_id: response.data[0].member_id },
            })
            .then(function (response) {
              setRecipeWriterState(response.data);
              console.log("getProfileImgNickName", response);
              // console.log("recipeWriterState", recipeWriterState);
            })
            .catch((e) => setDataErrorState(true));
        })
        .catch((e) => setDataErrorState(true));
      axios
        .get("http://localhost:9000/recipe/getIngredientList/" + recipeId)
        .then(function (response) {
          setIngredientState(response.data);
        })
        .catch((e) => setDataErrorState(true));
      axios
        .get("http://localhost:9000/recipe/getRecipeLikes/" + recipeId)
        .then(function (response) {
          // console.log("getRecipeLikes", response);
          response.data ? setRecipeLikes(response.data) : setRecipeLikes(0);
        })
        .catch((e) => setDataErrorState(true));

      if (loginState) {
        axios
          .get("http://localhost:9000/recipe/checkLikeType", {
            params: {
              recipe_num: parseInt(recipeId),
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
          .catch((e) => setDataErrorState(true));
      } else {
        setHeartState(0);
      }
    }
  }, []);
  console.log("detailState", detailState);
  useMemo(() => {
    axios
      .get("http://localhost:9000/recipe/getRecipeLikes/" + recipeId)
      .then(function (response) {
        // console.log("getRecipeLikes", response);
        response.data ? setRecipeLikes(response.data) : setRecipeLikes(0);
      })
      .catch((e) => setDataErrorState(true));
    if (loginState) {
      axios
        .get("http://localhost:9000/recipe/checkLikeType", {
          params: {
            recipe_num: parseInt(recipeId),
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
        .catch((e) => setDataErrorState(true));
    } else {
      setHeartState(0);
    }
  }, [heartState, recipe_likes, recipeId]);

  const onLikeHandler = () => {
    const params = recipeId;

    if (loginState) {
      if (heartState === 1) {
        // 좋아요를 누른 상태 ==> 좋아요 취소하기
        axios
          .get("http://localhost:9000/recipe/removeLikes", {
            params: {
              member_id: userState.user.username, //좋아요 누른 사람
              recipe_num: parseInt(params),
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
                recipe_num: parseInt(params),
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
                recipe_num: parseInt(params),
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
      {dataErrorState ? (
        // {params === undefined && detailState[0].recipe_title.length <= 0 ? (
        <NotFoundPage />
      ) : (
        <div
          style={{
            height: "fit-content",
            width: "100%",
            // minWidth: "33em",
            paddingTop: "21vh",
            paddingBottom: "18vh",
            fontSize: "1vw",
          }}
        >
          <div
            style={{
              textAlign: "center",
              // , display: "inline-flex"
            }}
          >
            <div>
              <h1>{detailState[0].recipe_title}</h1>
            </div>
            <div style={{ marginTop: "6vh" }}>
              <img
                style={{
                  width: "50vw",
                  height: "50vh",
                  borderRadius: "2vw 2vw 0 0",
                  transform: "translateY(0.5em)",
                }}
                src={detailState[0].recipe_rpath}
                alt={detailState[0].recipe_rpath}
              />

              <div
                style={{
                  width: "50vw",
                  margin: "0 auto",

                  backgroundColor: "#C2B196",
                  display: "inline-flex",
                  justifyContent: "space-between",
                  padding: "0.5vw",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5vw",
                  }}
                >
                  {recipeWriterState.member_imagePath ===
                  "데이터베이스에 업로드한 프로필 이미지경로.png" ? (
                    <>
                      <DefaultProfile
                        style={{
                          width: "3vw",
                          height: "3vw",
                          // margin: "0 1vw",
                          borderRadius: "100%",
                          // float: "left",
                        }}
                      />
                    </>
                  ) : (
                    <img
                      style={{
                        width: "3vw",
                        height: "3vw",
                        borderRadius: "100%",
                        // float: "left",
                      }}
                      src={recipeWriterState.member_imagePath}
                      alt={recipeWriterState.member_imagePath}
                    />
                  )}

                  <div style={{ float: "left" }}>
                    {" "}
                    {recipeWriterState.member_nickname}
                  </div>
                </div>
                <div
                  style={{
                    // width: "50vw",
                    gap: "1vw",
                    marginRight: "1vw",

                    // transform: "translateY(-1vw)",
                    // backgroundColor: "#C2B196",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <div>좋아요 {recipe_likes}</div>
                  {heartState === 1 ? (
                    <FilledHeart
                      style={{ width: "1.5vw", fill: "#CF702C" }}
                      onClick={() => onLikeHandler()}
                    />
                  ) : (
                    <EmptyHeart
                      style={{ width: "1vw" }}
                      onClick={() => onLikeHandler()}
                    />
                  )}
                </div>
              </div>
              <RecipeIntro
                style={{
                  width: "50vw",
                  margin: "0 auto",
                  backgroundColor: colors.color_beige_tinted_white,
                  // padding: "3vh 1vw",
                  // lineHeight: "1.6",
                }}
              >
                {/* {detailState[0].recipe_introduce.replace("\n",)} */}
                {detailState[0].recipe_introduce}
              </RecipeIntro>
              <div
                style={{
                  backgroundColor: "#FAF3E7",
                  width: "50vw",
                  borderRadius: "0 0 1vw 1vw",
                  margin: "0 auto",
                  // padding: "0 1vw",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    width: "70%",
                    gap: "2vw",

                    justifyContent: "center",
                    backgroundColor: "white",
                    // border: "1px solid black",
                    borderRadius: "0.5vw",
                    padding: "1vh 1vw",
                    margin: "3vh 0",
                  }}
                >
                  <div style={{ width: "33%" }}>
                    <Ranking style={{ width: "2vw", fontSize: "1vw" }} />{" "}
                    <div style={{ fontSize: "0.2vw" }}>
                      {detailState[0].information_level}
                    </div>
                  </div>
                  <div style={{ width: "33%" }}>
                    <Timer style={{ width: "2vw" }} />{" "}
                    <div style={{ fontSize: "0.2vw" }}>
                      {" "}
                      {detailState[0].information_time}
                    </div>
                  </div>
                  <div style={{ width: "33%", fontSize: "0.2vw" }}>
                    <div
                      style={{
                        fontSize: "0.4vw",
                        paddingBottom: "1vh",
                      }}
                    >
                      작성일
                    </div>
                    <div>{detailState[0].recipe_creDate.substring(0, 10)}</div>
                  </div>
                </div>
                <div
                  style={{
                    width: "70%",

                    backgroundColor: "white",
                    borderRadius: "0.5vw",

                    margin: "0 auto",
                    padding: "3vh 0",
                    marginBottom: "3vh",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "orange",
                      padding: "1vh 1vw",
                      width: "6vw",
                      fontWeight: "700",
                      // marginTop: "3vh",
                    }}
                  >
                    재료
                  </div>
                  <div>
                    <RecipeIngredients ingredientState={ingredientState} />
                  </div>
                </div>
                <div
                  style={{
                    width: "70%",

                    backgroundColor: "white",
                    borderRadius: "0.5vw",

                    margin: "0 auto",
                    padding: "3vh 0",
                    marginBottom: "3vh",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "orange",
                      padding: "1vh 1vw",
                      width: "6vw",
                      fontWeight: "700",
                      marginBottom: "3vh",
                    }}
                  >
                    조리순서
                  </div>
                  <div>
                    <StepRecipe detailState={detailState} />
                  </div>
                </div>
                <div
                  style={{
                    width: "70%",

                    backgroundColor: "white",
                    borderRadius: "0.5vw",

                    margin: "0 auto",
                    padding: "3vh 0",
                    marginBottom: "3vh",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "orange",
                      padding: "1vh 1vw",
                      width: "6vw",
                      fontWeight: "700",
                      marginBottom: "3vh",
                    }}
                  >
                    완성사진
                  </div>
                  <div>
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
                      </CompletedRecipeImages>
                    )}

                    {detailState[0].completion_path1 == null ? (
                      <></>
                    ) : (
                      <CompletedRecipeImages>
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
                </div>
                <div
                  style={{
                    width: "70%",

                    backgroundColor: "white",
                    borderRadius: "0.5vw",

                    margin: "0 auto",
                    padding: "3vh 0",
                    marginBottom: "3vh",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "orange",
                      padding: "1vh 1vw",
                      width: "6vw",
                      fontWeight: "700",
                      marginBottom: "3vh",
                    }}
                  >
                    요리TIP
                  </div>
                  <div>
                    {detailState[0].completion_tip ? (
                      <div
                        style={{
                          textAlign: "justify",
                          padding: "1vh 2vw",
                          lineHeight: "2",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {detailState[0].completion_tip}
                      </div>
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        등록된 레시피 꿀팁이 없습니다.
                      </div>
                    )}
                  </div>
                </div>
                {detailState[0].recipe_url !== "" &&
                detailState[0].recipe_url.includes("embed") ? (
                  <div
                    style={{
                      width: "70%",
                      backgroundColor: "white",
                      borderRadius: "0.5vw",

                      margin: "0 auto",
                      padding: "3vh 0",
                      marginBottom: "3vh",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "orange",
                        padding: "1vh 1vw",
                        width: "6vw",
                        fontWeight: "700",
                        marginBottom: "3vh",
                      }}
                    >
                      요리영상
                    </div>
                    <div>
                      <iframe
                        style={{ width: "30vw", height: "33vh" }}
                        allowfullscreen="true"
                        src={
                          detailState[0].recipe_url.includes("naver")
                            ? detailState[0].recipe_url.includes(
                                " 'frameborder"
                              )
                              ? detailState[0].recipe_url.slice(
                                  detailState[0].recipe_url.indexOf("https"),
                                  detailState[0].recipe_url.indexOf(
                                    " 'frameborder"
                                  )
                                )
                              : detailState[0].recipe_url
                            : detailState[0].recipe_url.includes("youtube")
                            ? detailState[0].recipe_url.includes('" title')
                              ? detailState[0].recipe_url.slice(
                                  detailState[0].recipe_url.indexOf("https"),
                                  detailState[0].recipe_url.indexOf('" title')
                                )
                              : detailState[0].recipe_url
                            : "null"
                        }
                        title={detailState[0].recipe_url}
                      ></iframe>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div style={{ paddingBottom: "3vh" }}>
                  <CommentCp />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const CompletedRecipeImages = styled.div`
  display: inline-flex;
  justify-content: center;
  gap: 2em;
  width: 100%;
`;

const Img = styled.img`
  overflow-x: hidden;
  padding: 1vw;
`;

const RecipeIntro = styled.div`
  white-space: pre-line;
  text-align: justify;
  padding: 3vh 1em;
  line-height: 2;
`;

export default RecipeDetailModal;
