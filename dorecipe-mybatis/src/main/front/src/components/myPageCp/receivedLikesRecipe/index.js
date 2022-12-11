import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import NullRecipe from "../nullRecipeList";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import BasicSpinner from "../../_common/loading";

const ReceivedLikesRecipeList = ({ currentUser }) => {
  // let { memberId } = useParams();

  // 작성중 레시피
  const navigate = useNavigate();
  const [receivedLikesRecipes, setReceivedLikesRecipes] = useState([
    "로딩중", // {
    //   recipe_num: 0,
    //   recipe_title: "",
    //   recipe_rpath: "",
    //   recipe_savetype: 0,
    //   information_level: "",
    //   information_time: "",
    // },
  ]);
  // const currentUser = useSelector((user) => user.auth.user.username);
  useEffect(() => {
    axios
      .get("http://localhost:9000/recipe/getMyRecipesLikes", {
        params: { param1: currentUser.toString() },
      })
      .then((res) => {
        console.log("getMyRecipesLikes", res.data);
        setReceivedLikesRecipes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  }, []);

  return (
    <>
      <div>좋아요를 받은 {currentUser}님의 레시피들</div>
      {receivedLikesRecipes[0] === "로딩중" ? (
        <>
          <BasicSpinner />
        </>
      ) : (
        <>
          {receivedLikesRecipes.map((e) => (
            <>
              <div
                key={e.recipe_num}
                onClick={() => {
                  navigate(`/recipe/search/details/${e.recipe_num}`);
                }}
              >
                <div>{e.recipe_title}</div>
                <div>{e.likes_count}</div>
                <div>{e.recipe_num}</div>
                <div>{e.information_level}</div>
                <div>{e.information_time}</div>
                <div>
                  <img
                    style={{ width: "9em" }}
                    src={e.recipe_rpath}
                    alt={e.recipe_rpath}
                  />
                </div>
              </div>
            </>
          ))}
        </>
      )}
      {/* 좋아요한 레시피 */}
      {/* <div className="container-sm myPage-box2 center">
        <div>
          <SectionTitle>
            좋아요한 레시피
            <span className="likeRecipeTotal"> */}
      {/* <FontAwesomeIcon icon={faHeart} className="heart" />총{" "} */}
      {/* {likeState.length}개
            </span>
          </SectionTitle>
          <Scrollable>
            <div>
              {likeState.length > 1 ? (
                likeState.map((e) => (
                  <LikeRecipeList key={e.recipe_num} likeState={e} />
                ))
              ) : (
                <NullRecipe />
              )}
            </div>
          </Scrollable>
          {
                    likeState.length !== 0
                    ?
                    likeState.map((e) => (
                        <LikeRecipeList
                            likeState={e}
                        />
                    ))
                    :
                    <NullRecipe />
                }
        </div>
      </div> */}
    </>
  );
};

export default ReceivedLikesRecipeList;
const SectionTitle = styled.div`
  background-color: #8d3232;
  display: inline-block;
  width: 90%;
  margin: 1em 3em;
  color: #fffdf5;
  height: 2.4em;
  font-size: 21px;
  font-weight: 700;
  padding: 0.5em 0;
  padding-left: 0.5em;
  text-align: center;
`;

const Scrollable = styled.section`
  width: 100%;
  margin: 1em auto;

  & > div {
    padding: 2rem;
    height: 27em;
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
      background-color: #fffdf5;
      border: 1px solid #463635;
    }
  }
`;
