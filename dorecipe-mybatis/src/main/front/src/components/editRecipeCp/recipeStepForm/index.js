import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleMinus,
  faCirclePlus,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useCallback } from "react";

import "./style.css";
import axios from "axios";
import Dropzone from "react-dropzone";

import { ReactComponent as Camera } from "@assets/Camera.svg";
import { colors } from "@theme/theme";
import { useMemo } from "react";
const RecipeOrderDrag = ({
  recipeState,
  // recipeId,
  btnState,
  setBtnState,
  orderState,
  setOrderState,
  stepState,
  setStep,
  recipeNum,
}) => {
  const [files1, setFiles1] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [files3, setFiles3] = useState([]);
  const [files4, setFiles4] = useState([]);
  const [files5, setFiles5] = useState([]);
  const [files6, setFiles6] = useState([]);
  const [files7, setFiles7] = useState([]);
  const [files8, setFiles8] = useState([]);
  const [files9, setFiles9] = useState([]);
  const [files10, setFiles10] = useState([]);
  const [files11, setFiles11] = useState([]);
  const [files12, setFiles12] = useState([]);
  const [files13, setFiles13] = useState([]);
  const [files14, setFiles14] = useState([]);
  const [files15, setFiles15] = useState([]);
  const [files16, setFiles16] = useState([]);
  const [files17, setFiles17] = useState([]);
  const [files18, setFiles18] = useState([]);
  const [files19, setFiles19] = useState([]);
  const [files20, setFiles20] = useState([]);
  const [files21, setFiles21] = useState([]);
  const [files22, setFiles22] = useState([]);
  const [files23, setFiles23] = useState([]);
  const [files24, setFiles24] = useState([]);
  const [files25, setFiles25] = useState([]);
  const [files26, setFiles26] = useState([]);
  const [files27, setFiles27] = useState([]);
  const [files28, setFiles28] = useState([]);
  const [files29, setFiles29] = useState([]);
  const [files30, setFiles30] = useState([]);

  const [loadState, setLoadState] = useState(true);

  const [saveState, setSaveState] = useState(false);

  // useEffect(() => {
  useMemo(() => {
    if (orderState === undefined || orderState.length === 0) {
      setLoadState(true);
    } else {
      if (orderState.length > 0) {
        const tempStates = [];
        orderState.map((e) => {
          if (e.order_explain !== null) {
            return tempStates.push({
              recipe_num: orderState[0].recipe_num,
              order_num: e.order_num,
              order_explain: e.order_explain,
              // 링크가 아닐때
              order_path:
                e.order_path === null || e.order_path === ""
                  ? ""
                  : e.order_path.slice(
                      e.order_path.lastIndexOf("/") + 1,
                      e.order_path.length
                    ).length === 0
                  ? ""
                  : e.order_path.includes("/img/recipe/steps/")
                  ? e.order_path.slice(
                      e.order_path.lastIndexOf("/img"),
                      e.order_path.length
                    )
                  : e.order_path,
            });
          } else
            return tempStates.push({
              recipe_num: orderState[0].recipe_num,
              order_num: e.order_num,
              order_explain: "",
              order_path: "",
            });
        });
        setStep(tempStates);
      } else {
        setLoadState(false);
      }
    }
  }, [orderState]);

  // 임시저장 버튼 state
  const [btnDisabledState, setBtnDisabledState] = useState(false);
  const [btnDisplayState, setBtnDisplayState] = useState("none");

  const fileDropHandler = useCallback(
    (index, files, setFiles, e) => {
      return (
        <>
          {files.length > 0 &&
          stepState.length > 0 &&
          typeof stepState[index].order_path !== "string" ? (
            <>
              <div
                className="fileBox"
                style={{
                  border: "1px solid black",
                  height: "18vh",
                  borderRadius: "0 0.5vw 0.5vw 0",
                  margin: "0",
                }}
              >
                <p
                  onClick={() => {
                    setFiles("");
                    const copyState = [...stepState];
                    copyState[index].order_path = "";
                    setStep(copyState);
                  }}
                  // onClick={() => setFiles("")}
                  style={{ zIndex: "600" }}
                  className="removeFile"
                >
                  이미지 삭제
                </p>
                <img
                  onClick={() => {
                    setFiles("");
                    const copyState = [...stepState];
                    copyState[index].order_path = "";
                    setStep(copyState);
                  }}
                  style={{
                    width: "90px",
                    transform: "translateX(100%)",
                    padding: "0.6vw",
                    display: "inline-block",
                  }}
                  src={stepState[index].order_path.preview}
                  alt={stepState[index].order_path.preview}
                />
              </div>
            </>
          ) : (
            <>
              <Dropzone
                className="dropZoneWrap"
                onDrop={(acceptedFiles) => {
                  setFiles(
                    acceptedFiles.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      })
                    )
                  );

                  acceptedFiles.forEach((file) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    const copyState = [...stepState];
                    copyState[index].order_path = file;
                    setStep(copyState);
                  });
                }}
                name="stepImages"
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    style={{
                      border: "1px solid black",
                      borderRadius: "0 0.5vw 0.5vw 0",
                      borderLeft: "none",
                      width: "9vw",
                      height: "18vh",
                      paddingTop: "5vh",
                      textAlign: "center",
                    }}
                    {...getRootProps({
                      className: "dropzone",
                    })}
                  >
                    <div
                      style={{
                        fontSize: "2px",
                        textAlign: "center",
                      }}
                    >
                      <Camera />
                    </div>
                    <input {...getInputProps()} />

                    {stepState[index].order_path === "" ? (
                      <span style={{ fontSize: " .8vw" }}>이미지 등록</span>
                    ) : (
                      <span style={{ fontSize: " .8vw" }}>이미지 변경</span>
                    )}
                  </div>
                )}
              </Dropzone>
            </>
          )}
        </>
      );
    },
    [stepState]
  );

  // save reference for dragItem and dragOverItem
  const dragItemRef = useRef();
  const dragOverItemRef = useRef();
  const inputFocus = useRef();
  const temporarySaveBtn = useRef();
  // console.log("stepState[0].order_path.name", stepState[0].order_path.name);
  //input값 인지
  const handleFormChange = (item, index, e) => {
    // console.log("handleFormChange", item);
    e.preventDefault();
    let stepCopy = [...stepState];

    stepCopy[index][e.target.name] = e.target.value;
    setStep(stepCopy);
  };

  // onDragStart :드래그 시작하면
  const dragStarted = (e, item) => {
    //다른 영역에 드롭했다면
    e.dataTransfer.setData("item.recipe_num", item.recipe_num);
    e.dataTransfer.setData("item.order_num", item.order_num);
    e.dataTransfer.setData("item.order_explain", item.order_explain);
    e.dataTransfer.setData("item.order_path", item.order_path);
  };

  //onDragOver : 드래그 호버하면
  const draggingOver = (e, id) => {
    e.preventDefault();
  };
  //handle drag Sorting
  const handleSort = (e, index) => {
    e.preventDefault();
    //duplicate items
    // if (index !== 0) {
    let steps = [...stepState];
    //remove and save the dragged item content
    /** 드래그한 배열 {order_num: dragItemRef.current, order_explain: "", order_path: ""}*/
    const draggedItemContent = steps.splice(dragItemRef.current, 1)[0];
    // console.log("dragItemRef.current", dragItemRef.current);
    //이동시킬 위치에 0개 삭제하고 그 자리에 draggedItemContent을 이동시킴
    steps.splice(dragOverItemRef.current, 0, draggedItemContent);
    dragItemRef.current = null;
    dragOverItemRef.current = null;
    //update the actual array
    setStep(steps);
    // console.log("steps", steps);
    // } else {
    //   alert("첫번쨰 순서는 옮기지마세요.");
    // }
  };

  //handle added Inputboxes
  const handleAddedSteps = useCallback(
    (e) => {
      // const steps = [...stepState];
      e.preventDefault();
      if (stepState.length < 30 && stepState.length > 0) {
        if (stepState[stepState.length - 1].order_explain !== "") {
          let newSteps = {
            recipe_num: recipeNum,
            // recipe_num: parseInt(recipeId.recipeId),
            order_num: stepState.length + 1,
            order_explain: "",
            order_path: "",
          };
          setStep([...stepState, newSteps]);
          console.log("addedSteps", stepState);
        } else {
          alert("순서에 대한 설명을 적어주세요.");
        }
      } else if (stepState.length === 30) {
        alert("요리 순서는 최대 30개까지 등록 가능합니다.");
      }
    },
    [stepState]
  );
  // const handleAddedSteps = (e) => {
  //   // const steps = [...stepState];
  //   e.preventDefault();
  //   if (stepState.length < 30 && stepState.length > 0) {
  //     if (stepState[stepState.length - 1].order_explain !== "") {
  //       let newSteps = {
  //         recipe_num: recipeNum,
  //         // recipe_num: parseInt(recipeId.recipeId),
  //         order_num: stepState.length + 1,
  //         order_explain: "",
  //         order_path: "",
  //       };
  //       setStep([...stepState, newSteps]);
  //       console.log("addedSteps", stepState);
  //     } else {
  //       alert("순서에 대한 설명을 적어주세요.");
  //     }
  //   } else if (stepState.length === 30) {
  //     alert("요리 순서는 최대 30개까지 등록 가능합니다.");
  //   }
  // };

  //순서 제거
  const handleRemovedSteps = (e) => {
    e.preventDefault();
    const steps = [...stepState];
    //순서는 3개 이상 등록하도록
    if (steps.length > 3) {
      steps.pop();
      setStep(steps);
    } else {
      alert("순서는 3개 이상 작성해 주세요. ");
    }
  };

  const temporarySave = useCallback(() => {
    // console.log("event", typeof e);
    if (
      stepState[0].order_explain !== ""
      // &&
      // stepState[stepState.length - 1].order_explain !== ""
    ) {
      const data = stepState;
      const blob = new Blob([JSON.stringify(data)], {
        type: "application.json",
      });
      // // console.log("data", data);
      const formData = new FormData();
      formData.append("data", blob);
      // //!!!!!!!!!!!!!!!!!!!!!!!!!//수정한 거 백에 보내기
      for (let i = 0; i < stepState.length; i++) {
        formData.append(
          `orderVoList[${i}].recipe_num`,
          // parseInt(recipeId.recipeId)
          recipeNum
        );
        formData.append(`orderVoList[${i}].order_num`, stepState[i].order_num);
        formData.append(
          `orderVoList[${i}].order_explain`,
          stepState[i].order_explain
        );
        //파일이라면 (새로운 거 등록)
        if (typeof stepState[i].order_path !== "string") {
          formData.append(
            `orderVoList[${i}].order_path`,
            stepState[i].order_path.name
          );
          formData.append(`recipe_imgs_steps`, stepState[i].order_path);
        } else {
          // //원래 등록했던 이미지를 그대로 업로드하려면
          if (
            typeof stepState[i].order_path === "string" &&
            stepState[i].order_path != null &&
            stepState[i].order_path.length > 0
          ) {
            // if (stepState[i].order_path.contains("/img")) {
            // i &&

            // stepState[i].order_path ===
            //   orderState[i].order_path.slice(
            //     orderState[i].order_path.lastIndexOf("/img"),
            //     orderState[i].order_path.length
            //   ) &&
            formData.append(
              `orderVoList[${i}].order_path`,
              stepState[i].order_path
            );
            // }
          } else {
            formData.append(
              `orderVoList[${i}].order_path`,
              stepState[i].order_path
            );
          }
        }
        // axios({
        //   method: "POST",
        //   // url: process.env.REACT_APP_HOST + "/recipe/insertRecipeIngredients",
        //   url: "http://localhost:9000/recipe/updateRecipeInstructions",
        //   headers: { "Content-Type": "multipart/form-data" },
        //   data: formData,
        // })
        //   .then((response) => {
        //     console.log("순서 업데이트 성공");
        //     console.log(response.data);
        //   })
        //   .catch((e) => {
        //     console.log("순서 업데이트 실패ㅜㅜㅜㅜ");

        //     console.log(e);
        //   });
      }

      //임시저장한 순서 중에서 삭제한 순서가 있는 경우
      if (orderState.length > stepState.length) {
        for (let i = stepState.length; i < orderState.length; i++) {
          formData.append(
            `orderVoList[${i}].recipe_num`,
            orderState[i].recipe_num
          );
          formData.append(
            `orderVoList[${i}].order_num`,
            orderState[i].order_num
          );
        }
      }
      axios({
        method: "POST",
        // url: process.env.REACT_APP_HOST + "/recipe/insertRecipeIngredients",
        url: "http://localhost:9000/recipe/updateRecipeInstructions",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      })
        .then((response) => {
          console.log("순서 업데이트 성공");
          console.log(response.data);
          setSaveState(true);
        })
        .catch((e) => {
          console.log("순서 업데이트 실패ㅜㅜㅜㅜ");

          console.log(e);
        });
    }

    // else {
    //   if (stepState.length > 0 && stepState[0].order_explain === "") {
    //     alert("순서에 대한 설명을 적어주세요");
    //   }
    // }
  }, [stepState]);

  // const onTemporarySave = useCallback(() => {
  //   temporarySave();
  //   console.log("onTemporarySave ~~~~~~~~~~~~~~~~~~~~~실행");
  // }, [stepState]);

  //페이지를 벗어난다면 저장해주기

  // useEffect(() => {
  //   return () => {
  //     if (!saveState) {
  //       window.addEventListener("beforeunload", function (e) {
  //         e.preventDefault();
  //         this.alert(
  //           "저장을 하지 않고 페이지를 벗어날 시, 변경내용이 적용되지 않을 수 있습니다."
  //         );
  //       });
  //     }
  //   };
  // }, [saveState]);

  const previousImg = useCallback(
    (index) => {
      return (
        <>
          {" "}
          {orderState.length > 0 && index < orderState.length && (
            <>
              {(orderState[index].order_path != null ||
                (orderState[index].order_path.includes("/img/recipe/steps/") &&
                  orderState[index].order_path.slice(
                    orderState[index].order_path.lastIndexOf("/") + 1,
                    orderState[index].order_path.length
                  ).length !== 0) ||
                orderState[index].order_path.length > 0) && (
                <>
                  {" "}
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "0.3vw",
                      height: "18vh",
                    }}
                  >
                    {typeof orderState[index].order_path == "string" &&
                    orderState[index].order_path.includes(
                      `/img/recipe/steps/`
                    ) ? (
                      <img
                        onClick={() => {
                          const copyState = [...orderState];
                          if (
                            copyState[index].order_path.includes(
                              "/img/recipe/steps/"
                            )
                          ) {
                            copyState[index].order_path = orderState[
                              index
                            ].order_path.slice(
                              orderState[index].order_path.lastIndexOf("/img"),
                              orderState[index].order_path.length
                            );
                            setStep(copyState);
                          } else {
                            copyState[index].order_path =
                              orderState[index].order_path;
                            setStep(copyState);
                          }
                        }}
                        src={orderState[index].order_path.slice(
                          orderState[index].order_path.lastIndexOf("/img"),
                          orderState[index].order_path.length
                        )}
                        alt={orderState[index].order_path.slice(
                          orderState[index].order_path.lastIndexOf("/img"),
                          orderState[index].order_path.length
                        )}
                        className="previousImgHover previousImg"
                      />
                    ) : (
                      <img
                        onClick={() => {
                          const copyState = [...orderState];
                          if (
                            copyState[index].order_path.includes(
                              "/img/recipe/steps/"
                            )
                          ) {
                            copyState[index].order_path = orderState[
                              index
                            ].order_path.slice(
                              orderState[index].order_path.lastIndexOf("/img"),
                              orderState[index].order_path.length
                            );
                            setStep(copyState);
                          } else {
                            copyState[index].order_path =
                              orderState[index].order_path;
                            setStep(copyState);
                          }
                        }}
                        src={orderState[index].order_path}
                        alt={orderState[index].order_path}
                        className="previousImgHover  previousImg"
                      />
                    )}

                    <div
                      style={{
                        transform: "translateY(-10vh)",
                        textAlign: "center",
                        color: "red",
                      }}
                      onClick={() => {
                        const copyState = [...stepState];
                        copyState[index].order_path = orderState[
                          index
                        ].order_path.slice(
                          orderState[index].order_path.lastIndexOf("/img"),
                          orderState[index].order_path.length
                        );
                        setStep(copyState);
                      }}
                    >
                      이미지 되돌리기
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      );
    },
    [orderState, stepState]
  );

  return (
    <>
      <div>
        <TempSaveBtn
          type="button"
          className="addIngreBtn"
          onClick={temporarySave}
          // onClick={onTemporarySave}
          ref={temporarySaveBtn}
          style={{ display: "block" }}
        >
          <FontAwesomeIcon icon={faFloppyDisk} />
          <div>임시저장</div>
        </TempSaveBtn>
      </div>
      <TotalWrap
        style={{
          clear: "left",
          height: "fit-content",
          width: "80%",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            borderRadius: "1vw",
            padding: "1vh 1vw",

            width: "100%",
          }}
        >
          <DraggableWrap>
            <DroppableDiv droppable="true">
              {stepState.map((item, index, e) => {
                return (
                  <div
                    style={{
                      border: "1px solid transparent",
                    }}
                    className="draggableItem"
                    key={index}
                    draggable={true}
                    // draggable={index !== 0 && true}
                    onDragStart={(e) => {
                      dragStarted(e, item);
                      dragItemRef.current = index;
                    }}
                    onDragOver={(e) => {
                      draggingOver(e, index, item);
                      dragOverItemRef.current = index;
                    }}
                    onDrop={(e) => {
                      handleSort(e, index, item);
                    }}
                  >
                    <div
                      className="stepName"
                      style={{
                        border: "1px solid black",
                        height: "18vh",
                        fontSize: "1vw",
                        paddingTop: "7.5vh",
                        width: "9vw",
                        backgroundColor: "#554543",
                        color: "#FAF3E7",
                        borderRadius: "0.5vw 0 0 0.5vw",
                      }}
                    >
                      Step {index + 1}
                    </div>
                    <textarea
                      className="textArea"
                      rows="60"
                      style={{
                        borderRadius: "0",
                        borderLeft: "none",
                        lineHeight: "1.5",

                        maxwidth: "50vw",
                      }}
                      placeholder={
                        index % 4 === 0
                          ? "예) 소고기는 기름기를 떼어내고 적당한 크기로 썰어주세요."
                          : index % 4 === 1
                          ? "예) 준비된 양념으로 먼저 고기를 조물조물 재워 둡니다."
                          : index % 4 === 2
                          ? "예) 그 사이 양파와 버섯, 대파도 썰어서 준비하세요."
                          : index % 4 === 3
                          ? "예) 고기가 반쯤 익어갈 떄 양파를 함께 볶아요."
                          : ""
                      }
                      onChange={(e) => {
                        handleFormChange(item, index, e);
                      }}
                      name="order_explain"
                      ref={inputFocus}
                      value={item.order_explain}
                      // value={item.order_explain}
                    ></textarea>
                    {previousImg(index)}

                    {index === 0 &&
                      fileDropHandler(index, files1, setFiles1, e)}
                    {index === 1 &&
                      fileDropHandler(index, files2, setFiles2, e)}
                    {index === 2 &&
                      fileDropHandler(index, files3, setFiles3, e)}
                    {index === 3 &&
                      fileDropHandler(index, files4, setFiles4, e)}
                    {index === 4 &&
                      fileDropHandler(index, files5, setFiles5, e)}
                    {index === 5 &&
                      fileDropHandler(index, files6, setFiles6, e)}
                    {index === 6 &&
                      fileDropHandler(index, files7, setFiles7, e)}
                    {index === 7 &&
                      fileDropHandler(index, files8, setFiles8, e)}
                    {index === 8 &&
                      fileDropHandler(index, files9, setFiles9, e)}
                    {index === 9 &&
                      fileDropHandler(index, files10, setFiles10, e)}
                    {index === 10 &&
                      fileDropHandler(index, files11, setFiles11, e)}
                    {index === 11 &&
                      fileDropHandler(index, files12, setFiles12, e)}
                    {index === 12 &&
                      fileDropHandler(index, files13, setFiles13, e)}
                    {index === 13 &&
                      fileDropHandler(index, files14, setFiles14, e)}
                    {index === 14 &&
                      fileDropHandler(index, files15, setFiles15, e)}
                    {index === 15 &&
                      fileDropHandler(index, files16, setFiles16, e)}
                    {index === 16 &&
                      fileDropHandler(index, files17, setFiles17, e)}
                    {index === 17 &&
                      fileDropHandler(index, files18, setFiles18, e)}
                    {index === 18 &&
                      fileDropHandler(index, files19, setFiles19, e)}
                    {index === 19 &&
                      fileDropHandler(index, files20, setFiles20, e)}
                    {index === 20 &&
                      fileDropHandler(index, files21, setFiles21, e)}
                    {index === 21 &&
                      fileDropHandler(index, files22, setFiles22, e)}
                    {index === 22 &&
                      fileDropHandler(index, files23, setFiles23, e)}
                    {index === 23 &&
                      fileDropHandler(index, files24, setFiles24, e)}
                    {index === 24 &&
                      fileDropHandler(index, files25, setFiles25, e)}
                    {index === 25 &&
                      fileDropHandler(index, files26, setFiles26, e)}
                    {index === 26 &&
                      fileDropHandler(index, files27, setFiles27, e)}
                    {index === 27 &&
                      fileDropHandler(index, files28, setFiles28, e)}
                    {index === 28 &&
                      fileDropHandler(index, files29, setFiles29, e)}
                    {index === 29 &&
                      fileDropHandler(index, files30, setFiles30, e)}
                  </div>
                );
              })}
            </DroppableDiv>
          </DraggableWrap>
          <BtnWrap>
            {/* <BtnWrap style={{ transform: "translateY(200%)" }}> */}
            <Btn onClick={handleAddedSteps}>
              {" "}
              <FontAwesomeIcon icon={faCirclePlus} /> 순서 추가하기
            </Btn>
            <Btn onClick={handleRemovedSteps}>
              {" "}
              <FontAwesomeIcon icon={faCircleMinus} /> 순서 제거하기
            </Btn>
          </BtnWrap>
        </div>
      </TotalWrap>
    </>
  );
};
export default RecipeOrderDrag;

const TotalWrap = styled.div`
  margin: 0 auto;
  font-family: "mainFont";

  & .previousImgHover:hover {
    opacity: 0.2;
  }
  & .previousImg {
    width: 9.8vw;
    max-width: 9.8vw;
    max-height: 16vh;
    min-width: 8em;
  }
`;

const DraggableWrap = styled.div`
  font-family: "mainFont";
`;

const DroppableDiv = styled.div`
  height: 100%;
  width: 100%;
  cursor: pointer;
  & > .draggableItem {
    width: 85%;
    /* width: 100%; */
    margin: 2vh auto;
    align-items: center;
    border: 1px solid #463635;
    padding: 1vh 1vw;
    border-radius: 0.5vw;
  }

  & .textArea {
    font-family: "mainFont";
    border-radius: 0.5vw;
    height: 18vh;
    width: 30vw;
    padding: 0.5vw;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Btn = styled.button`
  width: 9em;
  background-color: ${colors.color_milktea_brown};
  display: block;
  margin-top: 1vw;
  margin-right: 8vw;
  border: 1px solid transparent;
  border-radius: 0.3vw;

  &:hover {
    cursor: pointer;
    background-color: ${colors.color_carrot_orange};
    color: ${colors.color_beige_tinted_white};
  }
`;

const BtnWrap = styled.div`
  float: right;
  transform: translateY(-14vh) translateX(7vw);

  position: sticky;
  position: -webkit-sticky; //edge,safari
  bottom: 0;
  right: 30;
`;
const TempSaveBtn = styled.button`
  width: 5em;
  height: 5em;
  border-radius: 100%;
  padding: 0.5em;
  position: fixed;
  right: 1.5vw;
  bottom: 3vh;
  background-color: ${colors.color_milktea_brown};
  border: 1px solid transparent;

  &:hover {
    cursor: pointer;
    transform: scaleX(1.2) scaleY(1.2);
    background-color: ${colors.color_carrot_orange};
    color: ${colors.color_beige_tinted_white};
  }
`;
