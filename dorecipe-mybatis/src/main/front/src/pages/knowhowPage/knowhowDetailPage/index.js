import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MainLayout from "@layout/mainLayOut";
import { colors } from "@theme/theme";

const KnowhowDetailPage = () => {
  let { knowhowId } = useParams();

  const [state, setState] = useState([
    {
      know_num: 0,
      know_title: "",
      know_content: "",
      know_creDate: "",
      know_path: "",
    },
  ]);

  function testAxios() {
    axios({
      url: "/knowhow/detail/" + knowhowId,
      method: "get",
      data: {
        know_num: "test",
        know_title: "test",
        know_content: "test",
        know_creDate: "2022/08/24",
        know_path: "test",
      },
      baseURL: "http://localhost:9000",
      // baseURL: process.env.REACT_APP_HOST,
      // baseURL: process.env.REACT_APP_API_URL,
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
              <h1>노하우</h1>
              <div className="noticeDetailTitle noticeBorder">
                <div className="titleWrap">
                  <div className="floatLeft">{state.know_title}</div>
                  <div className="floatRight">{state.know_creDate}</div>
                </div>
                <div className="noticeDetailContent">
                  <div className="flexBox">
                    <div className="halfBox">
                      <img
                        className="knowDetailImage"
                        src={state.know_path}
                        alt={state.know_path}
                      />
                    </div>
                    <div className="halfBox ">{state.know_content}</div>
                  </div>
                </div>
              </div>
              <div className="greeting">
                도레시피와 함께 레시피들에 대해 알아보아요:)
              </div>
            </div>
          </li>
        </TotalWrap>
      </MainLayout>
    </>
  );
};

export default KnowhowDetailPage;
const TotalWrap = styled.div`
  width: 100%;
  padding: 12vh 6vw 6vh 6vw;
  min-height: 100vh;

  & img {
    max-width: 25em;
    border-radius: 0.5vw;
  }
  & .flexBox {
    display: inline-flex;
    width: 100%;
    gap: 1em;
    justify-content: center;
    flex-wrap: wrap;
  }
  & .halfBox {
    width: 35em;
  }
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
    line-height: 5;
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
