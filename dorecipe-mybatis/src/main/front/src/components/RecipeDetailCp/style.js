import styled from "styled-components";
export const SelectTotalWrap = styled.div`
  margin: -6em 0 50em 0;
  padding: 1.5em;
  height: fit-content;
  height: 35vh;
  color: #463635;
  & .totalWrap .totalSearch {
    display: inline-flex;
    gap: 0 1em;
    align-items: center;
    flex-wrap: wrap;
  }
  & .totalSearch span {
    width: 7em;
    padding-left: 1em;
    text-align: center;
    font-weight: 700;
  }
  & .selectWrap {
    border-left: 1px solid #463635;
    padding-left: 1em;
    width: 80em;
  }
`;
export const SelectedBtn = styled.button`
  background-color: #463635;
  color: #fffdf5;
  min-width: 3em;
  max-width: fit-content;
  padding: 0.3em;
  border: transparent;
  border-radius: 0.6em;
`;
export const DefaultBtn = styled.button`
  background-color: transparent;
  color: #463635;
  min-width: 3em;
  max-width: fit-content;
  padding: 0.5em;
  border: none;
`;
export const SubmitBtnWrap = styled.div`
  float: right;
  margin-bottom: 3em;
  clear: both;
`;
export const ModalWrap = styled.div`
  background-color: rgba(217, 217, 217, 0.3);
  margin: -6em 0;
  height: 100vh;
`;

export const SearchResults = styled.div`
  height: fit-content;
  clear: both;
`;
export const SearchResultFlex = styled.div`
  width: 100%;
  height: 40em;
  margin: 0 auto;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    height: 30%;
    background-color: #463635;
  }
  ::-webkit-scrollbar-track {
    background-color: #fffdf5;
    border: 1px solid #463635;
  }
  & .createRecipeLinkWrap {
    width: 100%;
    margin: 0 auto;
    /* margin-top: 6em; */
    padding: 6.5em;
    text-align: center;
    height: 20em;
  }
`;

export const StyledLink = styled.div`
  /* cursor: pointer; */
  padding-top: 1em;
  color: ${(props) => props.theme.accentedColor};
  overflow: hidden;
  & :hover {
    color: #8d3232;
  }
  & .icon:hover {
    transition: all ease 1s;
    transform: rotate(360deg);
    padding: 2em;
  }
  & .pointerCursor:hover {
    cursor: pointer;
  }
`;
