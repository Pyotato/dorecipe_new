import { Link } from "react-router-dom";
import styled from "styled-components";

const LikeList = ({likeState}) => {

    return(
        <>
        {/* 좋아요한 레시피 */}
        <RecipeWrap>
            <li className="card recipe-box center">
                <Link to={`/recipes/search/details/${likeState.recipe_num}`}>
                    <img className="card-img-top card-img-size"
                        src={likeState.recipe_rpath}
                        alt="profileImage" />
                </Link>
                <Link to={`/recipes/search/details/${likeState.recipe_num}`}>
                    {likeState.recipe_title}
                </Link>
                {likeState.information_level}
                {likeState.information_time}
            </li>
        </RecipeWrap>
            {/* <div className="center">
                <div className="card memberInfo">
                    <Link to={`/recipes/search/details/${likeState.recipe_num}`}>
                        <img className="card-img-top card-img-size"
                         src={likeState.recipe_rpath}
                          alt="profileImage" />
                    </Link>
                    <Link to={`/recipes/search/details/${likeState.recipe_num}`}>
                        {likeState.recipe_title}
                    </Link>
                    {likeState.information_level}
                    {likeState.information_time}
                    
                </div>
            </div> */}
        </>
    );
}
export default LikeList;
const RecipeWrap = styled.ul`
    display: inline-block;
    justify-content: flex-start;
    flex-wrap: nowrap;
    // background-color: blue;
`;