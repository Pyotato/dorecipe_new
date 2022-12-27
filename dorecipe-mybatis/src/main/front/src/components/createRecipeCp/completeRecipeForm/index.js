import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
import EditDropZone from "@commonCp/dropzone";
import { useInput } from "@hooks/useInput";
import axios from "axios";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { colors } from "@theme/theme";
import { useMemo } from "react";

const CompleteRecipe = ({
  recipeState,
  setRecipeState,
  btnState,
  setBtnState,
}) => {
  // file state
  const [completionDropState, setCompletionDropState] = useState(
    "completionDropState"
  );

  const [submitState, setSubmitState] = useState(0);

  // const user = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const [path1, onChangePath1, setPath1] = useInput("");
  const [path2, onChangePath2, setPath2] = useInput("");
  const [path3, onChangePath3, setPath3] = useInput("");
  const [path4, onChangePath4, setPath4] = useInput("");

  const [completion_tip, onChangeTip, setCompletion_tip] = useInput("");

  const [files, setFiles] = useState("");
  const [recipe_thumbnail, setRecipeImgFiles] = useState([]);
  const user = useSelector((auth) => auth);
  const onLoadImgFile = (e) => {
    onChangePath1(e);
    onChangePath2(e);
    onChangePath3(e);
    onChangePath4(e);
  };

  const [btnDisabledState, setBtnDisabledState] = useState(false);
  const [btnDisplayState, setBtnDisplayState] = useState("none");

  //레시피 등록한 레시피번호 가져오기
  useMemo(() => {
    axios({
      method: "POST",
      url: "http://localhost:9000/recipe/getRecipeNum",
      // url: process.env.REACT_APP_HOST + "/recipe/getRecipeNum",
      headers: { "Content-Type": "multipart/form-data" },
      data: { member_id: user.auth.user.username, recipe_num: recipeState },
    }).then((response) => {
      setRecipeState(response.data);
      console.log("setRecipeState , CompleteRecipe:", response.data);
    });
  }, [recipeState]);

  console.log("setRecipeState , CompleteRecipe:", recipeState);

  useMemo(() => {
    if (btnState === 3) {
      setBtnDisabledState(false);
      setBtnDisplayState("block");
    } else {
      setBtnDisabledState(true);
      setBtnDisplayState("none");
    }
  }, [btnState]);

  const onTempSubmit = (e) => {
    // const { value } = e.target;
    e.preventDefault();
    const data = {
      // recipe_savetype: 1,
      completion_path1: `${path1}`,
      completion_path2: `${path2}`,
      completion_path3: `${path3}`,
      completion_path4: `${path4}`,
      completion_tip: `${completion_tip}`,
      // recipe_num: `${recipeState}`,
      recipe_num: recipeState,
      member_id: `${recipeState.member_id}`, //로그인한 멤버 정보 들어갈 자리
    };

    // console.log("data", data);
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
    formData.append("recipe_num", data.recipe_num);

    axios({
      method: "POST",
      url: "/recipe/insertRecipeComplete",
      baseURL: "http://localhost:9000",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((response) => {
        // console.log(response);
        for (let value of formData.values()) {
          // console.log(value);
        }
        console.log("성공?");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const onTempSubmit = useCallback((e) => {
  //   // const { value } = e.target;
  //   e.preventDefault();
  //   const data = {
  //     // recipe_savetype: 1,
  //     completion_path1: `${path1}`,
  //     completion_path2: `${path2}`,
  //     completion_path3: `${path3}`,
  //     completion_path4: `${path4}`,
  //     completion_tip: `${completion_tip}`,
  //     // recipe_num: `${recipeState}`,
  //     recipe_num: recipeState,
  //     member_id: `${recipeState.member_id}`, //로그인한 멤버 정보 들어갈 자리
  //   };

  //   // console.log("data", data);
  //   const blob = new Blob([JSON.stringify(data)], {
  //     type: "multipart/form-data",
  //   });

  //   const formData = new FormData();
  //   formData.append("data", blob);
  //   formData.append("member_id", data.member_id);

  //   recipe_thumbnail[0] !== undefined
  //     ? formData.append("recipe_imgs_completed", recipe_thumbnail[0])
  //     : formData.append("recipe_imgs_completed", null); /////파일 업로드
  //   recipe_thumbnail[1] !== undefined
  //     ? formData.append("recipe_imgs_completed", recipe_thumbnail[1])
  //     : formData.append("recipe_imgs_completed", null); /////파일 업로드
  //   recipe_thumbnail[2] !== undefined
  //     ? formData.append("recipe_imgs_completed", recipe_thumbnail[2])
  //     : formData.append("recipe_imgs_completed", null); /////파일 업로드
  //   recipe_thumbnail[3] !== undefined
  //     ? formData.append("recipe_imgs_completed", recipe_thumbnail[3])
  //     : formData.append("recipe_imgs_completed", null); /////파일 업로드
  //   recipe_thumbnail[0] !== undefined
  //     ? formData.append("completion_path1", data.completion_path1)
  //     : formData.append("completion_path1", null);
  //   recipe_thumbnail[1] !== undefined
  //     ? formData.append("completion_path2", data.completion_path2)
  //     : formData.append("completion_path2", null);
  //   recipe_thumbnail[2] !== undefined
  //     ? formData.append("completion_path3", data.completion_path3)
  //     : formData.append("completion_path3", null);
  //   recipe_thumbnail[3] !== undefined
  //     ? formData.append("completion_path4", data.completion_path4)
  //     : formData.append("completion_path4", null);
  //   formData.append("completion_tip", data.completion_tip);
  //   formData.append("recipe_num", data.recipe_num);

  //   axios({
  //     method: "POST",
  //     url: "/recipe/insertRecipeComplete",
  //     baseURL: "http://localhost:9000",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     data: formData,
  //   })
  //     .then((response) => {
  //       // console.log(response);
  //       for (let value of formData.values()) {
  //         // console.log(value);
  //       }
  //       console.log("성공?");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const onFinalSubmit = (e) => {
    e.preventDefault();

    const data = {
      completion_path1: `${path1}`,
      completion_path2: `${path2}`,
      completion_path3: `${path3}`,
      completion_path4: `${path4}`,
      completion_tip: `${completion_tip}`,
      recipe_num: recipeState,
      member_id: `${recipeState.member_id}`,
    };

    const blob = new Blob([JSON.stringify(data)], {
      type: "multipart/form-data",
    });

    const formData = new FormData();
    formData.append("data", blob);
    formData.append("member_id", data.member_id);

    for (let i = 0; i < recipe_thumbnail.length; i++) {
      formData.append("recipe_imgs_completed", recipe_thumbnail[i]);
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
    }

    formData.append("completion_tip", data.completion_tip);
    formData.append("recipe_num", data.recipe_num);

    axios({
      method: "POST",
      url: "/recipe/insertRecipeComplete",
      baseURL: "http://localhost:9000",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(() => {
        axios
          .get(
            "http://localhost:9000/recipe/updateRecipeSaveType/" + recipeState
          )
          .catch((err) => {
            console.log(err);
          });
      })
      .then(() => {
        navigate("/member/info/");
      });
  };

  return (
    <>
      <div>
        <TempSaveBtn
          type="button"
          onClick={onTempSubmit}
          disabled={btnDisabledState}
          style={{ display: btnDisplayState }}
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
  font-family: "mainFont";
  height: fit-content;
  margin: 0 auto;
  font-size: 14px;
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
  font-family: "mainFont";
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
