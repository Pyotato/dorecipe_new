import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import "./style.css";

const SearchRecipe = ({ state, search }) => {
  /** 검색어만 주황색으로 나오도록 */
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
      <div className="dpib width3 bottom2">
        <ul className="">
          <li className="profileWrap">
            <div className="mt-5">
              <a
                href={`http://localhost:3000/recipe/search/details/${state.recipe_num}`}
              >
                {state.recipe_rpath.length <= 0 ? (
                  <Spinner />
                ) : (
                  <img
                    className="searchRecipeImg"
                    src={state.recipe_rpath}
                    alt={state.recipe_rpath}
                  />
                )}
              </a>
            </div>
          </li>
          <li>
            <div>
              <h5 className="r_title mt-2">{highlightedTitle()}</h5>
              <span>
                {state.information_level} &nbsp; {state.information_time}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
export default SearchRecipe;
