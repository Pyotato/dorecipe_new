// export default CommentCp;
import { useCallback, useEffect, useMemo, useState } from "react";

import axios from "axios";
import { useInput } from "../../hooks/useInput";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import { ReactComponent as Close } from "../../assets/Close.svg";
import { ReactComponent as Camera } from "../../assets/Camera.svg";
import { ReactComponent as Delete } from "../../assets/Delete.svg";

import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { colors, theme } from "../../theme/theme";

const CommentCp = () => {
  const [comment_content, onChangeContent, setContent] = useInput("");
  const [comment_path, onChangeCommentPath, setPath] = useInput("");

  const [submitState, setSubmitState] = useState(0);

  const [error, setError] = useState(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let { recipeId } = useParams();

  const Index = 0;

  const navigate = useNavigate();
  const user = useSelector((auth) => auth);

  useMemo(() => {
    setWindowWidth(windowWidth);
  }, [windowWidth]);

  const [member_imagePath, onChangeMemberImagePath, setMemberImagePath] =
    useInput("");
  const [filestate, setFiles] = useState("");
  const [previewstate, setPreviewState] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState("");
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

  /** 모든 코멘트를 가져오는 axios함수 */
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
      console.log("comment", response.data);
      console.log("comment", response.data[0].member_id);
      setCommentState(response.data);
      getMemberProfile(response.data[0].member_id);
    });
  };

  /** 코멘트 input 파일을 해당영역에 드롭했을때 */
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

  /** useInput */
  const onLoadImgFile = (e) => {
    onChangeMemberImagePath(e);
  };

  /** preview(미리보기)이미지 삭제 */
  const onPreviewDelete = useCallback(() => {
    setFiles("");
    setPath("");
    setPreviewState("");
    setMemberImagePath("");
  }, [filestate]);

  /** 코멘트 삭제 함수 :
   * admin 권한 + 글 작성자만 삭제 가능
   */
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

  /** 코멘트 등록함수
   * 로그인한 회원만 작성가능
   */
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

  /** 코멘트 작성자 프로필 사진 + 닉네임가져오기 */
  const getMemberProfile = useCallback((id) => {
    axios
      .get("http://localhost:9000/member/getProfileImgNickName", {
        params: { member_id: id },
      })
      .then(function (response) {
        // console.log("getProfileImgNickName", response);
        setCommenterState(response.data);
        // console.log("commenterState", commenterState);
      })
      .catch((e) => console.log(e));
  }, []);

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
                    alignItems: "center",
                    // alignItems: "flex-end",
                    margin: " 0 auto",
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
                            <div style={{ width: "25%", height: "6em" }}>
                              <img
                                onClick={() =>
                                  onPreviewDelete(previewstate[0].preview)
                                }
                                src={previewstate[0].preview}
                                style={{
                                  width: "6em",
                                  borderRadius: "1vw",
                                  // margin: "15% ",
                                  height: "6em",
                                  // margin: "15% 0.5vw",
                                }}
                                alt="프로필 이미지"
                                className="profileImg"
                              />

                              <div
                                onClick={() =>
                                  onPreviewDelete(previewstate[0].preview)
                                }
                                className="deleteImg"
                              >
                                삭제
                              </div>
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
                    style={{
                      width: "3vw",
                      margin: "0",
                      height: "3em",
                      zIndex: "600",
                    }}
                  >
                    등록
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavigateTologin onClick={() => navigateToLogin()}>
                  <div>코멘트는 로그인 후 작성 가능합니다.</div>
                  <div>[ 로그인하러 가기 ]</div>
                </NavigateTologin>
              </>
            )}
          </div>

          {commentState.length !== 0 ? ( //코멘트리스트가 비었으면 없다고 표시
            <div className="scrollable">
              {commentState.map((cmt, index) => {
                return (
                  <>
                    {(currentUser === cmt.member_id || //작성자거나 관리자만 삭제가능
                      currentUserRole === "ROLE_ADMIN") && (
                      <div
                        type="button"
                        className="deleteCommentBtn"
                        style={{
                          transform: "translateY(6vh) translateX(100%)",
                          fontSize: "0.5vw",
                          float: "left",
                          width: "fit-content",
                          textAlign: "right",
                        }}
                        onClick={() => deleteComment(cmt.comment_num)}
                      >
                        <>| 삭제 |</>
                        {/* {windowWidth >= theme.deviceSizes.deviceSizes ? (
                          <>| 삭제 |</>
                        ) : (
                          <>:(</>
                        )} */}
                      </div>
                    )}
                    <div
                      style={{
                        width: "92%",
                        // width: "30vw",
                        fontSize: "1vw",
                        display: "inline-flex",
                        gap: "1vw",
                        textAlign: "initial",
                        lineHeight: "1.5",
                        clear: "left",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        backgroundColor: "#C2B196",
                        padding: "2vw 2vw 2vw 1vw",
                        borderRadius: "1vw",

                        margin: "1vw 4%",
                        // margin: "1vw 1.5vw",
                      }}
                    >
                      {cmt.comment_path !== "" ? ( //이미지가 있으면 80%만 차지하도록
                        <div key={index} style={{ width: "80%" }}>
                          <div>
                            <span
                              name="member_id"
                              style={{ paddingRight: "1vw" }}
                            >
                              {cmt.member_id}
                            </span>
                            <span name="comment_creDate">
                              {cmt.comment_creDate}
                            </span>
                          </div>
                          <span>
                            <div name="comment_content">
                              {cmt.comment_content}
                            </div>
                          </span>
                        </div>
                      ) : (
                        <div key={index} style={{ width: "100%" }}>
                          <div>
                            <span
                              name="member_id"
                              style={{ paddingRight: "1vw" }}
                            >
                              {cmt.member_id}
                            </span>
                            <span name="comment_creDate">
                              {cmt.comment_creDate}
                            </span>
                          </div>
                          <span>
                            <div name="comment_content">
                              {cmt.comment_content}
                            </div>
                          </span>
                        </div>
                      )}
                      {cmt.comment_path !== "" ? (
                        <img
                          className="hoverZoom"
                          style={{ width: "4vw", borderRadius: "0.5vw" }}
                          src={cmt.comment_path}
                          alt={cmt.comment_path}
                        ></img>
                      ) : null}
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <div style={{ marginTop: "3vh" }}>
              아직 코멘트가 없습니다. 코멘트를 달아보세요 :)
            </div>
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

  & textarea {
    width: 30vw;
    font-size: 1vw;
    font-family: "mainFont";
    padding: 1vw;
    resize: none;
    border-radius: 1vw;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  //삭제버튼
  & .deleteCommentBtn {
    width: 3vw;
    z-index: 700;
    color: ${colors.color_beige_white};
  }
  & .deleteCommentBtn:hover {
    color: ${colors.color_brown};
    cursor: pointer;
  }

  & .hoverZoom:hover {
    transform: scaleX(1.5) scaleY(1.5);
  }

  & .deleteImg {
    z-index: 600;
    /* background-color: red; */
    /* position: sticky; */
    top: 0;
    transform: translateY(-300%);
    color: ${colors.color_carrot_orange};
    font-weight: 700;
  }

  & .deleteImg:hover {
    cursor: pointer;
  }
  & .profileImg:hover {
    opacity: 0.2;
    cursor: pointer;
  }
  //삭제버튼
  & .insertCmt {
    width: 3vw;
    z-index: 700;
    color: ${colors.color_beige_white};
    background-color: ${colors.color_carrot_orange};
    border: 1px solid transparent;
    border-radius: 0.5vw;
  }
  & .insertCmt:hover {
    color: ${colors.color_beige_white};
    background-color: ${colors.color_brown};
    cursor: pointer;
  }
`;

const NavigateTologin = styled.div`
  line-height: 2;
  font-size: 1vw;

  & div:hover {
    cursor: pointer;
  }
`;
export default CommentCp;
