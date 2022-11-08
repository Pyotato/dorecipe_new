import { Link, useNavigate } from "react-router-dom";

const NoticeList = ({ removePost, state, BtnState }) => {
  const removePostOnclick = () => {
    removePost(state.notice_num);
  };
  const navigate = useNavigate();

  const onNoticeDetailClick = () => {
    navigate(`/notice/detail/${state.notice_num}`);
  };

  return (
    <>
      <li>
        <div className="noticeNo">{state.notice_num}</div>
        {/* <div className="noticeTitle">{state.NoticeTitle}</div> */}
        <div className="noticeTitle" onClick={onNoticeDetailClick}>
          {state.notice_title}
        </div>
        <div className="noticeDate">{state.notice_creDate}</div>
        {/* {user.auth.user.roles.includes("ROLE_ADMIN") && ( */}
        {/* {user.auth.includes("ROLE_ADMIN") && ( */}
        {/* {user.includes("ROLE_ADMIN") && ( */}
        {BtnState && (
          <div className="updateOrDelete">
            <Link
              className="updateList"
              to={`/notice/update/${state.notice_num}`}
            >
              수정
            </Link>
            <span className="deleteList" onClick={removePostOnclick}>
              삭제
            </span>
          </div>
        )}
      </li>
    </>
  );
};
export default NoticeList;
