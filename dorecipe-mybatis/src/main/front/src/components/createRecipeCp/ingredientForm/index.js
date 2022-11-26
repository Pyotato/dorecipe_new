import styled from "styled-components";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faCircleMinus,
  faPlusCircle,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { SmallBtn } from "../../_common/buttons";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// const IngredientForm = ({ recipeState, swiper }) => {
const IngredientForm = () => {
  const user = useSelector((auth) => auth);
  const [recipeState, setRecipeState] = useState(0);

  useEffect(() => {
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
  }, []);

  const [ingredients, setIngredients] = useState([
    {
      recipe_num: recipeState,
      ingredient_num: 1,
      ingredient_name: "",
      ingredient_amount: "",
    },
  ]);

  console.log("recipeState", recipeState);

  const IngreAmountRef = useRef();
  const inputFocus = useRef();

  /**재료 추가 */
  const onAddIngredientHandler = () => {
    if (
      ingredients[ingredients.length - 1].ingredient_amount !== "" &&
      ingredients[ingredients.length - 1].ingredient_amount !== ""
    ) {
      let newIngredients = {
        recipe_num: ingredients[0].recipe_num,
        ingredient_num: ingredients.length + 1,
        ingredient_name: "",
        ingredient_amount: "",
      };
      setIngredients([...ingredients, newIngredients]);
      console.log(ingredients);
    } else {
      alert("재료를 입력란을 채우고 추가해주세요.");
    }
  };
  // useEffect(() => {
  //   // swiper.disable();
  //   alert(swiper);
  // }, []);
  /**재료 제거 */
  const removeIngredient = (index, e) => {
    const ingreCopy = [...ingredients];
    if (ingreCopy.length > 1) {
      ingreCopy.splice(index, 1);
      setIngredients(ingreCopy);
      // console.log(ingreCopy);
    } else {
      alert("재료는 1개 이상 넣어주세요.");
    }
  };

  const handleFormChange = (index, e) => {
    let ingreCopy = [...ingredients];
    ingreCopy[index][e.target.name] = e.target.value;
    setIngredients(ingreCopy);
  };

  const onTemporarySave = useCallback(
    (e) => {
      e.preventDefault();
      console.log("ingredients", ingredients);
      // let ingreCopy = [...ingredients];

      const data = ingredients;
      const blob = new Blob([JSON.stringify(data)], {
        type: "application.json",
      });
      console.log("data~~~~~~~~~~~", data);
      const formData = new FormData();
      formData.append("data", blob);
      //레시피 배열 수 만큼 append 시켜 주기
      for (let i = 0; i < data.length; i++) {
        formData.append(`orderVoList[${i}].recipe_num`, parseInt(recipeState));
        formData.append(`orderVoList[${i}].ing_num`, data[i].ingredient_num);
        formData.append(
          `orderVoList[${i}].ing_ingredient`,
          data[i].ingredient_name
        );
        formData.append(
          `orderVoList[${i}].ing_amount`,
          data[i].ingredient_amount
        );
      }

      axios({
        method: "POST",
        url: "/recipe/insertRecipeIngredients",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
        baseURL: "http://localhost:9000",
      }).then((response) => {
        console.log(response.data);
      });
    },
    [ingredients, recipeState]
  );

  return (
    <>
      <BasicFormWrap style={{ backgroundColor: "pink" }}>
        <div>
          <FontAwesomeIcon icon={faLightbulb} /> 재료 이름과 재료량 순으로
          입력해주세요
          <SmallBtn
            type="button"
            className="addIngreBtn"
            style={{ marginRight: "1em" }}
            onClick={onTemporarySave}
          >
            <FontAwesomeIcon icon={faFloppyDisk} /> 임시저장
          </SmallBtn>
        </div>
        <BundleWrap>
          <Scrollable>
            <div>
              {ingredients.map((item, index) => {
                return (
                  <>
                    <div className="recipeBundleWrap" key={index}>
                      <div className="recipeFlexBundle">
                        <div className="ingredientBundle">재료 {index + 1}</div>
                        <div className="bundleIngredientWrap">
                          <div className="bundleFlexDown">
                            <input
                              className="bundleIngredient bundleInput"
                              type="text"
                              ref={inputFocus}
                              onChange={(e) => {
                                handleFormChange(index, e);
                              }}
                              name="ingredient_name"
                              value={index.ingredient_name}
                              placeholder={
                                index % 4 == 0
                                  ? "소금"
                                  : index % 4 == 1
                                  ? "밀가루"
                                  : index % 4 == 2
                                  ? "계란"
                                  : index % 4 == 3
                                  ? "후추"
                                  : ""
                              }
                            />
                            <input
                              // onChange={onChangeInput}
                              // key={item.ingredient_id}
                              className="bundleIngredientAmount bundleInput"
                              type="text"
                              name="ingredient_amount"
                              ref={IngreAmountRef}
                              placeholder={
                                index % 4 === 0
                                  ? "1꼬집"
                                  : index % 4 === 1
                                  ? "300g"
                                  : index % 4 === 2
                                  ? "6알"
                                  : index % 4 === 3
                                  ? "1/2t"
                                  : ""
                              }
                              onChange={(e) => {
                                handleFormChange(index, e);
                              }}
                              value={index.ingredient_amount}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <SmallBtn
              type="button"
              className="addIngreBtn"
              style={{ marginTop: "1em" }}
              onClick={removeIngredient}
            >
              <FontAwesomeIcon icon={faCircleMinus} /> 재료 삭제
            </SmallBtn>
            <SmallBtn
              type="button"
              className="addIngreBtn"
              style={{ marginTop: "1em", marginRight: "1em" }}
              onClick={onAddIngredientHandler}
            >
              <FontAwesomeIcon icon={faPlusCircle} /> 재료 추가
            </SmallBtn>
          </Scrollable>
        </BundleWrap>
      </BasicFormWrap>
    </>
  );
};
export default IngredientForm;
const BasicFormWrap = styled.div`
  /* display: inline-flex; */
  color: #463635;
  margin: 0 4.5em;
  min-width: 60%;
  font-size: 14px;
  height: fit-content;
  /* background-color: aquamarine; */
  padding: 2em;
`;
const BundleWrap = styled.div`
  height: 55vh;
`;
const Scrollable = styled.section`
  width: 100%;
  margin: 1em auto;
  padding: 1em;
  & > div {
    padding: 2rem;
    height: 33em;
    overflow-y: auto;
    margin: 0 auto;

    ::-webkit-scrollbar {
      width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
      height: 30%;
      background-color: #463635;
    }
    ::-webkit-scrollbar-track {
      background-color: #fffdf5;
      border: 1px solid #463635;
    }
  }
`;
