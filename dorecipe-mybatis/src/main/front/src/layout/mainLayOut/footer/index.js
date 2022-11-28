import { Link } from "react-router-dom";
import { LogoFooter } from "../../../components/_common/logo";
import styled from "styled-components";
import { colors } from "../../../theme/theme";
import { ReactComponent as Facebook } from "../../../assets/Facebook.svg";
import { ReactComponent as Youtube } from "../../../assets/Youtube.svg";

const LayOutFooter = () => {
  return (
    <>
      <FooterWrapper>
        <LogoFooter />
        <FooterLeft>
          <div>
            {" "}
            <div style={{ float: "right" }}>
              <Facebook className="icons" />
              <Youtube className="icons" />
            </div>
            <Link to="/">개인정보처리방침</Link> | <Link to="/">이용약관</Link>{" "}
          </div>
          <div>
            대표: 표혜민 / Email : hyemin@dorecipe.com / Fax: 02)123-9874
          </div>
          <div>서울 강남구 신사동 123-23 도레시피타워</div>
          <div>문의 전화 (운영시간 평일 : 10:00 ~ 18:00)</div>
          <div>
            (주) 잡솨봐 / 사업자등록번호: 865-75-92614 / 통신 판매 신고
            8392-15-1234/ 도레시피 기업확인 / 사업자정보확인
          </div>
          <div>Copyright © 잡솨봐 Inc. All Rights Reserved. </div>
        </FooterLeft>
      </FooterWrapper>
    </>
  );
};
export default LayOutFooter;

export const FooterWrapper = styled.footer`
  width: 100%;
  height: 40vh;

  padding: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "mainFont";
  font-size: 1vw;

  background-color: ${colors.color_milktea_brown};
  color: ${colors.color_beige_white};
`;

const FooterLeft = styled.footer`
  & div {
    margin-left: 6vh;
    margin-bottom: 1vw;
  }

  & div > a {
    text-decoration: none;
    color: ${colors.color_beige_white};
  }

  & .icons {
    fill: ${colors.color_beige_white};
    height: 12vh;
    width: 12vh;
    /* padding-top: 1vh; */
  }

  & .icons:hover {
    fill: ${colors.color_milky_white};
    cursor: pointer;
  }
`;
