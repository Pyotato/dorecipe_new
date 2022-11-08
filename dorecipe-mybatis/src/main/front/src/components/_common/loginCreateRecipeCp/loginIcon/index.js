import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { login, logout } from "../../../../reduxRefresh/actions/auth";
const AccountIcon = () => {
  //페이지 이동
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((auth) => auth);

  const onClickLogOut = useCallback(() => {
    //로그아웃 시키고 메인페이지로
    dispatch(logout());
    navigate("/");
  }, [dispatch]);

  const popover = useCallback(
    <Popover>
      <Popover.Body>
        {user.auth.isLoggedIn ? (
          <>
            <Link className="linkItems" to="/member/info/">
              마이 페이지
            </Link>

            <div className="linkItems" onClick={onClickLogOut}>
              로그아웃
            </div>
          </>
        ) : (
          <>
            <Link className="linkItems" to="/join">
              회원가입
            </Link>
            <Link className="linkItems" to="/login">
              로그인
            </Link>
          </>
        )}
      </Popover.Body>
    </Popover>,
    [user]
  );

  const ToggleMsgBtn = () => (
    <>
      {/* 버튼 커스텀화 */}
      <style type="text/css">
        {`
    .btn-success {
      width: 2em;
      height: 2em;
      border-radius: 100%;
      background-color: transparent;
      margin-right:3em;
      border:1px solid transparent;
      // color: #463635;
    }
    .btn-success::after{
      background-color: transparent;
    }
    .btn-success:hover{
      background-color: transparent;
    }
    `}
      </style>
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button variant="success">
          <FontAwesomeIcon icon={faCircleUser} className="userIcon" />
        </Button>
      </OverlayTrigger>
    </>
  );

  return (
    <>
      <ToggleMsgBtn />
    </>
  );
};
export default AccountIcon;
