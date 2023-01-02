import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styled from "styled-components";
import EventListItems from "./eventList.js";
import { colors } from "@theme/theme";
import { useMemo } from "react";
import BasicSpinner from "@commonCp/loading";

const EventList = ({
  isLoadingEvent,
  setEventLoadingState,
  updateOrCreate,
  setUpdateOrCreateState,
}) => {
  const [state, setState] = useState([
    {
      event_num: 0,
      event_title: "",
      event_content: "",
      event_path: "",
      event_creDate: "",
      event_finDate: "",
    },
  ]);
  const user = useSelector((auth) => auth);
  const [BtnState, setBtnState] = useState(user.auth.user);
  useEffect(() => {
    if (!user.auth.user) {
      setBtnState(false);
      return;
    } else {
      console.log("BtnState", user.auth.user.roles.includes("ROLE_ADMIN"));
      setBtnState(user.auth.user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  useMemo(() => {
    axios.get("http://localhost:9000/event/list").then((result) => {
      setState(result.data);
    });
  }, [state]);

  const removePost = useCallback(
    (event_num) => {
      const removeState = state.filter((item) => item.event_num !== event_num);

      axios
        .get(`http://localhost:9000/event/delete/${event_num}`)
        .then(() => {
          setState(removeState);
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    [state]
  );

  return (
    <>
      <div className="paddingNormal" style={{ width: "100%" }}>
        <TotalWrap>
          <div className="eventTableWrap">
            <ul>
              <div className="tableHead">
                <div style={{ width: "5%" }} className="noticeNo">
                  No.
                </div>
                <div style={{ width: "50%" }} className="noticeTitle">
                  제목
                </div>
                <div
                  style={{ width: "22%", textAlign: "center" }}
                  className="noticeDate"
                >
                  참여 기간
                </div>
                {BtnState && (
                  <div style={{ width: "20%" }} className="updateOrDelete">
                    수정 및 삭제
                  </div>
                )}
              </div>
              {state.length <= 1 ? (
                <>
                  <div
                    style={{
                      padding: "25% 0 ",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <BasicSpinner displayState={"block"} />
                  </div>
                </>
              ) : (
                <>
                  <Scrollable>
                    <div>
                      {state.map((e) => (
                        <EventListItems
                          key={e.event_num}
                          isLoadingEvent={isLoadingEvent}
                          setEventLoadingState={setEventLoadingState}
                          updateOrCreate={updateOrCreate}
                          setUpdateOrCreateState={setUpdateOrCreateState}
                          removePost={removePost}
                          BtnState={BtnState}
                          state={e}
                        />
                      ))}
                    </div>
                  </Scrollable>
                </>
              )}
            </ul>
          </div>
        </TotalWrap>
      </div>
    </>
  );
};
export default EventList;

const TotalWrap = styled.div`
  width: 100%;
  & .tableHead {
    justify-content: space-between;
    border-bottom: 1px solid ${colors.color_brown};
    border-top: 1px solid ${colors.color_brown};
    padding: 1vh 1vw;
  }
  & .eventTableWrap {
    border-bottom: 1px solid ${colors.color_brown};
  }
`;
const Scrollable = styled.section`
  width: 100%;
  margin: 0 auto;

  & > div {
    padding: 0 0.6rem;
    width: 102%;
    /* height: 450px; */
    height: 55vh;
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
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 1em 1vw;
    font-size: 1vw;

    border-bottom: 1px solid ${colors.color_beige_brown};

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
