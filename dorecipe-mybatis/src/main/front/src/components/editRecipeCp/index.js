import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@theme/theme";

import BasicForm from "./basicForm";
import IngredientForm from "./ingredientForm";
import CompleteRecipe from "./completeRecipeForm";
import RecipeOrderDrag from "./recipeStepForm";
// import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { historylocation } from "../../reduxRefresh/helpers/history";
// import { onUpdateRecipeIngredients } from "./dispatchAxios";
import {
  TemporaryRecipeState,
  // TemporarySaveOrders,
  UpdateRecipeComplete,
  UpdateRecipeIngredients,
} from "./tempRecipeState.js";
import { useInput } from "../../hooks/useInput";

const EditRecipeForm = () => {
  const user = useSelector((auth) => auth);
  const [member_id, setMemberId] = useState();
  const [recipeNumState, setRecipeNumState] = useState(0);
  const { recipeId } = useParams();
  const recipeNum = parseInt(recipeId);
  const [IngredientState, setIngredientState] = useState([]);
  const [orderState, setOrderState] = useState([]);
  // console.log("recipeNum", typeof recipeNum);
  const [saveState, setSaveState] = useState(0);
  const [recipeState, setRecipeState] = useState([]);
  const [btnState, setBtnState] = useState(0);
  const [ingredients, setIngredients] = useState([
    {
      recipe_num: recipeNum,
      // recipe_num: parseInt(recipeId.recipeId),
      ing_num: 1,
      ing_ingredient: "",
      ing_amount: "",
    },
  ]);
  const [stepState, setStep] = useState([
    {
      recipe_num: recipeNum, //레시피 등록 번호,
      // recipe_num: parseInt(recipeId.recipeId), //레시피 등록 번호,
      order_num: 1,
      order_explain: "",
      order_path: "",
    },
    {
      recipe_num: recipeNum,
      order_num: 2,
      order_explain: "",
      order_path: "",
    },
    {
      recipe_num: recipeNum,
      order_num: 3,
      order_explain: "",
      order_path: "",
    },
  ]);

  const [totalInfoState, setTotalInfoState] = useState(recipeState);

  const [recipe_title, setRecipeTitle] = useState("");

  const [recipe_introduce, onChangeRecipeIntro, setRecipeIntro] = useInput("");
  const [recipe_url, onChangeRecipeUrl, setRecipeUrl] = useInput("");
  const [recipe_rpath, onChangeRecipeThumbnail, setRecipeThumbnail] =
    useInput("");
  const [category_kind, onChangeKind, setKind] = useInput("");
  const [category_theme, onChangeTheme, setRecipeTheme] = useInput("");
  const [category_way, onChangeWay, setRecipeWay] = useInput("");
  const [category_ing, onChangeIngr, setRecipeIngre] = useInput("");
  const [information_person, onChangeServingSize, setServingSize] =
    useInput("");
  const [information_time, onChangeTime, setTime] = useInput("");
  const [information_level, onChangeLevel, setLevel] = useInput("");

  const [files, setFiles] = useState("");
  const [recipe_thumbnail, setRecipeImgFiles] = useState("");
  const [thumbnailDropState, setThumbnailDropState] = useState("thumbnailDrop");

  //썸네일 변경 버튼
  const [thumbnailChangeState, setThumbnailChangeState] = useState(0);

  //모달창
  const [explanationState, setExplanationState] = useState("none");

  //임시저장 버튼
  const [tempSaveState, setTempSaveState] = useState(0);
  const [btnDisabledState, setBtnDisabledState] = useState(false);
  const [btnDisplayState, setBtnDisplayState] = useState("block");

  // 데이터 로드
  const [loadState, setLoadState] = useState(true);

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, []);

  useEffect(() => {
    if (user.auth.isLoggedIn) {
      setMemberId(user.auth.user.username);
      setRecipeNumState(recipeNum);
      TemporaryRecipeState({
        setRecipeState,
        recipeNum,
        setIngredientState,
        setOrderState,
      });
    }
  }, []);
  useCallback(() => {
    TemporaryRecipeState({
      setRecipeState,
      recipeNum,
      setIngredientState,
      setOrderState,
    });
  }, [recipeState]);

  useCallback(() => {
    UpdateRecipeIngredients({
      ingredients,
      IngredientState,
      recipeNum,
    });
  }, [ingredients, IngredientState]);

  // useCallback(() => {
  //   TemporarySaveOrders({ stepState, recipeNum, orderState });
  // }, [stepState, orderState]);

  return (
    <>
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
              // recipeId={recipeId}
            >
              레시피 수정
            </div>

            <BasicForm
              setRecipeState={setRecipeState}
              recipeState={recipeState}
              saveState={saveState}
              setSaveState={setSaveState}
              btnState={btnState}
              recipeNum={recipeNum}
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
                recipeNum={recipeNum}
                setBtnState={setBtnState}
                IngredientState={IngredientState}
                setIngredientState={setIngredientState}
                ingredients={ingredients}
                setIngredients={setIngredients}
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
                // recipeId={recipeId}
                recipeNum={recipeNum}
                recipeState={recipeState}
                setRecipeState={setRecipeState}
                btnState={btnState}
                setBtnState={setBtnState}
                orderState={orderState}
                setOrderState={setOrderState}
                stepState={stepState}
                setStep={setStep}
              />
            </div>

            <div
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
                recipeNum={recipeNum}
              />
            </div>
            <div
              // recipeId={recipeId}
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

const TotalWrap = styled.div`
  font-style: "mainFont";
  padding-bottom: 12vh;
  margin-top: 12vh;
`;
const BasicFormSection = styled.div`
  width: 85%;
  min-width: 33em;
  /* min-width: 30em; */
  height: fit-content;
  margin: 0 auto;
  border-radius: 2vw;
  padding-bottom: 6vh;
  height: fit-content;
  z-index: saveState==0 && 700;
  background-color: ${colors.color_beige_brown};
`;
