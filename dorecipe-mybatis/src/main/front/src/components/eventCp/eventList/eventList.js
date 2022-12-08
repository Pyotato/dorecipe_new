import { useNavigate } from "react-router-dom";
// import "./style.css";

const EventListItems = ({ removePost, state, BtnState }) => {
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
        <div style={{ width: "5%" }} className="noticeNo">
          {state.event_num}
        </div>

        <span
          className="noticeTitle"
          style={{ width: "50%" }}
          onClick={onClickEventDetail}
        >
          {state.event_title}
        </span>

        <div
          className="noticeDate"
          style={{ width: "22%", fontSize: "0.5vw", textAlign: "center" }}
        >
          {state.event_finDate < day ? (
            <span className="finDate"> [종료]</span>
          ) : (
            <>
              {state.event_creDate}~{state.event_finDate}
            </>
          )}
        </div>
        {BtnState && (
          <div className="updateOrDelete" style={{ width: "20%" }}>
            <span
              className="updateList listItem"
              onClick={() => navigate(`/event/update/${state.event_num}`)}
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

export default EventListItems;
