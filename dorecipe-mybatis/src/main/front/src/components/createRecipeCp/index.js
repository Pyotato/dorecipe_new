import styled from "styled-components";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// import "./style.css";
import BasicForm from "./basicForm";
import IngredientForm from "./ingredientForm";
import CompleteRecipe from "./completeRecipeForm";
import RecipeOrderDrag from "./recipeStepForm";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const CreateRecipeForm = () => {
  const user = useSelector((auth) => auth);
  const [member_id, setMemberId] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const [saveState, setSaveState] = useState(0);
  const [recipeState, setRecipeState] = useState(0);

  // 임의로 페이지를 나가려고 할때 alert해주기
  window.onbeforeunload = function () {
    return "임시저장하지 않고 새로고침 시 정보가 저장되지 않을 수 있습니다.";
  };
  useEffect(() => {
    window.scrollTo(0, 0);
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
    <TotalWrap>
      <form encType="multipart/form-data">
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

          <div recipeId={params}>
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
                fontFamily: "mainFont",
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
                fontFamily: "mainFont",
              }}
            >
              <FontAwesomeIcon icon={faLightbulb} /> 재료 이름과 재료량 순으로
              입력해주세요.
            </div>
            <IngredientForm
              setRecipeState={setRecipeState}
              recipeState={recipeState}
            />
          </div>

          <div recipeId={params}>
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
                fontFamily: "mainFont",
              }}
            >
              요리 순서
            </div>
            <div
              style={{
                float: "left",
                marginTop: "6vh",
                marginBottom: "3vh",
                padding: "1vw 1vh",
                fontFamily: "mainFont",
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
            <RecipeOrderDrag recipeId={params} recipeState={recipeState} />
          </div>

          <div recipeId={params}>
            <div
              style={{
                backgroundColor: "#CF702C",
                float: "left",
                marginTop: "6vh",
                marginBottom: "6vh",
                width: "8vw",
                textAlign: "center",
                padding: "1vw 1vh",
                fontWeight: "700",
                fontFamily: "mainFont",
              }}
            >
              요리 완성
            </div>
            <div
              style={{
                float: "left",
                marginTop: "6vh",
                marginBottom: "6vh",
                padding: "1vw 1vh",
                fontFamily: "mainFont",
              }}
            >
              <FontAwesomeIcon icon={faLightbulb} /> 완성 요리 사진 : 완성된
              사진을 등록하시면 레시피가 더욱 돋보입니다.
            </div>
            <CompleteRecipe recipeState={recipeState} />
          </div>
        </BasicFormSection>
      </form>
    </TotalWrap>
  );
};
export default CreateRecipeForm;

const TotalWrap = styled.div`
  font-style: "mainFont";
  height: 400vh;
  padding-bottom: 12vh;
  margin-top: 12vh;
  margin-bottom: 12vh;
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
