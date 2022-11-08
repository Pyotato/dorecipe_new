import axios from "axios";
import { useEffect, useState  } from "react";
import "./style.css";

const SearchRecipe = ({state}) =>{

    const [state2, setState2] = useState();


return(
<>
  <div className="dpib width3 bottom2">
    <ul className="">
        <li className="profileWrap">
            <div className="mt-5">
                <a href={`http://localhost:3000/recipe/search/details/${state.recipe_num}`}>
                    <img className="searchRecipeImg"
                         src={state.recipe_rpath} alt="x"/>
                </a>
            </div>
        </li>
        <li>
          <div>
            <h5 className="r_title mt-2">
              {state.recipe_title}
            </h5>
            <span>
              {state.information_level} &nbsp; {state.information_time}
            </span>
          </div>
        </li>
    </ul>
  </div>
</>
)

};
export default SearchRecipe;