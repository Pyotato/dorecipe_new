import { useMediaQuery } from "react-responsive";

import MobileCp2 from "./mobile";
import DefaultCp2 from "./default";
const LandingCp2 = ({ userState }) => {
  const isMobile = useMediaQuery({ query: "(max-width:767px)" });

  return (
    <>
      {isMobile ? (
        <MobileCp2 userState={userState} />
      ) : (
        <DefaultCp2 userState={userState} />
      )}
    </>
  );
};
export default LandingCp2;
