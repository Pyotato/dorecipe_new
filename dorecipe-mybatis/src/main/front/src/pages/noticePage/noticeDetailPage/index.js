import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@layout/mainLayOut";
import styled from "styled-components";
import { colors } from "@theme/theme";
import { useNavigate } from "react-router-dom";

const NoticeDetailPage = () => {
  let { noticeId } = useParams();

  const navigate = useNavigate();

  const [state, setState] = useState([
    {
      notice_num: 0,
      notice_title: "",
      notice_content: "",
      notice_creDate: "",
    },
  ]);

  function testAxios() {
    axios({
      url: "/notice/detail/" + noticeId,
      method: "get",
      data: {
        notice_num: "test",
        notice_title: "test",
        notice_content: "test",
        notice_creDate: "2022/08/24",
      },
      // baseURL: process.env.REACT_APP_HOST,
      baseURL: "http://localhost:9000",
    }).then(function (response) {
      console.log(response.data);
      setState(response.data);
    });
  }

  useEffect(() => {
    testAxios();
  }, []);

  return (
    <>
      <MainLayout>
        <TotalWrap>
          <li>
            <div className="noticeWrap">
              <h1>공지사항</h1>{" "}
              <div
                className="backBtn"
                onClick={() => {
                  navigate("/notice/list");
                }}
              >
                목록으로
              </div>
              <div className="noticeDetailTitle noticeBorder">
                <div className="titleWrap">
                  <div className="floatLeft">{state.notice_title}</div>
                  <div className="floatRight">{state.notice_creDate}</div>
                </div>
                <div className="noticeDetailContent">
                  {state.notice_content}
                </div>
              </div>
              <div className="greeting">
                앞으로도 보다 나은 성비스로 항상 보답하겠습니다. 감사합니다.
              </div>
            </div>
          </li>
        </TotalWrap>
      </MainLayout>
    </>
  );
};

export default NoticeDetailPage;

const TotalWrap = styled.div`
  width: 100%;
  padding: 12vh 6vw 6vh 6vw;
  min-height: 100vh;

  & h1 {
    float: left;
    font-weight: 700;
    margin-bottom: 3vh;
  }
  & .noticeDetailTitle {
    clear: left;
    line-height: 4;
  }

  & .titleWrap {
    border-top: 1px solid black;
  }

  & .floatLeft {
    float: left;
    padding: 3vh;
  }
  & .floatRight {
    float: right;
    padding: 3vh;
  }

  & .noticeDetailContent {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    clear: both;
    padding: 3vh;
    white-space: pre-line; // \n줄바꿈
    line-height: 3;
  }
  & .greeting {
    padding: 3vh;
    text-align: center;
    border-bottom: 1px solid black;
  }

  & .backBtn {
    float: right;
    border: 1px solid transparent;
    border-radius: 0.5vw;
    background-color: ${colors.color_beige_brown};
    padding: 0.5vw;

    &:hover {
      background-color: ${colors.color_carrot_orange};
      color: ${colors.color_beige_white};
      cursor: pointer;
    }
  }
`;
