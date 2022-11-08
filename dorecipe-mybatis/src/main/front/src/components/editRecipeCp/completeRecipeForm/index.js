import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState, useCallback, useEffect } from "react";
import EditDropZone from "../../_common/dropzone";
import { useInput } from "../../../hooks/useInput";
import axios from "axios";
import { SubmitRecipeBtn } from "../../_common/buttons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompleteRecipe = ({ recipeState }) => {
  //btn state : 버튼 1번 이상 클릭 시 전체 임시저장/등록, 한번만 클릭시 해당 페이지 저장
  const [buttonState, setBtnState] = useState(0);
  // file state
  const [completionDropState, setCompletionDropState] = useState(
    "completionDropState"
  );

  const user = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const [path1, onChangePath1, setPath1] = useInput("");
  const [path2, onChangePath2, setPath2] = useInput("");
  const [path3, onChangePath3, setPath3] = useInput("");
  const [path4, onChangePath4, setPath4] = useInput("");

  const [completion_tip, onChangeTip, setCompletion_tip] = useInput("");

  const [files, setFiles] = useState("");
  const [recipe_thumbnail, setRecipeImgFiles] = useState([]);
  const onLoadImgFile = (e) => {
    onChangePath1(e);
    onChangePath2(e);
    onChangePath3(e);
    onChangePath4(e);
  };

  const onSubmit = useCallback((e) => {
    const { value } = e.target;
    e.preventDefault();
    const data = {
      recipe_savetype: 1,
      completion_path1: `${path1}`,
      completion_path2: `${path2}`,
      completion_path3: `${path3}`,
      completion_path4: `${path4}`,
      completion_tip: `${completion_tip}`,
      recipe_num: `${recipeState}`,
      member_id: `${recipeState.member_id}`, //로그인한 멤버 정보 들어갈 자리
    };

    console.log("data", data);
    const blob = new Blob([JSON.stringify(data)], {
      type: "multipart/form-data",
    });

    const formData = new FormData();
    formData.append("data", blob);
    formData.append("member_id", data.member_id);

    recipe_thumbnail[0] !== undefined
      ? formData.append("recipe_imgs_completed", recipe_thumbnail[0])
      : formData.append("recipe_imgs_completed", null); /////파일 업로드
    recipe_thumbnail[1] !== undefined
      ? formData.append("recipe_imgs_completed", recipe_thumbnail[1])
      : formData.append("recipe_imgs_completed", null); /////파일 업로드
    recipe_thumbnail[2] !== undefined
      ? formData.append("recipe_imgs_completed", recipe_thumbnail[2])
      : formData.append("recipe_imgs_completed", null); /////파일 업로드
    recipe_thumbnail[3] !== undefined
      ? formData.append("recipe_imgs_completed", recipe_thumbnail[3])
      : formData.append("recipe_imgs_completed", null); /////파일 업로드
    recipe_thumbnail[0] !== undefined
      ? formData.append("completion_path1", data.completion_path1)
      : formData.append("completion_path1", null);
    recipe_thumbnail[1] !== undefined
      ? formData.append("completion_path2", data.completion_path2)
      : formData.append("completion_path2", null);
    recipe_thumbnail[2] !== undefined
      ? formData.append("completion_path3", data.completion_path3)
      : formData.append("completion_path3", null);
    recipe_thumbnail[3] !== undefined
      ? formData.append("completion_path4", data.completion_path4)
      : formData.append("completion_path4", null);
    formData.append("completion_tip", data.completion_tip);
    formData.append("recipe_num", recipeState);

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
      for (let value of formData.values()) {
        console.log(value);
      }
      console.log("성공?");
    });

    console.log({ value });
    if (value === "submit") {
      if (buttonState === 0) {
      }

      alert(" 등록하셨습니다.");
      setBtnState(buttonState + 1);
    } else if (value === "saveAsDraft") {
      alert(" 임시저장 하셨습니다.");
      setBtnState(buttonState + 1);
    }
  });

  return (
    <>
      <TotalWrap>
        <FlexWrap>
          <div>
            <Instruction>
              <FontAwesomeIcon icon={faLightbulb} /> 완성 요리 사진 : 완성된
              사진을 등록하시면 레시피가 더욱 돋보입니다.
            </Instruction>
            <BasicFormWrap>
              <div style={{ height: "60em", margin: "0 auto" }}>
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
            </BasicFormWrap>
            <div>
              <Instruction>
                <FontAwesomeIcon icon={faLightbulb} /> 요리팁: 레시피를 더욱
                맛있게 하기 위해서 담은 노하우를 공유해주세요.
              </Instruction>
              <div>
                <ContentTextarea
                  rows="2"
                  cols="50"
                  value={completion_tip}
                  onChange={onChangeTip}
                  placeholder="예: 양파를 고를때는 납작한 암양파를 고르시면 덜 맵고 단맛이 강해요."
                ></ContentTextarea>
              </div>
            </div>
          </div>
        </FlexWrap>
        {buttonState === 0 ? (
          <>
            {" "}
            <BtnWrap>
              <SubmitRecipeBtn type="button" onClick={onSubmit} value="submit">
                레시피 등록하기
              </SubmitRecipeBtn>
              <SubmitRecipeBtn
                type="button"
                onClick={onSubmit}
                value="saveAsDraft"
              >
                임시 저장하기
              </SubmitRecipeBtn>
            </BtnWrap>
          </>
        ) : (
          <>
            <BtnWrap>
              <SubmitRecipeBtn type="button" onClick={onSubmit} value="submit">
                레시피 등록(다시)하기
              </SubmitRecipeBtn>
              <SubmitRecipeBtn
                type="button"
                onClick={onSubmit}
                value="saveAsDraft"
              >
                임시(다시) 저장하기
              </SubmitRecipeBtn>
            </BtnWrap>
          </>
        )}
      </TotalWrap>
    </>
  );
};
export default CompleteRecipe;

const TotalWrap = styled.div`
  width: 90%;
  height: fit-content;
  margin: 0 auto;
  font-size: 14px;
`;
const FlexWrap = styled.div`
  /* display: flex; */
  min-width: 30em;
  max-width: 100%;
`;
const BasicFormWrap = styled.div`
  display: inline-flex;
  color: #463635;
  margin: 0 4.5em;
  width: 90%;
  align-items: center;
  font-size: 6px;
  /* height: 12em; */
  padding: 2em;
  justify-content: center;
  & > div {
    height: 30em;
    padding: 2rem;
    height: 27em;
    width: 100%;
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
const ContentTextarea = styled.textarea`
  resize: none;
  width: 44em;
  height: 4em;
  margin-bottom: 1em;
  padding: 10px;
  border-radius: 0.5em;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Instruction = styled.div`
  display: inline-block;
  height: 2em;
`;
const BtnWrap = styled.div`
  display: flex;
`;
