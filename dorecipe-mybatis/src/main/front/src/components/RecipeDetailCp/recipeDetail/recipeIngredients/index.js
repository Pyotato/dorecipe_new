import styled from "styled-components";
import { ReactComponent as Pin } from "../../../../assets/Pin.svg";
import { colors } from "../../../../theme/theme";

const RecipeIngredients = ({ ingredientState }) => {
  return (
    <>
      <TotalWrap>
        <div className="columnFlex">
          {ingredientState.map((e) => {
            return (
              <>
                <div className="fontPoint5vw">
                  <div>
                    {e.ing_num >= ingredientState.length / 2 && (
                      <div>
                        <div>
                          {e.ing_ingredient.length <= 0 ? (
                            <></>
                          ) : (
                            <div className="flexItems">
                              <Pin className="pin" />
                              <span>{e.ing_ingredient}</span>
                              <span>{e.ing_amount}</span>
                              <BtnWrap>
                                <div>
                                  <a
                                    href={`https://www.coupang.com/np/search?component=&q=${e.ing_ingredient}`}
                                  >
                                    구매
                                  </a>
                                </div>{" "}
                              </BtnWrap>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="columnFlex">
          {ingredientState.map((e) => {
            return (
              <>
                <div className="fontPoint5vw">
                  <div>
                    {e.ing_num < ingredientState.length / 2 && (
                      <div>
                        <div>
                          {e.ing_ingredient.length <= 0 ? (
                            <></>
                          ) : (
                            <div className="flexItems">
                              <Pin className="pin" />
                              <span>{e.ing_ingredient}</span>
                              <span>{e.ing_amount}</span>
                              <BtnWrap>
                                <div>
                                  <a
                                    href={`https://www.coupang.com/np/search?component=&q=${e.ing_ingredient}`}
                                  >
                                    구매
                                  </a>
                                </div>{" "}
                              </BtnWrap>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </TotalWrap>
    </>
  );
};
export default RecipeIngredients;

const TotalWrap = styled.div`
  display: inline-flex;
  width: 90%;
  margin-top: 3vh;
  justify-content: space-between;

  & .columnFlex {
    display: inline-flex;
    width: 100%;
    flex-direction: column;
  }

  & .fontPoint5vw {
    font-size: 0.5vw;
  }

  & .flexItems {
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    height: 4vh;
  }
  & .pin {
    width: 1vw;
  }

  & span {
    width: 33%;
    line-height: 2;
  }
`;
const BtnWrap = styled.div`
  float: right;
  margin-right: 1em;
  border: 1px solid ${colors.color_brown};
  border-radius: 0.5vw;
  padding: 0.7vh 0.5vw;

  & a {
    text-decoration: none;
    color: ${colors.color_brown};
  }

  &:hover {
    background-color: ${colors.color_carrot_orange};
    color: ${colors.color_milktea_brown};
  }
  & a:hover {
    color: ${colors.color_white};
  }
`;
