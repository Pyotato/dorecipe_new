import styled from "styled-components";
import { borderRadii, imgSizes } from "@theme/theme";
import { useNavigate } from "react-router-dom";
import { margins } from "../../../theme/theme";

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
    border-radius: ${borderRadii.radius_medium};
    width: ${imgSizes.img_size_ul};
    height: ${imgSizes.img_size_ul};
  }

  & :hover {
    cursor: pointer;
  }
`;
const LogoWrap = styled.div`
  width: fit-content;
  margin: 0 ${margins.margin_lg};

  & .logo {
    border-radius: ${borderRadii.radius_small};
    width: ${imgSizes.img_size_ul};
    height: ${imgSizes.img_size_ul};
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
