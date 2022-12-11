import { useNavigate } from "react-router-dom";

const NoticeList = ({ removePost, state, BtnState }) => {
  const removePostOnclick = () => {
    removePost(state.notice_num);
  };
  const navigate = useNavigate();

  const onNoticeDetailClick = () => {
    navigate(`/notice/detail/${state.notice_num}`);
  };
  const onNoticeUpdateClick = () => {
    navigate(`/notice/update/${state.notice_num}`);
  };

  return (
    <>
      <li>
        <div className="noticeNo">{state.notice_num}</div>

        <div className="noticeTitle" onClick={onNoticeDetailClick}>
          {state.notice_title}
        </div>
        <div className="noticeDate">{state.notice_creDate}</div>
        {BtnState && (
          <div className="updateOrDelete">
            <span
              className="updateList listItem"
              onClick={() => {
                onNoticeUpdateClick();
              }}
            >
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
