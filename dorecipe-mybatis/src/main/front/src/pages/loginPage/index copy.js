import "./style.css";
import { useState, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../../layout/mainLayOut";
import { MainLogo } from "../../components/_common/mainLogo";

import { connect, useDispatch } from "react-redux";
import { login } from "../../reduxRefresh/actions/auth.js";

const LoginPage = (auth) => {
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
  const { dispatch, history } = auth;

  // useEffect(() => {
  //    Axios();
  // }, []);

  //    const memberLogin = ()=>{

  //       const data = {
  //          member_id:`${member_id}`,
  //          member_pwd:`${member_pwd}`
  //       }
  //       console.log("mempw : : : " + member_pwd);

  //       const formData = new FormData();
  //       formData.append("member_id", data.member_id);
  //       formData.append("member_pwd", data.member_pwd);

  //       console.log("click login");
  //        console.log("ID : ", member_id);
  //        console.log("PW : ", member_pwd);

  //        axios({
  //          method: "POST",
  //          url : "http://localhost:9000/login",
  //          data: formData
  //        })
  //          .then((res)=>{
  //             console.log("memberLogin callback====================");
  //             console.log(res);
  // //            console.log("memberLogin callback====> " + res);
  //             console.log("res.data.member_id :: ", res.data.member_id);
  //             console.log("res.data.member_pwd :: ", res.data.member_pwd);

  //             if(res.data.member_id === undefined){
  //                // id 일치하지 않는 경우
  //                console.log("아이디 불일치",res.data.member_id);
  //                alert("입력하신 id가 일치하지 않습니다.");
  //                document.location.href="/login";
  //             }else if(res.data.member_id === null){
  //                // id는 있지만, pw 는 다른 경우
  //                console.log("입력하신 비밀번호가 일치하지 않습니다.");
  //                document.location.href="/login";
  //             }else if(res.data.member_id === member_id){
  //                // id, pw 모두 일치
  //                console.log("로그인 성공!");
  //                sessionStorage.setItem("member_id",member_id); // sessionStorage에 id를 member_id라는 key 값으로 저장
  //                document.location.href="/";
  //             }

  //          })
  //          .catch((error)=>{
  //          //console.log(error);
  //          });
  //    };

  // },
  // [member_id,member_pwd]);

  const { isLoggedIn, message } = auth;
  // console.log("isLoggedIn", isLoggedIn);

  const memberLogin = (e) => {
    e.preventDefault();
    console.log("ID : ", member_id);
    console.log("PW : ", member_pwd);

    //  console.log("history>?", history);
    if (member_id.length > 0 && member_pwd.length > 0) {
      dispatch(login(member_id, member_pwd))
        .then(() => {
          setState(true);
          //  console.log("history>?", history);
          //  history.push("/profile"); //라우팅으로 특정 페이지ㅔ서 다른 페이지로 이동할떄 프롭스 전달
          history.push("/"); //라우팅으로 특정 페이지ㅔ서 다른 페이지로 이동할떄 프롭스 전달
          //  history.pathname.push("/member/info/"); //라우팅으로 특정 페이지ㅔ서 다른 페이지로 이동할떄 프롭스 전달
          //  history.push({ pathname: "/", state: { isLoggedIn } }); //라우팅으로 특정 페이지ㅔ서 다른 페이지로 이동할떄 프롭스 전달
          //   history.state.push(...history, "/profile");
          window.location.reload();
        })
        //   .then(() => {
        //     alert("로그인 성공");
        //     navigate({ to: "/" }, { replace: true, state: auth });
        //   })
        .catch((err) => {
          setState(false);
          //  state.state({
          //    loading: false,
          //  });
        });
    } else {
      setState(false);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  });
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
