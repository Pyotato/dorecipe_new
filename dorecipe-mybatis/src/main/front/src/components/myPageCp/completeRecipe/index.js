import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import CompleteList from "./recipeList";

import styled from "styled-components";
import NullRecipe from "../nullRecipeList";
import { useSelector } from "react-redux";

const CompleteRecipeList = () => {
  // 작성한 레시피
  const [recipeState, setRecipeState] = useState([
    {
      recipe_num: 0,
      recipe_title: "",
      recipe_rpath: "",
      recipe_savetype: 0,
      information_level: "",
      information_time: "",
    },
  ]);

  const user = useSelector((auth) => auth);
  const [member_id, setMemberId] = useState();
  const [loadingState, setLoadingState] = useState(true);

  const [recipeLength, setRecipeLength] = useState(); //레시피 삭제 감지
  // useEffect(() => {
  //   setMemberId(user.auth.user.username);
  //   getCompletedRecipe();
  // }, [member_id]);
  useEffect(() => {
    //작성한 레시피 정보
    // console.log("작성한레시피" + member_id);
    // setMemberId(user.auth.user.username);
    // if (member_id !== undefined) {
    //   Axios();
    // }
    if (user.auth.isLoggedIn) {
      setMemberId(user.auth.user.username);
      if (user.auth.user.username !== undefined) {
        Axios();
      }
    }
    //   // }, [member_id, recipeState]);
  }, [recipeLength]);
  // }, [member_id, recipeState.length]);
  // const getCompletedRecipe = useCallback(() => {
  //   axios({
  //     url: "/recipe/recordingType1",
  //     method: "POST",
  //     data: formData,
  //     baseURL: "http://localhost:9000",
  //     // baseURL: process.env.REACT_APP_HOST,
  //   }).then(function (response) {
  //     setRecipeState(response.data);
  //   });
  // }, [member_id, recipeState]);

  // 작성한 레시피 정보 가져오기
  // member_id가 ~인 레시피의 컬럼들을 다 가져와야지!
  const formData = new FormData();
  formData.append("member_id", member_id);

  function Axios() {
    console.log("작성중레시피 가져오니?" + member_id);

    axios({
      url: "/recipe/recordingType1",
      method: "POST",
      data: formData,
      baseURL: "http://localhost:9000",
      // baseURL: process.env.REACT_APP_HOST,
    })
      .then(function (response) {
        setRecipeState(response.data);
        setRecipeLength(response.data.length);
      })
      .then(() => {
        setLoadingState(false);
      });
  }

  return (
    <>
      <div className="container-sm myPage-box3">
        <div>
          <SectionTitle>
            작성한 레시피
            <span className="likeRecipeTotal" style={totalRecipe}>
              {" "}
              총 {recipeState.length}개
            </span>
          </SectionTitle>
          <Scrollable>
            <div>
              {loadingState ? (
                <div>로딩중</div>
              ) : recipeState.length !== 0 ? (
                recipeState.map((e) => (
                  <CompleteList
                    key={e.recipe_num}
                    completedRecipeState={e}
                    recipeLength={recipeLength}
                    setRecipeLength={setRecipeLength}
                  />
                ))
              ) : (
                <NullRecipe />
              )}
            </div>
          </Scrollable>
        </div>
      </div>
    </>
  );
};
export default CompleteRecipeList;
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
  width: 90%;
  margin: 1em auto;

  & > div {
    height: 30em;
    overflow-x: auto;
    margin: 0 auto;
    padding: 1em 0;

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
let totalRecipe = {
  fontSize: "15px",
};
