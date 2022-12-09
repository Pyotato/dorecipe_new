import Spinner from "react-bootstrap/Spinner";
import "./style.css";
function BasicSpinner() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default BasicSpinner;
