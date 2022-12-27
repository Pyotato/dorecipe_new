import MainLayout from "@layout/mainLayOut";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";
import LandingCp1 from "@mainPageCp/landing1Cp";
import LandingCp2 from "@mainPageCp/landing2Cp";
import LandingCp3 from "@mainPageCp/landing3Cp";
import LandingCp4 from "@mainPageCp/landing4Cp";
import LandingCp5 from "@mainPageCp/landing5Cp";
import LandingCp6 from "@mainPageCp/landing6Cp";

const MainPage = () => {
  // const [scrollState, setScrollState] = useState(0);
  const user = useSelector((auth) => auth);
  const [userState, setUserState] = useState(user);

  // const section1 = useRef("");
  // const section2 = useRef("");
  // const section3 = useRef("");
  // const section4 = useRef("");
  // const section5 = useRef("");
  // const section6 = useRef("");

  // const [topTosection1Height, setTopTosection1Height] = useState(0);
  // const [topTosection2Height, setTopTosection2Height] = useState(0);
  // const [topTosection3Height, setTopTosection3Height] = useState(0);
  // const [topTosection4Height, setTopTosection4Height] = useState(0);
  // const [topTosection5Height, setTopTosection5Height] = useState(0);
  // const [topTosection6Height, setTopTosection6Height] = useState(0);

  // const [topDistance, setTopDistance] = useState(0);

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,

  //     behavior: "smooth",
  //   });
  // }, []);
  // useEffect(() => {
  // useMemo(() => {
  //   if (topTosection1Height > -topTosection2Height / 2) {
  //     // if (topDistance <= topTosection1Height && topDistance >= 0) {
  //     setScrollState(1);
  //   } else if (
  //     topDistance < topTosection3Height &&
  //     topDistance >= topTosection2Height
  //   ) {
  //     setScrollState(2);
  //   } else if (
  //     topDistance < topTosection4Height &&
  //     topDistance >= topTosection3Height
  //   ) {
  //     setScrollState(3);
  //   } else if (
  //     topDistance < topTosection5Height &&
  //     topDistance >= topTosection4Height
  //   ) {
  //     setScrollState(4);
  //   } else if (
  //     topDistance <= topTosection6Height &&
  //     topDistance > topTosection4Height
  //   ) {
  //     setScrollState(5);
  //   }
  // }, [topDistance]);
  // useMemo(() => {
  //   if (topDistance <= topTosection1Height && topDistance >= 0) {
  //     setScrollState(1);
  //   } else if (
  //     topDistance < topTosection3Height &&
  //     topDistance >= topTosection2Height
  //   ) {
  //     setScrollState(2);
  //   } else if (
  //     topDistance < topTosection4Height &&
  //     topDistance >= topTosection3Height
  //   ) {
  //     setScrollState(3);
  //   } else if (
  //     topDistance < topTosection5Height &&
  //     topDistance >= topTosection4Height
  //   ) {
  //     setScrollState(4);
  //   } else if (
  //     topDistance <= topTosection6Height &&
  //     topDistance > topTosection4Height
  //   ) {
  //     setScrollState(5);
  //   }

  // }, [topDistance]);

  // window.onscroll = function () {
  //   myFunction();
  //   setTopTosection1Height(section1.current.getBoundingClientRect().top);
  //   setTopTosection2Height(section2.current.getBoundingClientRect().top);
  //   setTopTosection3Height(section3.current.getBoundingClientRect().top);
  //   setTopTosection4Height(section4.current.getBoundingClientRect().top);
  //   setTopTosection5Height(section5.current.getBoundingClientRect().top);
  //   setTopTosection5Height(section6.current.getBoundingClientRect().top);
  // };

  // function myFunction() {
  //   setTopDistance(document.documentElement.scrollTop);
  //   // alert(`topDistance ${topDistance}`);
  //   alert(`topDistance ${topDistance}~~~~~~~~~~~~
  //    topTosection1Height ${topTosection1Height}
  //     topTosection2Height ${topTosection2Height}
  //     topTosection3Height ${topTosection3Height}
  //   topTosection4Height ${topTosection4Height}
  //     topTosection5Height ${topTosection5Height}
  //     topTosection6Height ${topTosection6Height}`);
  // }

  // useEffect(() => {
  //   setScrollState(1);
  //   setTopDistance(document.documentElement.scrollTop);
  //   setTopTosection1Height(section1.current.getBoundingClientRect().top);
  //   setTopTosection2Height(section2.current.getBoundingClientRect().top);
  //   setTopTosection3Height(section3.current.getBoundingClientRect().top);
  //   setTopTosection4Height(section4.current.getBoundingClientRect().top);
  //   setTopTosection5Height(section5.current.getBoundingClientRect().top);
  //   setTopTosection6Height(section6.current.getBoundingClientRect().top);
  // }, []);

  // useMemo(() => {
  //   if (scrollState === 1) {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //   } else if (scrollState === 2) {
  //     window.scrollTo({
  //       top: topTosection2Height,
  //       behavior: "smooth",
  //     });
  //   } else if (scrollState === 3) {
  //     window.scrollTo({
  //       top: topTosection3Height,
  //       behavior: "smooth",
  //     });
  //   } else if (scrollState === 4) {
  //     window.scrollTo({
  //       top: topTosection4Height,
  //       behavior: "smooth",
  //     });
  //   } else if (scrollState === 5) {
  //     window.scrollTo({
  //       top: topTosection5Height,
  //       behavior: "smooth",
  //     });
  //   } else if (scrollState === 6) {
  //     window.scrollTo({
  //       top: topTosection6Height,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [scrollState]);

  // useMemo(() => {

  // }, [scrollState]);

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
        {/* 레시피 상세검색, 공지사항 ,이벤트, 레시피 키워드 검색 */}
        <LandingCp1 />
        {/* 레시피 작성으로 이동*/}
        <LandingCp2 userState={userState} />
        {/* 레시피 상세 검색으로 이동*/}
        <LandingCp3 />
        {/* 밀키트 페이지*/}
        <LandingCp4 />
        {/* best 레시피 section*/}
        <LandingCp5 />
        {/* 노하우 section*/}
        <LandingCp6 />
      </MainLayout>
    </>
  );
};
export default MainPage;
