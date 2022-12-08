import { useState, useCallback, useEffect } from "react";
import NoticeList from "./noticeList";
import axios from "axios";
import MainLayout from "../../../layout/mainLayOut";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { colors } from "../../../theme/theme";

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
      // console.log("BtnState", user.auth.user.roles.includes("ROLE_ADMIN"));
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
  }, []);

  return (
    <>
      <MainLayout>
        <TotalWrap>
          <div>
            <h1>공지사항</h1>
          </div>

          <div className="noticeWrap">
            <div className="noticeTableWrap">
              <div className="tableHead">
                <div className="noticeNo">No.</div>
                <div className="noticeTitle">제목</div>
                <div className="noticeDate">작성일자</div>
                {BtnState && <div className="updateOrDelete">수정 • 삭제</div>}
              </div>
            </div>
            <div className="noticeTableWrap">
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
            </div>
          </div>

          <div className="bottom" />
        </TotalWrap>
      </MainLayout>
    </>
  );
};
export default NoticePage;

const TotalWrap = styled.div`
  width: 100%;
  padding: 12vh 6vw 6vh 6vw;
  height: 100vh;

  & h1 {
    float: left;
    font-weight: 700;
    margin-bottom: 3vh;
  }
  & .noticeNo {
    width: 5%;
    text-align: center;
  }
  & .noticeTitle {
    width: 60%;
    text-align: center;
  }
  & .noticeDate {
    width: 10%;
    text-align: center;
  }
  & .updateOrDelete {
    width: 15%;
    color: ${colors.color_brown};
    text-align: center;
  }

  & .noticeTableWrap {
    border-bottom: 1px solid ${colors.color_brown};
  }

  & .tableHead {
    justify-content: space-between;
    padding: 0 1vw;
    border-top: 1px solid ${colors.color_brown};
  }
`;

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
