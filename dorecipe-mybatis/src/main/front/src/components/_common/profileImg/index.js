import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
const ProfileImg = () => {
  return (
    <>
      <ProfileImgWrap>
        <FontAwesomeIcon icon={faCircleUser} className="commonProfileImg" />
      </ProfileImgWrap>
    </>
  );
};
const ProfileImgWrap = styled.div`
  color: #463635;
  width: 3em;
  transform: translateX(-50%);
  & > .commonProfileImg {
    font-size: 6em;
  }
`;
export default ProfileImg;
