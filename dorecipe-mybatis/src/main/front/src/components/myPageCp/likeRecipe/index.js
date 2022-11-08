import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import NullRecipe from "../nullRecipeList";

const LikeRecipeList = () => {
  let { memberId } = useParams();

  // 작성중 레시피
  const [likeState, setLikeState] = useState([
    {
      recipe_num: 0,
      recipe_title: "",
      recipe_rpath: "",
      recipe_savetype: 0,
      information_level: "",
      information_time: "",
    },
  ]);

  function Axios() {
    axios({
      url: "member/info/like/" + memberId,
      method: "get",
      data: {
        recipe_num: 0,
        recipe_title: "",
        recipe_rpath: "",
        recipe_savetype: 0,
        information_level: "",
        information_time: "",
      },
      baseURL: "http://localhost:9000",
      // baseURL: process.env.REACT_APP_HOST,
    }).then(function (response) {
      console.log(response.data);
      setLikeState(response.data);
    });
  }

  useEffect(() => {
    // Axios();
  }, []);

  return (
    <>
      {/* 좋아요한 레시피 */}
      <div className="container-sm myPage-box2 center">
        <div>
          <SectionTitle>
            좋아요한 레시피
            <span className="likeRecipeTotal">
              {/* <FontAwesomeIcon icon={faHeart} className="heart" /> */}총{" "}
              {likeState.length}개
            </span>
          </SectionTitle>
          <Scrollable>
            <div>
              {likeState.length !== 0 ? (
                likeState.map((e) => (
                  <LikeRecipeList key={e.recipe_num} likeState={e} />
                ))
              ) : (
                <NullRecipe />
              )}
            </div>
          </Scrollable>
          {/* {
                    likeState.length !== 0
                    ?
                    likeState.map((e) => (
                        <LikeRecipeList
                            likeState={e}
                        />
                    ))
                    :
                    <NullRecipe />
                } */}
        </div>
      </div>
    </>
  );
};

export default LikeRecipeList;
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
