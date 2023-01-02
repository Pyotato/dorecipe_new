import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "@theme/theme";
import { useMediaQuery } from "react-responsive";
import { logout } from "../../../../reduxRefresh/actions/auth";

const NavBar = ({ tabState, onToggleTab }) => {
  const user = useSelector((auth) => auth);
  const [userState, setUserState] = useState(user);
  const [adminState, setAdminState] = useState(false);
  const [displayState, setDisplay] = useState("visible");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width:767px)" });

  useEffect(() => {
    if (userState.auth.isLoggedIn) {
      if (userState.auth.user.roles.includes("ROLE_ADMIN")) {
        setUserState(userState.auth.user);
        setAdminState(true);
        setDisplay("none");
      }
    }
  }, []);

  const checkAuthState = () => {
    if (!userState.auth.isLoggedIn) {
      navigate("/login");
    } else if (userState.auth.user.roles.includes("ROLE_ADMIN")) {
      navigate("/admin");
    } else {
      navigate("/recipe/create");
    }
  };

  const onClickLogOut = useCallback(() => {
    //로그아웃 시키고 메인페이지로
    dispatch(logout());
    navigate("/");
  }, [dispatch]);

  const onClickMyPage = useCallback(() => {
    navigate("/member/info/");
  }, [user]);
  const onClickJoinMember = useCallback(() => {
    navigate("/join");
  }, [user]);
  const onClickLogin = useCallback(() => {
    navigate("/login");
  }, [user]);

  const onClickAdmin = () => {
    navigate("/admin");
  };
  return (
    <>
      {tabState === 1 ? (
        <>
          <NavWrapper onMouseLeave={onToggleTab}>
            <ul>
              {isMobile && (
                <>
                  {!user.auth.isLoggedIn ? (
                    <>
                      <li className="navLinks" onClick={onClickLogin}>
                        로그인
                      </li>
                      <li className="navLinks" onClick={onClickJoinMember}>
                        회원가입
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="navLinks" onClick={onClickMyPage}>
                        마이 페이지
                      </li>
                      {adminState && (
                        <li className="navLinks" onClick={onClickAdmin}>
                          관리자 홈
                        </li>
                      )}
                    </>
                  )}
                </>
              )}

              <li
                className="navLinks"
                onClick={checkAuthState}
                style={{ display: displayState }}
              >
                레시피 등록하기
              </li>
              <li>
                <Link className="navLinks" to={"/notice/list"}>
                  공지사항
                </Link>
              </li>
              <li>
                <Link className="navLinks" to={"/event/list"}>
                  이벤트
                </Link>
              </li>

              {isMobile && (
                <>
                  {user.auth.isLoggedIn && (
                    <li className="navLinks" onClick={onClickLogOut}>
                      로그아웃
                    </li>
                  )}
                </>
              )}
            </ul>
          </NavWrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default NavBar;

const NavWrapper = styled.div`
  position: fixed;
  top: 6.7vh;
  z-index: 700;
  height: fit-content;
  width: 100%;

  background-color: ${colors.color_brown};
  & ul > li {
    margin: 1vh;
    margin-left: 3vw;
    padding: 1vh 0;
  }
  & .navLinks {
    text-decoration: none;
    width: 100%;
    color: ${colors.color_milky_white};
    font-weight: 700;
  }
  & .navLinks:hover {
    cursor: pointer;
    color: ${colors.color_beige_white};
  }
`;
