import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useInput } from "../../../hooks/useInput";
import { colors } from "../../../theme/theme";
import Dropzone from "react-dropzone";

const CreateEventCp = () => {
  const [event_title, onChangeEventTitle, setTitle] = useInput("");
  const [event_path, onChangeEventPath, setPath] = useInput("");
  const [event_content, onChangeEventContent, setContent] = useInput("");
  const [event_creDate, onChangeEventCreDate, setCDate] = useInput("");
  const [event_finDate, onChangeEventFinDate, setFDate] = useInput("");
  const [Eventfiles, setFiles] = useState("");
  const [error, setError] = useState(null);

  const eventData1 = useRef();
  const eventData2 = useRef();
  const eventData3 = useRef();
  const eventData4 = useRef();
  const eventData5 = useRef();

  const [previewstate, setPreviewState] = useState("");

  // 미리보기
  //   useCallback(() => {
  //     preview();
  //     return () => preview();
  //   }, []);

  const onDropHandler = useCallback(
    (files) => {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("파일 읽기 취소");
        reader.onerror = () => console.log("파일 읽기 실패");
        reader.readAsDataURL(file);
        console.log("readAsDataURL", file); //files

        setFiles(file);
      });

      // previewstate, setPreviewState
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
  // console.log("filestate", filestate);

  // preview delete
  const onPreviewDelete = useCallback(
    (preview) => {
      const deleteFiles = Eventfiles.filter((v) => v.preview !== preview);
      setFiles(deleteFiles);
      // previewstate, setPreviewState
      setPreviewState(deleteFiles);
    },
    [Eventfiles]
  );

  const onLoadEventFile = (e) => {
    //이미지명 담기
    onChangeEventPath(e);

    //파일담기
    const file = e.target.files;
    setFiles(file);
  };

  //   const preview = () => {
  //     if (!Eventfiles) return false;
  //     const imgEl = document.querySelector(".img_box");
  //     const reader = new FileReader();

  //     reader.onload = () =>
  //       (imgEl.style.backgroundImage = `url(${reader.result})`);
  //     if (!Eventfiles[0]) {
  //     } else {
  //       reader.readAsDataURL(Eventfiles[0]);
  //     }
  //   };
  const eventHandler = useCallback(
    (e) => {
      e.preventDefault();

      const data = {
        event_title: `${event_title}`,
        event_path: `${event_path.replace(/c:\\fakepath\\/i, "")}`,
        event_content: `${event_content}`,
        event_creDate: `${event_creDate}`,
        event_finDate: `${event_finDate}`,
      };

      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      const formData = new FormData();

      formData.append("data", blob);

      formData.append("event_image", Eventfiles[0]); //파일 formData.append
      formData.append("event_title", data.event_title);
      formData.append("event_path", data.event_path);
      formData.append("event_content", data.event_content);
      formData.append("event_creDate", data.event_creDate);
      formData.append("event_finDate", data.event_finDate);

      // data 비워져 있으면 보내지 않고 alert
      if (
        data.event_title === "" ||
        data.event_content === "" ||
        data.event_creDate === "" ||
        data.event_finDate === ""
      ) {
        alert("제목, 내용, 이벤트 기간을 입력해 주세요.");
      } else {
        axios({
          method: "POST",
          // url: process.env.REACT_APP_HOST + "/event/insert",
          url: "http://localhost:9000/event/insert",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        }).then((response) => {
          console.log(response.data);
          alert("등록되었습니다.");
          //   e.preventDefault();

          eventData1.current.value = "";
          eventData2.current.value = "";
          eventData3.current.value = "";
          eventData4.current.value = "";
          eventData5.current.value = "";
        });
      }
    },
    [
      Eventfiles,
      event_content,
      event_creDate,
      event_finDate,
      event_path,
      event_title,
    ]
  );
  return (
    <>
      <Wrap>
        <div>
          <div className="flexWrap">
            <div className="title">제목</div>
            <div className="inputItem">
              {/* {(event_title.length === 0 ||
                event_content.length === 0 ||
                event_creDate.length === 0 ||
                event_finDate.length === 0) && (
                <WarningMsg>제목, 내용, 이벤트 기간을 입력해 주세요</WarningMsg>
              )} */}
              <input
                name="event_title"
                className="text"
                ref={eventData1}
                required
                type="text"
                placeholder=" 제목을 입력해주세요"
                onChange={onChangeEventTitle}
                // maxLength={50}
              />
            </div>
          </div>
        </div>
        <div className="flexWrap">
          <div className="title">파일 첨부</div>
          <div className="inputItem">
            <input
              name="event_path"
              //   className="mb-2"

              type="file"
              //   id="eventData2"
              ref={eventData2}
              accept="image/*"
              onChange={onLoadEventFile}
            />
          </div>
        </div>
        <div className="flexWrap">
          <div className="title">내용</div>
          {/* <div className="inputItem"> */}
          <textarea
            name="event_content"
            className=" content"
            placeholder=" 내용을 입력해주세요"
            required
            //   id="eventData3"
            ref={eventData3}
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
              //   className="date eventData"
              type="date"
              required
              //   id="eventData4"
              ref={eventData4}
              onChange={onChangeEventCreDate}
            />
            <span style={{ margin: "0 1vw" }}> ~ </span>
            <input
              name="event_finDate"
              className="inputDates"
              type="date"
              required
              id="eventData5"
              ref={eventData5}
              onChange={onChangeEventFinDate}
            />
          </div>
        </div>
        <Dropzone onDrop={onDropHandler}>
          {({ getRootProps, getInputProps }) => (
            <>
              {previewstate.length > 0 ? (
                <>
                  <div>
                    <div
                      className="removeFile"
                      style={{
                        transform: "translateX(-50%) translateY(100%) ",
                        position: "absolute",
                        top: "34vh",
                      }}
                      onClick={
                        () =>
                          // onPreviewDelete(filestate[0].preview)
                          onPreviewDelete(previewstate[0].preview)
                        // previewstate, setPreviewState
                      }
                    ></div>
                    <img
                      onClick={() => onPreviewDelete(previewstate[0].preview)}
                      src={previewstate[0].preview}
                      style={{
                        width: "9%",
                        height: "10vh",
                        // width: "6vw",
                        // height: "6vh",
                        borderRadius: "100%",
                        margin: "2vh 45.5%",
                      }}
                      alt="프로필 이미지"
                      className="profileImg"
                    />
                  </div>
                </>
              ) : (
                <div className="inputBox" {...getRootProps()}>
                  <input
                    {...getInputProps()}
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={onLoadImgFile}
                  />{" "}
                  <div
                    className="hover"
                    style={{
                      width: "24%",
                      height: "12vh",
                      margin: "2vh 38%",
                    }}
                  >
                    :)
                  </div>{" "}
                </div>
              )}
            </>
          )}
        </Dropzone>
        {/* <div className="mt-5 imgPreview floatRight">
          <div className="img_box" />
        </div> */}
        <button
          type="button"
          onClick={eventHandler}
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
const WarningMsg = styled.div`
  display: inline-block;
  margin-left: 4em;
  color: #8d3232;
  font-size: smaller;
  font-weight: 400;
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
    margin-top: 3vh;
    padding: 0.5vw;
    border-radius: 0.5vw;
    border: 1px solid transparent;
    &:hover {
      background-color: ${colors.color_carrot_orange};
      cursor: pointer;
    }
  }
`;
