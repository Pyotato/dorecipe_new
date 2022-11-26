import HeaderSearch from "./search";
import NavBar from "./navBar";
import styled from "styled-components";
import { colors } from "../../../theme/theme";
import { LogoHeader } from "../../../components/_common/logo/index.js";
import LoginCreateRecipeLogo from "../../../components/_common/loginCreateRecipeCp";
import { useEffect, useState } from "react";
const MainLayout = () => {
  const [tabState, setTabState] = useState(0);
  const onToggleTab = () => {
    if (tabState === 0) {
      setTabState(1);
      // setTabColor("#554543");
    } else {
      setTabState(0);
      // setTabColor("#FAF3E7");
    }
  };
  return (
    <>
      <HeaderWrapper>
        <HeaderContent>
          <LogoHeader />
          <HeaderSearch />
          <LoginCreateRecipeLogo
            tabState={tabState}
            // tabColor={tabColor}

            setTabState={setTabState}
            onToggleTab={onToggleTab}
          />
        </HeaderContent>
      </HeaderWrapper>
      <NavBar
        tabState={tabState}
        setTabState={setTabState}
        onToggleTab={onToggleTab}
      />
    </>
  );
};
export default MainLayout;

const HeaderWrapper = styled.header`
  background-color: ${colors.color_milktea_brown};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 700;
`;
const HeaderContent = styled.header`
  width: 100%;
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
