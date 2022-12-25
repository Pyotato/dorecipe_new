import MainLayout from "../../layout/mainLayOut";
import RecipeDetailModal from "../../components/RecipeDetailCp/recipeDetail";

import CommentCp from "../../components/commentCp";
import { useEffect } from "react";

const DetailRecipePage = () => {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);
  return (
    <>
      <MainLayout>
        <RecipeDetailModal />
        {/* <CommentCp/> */}
      </MainLayout>
    </>
  );
};
export default DetailRecipePage;
