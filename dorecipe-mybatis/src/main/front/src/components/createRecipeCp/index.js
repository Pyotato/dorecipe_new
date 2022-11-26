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

  // const swiper = useSwiper();
  return (
    <>
      <form encType="multipart/form-data">
        {saveState === 0 ? (
          // <BasicFormSection style={{ marginBottom: "9em" }}>
          <BasicFormSection>
            <SectionTitle recipeId={params}>레시피 등록</SectionTitle>
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
                // marginBottom: "-6em",
              }}
              modules={[Navigation, Pagination, A11y]}
              slidesPerView={1}
              loop={false}
              // scrollbar={{ draggable: true }}
              navigation
              spaceBetween={120}
              pagination={{ clickable: true }}
              // onSlideChange={(swiper) => {
              //   swiper.allowSlidePrev(false);
              // }}
            >
              <SwiperSlide className="slide">
                <SectionTitle recipeId={params}>재료 등록</SectionTitle>
                <IngredientForm
                  setRecipeState={setRecipeState}
                  recipeState={recipeState}
                />
                {/* <IngredientForm recipeState={recipeState} swiper={swiper} /> */}
              </SwiperSlide>
              <SwiperSlide className="slide">
                <SectionTitle recipeId={params}>요리 순서</SectionTitle>
                <div>
                  <RecipeOrderDrag
                    recipeId={params}
                    recipeState={recipeState}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="slide">
                <SectionTitle>요리 완성</SectionTitle>
                <CompleteRecipe recipeState={recipeState} />
              </SwiperSlide>
            </Swiper>
          </>
        )}
      </form>
    </>
  );
};
export default CreateRecipeForm;
const BasicFormSection = styled.div`
  width: 100%;
  height: 100vh;
  /* background-color: pink; */
  z-index: saveState==0 && 700;
`;

const SectionTitle = styled.div`
  background-color: #8d3232;
  display: inline-block;
  width: 90%;
  margin: 1em 3em;
  color: #fffdf5;
  height: 2.4em;
  font-size: 21px;
  font-weight: 700;
  padding: 0.5em 0;
  padding-left: 0.5em;
`;
