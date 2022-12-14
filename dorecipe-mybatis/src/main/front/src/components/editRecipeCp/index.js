import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../theme/theme";

import BasicForm from "./basicForm";
import IngredientForm from "./ingredientForm";
import CompleteRecipe from "./completeRecipeForm";
import RecipeOrderDrag from "./recipeStepForm";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { historylocation } from "../../reduxRefresh/helpers/history";

const EditRecipeForm = () => {
  const user = useSelector((auth) => auth);
  const [member_id, setMemberId] = useState();
  const navigate = useNavigate();
  // const recipeId = useParams();
  // const recipeId = historylocation.pathname.substring(
  //   historylocation.pathname.lastIndexOf("/") + 1, //현재위치
  //   historylocation.pathname.length
  // );
  const [recipeNumState, setRecipeNumState] = useState(0);
  const [detailState, setDetailState] = useState([]);
  const { recipeId } = useParams();
  const [IngredientState, setIngredientState] = useState([]);
  const [orderState, setOrderState] = useState([]);

  const [saveState, setSaveState] = useState(0);
  const [recipeState, setRecipeState] = useState([]);
  const [btnState, setBtnState] = useState(0);
  // const [recipeState, setRecipeState] = useState();

  useEffect(() => {
    if (user.auth.isLoggedIn) {
      setMemberId(user.auth.user.username);
      setRecipeNumState(recipeId);
      console.log(recipeId);

      axios
        .get("http://localhost:9000/recipe/temporary/" + recipeId)
        .then((response) => {
          // console.log("/recipe/temporary/", response.data);
          setRecipeState(response.data);
        })
        .catch((e) => console.log(e));
      axios
        .get("http://localhost:9000/recipe/getIngredientList/" + recipeId)
        .then((response) => {
          // console.log("recipe/getIngredientList/", response.data);
          setIngredientState(response.data);
        })
        .catch((e) => console.log(e));
      axios
        .get("http://localhost:9000/recipe/temporary/getOrder/" + recipeId)
        .then((response) => {
          // console.log("recipe/getOrder/", response.data);
          setOrderState(response.data);
        })
        .catch((e) => console.log(e));
    }
  }, []);
  //     axios
  //       .get(
  //         // process.env.REACT_APP_HOST +
  //         "http://localhost:9000/recipe/temporary/" + recipeId
  //         // historylocation.pathname.substring(
  //         //   historylocation.pathname.lastIndexOf("/") + 1, //현재위치
  //         //   historylocation.pathname.length
  //         // )
  //       )
  //       .then((response) => {
  //         console.log("/recipe/temporary/", response.data);
  //       })
  //       .catch((e) => console.log(e));
  //     axios
  //       .get(
  //         // process.env.REACT_APP_HOST +
  //         "http://localhost:9000/recipe/temporary/" + recipeId
  //         // historylocation.pathname.substring(
  //         //   historylocation.pathname.lastIndexOf("/") + 1, //현재위치
  //         //   historylocation.pathname.length
  //         // )
  //       )
  //       .then((response) => {
  //         console.log("response", response.data);
  //       })
  //       .catch((e) => console.log(e));
  //     axios
  //       .get(
  //         "http://localhost:9000/recipe/getIngredientList/" +
  //           //   historylocation.pathname.substring(
  //           //     historylocation.pathname.lastIndexOf("/") + 1, //현재위치
  //           //     historylocation.pathname.length
  //           //   )
  //           recipeId
  //         // parseInt(
  //         //   historylocation.pathname.substring(
  //         //     historylocation.pathname.lastIndexOf("/") + 1, //현재위치
  //         //     historylocation.pathname.length
  //         //   )
  //         // )
  //       )
  //       .then((response) => {
  //         console.log("recipeId!!!!!!!!!!!!", recipeId);
  //         console.log("getIngredientList!!!!!!!!!!!!", response.data);
  //       })
  //       .catch((e) => console.log(e));
  //     // axios
  //     //   .get(
  //     //     // process.env.REACT_APP_HOST + "/recipe/update/" + recipeId
  //     //     "http://localhost:9000/recipe/update/" + recipeId
  //     //     // historylocation.pathname.substring(
  //     //     //   historylocation.pathname.lastIndexOf("/") + 1, //현재위치
  //     //     //   historylocation.pathname.length
  //     //     // )
  //     //   )
  //     //   .then((response) => {
  //     //     console.log("response", response.data);
  //     //   })
  //     //   .catch((e) => console.log(e));

  return (
    <>
      {/* <FlexWrap>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={1}
          loop={false}
          navigation
          spaceBetween={120}
          pagination={{ clickable: false }}
          onSlideChange={() => {
            // if (!recipeNumState) {
            //   axios({
            //     method: "POST",
            //     url: "http://localhost:9000/recipe/getRecipeNum",
            //     headers: { "Content-Type": "multipart/form-data" },
            //     data: { member_id: user.auth.user.username, recipe_num: 0 },
            //   }).then((response) => {
            //     console.log(response.data);
            //     setRecipeState(response.data);
            //   });
            // }
          }}
        >
          <form encType="multipart/form-data">
            <SwiperSlide className="slide" recipeId={recipeState}>
              <SectionTitle>레시피 등록</SectionTitle>
              <BasicForm />
            </SwiperSlide>
            <SwiperSlide className="slide" recipeId={recipeState}>
              <SectionTitle>재료 등록</SectionTitle>
              <IngredientForm recipeState={recipeState} />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <SectionTitle recipeId={recipeState}>요리 순서</SectionTitle>
              <div>
                <RecipeOrderDrag
                  recipeId={recipeState}
                  recipeState={recipeState}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="slide" recipeId={recipeState}>
              <SectionTitle>요리 완성</SectionTitle>
              <CompleteRecipe
                recipeState={recipeState}
                recipeId={recipeState}
              />
            </SwiperSlide>
          </form>
        </Swiper>
      </FlexWrap> */}
      <TotalWrap>
        <form encType="multipart/form-data" style={{ height: "fit-content" }}>
          <BasicFormSection>
            <div
              style={{
                backgroundColor: "#CF702C",
                float: "left",
                marginTop: "12vh",
                marginBottom: "6vh",
                width: "8vw",
                textAlign: "center",
                padding: "1vw 1vh",
                fontWeight: "700",
              }}
              recipeId={recipeId}
            >
              레시피 등록
            </div>

            <BasicForm
              recipeId={recipeId}
              setRecipeState={setRecipeState}
              recipeState={recipeState}
              saveState={saveState}
              setSaveState={setSaveState}
              btnState={btnState}
              setBtnState={setBtnState}
            />

            <div recipeId={recipeId}>
              <div
                style={{
                  backgroundColor: "#CF702C",
                  float: "left",
                  marginTop: "18vh",
                  marginBottom: "3vh",
                  width: "8vw",
                  textAlign: "center",
                  padding: "1vw 1vh",
                  fontWeight: "700",
                }}
              >
                재료 등록
              </div>
              <div
                style={{
                  float: "left",
                  marginTop: "18vh",
                  marginBottom: "3vh",
                  padding: "1vw 1vh",
                }}
              >
                <FontAwesomeIcon icon={faLightbulb} /> 재료 이름과 재료량 순으로
                입력해주세요.
              </div>
              <IngredientForm
                setRecipeState={setRecipeState}
                recipeState={recipeState}
                btnState={btnState}
                setBtnState={setBtnState}
                IngredientState={IngredientState}
                setIngredientState={setIngredientState}
              />
            </div>

            <div recipeId={recipeId}>
              <div
                style={{
                  backgroundColor: "#CF702C",
                  float: "left",
                  marginTop: "9vh",
                  marginBottom: "3vh",
                  width: "8vw",
                  textAlign: "center",
                  padding: "1vw 1vh",
                  fontWeight: "700",
                }}
              >
                요리 순서
              </div>
              <div
                style={{
                  float: "left",
                  marginTop: "2.8em",
                  // marginBottom: "3vh",
                  padding: "3vh 1vh",

                  lineHeight: "2",
                }}
              >
                <div>
                  <FontAwesomeIcon icon={faLightbulb} /> 요리의 맛이 좌우될 수
                  있는 중요한 부분을 상세하게 적어주세요!
                </div>
                <div>
                  <FontAwesomeIcon icon={faLightbulb} /> 순서를 잡고 드래그해서
                  이리저리 옮겨보실 수 있습니다.
                </div>
              </div>
              <RecipeOrderDrag
                recipeId={recipeId}
                recipeState={recipeState}
                setRecipeState={setRecipeState}
                btnState={btnState}
                setBtnState={setBtnState}
                orderState={orderState}
                setOrderState={setOrderState}
              />
            </div>

            <div
              recipeId={recipeId}
              style={{
                marginBottom: "9vh",
              }}
            >
              <div
                style={{
                  backgroundColor: "#CF702C",
                  float: "left",
                  marginTop: "9vh",
                  width: "8vw",
                  textAlign: "center",
                  padding: "1vw 1vh",
                  fontWeight: "700",
                }}
              >
                요리 완성
              </div>
              <div
                style={{
                  float: "left",
                  marginTop: "9vh",
                  marginBottom: "6vh",
                  padding: "1vw 1vh",
                }}
              >
                <FontAwesomeIcon icon={faLightbulb} /> 완성 요리 사진 : 완성된
                사진을 등록하시면 레시피가 더욱 돋보입니다.
              </div>
              <CompleteRecipe
                recipeState={recipeState}
                btnState={btnState}
                setBtnState={setBtnState}
                setRecipeState={setRecipeState}
              />
            </div>
            <div
              recipeId={recipeId}
              style={{
                marginBottom: "9vh",
              }}
            ></div>
          </BasicFormSection>
        </form>
      </TotalWrap>
    </>
  );
};
export default EditRecipeForm;
// const FlexWrap = styled.div`
//   max-width: 100%;
//   min-width: 50%;

