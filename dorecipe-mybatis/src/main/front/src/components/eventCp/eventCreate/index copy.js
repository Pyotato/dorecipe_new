import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useInput } from "../../../hooks/useInput";

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

  // 미리보기
  useCallback(() => {
    preview();
    return () => preview();
  }, []);

  const onLoadEventFile = (e) => {
    //이미지명 담기
    onChangeEventPath(e);

    //파일담기
    const file = e.target.files;
    setFiles(file);
  };

  const preview = () => {
    if (!Eventfiles) return false;
    const imgEl = document.querySelector(".img_box");
    const reader = new FileReader();

    reader.onload = () =>
      (imgEl.style.backgroundImage = `url(${reader.result})`);
    if (!Eventfiles[0]) {
    } else {
      reader.readAsDataURL(Eventfiles[0]);
    }
  };
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
          e.preventDefault();

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
        <div className="left dpib">
          <div>
            <tr>
              <td>제목</td>
              <td>
                {(event_title.length === 0 ||
                  event_content.length === 0 ||
                  event_creDate.length === 0 ||
                  event_finDate.length === 0) && (
                  <WarningMsg>
                    제목, 내용, 이벤트 기간을 입력해 주세요
                  </WarningMsg>
                )}
                <input
                  name="event_title"
                  className="text"
                  ref={eventData1}
                  required
                  type="text"
                  placeholder=" 제목을 입력해주세요"
                  onChange={onChangeEventTitle}
                  maxLength={50}
                />
              </td>
            </tr>
          </div>
          <tbody>
            <tr>
              <td>파일 첨부</td>
              <td>
                <input
                  name="event_path"
                  className="mb-2"
                  type="file"
                  //   id="eventData2"
                  ref={eventData2}
                  accept="image/*"
                  onChange={onLoadEventFile}
                />
              </td>
            </tr>
            <tr>
              <td>내용</td>
              <td>
                <textarea
                  name="event_content"
                  className="content"
                  placeholder=" 내용을 입력해주세요"
                  rows="4"
                  cols="50"
                  required
                  //   id="eventData3"
                  ref={eventData3}
                  onChange={onChangeEventContent}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>이벤트 기간</td>
              <td className="eventDataTd">
                <input
                  name="event_creDate"
                  className="date eventData"
                  type="date"
                  required
                  //   id="eventData4"
                  ref={eventData4}
                  onChange={onChangeEventCreDate}
                />
                <input
                  name="event_finDate"
                  className="date eventData"
                  type="date"
                  required
                  id="eventData5"
                  ref={eventData5}
                  onChange={onChangeEventFinDate}
                />
              </td>
            </tr>
          </tbody>
        </div>

        <div className="mt-5 imgPreview floatRight">
          <div className="img_box" />
        </div>
        <button
          type="button"
          className="left3 btn btn-outline-secondary"
          onClick={eventHandler}
          disabled={error}
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
  padding: 11vh 4vw;
  & h1 {
    border-bottom: 1px solid black;
    padding-bottom: 1vh;
  }
`;
