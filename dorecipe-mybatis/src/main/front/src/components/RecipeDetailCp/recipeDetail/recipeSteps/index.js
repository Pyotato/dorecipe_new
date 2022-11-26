import styled from "styled-components";
const StepRecipe = ({ detailState }) => {
  return (
    <>
      {" "}
      <RecipeStepWrap>
        <div>
          {detailState.map((e, index) => {
            return (
              <>
                {e.order_explain !== "" ? (
                  <>
                    <TotalWrap>
                      {e.order_path.includes("/undefined") ? (
                        <div>
                          <div
                            // src={e.order_path}
                            style={{ width: "16em", height: "16em" }}
                            alt={e.order_path}
                          />
                        </div>
                      ) : e.order_path.includes("https://recipe") ? (
                        <Img src={e.order_path} alt={e.order_path} />
                      ) : (
                        <Img
                          src={e.order_path.slice(29, e.order_path.length)}
                          alt={e.order_path.slice(29, e.order_path.length)}
                        />
                      )}
                      {/* {e.order_path.includes("/img/recipe/steps") ? (
                        <>
                          <Img
                            src={e.order_path.slice(29, e.order_path.length)}
                            alt={e.order_path.slice(29, e.order_path.length)}
                          />
                        </>
                      ) : e.order_path.includes("https://recipe") ? (
                        <Img src={e.order_path} alt={e.order_path} />
                      ) : (
                        <Img
                          src={e.order_path}
                          style={{ visibility: "hidden" }}
                          alt={e.order_path}
                        />
                      )} */}

                      <div>
                        {" "}
                        <div className="number">{index + 1}</div>
                      </div>
                      <ExplanationWrap>{e.order_explain}</ExplanationWrap>
                    </TotalWrap>{" "}
                  </>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </div>{" "}
      </RecipeStepWrap>
    </>
  );
};
export default StepRecipe;

const Img = styled.img`
  width: 16em;
  max-height: 16em;
  /* min-width: 8em;
  min-height: 8em; */
`;
const RecipeStepWrap = styled.div`
  & > div {
    width: 100%;
    height: 36em;
    overflow-y: auto;
    margin: 0 auto;

    ::-webkit-scrollbar {
      width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
      height: 30%;
      background-color: #463635;
    }
    ::-webkit-scrollbar-track {
      border: 1px solid #463635;
      background-color: #fffdf5;
    }
  }
`;
const TotalWrap = styled.div`
  display: inline-flex;
  gap: 1em;
  margin-bottom: 1em;
  padding: 0 1em;
  overflow-y: auto;
  margin: 0 auto;
  min-height: 3em;
  & .number {
    background-color: #463635;
    width: 2em;
    padding: 0.3em;
    border-radius: 0.6em;
    text-align: center;
    color: #fffdf5;
  }
`;
const ExplanationWrap = styled.div`
  display: inline-block;
`;
