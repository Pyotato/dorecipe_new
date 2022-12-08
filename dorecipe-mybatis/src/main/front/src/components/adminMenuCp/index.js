import styled from "styled-components";
import { ReactComponent as Knowhow } from "../../assets/Knowhow.svg";
import { ReactComponent as EventBoard } from "../../assets/EventBoard.svg";
import { ReactComponent as Notice } from "../../assets/Notice.svg";
import { ReactComponent as Home } from "../../assets/Home.svg";
import { useEffect, useState } from "react";
import AdminNotice from "../noticeCp";
import EventList from "../eventCp/eventList";
import EventModify from "../eventCp/eventModify";
import KnowhowUpdatePage from "../knowhowCp";
import KnowhowListCp from "../knowhowCp/knowhowListCp";
import UploadNoticeCp from "../noticeCp/uploadNoticeCp";
import { colors } from "../../theme/theme";
import CreateEventCp from "../eventCp/eventCreate";

const AdminMenuPage = () => {
  /** 관리자홈 == 0, 공지사항===1 ,이벤트===2, 노하우===3 에 따라 화면 바꾸기 */
  const [navState, setNavState] = useState(0);
  /** 관리자 홈에서는 관리자홈 네비 보이지 않도록하기 */
  const [navDisplayState, setNavDisplayState] = useState("none");
  /** 관리자홈 네비버튼 호버할때:메뉴보이기, 아닐때는 아이콘 표시 */
  const [toggleNavState, setToggleNavState] = useState(0);

  useEffect(() => {
    setNavState(0);
    setNavDisplayState("none");
    setToggleNavState(0);
    console.log("navState", navState);
  }, []);

  return (
    <>
      <BackGround>
        {toggleNavState === 0 ? (
          <HomeIcon
            style={{ zIndex: "700", display: navDisplayState }}
            onMouseOver={() => {
              setToggleNavState(1);
            }}
          >
            <Home style={{ transform: "translateX(9%)" }} />
          </HomeIcon>
        ) : (
          <Navbar
            style={{ zIndex: "700", display: navDisplayState }}
            onMouseLeave={() => {
              setToggleNavState(0);
            }}
          >
            <div>
              <div
                className="navItems"
                onClick={() => {
                  setNavState(0);
                  setNavDisplayState("none");
                }}
              >
                관리자홈
              </div>
              <div className="navItems" onClick={() => setNavState(1)}>
                공지사항{" "}
              </div>

              <div className="navItems" onClick={() => setNavState(2)}>
                이벤트
              </div>

              <div className="navItems" onClick={() => setNavState(3)}>
                노하우
              </div>
            </div>
          </Navbar>
        )}

        {navState === 0 ? (
          <>
            <NavWrap style={{ height: "100vh" }}>
              <div
                className="iconWrap"
                onClick={() => {
                  setNavState(1);
                  setNavDisplayState("block");
                }}
              >
                <div className="title">공지사항</div>
                <Notice width="16vw" height="16vw" fill="blue" />
              </div>
              <div
                className="iconWrap"
                onClick={() => {
                  setNavState(2);
                  setNavDisplayState("block");
                }}
              >
                <div className="title">이벤트</div>
                <EventBoard width="16vw" height="16vw" fill="blue" />
              </div>
              <div
                className="iconWrap"
                onClick={() => {
                  setNavState(3);
                  setNavDisplayState("block");
                }}
              >
                <div className="title">노하우</div>
                <Knowhow width="16vw" height="16vw" fill="blue" />
              </div>
            </NavWrap>
          </>
        ) : navState === 1 ? (
          <>
            <UploadNoticeCp navState={navState} setNavState={setNavState} />
          </>
        ) : navState === 2 ? (
          <>
            <div style={{ padding: "11vh  4vw" }}>
              <div className="borderLine">
                <h1>이벤트</h1>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  width: "100%",
                }}
              >
                <div style={{ width: "50%" }}>
                  <div>
                    <h2>등록</h2>
                  </div>
                  <CreateEventCp />
                </div>
                <div style={{ width: "50%" }}>
                  {" "}
                  <div>
                    <h2>목록</h2>
                  </div>
                  <EventList />
                </div>
              </div>{" "}
            </div>
          </>
        ) : (
          <div style={{ display: "inline-flex" }}>
            <KnowhowUpdatePage />
            <KnowhowListCp navState={navState} setNavState={setNavState} />
          </div>
        )}
      </BackGround>
    </>
  );
};
export default AdminMenuPage;
const BackGround = styled.div`
  & .borderLine {
    width: 100%;
    padding-bottom: 1vh;
    border-bottom: 1px solid ${colors.color_brown};
  }
`;
const Navbar = styled.div`
  width: 6em;

  background-color: ${colors.color_beige_white};
  padding: 0.5em;
  border-radius: 0.5vw 0.5vw 0 0;

  position: fixed;
  left: 3vw;
  bottom: 0;

  & .navItems {
    padding: 0.2em;
    text-align: center;
    &:hover {
      color: ${colors.color_carrot_orange};
      transform: scaleX(1.1);
    }
  }

  & h1 {
    float: left;
    font-weight: 700;
    margin-bottom: 3vh;
  }
`;
const HomeIcon = styled.div`
  width: 3em;
  height: 3em;
  padding: 0.5em;
  border-radius: 100%;
  background-color: ${colors.color_beige_white};
  border: 1px solid transparent;
  position: fixed;
  left: 4vw;
  top: 85vh;
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
  }
  & :hover {
    cursor: pointer;
  }
`;
