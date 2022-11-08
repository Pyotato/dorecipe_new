import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const NavBar = () => {
  const [languageState, setLanguage] = useState("ko");

  return (
    <>
      <NavWrapper>
        <ul>
          <li>
            <Link className="navLinks" to={"/"}>
              메인
            </Link>
          </li>
          <li>
            <Link className="navLinks" to={"/recipes/search"}>
              레시피 상세 검색
            </Link>
          </li>
          <li>
            <Link className="navLinks" to={"/notice/list"}>
              공지사항
            </Link>
          </li>
          <li>
            <Link className="navLinks" to={"/event/list"}>
              이벤트
            </Link>
          </li>
        </ul>
      </NavWrapper>
    </>
  );
};
export default NavBar;

const NavWrapper = styled.div`
  display: block;
  height: 3em;
  width: 100%;
  background-color: #fffdf5;
  margin-bottom: 6em;
  border-bottom: 1px solid ${(props) => props.theme.accentedColor};
  text-decoration: none;
  & ul {
    display: inline-flex;
    width: 100%;
    height: 100%;
    align-items: center;
    text-align: center;
    padding: 0;
  }

  & ul > li {
    width: 100%;
  }
  & ul > li > .navLinks {
    text-decoration: none;
    width: 100%;
    color: #463635;
    font-weight: 700;
  }
  ul > li > .navLinks:hover {
    color: #8d3232;
  }
`;
