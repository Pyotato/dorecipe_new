import axios from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "@theme/theme";

const KnowhowList = ({
  removePost,
  state,
  BtnState,
  updateOrCreate,
  setUpdateOrCreateState,
}) => {
  const navigate = useNavigate();
  const removePostOnclick = () => {
    removePost(state.know_num);
  };

  const onClickKnowhowList = () => {
    navigate(`/knowhow/detail/${state.know_num}`);
  };

  const onEditKnowhow = useCallback(() => {
    axios
      .get(`http://localhost:9000/knowhow/detail/${state.know_num}`)
      .then(function (response) {
        setUpdateOrCreateState(response.data);
      })
      .catch((err) => console.log(err));
  }, [state.know_num]);

  return (
    <>
      <ListWrap>
        <div style={{ width: "5%" }} className="noticeNo">
          {state.know_num}
        </div>

        <span
          className="noticeTitle cursorWhenHover"
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
              className="updateList listItem hoverEffect"
              onClick={onEditKnowhow}
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
      </ListWrap>
    </>
  );
};

export default KnowhowList;

const ListWrap = styled.li`
  & .hoverEffect:hover {
    background-color: ${colors.color_carrot_orange};
    cursor: pointer;
  }
  & .cursorWhenHover:hover {
    cursor: pointer;
  }
`;
