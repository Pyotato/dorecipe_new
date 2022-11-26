import styled from "styled-components";
import { colors } from "../../../theme/theme";

export const FooterWrapper = styled.footer`
  display: flex;
  width: 100%;
  height: 15em;
  background-color: ${colors.color_milktea_brown};
  align-items: center;
  justify-content: center;
  color: #fffdf5;
  /* margin-top: 6em; */
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
