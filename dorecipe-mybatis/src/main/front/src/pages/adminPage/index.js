import "../../style/bootstrap.min.css";
import MainLayout from "../../layout/mainLayOut";
import List from "../../components/memberListCp";
import RegistPosts from "../../components/registPostsCp";
import KnowhowPage from "../knowhowPage/knowhowListPage";

const AdminPostMng = () => {

  return (
    <>
     <MainLayout>
        <RegistPosts/>
        <List/>
        <KnowhowPage/>
     </MainLayout>
    </>
  );
};


export default AdminPostMng;
