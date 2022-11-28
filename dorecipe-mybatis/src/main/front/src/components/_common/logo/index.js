import styled from "styled-components";
import { colors, fontSizes } from "../../../theme/theme";
import { useNavigate } from "react-router-dom";

export const LogoHeader = () => {
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  };
  return (
    <HeaderLogoWrap onClick={() => onClickLogo()}>
      <img className="logo" src="/img/logo_big.gif" alt="logo"></img>
    </HeaderLogoWrap>
  );
};
export const LogoFooter = () => {
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  };
  return (
    <LogoWrap onClick={() => onClickLogo()}>
      <img className="logo" src="/img/logo.gif" alt="logo"></img>
    </LogoWrap>
  );
};
export const LogoOnLandingPage = () => {
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  };
  return (
    <MainLogoWrap onClick={() => onClickLogo()} className="hover">
      <img className="logo" src="/img/logo.gif" alt="logo"></img>
    </MainLogoWrap>
  );
};

const MainLogoWrap = styled.div`
  & .logo {
    border-radius: 1vw;
    width: 13vw;
    height: 13vw;
  }

  & :hover {
    cursor: pointer;
  }
`;
const LogoWrap = styled.div`
  width: fit-content;

  & .logo {
    border-radius: 1vw;
    width: 20vh;
    height: 20vh;
  }
  & :hover {
    cursor: pointer;
  }
`;
const HeaderLogoWrap = styled.div`
  height: 6.7vh;
  & .logo {
    width: 6.7vh;
    height: 6.7vh;
  }

  & :hover {
    cursor: pointer;
  }
`;
