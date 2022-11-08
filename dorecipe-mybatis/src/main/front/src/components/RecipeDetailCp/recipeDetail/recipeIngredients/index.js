import styled from "styled-components";
import { SmallBtn } from "../../../_common/buttons";
const RecipeIngredients = ({ ingredientState }) => {
  return (
    <>
      {" "}
      {ingredientState.map((e) => {
        return (
          <>
            <TotalWrap>
              <div className="innerWrap">
                <span className="ingreWrap">
                  <span>{e.ing_ingredient}</span>
                  <span>{e.ing_amount}</span>
                </span>
                <BtnWrap>
                  <SmallBtn>
                    <a
                      className="links"
                      href={`https://www.coupang.com/np/search?component=&q=${e.ing_ingredient}`}
                    >
                      구매
                    </a>
                  </SmallBtn>{" "}
                </BtnWrap>
              </div>
            </TotalWrap>
          </>
        );
      })}
    </>
  );
};
export default RecipeIngredients;

const TotalWrap = styled.div`
  display: inline-flex;
  gap: 1em;
  width: 20em;
  flex-wrap: nowrap;
  margin: 0.2em 0;
  & .innerWrap {
    width: 100%;
  }

  & SmallBtn:hover {
    text-decoration: none;
    color: #fffdf5;
    clear: both;
    float: right;
  }
  & .links {
    text-decoration: none;
    color: #463635;
  }
  & .links:hover {
    text-decoration: none;
    color: #fffdf5;
  }
  & div span {
    width: fit-content;
    margin-right: 1em;
  }
`;
const BtnWrap = styled.div`
  float: right;
  margin-right: 1em;
`;
