import styled from "styled-components";
import AccountIcon from "./loginIcon";
import { ReactComponent as NavTab } from "@assets/NavTab.svg";
// import { useEffect, useState } from "react";
import { colors } from "@theme/theme";
const LoginCreateRecipeLogo = ({ onToggleTab, tabState }) => {
  return (
    <>
      <LoginCreateRecipeWrapper>
        <LoginWrapper>
          <AccountIcon />
          <NavTab
            className="navTab"
            style={{ width: "1em", marginRight: "1vw" }}
            onClick={onToggleTab}
            onMouseEnter={onToggleTab}
          >
            {" "}
          </NavTab>
        </LoginWrapper>
      </LoginCreateRecipeWrapper>
    </>
  );
};

const LoginCreateRecipeWrapper = styled.div`
  width: fit-content;
  display: inline-flex;
`;
const LoginWrapper = styled.div`
  display: inline-flex;
  /* & .navTab {
    color: ${(tabState) =>
    tabState === 0 ? colors.color_brown : colors.color_milky_white};
  } */
  & .navTab:hover {
    cursor: pointer;
  }
`;

export default LoginCreateRecipeLogo;
