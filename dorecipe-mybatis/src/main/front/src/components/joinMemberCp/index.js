import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useInput } from "@hooks/useInput";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { ReactComponent as AddProfileImg } from "@assets/AddProfileImg.svg";
import { ReactComponent as Close } from "@assets/Close.svg";
import { TotalWrap, WarningMsg, SubmitBtn } from "./style.js";

import { useDispatch, useSelector } from "react-redux";
import { register, login } from "../../reduxRefresh/actions/auth";
const SignUpTemplate = () => {
  /** input state설정해주기 */
  const dispatch = useDispatch();
  const [member_id, onChangeMemId, setMemId] = useInput(""); //아이디
  const [member_nickname, onChangeNickname, setNickname] = useInput(""); //아이디
  const [member_pwd, onChangePwd, setPwd] = useInput(""); //비번
  const [confirm_pwd, onChangeConfirm, setConfirm] = useInput(""); //비번 재확인
  const [member_name, onChangeName, setName] = useInput(""); //이름

  const [member_gender, onChangeGender, setGender] = useInput(""); //성별
  const [member_phone, onChangePh, setPhone] = useInput(""); //전화번호
  const [member_email, onChangeEmail, setEmail] = useInput(""); //이메일

  const [member_imagePath, onChangeMemberImagePath, setMemberImagePath] =
    useInput(""); //프로필
  const [filestate, setFiles] = useState("");
  const [previewstate, setPreviewState] = useState("");

  const [birthYear, onChangeYear, setYear] = useInput(""); //생년
  const [birthMonth, onChangeMonth, setMonth] = useInput(""); //생월
  const [birthdate, onChangeBday, setBday] = useInput(""); //생일
  const [member_birth, setDOB] = useState(""); //생년월일

  /** 비번 & 확인 불일치 에러메세지 */
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onDropHandler = useCallback(
    (files) => {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("파일 읽기 취소");
        reader.onerror = () => console.log("파일 읽기 실패");
        reader.readAsDataURL(file);
        // console.log("readAsDataURL", file); //files
        setMemberImagePath(file.name);
        setFiles(file);
      });
      setPreviewState(
        files.map((file) =>
          Object.assign(previewstate, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [filestate]
    // []
  );

  const onLoadImgFile = (e) => {
    onChangeMemberImagePath(e);
  };
  // console.log("filestate", filestate);

  // preview delete
  const onPreviewDelete = useCallback(
    (preview) => {
      // const deleteFiles = filestate.filter((v) => v.preview !== preview);
      setFiles("");
      // previewstate, setPreviewState
      setPreviewState("");
      setMemberImagePath("");
    },
    [filestate]
  );

  //비번과 확인비번일치확인
  useEffect(() => {
    if (member_pwd.length > 0 && confirm_pwd.length > 0) {
      if (confirm_pwd === member_pwd) {
        setError(false);
        return;
      } else {
        setError(true);
      }
    }
  }, [member_pwd, confirm_pwd]);

  //생일 XXXX-XX-XX형태
  useEffect(() => {
    if (
      birthYear.length === 4 &&
      birthMonth.length === 2 &&
      birthdate.length === 2
    ) {
      const birthYrMth = `${birthYear}-${birthMonth}-${birthdate}`;
      setDOB(birthYrMth);
    } else if (
      birthYear.length === 4 &&
      birthMonth.length === 2 &&
      birthdate.length === 1 //이용자가 04형식으로 입력하지 않았을 시
    ) {
      birthdate.replace("", "0");
      const birthYrMth = `${birthYear}-${birthMonth}-${birthdate}`;
      setDOB(birthYrMth);
    }
  }, [birthYear, birthMonth, birthdate]);

  /** 아이디 정규표현식 :  영문대소문자 포함 6 ~ 20 자리*/
  const idExp = useRef(/^[A-Za-z0-9]{6,20}$/g);

  /** 비번 정규표현식 :  대소문자 특수문자 포함  9 ~ 18*/
  const pwdExp = useRef(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$!%@])[A-Za-z\d@$!%*#?&]{9,18}$/g
  );
  /** 전화번호 정규표현식 : 01 + 016789중 하나로 시작 '-'있어도 되고 없어도 됨*/
  const phoneReg = useRef(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/);

  /** 이메일 정규표현식 : 특수문자, 알파벳, 숫자, -_포함 , @가 반드시 들어가는 형식*/
  const emailReg = useRef(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  );
  const userMsg = useSelector((state) => state.message);

  const onJoinMemberHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (!idExp.current.test(member_id)) {
        alert("아이디 형식이 일치하지 않습니다(영문 또는 숫자포함 6 ~20자)");
        setMemId("");
      } else if (!pwdExp.current.test(member_pwd)) {
        alert(
          "비밀번호 형식이 일치하지 않습니다(대소문자 특수문자($ ! % @) 포함  9 ~ 18자)"
        );
        setPwd("");
        setConfirm("");
      } else if (!phoneReg.current.test(member_phone)) {
        alert("전화번호 형식이 올바르지 않습니다");
        setPhone("");
      } else if (!emailReg.current.test(member_email)) {
        alert("이메일형식이 올바르지 않습니다.");
        setEmail("");
      } else {
        setMemId(member_id);
        setPwd(member_pwd);
        setPhone(member_phone);
        setEmail(member_email);
      }

      dispatch(register(member_id, member_email, member_pwd))
        .then((response) => {
          const data = {
            username: `${member_id}`,
            member_nickname: `${member_nickname}`,
            member_name: `${member_name}`,
            member_gender: `${member_gender}`,
            member_birth: `${member_birth}`,
            member_phone: `${member_phone}`,
            member_joinDate: "",
            member_imagePath: `${member_imagePath}`,
          };
          const blob = new Blob([JSON.stringify(data)], {
            type: "multipart/form-data",
          });

          const submitData = new FormData();
          submitData.append("data", blob);
          submitData.append("username", data.username);
          submitData.append("member_nickname", data.member_nickname);
          submitData.append("member_name", data.member_name);
          submitData.append("member_gender", data.member_gender);
          submitData.append("member_birth", data.member_birth);
          submitData.append("member_phone", data.member_phone);
          submitData.append("member_imagePath", data.member_imagePath);
          submitData.append("profile_image", filestate);
          axios({
            method: "POST",
            // url: process.env.REACT_APP_HOST + "/member/join/new",
            url: "http://localhost:9000/member/join/new",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: submitData,
          })
            .then((response) => {
              console.log("response", response);
            })
            .then(() => {
              dispatch(login(member_id, member_pwd)).then(() => {
                alert("회원가입을 축하드립니다.");
                navigate("/");
              });
            });
        })
        .catch((e) => {
          console.log("userMsg_loginFail", userMsg.message);
          if (userMsg.message.includes("Username is already taken!")) {
            alert("이미 사용중인 아이디입니다.");
            setMemId("");
          } else if (userMsg.message.includes("Email is already in use!")) {
            alert("이미 사용중인 이메일입니다.");
            setEmail("");
          } else {
            console.log(e);
          }
        });
    },
    [
      member_name,
      member_id,
      member_pwd,
      confirm_pwd,
      member_phone,
      member_email,
      member_gender,
      member_phone,
    ]
  );

  return (
    <>
      <TotalWrap>
        <h1>회원가입</h1>
        <div className="formWrap">
          <div>
            <form className="form">
              <div>
                <Dropzone onDrop={onDropHandler}>
                  {({ getRootProps, getInputProps }) => (
                    <>
                      {previewstate.length > 0 ? (
                        <>
                          <div>
                            <div className="previewWrap">
                              <div
                                style={{
                                  transform: "translateY(3em)",
                                }}
                              >
                                <Close
                                  className="removeFile"
                                  onClick={() =>
                                    onPreviewDelete(previewstate[0].preview)
                                  }
                                ></Close>
                              </div>
                              <img
                                onClick={() =>
                                  onPreviewDelete(previewstate[0].preview)
                                }
                                src={previewstate[0].preview}
                                alt="프로필 이미지"
                                className="profileImg"
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="inputBox">
                          <input
                            {...getInputProps()}
                            id="file"
                            type="file"
                            accept="image/*"
                            onChange={onLoadImgFile}
                          />{" "}
                          <AddProfileImg
                            {...getRootProps()}
                            className="hover"
                            style={{
                              width: "24%",
                              height: "6em",
                              margin: "2vh 38%",
                            }}
                          ></AddProfileImg>{" "}
                        </div>
                      )}
                    </>
                  )}
                </Dropzone>
              </div>
              <div className="flexitems fontSize1vw">
                <div className="flexLeft">
                  <div className="flexFormItems">
                    <div className="formLabels">아이디</div>
                    <div className="floatRight">
                      {member_id.length === 0 ? (
                        <WarningMsg>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      ) : (
                        <></>
                      )}
                      <input
                        type="text"
                        name="member_id"
                        required
                        className="fontSize0_5vw"
                        autoSave="false"
                        placeholder="영문 또는 숫자포함 6 ~20자"
                        value={member_id}
                        onChange={onChangeMemId}
                      />
                    </div>
                  </div>
                  <div className="flexFormItems">
                    <div className="formLabels">비밀번호</div>

                    <div className="floatRight">
                      {member_pwd.length === 0 ? (
                        <WarningMsg>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      ) : (
                        <WarningMsg style={{ visibility: "hidden" }}>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      )}
                      <input
                        className="member_pwd fontSize0_5vw"
                        type="password"
                        required
                        maxLength={18}
                        autoComplete="off"
                        value={member_pwd}
                        onChange={onChangePwd}
                        placeholder="대소문자 특수문자($ ! % @) 포함 9 ~ 18"
                      />{" "}
                    </div>
                  </div>
                  <div className="flexFormItems">
                    <div className="formLabels">이름</div>{" "}
                    <div className="floatRight">
                      {member_name.length === 0 ? (
                        <WarningMsg>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      ) : (
                        <WarningMsg style={{ visibility: "hidden" }}>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      )}
                      <input
                        className="member_name fontSize0_5vw"
                        type="text"
                        required
                        value={member_name}
                        onChange={onChangeName}
                        placeholder="이름을 입력해주세요."
                      />{" "}
                    </div>
                  </div>
                  <div className="flexFormItems">
                    <div className="formLabels">이메일 </div>
                    <div className="floatRight">
                      {member_email.length === 0 ? (
                        <WarningMsg>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      ) : (
                        <WarningMsg style={{ visibility: "hidden" }}>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      )}
                      <input
                        type="email"
                        name="member_email"
                        className="email fontSize0_5vw"
                        value={member_email}
                        onChange={onChangeEmail}
                        placeholder="이메일을 입력해주세요."
                        autoComplete="off"
                        required
                      />{" "}
                    </div>
                  </div>
                  <div className="flexFormItems">
                    <div className="formLabels">생년월일</div>{" "}
                    <div className="floatRight">
                      {" "}
                      {birthYear.length === 0 ||
                      birthMonth.length === 0 ||
                      birthdate.length === 0 ? (
                        <WarningMsg>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      ) : (
                        <WarningMsg style={{ visibility: "hidden" }}>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      )}
                      <input
                        type="text"
                        className="inputYr fontSize0_5vw"
                        placeholder="YYYY"
                        value={birthYear}
                        maxLength={4}
                        onChange={onChangeYear}
                      />
                      년
                      <select
                        name="months"
                        className="selectMnth fontSize0_5vw"
                        value={birthMonth}
                        onChange={onChangeMonth}
                      >
                        <option value="">월</option>
                        <option value="01">1</option>
                        <option value="02">2</option>
                        <option value="03">3</option>
                        <option value="04">4</option>
                        <option value="05">5</option>
                        <option value="06">6</option>
                        <option value="07">7</option>
                        <option value="08">8</option>
                        <option value="09">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                      월
                      <input
                        type="text"
                        className="dayInput fontSize0_5vw"
                        placeholder="DD"
                        value={birthdate}
                        maxLength={2}
                        onChange={onChangeBday}
                      />
                      일{" "}
                    </div>
                  </div>
                </div>

                <div className="flexRight">
                  <div className="flexFormItems">
                    <div className="formLabels ">닉네임</div>
                    <div className="floatRight">
                      {member_nickname.length === 0 ? (
                        <WarningMsg>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      ) : (
                        <WarningMsg style={{ visibility: "hidden" }}>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      )}
                      <input
                        type="text"
                        name="member_value"
                        required
                        className="fontSize0_5vw"
                        placeholder="공백없이 지어주세요."
                        onChange={onChangeNickname}
                      />
                    </div>
                  </div>
                  <div className="flexFormItems">
                    <div className="formLabels labelsRight">비밀번호 확인</div>
                    <div className="floatRight">
                      {error ? (
                        <WarningMsg>
                          불일치
                          <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      ) : (
                        <WarningMsg style={{ visibility: "hidden" }}>
                          불일치
                          <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      )}
                      <input
                        className="passwordCheck fontSize0_5vw"
                        type="password"
                        required
                        value={confirm_pwd}
                        onChange={onChangeConfirm}
                        maxLength={18}
                        autoComplete="off"
                        placeholder="비밀번호를 다시 입력해주세요"
                      />
                    </div>
                  </div>
                  <div className="flexFormItems inputWraps">
                    <div className="formLabels ">휴대전화</div>{" "}
                    <div className="floatRight">
                      {member_email.length === 0 ? (
                        <WarningMsg>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      ) : (
                        <WarningMsg style={{ visibility: "hidden" }}>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      )}
                      <input
                        className="phoneNum fontSize0_5vw"
                        type="phoneNum"
                        name="member_phone"
                        required
                        placeholder="휴대전화"
                        maxLength={11}
                        value={member_phone.replace("-", "")}
                        onChange={onChangePh}
                      />
                    </div>
                  </div>
                  <div className="flexFormItems">
                    <div className="formLabels ">성별</div>{" "}
                    <div className="floatRight">
                      {member_gender === "" ? (
                        <WarningMsg>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      ) : (
                        <WarningMsg style={{ visibility: "hidden" }}>
                          필수 <FontAwesomeIcon icon={faExclamationCircle} />
                        </WarningMsg>
                      )}
                      <select
                        name="member_gender"
                        value={member_gender}
                        onChange={onChangeGender}
                        required
                        className="selectSex fontSize0_5vw"
                      >
                        <option value="">성별</option>
                        <option value="남자">남자</option>
                        <option value="여자">여자</option>
                        <option value="선택안함">선택안함</option>
                      </select>{" "}
                    </div>
                  </div>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
        <SubmitBtn onClick={onJoinMemberHandler}>회원가입 하기</SubmitBtn>
      </TotalWrap>
    </>
  );
};
export default SignUpTemplate;
