import axios from "axios";
import { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useInput } from "@hooks/useInput";
import { colors } from "@theme/theme";
import Dropzone from "react-dropzone";

// Warning: </static/media/UploadFile.18ffe785eb682d6b9db69f32136ffd34.svg /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.
//     at /static/media/UploadFile.18ffe785eb682d6b9db69f32136ffd34.svg 에러뜸..
// import UploadFile from "@assets/UploadFile.svg";

import { ReactComponent as UploadFile } from "@assets/UploadFile.svg";
import BasicSpinner from "@commonCp/loading";

const CreateKnowhowCp = ({
  updateOrCreate,
  setUpdateOrCreateState,
  isLoadingKnowhow,
  setKnowhowLoadingState,
}) => {
  const knowHowData1 = useRef();
  const knowHowData2 = useRef();

  const [know_title, onChangeKnowhowTitle, setKnowhowTitle] = useInput("");
  const [know_content, onChangeKnowhowContent, setKnowhowContent] =
    useInput("");
  const [know_path, onChangeKnowhowPath, setKnowhowPath] = useInput("");
  const [KnowFiles, setKnowFiles] = useState("");
  const [toggleState, setToggleState] = useState(0);
  const [previewstate, setPreviewState] = useState("");
  const [know_num, setKnowNum] = useState();

  useMemo(() => {
    if (updateOrCreate !== undefined) {
      setKnowhowTitle(updateOrCreate.know_title);
      setKnowhowContent(updateOrCreate.know_content);
      setKnowhowPath(updateOrCreate.know_path);
      setKnowFiles("");
      setKnowNum(updateOrCreate.know_num);

      return;
    }
  }, [updateOrCreate]);

  useCallback(() => {
    setKnowhowTitle("");
    setKnowhowContent("");
    setKnowFiles("");
    setKnowhowPath("");
  }, [updateOrCreate]);

  const onPreviewDelete = useCallback(() => {
    setPreviewState("");
    setKnowFiles("");
    setKnowhowPath("");
    setToggleState(0);
  }, [KnowFiles]);

  const onDropHandler = useCallback(
    (files) => {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        setKnowFiles(file);
        setKnowhowPath(file.name);
      });

      setPreviewState(
        files.map((file) =>
          Object.assign(previewstate, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [KnowFiles]
  );

  const onLoadImgFile = (e) => {
    onChangeKnowhowPath(e);
  };

  const insertKnowhowPost = useCallback(
    (e) => {
      e.preventDefault();

      setKnowhowLoadingState(true);
      if (know_title === "") {
        knowHowData1.current.focus();
        return;
      } else if (know_content === "") {
        knowHowData2.current.focus();
        return;
      } else {
        const KnowData = {
          know_title: `${know_title}`,
          know_content: `${know_content}`,
          know_path: KnowFiles.name,
        };

        const KnowBlob = new Blob([JSON.stringify(KnowData)], {
          type: "application/json",
        });

        const KnowFormData = new FormData();
        KnowFormData.append("data", KnowBlob);
        KnowFormData.append("know_title", KnowData.know_title);
        KnowFormData.append("know_content", KnowData.know_content);
        KnowFormData.append("know_path", KnowData.know_path);
        KnowFormData.append("know_image", KnowFiles); //이미지 파일

        axios({
          method: "post",
          baseURL: "http://localhost:9000",
          url: "/knowhow/insert",
          // url: process.env.REACT_APP_HOST + "/knowhow/insert",
          headers: { "Content-Type": "multipart/form-data" },
          data: KnowFormData,
        })
          .then(() => {
            alert("노하우가 등록되었습니다.");
          })
          .catch((err) => console.log("노하우등록실패", err));
      }
    },
    [know_path, know_content, know_title, KnowFiles]
  );

  const onUpdateKnowhowPost = useCallback(
    (e) => {
      e.preventDefault();

      if (know_title === "") {
        knowHowData1.current.focus();
        return;
      } else if (know_content === "") {
        knowHowData2.current.focus();
        return;
      } else {
        const KnowData = {
          know_num: `${know_num}`,
          know_title: `${know_title}`,
          know_content: `${know_content}`,
          know_path:
            know_path !== updateOrCreate.know_path
              ? KnowFiles.name
              : `${know_path}`,
        };

        const KnowBlob = new Blob([JSON.stringify(KnowData)], {
          type: "application/json",
        });

        const KnowFormData = new FormData();
        KnowFormData.append("data", KnowBlob);
        KnowFormData.append("know_num", KnowData.know_num);
        KnowFormData.append("know_title", KnowData.know_title);
        KnowFormData.append("know_content", KnowData.know_content);
        KnowFormData.append("know_path", KnowData.know_path);
        // //만약 새로운 이미지 등록한다면
        if (KnowData.know_path !== updateOrCreate.know_path) {
          KnowFormData.append("know_image", KnowFiles);
        }

        setKnowhowLoadingState(true);

        axios({
          method: "post",
          url: "http://localhost:9000/knowhow/update",
          headers: { "Content-Type": "multipart/form-data" },
          data: KnowFormData,
        })
          .then((res) => {
            console.log("onUpdateKnowhowPost", res.data);
            setKnowhowContent("");
            setKnowhowTitle("");
            setKnowFiles("");
            setKnowhowPath("");
            setKnowhowLoadingState(true);
            setUpdateOrCreateState([]);

            //alert 닫고나서 로딩모달 닫아주기
            if (!alert("노하우가 수정되었습니다.")) {
              setKnowhowLoadingState(false);
            }
          })

          .catch((err) => console.log("노하우 수정 실패", err));
      }
    },
    [know_num, know_path, know_content, know_title, KnowFiles, updateOrCreate]
  );

  // console.log("isLoadingKnowhow", isLoadingKnowhow);
  return (
    <>
      {previewstate.length > 0 && toggleState === 1 && (
        <ModalBackground></ModalBackground>
      )}

      {isLoadingKnowhow && (
        <>
          <ModalItem>
            <BasicSpinner />
          </ModalItem>
          <ModalBackground></ModalBackground>
        </>
      )}
      {updateOrCreate !== undefined &&
        know_path !== "" &&
        toggleState === 1 && <ModalBackground></ModalBackground>}
      <Wrap>
        {updateOrCreate !== undefined && (
          <div className="flexWrap" style={{ alignItems: "flex-start" }}>
            <div className="infoName">글 번호</div>
            <div className="inputItem">{know_num}</div>
          </div>
        )}
        <div>
          <div className="flexWrap" style={{ alignItems: "flex-start" }}>
            <div className="infoName">
              제목 {know_title === "" && <WarningMsg>필수</WarningMsg>}
            </div>

            <div className="inputItem">
              {updateOrCreate !== undefined ? (
                <input
                  style={{ margin: 0 }}
                  className="text"
                  name="know_title"
                  ref={knowHowData1}
                  value={know_title || ""}
                  required
                  type="text"
                  placeholder=" 제목을 입력해주세요"
                  onChange={onChangeKnowhowTitle}
                />
              ) : (
                <input
                  style={{ margin: 0 }}
                  className="text"
                  name="know_title"
                  ref={knowHowData1}
                  value={know_title || ""}
                  required
                  type="text"
                  placeholder=" 제목을 입력해주세요"
                  onChange={onChangeKnowhowTitle}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flexWrap">
          <div className="infoName">
            내용 {know_content === "" && <WarningMsg>필수</WarningMsg>}
          </div>

          {updateOrCreate !== undefined ? (
            <textarea
              className="content"
              placeholder=" 내용을 입력해주세요"
              required
              name="know_content"
              ref={knowHowData2}
              value={know_content || ""}
              onChange={onChangeKnowhowContent}
            ></textarea>
          ) : (
            <textarea
              className="content"
              placeholder=" 내용을 입력해주세요"
              required
              name="know_content"
              ref={knowHowData2}
              value={know_content || ""}
              onChange={onChangeKnowhowContent}
            ></textarea>
          )}
        </div>{" "}
        <div className="flexWrap">
          <div className="infoName">파일 첨부</div>
          <div className="inputItem fileDropZonWrap">
            <Dropzone onDrop={onDropHandler}>
              {({ getRootProps, getInputProps }) => (
                <>
                  {previewstate.length > 0 ||
                  (updateOrCreate !== undefined &&
                    know_path !== "" &&
                    know_path !== "undefined") ? (
                    <>
                      {toggleState === 0 ? (
                        <div
                          className="hoverCursor"
                          onClick={() => setToggleState(1)}
                        >
                          [ 미리보기 ]
                        </div>
                      ) : (
                        <>
                          <div style={{ overflow: "hidden" }}>
                            <div className="imgModalWrap">
                              {/* <div className="removeFile hoverCursor">
                                <span onClick={() => onPreviewDelete()}>
                                  [ 파일 삭제 ]
                                </span>
                              </div> */}
                              <div
                                style={{
                                  float: "right",
                                  marginBottom: "1em",
                                }}
                              >
                                <span
                                  onClick={() => setToggleState(0)}
                                  className="hoverCursor"
                                >
                                  [ 닫기 ]
                                </span>
                              </div>

                              <div>
                                {updateOrCreate !== undefined ? (
                                  know_path === updateOrCreate.know_path ? (
                                    <>
                                      <div
                                        onClick={() => onPreviewDelete()}
                                        className="removeFile hoverCursor"
                                      >
                                        [ 파일 삭제 ]
                                      </div>
                                      <img
                                        className="hoverCursor imgDeleteOpacity previewImg"
                                        onClick={() => onPreviewDelete()}
                                        src={know_path}
                                        alt={know_path}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <div
                                        onClick={() => onPreviewDelete()}
                                        className="removeFile hoverCursor"
                                      >
                                        [ 파일 삭제 ]
                                      </div>
                                      <img
                                        className="hoverCursor imgDeleteOpacity previewImg"
                                        onClick={() => onPreviewDelete()}
                                        src={previewstate[0].preview}
                                        alt={previewstate[0].preview}
                                      />
                                    </>
                                  )
                                ) : (
                                  <>
                                    <div
                                      onClick={() => onPreviewDelete()}
                                      className="removeFile hoverCursor"
                                    >
                                      [ 파일 삭제 ]
                                    </div>
                                    <img
                                      className="hoverCursor imgDeleteOpacity previewImg"
                                      onClick={() => onPreviewDelete()}
                                      src={previewstate[0].preview}
                                      alt="프로필 이미지"
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="inputBox" {...getRootProps()}>
                      <input
                        {...getInputProps()}
                        type="file"
                        accept="image/*"
                        onChange={onLoadImgFile}
                      />{" "}
                      <UploadFile />
                      <div className="hoverCursor">[ 파일 선택 ]</div>{" "}
                    </div>
                  )}
                </>
              )}
            </Dropzone>
          </div>
        </div>
        {updateOrCreate !== undefined ? (
          <button
            type="button"
            disabled={isLoadingKnowhow}
            className="submitBtn hoverEffect"
            onClick={onUpdateKnowhowPost}
          >
            수정
          </button>
        ) : (
          <button
            type="button"
            disabled={isLoadingKnowhow}
            className="submitBtn hoverEffect"
            onClick={insertKnowhowPost}
          >
            등록
          </button>
        )}
      </Wrap>
    </>
  );
};
export default CreateKnowhowCp;

const ModalBackground = styled.div`
  width: 100%;
  background-color: ${colors.color_black};
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.4;
  z-index: 600;
`;
const ModalItem = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const WarningMsg = styled.span`
  color: ${colors.color_carrot_orange};
  margin-left: 1vw;
`;

const Wrap = styled.div`
  width: 100%;

  & h1 {
    border-bottom: 1px solid ${colors.color_greyish_beige_brown};
    padding-bottom: 1vh;
  }

  & .flexWrap {
    display: inline-flex;
    width: 90%;
    justify-content: space-around;
    margin-bottom: 3vh;
    align-items: center;
  }

  & .infoName {
    width: 20%;
  }
  & .inputItem {
    width: 80%;
  }
  & input {
    width: 100%;
    border-radius: 0.5vw;
    padding: 0.2vw;
    background-color: ${colors.color_beige_white};
    border: 1px solid transparent;
  }

  & .inputDates {
    width: 12vw;
  }
  & .content {
    line-height: 2;
    resize: none;
    border: 1px solid transparent;
    border-radius: 0.5vw;
    height: 22vh;
    width: 80%;
    background-color: ${colors.color_beige_white};
    padding: 1vw;

    ::-webkit-scrollbar {
      display: none;
    }
  }
  & button {
    background-color: ${colors.color_milktea_brown};
    color: ${colors.color_beige_white};
    float: right;
    margin: 1vh 4.5vw 9vh;
    padding: 0.5vw;
    border-radius: 0.5vw;
    border: 1px solid transparent;
  }
  & .hoverEffect:hover {
    background-color: ${colors.color_carrot_orange};
    cursor: pointer;
  }
  & .hoverCursor:hover {
    cursor: pointer;
  }

  & .inputBox {
    background-color: ${colors.color_beige_white};
    border: 1px solid transparent;
    border-radius: 0.5vw;
    width: 100%;
    padding: 2vh 0;
    text-align: center;
    height: 12vh;
  }

  & .imgDeleteOpacity:hover {
    opacity: 0.4;
  }

  & .previewImg {
    max-width: 30em;
    max-height: 20em;
  }

  & .imgModalWrap {
    padding: 2vw;
    z-index: 600;
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    background-color: ${colors.color_white};
    border-radius: 1vw;
  }

  & .removeFile {
    color: red;
    font-size: 1em;
    z-index: 650;
    position: absolute;
    clear: both;
  }
`;
