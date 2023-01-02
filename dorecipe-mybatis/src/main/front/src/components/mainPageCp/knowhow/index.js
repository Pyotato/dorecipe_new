import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import BannerLayout from "@commonCp/bannerLayout";

import { SwiperSlide } from "swiper/react";
import { colors } from "@theme/theme";

const KnowhowMain = () => {
  //axios로 노하우 받아와서 출력하기
  const navigate = useNavigate();
  const [state, setState] = useState([
    {
      know_num: 0,
      know_title: "",
      know_content: "",
      know_creDate: "",
      know_path: "",
    },
  ]);

  function testAxios() {
    axios({
      url: "/knowhow/list",
      method: "get",
      data: {
        know_num: "",
        know_title: "",
        know_content: "",
        know_creDate: "",
        know_path: "",
      },
      // baseURL: process.env.REACT_APP_HOST,
      baseURL: "http://localhost:9000",
    }).then(function (response) {
      console.log(response.data);
      setState(response.data);
    });
  }

  useEffect(() => {
    testAxios();
  }, []);

  return (
    <>
      <div>
        <TotalWrap>
          <BannerLayout>
            {state.map((e, index) => {
              return (
                <SwiperSlide key={e.know_num}>
                  <KnowhowWrap
                    onClick={() => {
                      navigate(`knowhow/detail/${e.know_num}`);
                    }}
                  >
                    <KnowhowImg>
                      <KnowhowTitle>
                        <div> {e.know_title}</div>
                      </KnowhowTitle>
                      <img
                        className="bannerimg"
                        src={e.know_path}
                        alt="bannerimg"
                      ></img>
                    </KnowhowImg>
                  </KnowhowWrap>
                </SwiperSlide>
              );
            })}
          </BannerLayout>
        </TotalWrap>
      </div>
    </>
  );
};
export default KnowhowMain;
const TotalWrap = styled.div`
  padding: 1em;
`;

const KnowhowWrap = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 2em 4em;

  text-align: center;
  margin: 0 3vw 6vh;
  & :hover {
    cursor: pointer;
  }
`;

const KnowhowImg = styled.div`
  & > img {
    border-radius: 1vw;
    width: 24vw;
    height: 45vh;
    padding-bottom: 0.5em;
    object-fit: fill;
  }
`;
const KnowhowTitle = styled.div`
  /* width: 24vw; */
  background-color: ${colors.color_milky_white};
  opacity: 90%;
  width: 24vw;
  text-align: center;
  height: 18vh;
  padding: 3vh 3vw;
  transform: translateY(25vh);
  & div {
    opacity: 100%;
    /* width: 20vw; */
  }
`;
