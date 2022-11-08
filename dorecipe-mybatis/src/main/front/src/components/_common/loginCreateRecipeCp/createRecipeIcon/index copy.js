import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import "./style.css";
import { useSelector } from "react-redux";

const CreateRecipeIcon = () => {
  const user = useSelector((auth) => auth);

  // const auth = useSelector((state) =>
  //   state.auth.user.roles.includes("ROLE_ADMIN")
  // );

  // console.log("CreateRecipeIcon_auth", user);

  const navigate = useNavigate();
  const onClickRecipe = () => {
    navigate("/recipe/create");
  };

  const popover = (
    <Popover>
      <Popover.Body>
        {!user.auth.isLoggedIn ? (
          <>
            <Link className="linkItems" to="/">
              로그인 후 작성가능합니다
            </Link>
          </>
        ) : (
          <>
            <div className="linkItems" onClick={onClickRecipe}>
              레시피 작성
            </div>
          </>
        )}
        {/* {user ? (
          <>
            <div className="linkItems" onClick={onClickRecipe}>
              레시피 작성
            </div>
          </>
        ) : (
          <>
            <Link className="linkItems" to="/">
              로그인 후 작성가능합니다
            </Link>
          </>
        )} */}
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
          {" "}
          <FontAwesomeIcon className="createRecipeIcon" icon={faPencil} />
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
