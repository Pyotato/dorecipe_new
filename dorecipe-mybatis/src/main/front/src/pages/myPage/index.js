import MainLayout from "@layout/mainLayOut";
import MemberInfoForm from "@myPageCp/memberInfo";
import CompleteRecipeList from "@myPageCp/completeRecipe";
import RecordingRecipeList from "@myPageCp/recordingRecipe";
import { connect, useSelector } from "react-redux";
import LikeRecipeList from "@myPageCp/likeRecipe";
import ReceivedLikesRecipeList from "@myPageCp/receivedLikesRecipe";
import styled from "styled-components";
import { colors } from "@theme/theme";
import { ReactComponent as CompletedRecipes } from "@assets/CompletedRecipes.svg";
import { ReactComponent as GivenHearts } from "@assets/GivenHearts.svg";
import { ReactComponent as ReceivedHearts } from "@assets/ReceivedHearts.svg";
import { ReactComponent as IncompleteRecipes } from "@assets/IncompleteRecipes.svg";
import { ReactComponent as NavTab4 } from "@assets/NavTab4.svg";
import { useState, useMemo } from "react";
import { useEffect } from "react";
import {
  CompleteRecipeState,
  IncompleteRecipeState,
  MyFavouriteRecipeState,
  ReceivedLikesRecipes,
} from "@myPageCp/RecipeStates";

