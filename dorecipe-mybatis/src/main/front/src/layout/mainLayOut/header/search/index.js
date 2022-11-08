import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useInput } from "../../../../hooks/useInput";
import styled from "styled-components";
import { MainLogo } from "../../../../components/_common/mainLogo";
import { Link } from "react-router-dom";
const HeaderSearch = () => {
  const [search, onChangeSearch, setSearch] = useInput("");

  return (
    <>
      <SearchWrap>
        <input
          type="search"
          name=""
          value={search}
          onChange={onChangeSearch}
          placeholder="검색하고 싶은 레시피의 키워드를 입력해주세요."
        />
        <a href={`http://localhost:3000/recipe/search/${search}`}>
          <button type="button" className="searchButton">
            <i className="fa-solid fa-magnifying-glass"></i>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </a>
      </SearchWrap>
    </>
  );
};
export default HeaderSearch;
const SearchWrap = styled.div`
  height: 2em;
  display: inline-flex;
  /* width: 100%; */
  & input {
    width: 30em;
    height: 2em;
    border-radius: 1em 0 0 1em;
    border: 1px solid #fffdf5;
    padding-left: 1em;
  }
  & .searchButton {
    width: 2.5em;
    height: 2em;
    background-color: #fffdf5;
    color: #463635;

    border: none;
    border-left: 1px solid #8d3232;
    border-radius: 0em 1em 1em 0;
  }
`;
