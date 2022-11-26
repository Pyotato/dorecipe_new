import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faCirclePlus,
  faCircleMinus,
  faImage,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useCallback, useEffect } from "react";
import { SmallBtn, DefaultBtn } from "../../_common/buttons";
import "./style.css";
import axios from "axios";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
      // let newSteps = {
      //   recipe_num: steps[0].recipe_num,
      //   stepId: steps.length,
      //   stepDescription: "",
      //   stepImg: "",
      // };
      // setStep([...stepState, newSteps]);
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
          // console.log("stepImg!!!!!!!!!!!!!!!", data[i].stepImg);
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

  return (
    <>
      <TotalWrap>
        <Instruction>
          <FontAwesomeIcon icon={faLightbulb} /> 요리의 맛이 좌우될 수 있는
          중요한 부분을 상세하게 적어주세요
        </Instruction>
        <BtnWrap>
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
        <Scrollable>
          <div style={{ backgroundColor: "red", height: "80vh" }}>
            <DraggableWrap>
              <DroppableDiv droppable="true">
                {stepState.map((item, index) => {
                  return (
                    <>
                      <div
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
                        <div className="stepName">Step {index + 1}</div>
                        <textarea
                          className="textArea"
                          rows="2"
                          cols="70"
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
                        ></textarea>
                        {index === 0 && (
                          <>
                            {files1.length > 0 ? (
                              <>
                                <div className="fileBox">
                                  <p className="removeFile">이미지 삭제</p>
                                  <img
                                    onClick={() => setFiles1("")}
                                    style={{
                                      maxWidth: "30em",
                                      height: "100px",
                                      margin: "0",
                                      translate: "5em",
                                      display: "inline-block",
                                    }}
                                    src={stepState[0].stepImg.preview}
                                    alt={stepState[0].stepImg.preview}
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <Dropzone
                                  className="dropZoneWrap"
                                  onDrop={(acceptedFiles) => {
                                    setFiles1(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);

                                      const copyState = [...stepState];
                                      copyState[0].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
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
                                        <FontAwesomeIcon icon={faImage} />
                                      </div>
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 1 && (
                          <>
                            {files2.length > 0 ? (
                              <div className="fileBox">
                                <p
                                  className="removeFile"
                                  style={{ zIndex: "700" }}
                                >
                                  이미지 삭제
                                </p>
                                <img
                                  onClick={() => setFiles2("")}
                                  style={{
                                    maxWidth: "30em",
                                    height: "100px",
                                    margin: "0",
                                    translate: "5em",
                                    display: "inline-block",
                                  }}
                                  src={stepState[1].stepImg.preview}
                                  alt={stepState[1].stepImg.preview}
                                />
                              </div>
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles2(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[1].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      {" "}
                                      <div
                                        style={{
                                          fontSize: "2px",
                                          textAlign: "center",
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faImage} />
                                      </div>
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 2 && (
                          <>
                            {files3.length > 0 ? (
                              <div className="fileBox">
                                <p
                                  className="removeFile"
                                  style={{ zIndex: "700" }}
                                >
                                  이미지 삭제
                                </p>
                                <img
                                  onClick={() => setFiles3("")}
                                  style={{
                                    maxWidth: "30em",
                                    height: "100px",
                                    margin: "0",
                                    translate: "5em",
                                    display: "inline-block",
                                  }}
                                  src={stepState[2].stepImg.preview}
                                  alt="HeroImage"
                                />
                              </div>
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles3(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[2].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 3 && (
                          <>
                            {files4.length > 0 ? (
                              <img
                                onClick={() => setFiles4("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[3].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles4(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[3].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 4 && (
                          <>
                            {files5.length > 0 ? (
                              <img
                                onClick={() => setFiles5("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[4].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles5(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[4].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 5 && (
                          <>
                            {files6.length > 0 ? (
                              <img
                                onClick={() => setFiles6("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[5].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles6(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[5].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 6 && (
                          <>
                            {files7.length > 0 ? (
                              <img
                                onClick={() => setFiles7("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[6].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles7(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[6].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 7 && (
                          <>
                            {files8.length > 0 ? (
                              <img
                                onClick={() => setFiles8("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[7].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles8(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[7].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 8 && (
                          <>
                            {files9.length > 0 ? (
                              <img
                                onClick={() => setFiles9("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[8].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles9(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[8].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 9 && (
                          <>
                            {files10.length > 0 ? (
                              <img
                                onClick={() => setFiles10("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[9].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles10(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[9].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 10 && (
                          <>
                            {files11.length > 0 ? (
                              <img
                                onClick={() => setFiles11("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[10].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles11(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[10].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}

                        {index === 11 && (
                          <>
                            {files12.length > 0 ? (
                              <img
                                onClick={() => setFiles12("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[11].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles12(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[11].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 12 && (
                          <>
                            {files13.length > 0 ? (
                              <img
                                onClick={() => setFiles13("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[1].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles13(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[12].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 13 && (
                          <>
                            {files14.length > 0 ? (
                              <img
                                onClick={() => setFiles14("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[13].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles14(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[13].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 14 && (
                          <>
                            {files15.length > 0 ? (
                              <img
                                onClick={() => setFiles15("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[14].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles15(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[14].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 15 && (
                          <>
                            {files16.length > 0 ? (
                              <img
                                onClick={() => setFiles16("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[15].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles16(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[15].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 16 && (
                          <>
                            {files17.length > 0 ? (
                              <img
                                onClick={() => setFiles17("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[16].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles17(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[16].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 17 && (
                          <>
                            {files18.length > 0 ? (
                              <img
                                onClick={() => setFiles18("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[17].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles18(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[17].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 18 && (
                          <>
                            {files19.length > 0 ? (
                              <img
                                onClick={() => setFiles19("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[18].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles19(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[18].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 19 && (
                          <>
                            {files20.length > 0 ? (
                              <img
                                onClick={() => setFiles20("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[19].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles20(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[19].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 20 && (
                          <>
                            {files21.length > 0 ? (
                              <img
                                onClick={() => setFiles21("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[20].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles21(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[20].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 21 && (
                          <>
                            {files22.length > 0 ? (
                              <img
                                onClick={() => setFiles22("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[21].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles22(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[21].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 22 && (
                          <>
                            {files23.length > 0 ? (
                              <img
                                onClick={() => setFiles23("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[22].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles23(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[22].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 23 && (
                          <>
                            {files24.length > 0 ? (
                              <img
                                onClick={() => setFiles24("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[23].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles24(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[23].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 24 && (
                          <>
                            {files25.length > 0 ? (
                              <img
                                onClick={() => setFiles25("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[24].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles25(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[24].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 25 && (
                          <>
                            {files26.length > 0 ? (
                              <img
                                onClick={() => setFiles26("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[25].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles26(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[25].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 26 && (
                          <>
                            {files27.length > 0 ? (
                              <img
                                onClick={() => setFiles27("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[26].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles27(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[26].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 27 && (
                          <>
                            {files28.length > 0 ? (
                              <img
                                onClick={() => setFiles28("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[27].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles28(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[27].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 28 && (
                          <>
                            {files29.length > 0 ? (
                              <img
                                onClick={() => setFiles29("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[28].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles29(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[28].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {index === 29 && (
                          <>
                            {files30.length > 0 ? (
                              <img
                                onClick={() => setFiles30("")}
                                style={{
                                  maxWidth: "30em",
                                  height: "100px",
                                  margin: "0",
                                  display: "inline-block",
                                }}
                                src={stepState[29].stepImg.preview}
                                alt="HeroImage"
                              />
                            ) : (
                              <>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    setFiles30(
                                      acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                        })
                                      )
                                    );
                                    acceptedFiles.forEach((file) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      console.log("readAsDataURL", file);
                                      console.log("readAsDataURL", file.name);
                                      const copyState = [...stepState];
                                      copyState[29].stepImg = file;
                                      setStep(copyState);
                                      console.log("stepState", stepState);
                                    });
                                  }}
                                  name="heroImage"
                                  multiple={false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
                                    >
                                      <input {...getInputProps()} />
                                      <span style={{ fontSize: ".8rem" }}>
                                        이미지 등록
                                      </span>
                                    </div>
                                  )}
                                </Dropzone>
                              </>
                            )}
                          </>
                        )}
                        {/* {index !== 0 && (
                          <div className="hoverable">
                            <FontAwesomeIcon icon={faCircleQuestion} /> 입력란을
                            잡고 순서를 움직여 보세요!
                          </div>
                        )} */}
                      </div>
                    </>
                  );
                })}
              </DroppableDiv>
            </DraggableWrap>
          </div>
        </Scrollable>
      </TotalWrap>
    </>
  );
};
export default RecipeOrderDrag;

const TotalWrap = styled.div`
  width: fit-content;
  margin: 0 auto;
  background-color: orange;
  height: 100vh;
  width: 90vw;
  font-size: 14px;
  padding: 2em;
`;
const Instruction = styled.div`
  display: inline-block;
  height: 2em;
`;
const DraggableWrap = styled.div`
  display: inline-flex;
`;
const Scrollable = styled.section`
  width: 100%;
  height: 80vh;
  margin: 1em auto;

  & > div {
    padding: 2rem;
    height: 27em;
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
const DroppableDiv = styled.div`
  width: 70em;
  height: 100%;
  cursor: pointer;
  & > .draggableItem {
    margin: 1em auto;
    width: 85%;
    background-color: #fffdf5;
    border: 1px solid #463635;
    padding: 1em;
    margin: 1em auto;
    border-radius: 0.5em;
  }

  & .textArea {
    border-radius: 0.5em;
    margin-right: 1em;
    width: 30em;
    height: 6em;
    padding: 0.4em;
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
