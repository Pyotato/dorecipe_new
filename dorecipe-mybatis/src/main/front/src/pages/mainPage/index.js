import MainLayout from "../../layout/mainLayOut";

import MainBanner from "../../components/mainPageCp/banner";
import BestRecipe from "../../components/mainPageCp/bestRecipe";
import BestChef from "../../components/mainPageCp/bestChef";
import KnowhowMain from "../../components/mainPageCp/knowhow";
import EditorsChoiceSection from "../../components/mainPageCp/editorsChoice";
import AitemsSection from "../../components/mainPageCp/aiRecomendRecipe";

const MainPage = () => {
  return (
    <>
      <MainLayout>
        <MainBanner />
        <BestRecipe />
        {/* <BestChef /> 쉐프 좋아요 기능 없앰 대신 레시피 누적 좋아요 많은 걸 여기에 표시*/}
        {/* <AitemsSection /> aitems 제외*/}
        <KnowhowMain />
        {/* 레시피 상세 검색 페이지에 등록하기 버튼 추가하기 */}
        <EditorsChoiceSection />
      </MainLayout>
    </>
  );
};
export default MainPage;
