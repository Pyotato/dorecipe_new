// import "./style.css";
import { useState, useCallback, useEffect } from "react";
import MemberList from "./memberList.js";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
// import { Scrollable } from "../../style/common.js";
const List = () => {
  const [state, setState] = useState([
    { member_id: "", member_name: "", member_email: "" },
  ]);
  //로딩중
  const [isLoading, setLoading] = useState(false);
  //리스트 아이템
  const [hasItems, setNumState] = useState(0);

  function testAxios() {
    axios({
      url: "/member/list",
      method: "get",
      data: {
        member_id: "",
        member_pwd: "",
        member_nickname: "",
        member_name: "",
        member_email: "",
        member_gender: "",
        member_birth: "",
        member_phone: "",
        member_imagePath: "",
        member_joinDate: "",
        member_like: "",
        email: "",
      },
      // baseURL: process.env.REACT_APP_HOST,
      baseURL: "http://localhost:9000",
    })
      .then(function (response) {
        setState(response.data);
        setNumState(response.data.length);
        console.log(response.data.length);
      })
      .catch(function () {
        setLoading(true);
      });
  }

  useEffect(() => {
    testAxios();
  }, []);

  const removePost = useCallback((member_id) => {
    const removeState = state.filter((item) => item.member_id !== member_id);
    setState(removeState);
    setNumState(hasItems - 1);

    axios
      .get(`http://localhost:9000/member/delete/${member_id}`)
      .then((data) => {
        console.log(data);
      });
  });

  return (
    <>
      <div className="bottom2 width2 left4">
        <ListWrapper>
          <h3 className="">회원 관리</h3>
          <hr className="" />
          <div className="">
            <ul>
              <TableHead>
                <div className="noticeNo">이름</div>
                <div className="noticeTitle">아이디</div>
                <div className="noticeDate">이메일</div>
                <div className="updateOrDelete"></div>
                {/* 수정은 로그인한 회원이 하도록 기능 옮기기 */}
              </TableHead>
              <Scrollable>
                <div>
                  {state.map((e) => (
                    <MemberList
                      key={e.member_id}
                      removePost={removePost}
                      state={e}
                      isLoading={isLoading}
                      hasItems={hasItems}
                    />
                  ))}
                </div>
              </Scrollable>{" "}
            </ul>
          </div>
        </ListWrapper>
      </div>
    </>
  );
};
export default List;

const ListWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const ListTitle = styled.h2`
  text-align: center;
  margin: 1em 0;
  font-weight: 700;
`;

const TableHead = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  border-bottom: 2px solid #ad939156;
  padding: 0.5em 0;

  & > div {
    font-weight: 700;
  }
`;
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
