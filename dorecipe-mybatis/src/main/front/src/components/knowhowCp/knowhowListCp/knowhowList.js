import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const KnowhowList = ({ removePost, state, BtnState }) => {
  const navigate = useNavigate();
  const removePostOnclick = () => {
    removePost(state.know_num);
  };

  const onClickKnowhowList = () => {
    navigate(`/knowhow/detail/${state.know_num}`);
  };

  return (
    <>
      <li>
        <div style={{ width: "5%" }} className="noticeNo">
          {state.know_num}
        </div>

        <span
          className="noticeTitle"
          style={{ width: "50%" }}
          onClick={onClickKnowhowList}
        >
          {state.know_title}
        </span>
        <span
          className="noticeTitle"
          style={{ width: "20%" }}
          onClick={onClickKnowhowList}
        >
          {state.know_creDate}
        </span>

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

export default KnowhowList;

const KnowHowListWrap = styled.li`
  & .knowTitle:hover {
    cursor: pointer;
  }
`;
