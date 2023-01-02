import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useInput } from "@hooks/useInput";
import styled from "styled-components";
// import { MainLogoHeader } from "@components/_common/logo";
import { useNavigate } from "react-router-dom";
import { borderRadii, colors } from "@theme/theme";

import { useMediaQuery } from "react-responsive";
import {
  fontSizes,
  inputHeights,
  inputSizes,
  paddings,
} from "../../../../theme/theme";

const HeaderSearch = () => {
  const [search, onChangeSearch, setSearch] = useInput("");
  const navigate = useNavigate();

  const onPressEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigate(`/recipe/search/${search}`);
    }
  };
  const onClickSearchIcon = (event) => {
    event.preventDefault();
    navigate(`/recipe/search/${search}`);
  };
  const isMobile = useMediaQuery({ query: "(max-width:767px)" });

  return (
    <>
      <SearchWrap>
        <div>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={onClickSearchIcon}
            className="magnifyingGlass hoverEffect"
          />
          {isMobile ? (
            <input
              type="search"
              className="mobileInput"
              value={search}
              onChange={onChangeSearch}
              onKeyDown={onPressEnter}
              placeholder="레시피 검색"
            />
          ) : (
            <input
              type="search"
              value={search}
              onChange={onChangeSearch}
              onKeyDown={onPressEnter}
              placeholder="레시피 검색"
            />
          )}
        </div>
      </SearchWrap>
    </>
  );
};
export default HeaderSearch;
const SearchWrap = styled.div`
  width: 100%;
  padding: 0 ${paddings.padding_base};
  display: inline-flex;
  align-items: center;

  & .magnifyingGlass {
    padding-right: ${paddings.padding_base};
  }
  & div {
    padding: ${paddings.padding_inputs};
    display: inline-flex;
    align-items: center;
    height: ${inputHeights.inputSize_xTiny};
    background-color: ${colors.color_white};
    border-radius: ${borderRadii.radius_small};
  }
  & input {
    padding: ${paddings.padding_inputs};
    width: ${inputSizes.inputSize_xxlTitleSize};
    border: none;
  }

  & .mobileInput {
    font-size: ${fontSizes.fontSize_xTiny};
    width: ${inputSizes.inputSize_xxl};
  }
`;
