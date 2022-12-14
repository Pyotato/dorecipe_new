import styled from "styled-components";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faCircleMinus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { colors } from "../../../theme/theme";
import { ReactComponent as Pin } from "../../../assets/Pin.svg";
import { useParams } from "react-router-dom";

const IngredientForm = ({
  btnState,
  setBtnState,
  recipeState,
  // setRecipeState,
  setIngredientState,
  IngredientState,
}) => {
  const recipeId = useParams();
  // console.log("IngredientForm", recipeId.recipeId);
  console.log("btnState", btnState);
  const [ingredients, setIngredients] = useState([
    // {
    //   recipe_num: parseInt(recipeId.recipeId),
    //   ing_num: 1,
    //   ing_ingredient: "",
    //   ing_amount: "",
    // },
  ]);

  const IngreAmountRef = useRef();
  const inputFocus = useRef();
  const endPointPosition = useRef();

  const [btnDisabledState, setBtnDisabledState] = useState(false);
  const [btnDisplayState, setBtnDisplayState] = useState("none");

  const [loadState, setLoadState] = useState(true);

  useEffect(() => {
    if (btnState === 1) {
      setBtnDisplayState("block");
    }
  }, []);
  /**재료 추가 */
  // const onAddIngredientHandler = useMemo(() => {
  //   if (
  //     ingredients[ingredients.length - 1].ing_amount !== "" &&
  //     ingredients[ingredients.length - 1].ing_amount !== ""
  //   ) {
  //     let newIngredients = {
  //       recipe_num: ingredients[0].recipe_num,
  //       ingredient_num: ingredients.length + 1,
  //       ing_ingredient: "",
  //       ing_amount: "",
  //     };
  //     setIngredients([...ingredients, newIngredients]);
  //     console.log(ingredients);
  //   } else {
  //     alert("재료를 입력란을 채우고 추가해주세요.");
  //   }
  // }, [ingredients.length]);
  const onAddIngredientHandler = () => {
    if (
      ingredients[ingredients.length - 1].ing_amount !== "" &&
      ingredients[ingredients.length - 1].ing_amount !== ""
    ) {
      let newIngredients = {
        recipe_num: ingredients[0].recipe_num,
        // recipe_num: IngredientState[0].recipe_num,
        ing_num: ingredients.length + 1,
        ing_ingredient: "",
        ing_amount: "",
      };
      setIngredients([...ingredients, newIngredients]);
      console.log(ingredients);
    } else {
      alert("재료를 입력란을 채우고 추가해주세요.");
    }
  };

  /**재료 제거 */
  const removeIngredient = (index, e) => {
    const ingreCopy = [...ingredients];
    if (ingreCopy.length > 1) {
      ingreCopy.pop();
      setIngredients(ingreCopy);
    } else {
      alert("재료는 1개 이상 넣어주세요.");
    }
  };

  // const handleFormChange = useCallback(
  //   (index, item, e) => {
  //     let ingreCopy = [...ingredients];

  //     console.log("handleFormChange", item);
  //     console.log("handleFormChange e.target.name", e.target.name);
  //     ingreCopy[index][e.target.name] = e.target.value;
  //     console.log("ingreCopy", ingreCopy);
  //     // ingreCopy[index][e.target.name] = e.target.value;
  //     // ingreCopy[index].item = e.target.value;
  //     setIngredients(ingreCopy);
  //   },
  //   [ingredients]
  // );
  const handleFormChange = (index, item, e) => {
    let ingreCopy = [...ingredients];

    console.log("handleFormChange", item);
    console.log("handleFormChange e.target.name", e.target.name);
    ingreCopy[index][e.target.name] = e.target.value;
    console.log("ingreCopy", ingreCopy);
    // ingreCopy[index][e.target.name] = e.target.value;
    // ingreCopy[index].item = e.target.value;
    setIngredients(ingreCopy);
  };

  // const onTemporarySave = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     console.log("ingredients", ingredients);
  //     let ingreCopy = [...ingredients];

  //     const data = ingredients;
  //     const blob = new Blob([JSON.stringify(data)], {
  //       type: "application.json",
  //     });
  //     console.log("data", data);
  //     const formData = new FormData();
  //     formData.append("data", blob);
  //     //레시피 배열 수 만큼 append 시켜 주기
  //     for (let i = 0; i < data.length; i++) {
  //       formData.append(
  //         `orderVoList[${i}].recipe_num`,
  //         ingredients[0].recipe_num
  //       );
  //       formData.append(`orderVoList[${i}].ing_num`, data[i].ing_num);
  //       formData.append(
  //         `orderVoList[${i}].ing_ingredient`,
  //         data[i].ing_ingredient
  //       );
  //       formData.append(`orderVoList[${i}].ing_amount`, data[i].ing_amount);
  //     }

  //     //!!!!!!!!!!!!!!!!!!!!!!!!!//수정한 거 백에 보내기

  //     axios({
  //       method: "POST",
  //       // url: process.env.REACT_APP_HOST + "/recipe/insertRecipeIngredients",
  //       url: "http://localhost:9000/recipe/updateRecipeIngredients",
  //       headers: { "Content-Type": "multipart/form-data" },
  //       data: formData,
  //     })
  //       .then((response) => {
  //         console.log(response.data);
  //       })
  //       .catch((e) => console.log(e));
  //   },
  //   [ingredients]
  // );

  const onTemporarySave = useCallback(
    (e) => {
      e.preventDefault();
      console.log("ingredients", ingredients);
      let ingreCopy = [...ingredients];
      const data = ingredients;
      const blob = new Blob([JSON.stringify(data)], {
        type: "application.json",
      });
      // console.log("data", data);
      const formData = new FormData();
      formData.append("data", blob);
      //!!!!!!!!!!!!!!!!!!!!!!!!!//수정한 거 백에 보내기

      if (IngredientState.length === 0) {
        //레시피 배열 수 만큼 append 시켜 주기
        for (let i = 0; i < data.length; i++) {
          formData.append(
            `orderVoList[${i}].recipe_num`,
            ingredients[0].recipe_num
          );
          formData.append(`orderVoList[${i}].ing_num`, data[i].ing_num);
          formData.append(
            `orderVoList[${i}].ing_ingredient`,
            data[i].ing_ingredient
          );
          formData.append(`orderVoList[${i}].ing_amount`, data[i].ing_amount);
        }
        axios({
          method: "POST",
          // url: process.env.REACT_APP_HOST + "/recipe/insertRecipeIngredients",
          url: "http://localhost:9000/recipe/insertRecipeIngredients",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch((e) => console.log(e));
      } else {
        //재료를 추가적으로 등록한다면
        if (IngredientState.length < ingredients.length) {
          const copyState = ingredients.slice(
            IngredientState.length,
            ingredients.length
          );
          for (let i = 0; i < copyState.length; i++) {
            formData.append(
              `orderVoList[${i}].recipe_num`,
              copyState[0].recipe_num
            );
            formData.append(`orderVoList[${i}].ing_num`, copyState[i].ing_num);
            formData.append(
              `orderVoList[${i}].ing_ingredient`,
              copyState[i].ing_ingredient
            );
            formData.append(
              `orderVoList[${i}].ing_amount`,
              copyState[i].ing_amount
            );
          }
          axios({
            method: "POST",
            // url: process.env.REACT_APP_HOST + "/recipe/insertRecipeIngredients",
            url: "http://localhost:9000/recipe/insertRecipeIngredients",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
          })
            .then((response) => {
              console.log(response.data);
            })
            .catch((e) => console.log(e));
        } else {
          // formData.append(`recipe_num`, ingredients[0].recipe_num);
          console.log("updateRecipeIngredients", ingredients);
          for (let i = 0; i < ingredients.length; i++) {
            formData.append(
              `orderVoList[${i}].recipe_num`,
              ingredients[i].recipe_num
            );
            formData.append(
              `orderVoList[${i}].ing_num`,
              ingredients[i].ing_num
            );
            formData.append(
              `orderVoList[${i}].ing_ingredient`,
              ingredients[i].ing_ingredient
            );
            formData.append(
              `orderVoList[${i}].ing_amount`,
              ingredients[i].ing_amount
            );
          }
          axios({
            method: "POST",
            // url: process.env.REACT_APP_HOST + "/recipe/insertRecipeIngredients",
            url: "http://localhost:9000/recipe/updateRecipeIngredients",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
          })
            .then((response) => {
              console.log(response.data);
            })
            .catch((e) => console.log(e));
        }
      }
    },
    [ingredients]
  );

  useMemo(() => {
    // useEffect(() => {
    // useCallback(() => {
    if (IngredientState === undefined || IngredientState.length === 0) {
      setLoadState(true);
    } else {
      if (IngredientState.length > 0) {
        // if (ingredients === undefined || ingredients.length === 0) {
        const copyState = [];

        // setIngredients(ingredients.push(copyState));

        IngredientState.map((e) => {
          return copyState.push({
            recipe_num: IngredientState[0].recipe_num,
            ing_num: e.ing_num,
            ing_ingredient: e.ing_ingredient,
            // stepImg: e.order_path,
            ing_amount: e.ing_amount,
          });
        });
        setIngredients(copyState);
      } else {
        setLoadState(false);
      }
    }
    console.log("IngredientState", IngredientState);
  }, [IngredientState]);
  // }, []);
  // }, [ingredients, IngredientState]);
  console.log("ingredients", ingredients);

  // useMemo(() => {
  //   ingredients.map((v) => {
  //     return (
  //       <>
  //         {ingredients.length <= 10 ? (
  //           <>
  //             {v.ingredient_num <= 10 && (
  //               <div
  //                 key={v}
  //                 style={{
  //                   height: "3vh",
  //                   margin: "1vh",
  //                   display: "inline-flex",
  //                   width: "100%",
  //                   alignItems: "center",
  //                   justifyContent: "space-around",
  //                 }}
  //               >
  //                 <Pin style={{ width: "1vw" }} />
  //                 <div style={{ width: "40%" }}>{v.ing_ingredient}</div>
  //                 <div style={{ width: "40%" }}>{v.ing_amount}</div>
  //               </div>
  //             )}
  //           </>
  //         ) : (
  //           <div style={{ width: "100%", height: "100%" }}>
  //             {v.ing_num <= ingredients.length / 2 && (
  //               <div
  //                 key={v}
  //                 style={{
  //                   height: "3vh",
  //                   margin: "1vh",
  //                   display: "inline-flex",
  //                   width: "90%",
  //                   alignItems: "center",
  //                   justifyContent: "space-between",
  //                 }}
  //               >
  //                 <Pin style={{ width: "1vw" }} />
  //                 <div>{v.ing_ingredient}</div>
  //                 <div>{v.ing_amount}</div>
  //               </div>
  //             )}
  //           </div>
  //         )}
  //       </>
  //     );
  //   });
  // }, [ingredients]);

  return (
    <>
      <div>
        <TempSaveBtn
          type="button"
          onClick={onTemporarySave}
          disabled={btnDisabledState}
          // style={{ display: btnDisplayState }}
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
                        {v.ing_num <= 10 && (
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
                              {v.ing_ingredient}
                            </div>
                            <div style={{ width: "40%" }}>{v.ing_amount}</div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div style={{ width: "100%", height: "100%" }}>
                        {/* {v.ing_num <= (ingredients.length + 1) / 2 && ( */}
                        {v.ing_num <= ingredients.length / 2 && (
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
                            <div>{v.ing_ingredient}</div>
                            <div>{v.ing_amount}</div>
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
                          {v.ing_num > ingredients.length / 2 && (
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

                              <div>{v.ing_ingredient}</div>
                              <div>{v.ing_amount}</div>
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
                                    handleFormChange(index, item, e);
                                  }}
                                  name="ing_ingredient"
                                  value={item.ing_ingredient}
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
                                  name="ing_amount"
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
                                    handleFormChange(index, item, e);
                                  }}
                                  value={item.ing_amount}
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
    // <>
    /* <BasicFormWrap>
        {" "}
        <div>
          <FontAwesomeIcon icon={faLightbulb} /> 재료 이름과 재료량 순으로
          입력해주세요{" "}
          <SmallBtn
            type="button"
            className="addIngreBtn"
            style={{ marginLeft: "1em" }}
            onClick={onTemporarySave}
          >
            임시저장
          </SmallBtn>
          <SmallBtn
            type="button"
            className="addIngreBtn"
            onClick={onAddIngredientHandler}
          >
            <FontAwesomeIcon icon={faPlusCircle} /> 재료 추가
          </SmallBtn>
          <SmallBtn
            type="button"
            className="addIngreBtn"
            style={{ marginRight: "1em" }}
            onClick={removeIngredient}
          >
            <FontAwesomeIcon icon={faCircleMinus} /> 재료 삭제
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
                                // setInput(IngreAmountRef.current);
                                handleFormChange(index, e);
                              }}
                              // key={index}
                              // onBlur={(e) => {
                              //   setIngredientInputs(e, item, index);

                              //   // IngreAmountRef.current = item.ingredient_name;
                              //   // console.log(IngreAmountRef.current);
                              // }}
                              name="ingredient_name"
                              value={index.ingredient_name}
                              // value={
                              //   item.ingredient_name !== ""
                              //     ? item.ingredient_name
                              //     : item.ingredient_name[index]
                              // }
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
                                index % 4 == 0
                                  ? "1꼬집"
                                  : index % 4 == 1
                                  ? "300g"
                                  : index % 4 == 2
                                  ? "6알"
                                  : index % 4 == 3
                                  ? "1/2t"
                                  : ""
                              }
                              onChange={(e) => {
                                // setInput(IngreAmountRef.current);
                                handleFormChange(index, e);
                              }}
                              value={index.ingredient_amount}
                              // value={item.ingredient_amount}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </Scrollable>
        </BundleWrap>
      </BasicFormWrap>
    </> */
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
