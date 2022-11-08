import { Link } from "react-router-dom";
import styled from "styled-components";
export const MainLogo = () => {
  return (
    <Link to={"/"}>
      <LogoWrap>
        <img className="logo" src="/img/doRecipeLogo.gif" alt="logo"></img>
      </LogoWrap>
    </Link>
  );
};

const LogoWrap = styled.div`
  width: fit-content;
  margin: 0 auto;
  & .logo {
    width: 13em;
    height: 13em;
  }
`;
