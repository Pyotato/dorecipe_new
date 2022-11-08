import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useParams } from "react-router-dom";
import { useInput } from "../../../hooks/useInput";
import { Link } from "react-router-dom";
import MainLayout from "../../../layout/mainLayOut";

const EventModify = () => {
  const params = useParams();

  let [state, setState] = useState([
    {
      event_num: 0,
      event_title: "",
      event_content: "",
      event_path: "",
      event_creDate: "",
      event_finDate: "",
    },
  ]);

  function Axios() {
    const event_num = params.detailId; // app.js에서 보내줌

    axios
      .get("http://localhost:9000/event/detail/" + event_num)
      .then((result) => {
        setState(result.data);
      })
      .catch(() => {
        console.log("실패... 이벤트수정페이지");
      });
  }

  // 파일 보내기

  const [files, setFiles] = useState("");

  const onLoadFile = (e) => {
    onChangeEventPath(e);

    const file = e.target.files;
    setFiles(file);
  };

  useEffect(() => {
    Axios();

    preview();
    return () => preview();
  });
  // 미리보기
  const preview = () => {
    if (!files) return false;
    const imgEl = document.querySelector(".img_box");
    const reader = new FileReader();

    reader.onload = () =>
      (imgEl.style.backgroundImage = `url(${reader.result})`);

    reader.readAsDataURL(files[0]);
  };

  // --

  let [event_title, onChangeEventTitle, setTitle] = useInput("");
  let [event_path, onChangeEventPath, setPath] = useInput("");
  let [event_content, onChangeEventContent, setContent] = useInput("");
  let [event_creDate, onChangeEventCreDate, setCDate] = useInput("");
  let [event_finDate, onChangeEventFinDate, setFDate] = useInput("");

  const modHandler = useCallback(
    (e) => {
      e.preventDefault();

      event_title = document.getElementById("eventTitle").value;
      event_path = document.getElementById("eventPath").value;
      event_content = document.getElementById("eventContent").value;
      event_creDate = document.getElementById("eventCreDate").value;
      event_finDate = document.getElementById("eventFinDate").value;

      const data = {
        event_title: `${event_title}`,
        event_path: `${event_path.replace(/c:\\fakepath\\/i, "")}`,
        event_content: `${event_content}`,
        event_creDate: `${event_creDate}`,
        event_finDate: `${event_finDate}`,
      };

      const formData = new FormData();
      formData.append("event_num", params.detailId);
      formData.append("event_title", data.event_title);
      formData.append("event_path", data.event_path);
      formData.append("event_image", files[0]);
      formData.append("event_content", data.event_content);
      formData.append("event_creDate", data.event_creDate);
      formData.append("event_finDate", data.event_finDate);

      //data에 ""이 하나라도 있으면 alert
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
          url: "http://localhost:9000/event/update",
          // url: process.env.REACT_APP_HOST + "/event/update",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        }).then((response) => {
          alert("수정되었습니다.");
          //이벤트 리스트로 이동
          window.location.href = "http://localhost:3000/event/list";
        });
      }
    },
    [event_title, event_path, event_content, event_creDate, event_finDate]
  );

  return (
    <>
      <MainLayout>
        <h2>| Event |</h2>
        <div>
          <form>
            <table className="left dpib">
              <thead>
                <tr>
                  <td>글번호</td>
                  <td>
                    <input
                      type="text"
                      className="text"
                      defaultValue={state.event_num}
                      disabled
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>제목</td>
                  <td>
                    <input
                      name="event_title"
                      className="text"
                      type="text"
                      id="eventTitle"
                      onChange={onChangeEventTitle}
                      defaultValue={state.event_title}
                    />
                  </td>
                </tr>
                <tr>
                  <td>파일 첨부</td>
                  <td>
                    <input
                      name="event_path"
                      type="file"
                      id="eventPath"
                      accept="img/*"
                      onChange={onLoadFile}
                      defaultValue={state.event_path}
                    />
                  </td>
                </tr>
                <tr>
                  <td>내용</td>
                  <td>
                    <textarea
                      name="event_content"
                      className="text"
                      id="eventContent"
                      rows="4"
                      cols="50"
                      onChange={onChangeEventContent}
                      defaultValue={state.event_content}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>이벤트 기간</td>
                  <td>
                    <input
                      name="event_creDate"
                      className="date"
                      id="eventCreDate"
                      type="date"
                      defaultValue={state.event_creDate}
                      onChange={onChangeEventCreDate}
                    />
                    <input
                      name="event_finDate"
                      className="date"
                      id="eventFinDate"
                      type="date"
                      defaultValue={state.event_finDate}
                      onChange={onChangeEventFinDate}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 이미지 */}
            <div className="mt-5 imgPreview floatRight">
              <div className="img_box" />
              {/* src={state.event_path}  */}
            </div>

            <br />
            <Link className="left btn btn-outline-secondary" to={"/event/list"}>
              목록으로
            </Link>
            <button
              type="button"
              className="mt-1 left2 btn btn-outline-secondary"
              onClick={modHandler}
            >
              수정
            </button>
          </form>
        </div>
      </MainLayout>
    </>
  );
};
export default EventModify;
