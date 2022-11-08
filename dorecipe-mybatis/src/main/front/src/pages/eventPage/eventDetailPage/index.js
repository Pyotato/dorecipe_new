import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./style.css";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../../../layout/mainLayOut";

const EventDetailPage = () => {
  const params = useParams();

  let [state, setState] = useState([
    {
      event_num: 0,
      event_title: "",
      event_content: "",
      event_path: "",
      event_creDate: "",
      event_finDate: "",
    },
  ]);

  function Axios() {
    const event_num = params.detailId; // app.js에서 보내줌

    axios
      .get("http://localhost:9000/event/detail/" + event_num)
      .then((result) => {
        setState(result.data);
      })
      .catch(() => {
        console.log("실패... 이벤트디테일페이지");
      });
  }

  useEffect(() => {
    Axios();
  }, []);
  console.log(state.event_path + "이거");
  return (
    <>
      <MainLayout>
        <div className="eventCenter">
          <div>
            <h2>| Event |</h2>
            <br />
          </div>
          <h5>
            참여기간 : {state.event_creDate} ~ {state.event_finDate}
          </h5>
          <br />
          <h2>{state.event_title}</h2>
          <br />
          <hr className="hr" />
          {state.event_path !== "" ? (
            <img
              style={{
                maxWidth: "max-content",
                minWidth: "40em",
                maxHeight: "max-content",
                margin: "3em",
                padding: "3em",
              }}
              className="eventImg"
              src={state.event_path}
              alt={state.event_path}
            />
          ) : null}

          <p className="left width eventContent">{state.event_content}</p>
        </div>
        <hr className="hr" />
        <Link
          className="btn btn-outline-secondary centerRight left"
          to={"/event/list"}
        >
          이전으로
        </Link>
      </MainLayout>
    </>
  );
};
export default EventDetailPage;
