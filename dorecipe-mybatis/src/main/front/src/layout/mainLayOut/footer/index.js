import { Link } from "react-router-dom";
import { LogoFooter } from "../../../components/_common/logo";
import styled from "styled-components";
import {
  colors,
  deviceSizes,
  fontSizes,
  imgSizes,
  margins,
  paddings,
} from "../../../theme/theme";
import { ReactComponent as AdminEmail } from "../../../assets/AdminEmail.svg";
import { ReactComponent as AdminPhone } from "../../../assets/AdminPhone.svg";
import { ReactComponent as Location } from "../../../assets/Location.svg";
import { useMediaQuery } from "react-responsive";

const LayOutFooter = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1824px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  // const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const isMobile = useMediaQuery({ query: "(max-width:767px)" });

  return (
    <>
      <FooterWrapper>
        {isMobile ? <></> : <LogoFooter />}

        {isMobile ? (
          <FooterLeft className="isMobileXsFont">
            <div>
              <Link to="/">개인정보처리방침</Link> |{" "}
              <Link to="/">이용약관</Link> | 도레시피 기업확인 | 사업자정보확인
            </div>
            <div>대표: 표혜민 (주) 잡솨봐</div>

            <div>
              사업자등록번호: 865-75-92614 | 통신 판매 신고 8392-15-1234
            </div>
            <div>Copyright © 잡솨봐 Inc. All Rights Reserved. </div>
          </FooterLeft>
        ) : (
          <FooterLeft>
            <div>
              <Link to="/">개인정보처리방침</Link> |{" "}
              <Link to="/">이용약관</Link> | 도레시피 기업확인 | 사업자정보확인
            </div>
            <div>대표: 표혜민</div>
            <div>(주) 잡솨봐</div>
            <div>
              사업자등록번호: 865-75-92614 | 통신 판매 신고 8392-15-1234
            </div>
            <div>Copyright © 잡솨봐 Inc. All Rights Reserved. </div>
          </FooterLeft>
        )}
        {isMobile ? (
          <div className="contactsWrap isMobile">
            <div className="flexWrap">
              <div>
                <AdminPhone className="icons hoverEffect" />
              </div>
              <div>
                <div>010-1234-1234</div>
                <div>(운영시간 평일 : 10:00 ~ 18:00)</div>
              </div>
            </div>
            <div className="flexWrap marginTopBottomMobile">
              <div>
                <AdminEmail className="icons hoverEffect" />
              </div>
              <div>
                <div>hyemin@dorecipe.com</div>
                <div>Fax: 02)123-9874</div>
              </div>
            </div>
            <div className="flexWrap">
              <div>
                <Location className="icons hoverEffect" />
              </div>
              <div>서울 강남구 신사동 123-23 도레시피타워</div>
            </div>
          </div>
        ) : (
          <div className="contactsWrap">
            <div className="flexWrap">
              <div>
                <AdminPhone className="icons hoverEffect" />
              </div>
              <div>
                <div>010-1234-1234</div>
                <div>(운영시간 평일 : 10:00 ~ 18:00)</div>
              </div>
            </div>
            <div className="flexWrap">
              <div>
                <AdminEmail className="icons marginTopBottom hoverEffect" />
              </div>
              <div>
                <div>hyemin@dorecipe.com</div>
                <div>Fax: 02)123-9874</div>
              </div>
            </div>
            <div className="flexWrap">
              <div>
                <Location className="icons hoverEffect" />
              </div>
              <div>서울 강남구 신사동 123-23 도레시피타워</div>
            </div>
          </div>
        )}
      </FooterWrapper>
    </>
  );
};
export default LayOutFooter;

export const FooterWrapper = styled.footer`
  width: 100%;
  padding: ${paddings.padding_xxxl};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  gap: ${margins.margin_lg};
  font-size: ${fontSizes.fontSize_base};

  & .marginTopBottom {
    margin: ${margins.margin_base} 0;
  }
  & .marginTopBottomMobile {
    margin: ${margins.margin_xl} 0;
  }
  & .isMobile {
    font-size: ${fontSizes.fontSize_xxTiny};
    width: 50%;
    line-height: 2;
  }

  & .isMobileXsFont {
    font-size: ${fontSizes.fontSize_xxxTiny};
    width: 50%;
    line-height: 2;
  }

  background-color: ${colors.color_milktea_brown};
  color: ${colors.color_beige_white};

  & .icons {
    height: 4em;
    display: inline-block;
    width: 6em;
  }

  & .flexWrap {
    width: 100%;
    display: inline-flex;
    align-items: center;
    gap: 1em;
  }

  & .contactsWrap {
    width: 50%;
  }

  & .hoverEffect:hover {
    cursor: pointer;

    stroke: ${colors.color_carrot_orange};
  }
`;

const FooterLeft = styled.footer`
  width: 50%;

  & div {
    margin-bottom: 1vw;
  }

  & div > a {
    text-decoration: none;
    color: ${colors.color_beige_white};
  }
`;
