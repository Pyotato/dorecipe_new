import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "@theme/theme";

import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import { logout } from "../../../../reduxRefresh/actions/auth";
import { useMediaQuery } from "react-responsive";
import { fontSizes, margins } from "../../../../theme/theme";

const AccountIcon = () => {
  //페이지 이동
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((auth) => auth);
  const [userState, setUserState] = useState(user);
  const onClickRecipe = () => {
    navigate("/recipe/create");
  };
  const onClickAdmin = () => {
    navigate("/admin");
  };
  const isMobile = useMediaQuery({ query: "(max-width:767px)" });
  const onClickLogOut = useCallback(() => {
    //로그아웃 시키고 메인페이지로
    dispatch(logout());
    navigate("/");
  }, [dispatch]);

  useEffect(() => {
    if (userState.auth) {
      if (userState.auth.isLoggedIn) {
        if (userState.auth.user.roles.includes("ROLE_ADMIN")) {
          setUserState(userState.auth.user);
          console.log("ROLE_ADMIN");
        }
      }
    }
  }, []);

  const onClickMyPage = useCallback(() => {
    navigate("/member/info/");
  }, [user]);
  const onClickJoinMember = useCallback(() => {
    navigate("/join");
  }, [user]);
  const onClickLogin = useCallback(() => {
    navigate("/login");
  }, [user]);

  return (
    <>
      {!user.auth.isLoggedIn ? (
        <>
          {" "}
          {isMobile ? (
            <></>
          ) : (
            <>
              {" "}
              <AuthTotalWrap>
                {" "}
                |{" "}
                <span onClick={onClickJoinMember} className="onHoverItems">
                  회원가입
                </span>{" "}
                |{" "}
                <span onClick={onClickLogin} className="onHoverItems">
                  로그인
                </span>{" "}
                |
              </AuthTotalWrap>{" "}
            </>
          )}
        </>
      ) : user.auth.user.roles.includes("ROLE_ADMIN") ? (
        <>
          {isMobile ? (
            <></>
          ) : (
            <AuthTotalWrap>
              {" "}
              |{" "}
              <span className="onHoverItems" onClick={onClickAdmin}>
                관리자 홈{" "}
              </span>
              |{" "}
              <span onClick={onClickMyPage} className="onHoverItems">
                마이 페이지
              </span>{" "}
              |{" "}
              <span onClick={onClickLogOut} className="onHoverItems">
                로그아웃{" "}
              </span>{" "}
              |{" "}
            </AuthTotalWrap>
          )}
        </>
      ) : (
        <>
          {isMobile ? (
            <></>
          ) : (
            <AuthTotalWrap>
              {" "}
              |{" "}
              <span className="onHoverItems" onClick={onClickRecipe}>
                레시피 작성{" "}
              </span>
              |{" "}
              <span onClick={onClickMyPage} className="onHoverItems">
                마이 페이지
              </span>{" "}
              |{" "}
              <span onClick={onClickLogOut} className="onHoverItems">
                로그아웃
              </span>{" "}
              |
            </AuthTotalWrap>
          )}
        </>
      )}
    </>
  );
};
export default AccountIcon;
const AuthTotalWrap = styled.div`
  width: max-content;
  margin: 0 ${margins.margin_base};
  color: ${colors.color_milky_white};

  & .onHoverItems:hover {
    cursor: pointer;
  }

  & .isMobile {
    font-size: ${fontSizes.fontSize_xxTiny};
  }
`;
