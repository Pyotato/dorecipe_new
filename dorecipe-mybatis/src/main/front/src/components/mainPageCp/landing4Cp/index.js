import { useRef } from "react";
import styled from "styled-components";
import { colors } from "@theme/theme";
import { ReactComponent as ForkSpoonKnife } from "@assets/ForkSpoonKnife.svg";
import { ReactComponent as MusicNote } from "@assets/MusicNote.svg";
import { ReactComponent as ArrowRight } from "@assets/ArrowRight.svg";
import { ReactComponent as MainMealKitAd1 } from "@assets/MainMealKitAd1.svg";
// import { ReactComponent as MainMealKitAd1 } from "@assets/MealKit1.svg";
import { ReactComponent as MainMealKitAd2 } from "@assets/MainMealKitAd2.svg";
import { ReactComponent as MealKitImgCombined } from "@assets/MealKitImgCombined.svg";
// import { ReactComponent as MainMealKitAd3 } from "@assets/MainMealKitAd3.svg";
// import { ReactComponent as MainMealKitAd4 } from "@assets/MainMealKitAd4.svg";
import { ReactComponent as MealKitShape } from "@assets/MealKitShape.svg";
import { useMediaQuery } from "react-responsive";
import { SwiperSlide } from "swiper/react";
import BannerLayout from "@commonCp/bannerLayout";
import {
  device,
  fontSizes,
  imgSizes,
  margins,
  paddings,
} from "../../../theme/theme";

const LandingCp4 = () => {
  const section4 = useRef();
  const isMobile = useMediaQuery({ query: device.device_tablet });
  const isMobileS = useMediaQuery({ query: device.device_tablet });
  return (
    <>
      <TotalWrap ref={section4}>
        <div className="flexWrap flexTop">
          {isMobile ? (
            <>
              <div className="flexTopLeft paddingSm fontSm">
                <div>요리 왕초보라면 </div>
                <div className="flexItems">
                  도
                  <MusicNote className="musicNote" />
                  레시피가 추천하는
                </div>
                <div>밀키트로 가볍게 도전! </div>
                <div>
                  <div className="flexItems hoverEffect ">
                    <div>더 많은 밀키트 보러가기</div>
                    <ArrowRight></ArrowRight>
                  </div>
                </div>
              </div>
              <MealKitShape className="flexTopRightImg" />
            </>
          ) : (
            <>
              <div className="flexTopLeft paddingLg  fonts2vw">
                <div>요리 왕초보라면 </div>
                <div className="flexItems">
                  도
                  <MusicNote className="musicNote" />
                  레시피가 추천하는
                </div>
                <div>밀키트로 가볍게 도전! </div>
              </div>
              <MealKitShape className="flexTopRight" />
            </>
          )}
        </div>
        {isMobile ? (
          <div className="isMobileMealkit">
            <MealKitImgCombined />
          </div>
        ) : (
          // <BannerLayout>
          //   <SwiperSlide className="swiperWrap">
          //     <div className="mealKitMobile">
          //       <MainMealKitAd1 />
          //     </div>
          //   </SwiperSlide>
          //   <SwiperSlide>
          //     <div className="mealKitMobile">
          //       <MainMealKitAd2 />
          //     </div>
          //   </SwiperSlide>
          //   <SwiperSlide>
          //     <div className="mealKitMobile">
          //       <MainMealKitAd3 />
          //     </div>
          //   </SwiperSlide>
          //   <SwiperSlide>
          //     <div className="mealKitMobile">
          //       <MainMealKitAd4 />
          //     </div>
          //   </SwiperSlide>
          // </BannerLayout>
          <div className="flexWrap flexBtm fonts2vw">
            <MainMealKitAd1 className="btmFlexImg" />

            <MainMealKitAd2 className="btmFlexImg" />

            <div className="btmFlexItems linkWrap">
              <ForkSpoonKnife className="forkStyle" />

              <div className="flexItems hoverEffect ">
                <div>더 많은 밀키트 보러가기</div>
                <ArrowRight></ArrowRight>
              </div>
            </div>
          </div>
        )}
      </TotalWrap>
    </>
  );
};
export default LandingCp4;
const TotalWrap = styled.div`
  background-color: ${colors.color_beige_white};
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: inline-flex;
  flex-direction: column;
  & .swiperWrap {
    width: 100%;
    background-color: pink;
  }
  & .mealKitMobile {
    width: 100vw;
    /* width: 100%; */
    height: 100%;
    /* width: ${imgSizes.img_size_base}; */
  }
  & .flexWrap {
    width: 100%;
    height: 50%;
  }

  & .fonts2vw {
    font-size: 2vw;
  }
  & .fontSm {
    font-size: ${fontSizes.fontSize_tiny};
  }
  & .flexTop {
    display: inline-flex;
    /* background-color: red; */
    justify-content: space-between;
  }
  & .flexBtm {
    display: inline-flex;
  }
  & .flexTopLeft {
    width: 60%;

    & div {
      padding-bottom: ${paddings.padding_xxl};
    }
  }

  & .isMobileMealkit {
    width: 100%;
  }

  & .paddingSm {
    padding: ${paddings.padding_ul} ${paddings.padding_ul};
  }
  & .paddingLg {
    padding: ${paddings.padding_uuuul} ${paddings.padding_uul};
  }
  & .flexTopRight {
    width: ${imgSizes.img_size_uuuul};
    height: 100%;
  }
  & .flexTopRightImg {
    width: ${imgSizes.img_size_ul};
    height: 100%;
  }
  & .btmFlexImg {
    width: 30%;
  }
  & .btmFlexItems {
    width: 40%;
    background-color: ${colors.color_beige_brown};
    padding: ${paddings.padding_ul};
    overflow: hidden;
  }
  & .musicNote {
    width: 2vw;
    height: 4vh;
    fill: ${colors.color_brown};
  }
  & .textTotalWrap {
    display: inline-flex;
    position: absolute;
    margin-top: 30vh;
    width: 100%;
  }

  & .forkStyle {
    fill: ${colors.color_brown};
    width: 9vw;
    height: 9vh;
    margin-top: 10%;
  }

  & .topWrap {
    width: 30%;
    margin-left: ${margins.margin_uuul};
  }
  & .topWrapMobile {
    width: 30%;
    margin-left: ${margins.margin_uul};
  }
  & .hoverEffect:hover {
    color: ${colors.color_carrot_orange};
    cursor: pointer;
    stroke: ${colors.color_carrot_orange};
  }
  &.linkWrap {
    text-align: center;
    background-color: ${colors.color_beige_brown};
  }
  & .btmFlexItems {
    width: 40%;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    display: inline-flex;
    gap: ${margins.margin_uul};
    padding: ${paddings.padding_ul};
  }

  & .imgSize {
    width: 100%;
  }
  & .flexItems {
    display: inline-flex;
    align-items: center;
    gap: 0.2em;
    justify-content: center;
  }
  & .topFlex {
    display: inline-flex;
    align-items: center;
    width: 100%;
    height: 50%;
    justify-content: space-between;
  }
  & .btmFlex {
    display: inline-flex;
    width: 100%;
    height: 50%;
  }

  & .txtAlignCntr {
    text-align: center;
    /* width: 100%; */
    padding: 4vh 0;
    background-color: ${colors.color_beige_brown};
  }
`;
