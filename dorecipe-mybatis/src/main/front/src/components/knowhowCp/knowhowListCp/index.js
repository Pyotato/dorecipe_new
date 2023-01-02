import "./style.css";
import { useCallback, useEffect, useState } from "react";
import KnowhowList from "./knowhowList";
import axios from "axios";
import styled from "styled-components";
import { useMemo } from "react";
import { colors } from "@theme/theme";
import BasicSpinner from "@commonCp/loading";
import { useSelector } from "react-redux";

const KnowhowListCp = ({
  updateOrCreate,
  setUpdateOrCreateState,
  isLoadingKnowhow,
  setKnowhowLoadingState,
}) => {
  const [state, setState] = useState([
    {
      know_num: 0,
      know_title: "",
      know_content: "",
      know_creDate: "",
      know_path: "",
    },
  ]);

  const user = useSelector((auth) => auth);

  //관리자가 아니라면 버튼이 보이지 않도록
  const [BtnState, setBtnState] = useState(user.auth.user);

  useEffect(() => {
    if (!user.auth.user) {
      setBtnState(false);
      return;
    }
  }, []);

  //언마운트 시 수정에서 등록으로 초기화
  useEffect(() => {
    setKnowhowLoadingState(false);
    return () => {
      setUpdateOrCreateState([]);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:9000/knowhow/list")
      .then(function (response) {
        setState(response.data);
      })
      .catch((err) => console.log("useEffect", err));
  }, []);

  useMemo(() => {
    axios
      .get("http://localhost:9000/knowhow/list")
      .then((res) => {
        setState(res.data);
      })
      // .then(() => setKnowhowLoadingState(false))
      .catch((err) => console.log("useMemo", err));
  }, [state]);

  const removePost = useCallback(
    (know_num) => {
      const removeState = state.filter((item) => item.know_num !== know_num);

      axios
        .get(`http://localhost:9000/knowhow/delete/${know_num}`)
        .then((data) => {
          setState(removeState);
          console.log(data);
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
                <div style={{ width: "45%" }} className="noticeTitle">
                  제목
                </div>
                <div
                  style={{ width: "23%", textAlign: "center" }}
                  className="noticeDate"
                >
                  작성 일자
                </div>
                {BtnState && (
                  <div style={{ width: "20%" }} className="updateOrDelete">
                    수정 및 삭제
                  </div>
                )}
              </div>
              {state[0].know_title === "" ? (
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
              ) : (
                <>
                  <Scrollable>
                    <div>
                      {state.map((e) => (
                        <KnowhowList
                          key={e.know_num}
                          removePost={removePost}
                          state={e}
                          BtnState={BtnState}
                          setState={setState}
                          updateOrCreate={updateOrCreate}
                          setUpdateOrCreateState={setUpdateOrCreateState}
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

export default KnowhowListCp;

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
