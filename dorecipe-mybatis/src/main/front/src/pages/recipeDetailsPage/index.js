import MainLayout from "@layout/mainLayOut";
import RecipeDetailModal from "@RecipeDetailCp/recipeDetail";

// import CommentCp from "../../components/commentCp";

const DetailRecipePage = () => {
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
