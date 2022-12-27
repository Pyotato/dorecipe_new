import styled from "styled-components";

import BasicForm from "./basicForm";
import IngredientForm from "./ingredientForm";
import CompleteRecipe from "./completeRecipeForm";
import RecipeOrderDrag from "./recipeStepForm";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "@theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const CreateRecipeForm = () => {
  const user = useSelector((auth) => auth);
  const [member_id, setMemberId] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const [saveState, setSaveState] = useState(0);
  const [recipeState, setRecipeState] = useState(0);
  const [btnState, setBtnState] = useState(0);

  // 임의로 페이지를 나가려고 할때 alert해주기
  // window.onbeforeunload = function () {
  //   return "임시저장하지 않고 새로고침 시 정보가 저장되지 않을 수 있습니다.";
  // };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
            recipeId={params}
          >
            레시피 등록
          </div>

          <BasicForm
            setRecipeState={setRecipeState}
            recipeState={recipeState}
            saveState={saveState}
            setSaveState={setSaveState}
            btnState={btnState}
            setBtnState={setBtnState}
          />

          <div>
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
            />
          </div>

          <div>
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
                marginTop: "7vh",
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
              recipeId={params}
              recipeState={recipeState}
              setRecipeState={setRecipeState}
              btnState={btnState}
              setBtnState={setBtnState}
            />
          </div>

          <div
            recipeId={params}
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
            recipeId={params}
            style={{
              marginBottom: "9vh",
            }}
          ></div>
        </BasicFormSection>
      </form>
    </TotalWrap>
  );
};
export default CreateRecipeForm;

const TotalWrap = styled.div`
  font-style: "mainFont";
  padding-bottom: 12vh;
  margin-top: 12vh;
`;
const BasicFormSection = styled.div`
  width: 85%;
  min-width: 50em;

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
