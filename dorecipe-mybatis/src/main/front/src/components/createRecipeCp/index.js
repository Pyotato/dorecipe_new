import styled from "styled-components";

import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./style.css";
import BasicForm from "./basicForm";
import IngredientForm from "./ingredientForm";
import CompleteRecipe from "./completeRecipeForm";
import { SubmitRecipeBtn, DefaultBtn } from "../_common/buttons";
import RecipeOrderDrag from "./recipeStepForm";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { colors } from "../../theme/theme";
import { Toast } from "react-bootstrap";

const CreateRecipeForm = () => {
  const user = useSelector((auth) => auth);
  const [member_id, setMemberId] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const [saveState, setSaveState] = useState(0);
  const [recipeState, setRecipeState] = useState(0);
  // useDispatch(messageReducer(CLEAR_MESSAGE));

  // 임의로 페이지를 나가려고 할때 alert해주기
  window.onbeforeunload = function () {
    return "임시저장하지 않고 새로고침 시 정보가 저장되지 않을 수 있습니다.";
  };
  useEffect(() => {
    if (user.auth.isLoggedIn) {
      axios({
        method: "POST",
        url: "http://localhost:9000/recipe/getRecipeNum",
        // url: process.env.REACT_APP_HOST + "/recipe/getRecipeNum",
        headers: { "Content-Type": "multipart/form-data" },
        data: { member_id: user.auth.user.username, recipe_num: 0 },
      }).then((response) => {
        console.log("setRecipeState", response.data);
        setRecipeState(response.data);
      });
    } else {
      setMemberId(user.auth.user.username);
      navigate("/");
    }

    console.log("params : " + { params });
    console.log("CreateRecipeForm", user);
  }, [saveState]);

  return (
    <>
      <TotalWrap>
        <form encType="multipart/form-data">
          {saveState === 0 ? (
            // <BasicFormSection style={{ marginBottom: "9em" }}>
            <BasicFormSection>
              <div
                style={{
                  backgroundColor: "#CF702C",
                  float: "left",
                  marginTop: "6vh",
                  marginBottom: "6vh",
                  padding: "1vw 1vh",
                  fontWeight: "700",
                  fontFamily: "mainFont",
                }}
                recipeId={params}
              >
                레시피 등록
              </div>
              <BasicForm
                setRecipeState={setRecipeState}
                recipeState={recipeState}
                saveState={saveState}
                setSaveState={setSaveState}
              />
            </BasicFormSection>
          ) : (
            <>
              <Swiper
                style={{
                  backgroundColor: "yellow",
                  height: "100vh",
                }}
                modules={[Navigation, Pagination, A11y]}
                slidesPerView={1}
                loop={false}
                navigation
                spaceBetween={120}
                pagination={{ clickable: true }}
              >
                <SwiperSlide className="slide">
                  <div recipeId={params}>재료 등록</div>
                  <IngredientForm
                    setRecipeState={setRecipeState}
                    recipeState={recipeState}
                  />
                  {/* <IngredientForm recipeState={recipeState} swiper={swiper} /> */}
                </SwiperSlide>
                <SwiperSlide className="slide">
                  <div recipeId={params}>요리 순서</div>
                  <div>
                    <RecipeOrderDrag
                      recipeId={params}
                      recipeState={recipeState}
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                  <div>요리 완성</div>
                  <CompleteRecipe recipeState={recipeState} />
                </SwiperSlide>
              </Swiper>
            </>
          )}
        </form>
      </TotalWrap>
    </>
  );
};
export default CreateRecipeForm;

const TotalWrap = styled.div`
  font-style: "mainFont";
  margin-top: 12vh;
`;
const BasicFormSection = styled.div`
  width: 85%;
  height: 100vh;
  margin: 0 auto;
  border-radius: 2vw;
  padding-bottom: 6vh;
  height: fit-content;
  z-index: saveState==0 && 700;
  background-color: ${colors.color_beige_brown};
`;
