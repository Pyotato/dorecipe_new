import "./style.css";
import { useState, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../../layout/mainLayOut";
import { MainLogo } from "../../components/_common/mainLogo";

import { connect, useDispatch, useSelector } from "react-redux";
import { login } from "../../reduxRefresh/actions/auth.js";

const LoginPage = () => {
  const [member_id, setMemberId] = useState();
  const [member_pwd, setMemberPwd] = useState();
  const [loadingState, setState] = useState(false);

  //   console.log("auth", );
  const handleMemberId = (e) => {
    setMemberId(e.target.value);
  };
  const handleMemberPwd = (e) => {
    setMemberPwd(e.target.value);
  };
  const navigate = useNavigate();
  // const { dispatch, history } = auth;
  // const { isLoggedIn, message } = auth;

  const dispatch = useDispatch();
  const auth = useSelector((state) => state);

  // console.log("auth!!!!!!", auth);
  const memberLogin = (e) => {
    e.preventDefault();
    console.log("ID : ", member_id);
    console.log("PW : ", member_pwd);

    //  console.log("history>?", history);
    if (member_id.length > 0 && member_pwd.length > 0) {
      dispatch(login(member_id, member_pwd))
        .then(() => {
          setState(true);
          // window.location.reload();
          navigate("/");
        })
        .catch((err) => {
          // console.log("로그인 실패");
          alert("로그인에 실패하셨습니다.");
          setMemberId("");
          setMemberPwd("");
          setState(false);
        });
    } else {
      setState(false);
    }
  };

  return (
    <>
      <MainLayout>
        <div className="loginSection">
          <div className="loginWrap">
            <div>
              <MainLogo />
            </div>

            <div className="formWrap">
              <form action="#" method="get">
                <input
                  value={member_id || ""}
                  name="member_id"
                  className="idInput"
                  required
                  type="text"
                  placeholder="아이디"
                  onChange={handleMemberId}
                />
                <input
                  value={member_pwd || ""}
                  name="memeber_pwd"
                  className="pwdInput"
                  required
                  type="password"
                  placeholder="비밀번호"
                  onChange={handleMemberPwd}
                />
                <button type="button" name="loginBtn" onClick={memberLogin}>
                  로그인
                </button>
              </form>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};
function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  console.log("mapStateToProps+message", { state });
  return {
    isLoggedIn,
    message,
  };
}
export default connect(mapStateToProps)(LoginPage);
