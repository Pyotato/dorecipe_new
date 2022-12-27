import axios from "axios";
import { useRef } from "react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useInput } from "@hooks/useInput";

import { colors } from "@theme/theme";
import BasicSpinner from "@commonCp/loading";
import NoticeList from "@noticeCp/noticeList";

import { logout } from "../../../reduxRefresh/actions/auth";

const UploadNoticeCp = ({ navState, setNavState }) => {
  let [notice_title, onChangeNoticeTitle, setNoticeTitle] = useInput("");
  let [notice_content, onChangeNoticeContent, setNoticeContent] = useInput("");

  const user = useSelector((auth) => auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const noticeTitle = useRef();
  const noticeContent = useRef();
  const [state, setState] = useState([
    {
      notice_num: 0,
      notice_title: "",
      notice_content: "",
      notice_creDate: "",
    },
  ]);
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
            noticeTitle.current.value = "";
            noticeContent.current.value = "";
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

  const removePost = useCallback(
    (notice_num) => {
      const removeState = state.filter(
        (item) => item.notice_num !== notice_num
      );
      setState(removeState);
      axios
        .get(`http://localhost:9000/notice/delete/${notice_num}`)
        .then((data) => {
          console.log(data);
        });
    },
    [state]
  );

  return (
    <>
      <Wrap>
        <h1>공지사항</h1>
        <TotalWrap>
          <div style={{ width: "50%" }}>
            <div>
              <h2>등록</h2>
              <div>
                <div>
                  <div className="flexWrap">
                    <div style={{ width: "10%" }}>제목</div>
                    <div style={{ width: "80%" }}>
                      <input
                        ref={noticeTitle}
                        name="notice_title"
                        type="text"
                        placeholder=" 제목을 입력해주세요"
                        onChange={onChangeNoticeTitle}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      width: "90%",
                      justifyContent: "space-around",
                    }}
                  >
                    <div style={{ width: "10%" }}>내용</div>

                    <textarea
                      ref={noticeContent}
                      name="notice_content"
                      className="content"
                      style={{
                        width: "80%",
                        height: "52vh",
                        borderRadius: "0.5vw",
                        border: "1px solid transparent",
                      }}
                      wrap="hard"
                      required
                      resize="none"
                      onChange={onChangeNoticeContent}
                    ></textarea>
                  </div>
                </div>
              </div>
              <button type="button" onClick={insertNotice}>
                등록
              </button>
            </div>
          </div>

          {/* 공지사항 목록section */}
          <div className="noticeWrap" style={{ width: "50%" }}>
            <h2>목록</h2>
            {navState === 1 && testAxios()}
            <div className="noticeTableWrap">
              <ul>
                <div className="tableHead" style={{ padding: "0.5em 1em" }}>
                  <div className="noticeNo">No.</div>
                  <div className="noticeTitle">제목</div>
                  <div className="noticeDate">작성일자</div>

                  {BtnState && (
                    <div className="updateOrDelete">수정 및 삭제</div>
                  )}
                </div>
                {state[0].notice_title === "" ? (
                  <>
                    <>
                      <Scrollable>
                        <div
                          style={{
                            padding: "25% 0 ",
                            textAlign: "center",
                            width: "100%",
                          }}
                        >
                          <BasicSpinner displayState={"block"} />
                        </div>
                      </Scrollable>
                    </>
                  </>
                ) : (
                  <>
                    <Scrollable>
                      <div style={{ height: "60vh" }}>
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
                  </>
                )}
              </ul>
            </div>
          </div>
        </TotalWrap>
      </Wrap>
    </>
  );
};
export default UploadNoticeCp;
const Wrap = styled.div`
  width: 100%;
  padding: 11vh 4vw;
  & h1 {
    border-bottom: 1px solid black;
    padding-bottom: 1vh;
  }

  & .flexWrap {
    display: inline-flex;
    width: 90%;
    justify-content: space-around;
    margin-bottom: 3vh;
  }
`;

const TotalWrap = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: space-between;

  & input {
    width: 100%;
    border-radius: 0.5vw;
    padding: 0.2vw;
    background-color: ${colors.color_beige_white};
    border: 1px solid transparent;
  }
  & .content {
    line-height: 2;
    resize: none;
    background-color: ${colors.color_beige_white};
    padding: 1vw;
  }
  & .noticeNo {
    width: 5%;
  }
  & .noticeDate {
    width: 20%;
  }
  & .noticeTitle {
    width: 55%;
  }
  & .updateOrDelete {
    width: 20%;
  }

  & button {
    background-color: ${colors.color_milktea_brown};
    color: ${colors.color_beige_white};
    float: right;
    margin-right: 5.5vw;
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

const Scrollable = styled.section`
  width: 100%;
  margin: 0 auto;

  & > div {
    padding: 0 0.6rem;
    height: 450px;
    overflow-y: auto;
    margin: 0 auto;

    transform: translateX(-1%);
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
  & > div > li {
    list-style: none;
    display: inline-flex;

    width: 100%;
    align-items: center;
    padding: 1em 1vw;
    justify-content: space-between;
    border-bottom: 1px solid #ad939156;

    &:hover {
      color: ${colors.color_carrot_orange};
    }
  }

  & .listItem {
    border-radius: 0.5vw;
    padding: 0.5vw;
    background-color: ${colors.color_beige_brown};
    border: 1px solid transparent;

    &:hover {
      background-color: ${colors.color_carrot_orange};
      color: ${colors.color_beige_white};
    }
  }
`;
