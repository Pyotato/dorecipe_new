import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";

import { useSelector } from "react-redux";
import { colors } from "../../../theme/theme";

import { ReactComponent as BdayCake } from "../../../assets/BdayCake.svg";
import { ReactComponent as Woman } from "../../../assets/Woman.svg";
import { ReactComponent as Man } from "../../../assets/Man.svg";
import { ReactComponent as NoSelectSex } from "../../../assets/NoSelectSex.svg";
import { ReactComponent as Email } from "../../../assets/Email.svg";
import { ReactComponent as CompletedRecipes } from "../../../assets/CompletedRecipes.svg";
import { ReactComponent as GivenHearts } from "../../../assets/GivenHearts.svg";
import { ReactComponent as ReceivedHearts } from "../../../assets/ReceivedHearts.svg";
import { ReactComponent as IncompleteRecipes } from "../../../assets/IncompleteRecipes.svg";
import { ReactComponent as ProfileCircle } from "../../../assets/ProfileCircle.svg";
import { ReactComponent as Phone } from "../../../assets/Phone.svg";

const MemberInfoForm = () => {
  const userMsg = useSelector((state) => state.message);
  const user = useSelector((auth) => auth);
  const [userState, setUserState] = useState();
  const [currentUserName, setCurrentUserName] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [currentEmail, setEmail] = useState();
  const [currentRole, setRole] = useState();
  const navigate = useNavigate();
  // console.log("userState~~", userState);

  useEffect(() => {
    if (user.auth.isLoggedIn) {
      setCurrentUserId(user.auth.user.id);
      setCurrentUserName(user.auth.user.username);
      setEmail(user.auth.user.email);
      if (user.auth.user.roles.includes("ROLE_ADMIN")) {
        setRole("admin");
      }
      // console.log("currentUserName", user.auth.user.username);
      axios({
        url: "/member/getMember/" + user.auth.user.username,
        method: "get",
        // baseURL: process.env.REACT_APP_HOST,
        // baseURL: process.env.REACT_APP_API_URL,
        baseURL: "http://localhost:9000",
      })
        .then(function (response) {
          console.log("response", response);
          setMemberPhone(response.data.member_phone);
          setMemberBday(response.data.member_birth.substring(0, 10)); //1999-12-10형식으로
          setMemberGender(response.data.member_gender);
          setMemberName(response.data.member_name);
          setMemberNickName(response.data.member_nickname);
          setMemberProfile(response.data.member_imagePath);
        })
        .catch((e) => {
          // console.log(e);
        });
    } else {
      alert("로그인 페이지로 이동합니다");
      navigate("/login");
    }
  }, []);

  // 수정 useInput
  let [member_email, setMemberEmail] = useState("");
  let [member_phone, setMemberPhone] = useState("");
  let [member_birth, setMemberBday] = useState("");
  let [member_gender, setMemberGender] = useState("");
  let [member_name, setMemberName] = useState("");
  let [member_nickname, setMemberNickName] = useState("");
  let [member_imagePath, setMemberProfile] = useState("");

  // 멤버

  return (
    <>
      {/* 회원 정보 */}
      <form>
        <SectionTitle>MY INFO</SectionTitle>
        <InfoWrap>
          <div style={{ width: "25%" }}>
            {" "}
            <div className="imgWrap">
              {member_imagePath.includes("/img/member/") ? (
                <div
                  style={
                    {
                      // width: "80%",
                      // maxWidth: "21em",
                      // margin: "0 auto",
                      // maxWidth: "21em",
                      // maxHeight: "21em",
                      // padding: "0 15%",
                    }
                  }
                >
                  <img
                    src={member_imagePath}
                    style={{
                      borderRadius: "1vw",
                    }}
                    alt="회원 프로필 이미지"
                  />
                </div>
              ) : (
                <img src="/img/profileImage.png" alt="default profile" />
              )}
            </div>
          </div>
          <div style={{ width: "60%" }}>
            <div>
              <h1>
                <span className="carrot">{member_nickname}</span>님 반갑습니다.
              </h1>
            </div>
            <div className="infoWrap">
              <div style={{ width: "45%" }}>
                <div className="items">
                  <div name="columnName">
                    {member_gender === "남자" ? (
                      <Man />
                    ) : member_gender === "여자" ? (
                      <Woman />
                    ) : (
                      <NoSelectSex />
                    )}
                    <div className="inline">{currentUserName}</div>
                  </div>
                </div>
                <div className="items">
                  <ProfileCircle />
                  <span className="inline">{member_name}</span>
                </div>
                <div className="items">
                  <BdayCake />
                  <div className="inline">{member_birth}</div>
                </div>
                <div className="items">
                  <Phone />
                  <div className="inline">{member_phone}</div>
                </div>
                <div className="items">
                  <span className="columnName">
                    <Email />
                  </span>
                  <div className="inline">{currentEmail}</div>
                </div>{" "}
              </div>
              <div style={{ width: "50%" }}>
                <div className="items">
                  <CompletedRecipes className="accented svgStrokes" />
                  <div className="inlineRight">작성 완료한 레시피: 개</div>
                </div>
                <div className="items">
                  <IncompleteRecipes className="accented svgStrokes" />
                  <div className="inlineRight">작성중인 레시피: 개</div>
                </div>
                <div className="items">
                  <GivenHearts className="accented svgStrokes" />
                  <div className="inlineRight">좋아한 레시피: 개</div>
                </div>
                <div className="items">
                  <ReceivedHearts className="accented svgStrokes" />
                  <div className="inlineRight">좋아요 받은 레시피: 개</div>
                </div>
              </div>
            </div>
          </div>
        </InfoWrap>
      </form>
    </>
  );
};
export default MemberInfoForm;
const SectionTitle = styled.div`
  background-color: ${colors.color_carrot_orange};
  color: ${colors.color_beige_tinted_white};
  float: left;
  margin-top: 12vh;
  margin-bottom: 6vh;
  width: 8vw;
  text-align: center;
  padding: 1vw 1vh;
  font-weight: 700;
  justify-content: center;
`;
const InfoWrap = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2vw;

  & h1 {
    padding-bottom: 0.6em;
  }
  & .imgWrap {
    margin: 0 auto;
  }

  & .infoWrap {
    width: 100%;
    gap: 2vw;
    display: inline-flex;
  }

  & .items {
    height: 3em;
    padding: 1vh 0;
  }
  & .inline {
    height: 3em;
    margin: 1vw;
    display: inline-block;
    transform: translateY(-15%);
  }
  & .inlineRight {
    margin: 0 1vw;
    display: inline-block;
    transform: translateY(-40%);
  }
`;
