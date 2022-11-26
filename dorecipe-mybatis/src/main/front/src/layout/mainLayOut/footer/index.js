import { Link } from "react-router-dom";
// import { Wrapper, FooterWrapper, FooterRight, FooterLeft } from "./style";
import { LogoFooter } from "../../../components/_common/logo";
import styled from "styled-components";
import { colors } from "../../../theme/theme";

const LayOutFooter = () => {
  return (
    <>
      <FooterWrapper>
        <FooterRight>
          <LogoFooter />
        </FooterRight>
        <FooterLeft>
          <div>
            <Link to="/">개인정보처리방침</Link> | <Link to="/">이용약관</Link>
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
          <div>Copyright © 잡솨봐 Inc. All Rights Reserved.</div>
        </FooterLeft>
      </FooterWrapper>
    </>
  );
};
export default LayOutFooter;
const FooterWrapper = styled.footer`
  display: inline-flex;
  width: 100%;
  height: fit-content;
  gap: 3vw;
  /* padding: 2vw 0; */
  padding: 2vw;
  background-color: ${colors.color_milktea_brown};
  align-items: center;
  justify-content: center;
  color: #fffdf5;
  font-family: "mainfont";
  /* margin-top: 6em; */
`;
/** 로고이미지 자리 */
const FooterRight = styled.footer``;
const FooterLeft = styled.footer`
  & div {
    margin-bottom: 0.5em;
  }

  & div > a {
    text-decoration: none;
    color: #fffdf5;
  }
`;
