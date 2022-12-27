import HeaderSearch from "./search";
import NavBar from "./navBar";
import styled from "styled-components";
import { colors } from "@theme/theme";
import { LogoHeader } from "@commonCp/logo/index.js";
import LoginCreateRecipeLogo from "@commonCp/loginCreateRecipeCp";
import { useState } from "react";
const MainLayout = () => {
  const [tabState, setTabState] = useState(0);
  const onToggleTab = () => {
    if (tabState === 0) {
      setTabState(1);
    } else {
      setTabState(0);
    }
  };
  return (
    <>
      <HeaderWrapper>
        <LogoHeader />
        <HeaderSearch />
        <LoginCreateRecipeLogo
          tabState={tabState}
          setTabState={setTabState}
          onToggleTab={onToggleTab}
        />
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
  height: 6.7vh;
  font-family: "mainFont";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  overflow-y: hidden;
  overflow-x: hidden;
  z-index: 700;
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;
