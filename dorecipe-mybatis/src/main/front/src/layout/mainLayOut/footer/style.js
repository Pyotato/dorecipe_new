import styled from "styled-components";

// export const Wrapper = styled.div`
//   display: block;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
// `;

export const FooterWrapper = styled.footer`
  display: flex;
  width: 100%;
  height: 15em;
  background-color: #8d3232;
  align-items: center;
  justify-content: center;
  color: #fffdf5;
  margin-top: 6em;
`;
/** 로고이미지 자리 */
export const FooterRight = styled.footer``;
export const FooterLeft = styled.footer`
  & div {
    margin-bottom: 0.5em;
  }

  & div > a {
    text-decoration: none;
    color: #fffdf5;
  }
`;
