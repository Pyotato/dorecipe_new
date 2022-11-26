import MainLayout from "../../layout/mainLayOut";

import MainBanner from "../../components/mainPageCp/banner";
import BestRecipe from "../../components/mainPageCp/bestRecipe";
import KnowhowMain from "../../components/mainPageCp/knowhow";
import EditorsChoiceSection from "../../components/mainPageCp/editorsChoice";

import { ReactComponent as MusicNote } from "../../assets/MusicNote.svg";
import { ReactComponent as LandingImg3 } from "../../assets/LandingImg3.svg";
import { ReactComponent as ForkSpoonKnife } from "../../assets/ForkSpoonKnife.svg";
import { ReactComponent as LandingImg4 } from "../../assets/LandingImg4.svg";
import { ReactComponent as ArrowRight } from "../../assets/ArrowRight.svg";
import { ReactComponent as LandingShape1 } from "../../assets/LandingShape1.svg";
import { ReactComponent as LandingShape2 } from "../../assets/LandingShape2.svg";

import { LogoOnLandingPage } from "../../components/_common/logo";
import HeaderSearch from "../../layout/mainLayOut/header/search";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";

const MainPage = () => {
  const navigate = useNavigate();
  const [scrollState, setScrollState] = useState(0);
  const user = useSelector((auth) => auth);
  const [userState, setUserState] = useState(user);

  // const onScrollToLocation = () => {
  //   alert(":)");
  // };

  function myFunction() {
    if (document.documentElement.scrollTop < 60) {
      console.log("1");
      setScrollState(1);
    } else if (
      // document.body.scrollTop > 350
      // ||
      document.documentElement.scrollTop >= 60 &&
      document.documentElement.scrollTop < 410
      // ||
      // document.documentElement.scrollTop > 700 ||
      // document.documentElement.scrollTop > 1050
      // document.documentElement.scrollTop > 300 &&
      // document.documentElement.scrollTop < 600
    ) {
      console.log("2");
      setScrollState(2);
    } else if (
      document.documentElement.scrollTop >= 410 &&
      document.documentElement.scrollTop < 620
    ) {
      console.log("3");
      setScrollState(3);
    } else if (
      document.documentElement.scrollTop >= 620 &&
      document.documentElement.scrollTop < 760
    ) {
      console.log("4");
      setScrollState(4);
    } else if (
      document.documentElement.scrollTop >= 760 &&
      document.documentElement.scrollTop < 2200
    ) {
      console.log("5");
      setScrollState(5);
    } else if (
      document.documentElement.scrollTop >= 2200 &&
      document.documentElement.scrollTop < 2550
    ) {
      console.log("6");
      setScrollState(6);
    } else if (
      document.documentElement.scrollTop >= 2550 &&
      document.documentElement.scrollTop < 3200
    ) {
      console.log("7");
      setScrollState(7);
    } else if (document.documentElement.scrollTop >= 3200) {
      console.log("8");
      setScrollState(8);
    }
  }

  window.onscroll = function () {
    myFunction();
  };

  // function myFunction() {
  //   if (document.documentElement.scrollTop < 400) {
  //     console.log("1");
  //     setScrollState(1);
  //   } else if (
  //     // document.body.scrollTop > 350
  //     // ||
  //     document.documentElement.scrollTop >= 400 &&
  //     document.documentElement.scrollTop < 800
  //     // ||
  //     // document.documentElement.scrollTop > 700 ||
  //     // document.documentElement.scrollTop > 1050
  //     // document.documentElement.scrollTop > 300 &&
  //     // document.documentElement.scrollTop < 600
  //   ) {
  //     console.log("2");
  //     setScrollState(2);
  //   } else if (
  //     document.documentElement.scrollTop >= 1440 &&
  //     document.documentElement.scrollTop < 2160
  //   ) {
  //     console.log("3");
  //     setScrollState(3);
  //   } else if (
  //     document.documentElement.scrollTop >= 1400 &&
  //     document.documentElement.scrollTop < 1750
  //   ) {
  //     console.log("4");
  //     setScrollState(4);
  //   } else if (
  //     document.documentElement.scrollTop >= 1750 &&
  //     document.documentElement.scrollTop < 2200
  //   ) {
  //     console.log("5");
  //     setScrollState(5);
  //   } else if (
  //     document.documentElement.scrollTop >= 2200 &&
  //     document.documentElement.scrollTop < 2550
  //   ) {
  //     console.log("6");
  //     setScrollState(6);
  //   }
  // }

  return (
    <>
      <MainLayout>
        <div
          style={{
            backgroundColor: "#FAF3E7",
            width: "100%",
            height: "100vh",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <LogoOnLandingPage />
            <div
              style={{
                margin: "5vh 0",
                fontSize: "2vh",
                display: "inline-flex",
                width: "22vw",
                justifyContent: "space-around",
              }}
              className="fonts"
            >
              |{" "}
              <span
                onClick={() => navigate("/recipes/search")}
                className="fonts"
              >
                레시피 상세 검색
              </span>{" "}
              |{" "}
              <span onClick={() => navigate("/notice/list")} className="fonts">
                공지사항
              </span>{" "}
              |{" "}
              <span onClick={() => navigate("/event/list")} className="fonts">
                이벤트
              </span>{" "}
              |{" "}
            </div>
            <div>
              <HeaderSearch />
            </div>
          </div>
          <div>
            <img
              src="/img/landingImg1.png"
              style={{ width: "50vw", height: "100vh" }}
              alt="음식이미지1"
            />
          </div>
        </div>
        {/* section1 끝*/}

        <div
          style={{ backgroundColor: "#FEFDF8", width: "100", height: "100vh" }}
        >
          {" "}
          <div
            style={{
              backgroundColor: "#ECE5D3",
              width: "100",
              // marginBottom: "50vh",
              position: "absolute",
              top: "150%",
              transform: "translateY(-50%)",
              left: "0",
              right: "0",
              height: "36vh",
            }}
          >
            <div
              style={{
                zIndex: "720",
                width: "55vw",
                fontSize: "1.5vw",
                transform: "translateX(4vw) translateY(8vh)",
              }}
            >
              <div className="fonts">나만 알고 있는</div>
              <div className="fonts">집밥 레시피랑 요리팁을</div>
              <div className="fonts">
                공유하고 싶다면{" "}
                <MusicNote
                  style={{ width: "1.5vw", height: "4vh", fill: "#554543" }}
                />
              </div>
              <div
                style={{ marginTop: "2vh", fontSize: "2vw" }}
                onClick={() => {
                  if (!userState.auth.isLoggedIn) {
                    navigate("/login");
                  } else {
                    navigate("/recipe/create");
                  }
                }}
                className="fonts"
              >
                레시피 공유하러 가기<ArrowRight></ArrowRight>
              </div>
            </div>{" "}
            <LandingImg4
              style={{
                zIndex: "720",
                width: "55vw",
                height: "65vh",
                transform: "translateX(40vw) translateY(-29vh)",
              }}
            />
          </div>
        </div>
        {/* section2 끝*/}
        <div
          style={{
            backgroundColor: "#FFF9F3",
            width: "100%",
            height: "100vh",
          }}
        >
          <LandingShape2
            style={{
              width: "30%",
              // height: "50vh",

              position: "absolute",
              right: "0",
              // transform: " translateY(20%)",
            }}
          />
          <LandingShape1
            style={{
              width: "30vw",
              height: "100vh",
              position: "absolute",
              left: "0",
              // zIndex: "300",
              // top: "50vh",
              // bottom: "50",
              // transform: " translateY(30%)",
              // transform: "translateY(-140%)",
            }}
          />
          <div
            style={{
              display: "inline-flex",
              position: "absolute",
              marginTop: "30vh",

              width: "100%",
            }}
          >
            <img
              src="/img/landingImg2.jpg"
              style={{ height: "40vh", width: "40vw" }}
              // style={{ width: "50vw", height: "100vh" }}
              alt="음식이미지2"
            />
            <div
              style={{
                backgroundColor: "#ECE5D3",
                width: "60%",
                // width: "100%",
                height: "40vh",
                // transform: " translateY(-33vh)",
              }}
            >
              <div
                style={{
                  zIndex: "720",
                  // width: "55vw",
                  padding: "6vh 6vw",

                  // transform: " translateY(8vh)",
                  // overflowX: "hidden",
                }}
              >
                <div className="fonts" style={{ fontSize: "1.5vw" }}>
                  외식,배달 음식으로 떼운 끼니를
                </div>
                <div className="fonts" style={{ fontSize: "1.5vw" }}>
                  우리들의 레시피로
                </div>
                <div className="fonts" style={{ fontSize: "1.5vw" }}>
                  건강하고 재밌는 식탁으로{" "}
                  <MusicNote
                    style={{ width: "1.5vw", height: "4vh", fill: "#554543" }}
                  />
                </div>
                <div
                  style={{ marginTop: "2vh", fontSize: "2vw" }}
                  onClick={() => {
                    navigate("/recipes/search");
                  }}
                  className="fonts"
                >
                  더 많은 레시피 보러가기<ArrowRight></ArrowRight>
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <img
              src="/img/landingImg3.jpg"
              style={{ height: "40vh", width: "40vw", overflowX: "hidden" }}
              alt="음식이미지3"
            />
          </div>
        </div>
        {/* section3 끝*/}
        <div
          style={{
            backgroundColor: "#ECE5D3",
            width: "100%",
            height: "100vh",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              width: "100%",
              height: "50vh",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ fontSize: "2vw", width: "80%", marginLeft: "6vw" }}
              className="fonts"
            >
              <div>요리 왕초보라면 </div>
              <div>
                도
                <MusicNote
                  style={{ width: "2vw", height: "4vh", fill: "#554543" }}
                />
                레시피가 추천하는{" "}
              </div>
              <div>밀키트로 가볍게 도전! </div>
            </div>
            <img
              src="/img/landingImg4.png"
              alt="밀키트 광고 이미지"
              style={{ width: "30vw", height: "100%" }}
            />
          </div>
          <div
            style={{ display: "inline-flex", width: "100%", height: "50vh" }}
          >
            <img
              style={{ width: "60vw", height: "50vh" }}
              src="/img/landingImg5.png"
              alt="밀키트 광고 이미지2"
            />
            <div
              style={{
                textAlign: "center",
                width: "100%",
                padding: "4vh 0",
                backgroundColor: "#FAF3E7",
              }}
            >
              <ForkSpoonKnife
                style={{
                  fill: "black",
                  width: "9vw",
                  // textAlign: "center",
                  height: "9vh",

                  marginTop: "10%",
                  // transform: " translateY(-50)",
                }}
              />
              <div
                style={{
                  fontSize: "2vw",
                  width: "100%",
                  marginTop: "6vh",
                }}
                className="fonts"
              >
                더 많은 밀키트 보러가기<ArrowRight></ArrowRight>
              </div>
            </div>
          </div>
        </div>
        {/* section4 끝*/}
        <div
          style={{
            backgroundColor: "#C2B196",
            width: "100%",
            height: "100vh",
          }}
        >
          <div
            style={{
              fontSize: "2em",
              width: "100%",
              fontWeight: "900",
              color: "#F5F5F5",
              // marginTop: "6vh",
            }}
            className="fonts"
          >
            M BEST RECIPE! 우리들이 눈여겨본 레시피!
          </div>
          <BestRecipe />
        </div>
        {/* section4 끝*/}

        <div
          className="knowhow"
          style={{
            width: "100%",
            height: "100vh",
            // zIndex: "700",
          }}
        >
          <div
            style={{
              width: "42vw",
              height: "20vh",
              zIndex: "300",
              alignItems: "center",
              display: "inline-flex",
              backgroundColor: "#AF875C",
              boxShadow: "2vw 2vh #FCE5B0",
            }}
          >
            <div
              style={{
                fontSize: "2vw",
                width: "100%",
                color: "#FAF3E7",
                textAlign: "center",
              }}
              className="fonts"
            >
              생활 쏙! 노하우
            </div>
            <div
              style={{
                fontSize: "1vw",
                width: "100%",
                fontWeight: "900",
                // paddingTop: "9vh",
                color: "#FAF3E7",
              }}
              className="fonts"
            >
              홈쿠킹 고수들이 전하는 꿀팁!
            </div>
          </div>{" "}
          <KnowhowMain />
        </div>

        {/* section4 끝*/}
        {/* <MainBanner /> */}
        {/* <BestRecipe /> */}
        {/* <BestChef /> 쉐프 좋아요 기능 없앰 대신 레시피 누적 좋아요 많은 걸 여기에 표시*/}
        {/* <KnowhowMain /> */}
        {/* 레시피 상세 검색 페이지에 등록하기 버튼 추가하기 */}
        {/* <EditorsChoiceSection /> */}
      </MainLayout>
    </>
  );
};
export default MainPage;
