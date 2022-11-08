import styled from "styled-components";

import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./style.css";
import BasicForm from "./basicForm";
import IngredientForm from "./ingredientForm";
import CompleteRecipe from "./completeRecipeForm";
import RecipeOrderDrag from "./recipeStepForm";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { historylocation } from "../../reduxRefresh/helpers/history";

const EditRecipeForm = () => {
  const user = useSelector((auth) => auth);
  const [member_id, setMemberId] = useState();
  const navigate = useNavigate();

  const params = historylocation.pathname.substring(
    historylocation.pathname.lastIndexOf("/") + 1, //현재위치
    historylocation.pathname.length
  );
  const [recipeNumState, setRecipeNumState] = useState(params);
  const [detailState, setDetailState] = useState();
  const [IngredieState, setIngredientState] = useState();
  // useDispatch(messageReducer(CLEAR_MESSAGE));
  useEffect(() => {
    if (user.auth.isLoggedIn) {
      setMemberId(user.auth.user.username);
      setRecipeNumState(params);

      axios
        .get(
          "http://localhost:9000/recipe/getIngredientList/" +
            historylocation.pathname.substring(
              historylocation.pathname.lastIndexOf("/") + 1, //현재위치
              historylocation.pathname.length
            )
        )
        .then((response) => {
          console.log("getIngredientList!!!!!!!!!!!!", response.data);
        })
        .catch((e) => console.log(e));
      // axios
      //   .get(
      //     // process.env.REACT_APP_HOST + "/recipe/update/" + params
      //     "http://localhost:9000/recipe/update/" + params
      //     // historylocation.pathname.substring(
      //     //   historylocation.pathname.lastIndexOf("/") + 1, //현재위치
      //     //   historylocation.pathname.length
      //     // )
      //   )
      //   .then((response) => {
      //     console.log("response", response.data);
      //   })
      //   .catch((e) => console.log(e));
      axios
        .get(
          // process.env.REACT_APP_HOST +
          "http://localhost:9000/recipe/temporary/" +
            historylocation.pathname.substring(
              historylocation.pathname.lastIndexOf("/") + 1, //현재위치
              historylocation.pathname.length
            )
        )
        .then((response) => {
          console.log("response", response.data);
        })
        .catch((e) => console.log(e));
      axios
        // .get(process.env.REACT_APP_HOST + "/recipe/getIngredientList/" + params)
        // .get("http://localhost:9000/recipe/getIngredientList/" + params)
        .get(
          "http://localhost:9000/recipe/getIngredientList/" +
            historylocation.pathname.substring(
              historylocation.pathname.lastIndexOf("/") + 1, //현재위치
              historylocation.pathname.length
            )
        )
        .then((response) => {
          setIngredientState(response.data);
          console.log("getIngredientList", response.data);
        })
        .catch((e) => console.log(e));
    } else {
      navigate("/");
    }
    console.log(
      "currentLocation : " +
        historylocation.pathname.substring(
          historylocation.pathname.lastIndexOf("/") + 1, //현재위치
          historylocation.pathname.length
        )
    );
    // console.log("historylocation : " + historylocation);
    // console.log("CreateRecipeForm", user);
  }, []);

  const [recipeState, setRecipeState] = useState();

  return (
    <>
      <FlexWrap>
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
      </FlexWrap>
    </>
  );
};
export default EditRecipeForm;
const FlexWrap = styled.div`
  max-width: 100%;
  min-width: 50%;

  height: 100vh;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: -6em 0;
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
