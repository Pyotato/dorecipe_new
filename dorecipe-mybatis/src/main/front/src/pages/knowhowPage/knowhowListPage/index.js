import "./style.css";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KnowhowList from "./knowhowList";
import axios from "axios";
import styled from "styled-components";

const KnowhowPage = () => {
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
      url: "/knowhow/list",
      method: "get",
      data: {
        know_num: "test",
        know_title: "test",
        know_content: "test",
        know_creDate: "2022/08/24",
        know_path: "test_path",
      },
      baseURL: "http://localhost:9000",
      // baseURL: process.env.REACT_APP_HOST,
    }).then(function (response) {
      console.log(response.data);
      // console.log(response.data[0]);
      setState(response.data);
    });
  }

  useEffect(() => {
    testAxios();
  }, []);

  const removePost = useCallback((know_num) => {
    const removeState = state.filter((item) => item.know_num !== know_num);
    setState(removeState);
    axios
      .get(`http://localhost:9000/knowhow/delete/${know_num}`)
      .then((data) => {
        console.log(data);
      });
  });

  return (
    <>
      <div className="postMngWrap bottom">
        <h3 className="left">노하우 게시물 관리</h3>
        <hr className="left width" />
        <div className="knowTableWrap width left">
          <ul>
            <div className="tableHead">
              <div className="knowNo">No.</div>
              <div className="knowTitle">제목</div>
              <div className="knowDate">작성일자</div>
              <div className="updateOrDelete">수정 및 삭제</div>
            </div>
            <Scrollable>
              <div>
                {state.map((e) => (
                  <KnowhowList
                    key={e.know_num}
                    removePost={removePost}
                    state={e}
                  />
                ))}
              </div>
            </Scrollable>
          </ul>
        </div>
      </div>
    </>
  );
};

export default KnowhowPage;

const Scrollable = styled.section`
  width: 100%;
  margin: 0 auto;

  & > div {
    padding: 0 0.6rem;
    width: 102%;
    height: 300px;
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
