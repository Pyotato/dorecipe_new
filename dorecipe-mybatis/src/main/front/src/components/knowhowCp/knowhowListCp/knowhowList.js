import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const KnowhowList = ({ removePost, state }) => {
  const navigate = useNavigate();
  const removePostOnclick = () => {
    removePost(state.know_num);
  };

  const onClickKnowhowList = () => {
    navigate(`/knowhow/detail/${state.know_num}`);
  };

  return (
    <>
      <KnowHowListWrap>
        <div className="knowNo">{state.know_num}</div>
        <div className="knowTitle" onClick={onClickKnowhowList}>
          {state.know_title}
        </div>
        <div className="knowDate">{state.know_creDate}</div>
        <div className="updateOrDelete">
          <Link className="updateList" to={`/knowhow/update/${state.know_num}`}>
            수정
          </Link>
          <span className="deleteList" onClick={removePostOnclick}>
            삭제
          </span>
        </div>
      </KnowHowListWrap>
    </>
  );
};

export default KnowhowList;

const KnowHowListWrap = styled.li`
  & .knowTitle:hover {
    cursor: pointer;
  }
`;
