import MainLayout from "../../layout/mainLayOut";
import MemberInfoForm from "../../components/myPageCp/memberInfo/index";
import CompleteRecipeList from "../../components/myPageCp/completeRecipe";
import RecordingRecipeList from "../../components/myPageCp/recordingRecipe";
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

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(MyPage);
