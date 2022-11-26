import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useInput } from "../../hooks/useInput";
import NoticeList from "../../pages/noticePage/noticeListPage/noticeList";
import { logout } from "../../reduxRefresh/actions/auth";

const AdminNotice = ({ navState, setNavState }) => {
  let [notice_title, onChangeNoticeTitle, setNoticeTitle] = useInput("");
  let [notice_content, onChangeNoticeContent, setNoticeContent] = useInput("");

  const user = useSelector((auth) => auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const testAxios = () => {
    axios({
      url: "/notice/list",
      method: "get",
      data: {
        notice_num: "test1",
        notice_title: "test1",
        notice_content: "test입닌당",
        notice_creDate: "2022/08/17",
      },
      baseURL: "http://localhost:9000",
      // baseURL: process.env.REACT_APP_HOST,
    }).then(function (response) {
      // console.log(response.data);
      setState(response.data);
    });
  };

  const [state, setState] = useState([
    {
      notice_num: 0,
      notice_title: "",
      notice_content: "",
      notice_creDate: "",
    },
  ]);
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
    [notice_title, notice_content, state]
  );

  const [BtnState, setBtnState] = useState(user.auth.user);
  useEffect(() => {
    if (!user.auth.user) {
      setBtnState(false);
      return;
    } else {
      console.log("BtnState", user.auth.user.roles.includes("ROLE_ADMIN"));
      setBtnState(user.auth.user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const removePost = useCallback((notice_num) => {
    const removeState = state.filter((item) => item.notice_num !== notice_num);
    setState(removeState);
    axios
      .get(`http://localhost:9000/notice/delete/${notice_num}`)
      .then((data) => {
        console.log(data);
      });
  });

  return (
    <>
      {" "}
      <div>
        {" "}
        <h2>| Notice |</h2>
        <div>
          <h4 className="left">공지사항 등록 </h4>
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
            // disabled={error}
            className="left2 btn btn-outline-secondary"
          >
            등록
          </button>
        </div>
      </div>
      <div className="noticeWrap">
        {navState === 1 && testAxios()}
        <div className="noticeTableWrap">
          <ul>
            <div className="tableHead">
              <div className="noticeNo">No.</div>
              <div className="noticeTitle">제목</div>
              <div className="noticeDate">작성일자</div>

              {BtnState && <div className="updateOrDelete">수정 및 삭제</div>}
            </div>
            <Scrollable>
              <div>
                {state.map((e) => (
                  <NoticeList
                    key={e.notice_num}
                    removePost={removePost}
                    BtnState={BtnState}
                    state={e}
                  />
                ))}
              </div>
            </Scrollable>
          </ul>
        </div>
      </div>
      <div className="bottom" />
    </>
  );
};
export default AdminNotice;
const Scrollable = styled.section`
  width: 100%;
  margin: 0 auto;

  & > div {
    padding: 0 0.6rem;
    width: 102%;
    height: 450px;
    overflow-y: auto;
    margin: 0 auto;
    transform: translateX(-1%);
    ::-webkit-scrollbar {
      width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
      height: 30%;
      background-color: #fffdf5;
    }
    ::-webkit-scrollbar-track {
      background-color: #8d3232;
    }
  }
  & > div > li {
    list-style: none;
    display: inline-flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    padding: 1em 0;
    border-bottom: 1px solid #ad939156;
  }
`;
