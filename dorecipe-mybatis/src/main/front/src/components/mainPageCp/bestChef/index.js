import styled from "styled-components";
import { useState } from "react";

import ProfileImg from "../../_common/profileImg";
import "../../_common/bannerLayout/style.css";

const BestChef = () => {
  //axios로 사용자 받아와서 출력하기

  const [state, setState] = useState([
    {
      member_rank: 1,
      member_like: 685,
      member_id: "사용자명1",
      member_imagePath: null,
    },
    {
      member_rank: 2,
      member_like: 509,
      member_id: "사용자명2",
      member_imagePath: null,
    },
    {
      member_rank: 3,
      member_like: 441,
      member_id: "사용자명3",
      member_imagePath: null,
    },
    {
      member_rank: 4,
      member_like: 322,
      member_id: "사용자명4",
      member_imagePath: null,
    },
    {
      member_rank: 5,
      member_like: 200,
      member_id: "사용자명5",
      member_imagePath: null,
    },
  ]);
  for (let i = 0; i < state.length; i++) {
    console.log(state[i].user_rank);
  }
  console.log(state);

  return (
    <>
      <BestRecipeWrap>
        <h3>BEST 쉐프</h3>
        <div>
          <FlexWrap>
            {state.map((e) => {
              return (
                <>
                  {" "}
                  <BestChefWrap key={e.member_rank}>
                    <ChefRank>{e.member_rank}</ChefRank>{" "}
                    {e.member_imagePath === null ? (
                      <ProfileImg />
                    ) : (
                      <ChefImg>
                        <img
                          className="bannerimg"
                          src={e.member_imagePath}
                          alt="bannerimg"
                        />
                      </ChefImg>
                    )}
                    <div className="user_name">{e.member_id}</div>
                  </BestChefWrap>
                </>
              );
            })}
          </FlexWrap>
        </div>
      </BestRecipeWrap>
    </>
  );
};
export default BestChef;

const BestRecipeWrap = styled.div`
  width: 80%;
  margin: 3em auto;
  background-color: #fffdf5;
  padding: 1em;
  & h3 {
    color: #463635;
    font-weight: 700;
  }
  & .user_name {
    color: #463635;
    font-weight: 700;
    padding-top: 0.5em;
  }
`;

const BestChefWrap = styled.div`
  display: inline-flex;
  /* width: 100%; */
  width: 14.5em;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  & > .user_name {
    text-align: center;
  }
`;

const FlexWrap = styled.div`
  width: fit-content;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const ChefImg = styled.div`
  & > img {
    width: 15em;
    padding-bottom: 0.5em;
  }
`;
const ChefRank = styled.div`
  border: 1px solid ${(props) => props.theme.accentedColor};
  display: inline-block;
  padding-top: 0.5em;
  font-size: 1em;
  width: 3em;
  height: 3em;
  color: #fffdf5;
  text-align: center;
  border-radius: 0.6em;
  background-color: #463635;
  transform: translate(-85%, 70%);
  z-index: 100;
  &:hover {
    background-color: #8d3232;
  }
`;
