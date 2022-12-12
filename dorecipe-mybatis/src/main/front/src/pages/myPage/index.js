import MainLayout from "../../layout/mainLayOut";
import MemberInfoForm from "../../components/myPageCp/memberInfo/index";
import CompleteRecipeList from "../../components/myPageCp/completeRecipe";
import RecordingRecipeList from "../../components/myPageCp/recordingRecipe";
import { connect, useSelector } from "react-redux";

import LikeRecipeList from "../../components/myPageCp/likeRecipe";
import ReceivedLikesRecipeList from "../../components/myPageCp/receivedLikesRecipe";
import styled from "styled-components";
import { colors } from "../../theme/theme";
import { ReactComponent as CompletedRecipes } from "../../assets/CompletedRecipes.svg";
import { ReactComponent as GivenHearts } from "../../assets/GivenHearts.svg";
import { ReactComponent as ReceivedHearts } from "../../assets/ReceivedHearts.svg";
import { ReactComponent as IncompleteRecipes } from "../../assets/IncompleteRecipes.svg";
import { ReactComponent as NavTab4 } from "../../assets/NavTab4.svg";
import { useState, useMemo } from "react";
import { useEffect } from "react";
import {
  CompleteRecipeState,
  IncompleteRecipeState,
} from "../../components/myPageCp/RecipeStates";
import { useCallback } from "react";

const MyPage = (user) => {
  console.log("MyPage", user);

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

  const [incompleteRecipeState, setIncompleteRecipeState] = useState({
    recipe_num: 0,
    recipe_title: "로딩중",
    recipe_rpath: `로딩중`,
    recipe_savetype: 0,
    information_level: "로딩중",
    information_time: "로딩중",
  }); //미완성레시피 삭제 감지
  const [incompleteRecipeLength, setIncompleteRecipeLength] = useState(0); //미완성레시피 삭제 감지
  CompleteRecipeState({
    currentUser,
    setRecipeState,
    setRecipeLength,
    setLoadingState,
    recipeLength,
  });

  IncompleteRecipeState({
    currentUser,
    setIncompleteRecipeState,
    setIncompleteRecipeLength,
    setLoadingState,
    incompleteRecipeState,
    incompleteRecipeLength,
  });

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
          recipeLength={recipeLength}
          incompleteRecipeLength={incompleteRecipeLength}
        />

        <CompleteRecipeList currentUser={currentUser} />

        <RecordingRecipeList currentUser={currentUser} />

        <BasicFormSection>
          <LikeRecipeList currentUser={currentUser} />
        </BasicFormSection>
        <BasicFormSection>
          <ReceivedLikesRecipeList currentUser={currentUser} />
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
