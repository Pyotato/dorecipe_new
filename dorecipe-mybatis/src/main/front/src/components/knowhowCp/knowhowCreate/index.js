import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useInput } from "../../../hooks/useInput";
import { colors } from "../../../theme/theme";
import Dropzone from "react-dropzone";
import { ReactComponent as UploadFile } from "../../../assets/UploadFile.svg";

const CreateKnowhowCp = () => {
  const [error, setError] = useState(null);

  const knowHowData1 = useRef();
  const knowHowData2 = useRef();

  const [know_title, onChangeKnowhowTitle, setKnowhowTitle] = useInput("");
  const [know_content, onChangeKnowhowContent, setKnowhowContent] =
    useInput("");
  const [know_path, onChangeKnowhowPath, setKnowhowPath] = useInput("");
  const [KnowFiles, setKnowFiles] = useState("");
  const [toggleState, setToggleState] = useState(0);
  const [previewstate, setPreviewState] = useState("");

  const insertKnowhowPost = useCallback(
    (e) => {
      e.preventDefault();
      if (know_title === "") {
        knowHowData1.current.focus();
      } else if (know_content === "") {
        knowHowData2.current.focus();
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
        }).then(() => {
          knowHowData1.current.value = "";
          knowHowData2.current.value = "";
          setKnowFiles("");
          setKnowhowPath("");
          alert("노하우가 등록되었습니다.");
        });
      }
    },
    [know_path, know_content, know_title, KnowFiles]
  );

  const onPreviewDelete = useCallback(() => {
    setPreviewState("");
    setKnowFiles("");
    setKnowhowPath("");
  }, [KnowFiles]);

  const onDropHandler = useCallback(
    (files) => {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("파일 읽기 취소");
        reader.onerror = () => console.log("파일 읽기 실패");
        reader.readAsDataURL(file);
        setKnowFiles(file);
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
  return (
    <>
      {previewstate.length > 0 && toggleState === 1 && (
        <div
          style={{
            width: "100%",
            backgroundColor: "black",
            height: "100vh",
            position: "absolute",
            top: "0",
            left: "0",
            opacity: "0.4",
            zIndex: "600",
          }}
        >
          {" "}
        </div>
      )}
      <Wrap>
        <div>
          <div className="flexWrap" style={{ alignItems: "flex-start" }}>
            <div className="title" style={{ margin: 0 }}>
              제목 {know_title.length === 0 && <WarningMsg>필수</WarningMsg>}
            </div>
            <div className="inputItem">
              <input
                style={{ margin: 0 }}
                className="text"
                name="know_title"
                ref={knowHowData1}
                required
                type="text"
                placeholder=" 제목을 입력해주세요"
                onChange={onChangeKnowhowTitle}
              />
            </div>
          </div>
        </div>
        <div className="flexWrap">
          <div className="title">
            내용 {know_content.length === 0 && <WarningMsg>필수</WarningMsg>}
          </div>
          <textarea
            className="content"
            placeholder=" 내용을 입력해주세요"
            required
            name="know_content"
            ref={knowHowData2}
            onChange={onChangeKnowhowContent}
          ></textarea>
        </div>{" "}
        <div className="flexWrap">
          <div className="title">파일 첨부</div>
          <div className="inputItem fileDropZonWrap">
            <Dropzone onDrop={onDropHandler}>
              {({ getRootProps, getInputProps }) => (
                <>
                  {previewstate.length > 0 ? (
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
                            <div
                              style={{
                                padding: "2vw",
                                zIndex: "600",
                                position: "absolute",
                                top: "50vh",
                                left: "50vw",
                                transform: "translate(-50%,-50%)",
                                backgroundColor: "white",
                                borderRadius: "1vw",
                              }}
                            >
                              {" "}
                              <div
                                className="removeFile hoverCursor"
                                style={{
                                  color: "red",
                                  fontSize: "1em",
                                  zIndex: "650",
                                }}
                              >
                                <span onClick={() => onPreviewDelete()}>
                                  [ 파일 삭제 ]
                                </span>
                              </div>
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
                                <img
                                  className="hoverCursor imgDeleteOpacity"
                                  onClick={() => onPreviewDelete()}
                                  src={previewstate[0].preview}
                                  style={{
                                    maxWidth: "30em",
                                  }}
                                  alt="프로필 이미지"
                                />{" "}
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
        <button
          type="button"
          disabled={error}
          className="submitBtn"
          onClick={insertKnowhowPost}
          style={{ marginBottom: "9vh" }}
        >
          등록
        </button>
      </Wrap>
    </>
  );
};
export default CreateKnowhowCp;
const WarningMsg = styled.span`
  color: ${colors.color_carrot_orange};
  margin-left: 1vw;
`;

const Wrap = styled.div`
  width: 100%;

  & h1 {
    border-bottom: 1px solid black;
    padding-bottom: 1vh;
  }

  & .flexWrap {
    display: inline-flex;
    width: 90%;
    justify-content: space-around;
    margin-bottom: 3vh;
    align-items: center;
  }

  & .title {
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
  }
  & button {
    background-color: ${colors.color_milktea_brown};
    color: ${colors.color_beige_white};
    float: right;
    margin-right: 4.5vw;
    margin-top: 1vh;
    padding: 0.5vw;
    border-radius: 0.5vw;
    border: 1px solid transparent;
    &:hover {
      background-color: ${colors.color_carrot_orange};
      cursor: pointer;
    }
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
`;
