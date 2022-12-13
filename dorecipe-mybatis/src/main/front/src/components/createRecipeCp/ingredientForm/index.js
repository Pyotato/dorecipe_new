import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleMinus,
  faPlusCircle,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ReactComponent as Pin } from "../../../assets/Pin.svg";
import { colors } from "../../../theme/theme";
import { useMemo } from "react";
import "./style.css";
const IngredientForm = ({
  btnState,
  setBtnState,
  recipeState,
  setRecipeState,
}) => {
  const user = useSelector((auth) => auth);
  // const [recipeState, setRecipeState] = useState(0);
  const [btnDisabledState, setBtnDisabledState] = useState(false);
  const [btnDisplayState, setBtnDisplayState] = useState("none");

  const [ingredients, setIngredients] = useState([
    {
      recipe_num: recipeState,
      ingredient_num: 1,
      ingredient_name: "재료명",
      ingredient_amount: "재료량",
    },
  ]);

  //레시피 등록한 레시피번호 가져오기
  useMemo(() => {
    axios({
      method: "POST",
      url: "http://localhost:9000/recipe/getRecipeNum",
      // url: process.env.REACT_APP_HOST + "/recipe/getRecipeNum",
      headers: { "Content-Type": "multipart/form-data" },
      data: { member_id: user.auth.user.username, recipe_num: 0 },
    }).then((response) => {
      console.log("setRecipeState , IngredientForm:", response.data);
      setRecipeState(response.data);
    });
  }, [recipeState]);

  useMemo(() => {
    if (btnState === 1) {
      setBtnDisabledState(false);
      setBtnDisplayState("block");
    } else {
      setBtnDisabledState(true);
      setBtnDisplayState("none");
    }
  }, [btnState]);
  // console.log("recipeState", recipeState);

  const IngreAmountRef = useRef();
  const inputFocus = useRef();
  const endPointPosition = useRef();

  // console.log("scroll", endPointPosition.scrollTop);
  // useMemo(() => {
  //   console.log("scroll", window.scrollY);
  // }, [endPointPosition.current.offsetTop]);

  // console.log("btnPosition", btnPosition.current.offsetTop);
  // console.log("endPointPosition", endPointPosition.current.offsetTop);
  /**재료 추가 */
  const onAddIngredientHandler = () => {
    if (
      ingredients[ingredients.length - 1].ingredient_amount !== "" &&
      ingredients[ingredients.length - 1].ingredient_amount !== ""
    ) {
      let newIngredients = {
        // recipe_num: ingredients[0].recipe_num,
        recipe_num: ingredients.length + 1,
        ingredient_num: ingredients.length + 1,
        ingredient_name: "",
        ingredient_amount: "",
      };
      setIngredients([...ingredients, newIngredients]);
      // console.log(ingredients);
      // alert(inputFocus.current.value);
      ingredients[ingredients.length - 1].focus();
    } else {
      alert("재료를 입력란을 채우고 추가해주세요.");
    }
  };

  /**재료 제거 */
  const removeIngredient = (index, e) => {
    const ingreCopy = [...ingredients];
    if (ingreCopy.length > 1) {
      ingreCopy.splice(ingredients.length - 1, 1);
      setIngredients(ingreCopy);
      // console.log("removeIngredient", ingreCopy);
    } else {
      setIngredients([
        {
          recipe_num: recipeState,
          ingredient_num: 1,
          ingredient_name: "재료명",
          ingredient_amount: "재료량",
        },
      ]);
      alert("재료는 1개 이상 입력해주세요.");
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
      if (btnState === 1) {
        const data = ingredients;
        const blob = new Blob([JSON.stringify(data)], {
          type: "application.json",
        });
        const formData = new FormData();
        formData.append("data", blob);
        //레시피 배열 수 만큼 append 시켜 주기
        for (let i = 0; i < data.length; i++) {
          formData.append(
            `orderVoList[${i}].recipe_num`,
            parseInt(recipeState)
          );
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
        })
          .then((response) => {
            console.log(response.data);
            setBtnState(2);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("레시피 임시저장 버튼 1회 이상 클릭했음..");
      }
    },
    // [ingredients, recipeState, btnState]
    [ingredients, recipeState]
  );

  return (
    <>
      <div>
        <TempSaveBtn
          type="button"
          onClick={onTemporarySave}
          disabled={btnDisabledState}
          style={{ display: btnDisplayState }}
        >
          <FontAwesomeIcon icon={faFloppyDisk} /> <div>임시저장</div>
        </TempSaveBtn>
      </div>
      <BasicFormWrap
        style={{
          marginTop: "15vh",
          clear: "left",
        }}
        ref={endPointPosition}
      >
        <div
          style={{
            display: "inline-flex",
            width: "100%",
          }}
        >
          {/* 재료 리스트 칼럼 2개로 나뉘어서 표시되도록 */}
          <div
            style={{
              width: "50%",
              backgroundColor: "#FFFFFF",
              borderRadius: "1vw",
              display: "inline-flex",
              padding: "4vh 2vw",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                width: "100%",

                height: "100%",
                flexDirection: "column",
              }}
            >
              {ingredients.map((v) => {
                return (
                  <>
                    {ingredients.length <= 10 ? (
                      <>
                        {v.ingredient_num <= 10 && (
                          <div
                            key={v}
                            style={{
                              height: "3vh",
                              margin: "1vh",
                              display: "inline-flex",
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "space-around",
                            }}
                          >
                            <Pin style={{ width: "1vw" }} />
                            <div style={{ width: "40%" }}>
                              {v.ingredient_name}
                            </div>
                            <div style={{ width: "40%" }}>
                              {v.ingredient_amount}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div style={{ width: "100%", height: "100%" }}>
                        {v.ingredient_num <= ingredients.length / 2 && (
                          <div
                            key={v}
                            style={{
                              height: "3vh",
                              margin: "1vh",
                              display: "inline-flex",
                              width: "90%",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Pin style={{ width: "1vw" }} />
                            <div>{v.ingredient_name}</div>
                            <div>{v.ingredient_amount}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                );
              })}
            </div>
            {ingredients.length > 10 ? (
              <div
                style={{
                  display: "inline-flex",
                  width: "100%",
                  height: "100%",
                  flexDirection: "column",
                }}
              >
                {ingredients.map((v) => {
                  return (
                    <>
                      {ingredients.length > 10 && (
                        <>
                          {v.ingredient_num > ingredients.length / 2 && (
                            <div
                              key={v}
                              style={{
                                height: "3vh",
                                margin: "1vh",
                                display: "inline-flex",
                                width: "90%",
                                flexWrap: "wrap",
                                alignItems: "center",

                                justifyContent: "space-between",
                              }}
                            >
                              <Pin style={{ width: "1vw" }} />

                              <div>{v.ingredient_name}</div>
                              <div>{v.ingredient_amount}</div>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  );
                })}
              </div>
            ) : null}
          </div>
          {/* 등록 section */}
          <div style={{ width: "50%" }}>
            <BundleWrap>
              <Scrollable>
                <div>
                  {ingredients.map((item, index) => {
                    return (
                      <>
                        <div className="recipeBundleWrap" key={index}>
                          <div className="recipeFlexBundle">
                            <div className="bundleIngredientWrap">
                              <div className="bundleFlexDown">
                                <div style={{ width: "20%" }}>
                                  재료 {index + 1}
                                </div>
                                <input
                                  style={{ width: "40%" }}
                                  className="bundleIngredient bundleInput"
                                  type="text"
                                  ref={inputFocus}
                                  onChange={(e) => {
                                    handleFormChange(index, e);
                                  }}
                                  name="ingredient_name"
                                  value={index.ingredient_name}
                                  placeholder={
                                    index % 4 === 0
                                      ? "소금"
                                      : index % 4 === 1
                                      ? "밀가루"
                                      : index % 4 === 2
                                      ? "계란"
                                      : index % 4 === 3
                                      ? "후추"
                                      : ""
                                  }
                                />
                                <input
                                  style={{ width: "40%" }}
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
                <Btn type="button" onClick={removeIngredient}>
                  <FontAwesomeIcon icon={faCircleMinus} /> 재료 삭제
                </Btn>
                <Btn
                  type="button"
                  style={{ marginRight: "1em" }}
                  onClick={onAddIngredientHandler}
                >
                  <FontAwesomeIcon icon={faPlusCircle} /> 재료 추가
                </Btn>
              </Scrollable>
            </BundleWrap>
          </div>
        </div>
      </BasicFormWrap>
    </>
  );
};
export default IngredientForm;
const BasicFormWrap = styled.div`
  margin: 0 auto;
  list-style: none;
  font-family: "mainFont";
  font-size: 1vw;
  height: fit-content;
  padding: 2vw;

  & input {
    font-family: "mainFont";
    background-color: ${colors.color_greyish_white};
    border: 1px solid transparent;
  }

  & .recipeBundleWrap {
    border: 1px solid transparent;
    background-color: ${colors.color_white};
  }

  & .bundleIngredientWrap {
    display: inline-flex;
    flex-direction: column;
  }

  & .bundleFlexDown {
    display: inline-flex;
    align-items: center;
    margin-bottom: 0;
  }
`;
const BundleWrap = styled.div`
  height: 55vh;
`;

const Scrollable = styled.section`
  width: 100%;
  height: 75vh;

  & > div {
    height: 60vh;
    overflow-y: auto;
    margin: 0 auto;

    ::-webkit-scrollbar {
      width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
      height: 30%;
      background-color: ${colors.color_beige_tinted_white};
    }
    ::-webkit-scrollbar-track {
      background-color: ${colors.color_milktea_brown};
      border: 1px solid ${colors.color_beige_brown};
    }
  }
`;
const Btn = styled.button`
  font-family: "mainFont";
  border: 1px solid transparent;
  border-radius: 0.5vw;
  background-color: ${colors.color_brown};
  color: ${colors.color_beige_white};
  padding: 1vh 1vw;
  margin-top: 3vh;
  float: right;
  &:hover {
    background-color: ${colors.color_carrot_orange};
    cursor: pointer;
  }
`;
const TempSaveBtn = styled.button`
  width: 5em;
  height: 5em;
  border-radius: 100%;
  padding: 0.5em;
  position: fixed;
  right: 1.5vw;
  bottom: 3vh;
  /* background-color: ${colors.color_beige_brown}; */
  background-color: blue;
  border: 1px solid transparent;

  &:hover {
    cursor: pointer;
    transform: scaleX(1.2) scaleY(1.2);
    background-color: ${colors.color_carrot_orange};
    color: ${colors.color_beige_tinted_white};
  }
`;
