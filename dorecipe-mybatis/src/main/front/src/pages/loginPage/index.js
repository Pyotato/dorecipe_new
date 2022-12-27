import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@layout/mainLayOut";
import { ReactComponent as CloseButton } from "@assets/Close.svg";
import styled from "styled-components";
import { borderRadii, colors, margins, paddings } from "@theme/theme";
import { connect, useDispatch } from "react-redux";

import { login } from "../../reduxRefresh/actions/auth.js";

const LoginPage = () => {
  const [member_id, setMemberId] = useState();
  const [member_pwd, setMemberPwd] = useState();
  const [state, setState] = useState(false);
  const [loginfailstate, setLoginFailstate] = useState(0);

  const handleMemberId = (e) => {
    setMemberId(e.target.value);
  };
  const handleMemberPwd = (e) => {
    setMemberPwd(e.target.value);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memberLogin = (e) => {
    e.preventDefault();

    if (member_id.length > 0 && member_pwd.length > 0) {
      dispatch(login(member_id, member_pwd))
        .then(() => {
          setState(true);
          navigate("/");
          setLoginFailstate(0);
        })
        .catch((err) => {
          // console.log(err);
          setMemberId("");
          setMemberPwd("");
          setState(false);
          setLoginFailstate(loginfailstate + 1);
        });
    } else {
      setState(false);
    }
  };

  return (
    <>
      <MainLayout>
        <TotalWrap>
          <h1>로그인</h1>
          {loginfailstate < 1 ? (
            <div className="formWrap">
              <div className="introText">
                반갑습니다! 도-레시피에 오신 것을 환영합니다.
              </div>
              <hr />
              <form action="#" method="get">
                <input
                  value={member_id || ""}
                  name="member_id"
                  className="idInput"
                  required
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  onChange={handleMemberId}
                />
                <input
                  value={member_pwd || ""}
                  name="memeber_pwd"
                  className="pwdInput"
                  required
                  type="password"
                  style={{ marginTop: "1vh" }}
                  placeholder="비밀번호를 입력해주세요."
                  onChange={handleMemberPwd}
                />
                <button
                  type="button"
                  name="loginBtn"
                  className="loginBtn"
                  onClick={memberLogin}
                >
                  로그인
                </button>
              </form>
              <div className="joinMember" onClick={() => navigate("/join")}>
                회원가입
              </div>
            </div>
          ) : (
            <>
              <div className="formWrap">
                <CloseButton
                  className="closeBtn"
                  onClick={() => setLoginFailstate(0)}
                ></CloseButton>
                <div className="introText">
                  비밀번호 또는 아이디가 올바르지 않습니다.
                </div>
                <div style={{ height: "29vh" }}>
                  <div className="introText">
                    <div className="introText">다시 확인해주시기 바랍니다.</div>
                    <div> 아직 회원이 아니신가요?</div>
                  </div>
                </div>

                <div className="joinMember" onClick={() => navigate("/join")}>
                  회원가입
                </div>
              </div>
            </>
          )}
        </TotalWrap>
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
const TotalWrap = styled.div`
  height: 100vh;
  background-image: url("/img/loginBackgroundImg.png");
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  padding: ${paddings.padding_uuuul} 0;
  font-family: "mainFont";

  & h1 {
    text-align: center;
    padding-bottom: ${paddings.padding_uul};
    color: ${colors.color_white};
  }
  & .formWrap {
    margin: 0 auto;
    padding: 0;
    width: 40vw;
    min-width: 27em;
    height: 40vh;
    background-color: ${colors.color_white};
  }

  & .introText {
    font-size: 1vw;
    text-align: center;
    padding: ${paddings.padding_xxl} 0;
    margin: ${margins.margin_xxxl};
    height: 3vh;
  }

  & input {
    width: 80%;
    height: 4vh;
    margin: 3vh;
    border: 1px solid transparent;
    background-color: ${colors.color_beige_brown};
    border-radius: ${borderRadii.radius_small};
    padding-left: ${paddings.padding_small};
    margin-top: 4vh;
  }

  & .loginBtn {
    width: 80%;
    margin: 3vh;
    height: 4vh;
    background-color: ${colors.color_beige_white};
    border: 2px solid ${colors.color_milktea_brown};
  }
  & .loginBtn:hover {
    cursor: pointer;
    color: ${colors.color_beige_white};
    background-color: ${colors.color_carrot_orange};
  }
  & .joinMember {
    height: 6vh;
    padding: 2vh;

    font-size: 1vw;
    margin: 0 auto;
    border: 1px solid ${colors.color_milktea_brown};
    background-color: ${colors.color_beige_white};
  }
  & .joinMember:hover {
    cursor: pointer;
    color: ${colors.color_beige_white};
    background-color: ${colors.color_brown};
  }

  & .closeBtn {
    float: right;
    display: block;
    margin: 1vw 1vw 0 0;
    fill: ${colors.color_brown};
  }
  & .closeBtn:hover {
    cursor: pointer;
    fill: ${colors.color_carrot_orange};
  }
`;
export default connect(mapStateToProps)(LoginPage);
