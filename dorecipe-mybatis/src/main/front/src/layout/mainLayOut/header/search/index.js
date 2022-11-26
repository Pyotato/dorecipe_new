import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useInput } from "../../../../hooks/useInput";
import styled from "styled-components";
import { MainLogoHeader } from "../../../../components/_common/logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { borderRadii, colors } from "../../../../theme/theme";
const HeaderSearch = () => {
  const [search, onChangeSearch, setSearch] = useInput("");
  const navigate = useNavigate();

  const onEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigate(`/recipe/search/${search}`);
    }
  };

  return (
    <>
      <SearchWrap>
        <div>
          {" "}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="magnifyingGlass"
          />
          <input
            type="search"
            name=""
            value={search}
            onChange={onChangeSearch}
            onKeyPress={onEnterPress}
            placeholder="레시피 검색"
          />
        </div>
      </SearchWrap>
    </>
  );
};
export default HeaderSearch;
const SearchWrap = styled.div`
  height: 5vh;
  width: 100%;
  padding-left: 1vw;
  display: inline-flex;
  align-items: center;

  & .magnifyingGlass {
    padding: 0.5vw;
  }
  & div {
    width: 27vw;
    height: 4vh;
    display: inline-flex;
    align-items: center;
    background-color: ${colors.color_white};
    border-radius: ${borderRadii.radius_small};
  }
  & input {
    font-size: 1vh;
    width: 21vw;
    height: 4vh;
    border: none;
  }
`;
