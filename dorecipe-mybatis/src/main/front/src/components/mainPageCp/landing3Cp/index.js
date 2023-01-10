import { useMediaQuery } from "react-responsive";
import { device } from "@theme/theme";
import MobileCp3 from "./mobile";
import DefaultCp3 from "./default";
const LandingCp3 = () => {
  const isMobile = useMediaQuery({ query: device.device_mobileL });
  const isTablet = useMediaQuery({ query: device.device_tablet });

  return <>{isMobile ? <MobileCp3 /> : <DefaultCp3 />}</>;
};
export default LandingCp3;
