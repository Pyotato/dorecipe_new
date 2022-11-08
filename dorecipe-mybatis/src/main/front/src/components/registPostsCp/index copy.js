import { useCallback, useEffect, useRef, useState } from "react";
import "./style.css";
import "../../style/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import axios from "axios";
import { useInput } from "../../hooks/useInput";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reduxRefresh/actions/auth";

const RegistPosts = () => {
  let [tap, setTap] = useState(0);

  // useEffect(() => {
  //   UserService.getAdminBoard().then((response) => {
  //     console.log(response);
  //   });
  // });

  return (
    <>
      <div className="postMngWrap bottom2">
        <h3 className="left">게시물 등록</h3>
        <hr className="left width" />
        <Nav className="left width" variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTap(0);
              }}
              eventKey="link0"
            >
              공지사항
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTap(1);
              }}
              eventKey="link1"
            >
              이벤트
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTap(2);
              }}
              eventKey="link2"
            >
              노하우
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <TabContent tap={tap} />
      </div>
    </>
  );
};

function TabContent(props) {
  // event--------------------------------------
  const [event_title, onChangeEventTitle, setTitle] = useInput("");
  const [event_path, onChangeEventPath, setPath] = useInput("");
  const [event_content, onChangeEventContent, setContent] = useInput("");
  const [event_creDate, onChangeEventCreDate, setCDate] = useInput("");
  const [event_finDate, onChangeEventFinDate, setFDate] = useInput("");

  const [error, setError] = useState(null);

  const eventHandler = useCallback((e) => {
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

    //=-------------------------------

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
        document.getElementById("eventData1").value = "";
        document.getElementById("eventData2").value = "";
        document.getElementById("eventData3").value = "";
        document.getElementById("eventData4").value = "";
        document.getElementById("eventData5").value = "";
      });
    }
  });

  //파일 files에 넣기
  const [Eventfiles, setFiles] = useState("");

  const onLoadEventFile = (e) => {
    //이미지명 담기
    onChangeEventPath(e);

    //파일담기
    const file = e.target.files;
    setFiles(file);
  };

  // 미리보기
  useEffect(() => {
    preview();
    return () => preview();
  });
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

  // 끝-----------------------------------------------------------

  // knowhow------------------------------------------------------
  const [know_title, onChangeKnowhowTitle, setKnowhowTitle] = useInput("");
  const [know_content, onChangeKnowhowContent, setKnowhowContent] =
    useInput("");
  const [know_path, onChangeKnowhowPath, setKnowhowPath] = useInput("");

  const insertKnowhow = useCallback((e) => {
    e.preventDefault();

    const KnowData = {
      know_title: `${know_title}`,
      know_content: `${know_content}`,
      know_path: `${know_path.replace(/c:\\fakepath\\/i, "")}`,
    };

    const KnowBlob = new Blob([JSON.stringify(KnowData)], {
      type: "application/json",
    });

    const KnowFormData = new FormData();
    KnowFormData.append("data", KnowBlob);

    KnowFormData.append("know_image", KnowFiles[0]);
    KnowFormData.append("know_title", KnowData.know_title);
    KnowFormData.append("know_content", KnowData.know_content);
    KnowFormData.append("know_path", KnowData.know_path);
    console.log("data", KnowFormData);
    if (KnowData.know_title === "" || KnowData.know_content === "")
      alert("제목과 내용을 입력해 주세요.");
    else {
      axios({
        method: "post",

        baseURL: "http://localhost:9000",
        url: "/knowhow/insert",
        // url: process.env.REACT_APP_HOST + "/knowhow/insert",
        headers: { "Content-Type": "multipart/form-data" },
        data: KnowFormData,
      }).then((response) => {
        for (let value of KnowFormData.values()) {
          console.log(value);
        }
        alert("노하우가 등록되었습니다.");
        //노하우 리스트로 이동
        document.getElementById("knowData1").value = "";
        document.getElementById("knowData2").value = "";
        document.getElementById("KnowFile").value = "";
        setKnowFiles(null);
        KnowPreview();
      });
    }
  });

  const [KnowFiles, setKnowFiles] = useState("");

  const onLoadKnowFile = (e) => {
    //이미지명 담기
    onChangeKnowhowPath(e);

    //파일담기
    const file2 = e.target.files;
    setKnowFiles(file2);
  };

  // 미리보기
  useEffect(() => {
    KnowPreview();
    return () => KnowPreview();
  });
  const KnowPreview = () => {
    if (!KnowFiles) return false;
    const imgEl2 = document.querySelector(".img_box2");
    const reader2 = new FileReader();

    reader2.onload = () =>
      (imgEl2.style.backgroundImage = `url(${reader2.result})`);
    if (!KnowFiles[0]) {
    } else {
      reader2.readAsDataURL(KnowFiles[0]);
    }
  };

  // knowhow 끝-----------------------------------------------------------

  // notice ----------------------------------------------------------------------------------

  let [notice_title, onChangeNoticeTitle, setNoticeTitle] = useInput("");
  let [notice_content, onChangeNoticeContent, setNoticeContent] = useInput("");

  const user = useSelector((auth) => auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("insertNotice", user);
  const insertNotice = useCallback(
    (e) => {
      e.preventDefault();
      if (user !== undefined && user.auth.user.roles.includes("ROLE_USER")) {
        const noticeData = {
          member_id: `${user.auth.user.username}`,
          notice_title: `${notice_title}`,
          notice_content: `${notice_content}`,
        };

        const noticeBlob = new Blob([JSON.stringify(noticeData)], {
          type: "application/json",
        });

        const formData = new FormData();

        //notice_content = `${notice_content}`.replace(/<br>|<br\>|<br \/>)/g, '\n\r');
        //줄바꿈 - 콘솔에는 줄바꿈되어서 찍힘,db에도 화면에는 줄바꿈 안됨

        formData.append("noticeData", noticeBlob);
        formData.append("member_id", noticeData.member_id);
        formData.append("notice_title", noticeData.notice_title);
        formData.append("notice_content", noticeData.notice_content);

        if (
          noticeData.notice_title === "" ||
          noticeData.notice_content === ""
        ) {
          alert("제목과 내용을 입력해주세요.");
        } else {
          axios({
            method: "POST",
            url: "http://localhost:9000/notice/insert",
            // url: process.env.REACT_APP_HOST + "/notice/insert",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
          }).then((response) => {
            console.log(response.data);
            console.log("줄바꿈 적용됐나..? ", notice_content);
            document.getElementById("noticeTitle").value = "";
            document.getElementById("noticeContent").value = "";
            alert("공지사항이 등록되었습니다.");
          });
        }
      } else {
        dispatch(logout());
        navigate("/");
      }
    },
    [notice_title, notice_content]
  );

  // notice 끝---------------------------------------------------------------------------------

  return [
    <div className="block">
      <h4 className="left">공지사항</h4>
      <table className="left">
        <thead>
          <tr>
            <td>제목</td>
            <td>
              <input
                id="noticeTitle"
                name="notice_title"
                className="text"
                type="text"
                placeholder=" 제목을 입력해주세요"
                onChange={onChangeNoticeTitle}
              />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>내용</td>
            <td>
              <textarea
                id="noticeContent"
                name="notice_content"
                className="content"
                rows="4"
                cols="50"
                wrap="hard"
                required
                onChange={onChangeNoticeContent}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        onClick={insertNotice}
        disabled={error}
        className="left2 btn btn-outline-secondary"
      >
        등록
      </button>
    </div>, // 공지사항 끝-------------------------------------------------------
    <div className="">
      <h4 className="left">이벤트</h4>
      <table className="left dpib">
        <thead>
          <tr>
            <td>제목</td>
            <td>
              {(event_title.length === 0 ||
                event_content.length === 0 ||
                event_creDate.length === 0 ||
                event_finDate.length === 0) && (
                <WarningMsg>제목, 내용, 이벤트 기간을 입력해 주세요</WarningMsg>
              )}
              <input
                name="event_title"
                className="text"
                id="eventData1"
                required
                type="text"
                placeholder=" 제목을 입력해주세요"
                onChange={onChangeEventTitle}
                maxLength={50}
              />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>파일 첨부</td>
            <td>
              <input
                name="event_path"
                className="mb-2"
                type="file"
                id="eventData2"
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
                id="eventData3"
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
                id="eventData4"
                onChange={onChangeEventCreDate}
              />
              <input
                name="event_finDate"
                className="date eventData"
                type="date"
                required
                id="eventData5"
                onChange={onChangeEventFinDate}
              />
            </td>
          </tr>
        </tbody>
      </table>

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
    </div>, // 이벤트 끝-------------------------------------------------------
    <div className="block">
      <h4 className="left">노하우</h4>
      <table className="left dpib">
        <thead>
          <tr>
            <td>제목</td>
            <td>
              <input
                name="know_title"
                className="text"
                required
                type="text"
                id="knowData1"
                placeholder=" 제목을 입력해주세요"
                onChange={onChangeKnowhowTitle}
              />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>파일 첨부</td>
            <td>
              <input
                name="know_path"
                type="file"
                id="KnowFile"
                accept="image/*"
                onChange={onLoadKnowFile}
              />
            </td>
          </tr>
          <tr>
            <td>내용</td>
            <td>
              <textarea
                name="know_content"
                required
                className="content"
                id="knowData2"
                rows="4"
                cols="50"
                placeholder="내용을 입력해주세요"
                onChange={onChangeKnowhowContent}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-5 imgPreview floatRight">
        <div className="img_box2" />
      </div>
      <button
        type="button"
        className="left3 btn btn-outline-secondary"
        onClick={insertKnowhow}
        disabled={error}
      >
        등록
      </button>
    </div>,
    //노하우 끝-------------------------------------------------------
  ][props.tap]; // tap 0은 공지사항 1은 이벤트 2는 노하우
}

const WarningMsg = styled.div`
  display: inline-block;
  margin-left: 4em;
  color: #8d3232;
  font-size: smaller;
  font-weight: 400;
`;

export default RegistPosts;
