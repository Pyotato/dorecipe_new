import styled from "styled-components";
import { colors } from "@theme/theme";
import { ReactComponent as WarningFilled } from "@assets/WarningFilled.svg";

const StepRecipe = ({ detailState }) => {
  return (
    <>
      {" "}
      <RecipeStepWrap>
        <div>
          {detailState.map((e, index) => {
            if (e.order_path != null || e.order_explain != null) {
              return (
                <>
                  {e.order_explain !== "" ? (
                    <>
                      <TotalWrap style={{ padding: "2vh 1vw" }}>
                        {e.order_path.includes("/undefined") ? (
                          <div>
                            <div className="number">{index + 1}</div>
                            {/* <div
                            style={{
                              width: "16em",
                              height: "30vh",
                              background: "#FAF3E7",
                              borderRadius: "0.5vw",
                            }}
                          />
                          <div
                            style={{
                              transform: " translateY(-9vh) ",
                              textAlign: "center",
                              fontSize: "0.5vw",
                            }}
                          > */}
                            <WarningFilled
                              style={{
                                width: "16vw",
                              }}
                            />
                            <div
                              style={{
                                transform: "translateX(-1vw) translateY(-6vh) ",
                                // textAlign: "center",
                                width: "6vw",
                                margin: "0 auto",
                                fontSize: "0.5vw",
                              }}
                            >
                              이미지가 없습니다
                            </div>
                          </div>
                        ) : // </div>
                        // <div>
                        //   <span className="number">{index + 1}</span>
                        //   <div
                        //     style={{ width: "16em", height: "16em" }}
                        //     alt={e.order_path}
                        //   />
                        //   <WarningFilled />
                        // </div>
                        e.order_path.includes("https://recipe") ? (
                          <>
                            <div>
                              <div className="number">{index + 1}</div>
                              <Img src={e.order_path} alt={e.order_path} />
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <div className="number">{index + 1}</div>
                              <Img
                                src={e.order_path.slice(
                                  e.order_path.lastIndexOf("/img"),
                                  e.order_path.length
                                )}
                                alt={e.order_path.slice(
                                  e.order_path.lastIndexOf("/img"),
                                  e.order_path.length
                                )}
                              />
                            </div>
                          </>
                        )}
                        <ExplanationWrap
                          style={{ height: "100%", width: "100%" }}
                        >
                          {e.order_explain}
                        </ExplanationWrap>
                      </TotalWrap>{" "}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              );
            } else return <></>;
          })}
        </div>{" "}
      </RecipeStepWrap>
    </>
  );
};
export default StepRecipe;

const Img = styled.img`
  width: 16em;
  height: fit-content;
  border-radius: 0.5vw;
`;
const RecipeStepWrap = styled.div`
  & > div {
    width: 99%;
    height: 36em;
    overflow-y: auto;
    margin: 0 auto;
    ::-webkit-scrollbar {
      width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
      height: 30%;
      background-color: ${colors.color_beige_brown};
    }
    ::-webkit-scrollbar-track {
      background-color: ${colors.color_beige_brown};
      border: 1px solid ${colors.color_beige_brown};
      background-color: ${colors.color_milktea_brown};
    }
  }
`;
const TotalWrap = styled.div`
  display: inline-flex;
  /* gap: 1em; */
  width: 100%;
  gap: 1vw;
  margin-bottom: 1em;
  padding: 0 1em;
  overflow-y: auto;
  margin: 0 auto;
  min-height: 3em;
  align-items: center;
  line-height: 2;
  text-align: justify;

  & .number {
    background-color: ${colors.color_beige_white};
    color: ${colors.color_brown};
    width: 3em;
    height: 3em;
    padding: 0.7em;
    border-radius: 0.5vw 0 0 0;
    text-align: center;
    transform: translateY(100%);
    /* transform: translateX(100%) translateY(25%); */
  }
`;
const ExplanationWrap = styled.div`
  display: inline-block;
`;