const MyPage = (user) => {
  const currentUser = useSelector((user) => user.auth.user.username);

  const [navTabState, setNavTabState] = useState(0);
  const [showTabState, setShowTabState] = useState(false);
  const [recipeState, setRecipeState] = useState([
    {
      recipe_num: 0,
      recipe_title: "로딩중",
      recipe_rpath: `로딩중`,
      recipe_savetype: 0,
      information_level: "로딩중",
      information_time: "로딩중",
    },
  ]);

  const [loadingState, setLoadingState] = useState(true);

  const [recipeLength, setRecipeLength] = useState(0); //레시피 삭제 감지

  //미완성레시피 삭제 감지
  const [incompleteRecipeState, setIncompleteRecipeState] = useState({
    recipe_num: 0,
    recipe_title: "로딩중",
    recipe_rpath: `로딩중`,
    recipe_savetype: 0,
    information_level: "로딩중",
    information_time: "로딩중",
  });
  const [incompleteRecipeLength, setIncompleteRecipeLength] = useState(0); //미완성레시피 길이
  const [likedRecipeState, setLikeState] = useState([]); //내가 좋아하는 레시피들
  const [likedRecipeStateLength, setRecipeStateLength] = useState([]); //내가 좋아하는 레시피들

  const [receivedLikesRecipes, setReceivedLikesRecipes] = useState([]); //내가 받은 좋아요 레시피들
  //좋아요 받은 레시피 길이
  const [receivedLikesRecipesLength, setReceivedLikesRecipesLength] =
    useState(0);

  //완성한 레시피들 가져오기
  useEffect(() => {
    CompleteRecipeState({
      currentUser,
      setRecipeState,
      setRecipeLength,
      setLoadingState,
      recipeLength,
    });
  }, []);

  //좋아요받은 내 레시피들 가져오기
  useEffect(() => {
    ReceivedLikesRecipes({
      currentUser,
      setReceivedLikesRecipes,
    });
  }, []);

  useEffect(() => {
    IncompleteRecipeState({
      currentUser,
      setIncompleteRecipeState,
      setIncompleteRecipeLength,
      setLoadingState,
      incompleteRecipeState,
      incompleteRecipeLength,
    });
  }, []);

  useMemo(() => {
    ReceivedLikesRecipes({
      currentUser,
      setReceivedLikesRecipes,
      receivedLikesRecipesLength,
      setReceivedLikesRecipesLength,
    });
    console.log("루핑도는 중..");
  }, [recipeLength]);

  //등록했던 레시피를 임시저장으로 바꿀때 리스트 & 개수 리랜더링
  useMemo(() => {
    // useCallback(() => {
    IncompleteRecipeState({
      currentUser,
      setIncompleteRecipeState,
      setIncompleteRecipeLength,
      setLoadingState,
      incompleteRecipeState,
      incompleteRecipeLength,
    });
    console.log("루핑도는 중..");
  }, [recipeLength]);

  useEffect(() => {
    MyFavouriteRecipeState({
      currentUser,
      setLikeState,
      likedRecipeStateLength,
      setRecipeStateLength,
    });
  }, []);

  useEffect(() => {
    ReceivedLikesRecipes({ currentUser, setLikeState });
  }, []);

  useEffect(() => {
    setNavTabState(0);
  }, []);

  useMemo(() => {
    if (navTabState === 0) {
      window.scrollTo({
        top: 0,

        behavior: "smooth",
      });
    } else if (navTabState === 1) {
      window.scrollTo({
        top: 700,

        behavior: "smooth",
      });
    } else if (navTabState === 2) {
      window.scrollTo({
        top: 1400,

        behavior: "smooth",
      });
    } else if (navTabState === 3) {
      window.scrollTo({
        top: 2100,

        behavior: "smooth",
      });
    } else if (navTabState === 4) {
      window.scrollTo({
        top: 2800,

        behavior: "smooth",
      });
    }
  }, [navTabState]);
  return (
    <>
      <MainLayout>
        <MemberInfoForm
          recipeLength={recipeState.length}
          recipeState={recipeState}
          incompleteRecipeState={incompleteRecipeState}
          incompleteRecipeLength={incompleteRecipeState.length}
          likedRecipeState={likedRecipeState}
          likedRecipeStateLength={likedRecipeState.length}
          receivedLikesRecipes={receivedLikesRecipes}
          receivedLikesRecipesLength={receivedLikesRecipes}
        />

        <CompleteRecipeList
          currentUser={currentUser}
          recipeLength={recipeLength}
          recipeState={recipeState}
          incompleteRecipeLength={incompleteRecipeState.length}
          setIncompleteRecipeLength={setIncompleteRecipeLength}
          incompleteRecipeState={incompleteRecipeState}
          setRecipeState={setRecipeState}
          setRecipeLength={setRecipeLength}
        />

        <RecordingRecipeList
          currentUser={currentUser}
          recipeLength={recipeLength}
          recipeState={recipeState}
          setRecipeState={setRecipeState}
          setRecipeLength={setRecipeLength}
          setIncompleteRecipeState={setIncompleteRecipeState}
          incompleteRecipeState={incompleteRecipeState}
          setIncompleteRecipeLength={setIncompleteRecipeLength}
        />

        <BasicFormSection>
          <LikeRecipeList
            likedRecipeState={likedRecipeState}
            setLikeState={setLikeState}
            currentUser={currentUser}
          />
        </BasicFormSection>
        <BasicFormSection>
          <ReceivedLikesRecipeList
            currentUser={currentUser}
            receivedLikesRecipes={receivedLikesRecipes}
            setReceivedLikesRecipesLength={setReceivedLikesRecipesLength}
          />
        </BasicFormSection>
        {!showTabState ? (
          <>
            <NavIcon
              onClick={() => setShowTabState(true)}
              onMouseOver={() => setShowTabState(true)}
            >
              <NavTab4 />
            </NavIcon>
          </>
        ) : (
          <>
            <NavTab onMouseLeave={() => setShowTabState(false)}>
              <div
                className="myInfo accented"
                onClick={() => setNavTabState(0)}
              >
                MY
              </div>
              <div>
                <CompletedRecipes
                  className="accented svgStrokes"
                  onClick={() => setNavTabState(1)}
                />
              </div>
              <div>
                <IncompleteRecipes
                  className="accented svgStrokes"
                  onClick={() => setNavTabState(2)}
                />
              </div>
              <div>
                <ReceivedHearts
                  className="accented svgStrokes"
                  onClick={() => setNavTabState(3)}
                />
              </div>
              <div>
                <GivenHearts
                  className="accented svgStrokes"
                  onClick={() => setNavTabState(4)}
                />
              </div>
            </NavTab>
          </>
        )}
      </MainLayout>
    </>
  );
};

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
const BasicFormSection = styled.div`
  width: 85%;
  margin-top: 12vh;
  margin: 12vh auto;
  border-radius: 2vw;
  padding-bottom: 6vh;
  /* min-height: 82vh; */
  height: fit-content;
  margin-bottom: 16vh;

  background-color: ${colors.color_beige_brown};

  & .marginExtra {
    margin-top: 21vh;
  }

  & .carrot {
    color: ${colors.color_carrot_orange};
  }
  & .accented {
    color: ${colors.color_black_brown};
  }
  & .svgStrokes {
    stroke: ${colors.color_black_brown};
  }
`;
const NavTab = styled.div`
  position: fixed;
  right: 1vw;
  bottom: 2vh;
  padding: 0.5em;
  border-radius: 1em;
  background-color: ${colors.color_milktea_brown};

  .myInfo {
    font-stretch: expanded;
    font-weight: 700;
    text-align: center;
  }
  & div {
    padding: 0.2em 0;
  }

  & .accented:hover {
    color: ${colors.color_beige_tinted_white};
    stroke: ${colors.color_beige_tinted_white};
    cursor: pointer;
  }
  & .accented {
    color: ${colors.color_black_brown};
  }
  & .svgStrokes {
    stroke: ${colors.color_black_brown};
    /* #292D32 */
  }
`;
const NavIcon = styled.div`
  position: fixed;
  right: 1vw;
  bottom: 2vh;
  padding: 0.5em 0.5em 0.2em;
  border-radius: 1em;
  background-color: ${colors.color_milktea_brown};
`;

// export default MyPage;
export default connect(mapStateToProps)(MyPage);
