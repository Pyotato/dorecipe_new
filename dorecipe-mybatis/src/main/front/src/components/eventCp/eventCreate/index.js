import axios from "axios";
import { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useInput } from "@hooks/useInput";
import { colors } from "@theme/theme";
import Dropzone from "react-dropzone";
import { ReactComponent as UploadFile } from "@assets/UploadFile.svg";
import BasicSpinner from "../../_common/loading";
import { useEffect } from "react";

const CreateEventCp = ({
  isLoadingEvent,
  setEventLoadingState,
  updateOrCreate,
  setUpdateOrCreateState,
}) => {
  const [event_num, setEventNum] = useState();
  const [event_title, onChangeEventTitle, setTitle] = useInput("");
  const [event_path, onChangeEventPath, setPath] = useInput("");
  const [event_content, onChangeEventContent, setContent] = useInput("");
  const [event_creDate, onChangeEventCreDate, setCDate] = useInput("");
  const [event_finDate, onChangeEventFinDate, setFDate] = useInput("");
  const [Eventfiles, setFiles] = useState("");
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
        setPath("");
        console.log("onDropHandler", file);
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
      // data 비워져 있으면 focus하고 함수 빠져나오기
      if (event_title === "") {
        eventData1.current.focus();
        return;
      }
      if (event_content === "") {
        eventData2.current.focus();
        return;
      }
      if (event_creDate === "") {
        eventData3.current.focus();
        return;
      }
      if (event_finDate === "") {
        eventData4.current.focus();
        return;
      }

      const data = {
        event_title: `${event_title}`,
        event_path: `${event_path}`,
        event_content: `${event_content}`,
        event_creDate: `${event_creDate}`,
        event_finDate: `${event_finDate}`,
      };

      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      const formData = new FormData();

      formData.append("data", blob);
      //새로 등록한 이미지가 있다면
      if (Eventfiles !== "") {
        formData.append("event_image", Eventfiles); //파일 data
        formData.append("event_path", Eventfiles.name);
      }
      formData.append("event_title", data.event_title);

      formData.append("event_content", data.event_content);
      formData.append("event_creDate", data.event_creDate);
      formData.append("event_finDate", data.event_finDate);

      //수정한다면
      if (updateOrCreate !== undefined) {
        formData.append("event_num", event_num);
        if (event_path !== "") {
          formData.append("event_path", data.event_path);
        }
      }
      setEventLoadingState(true);
      if (updateOrCreate !== undefined) {
        //이벤트 수정
        axios({
          method: "POST",
          url: "http://localhost:9000/event/update",
          // url: process.env.REACT_APP_HOST + "/event/update",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        })
          .then((response) => {
            setEventNum("");
            setTitle("");
            setPath("");
            setContent("");
            setCDate("");
            setFDate("");
            setToggleState(0);
            setPreviewState("");
            setPath("");
            setEventLoadingState(true);
            // console.log("이벤트 수정성공", response);

            if (!alert("이벤트가 수정되었습니다.")) {
              setEventLoadingState(false);
            }
            setUpdateOrCreateState([]);
          })
          .catch((err) => console.log("이벤트 수정실패", err));
      } else {
        //이벤트 등록
        axios({
          method: "POST",
          // url: process.env.REACT_APP_HOST + "/event/insert",
          url: "http://localhost:9000/event/insert",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        })
          .then(() => {
            setEventNum("");
            setTitle("");
            setPath("");
            setContent("");
            setCDate("");
            setFDate("");
            setToggleState(0);
            setPreviewState("");
            setPath("");
            setEventLoadingState(true);
            if (!alert("이벤트 등록 완료하셨습니다.")) {
              setEventLoadingState(false);
            }
          })
          .catch((err) => console.log("이벤트 등록실패", err));
      }
    },
    [
      event_path,
      Eventfiles,
      event_num,
      event_content,
      event_creDate,
      event_finDate,
      event_title,
      updateOrCreate,
    ]
  );

  //수정시 정보 입력값에 넣기
  useMemo(() => {
    if (updateOrCreate !== undefined) {
      setEventNum(updateOrCreate.event_num);
      setTitle(updateOrCreate.event_title);
      setPath(updateOrCreate.event_path);
      setContent(updateOrCreate.event_content);
      setCDate(updateOrCreate.event_creDate);
      setFDate(updateOrCreate.event_finDate);
      setToggleState(0);
      // if (event_num === "") {
      //   setEventLoadingState(false);
      // }
      // setEventLoadingState(true);
      return;
    }
  }, [updateOrCreate]);

  //정보 로딩 시 로딩바 돌아가게..
  // useEffect(() => {
  //   setEventLoadingState(false);
  // }, [event_num]);

  return (
    <>
      {" "}
      {isLoadingEvent && (
        <>
          <ModalItem>
            <BasicSpinner />
          </ModalItem>
          <ModalBackground></ModalBackground>
        </>
      )}
      {(previewstate.length > 0 ||
        (updateOrCreate !== undefined && event_path !== "")) &&
        toggleState === 1 && <ModalBackground></ModalBackground>}
      <Wrap>
        <div>
          {updateOrCreate !== undefined && (
            <div className="flexWrap" style={{ alignItems: "flex-start" }}>
              <div className="title" style={{ margin: 0 }}>
                글 번호
              </div>
              <div className="inputItem">{event_num} </div>
            </div>
          )}
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
                value={event_title || ""}
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
            value={event_content || ""}
            ref={eventData2}
            onChange={onChangeEventContent}
          ></textarea>
          {/* </div> */}
        </div>{" "}
        <div className="flexWrap">
          <div className="title">이벤트 기간</div>
          <div className="inputItem">
            <input
              name="event_creDate"
              className="inputDates"
              type="date"
              required
              value={event_creDate || ""}
              ref={eventData3}
              onChange={onChangeEventCreDate}
            />
            <span style={{ margin: "0 1vw" }}> ~ </span>
            <input
              name="event_finDate"
              className="inputDates"
              type="date"
              required
              value={event_finDate || ""}
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
                  {previewstate.length > 0 ||
                  (updateOrCreate !== undefined && event_path !== "") ? (
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
                              </div>{" "}
                              <div
                                className="removeFile hoverCursor"
                                style={{
                                  color: "red",
                                  fontSize: "1em",
                                  zIndex: "650",
                                  width: "100%",
                                  position: "absolute",
                                }}
                              >
                                <span onClick={() => onPreviewDelete()}>
                                  [ 파일 삭제 ]
                                </span>
                              </div>
                              <div
                                className="imgScrollWrap"
                                style={{
                                  maxHeight: "30em",
                                  overflowY: "scroll",
                                  overflowX: "hidden",
                                  clear: "both",
                                }}
                              >
                                {updateOrCreate !== undefined ? (
                                  event_path !== "" ? (
                                    <img
                                      className="hoverCursor imgDeleteOpacity"
                                      onClick={() => onPreviewDelete()}
                                      src={event_path}
                                      style={{
                                        maxWidth: "30em",
                                      }}
                                      alt="프로필 이미지"
                                    />
                                  ) : (
                                    <img
                                      className="hoverCursor imgDeleteOpacity"
                                      onClick={() => onPreviewDelete()}
                                      src={previewstate[0].preview}
                                      style={{
                                        maxWidth: "30em",
                                      }}
                                      alt="프로필 이미지"
                                    />
                                  )
                                ) : (
                                  <img
                                    className="hoverCursor imgDeleteOpacity"
                                    onClick={() => onPreviewDelete()}
                                    src={previewstate[0].preview}
                                    style={{
                                      maxWidth: "30em",
                                    }}
                                    alt="프로필 이미지"
                                  />
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
            onClick={addEventHandler}
            disabled={isLoadingEvent}
            className="submitBtn hoverEffect"
          >
            수정
          </button>
        ) : (
          <button
            type="button"
            onClick={addEventHandler}
            disabled={isLoadingEvent}
            className="submitBtn hoverEffect"
          >
            등록
          </button>
        )}
      </Wrap>
    </>
  );
};
export default CreateEventCp;

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

  & .hoverEffect:hover {
    background-color: ${colors.color_carrot_orange};
    cursor: pointer;
  }

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
    padding: 0;
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

  & .imgScrollWrap {
    & img {
      padding-right: 1em;
    }
    ::-webkit-scrollbar {
      width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
      height: 30%;
      background-color: ${colors.color_beige_brown};
    }
    ::-webkit-scrollbar-track {
      background-color: ${colors.color_beige_white};
    }
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
