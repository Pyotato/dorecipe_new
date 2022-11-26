import styled from "styled-components";
import { ReactComponent as Knowhow } from "../../assets/Knowhow.svg";
import { ReactComponent as EventBoard } from "../../assets/EventBoard.svg";
import { ReactComponent as Notice } from "../../assets/Notice.svg";
import RegistPosts from "../registPostsCp";
import { useCallback, useEffect, useState } from "react";
import List from "../../components/memberListCp";
import KnowhowPage from "../../pages/knowhowPage/knowhowListPage";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../../reduxRefresh/actions/auth";
import { useInput } from "../../hooks/useInput";
import NoticeList from "../../pages/noticePage/noticeListPage/noticeList";
import AdminNotice from "../noticeCp";
// import NoticeList from "../../pages/noticePage/noticeListPage/noticeList";
// import NoticePage from "../../pages/noticePage/noticeListPage";
// import EventList from "../event/eventList/index";
// import EventList from "../eventList";

const AdminMenuPage = () => {
  const [navState, setNavState] = useState(0);
  // const
  useEffect(() => {
    setNavState(0);
    console.log("navState", navState);
  }, []);

  return (
    <>
      <BackGround>
        <Navbar>navbar</Navbar>
        {navState === 0 ? (
          <>
            <NavWrap>
              <div className="iconWrap" onClick={() => setNavState(1)}>
                <div className="title">공지사항 </div>
                {/* <NoticePage /> */}
                <Notice width="16vw" height="16vw" fill="blue" />
              </div>
              <div className="iconWrap" onClick={() => setNavState(2)}>
                <div className="title">이벤트</div>
                <EventBoard width="16vw" height="16vw" fill="blue" />
              </div>
              <div className="iconWrap" onClick={() => setNavState(3)}>
                <div className="title">노하우</div>
                <Knowhow width="16vw" height="16vw" fill="blue" />
              </div>
            </NavWrap>
          </>
        ) : navState === 1 ? (
          <>
            <AdminNotice navState={navState} setNavState={setNavState} />
          </>
        ) : navState === 2 ? (
          <>
            <List />
            {/* <EventList /> */}
          </>
        ) : (
          <KnowhowPage />
        )}
      </BackGround>
    </>
  );
};
export default AdminMenuPage;
const BackGround = styled.div`
  background-color: pink;
`;
const Navbar = styled.div`
  width: 12em;
  height: 30em;
  background-color: red;
  position: fixed;
  right: 5vw;
  top: 80vh;
`;
const NavWrap = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 9vw;
  & .iconWrap {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }
  & .title {
    text-align: center;
    width: 16vw;
    font-size: 3vw;
    /* display: inline; */
  }
  & :hover {
    cursor: pointer;
  }
`;
