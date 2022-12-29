import axios from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../theme/theme";

const EventListItems = ({
  removePost,
  state,
  BtnState,
  isLoadingEvent,
  setEventLoadingState,
  updateOrCreate,
  setUpdateOrCreateState,
}) => {
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

  const onEditEvent = useCallback(() => {
    axios
      .get(`http://localhost:9000/event/detail/${state.event_num}`)
      .then(function (response) {
        console.log(response.data);
        setUpdateOrCreateState(response.data);
        // setEventLoadingState(true);
      })
      .catch((err) =>
        console.log("event 수정하기 위한 정보 불러오기 실패", err)
      );
  }, [state.event_num]);

  return (
    <>
      <StyledLi>
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
              className="updateList listItem hoverEffect"
              onClick={onEditEvent}
            >
              수정
            </span>
            <span
              className="deleteList listItem hoverEffect"
              onClick={removePostOnclick}
            >
              삭제
            </span>
          </div>
        )}
      </StyledLi>
    </>
  );
};

export default EventListItems;
const StyledLi = styled.li`
  & .hoverEffect:hover {
    background-color: ${colors.color_carrot_orange};
    cursor: pointer;
  }
`;
