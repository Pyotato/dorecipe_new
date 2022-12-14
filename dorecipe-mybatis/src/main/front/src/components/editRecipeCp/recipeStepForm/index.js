import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBlackboard,
  faCircleMinus,
  faCirclePlus,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useCallback, useEffect } from "react";

import "./style.css";
import axios from "axios";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Camera } from "../../../assets/Camera.svg";
import { colors } from "../../../theme/theme";
import { useMemo } from "react";
const RecipeOrderDrag = ({
  recipeState,
  // recipeId,
  btnState,
  setBtnState,
  orderState,
  setOrderState,
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
  // const [fileName, file.name]

  const [loadState, setLoadState] = useState(true);

  // member_id 가져오기
  const user = useSelector((auth) => auth);
  const [member_id, setMemberId] = useState();
  useEffect(() => {
    // console.log("현재 로그인 아이디 : ", user.auth.user.username);
    setMemberId(user.auth.user.username);
  }, []);
  // ----------------------------------------------------
  const userState = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const recipeId = useParams();
  const [stepState, setStep] = useState([
    {
      recipe_num: parseInt(recipeId.recipeId), //레시피 등록 번호,
      order_num: 0,
      order_explain: "",
      order_path: "",
    },
    {
      recipe_num: parseInt(recipeId.recipeId),
      order_num: 1,
      order_explain: "",
      order_path: "",
    },
    {
      recipe_num: parseInt(recipeId.recipeId),
      order_num: 2,
      order_explain: "",
      order_path: "",
    },
  ]);
  // useEffect(() => {
  //   if (userState) {
  //     navigate("/login");
  //   }
  // }, []);

  const [order_pathChangeState, setorder_pathChangeState] = useState(0);
  const onChangeorder_path = () => {
    setorder_pathChangeState(0);
  };

  useMemo(() => {
    // useCallback(() => {
    if (orderState === undefined || orderState.length === 0) {
      setLoadState(true);
    } else {
      // if (stepState[0].order_explain === "" || stepState[0].order_num === 0) {
      if (orderState.length > 0) {
        // if (stepStates === undefined || stepStates.length === 0) {
        // const copyState = [...recipeState];

        const tempStates = [];
        orderState.map((e) => {
          return tempStates.push({
            recipe_num: orderState[0].recipe_num,
            order_num: e.order_num + 1,
            order_explain: e.order_explain,
            // order_path: e.order_path,
            order_path:
              e.order_path === ""
                ? ""
                : e.order_path.slice(
                    e.order_path.lastIndexOf("/img"),
                    e.order_path.length
                  ),
          });
        });
        setStep(tempStates);

        // setStepStates(
        //   orderState.map((e) => {
        //     return stepStates.append({
        //       order_explain: e.order_explain,
        //       order_num: e.order_num,
        //       order_path: e.order_path,
        //     });
        //   })
        // );

        //       orderState.map((e) => {
        // return console.log(`${e.order_explain} ${e.order_num} ${e.order_path} `);
        //         orderState.map((e) => {
        //   return (...stepStates,{order_explain:e.order_explain,order_num:e.order_num,order_path:e.order_path })
        // });
      } else {
        setLoadState(false);
      }
    }

    // console.log("stepStates", stepStates);
  }, [orderState]);
  // }, [orderState, stepState, recipeId]);
  console.log("orderState", orderState);
  console.log("stepState", stepState);
  // 임시저장 버튼 state
  const [btnDisabledState, setBtnDisabledState] = useState(false);
  const [btnDisplayState, setBtnDisplayState] = useState("none");

  useEffect(() => {
    setMemberId(user.auth.user.username);
    setOrderState(orderState);
    if (btnState === 3) {
      setBtnDisabledState(false);
      setBtnDisplayState("block");
    }
  }, []);

  const fileDropHandler = (index, files, setFiles) => {
    return (
      <>
        {files.length > 0 && stepState.length > 0 ? (
          // &&  orderState[index].order_path.slice(
          //     orderState[index].order_path.lastIndexOf("/img"),
          //     orderState[index].order_path.length
          //   ) !== stepState[index].order_path
          // const copyState = [...stepState];
          // copyState[index].order_path = orderState[
          //   index
          // ].order_path.slice(
          //   orderState[index].order_path.lastIndexOf(
          //     "/img"
          //   ),
          //   orderState[index].order_path.length
          // );
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
                  {/* {stepState[index].order_path.length === 0 && (
                    <span style={{ fontSize: " .8vw" }}>이미지 등록</span>
                  )} */}
                  {/* {stepState[index].order_path.name === undefined && (
                    <span style={{ fontSize: " .8vw" }}>이미지 변경</span>
                  )} */}
                  {stepState[index].order_path === "" ? (
                    <span style={{ fontSize: " .8vw" }}>이미지 등록</span>
                  ) : (
                    <span style={{ fontSize: " .8vw" }}>이미지 변경</span>
                  )}
                  {/* {stepState[index].order_path.name === undefined ? (
                    <span style={{ fontSize: " .8vw" }}>이미지 변경</span>
                  ) : (
                    <span style={{ fontSize: " .8vw" }}>이미지 등록</span>
                  )} */}
                </div>
              )}
            </Dropzone>
          </>
        )}
      </>
    );
  };

  //임시등록버튼 2번째로 클릭했을때는 update하도록
  // const [btnState, setBtnState] = useState(0);

  // save reference for dragItem and dragOverItem
  const dragItemRef = useRef();
  const dragOverItemRef = useRef();
  const inputFocus = useRef();
  console.log("stepState[0].order_path.name", stepState[0].order_path.name);
  //input값 인지
  const handleFormChange = (item, index, e) => {
    console.log("handleFormChange", item);
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
    //duplicate items
    if (index !== 0) {
      let steps = [...stepState];
      //remove and save the dragged item content
      /** 드래그한 배열 {order_num: dragItemRef.current, order_explain: "", order_path: ""}*/
      const draggedItemContent = steps.splice(dragItemRef.current, 1)[0];
      console.log("dragItemRef.current", dragItemRef.current);
      //이동시킬 위치에 0개 삭제하고 그 자리에 draggedItemContent을 이동시킴
      steps.splice(dragOverItemRef.current, 0, draggedItemContent);
      dragItemRef.current = null;
      dragOverItemRef.current = null;
      //update the actual array
      setStep(steps);
      console.log("steps", steps);
    } else {
      alert("첫번쨰 순서는 옮기지마세요.");
    }
  };

  //handle added Inputboxes
  const handleAddedSteps = (e) => {
    // const steps = [...stepState];
    e.preventDefault();
    if (stepState.length < 30) {
      if (stepState[stepState.length - 1].order_explain !== "") {
        let newSteps = {
          recipe_num: parseInt(recipeId.recipeId),
          order_num: stepState.length + 1,
          order_path: "",
          order_explain: "",
        };
        setStep([...stepState, newSteps]);
        console.log("addedSteps", stepState);
      } else {
        alert("순서에 대한 설명을 적어주세요.");
      }
    } else if (stepState.length === 30) {
      alert("요리 순서는 최대 30개까지 등록 가능합니다.");
    }
  };

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

  //임시 저장 ==> 2번째에는 업데이트문 들어가도록하기
  // const onTemporarySave = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     let steps = [...stepState];
  //     if (steps[0].order_explain) {
  //       setBtnState(btnState + 1);
  //       console.log("btnState", btnState);
  //       const data = steps;
  //       const blob = new Blob([JSON.stringify(data)], {
  //         // type: "application.json",
  //         type: "multipart/form-data",
  //       });
  //       console.log("data", data);
  //       const formData = new FormData();
  //       formData.append("data", blob);
  //       //레시피 배열 수 만큼 append 시켜 주기
  //       for (let i = 0; i < data.length; i++) {
  //         formData.append(`orderVoList[${i}].recipe_num`, recipeState);
  //         formData.append(`orderVoList[${i}].order_num`, i);
  //         formData.append(
  //           `orderVoList[${i}].order_explain`,
  //           data[i].order_explain
  //         );
  //         formData.append(`recipe_imgs_steps`, stepState[i].order_path);
  //         // console.log("order_path", data[i].order_path.File.name);

  //         formData.append(
  //           `orderVoList[${i}].order_path`,
  //           stepState[i].order_path.name
  //         );
  //       }
  //       for (let value of formData.values()) {
  //         console.log(value);
  //       }
  //       if (btnState <= 1) {
  //         axios({
  //           method: "POST",

  //           // url: process.env.REACT_APP_HOST + "/recipe/insertRecipeOrder",
  //           url: "http://localhost:9000/recipe/insertRecipeOrder",
  //           headers: { "Content-Type": "multipart/form-data" },
  //           data: formData,
  //         })
  //           .then((response) => {
  //             console.log(response.data);
  //             alert("임시저장 하셨습니다.");
  //             setBtnState(btnState + 1);
  //           })
  //           .catch((e) => {
  //             console.log(e);
  //             alert("임시저장 실패.");
  //           });
  //       } else if (btnState > 1) {
  //         //업데이트문
  //         axios({
  //           method: "POST",
  //           baseURL: "http://localhost:9000",
  //           url:
  //             // process.env.REACT_APP_HOST + "/recipe/updateRecipeInstructions",
  //             "/recipe/updateRecipeInstructions",
  //           headers: { "Content-Type": "multipart/form-data" },
  //           data: formData,
  //         })
  //           .then((response) => {
  //             console.log(response.data);
  //             alert("임시저장(업데이트) 하셨습니다.");
  //             setBtnState(btnState + 1);
  //           })
  //           .catch((e) => {
  //             console.log(e);
  //             alert("임시저장 실패.");
  //           });
  //       }
  //     } else {
  //       alert("순서는 하나 이상 설명해주세요.");
  //     }
  //   },
  //   [recipeState, stepState, btnState]
  // );

  return (
    <>
      <div>
        <TempSaveBtn
          type="button"
          className="addIngreBtn"
          // onClick={onTemporarySave}
          // btnState={btnState}
          disabled={btnDisabledState}
          style={{ display: btnDisplayState }}
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
              {stepState.map((item, index) => {
                return (
                  <>
                    <div
                      style={{
                        border: "1px solid transparent",
                      }}
                      className="draggableItem"
                      key={index}
                      draggable={index !== 0 && true}
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
                      {stepState[index].order_path === "" ||
                        (stepState[index].order_path.name === undefined && (
                          <div
                            style={{
                              border: "1px solid black",
                              padding: "0.3vw",
                              height: "18vh",
                            }}
                          >
                            <img
                              onClick={() => onChangeorder_path(1)}
                              style={{ width: "9.8vw", maxHeight: "16vh" }}
                              src={item.order_path}
                              alt={item.order_path}
                            />
                          </div>
                        ))}

                      {index === 0 && fileDropHandler(index, files1, setFiles1)}
                      {index === 1 && fileDropHandler(index, files2, setFiles2)}
                      {index === 2 && fileDropHandler(index, files3, setFiles3)}
                      {index === 3 && fileDropHandler(index, files4, setFiles4)}
                      {index === 4 && fileDropHandler(index, files5, setFiles5)}
                      {index === 5 && fileDropHandler(index, files6, setFiles6)}
                      {index === 6 && fileDropHandler(index, files7, setFiles7)}
                      {index === 7 && fileDropHandler(index, files8, setFiles8)}
                      {index === 8 && fileDropHandler(index, files9, setFiles9)}
                      {index === 9 &&
                        fileDropHandler(index, files10, setFiles10)}
                      {index === 10 &&
                        fileDropHandler(index, files11, setFiles11)}
                      {index === 11 &&
                        fileDropHandler(index, files12, setFiles12)}
                      {index === 12 &&
                        fileDropHandler(index, files13, setFiles13)}
                      {index === 13 &&
                        fileDropHandler(index, files14, setFiles14)}
                      {index === 14 &&
                        fileDropHandler(index, files15, setFiles15)}
                      {index === 15 &&
                        fileDropHandler(index, files16, setFiles16)}
                      {index === 16 &&
                        fileDropHandler(index, files17, setFiles17)}
                      {index === 17 &&
                        fileDropHandler(index, files18, setFiles18)}
                      {index === 18 &&
                        fileDropHandler(index, files19, setFiles19)}
                      {index === 19 &&
                        fileDropHandler(index, files20, setFiles20)}
                      {index === 20 &&
                        fileDropHandler(index, files21, setFiles21)}
                      {index === 21 &&
                        fileDropHandler(index, files22, setFiles22)}
                      {index === 22 &&
                        fileDropHandler(index, files23, setFiles23)}
                      {index === 23 &&
                        fileDropHandler(index, files24, setFiles24)}
                      {index === 24 &&
                        fileDropHandler(index, files25, setFiles25)}
                      {index === 25 &&
                        fileDropHandler(index, files26, setFiles26)}
                      {index === 26 &&
                        fileDropHandler(index, files27, setFiles27)}
                      {index === 27 &&
                        fileDropHandler(index, files28, setFiles28)}
                      {index === 28 &&
                        fileDropHandler(index, files29, setFiles29)}
                      {index === 29 &&
                        fileDropHandler(index, files30, setFiles30)}
                    </div>
                    {orderState[index] !== undefined &&
                      stepState[index].order_path !==
                        orderState[index].order_path.slice(
                          orderState[index].order_path.lastIndexOf("/img"),
                          orderState[index].order_path.length
                        ) && (
                        <div
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
                      )}
                  </>
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
  /* background-color: ${colors.color_beige_brown}; */
  background-color: pink;
  border: 1px solid transparent;

  &:hover {
    cursor: pointer;
    transform: scaleX(1.2) scaleY(1.2);
    background-color: ${colors.color_carrot_orange};
    color: ${colors.color_beige_tinted_white};
  }
`;