//   height: 100vh;
//   display: inline-flex;
//   flex-wrap: wrap;
//   justify-content: space-evenly;
//   margin: -6em 0;
// `;
// const SectionTitle = styled.div`
//   background-color: #8d3232;
//   display: inline-block;
//   width: 90%;
//   margin: 1em 3em;
//   color: #fffdf5;
//   height: 2.4em;
//   font-size: 21px;
//   font-weight: 700;
//   padding: 0.5em 0;
//   padding-left: 0.5em;
// `;
const TotalWrap = styled.div`
  font-style: "mainFont";
  padding-bottom: 12vh;
  margin-top: 12vh;
`;
const BasicFormSection = styled.div`
  width: 85%;

  height: fit-content;
  margin: 0 auto;
  border-radius: 2vw;
  padding-bottom: 6vh;
  height: fit-content;
  z-index: saveState==0 && 700;
  background-color: ${colors.color_beige_brown};
`;

const ContentTextarea = styled.textarea`
  font-family: "mainFont";
  resize: none;
  width: 80%;
  margin: auto 8.3vw;
  height: 24vh;
  margin-bottom: 1vh;
  line-height: 1.5;
  padding: 10px;
  background-color: ${colors.color_white};
  border: 1px solid transparent;
  border-radius: 0.5em;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const BtnWrap = styled.div`
  display: flex;
`;
