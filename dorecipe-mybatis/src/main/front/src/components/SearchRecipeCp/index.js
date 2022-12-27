// import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "@theme/theme";
// import "./style.css";

const SearchRecipe = ({ state, search }) => {
  /** 검색어만 주황색으로 강조 */
  const navigate = useNavigate();

  const onClickRecipe = () => {
    navigate(`/recipe/search/details/${state.recipe_num}`);
  };
  const highlightedTitle = () => {
    return (
      <span>
        {state.recipe_title.slice(0, state.recipe_title.indexOf(search))}
        <span className="carrot">{search}</span>
        {state.recipe_title.slice(
          state.recipe_title.indexOf(search) + search.length
        )}
      </span>
    );
  };
  return (
    <>
      <RecipeWrap>
        <div>
          <ItemWrap onClick={onClickRecipe}>
            <div>
              <div>
                <img src={state.recipe_rpath} alt={state.recipe_rpath} />
              </div>
            </div>
            <div className="titleWrap">{highlightedTitle()}</div>
            <div style={{ float: "inline-end" }}>
              <div className="flexBox">
                <div className="infoWrap"> {state.information_level}</div>
                <div className="infoTimeWrap">{state.information_time}</div>
              </div>
            </div>
          </ItemWrap>
        </div>
      </RecipeWrap>
    </>
  );
};
export default SearchRecipe;
const RecipeWrap = styled.div`
  padding: 1em;
  display: inline-flex;
  border-radius: 1vw;
  min-height: 27em;
  background-color: ${colors.color_beige_white};
  margin: 1vw;
`;
const ItemWrap = styled.div`
  cursor: pointer;
  margin: 0;

  & div {
    overflow-y: hidden;
    overflow-x: hidden;
    max-width: 16em;
    max-height: 16em;
  }
  & div img {
    border-radius: 1vw 1vw 0 0;
    width: 16em;
    height: 16em;
  }

  & .titleWrap {
    margin: 3vh 0;
    min-height: 5em;
  }

  & .flexBox {
    display: inline-flex;
    width: 100%;
  }

  & .infoWrap {
    border: 1px solid ${colors.color_black};
    width: 50%;
    border-right: transparent;
    border-radius: 1vw 0 0 1vw;
    text-align: center;
    height: 4vh;
    padding: 0.5vh 1vw;
  }

  & .infoTimeWrap {
    border: 1px solid ${colors.color_black};
    width: 50%;
    height: 4vh;
    /* padding: 1vh; */
    padding: 0.5vh 1vw;
    border-radius: 0 1vw 1vw 0;
    text-align: center;
  }
`;
