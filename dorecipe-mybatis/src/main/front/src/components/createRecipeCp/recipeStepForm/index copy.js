import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleMinus,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useCallback, useEffect } from "react";
import { ReactComponent as Camera } from "../../../assets/Camera.svg";
import { SmallBtn } from "../../_common/buttons";
// import "./style.css";
import axios from "axios";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";

const RecipeOrderDrag = ({ recipeState }) => {
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

  // member_id 가져오기
  const user = useSelector((auth) => auth);
  const [member_id, setMemberId] = useState();
  useEffect(() => {
    setMemberId(user.auth.user.username);
  }, []);

  const [stepState, setStep] = useState([
    {
      recipe_num: recipeState, //레시피 등록 번호,
      stepId: 0,
      stepDescription: "",
      stepImg: "",
    },
    {
      recipe_num: recipeState,
      stepId: 1,
      stepDescription: "",
      stepImg: "",
    },
    {
      recipe_num: recipeState,
      stepId: 2,
      stepDescription: "",
      stepImg: "",
    },
  ]);
  //임시등록버튼 2번째로 클릭했을때는 update하도록
  const [btnState, setBtnState] = useState(0);

  // save reference for dragItem and dragOverItem
  const dragItemRef = useRef();
  const dragOverItemRef = useRef();
  const inputFocus = useRef();
  // console.log("stepImg", stepState[0].stepImg.name);
  //input값 인지
  const handleFormChange = (index, e) => {
    let stepCopy = [...stepState];
    stepCopy[index][e.target.name] = e.target.value;
    setStep(stepCopy);
  };

  // onDragStart :드래그 시작하면
  const dragStarted = (e, item) => {
    //다른 영역에 드롭했다면
    e.dataTransfer.setData("item.recipe_num", item.recipe_num);
    e.dataTransfer.setData("item.stepId", item.stepId);
    e.dataTransfer.setData("item.stepDescription", item.stepDescription);
    e.dataTransfer.setData("item.stepImg", item.stepImg);
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
      /** 드래그한 배열 {stepId: dragItemRef.current, stepDescription: "", stepImg: ""}*/
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
    const steps = [...stepState];
    e.preventDefault();
    if (steps.length < 30) {
      if (steps[steps.length - 1].stepDescription !== "") {
        let newSteps = {
          recipe_num: steps[0].recipe_num,
          stepId: steps.length,
          stepDescription: "",
          stepImg: "",
        };
        setStep([...stepState, newSteps]);
        console.log("addedSteps", stepState);
      } else {
        alert("순서에 대한 설명을 적어주세요.");
      }
    } else if (steps.length === 30) {
      alert("요리 순서는 최대 30개까지 등록 가능합니다.");
    }
  };

  //순서 제거
  const handleRemovedSteps = (e) => {
    const steps = [...stepState];
    e.preventDefault();
    //순서는 3개 이상 등록하도록
    if (steps.length > 3) {
      steps.splice(stepState.length - 1, 1);
      setStep(steps);
    } else {
      alert("순서는 3개 이상 작성해 주세요. ");
    }
  };

  //임시 저장 ==> 2번째에는 업데이트문 들어가도록하기
  const onTemporarySave = useCallback(
    (e) => {
      e.preventDefault();
      let steps = [...stepState];
      if (steps[0].stepDescription) {
        setBtnState(btnState + 1);
        console.log("btnState", btnState);
        const data = steps;
        const blob = new Blob([JSON.stringify(data)], {
          // type: "application.json",
          type: "multipart/form-data",
        });
        console.log("data", data);
        const formData = new FormData();
        formData.append("data", blob);
        //레시피 배열 수 만큼 append 시켜 주기
        for (let i = 0; i < data.length; i++) {
          formData.append(`orderVoList[${i}].recipe_num`, recipeState);
          formData.append(`orderVoList[${i}].order_num`, i);
          formData.append(
            `orderVoList[${i}].order_explain`,
            data[i].stepDescription
          );

          formData.append(
            `orderVoList[${i}].order_path`,
            stepState[i].stepImg.name
          );
          formData.append("recipe_imgs_steps", stepState[i].stepImg);
          console.log("order_path!!!!!!!!!!!!!!!", stepState[i].stepImg.name);
        }
        for (let value of formData.values()) {
          console.log(value);
        }
        if (btnState <= 1) {
          axios({
            method: "POST",
            // url: process.env.REACT_APP_HOST + "/recipe/insertRecipeOrder",
            url: "http://localhost:9000/recipe/insertRecipeOrder",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
          })
            .then((response) => {
              console.log(response.data);
              alert("임시저장 하셨습니다.");
              setBtnState(btnState + 1);
            })
            .catch((e) => {
              console.log(e);
              alert("임시저장 실패.");
            });
        } else if (btnState > 1) {
          //업데이트문
          axios({
            method: "POST",
            url:
              // process.env.REACT_APP_HOST + "/recipe/updateRecipeInstructions",
              "http://localhost:9000/recipe/updateRecipeInstructions",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
          })
            .then((response) => {
              console.log(response.data);
              alert("임시저장(업데이트) 하셨습니다.");
              setBtnState(btnState + 1);
            })
            .catch((e) => {
              console.log(e);
              alert("임시저장 실패.");
            });
        }
      } else {
        alert("순서는 하나 이상 설명해주세요.");
      }
    },
    [recipeState, stepState, btnState]
  );

  const fileDropHandler = (index, files) => {
    return (
      <>
        {files.length > 0 ? (
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
              {index === 0 ? (
                <>
                  <p onClick={() => setFiles1("")} className="removeFile">
                    이미지 삭제
                  </p>
                  <img
                    onClick={() => setFiles1("")}
                    style={{
                      width: "90px",
                      // height: "180px",
                      transform: "translateX(100%)",
                      padding: "0.6vw",
                      display: "inline-block",
                    }}
                    src={stepState[index].stepImg.preview}
                    alt={stepState[index].stepImg.preview}
                  />
                </>
              ) : index === 1 ? (
                <>
                  <p onClick={() => setFiles2("")} className="removeFile">
                    이미지 삭제
                  </p>
                  <img
                    onClick={() => setFiles2("")}
                    style={{
                      width: "90px",
                      // height: "180px",
                      transform: "translateX(100%)",
                      padding: "0.6vw",
                      display: "inline-block",
                    }}
                    src={stepState[index].stepImg.preview}
                    alt={stepState[index].stepImg.preview}
                  />
                </>
              ) : index === 2 ? (
                <>
                  <p onClick={() => setFiles3("")} className="removeFile">
                    이미지 삭제
                  </p>
                  <img
                    onClick={() => setFiles3("")}
                    style={{
                      width: "90px",
                      // height: "180px",
                      transform: "translateX(100%)",
                      padding: "0.6vw",
                      display: "inline-block",
                    }}
                    src={stepState[index].stepImg.preview}
                    alt={stepState[index].stepImg.preview}
                  />
                </>
              ) : index === 3 ? (
                <>
                  <p onClick={() => setFiles4("")} className="removeFile">
                    이미지 삭제
                  </p>
                  <img
                    onClick={() => setFiles4("")}
                    style={{
                      width: "90px",
                      // height: "180px",
                      transform: "translateX(100%)",
                      padding: "0.6vw",
                      display: "inline-block",
                    }}
                    src={stepState[index].stepImg.preview}
                    alt={stepState[index].stepImg.preview}
                  />
                </>
              ) : index === 4 ? (
                <>
                  <p onClick={() => setFiles5("")} className="removeFile">
                    이미지 삭제
                  </p>
                  <img
                    onClick={() => setFiles5("")}
                    style={{
                      width: "90px",
                      // height: "180px",
                      transform: "translateX(100%)",
                      padding: "0.6vw",
                      display: "inline-block",
                    }}
                    src={stepState[index].stepImg.preview}
                    alt={stepState[index].stepImg.preview}
                  />
                </>
              ) : index === 5 ? (
                <>
                  <p onClick={() => setFiles6("")} className="removeFile">
                    이미지 삭제
                  </p>
                  <img
                    onClick={() => setFiles6("")}
                    style={{
                      width: "90px",
                      // height: "180px",
                      transform: "translateX(100%)",
                      padding: "0.6vw",
                      display: "inline-block",
                    }}
                    src={stepState[index].stepImg.preview}
                    alt={stepState[index].stepImg.preview}
                  />
                </>
              ) : index === 6 ? (
                <>
                  <p onClick={() => setFiles7("")} className="removeFile">
                    이미지 삭제
                  </p>
                  <img
                    onClick={() => setFiles7("")}
                    style={{
                      width: "90px",
                      // height: "180px",
                      transform: "translateX(100%)",
                      padding: "0.6vw",
                      display: "inline-block",
                    }}
                    src={stepState[index].stepImg.preview}
                    alt={stepState[index].stepImg.preview}
                  />
                </>
              ) : index === 7 ? (
                <>
                  <p onClick={() => setFiles8("")} className="removeFile">
                    이미지 삭제
                  </p>
                  <img
                    onClick={() => setFiles8("")}
                    style={{
                      width: "90px",
                      transform: "translateX(100%)",
                      padding: "0.6vw",
                      display: "inline-block",
                    }}
                    src={stepState[index].stepImg.preview}
                    alt={stepState[index].stepImg.preview}
                  />
                </>
              ) : index === 8 ? (
                <>
                  <p onClick={() => setFiles9("")} className="removeFile">
                    이미지 삭제
                  </p>
                  <img
                    onClick={() => setFiles9("")}
                    style={{
                      width: "90px",
                      // height: "180px",
                      transform: "translateX(100%)",
                      padding: "0.6vw",
                      display: "inline-block",
                    }}
                    src={stepState[index].stepImg.preview}
                    alt={stepState[index].stepImg.preview}
                  />
                </>
              ) : index === 9 ? (
                <>
                  <p onClick={() => setFiles10("")} className="removeFile">
                    이미지 삭제
                  </p>
                  <img
                    onClick={() => setFiles10("")}
                    style={{
                      width: "90px",
                      // height: "180px",
                      transform: "translateX(100%)",
                      padding: "0.6vw",
                      display: "inline-block",
                    }}
                    src={stepState[index].stepImg.preview}
                    alt={stepState[index].stepImg.preview}
                  />
                </>
              ) : index === 10 ? (
                <>
                  <p onClick={() => setFiles11("")} className="removeFile">
                    이미지 삭제
                  </p>
                  <img
                    onClick={() => setFiles11("")}
                    style={{
                      width: "90px",
                      // height: "180px",
                      transform: "translateX(100%)",
                      padding: "0.6vw",
                      display: "inline-block",
                    }}
                    src={stepState[index].stepImg.preview}
                    alt={stepState[index].stepImg.preview}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <>
            <Dropzone
              className="dropZoneWrap"
              onDrop={(acceptedFiles) => {
                if (index === 0) {
                  setFiles1(
                    acceptedFiles.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      })
                    )
                  );
                }
                if (index === 1) {
                  setFiles2(
                    acceptedFiles.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      })
                    )
                  );
                }
                if (index === 2) {
                  setFiles3(
                    acceptedFiles.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      })
                    )
                  );
                }
                if (index === 3) {
                  setFiles4(
                    acceptedFiles.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      })
                    )
                  );
                }
                if (index === 4) {
                  setFiles5(
                    acceptedFiles.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      })
                    )
                  );
                }
                acceptedFiles.forEach((file) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  console.log("readAsDataURL", file);
                  console.log("readAsDataURL", file.name);

                  const copyState = [...stepState];
                  copyState[index].stepImg = file;
                  setStep(copyState);
                  console.log("stepState", stepState);
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
                  <span style={{ fontSize: " .8vw" }}>이미지 등록</span>
                </div>
              )}
            </Dropzone>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <BtnWrap style={{ transform: "translateY(200%)" }}>
        <SmallBtn onClick={handleAddedSteps}>
          {" "}
          <FontAwesomeIcon icon={faCirclePlus} /> 순서 추가하기
        </SmallBtn>
        <SmallBtn onClick={handleRemovedSteps}>
          {" "}
          <FontAwesomeIcon icon={faCircleMinus} /> 순서 제거하기
        </SmallBtn>
        <SmallBtn
          type="button"
          className="addIngreBtn"
          onClick={onTemporarySave}
          btnState={btnState}
        >
          <FontAwesomeIcon icon={faFloppyDisk} /> 임시저장
        </SmallBtn>
      </BtnWrap>
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
                        draggingOver(e, index);
                        dragOverItemRef.current = index;
                      }}
                      onDrop={(e) => {
                        handleSort(e, index);
                      }}
                    >
                      <div
                        className="stepName"
                        style={{
                          border: "1px solid black",
                          height: "18vh",
                          fontSize: "1vw",
                          fontFamily: "mainFont",
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

                          width: "50vw",
                        }}
                        key={item.stepId}
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
                          handleFormChange(index, e);
                        }}
                        name="stepDescription"
                        ref={inputFocus}
                        value={item.stepDescription}
                      ></textarea>{" "}
                      {index === 0 && fileDropHandler(index, files1)}
                      {index === 1 && fileDropHandler(index, files2)}
                      {index === 2 && fileDropHandler(index, files3)}
                      {index === 3 && fileDropHandler(index, files4)}
                      {index === 4 && fileDropHandler(index, files5)}
                      {index === 5 && fileDropHandler(index, files6)}
                      {index === 6 && fileDropHandler(index, files7)}
                      {index === 7 && fileDropHandler(index, files8)}
                      {index === 8 && fileDropHandler(index, files9)}
                      {index === 9 && fileDropHandler(index, files10)}
                      {index === 10 && fileDropHandler(index, files11)}
                      {index === 11 && fileDropHandler(index, files12)}
                      {index === 12 && fileDropHandler(index, files13)}
                      {index === 13 && fileDropHandler(index, files14)}
                      {index === 14 && fileDropHandler(index, files15)}
                      {index === 15 && fileDropHandler(index, files16)}
                      {index === 16 && fileDropHandler(index, files17)}
                      {index === 17 && fileDropHandler(index, files18)}
                      {index === 18 && fileDropHandler(index, files19)}
                      {index === 19 && fileDropHandler(index, files20)}
                      {index === 20 && fileDropHandler(index, files21)}
                      {index === 21 && fileDropHandler(index, files22)}
                      {index === 22 && fileDropHandler(index, files23)}
                      {index === 23 && fileDropHandler(index, files24)}
                      {index === 24 && fileDropHandler(index, files25)}
                      {index === 25 && fileDropHandler(index, files26)}
                      {index === 26 && fileDropHandler(index, files27)}
                      {index === 27 && fileDropHandler(index, files28)}
                      {index === 28 && fileDropHandler(index, files29)}
                      {index === 29 && fileDropHandler(index, files30)}
                    </div>
                  </>
                );
              })}
            </DroppableDiv>
          </DraggableWrap>
        </div>
        {/* </Scrollable> */}
      </TotalWrap>
    </>
  );
};
export default RecipeOrderDrag;

const TotalWrap = styled.div`
  /* width: fit-content; */
  margin: 0 auto;
  /* width: 100%; */
  font-family: "mainFont";
`;

const DraggableWrap = styled.div`
  /* display: inline-flex; */
  font-family: "mainFont";
`;

const DroppableDiv = styled.div`
  /* width: 70em; */
  height: 100%;
  width: 100%;
  cursor: pointer;
  & > .draggableItem {
    width: 100%;
    margin: 2vh auto;
    align-items: center;
    /* width: 60vw; */
    border: 1px solid #463635;
    padding: 1vh 1vw;
    border-radius: 0.5vw;
  }

  & .textArea {
    font-family: "mainFont";
    border-radius: 0.5vw;

    /* width: 50vw; */
    /* width: 9vw; */
    height: 18vh;
    padding: 0.5vw;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
const BtnWrap = styled.div`
  float: right;
  margin-right: 1em;

  & > button:nth-child(2) {
    margin: 0 1em;
  }
`;
