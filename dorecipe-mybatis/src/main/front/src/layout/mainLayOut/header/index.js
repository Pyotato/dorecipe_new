import HeaderSearch from "./search";
import { HeaderContent, HeaderWrapper } from "./style";
import NavBar from "./navBar";
import { MainLogo } from "../../../components/_common/mainLogo";
import LoginCreateRecipeLogo from "../../../components/_common/loginCreateRecipeCp";
const MainLayout = () => {
  return (
    <>
      <HeaderWrapper>
        <HeaderContent>
          <MainLogo />
          <HeaderSearch />
          <LoginCreateRecipeLogo />
        </HeaderContent>
      </HeaderWrapper>
      <NavBar />
    </>
  );
};
export default MainLayout;
