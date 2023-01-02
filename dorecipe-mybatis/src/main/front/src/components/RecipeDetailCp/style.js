import styled from "styled-components";
import { colors, borderRadii } from "@theme/theme";
export const TotalWrap = styled.div`
  width: 100%;

  background-color: ${colors.color_beige_white};
  font-size: 1vw;
  padding-bottom: 9vh;
  & h1 {
    padding-top: 13vh;
    padding-bottom: 4vh;
    text-align: center;
    color: ${colors.color_brown};
  }
  & .categoryWrap {
    font-size: 1vw;
    background-color: ${colors.color_bg_white};
  }

  & .filterWrap {
    background-color: ${colors.color_white};
    display: inline-flex;
    border: 1px solid ${colors.color_black_brown};
    width: 80%;
    min-width: 45em;
    margin-left: 10vw;
  }

  & .filterItems {
    background-color: #c2b196;
    border-right: 1px solid ${colors.color_black_brown};
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 18vw;
    justify-content: space-evenly;
  }
  & .items {
    height: 10%;
  }

  & .totalOptionWrap {
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    gap: 1.5vw;
    padding: 1vh 1vw;
    padding-top: 4vh;
    justify-content: space-around;
  }

  & .flexWrap {
    width: 68vw;
    display: inline-flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }
`;

export const SelectedBtn = styled.button`
  color: ${colors.color_white};
  background-color: ${colors.color_brown};
  width: fit-content;
  padding: 0.5vw;
  border: transparent;
  font-size: 1vw;
  border-radius: ${borderRadii.radius_small};

  &:hover {
    cursor: pointer;
  }
`;

export const DefaultBtn = styled.button`
  background-color: transparent;
  color: ${colors.color_brown};
  min-width: 3em;
  font-size: 1vw;
  max-width: fit-content;
  padding: 0.5em;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
export const SubmitBtnWrap = styled.div`
  & button {
    float: right;
  }
`;

export const SearchResults = styled.div`
  width: 80vw;
  margin: 0 auto;
`;
export const SearchResultFlex = styled.div`
  width: 95%;
  height: 40em;
  margin: 0 auto;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    height: 30%;
    background-color: ${colors.color_milktea_brown};
  }
  ::-webkit-scrollbar-track {
    background-color: ${colors.color_greyish_white};
    border: 1px solid ${colors.color_milktea_brown};
  }
  & .createRecipeLinkWrap {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    height: 20em;
  }
`;

export const StyledLink = styled.div`
  padding-top: 1em;

  color: ${colors.color_gray_red};

  & .pointerCursor:hover {
    cursor: pointer;
  }

  & .createRecipeLink:hover {
    color: ${colors.color_carrot_orange};
  }

  & div {
    margin-top: 1em;
  }
`;
