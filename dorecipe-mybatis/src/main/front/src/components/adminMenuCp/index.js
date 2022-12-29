import styled from "styled-components";
import { ReactComponent as Knowhow } from "@assets/Knowhow.svg";
import { ReactComponent as EventBoard } from "@assets/EventBoard.svg";
import { ReactComponent as Notice } from "@assets/Notice.svg";
import { ReactComponent as Home } from "@assets/Home.svg";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import EventList from "@eventCp/eventList";
import KnowhowListCp from "@knowhowCp/knowhowListCp";
import UploadNoticeCp from "@noticeCp/uploadNoticeCp";
import CreateEventCp from "@eventCp/eventCreate";
import CreateKnowhowCp from "@knowhowCp/knowhowCreate";
import NotFoundPage from "@pages/errorPage";

import { colors } from "@theme/theme";

const AdminMenuPage = () => {
  /** 관리자홈 == 0, 공지사항===1 ,이벤트===2, 노하우===3 에 따라 화면 바꾸기 */
  const [navState, setNavState] = useState(0);
  /** 관리자 홈에서는 관리자홈 네비 보이지 않도록하기 */
  const [navDisplayState, setNavDisplayState] = useState("none");
  /** 관리자홈 네비버튼 호버할때:메뉴보이기, 아닐때는 아이콘 표시 */
  const [toggleNavState, setToggleNavState] = useState(0);
  /** 관리자홈 화면만 바탕색 주기*/
  const [backgroundState, setBackGroundState] = useState(
    colors.color_beige_brown
  );

  //노하우 업데이트면 업데이트 화면 보이고, 아니면 등록화면 보이도록
  const [updateOrCreate, setUpdateOrCreateState] = useState([]);

  //로딩 중이면 대기하고, 명시적으로 로딩 중임 보이기
  const [isLoadingKnowhow, setKnowhowLoadingState] = useState(true);
  const [isLoadingEvent, setEventLoadingState] = useState(false);
  // const [isLoadingEvent, setEventLoadingState] = useState(true);

  const user = useSelector((auth) => auth);

  //마운트 시 1번만
  useEffect(() => {
    setNavState(0);
    setNavDisplayState("none");
    setToggleNavState(0);

    //언마운트 시
    return () => {
      //초기화
      setNavState(0);
      setNavDisplayState("none");
      setToggleNavState(0);
      setUpdateOrCreateState([]);
    };
  }, []);

  //관리하려는 항목 달라질때 수정 업데이트 초기화
  useMemo(() => {
    setUpdateOrCreateState([]);
  }, [navState]);

  return (
    <>
      {user.auth.user.roles.includes("ROLE_ADMIN") ? (
        <BackGround style={{ backgroundColor: backgroundState }}>
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
                    setBackGroundState(colors.color_beige_brown);
                  }}
                >
                  관리자홈
                </div>
                <div
                  className="navItems"
                  onClick={() => {
                    setNavState(1);
                    setBackGroundState("");
                  }}
                >
                  공지사항{" "}
                </div>

                <div
                  className="navItems"
                  onClick={() => {
                    setNavState(2);
                    setBackGroundState("");
                  }}
                >
                  이벤트
                </div>

                <div
                  className="navItems"
                  onClick={() => {
                    setNavState(3);
                    setBackGroundState("");
                  }}
                >
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
                    setBackGroundState("");
                  }}
                >
                  <div className="title">공지사항</div>
                  <Notice width="16vw" height="16vw" />
                </div>
                <div
                  className="iconWrap"
                  onClick={() => {
                    setNavState(2);
                    setNavDisplayState("block");
                    setBackGroundState("");
                  }}
                >
                  <div className="title">이벤트</div>
                  <EventBoard width="16vw" height="16vw" />
                </div>
                <div
                  className="iconWrap"
                  onClick={() => {
                    setNavState(3);
                    setNavDisplayState("block");
                    setBackGroundState("");
                  }}
                >
                  <div className="title">노하우</div>
                  <Knowhow width="16vw" height="16vw" />
                </div>
              </NavWrap>
            </>
          ) : navState === 1 ? (
            <>
              <UploadNoticeCp navState={navState} setNavState={setNavState} />
            </>
          ) : navState === 2 ? (
            <>
              <div style={{ padding: "11vh  4vw", height: "100vh" }}>
                <div className="borderLine">
                  <h1>이벤트</h1>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    width: "100%",
                  }}
                >
                  {/* <div style={{ width: "50%" }}>
                    <div>
                      <h2>등록</h2>
                    </div>
                    <CreateEventCp />
                  </div> */}
                  <div style={{ width: "50%" }}>
                    {updateOrCreate.length === 0 ? (
                      <>
                        <div>
                          <h2>등록</h2>
                        </div>
                        <CreateEventCp
                          isLoadingEvent={isLoadingEvent}
                          setEventLoadingState={setEventLoadingState}
                        />
                      </>
                    ) : (
                      <>
                        <div>
                          <h2>수정</h2>
                        </div>
                        <CreateEventCp
                          isLoadingEvent={isLoadingEvent}
                          setEventLoadingState={setEventLoadingState}
                          updateOrCreate={updateOrCreate}
                          setUpdateOrCreateState={setUpdateOrCreateState}
                        />
                      </>
                    )}
                  </div>
                  <div style={{ width: "50%" }}>
                    {" "}
                    <div>
                      <h2>목록</h2>
                    </div>
                    <EventList
                      updateOrCreate={updateOrCreate}
                      setUpdateOrCreateState={setUpdateOrCreateState}
                      isLoadingEvent={isLoadingEvent}
                      setEventLoadingState={setEventLoadingState}
                    />
                  </div>
                </div>{" "}
              </div>
            </>
          ) : (
            <>
              <div style={{ padding: "11vh  4vw", height: "100vh" }}>
                <div className="borderLine">
                  <h1>노하우</h1>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    width: "100%",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    {updateOrCreate.length === 0 ? (
                      <>
                        <div>
                          <h2>등록</h2>
                        </div>
                        <CreateKnowhowCp
                          isLoadingKnowhow={isLoadingKnowhow}
                          setKnowhowLoadingState={setKnowhowLoadingState}
                        />
                      </>
                    ) : (
                      <>
                        <div>
                          <h2>수정</h2>
                        </div>
                        <CreateKnowhowCp
                          isLoadingKnowhow={isLoadingKnowhow}
                          setKnowhowLoadingState={setKnowhowLoadingState}
                          updateOrCreate={updateOrCreate}
                          setUpdateOrCreateState={setUpdateOrCreateState}
                        />
                      </>
                    )}
                  </div>
                  <div style={{ width: "50%" }}>
                    {" "}
                    <div>
                      <h2>목록</h2>
                    </div>
                    <KnowhowListCp
                      navState={navState}
                      setNavState={setNavState}
                      updateOrCreate={updateOrCreate}
                      setUpdateOrCreateState={setUpdateOrCreateState}
                      isLoadingKnowhow={isLoadingKnowhow}
                      setKnowhowLoadingState={setKnowhowLoadingState}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </BackGround>
      ) : (
        <NotFoundPage />
      )}
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

  & .title {
    padding-bottom: 3vh;
  }

  & .iconWrap {
    color: ${colors.color_brown};
    font-weight: 900;
    &:hover {
      color: ${colors.color_carrot_orange};
    }
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
