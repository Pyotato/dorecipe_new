import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import MobileCp1 from "./mobile";
import { deviceSizes } from "../../../theme/theme";
import DefaultCp1 from "./default";

const LandingCp1 = () => {
  const section1 = useRef();
  const navigate = useNavigate();

  const isMobileS = useMediaQuery({
    query: `(max-width:${deviceSizes.deviceSize_mobileS})`,
  });
  const isMobileM = useMediaQuery({
    query: `(max-width:${deviceSizes.deviceSize_mobileM})`,
  });
  const isMobileL = useMediaQuery({
    query: `(max-width:${deviceSizes.deviceSize_mobileL})`,
  });
  // const isMobileS = useMediaQuery({ query: "(max-width:767px)" });
  return (
    <>
      {isMobileS ? (
        <MobileCp1 />
      ) : isMobileM ? (
        <MobileCp1 />
      ) : isMobileL ? (
        <MobileCp1 />
      ) : (
        <DefaultCp1 />
      )}
    </>
  );
  // return <>{isMobileL ? <MobileCp1 /> : <DefaultCp1 />}</>;
};
export default LandingCp1;
