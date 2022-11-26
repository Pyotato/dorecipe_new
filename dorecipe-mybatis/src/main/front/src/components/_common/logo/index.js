import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors, fontSizes } from "../../../theme/theme";
export const LogoHeader = () => {
  return (
    <Link to={"/"}>
      <HeaderLogoWrap>
        <img className="logo" src="/img/logo_big.gif" alt="logo"></img>
      </HeaderLogoWrap>
    </Link>
  );
};
export const LogoFooter = () => {
  return (
    <Link to={"/"}>
      <LogoWrap>
        <img className="logo" src="/img/logo.gif" alt="logo"></img>
      </LogoWrap>
    </Link>
  );
};
export const LogoOnLandingPage = () => {
  return (
    <Link to={"/"}>
      <MainLogoWrap>
        <img className="logo" src="/img/logo.gif" alt="logo"></img>
      </MainLogoWrap>
    </Link>
  );
};
const MainLogoWrap = styled.div`
  width: fit-content;
  & .logo {
    border-radius: 1vw;
    width: 13vw;
    height: 13vw;
  }
`;
const LogoWrap = styled.div`
  width: fit-content;
  margin: 0 auto;
  & .logo {
    width: 13em;
    height: 13em;
  }
`;
const HeaderLogoWrap = styled.div`
  width: fit-content;
  /* background-color: ${colors.color_white}; */
  margin: 0 auto;
  & .logo {
    width: 4vw;
    height: 4vw;
  }
`;
