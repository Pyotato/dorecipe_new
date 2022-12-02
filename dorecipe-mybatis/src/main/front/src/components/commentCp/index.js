// export default CommentCp;
import { useCallback, useEffect, useRef, useState } from "react";
import "./style.css";
import axios from "axios";
import { useInput } from "../../hooks/useInput";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import { ReactComponent as Close } from "../../assets/Close.svg";
import { ReactComponent as Camera } from "../../assets/Camera.svg";

import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";

const CommentCp = () => {
  const [comment_num, onChangeNum, setNum] = useInput("");
  const [comment_content, onChangeContent, setContent] = useInput("");
  const [comment_path, onChangeCommentPath, setPath] = useInput("");

  const [submitState, setSubmitState] = useState(0);
  // const [member_id, setMemberId] = useState("");
  // const [emptyError, setEmptyError] = useState(null);
  const [error, setError] = useState(null);

  let { recipeId } = useParams();

  // var Index = 0;
  const Index = 0;

  const navigate = useNavigate();
  const user = useSelector((auth) => auth);

  const [member_imagePath, onChangeMemberImagePath, setMemberImagePath] =
    useInput(""); //프로필
  const [filestate, setFiles] = useState("");
  const [previewstate, setPreviewState] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState("");
  // 코멘트 리스트 ///////////////////
  const [commentState, setCommentState] = useState([]);

  const [commenterState, setCommenterState] = useState([
    {
      member_imagePath: "",
      member_nickname: "",
    },
  ]);
  const navigateToLogin = () => {
    navigate("/login");
  };
  useEffect(() => {
    // console.log("user", user);
    if (user.auth.isLoggedIn) {
      setCurrentUser(user.auth.user.username);

      if (user.auth.user.roles.includes("ROLE_ADMIN")) {
        setCurrentUserRole("ROLE_ADMIN");
      }
    }
  }, [user]);

  useEffect(() => {
    getCommentList();
  }, []);

  const getCommentList = () => {
    axios({
      url: "http://localhost:9000/comment/list/" + recipeId,
      // url: process.env.REACT_APP_HOST + "/comment/list/" + recipeId,
      method: "get",
      data: {
        recipe_num: "",
        comment_num: "",
        comment_content: "",
        comment_path: "",
        member_id: "",
        comment_creDate: "",
      },
    }).then(function (response) {
      console.log("comment", response.data); //db데이터 찍찍
      console.log("comment", response.data[0].member_id); //db데이터 찍찍
      setCommentState(response.data);
      getMemberProfile(response.data[0].member_id);
    });
  };

  const onDropHandler = useCallback(
    (files) => {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("파일 읽기 취소");
        reader.onerror = () => console.log("파일 읽기 실패");
        reader.readAsDataURL(file);
        console.log("readAsDataURL", file); //files

        setMemberImagePath(file.name);
        setFiles(file);
        setPath(comment_path);
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
  );

  const onLoadImgFile = (e) => {
    onChangeMemberImagePath(e);
  };

  // preview delete
  const onPreviewDelete = useCallback(
    (preview) => {
      setFiles("");
      setPath("");
      setPreviewState("");
      setMemberImagePath("");
    },
    [filestate]
  );

  const deleteComment = useCallback(
    (comment_num) => {
      console.log(recipeId);
      console.log("commentState", commentState);
      const removeState = commentState.filter(
        (item) => item.comment_num !== parseInt(comment_num)
      );

      setCommentState(removeState);
      console.log("removeState", removeState);

      axios
        .get("http://localhost:9000/comment/delete", {
          params: {
            recipe_num: parseInt(recipeId),
            comment_num: parseInt(comment_num),
          },
        })
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    [currentUser, currentUserRole, recipeId, commentState]
  );

  const insertComment = useCallback(
    (e) => {
      e.preventDefault();

      if (user.auth.isLoggedIn) {
        const commentData = {
          recipe_num: recipeId,
          comment_num: Index,
          comment_content: `${comment_content}`, //코멘트내용
          comment_path: `${comment_path}`, //이미지 경로
          member_id: user.auth.user.username,
        };
        console.log("commentData", commentData);

        const commentBlob = new Blob([JSON.stringify(commentData)], {
          type: "application/json",
        });

        const commentFormData = new FormData();
        commentFormData.append("commentData", commentBlob);
        commentFormData.append("recipe_num", commentData.recipe_num);
        commentFormData.append("comment_num", commentData.comment_num);
        commentFormData.append("comment_image", filestate);
        commentFormData.append("comment_content", commentData.comment_content);
        commentFormData.append("comment_path", commentData.comment_path);
        commentFormData.append("member_id", commentData.member_id);

        if (commentData.comment_content === "") {
          alert("코멘트를 입력해 주세요.");
        } else {
          axios({
            method: "POST",
            url: "http://localhost:9000/comment/insert",
            // url: process.env.REACT_APP_HOST + "/comment/insert",
            headers: { "Content-Type": "multipart/form-data" },
            data: commentFormData,
          }).then((response) => {
            console.log(response.data);
            setSubmitState(1);
            setContent("");
            setPath("");
            setFiles("");
            setPath("");
            setPreviewState("");
            setMemberImagePath("");

            alert("코멘트가 등록되었습니다.");

            getCommentList();
          });
        }
      } else {
        alert("코멘트를 작성하려면 로그인 해주세요 :)");
        navigate("/login");
      }
    },
    [comment_content, comment_path, submitState, commentState]
  );

  // function commentAxios() {
  //   axios({
  //     url: "http://localhost:9000/comment/list/" + recipeId,
  //     // url: process.env.REACT_APP_HOST + "/comment/list/" + recipeId,
  //     method: "get",
  //     data: {
  //       recipe_num: "",
  //       comment_num: "",
  //       comment_content: "",
  //       comment_path: "",
  //       member_id: "",
  //       comment_creDate: "",
  //     },
  //   }).then(function (response) {
  //     console.log("comment", response.data); //db데이터 찍찍
  //     console.log("comment", response.data[0].member_id); //db데이터 찍찍
  //     setCommentState(response.data);
  //     getMemberProfile(response.data[0].member_id);
  //   });
  // }

  const getMemberProfile = useCallback((id) => {
    axios
      .get("http://localhost:9000/member/getProfileImgNickName", {
        params: { member_id: id },
      })
      .then(function (response) {
        console.log("getProfileImgNickName", response);
        setCommenterState(response.data);
        console.log("commenterState", commenterState);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    // commentAxios();
    // getCommentList();
    console.log("comment+user", user);
  }, []);
  // 코멘트 리스트 끝 ///////////////

  const handleImgError = (e) => {
    e.target.scr = "/img/default_img.jpg";
  };

  return (
    <>
      <div
        style={{
          width: "70%",

          backgroundColor: "white",
          borderRadius: "0.5vw",

          margin: "0 auto",
          padding: "3vh 0",
          marginBottom: "3vh",
        }}
      >
        <div
          style={{
            backgroundColor: "orange",
            padding: "1vh 1vw",
            width: "6vw",
            fontWeight: "700",
            marginBottom: "3vh",
          }}
        >
          코멘트
        </div>
        <CommentWrap>
          <div className="commentDiv">
            {user.auth.isLoggedIn ? (
              <>
                <div
                  className="cmtForm"
                  style={{
                    display: "inline-flex",
                    gap: "1vw",
                  }}
                >
                  <textarea
                    className="cmtContent"
                    rows="3"
                    cols="65"
                    style={{ width: "21vw" }}
                    value={comment_content}
                    onChange={onChangeContent}
                    name="comment_content"
                    id="commentContent"
                    placeholder="레시피를 보고 나누고 싶은 이야기를 공유해주세요."
                  ></textarea>

                  <Dropzone onDrop={onDropHandler}>
                    {({ getRootProps, getInputProps }) => (
                      <>
                        {previewstate.length > 0 ? (
                          <>
                            <div>
                              <Close
                                className="removeFile"
                                // style={{
                                //   transform: "translateX(-50%) translateY(100%) ",
                                //   position: "absolute",
                                //   top: "34vh",
                                // }}
                                onClick={
                                  () =>
                                    // onPreviewDelete(filestate[0].preview)
                                    onPreviewDelete(previewstate[0].preview)
                                  // previewstate, setPreviewState
                                }
                              ></Close>
                              <img
                                onClick={() =>
                                  onPreviewDelete(previewstate[0].preview)
                                }
                                src={previewstate[0].preview}
                                style={{
                                  // width: "9%",
                                  height: "10vh",
                                  // width: "6vw",
                                  // height: "6vh",
                                  borderRadius: "1vw",
                                  margin: "2vh 45.5%",
                                }}
                                alt="프로필 이미지"
                                className="profileImg"
                              />
                            </div>
                          </>
                        ) : (
                          <div
                            className="inputBox"
                            {...getRootProps()}
                            style={{
                              border: "1px solid black",
                              width: "6vw",
                              borderRadius: "1vw",
                              padding: "1vw",
                              fontSize: "0.5vw",
                            }}
                          >
                            <input
                              {...getInputProps()}
                              id="file"
                              type="file"
                              accept="image/*"
                              onChange={onLoadImgFile}
                            />{" "}
                            <Camera
                              className="hover"
                              style={{
                                width: "3vw",
                              }}
                            ></Camera>{" "}
                            <div>사진 등록</div>
                          </div>
                        )}
                      </>
                    )}
                  </Dropzone>
                  <button
                    type="button"
                    className="insertCmt"
                    onClick={insertComment}
                    disabled={error}
                    style={{ width: "3vw" }}
                  >
                    등록
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavigateTologin onClick={() => navigateToLogin()}>
                  <div> 코멘트는 로그인 후 작성 가능합니다.</div>
                </NavigateTologin>
              </>
            )}
          </div>

          {commentState.length !== 0 ? (
            <div className="commentDiv">
              {commentState.map((cmt, index) => {
                return (
                  <>
                    <div
                      style={{
                        width: "34vw",
                        fontSize: "1vw",
                        display: "inline-flex",
                        gap: "1vw",
                        textAlign: "initial",
                        lineHeight: "1.5",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        // justifyContent: "center",
                        backgroundColor: "#C2B196",
                        padding: "1vw",
                        borderRadius: "1vw",
                        marginBottom: "1vw",
                      }}
                    >
                      {(currentUser === cmt.member_id ||
                        currentUserRole === "ROLE_ADMIN") && (
                        <button
                          type="button"
                          className="deleteCmt"
                          onClick={() => deleteComment(cmt.comment_num)}
                        >
                          삭제{cmt.comment_num}
                        </button>
                      )}
                      {cmt.comment_path !== "" ? (
                        <div key={index} style={{ width: "80%" }}>
                          {/* <div className="idDateCon"> */}
                          <div>
                            {/* <span name="member_id" className="memberName"> */}
                            <span
                              name="member_id"
                              style={{ paddingRight: "1vw" }}
                            >
                              {cmt.member_id}
                            </span>
                            <span name="comment_creDate">
                              {/* <span name="comment_creDate" className="comDate"> */}
                              {cmt.comment_creDate}
                            </span>
                          </div>
                          {/*<button type="button" className="deleteCmt" onClick={deleteComment}>삭제</button>*/}

                          <span>
                            {/* <div name="comment_content" className="comCont"> */}
                            <div name="comment_content">
                              {cmt.comment_content}
                            </div>
                          </span>
                        </div>
                      ) : (
                        <div key={index} style={{ width: "100%" }}>
                          {/* <div className="idDateCon"> */}
                          <div>
                            {/* <span name="member_id" className="memberName"> */}
                            <span
                              name="member_id"
                              style={{ paddingRight: "1vw" }}
                            >
                              {cmt.member_id}
                            </span>
                            <span name="comment_creDate">
                              {/* <span name="comment_creDate" className="comDate"> */}
                              {cmt.comment_creDate}
                            </span>
                          </div>
                          {}
                          {/* <button type="button" className="deleteCmt" onClick={deleteComment}>삭제</button> */}

                          <span>
                            {/* <div name="comment_content" className="comCont"> */}
                            <div name="comment_content">
                              {cmt.comment_content}
                            </div>
                          </span>
                        </div>
                      )}

                      {cmt.comment_path !== "" ? (
                        <img
                          // className="comImg"
                          style={{ width: "4vw", borderRadius: "0.5vw" }}
                          src={cmt.comment_path}
                          alt={cmt.comment_path}
                          onError={handleImgError}
                        ></img>
                      ) : null}
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <>
              {" "}
              <div>아직 코멘트가 없습니다. 코멘트를 달아보세요 :)</div>
            </>
          )}
        </CommentWrap>
      </div>
    </>
  );
};

const CommentWrap = styled.div`
  font-family: "mainFont";
  margin: 0 auto;
  max-width: 40em;
  & .instructionWrap {
    & hr {
      margin: 0.5em 0;
      margin-bottom: 1em;
    }
    & .accented {
      font-size: 1.1em;
      font-weight: 700;
    }
  }
  & div .accented {
    font-size: 1.1em;
    font-weight: 700;
  }
  & div .clickable {
    cursor: pointer;
  }

  & textarea {
    width: 30vw;
    font-size: 1vw;
    font-family: "mainFont";
    padding: 1vw;
  }
`;

const NavigateTologin = styled.div`
  & > div:hover {
    cursor: pointer;
  }
`;
export default CommentCp;
