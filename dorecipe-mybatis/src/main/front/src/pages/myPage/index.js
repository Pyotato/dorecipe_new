import MainLayout from "../../layout/mainLayOut";
import MemberInfoForm from "../../components/myPageCp/memberInfo/index";
import CompleteRecipeList from "../../components/myPageCp/completeRecipe";
import RecordingRecipeList from "../../components/myPageCp/recordingRecipe";
import LikeRecipeList from "../../components/myPageCp/likeRecipe";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./style.css";

const MyPage = (user) => {
  console.log("MyPage", user);
  return (
    <>
      <MainLayout>
        <MemberInfoForm />
        {/* <LikeRecipeList /> */}
        <CompleteRecipeList />
        <RecordingRecipeList />
      </MainLayout>
    </>
  );
};

// const RecipeWrap = styled.div`
//   display: inline-flex;
//   flex-direction: column;
//   flex-wrap: wrap;
//   margin: 3em 4em;
//   text-align: center;
//   & > Link {
//     text-decoration: none;
//   }
// `;

// const RecipeImg = styled.div`
//   & > img {
//     // width: 15em;
//     width: 300px;
//     height 200px;
//     padding-bottom: 0.5em;
//     object-fit: cover;
//   }
// `;
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(MyPage);
