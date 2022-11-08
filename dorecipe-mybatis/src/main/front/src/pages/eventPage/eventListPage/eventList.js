import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const EventList = ({ removePost, state, BtnState }) => {
  // 현재 년-월-일 구해서 event_finDate와 비교
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  if (month < 10) {
    month = String("0" + month);
  }
  let date = today.getDate();
  let day = String(year + "-" + month + "-" + date);
  //--------------------
  const navigate = useNavigate();

  const removePostOnclick = () => {
    removePost(state.event_num);
  };

  const onClickEventDetail = () => {
    navigate(`/event/detail/${state.event_num}`);
  };

  return (
    <>
      <li>
        <div className="noticeNo">{state.event_num}</div>

        <span className="noticeTitle" onClick={onClickEventDetail}>
          {state.event_title}
        </span>

        <div className="noticeDate">
          {state.event_creDate}~{state.event_finDate}
          {state.event_finDate < day ? (
            <span className="finDate"> [종료]</span>
          ) : null}
        </div>
        {BtnState && (
          <div className="updateOrDelete">
            <Link
              className="updateList"
              to={`/event/update/${state.event_num}`}
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

export default EventList;
