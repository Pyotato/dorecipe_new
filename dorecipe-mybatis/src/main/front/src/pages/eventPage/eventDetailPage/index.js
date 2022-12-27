import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@layout/mainLayOut";
import { colors } from "@theme/theme";
import styled from "styled-components";
// import { Spinner } from "react-bootstrap";

const EventDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  let [state, setState] = useState([
    // {
    //   event_num: 0,
    //   event_title: "",
    //   event_content: "",
    //   event_path: "",
    //   event_creDate: "",
    //   event_finDate: "",
    // },
  ]);

  function Axios() {
    const event_num = params.detailId; // app.js에서 보내줌

    axios
      .get("http://localhost:9000/event/detail/" + event_num)
      .then((result) => {
        setState(result.data);
      })
      .catch(() => {
        console.log("실패... 이벤트디테일페이지");
      });
  }

  useEffect(() => {
    Axios();
  }, []);
  console.log(state.event_path + "이거");
  return (
    <>
      <MainLayout>
        <TotalWrap>
          <li>
            <div className="noticeWrap">
              <h1>이벤트</h1>{" "}
              <div
                className="backBtn"
                onClick={() => {
                  navigate("/event/list");
                }}
              >
                목록으로
              </div>
              <div className="noticeDetailTitle noticeBorder">
                <div className="titleWrap">
                  {/* {!state ? (
                    <Spinner />
                  ) : (
                    <>
                      <div className="floatLeft">{state.event_title}</div>
                      <div className="floatRight">
                        참여기간 :{state.event_creDate} ~ {state.event_finDate}
                      </div>
                    </>
                  )} */}
                  <div className="floatLeft">{state.event_title}</div>
                  <div className="floatRight">
                    참여기간 :{state.event_creDate} ~ {state.event_finDate}
                  </div>
                </div>
                <div className="noticeDetailContent">
                  {state.event_path !== "" ? (
                    <div style={{ margin: "0 auto", width: "fit-content" }}>
                      <img
                        className="eventImg"
                        src={state.event_path}
                        alt={state.event_title}
                      />
                    </div>
                  ) : null}
                  <div className="itemContent">{state.event_content}</div>
                </div>
              </div>
              <div className="greeting">
                도레시피와 함꼐해주신 이용자분들께 항상 감사합니다.
              </div>
            </div>
          </li>
        </TotalWrap>
      </MainLayout>
    </>
  );
};
export default EventDetailPage;
const TotalWrap = styled.div`
  width: 100%;
  padding: 12vh 6vw 6vh 6vw;
  min-height: 100vh;

  & img {
    max-width: 100%;
    margin-bottom: 2vh;
    border-radius: 0.5vw;
  }
  & .flexBox {
    display: inline-flex;
    width: 100%;
    gap: 1em;
    justify-content: center;
    flex-wrap: wrap;
  }
  & .itemContent {
    line-height: 2;
  }
  & h1 {
    float: left;
    font-weight: 700;
    margin-bottom: 3vh;
  }
  & .noticeDetailTitle {
    clear: left;
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
    width: 100%;
    padding: 3vh;
    margin: 0 auto;
    white-space: pre-line; // \n줄바꿈
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
