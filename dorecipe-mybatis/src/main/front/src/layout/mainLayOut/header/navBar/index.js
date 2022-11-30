import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../../theme/theme";

const NavBar = ({ tabState, onToggleTab }) => {
  const user = useSelector((auth) => auth);
  const [userState, setUserState] = useState(user);
  const [displayState, setDisplay] = useState("visible");
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.auth.isLoggedIn) {
      if (userState.auth.user.roles.includes("ROLE_ADMIN")) {
        setUserState(userState.auth.user);
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
  return (
    <>
      {tabState === 1 ? (
        <>
          <NavWrapper onMouseLeave={onToggleTab}>
            <ul>
              <li
                className="navLinks"
                onClick={checkAuthState}
                // 관리자만 보이지 않도록
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
  font-family: "mainFont";
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
