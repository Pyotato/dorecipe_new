import "./style.css";
import { useState, useCallback, useEffect } from "react";
import NoticeList from "./noticeList";
import { Link } from "react-router-dom";
import axios from "axios";
import MainLayout from "../../../layout/mainLayOut";
import { useSelector } from "react-redux";
import styled from "styled-components";

const NoticePage = () => {
  const [state, setState] = useState([
    {
      notice_num: 0,
      notice_title: "",
      notice_content: "",
      notice_creDate: "",
    },
  ]);
  const user = useSelector((auth) => auth);
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

  function testAxios() {
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
  }

  useEffect(() => {
    testAxios();
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
      <MainLayout>
        <div className="noticeWrap">
          <h2>| Notice |</h2>

          {BtnState && (
            <Link className="updateList" to={"/admin"}>
              등록
            </Link>
          )}

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
      </MainLayout>
    </>
  );
};
export default NoticePage;

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
