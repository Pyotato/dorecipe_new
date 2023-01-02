import axios from "axios";
import { useCallback } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import NoticeList from "../../../pages/noticePage/noticeListPage/noticeList";
import { colors } from "../../../theme/theme";
import BasicSpinner from "../../_common/loading";

const NoticeListSection = ({ navState, setNavState, state, setState }) => {
  const user = useSelector((auth) => auth);
  const [BtnState, setBtnState] = useState(user.auth.user);
  const [noticeState, setNoticeState] = useState([
    {
      notice_num: 0,
      notice_title: "",
      notice_content: "",
      notice_creDate: "",
    },
  ]);
  const testAxios = useCallback(() => {
    axios.get("http://localhost:9000/notice/list").then(function (response) {
      setNoticeState(response.data);
    });
  }, [state]);

  const removePost = (notice_num) => {
    const removeState = noticeState.filter(
      (item) => item.notice_num !== notice_num
    );

    axios
      .get(`http://localhost:9000/notice/delete/${notice_num}`)
      .then((data) => {
        console.log(data);
        setNoticeState(removeState);
      });
  };
  // const removePost = useCallback(
  //   (notice_num) => {
  //     const removeState = noticeState.filter(
  //       (item) => item.notice_num !== notice_num
  //     );
  //     setNoticeState(removeState);
  //     axios
  //       .get(`http://localhost:9000/notice/delete/${notice_num}`)
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   },
  //   [noticeState]
  // );

  return (
    <ListWrap>
      <h2>목록</h2>
      {navState === 1 && testAxios()}
      <div className="noticeTableWrap">
        <ul>
          <div className="tableHead" style={{ padding: "0.5em 1em" }}>
            <div className="noticeNo">No.</div>
            <div className="noticeTitle">제목</div>
            <div className="noticeDate">작성일자</div>

            {BtnState && <div className="updateOrDelete">수정 및 삭제</div>}
          </div>
          {noticeState[0].notice_title === "" ? (
            <>
              <>
                <Scrollable>
                  <div
                    style={{
                      padding: "25% 0 ",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <BasicSpinner displayState={"block"} />
                  </div>
                </Scrollable>
              </>
            </>
          ) : (
            <>
              <Scrollable>
                <div style={{ height: "60vh" }}>
                  {noticeState.map((e) => (
                    <NoticeList
                      key={e.notice_num}
                      removePost={removePost}
                      BtnState={BtnState}
                      noticeState={e}
                      state={state}
                      setState={setState}
                      setNoticeState={setNoticeState}
                    />
                  ))}
                </div>
              </Scrollable>
            </>
          )}
        </ul>
      </div>
    </ListWrap>
  );
};
export default NoticeListSection;

const ListWrap = styled.div`
  width: 50%;
  & ul {
    border-bottom: 1px solid ${colors.color_hr_beige};
  }
`;
const Scrollable = styled.section`
  width: 100%;
  margin: 0 auto;

  & > div {
    padding: 0 0.6rem;
    height: 450px;
    overflow-y: auto;
    margin: 0 auto;

    transform: translateX(-1%);
    ::-webkit-scrollbar {
      width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
      height: 30%;
      background-color: ${colors.color_beige_brown};
    }
    ::-webkit-scrollbar-track {
      background-color: ${colors.color_beige_white};
    }
  }
  & > div > li {
    list-style: none;
    display: inline-flex;

    width: 100%;
    align-items: center;
    padding: 1em 1vw;
    justify-content: space-between;
    border-bottom: 1px solid #ad939156;

    &:hover {
      color: ${colors.color_carrot_orange};
    }
  }

  & .listItem {
    border-radius: 0.5vw;
    padding: 0.5vw;
    background-color: ${colors.color_beige_brown};
    border: 1px solid transparent;

    &:hover {
      background-color: ${colors.color_carrot_orange};
      color: ${colors.color_beige_white};
    }
  }
`;
