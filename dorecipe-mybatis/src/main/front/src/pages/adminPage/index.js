// import "../../style/bootstrap.min.css";
import MainLayout from "../../layout/mainLayOut";
import List from "../../components/memberListCp";
import RegistPosts from "../../components/registPostsCp";
import KnowhowPage from "../knowhowPage/knowhowListPage";
import AdminMenuPage from "../../components/adminMenuPage";
import { useState } from "react";

const AdminPostMng = () => {
  // const [navState, setNavState] = useState(0);
  return (
    <>
      <MainLayout>
        {/* <RegistPosts /> */}
        {/* <List /> */}
        {/* <KnowhowPage /> */}
        <AdminMenuPage />
        {/* <AdminMenuPage navState={navState} setNavState={setNavState} /> */}
      </MainLayout>
    </>
  );
};

export default AdminPostMng;
