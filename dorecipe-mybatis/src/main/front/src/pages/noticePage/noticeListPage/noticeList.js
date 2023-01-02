import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const NoticeList = ({
  removePost,
  noticeState,
  BtnState,
  setNoticeState,
  state,
  setState,
}) => {
  const removePostOnclick = () => {
    removePost(noticeState.notice_num);
  };
  const navigate = useNavigate();

  const onNoticeDetailClick = () => {
    navigate(`/notice/detail/${noticeState.notice_num}`);
  };

  const onUpdateNotice = useCallback(() => {
    setState(noticeState);
  }, [noticeState, noticeState.notice_num]);

  return (
    <>
      <li>
        <div className="noticeNo">{noticeState.notice_num}</div>

        <div className="noticeTitle" onClick={onNoticeDetailClick}>
          {noticeState.notice_title}
        </div>
        <div className="noticeDate">{noticeState.notice_creDate}</div>
        {BtnState && (
          <div className="updateOrDelete">
            <span className="updateList listItem" onClick={onUpdateNotice}>
              수정
            </span>
            <span className="deleteList listItem" onClick={removePostOnclick}>
              삭제
            </span>
          </div>
        )}
      </li>
    </>
  );
};
export default NoticeList;
