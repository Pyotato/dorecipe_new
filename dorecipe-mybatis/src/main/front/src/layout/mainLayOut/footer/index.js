import { Link } from "react-router-dom";
import { Wrapper, FooterWrapper, FooterRight, FooterLeft } from "./style";
import { MainLogo } from "../../../components/_common/mainLogo";
const LayOutFooter = () => {
  return (
    <>
      {/* <Wrapper> */}
      <FooterWrapper>
        <FooterRight>
          <MainLogo />
        </FooterRight>
        <FooterLeft>
          <div>
            <Link to="/">개인정보처리방침</Link> | <Link to="/">이용약관</Link>
          </div>
          <div>
            대표: 표혜민 / Email : hyemin@dorecipe.com / Fax: 02)123-9874
          </div>
          <div>서울 강남구 신사동 123-23 도레타워</div>
          <div>문의 전화 (운영시간 평일 : 10:00 ~ 18:00)</div>
          <div>
            (주) 잡솨봐 / 사업자등록번호: 865-75-92614 / 통신 판매 신고
            8392-15-1234/ 도레기업확인 / 사업자정보확인
          </div>
          <div>Copyright © 잡솨봐 Inc. All Rights Reserved</div>
        </FooterLeft>
      </FooterWrapper>
      {/* </Wrapper> */}
    </>
  );
};
export default LayOutFooter;
