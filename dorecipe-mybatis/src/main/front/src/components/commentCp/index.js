// export default CommentCp;
import { useCallback, useEffect, useRef, useState } from "react";
import "./style.css";
import "../../style/bootstrap.min.css";
import axios from "axios";
import { useInput } from "../../hooks/useInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import {} from "../../components/RecipeDetailCp/style";
import styled from "styled-components";

import { useSelector } from "react-redux";

//레시피 상세 페이지 아래에 위치할 코멘트 등록
//코멘트 등록, 삭제
//들어갈 자료 - 멤버아이디,등록시간,코멘트,사진
const CommentCp = () => {
  const [comment_num, onChangeNum, setNum] = useInput("");
  const [comment_content, onChangeContent, setContent] = useInput("");
  const [comment_path, onChangeCommentPath, setPath] = useInput("");

  const [submitState, setSubmitState] = useState(0);
  const [member_id, setMemberId] = useState("");
  const [emptyError, setEmptyError] = useState(null);
  const [error, setError] = useState(null);

  let { recipeId } = useParams();
  let { commentNum } = useParams();
  var Index = 0;

  const navigate = useNavigate();
  const user = useSelector((auth) => auth);

  useEffect(() => {
    console.log("user", user);
  }, []);

  const insertComment = useCallback(
    (e) => {
      e.preventDefault();

      if (user.auth.isLoggedIn) {
        const commentData = {
          recipe_num: recipeId,
          comment_num: Index,
          comment_content: `${comment_content}`, //코멘트내용
          comment_path: `${comment_path.replace(/c:\\fakepath\\/i, "")}`, //이미지 경로

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
        commentFormData.append("comment_image", CommentFiles[0]);
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
            alert("코멘트가 등록되었습니다.");
            commentAxios();
          });
        }
      } else {
        alert("코멘트를 작성하려면 로그인 해주세요 :)");
        navigate("/login");
      }
    },
    [comment_content, comment_path, submitState]
  );

  //파일 files에 넣기
  const [CommentFiles, setFiles] = useState("");
  const onLoadCommentFile = (e) => {
    //이미지명 담기
    onChangeCommentPath(e);
    //파일담기
    const file = e.target.files;
    setFiles(file);
  };
  //업로드할 사진 미리보기

  // 코멘트 리스트 ///////////////////
  const [commentState, setCommentState] = useState([
    {
      recipe_num: recipeId,
      member_id: "",
      comment_num: commentNum,
      comment_content: "",
      comment_path: "",
      comment_creDate: "",
    },
  ]);

  function commentAxios() {
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
      console.log(response.data); //db데이터 찍찍
      setCommentState(response.data);
    });
  }

  useEffect(() => {
    commentAxios();
    console.log("comment+user", user);
  }, []);
  // 코멘트 리스트 끝 ///////////////

  //파일 선택 커스텀
  const imageInput = useRef(); // useRef를 이용해 input태그에 접근
  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const handleImgError = (e) => {
    e.target.scr = "/img/default_img.jpg";
  };

  return (
    <>
      <CommentWrap>
        <div className="commentDiv">
          <div className="cmtTitle">
            <span className="comh3">코멘트 </span>Comment
          </div>
          <hr />
          <div className="cmtForm">
            <textarea
              className="cmtContent"
              rows="3"
              cols="65"
              value={comment_content}
              onChange={onChangeContent}
              name="comment_content"
              id="commentContent"
              placeholder="레시피에 대한 코멘트를 작성할 수 있어요."
            ></textarea>
            <input
              name="comment_path"
              type="file"
              className="commentImg"
              accept="image/*"
              ref={imageInput}
              onChange={onLoadCommentFile}
            />
            <button className="cmtBtn" onClick={onClickImageUpload}>
              코멘트사진
            </button>
            <div className="insertBtn">
              <button
                type="button"
                className="insertCmt"
                onClick={insertComment}
                disabled={error}
              >
                등록
              </button>
            </div>
          </div>
        </div>

        <div className="commentDiv">
          {commentState.map((cmt, index) => {
            if (cmt.comment_path !== "") {
            }

            return (
              <>
                <div className="cmtDiv">
                  <div key={index}>
                    <div className="divLine">
                      <hr />
                    </div>
                    <div className="idDateCon">
                      <span name="member_id" className="memberName">
                        {cmt.member_id}
                      </span>
                      <span name="comment_creDate" className="comDate">
                        {cmt.comment_creDate}
                      </span>
                    </div>
                    {/*<button type="button" className="deleteCmt" onClick={deleteComment}>삭제</button>*/}
                    <span>
                      <div name="comment_content" className="comCont">
                        {cmt.comment_content}
                      </div>
                    </span>
                    {cmt.comment_path !== "" ? (
                      <img
                        className="comImg"
                        src={cmt.comment_path}
                        alt={cmt.comment_path}
                        onError={handleImgError}
                      ></img>
                    ) : null}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </CommentWrap>
    </>
  );
};

const CommentWrap = styled.div`
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
`;

export default CommentCp;
