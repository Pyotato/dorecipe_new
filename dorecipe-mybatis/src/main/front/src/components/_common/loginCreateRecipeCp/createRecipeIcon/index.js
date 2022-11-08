import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faHouse } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import "./style.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const CreateRecipeIcon = () => {
  const user = useSelector((auth) => auth);
  const [userState, setUserState] = useState(user);
  const [iconState, setIcon] = useState(faPencil);

  useEffect(() => {
    // console.log("CreateRecipeIcon", userState);
    if (userState.auth.isLoggedIn) {
      if (userState.auth.user.roles.includes("ROLE_ADMIN")) {
        setIcon(faHouse);
        setUserState(userState.auth.user);
      }
    } else setIcon(faPencil);
  }, []);

  const navigate = useNavigate();
  const onClickRecipe = () => {
    navigate("/recipe/create");
  };

  const onClickAdmin = () => {
    navigate("/admin");
  };

  const popover = (
    <Popover>
      <Popover.Body>
        {!user.auth.isLoggedIn ? (
          <>
            <Link className="linkItems" to="/login">
              <div>로그인 후 </div>
              <div>작성 가능합니다</div>
            </Link>
          </>
        ) : user.auth.user.roles.includes("ROLE_ADMIN") ? (
          <>
            <div className="linkItems" onClick={onClickAdmin}>
              <div>관리자 홈</div>
            </div>
          </>
        ) : (
          <>
            <div className="linkItems" onClick={onClickRecipe}>
              레시피 작성
            </div>
          </>
        )}
      </Popover.Body>
    </Popover>
  );

  const ToggleMsgBtn = () => (
    <>
      {/* 버튼 커스텀화 */}
      <style type="text/css">
        {`
      .btn-success {
        display: inline-block;
        border: 1px solid #fffdf5;
        border-radius: 100%;
        width: 2em;
        height: 2em;
        width: 2em;
        height: 2em;
        border-radius: 100%;
        background-color: transparent;
        margin-right:3em;

      }
      
      `}
      </style>
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button variant="success">
          <FontAwesomeIcon className="createRecipeIcon" icon={iconState} />
        </Button>
      </OverlayTrigger>
    </>
  );
  return (
    <>
      <ToggleMsgBtn />
    </>
  );
};
export default CreateRecipeIcon;
