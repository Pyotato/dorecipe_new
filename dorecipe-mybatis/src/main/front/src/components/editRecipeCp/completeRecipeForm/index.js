import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";
import EditDropZone from "@commonCp/dropzone";
import { useInput } from "@hooks/useInput";
import axios from "axios";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { colors } from "@theme/theme";
import { ReactComponent as Toggle } from "@assets/Toggle.svg";
import { ReactComponent as ToggleClose } from "@assets/ToggleClose.svg";

const CompleteRecipe = ({
  recipeState,
  btnState,
  setBtnState,
  setRecipeState,
  // recipeId,
  recipeNum,
}) => {
  //btn state : 버튼 1번 이상 클릭 시 전체 임시저장/등록, 한번만 클릭시 해당 페이지 저장
  const [btnClickState, setBtnClickState] = useState(0);
  // file state
  const [completionDropState, setCompletionDropState] = useState(
    "completionDropState"
  );
  const [totalInfoState, setTotalInfoState] = useState(recipeState);
  const user = useSelector((auth) => auth);
  const [member_id, setMemberId] = useState("");
  const navigate = useNavigate();

  const [path1, onChangePath1, setPath1] = useInput("");
  const [path2, onChangePath2, setPath2] = useInput("");
  const [path3, onChangePath3, setPath3] = useInput("");
  const [path4, onChangePath4, setPath4] = useInput("");

  const [completion_tip, onChangeTip, setCompletion_tip] = useInput("");

  const [btnDisabledState, setBtnDisabledState] = useState(false);
  const [btnDisplayState, setBtnDisplayState] = useState("none");

  const [files, setFiles] = useState("");
  const [recipe_thumbnail, setRecipeImgFiles] = useState([]);

  // 데이터 로드
  const [loadState, setLoadState] = useState(true);

  const onLoadImgFile = (e) => {
    onChangePath1(e);
    onChangePath2(e);
    onChangePath3(e);
    onChangePath4(e);
  };

  useEffect(() => {
    setTotalInfoState(recipeState);
  }, []);

  useEffect(() => {
    // if (user.auth.isLoggedIn) {
    setMemberId(user.auth.user.username);
    console.log(user.auth.user.username);
    console.log("현재 로그인 아이디!!!!! : " + member_id);

    if (recipeState === undefined) {
      setLoadState(true);
    } else {
      const copyState = [...recipeState];
      setTotalInfoState(copyState);
      setLoadState(false);
    }
  }, []);

  useMemo(() => {
    // useCallback(() => {
    if (recipeState === undefined || recipeState.length === 0) {
      setLoadState(true);
    } else {
      if (totalInfoState === undefined || totalInfoState.length === 0) {
        // const copyState = [...recipeState];
        setTotalInfoState(recipeState);
      } else {
        setLoadState(false);
      }
    }
    console.log("totalInfoState", totalInfoState);
    console.log("recipeState", recipeState);
  }, [recipeState, totalInfoState]);

  useMemo(() => {
    if (totalInfoState !== undefined && totalInfoState.length > 0) {
      //null값이면 공백으로
      totalInfoState[0].completion_path !== null &&
        setPath1(totalInfoState[0].completion_path1);

      totalInfoState[0].completion_path2 !== null &&
        setPath2(totalInfoState[0].completion_path2);
      // ? setPath2(totalInfoState[0].completion_path2)
      // : setPath2("");
      totalInfoState[0].completion_path3 !== null &&
        setPath3(totalInfoState[0].completion_path3);
      // ? setPath3(totalInfoState[0].completion_path3)
      // : setPath3("");
      totalInfoState[0].completion_path4 !== null &&
        setPath4(totalInfoState[0].completion_path4);
      // ? setPath4(totalInfoState[0].completion_path4)
      // : setPath4("");
      totalInfoState[0].completion_tip !== null
        ? setCompletion_tip(totalInfoState[0].completion_tip)
        : setCompletion_tip("");
    }
  }, [totalInfoState]);

  const onFinalSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        "http://localhost:9000/recipe/updateRecipeSaveTypeTo0/" +
          totalInfoState[0].recipe_num
      )
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        navigate("/member/info/");
      });
  };

  function temporarySave() {
    const data = {
      // recipe_savetype: 1,
      completion_path1: `${path1}`,
      completion_path2: `${path2}`,
      completion_path3: `${path3}`,
      completion_path4: `${path4}`,
      completion_tip: `${completion_tip}`,
      recipe_num: recipeNum,

      member_id: `${member_id}`, //로그인한 멤버 정보 들어갈 자리
    };

    console.log("data", data);
    const blob = new Blob([JSON.stringify(data)], {
      type: "multipart/form-data",
    });

    const formData = new FormData();
    formData.append("data", blob);
    formData.append("member_id", data.member_id);

    for (let i = 0; i < recipe_thumbnail.length; i++) {
      formData.append("recipe_imgs_completed", recipe_thumbnail[i]);
      //파일 새로 등록
      if (typeof `completion_path${i}` != "string") {
        i === 0 &&
          (data.completion_path1 !== "" || data.completion_path1 !== null) &&
          formData.append(`completion_path${i}`, data.completion_path1);
        i === 1 &&
          (data.completion_path2 !== "" || data.completion_path2 !== null) &&
          formData.append(`completion_path${i}`, data.completion_path2);
        i === 2 &&
          (data.completion_path3 !== "" || data.completion_path3 !== null) &&
          formData.append(`completion_path${i}`, data.completion_path3);
        i === 3 &&
          (data.completion_path4 !== "" || data.completion_path4 !== null) &&
          formData.append(`completion_path${i}`, data.completion_path4);
        //링크 또는 그대로 올린다면
      }
      // if (typeof `completion_path${i}` == "string") {
      //   i === 0 &&
      //     formData.append(
      //       `completion_path${i}`,
      //       totalInfoState[0].completion_path1
      //     );
      //   i === 1 &&
      //     formData.append(
      //       `completion_path${i}`,
      //       totalInfoState[0].completion_path2
      //     );
      //   i === 2 &&
      //     formData.append(
      //       `completion_path${i}`,
      //       totalInfoState[0].completion_path3
      //     );
      //   i === 3 &&
      //     formData.append(
      //       `completion_path${i}`,
      //       totalInfoState[0].completion_path4
      //     );
      // }
    }

    //만약 저장내용을 변경하지 않는다면 그대로 보내기
    // if (totalInfoState.length > 0) {
    if (totalInfoState[0] !== undefined) {
      if (completion_tip === totalInfoState[0].completion_tip) {
        formData.append("completion_tip", totalInfoState[0].completion_tip);
      } else {
        formData.append("completion_tip", data.completion_tip);
      }

      //그대로 변경사항 없이 저장한다면
      if (totalInfoState[0].completion_path1 === path1) {
        formData.append(`completion_path1`, totalInfoState[0].completion_path1);
      }
      if (totalInfoState[0].completion_path2 === path2) {
        formData.append(`completion_path1`, totalInfoState[0].completion_path1);
      }
      if (totalInfoState[0].completion_path3 === path3) {
        formData.append(`completion_path1`, totalInfoState[0].completion_path1);
      }
      if (totalInfoState[0].completion_path4 === path4) {
        formData.append(`completion_path1`, totalInfoState[0].completion_path1);
      }
    }

    formData.append("recipe_num", data.recipe_num);

    axios({
      method: "POST",
      url: "http://localhost:9000/recipe/insertRecipeComplete",
      // url: process.env.REACT_APP_HOST + "/recipe/insertRecipeComplete",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    }).then((response) => {
      console.log(response);
      console.log("성공?");
    });
  }

  useEffect(() => {
    console.log("complete recipe useEffect ~~~~~");
    return () => {
      console.log("complete recipe return ~~~~~");
      if (recipeNum !== undefined && totalInfoState !== undefined) {
        totalInfoState.length > 0 && temporarySave();
      }
    };
  }, [path1, path2, path3, path4, completion_tip]);

  const [showPreviousSavePath, setShowPreviousSavePath] = useState(0);
  const showPreviousSave = useMemo(() => {
    if (
      totalInfoState.length > 0 &&
      totalInfoState[0].completion_path1 !== "null" &&
      totalInfoState[0].completion_path1 !== null
    ) {
      return (
        <>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5em",
              height: "2em",
            }}
            className="toggleImg"
          >
            {showPreviousSavePath === 1 && (
              <ToggleClose
                onClick={() => {
                  showPreviousSavePath === 1
                    ? setShowPreviousSavePath(0)
                    : setShowPreviousSavePath(1);
                }}
              />
            )}
            {showPreviousSavePath === 0 && (
              <Toggle
                onClick={() => {
                  showPreviousSavePath === 1
                    ? setShowPreviousSavePath(0)
                    : setShowPreviousSavePath(1);
                }}
              />
            )}

            {showPreviousSavePath === 0 && (
              <div
                onClick={() => {
                  showPreviousSavePath === 1
                    ? setShowPreviousSavePath(0)
                    : setShowPreviousSavePath(1);
                }}
              >
                이전 등록했던 이미지 파일 보기
              </div>
            )}
            {showPreviousSavePath === 1 && (
              <div
                onClick={() => {
                  showPreviousSavePath === 1
                    ? setShowPreviousSavePath(0)
                    : setShowPreviousSavePath(1);
                }}
              >
                닫기
              </div>
            )}
          </div>
          {showPreviousSavePath === 1 ? (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5em",
                width: "100%",
              }}
            >
              {totalInfoState !== undefined &&
              totalInfoState[0].completion_path1 !== null &&
              totalInfoState[0].completion_path1 !== "null" &&
              totalInfoState[0].completion_path1 === path1 ? (
                <div
                  style={{
                    textAlign: "center",
                    width: "25%",
                    color: "red",
                    margin: "0",
                  }}
                  onClick={() => {
                    setPath1(totalInfoState[0].completion_path1);
                    console.log("setPath1", path1);
                  }}
                >
                  <div style={{ transform: "translateY(6vw)" }}>
                    파일 되돌리기
                  </div>
                  <img
                    className="previousCompleteImg"
                    src={path1}
                    alt={path1}
                    style={{ maxHeight: "12em", maxWidth: "13vw" }}
                  />
                </div>
              ) : (
                <></>
              )}
              {totalInfoState !== undefined &&
              totalInfoState[0].completion_path2 !== "null" &&
              totalInfoState[0].completion_path2 !== null &&
              totalInfoState[0].completion_path2 === path2 ? (
                <div
                  style={{
                    textAlign: "center",
                    width: "25%",
                    color: "red",
                    margin: "0",
                  }}
                  onClick={() => {
                    setPath2(totalInfoState[0].completion_path2);
                    console.log("setPath2", path2);
                  }}
                >
                  <div style={{ transform: "translateY(6vw)" }}>
                    파일 되돌리기
                  </div>
                  <img
                    className="previousCompleteImg"
                    src={path2}
                    alt={path2}
                    style={{ maxHeight: "12em", maxWidth: "13vw" }}
                  />
                </div>
              ) : (
                <></>
              )}

              {totalInfoState !== undefined &&
              totalInfoState[0].completion_path3 !== null &&
              totalInfoState[0].completion_path3 !== "null" &&
              totalInfoState[0].completion_path3 === path3 ? (
                <div
                  style={{
                    textAlign: "center",
                    width: "25%",
                    color: "red",
                    margin: "0",
                  }}
                  onClick={() => {
                    setPath3(totalInfoState[0].completion_path3);
                    console.log("setPath3", path3);
                  }}
                >
                  <div style={{ transform: "translateY(6vw)" }}>
                    파일 되돌리기
                  </div>
                  <img
                    className="previousCompleteImg"
                    src={path3}
                    alt={path3}
                    style={{ maxHeight: "12em", maxWidth: "13vw" }}
                  />
                </div>
              ) : (
                <></>
              )}
              {totalInfoState !== undefined &&
              totalInfoState[0].completion_path4 !== null &&
              totalInfoState[0].completion_path4 !== "null" &&
              totalInfoState[0].completion_path4 === path4 ? (
                <div
                  style={{
                    textAlign: "center",
                    width: "25%",
                    color: "red",
                    margin: "0",
                  }}
                  onClick={() => {
                    setPath4(totalInfoState[0].completion_path4);
                    console.log("setPath4", path4);
                  }}
                >
                  <div style={{ transform: "translateY(6vw)" }}>
                    파일 되돌리기
                  </div>
                  <img
                    className="previousCompleteImg"
                    src={path4}
                    alt={path4}
                    style={{ maxHeight: "12em", maxWidth: "13vw" }}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}{" "}
        </>
      );
    }
  }, [totalInfoState, showPreviousSavePath]);

  return (
    <>
      <div>
        <TempSaveBtn
          type="button"
          // onClick={onSubmit}
          // disabled={btnDisabledState}
          style={{ display: "none" }}
          // style={{ display: "block" }}
          // style={{ display: btnDisplayState }}
        >
          <FontAwesomeIcon icon={faFloppyDisk} /> <div>임시저장</div>
        </TempSaveBtn>
      </div>
      <TotalWrap style={{ clear: "left" }}>
        <div
          style={{
            margin: "0 auto",
            width: "85%",
            backgroundColor: "white",
            padding: "1vw",
            borderRadius: "0.5vw",
          }}
        >
          {showPreviousSave}
          {/* {() => showPreviousSave()} */}
          <EditDropZone
            files={files}
            setFiles={setFiles}
            setPath1={setPath1}
            setPath2={setPath2}
            setPath3={setPath3}
            setPath4={setPath4}
            onChange={onLoadImgFile}
            setRecipeImgFiles={setRecipeImgFiles}
            completionDropState={completionDropState}
          />
        </div>
        <div
          style={{
            backgroundColor: "#CF702C",
            float: "left",
            transform: "translateX(-2.2vw)",
            marginTop: "6vh",
            width: "8vw",
            textAlign: "center",
            padding: "1vw 1vh",
            fontWeight: "700",
          }}
        >
          요리팁
        </div>
        <div
          style={{
            transform: "translateX(-2.2vw)",
            float: "left",
            marginTop: "6vh",
            marginBottom: "6vh",
            padding: "1vw 1vh",
          }}
        >
          <FontAwesomeIcon icon={faLightbulb} /> 레시피를 더욱 맛있게 하기
          위해서 담은 노하우를 공유해주세요.
        </div>
      </TotalWrap>
      <div style={{ width: "100%" }}>
        <ContentTextarea
          rows="2"
          cols="50"
          value={completion_tip}
          onChange={onChangeTip}
          placeholder="예: 양파를 고를때는 납작한 암양파를 고르시면 덜 맵고 단맛이 강해요."
        ></ContentTextarea>
      </div>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <SubmitBtn type="button" onClick={onFinalSubmit} value="submit">
          레시피 등록하기
        </SubmitBtn>
      </div>
    </>
  );
};
export default CompleteRecipe;

const TotalWrap = styled.div`
  width: 95%;

  height: fit-content;
  margin: 0 auto;
  font-size: 14px;

  & .toggleImg:hover {
    cursor: pointer;
    color: ${colors.color_carrot_orange};
  }

  & .previousCompleteImg:hover {
    opacity: 0.3;
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
  background-color: magenta;
  border: 1px solid transparent;

  &:hover {
    cursor: pointer;
    transform: scaleX(1.2) scaleY(1.2);
    background-color: ${colors.color_carrot_orange};
    color: ${colors.color_beige_tinted_white};
  }
`;
const SubmitBtn = styled.button`
  width: 100%;
  margin-top: 6vh;

  border-radius: 0.5vw;
  font-size: 2em;
  border: 1px solid transparent;
  background-color: ${colors.color_milktea_brown};
  color: ${colors.color_beige_tinted_white};

  &:hover {
    cursor: pointer;
    transform: scaleY(1.2);
    background-color: ${colors.color_carrot_orange};
    color: ${colors.color_beige_tinted_white};
  }
`;
const ContentTextarea = styled.textarea`
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
