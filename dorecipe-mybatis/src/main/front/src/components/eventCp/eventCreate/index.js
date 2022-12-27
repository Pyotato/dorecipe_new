import axios from "axios";
import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { useInput } from "@hooks/useInput";
import { colors } from "@theme/theme";
import Dropzone from "react-dropzone";
import { ReactComponent as UploadFile } from "@assets/UploadFile.svg";

const CreateEventCp = () => {
  const [event_title, onChangeEventTitle, setTitle] = useInput("");
  const [event_path, onChangeEventPath, setPath] = useInput("");
  const [event_content, onChangeEventContent, setContent] = useInput("");
  const [event_creDate, onChangeEventCreDate, setCDate] = useInput("");
  const [event_finDate, onChangeEventFinDate, setFDate] = useInput("");
  const [Eventfiles, setFiles] = useState("");
  const [error, setError] = useState(null);
  const [toggleState, setToggleState] = useState(0);

  const eventData1 = useRef();
  const eventData2 = useRef();
  const eventData3 = useRef();
  const eventData4 = useRef();

  const [previewstate, setPreviewState] = useState("");

  const onDropHandler = useCallback(
    (files) => {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("파일 읽기 취소");
        reader.onerror = () => console.log("파일 읽기 실패");
        reader.readAsDataURL(file);
        setFiles(file);
      });

      setPreviewState(
        files.map((file) =>
          Object.assign(previewstate, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [Eventfiles]
  );

  const onLoadImgFile = (e) => {
    onChangeEventPath(e);
  };

  // preview delete
  const onPreviewDelete = useCallback(() => {
    setPreviewState("");
    setPath("");
  }, [Eventfiles]);

  const addEventHandler = useCallback(
    (e) => {
      e.preventDefault();

      const data = {
        event_title: `${event_title}`,
        event_path: Eventfiles.name,
        event_content: `${event_content}`,
        event_creDate: `${event_creDate}`,
        event_finDate: `${event_finDate}`,
      };

      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      const formData = new FormData();

      formData.append("data", blob);

      formData.append("event_image", Eventfiles); //파일 data
      formData.append("event_title", data.event_title);
      formData.append("event_path", data.event_path);
      formData.append("event_content", data.event_content);
      formData.append("event_creDate", data.event_creDate);
      formData.append("event_finDate", data.event_finDate);

      // data 비워져 있으면 focus
      if (
        data.event_title === "" ||
        data.event_content === "" ||
        data.event_creDate === "" ||
        data.event_finDate === ""
      ) {
        data.event_title === "" && eventData1.current.focus();
        data.event_content === "" && eventData2.current.focus();
        data.event_creDate === "" && eventData3.current.focus();
        data.event_finDate === "" && eventData4.current.focus();
      } else {
        axios({
          method: "POST",
          // url: process.env.REACT_APP_HOST + "/event/insert",
          url: "http://localhost:9000/event/insert",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        }).then(() => {
          eventData1.current.value = "";
          eventData2.current.value = "";
          eventData3.current.value = "";
          eventData4.current.value = "";

          setPreviewState("");
          setPath("");
          alert("이벤트 등록 완료하셨습니다.");
        });
      }
    },
    [Eventfiles, event_content, event_creDate, event_finDate, event_title]
  );
  return (
    <>
      {" "}
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
              제목{" "}
              {event_title.length === 0 && (
                <>
                  <WarningMsg>필수</WarningMsg>
                </>
              )}
            </div>
            <div className="inputItem">
              <input
                style={{ margin: 0 }}
                name="event_title"
                className="text"
                ref={eventData1}
                required
                type="text"
                placeholder=" 제목을 입력해주세요"
                onChange={onChangeEventTitle}
              />
            </div>
          </div>
        </div>
        <div className="flexWrap">
          <div className="title">
            내용{" "}
            {event_content.length === 0 && (
              <>
                <WarningMsg>필수</WarningMsg>
              </>
            )}
          </div>
          {/* <div className="inputItem"> */}
          <textarea
            name="event_content"
            className=" content"
            placeholder=" 내용을 입력해주세요"
            required
            ref={eventData2}
            onChange={onChangeEventContent}
          ></textarea>
          {/* </div> */}
        </div>{" "}
        <div className="flexWrap">
          <div className="title">이벤트 기간 </div>
          <div className="inputItem">
            <input
              name="event_creDate"
              className="inputDates"
              type="date"
              required
              ref={eventData3}
              onChange={onChangeEventCreDate}
            />
            <span style={{ margin: "0 1vw" }}> ~ </span>
            <input
              name="event_finDate"
              className="inputDates"
              type="date"
              required
              ref={eventData4}
              onChange={onChangeEventFinDate}
            />{" "}
            {(event_creDate.length === 0 || event_finDate.length === 0) && (
              <>
                <WarningMsg>필수</WarningMsg>
              </>
            )}
          </div>
        </div>{" "}
        <div className="flexWrap">
          <div className="title">파일 첨부</div>
          <div className="inputItem">
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
          onClick={addEventHandler}
          disabled={error}
          className="submitBtn"
        >
          등록
        </button>
      </Wrap>
    </>
  );
};
export default CreateEventCp;
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
