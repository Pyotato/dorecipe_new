import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./style.css";
import MainLayout from "../../../layout/mainLayOut";

const KnowhowDetailPage = () => {
  let { knowhowId } = useParams();

  const [state, setState] = useState([
    {
      know_num: 0,
      know_title: "",
      know_content: "",
      know_creDate: "",
      know_path: "",
    },
  ]);

  function testAxios() {
    axios({
      url: "/knowhow/detail/" + knowhowId,
      method: "get",
      data: {
        know_num: "test",
        know_title: "test",
        know_content: "test",
        know_creDate: "2022/08/24",
        know_path: "test",
      },
      baseURL: "http://localhost:9000",
      // baseURL: process.env.REACT_APP_HOST,
      // baseURL: process.env.REACT_APP_API_URL,
    }).then(function (response) {
      console.log(response.data);
      setState(response.data);
    });
  }

  useEffect(() => {
    testAxios();
  }, []);

  // console.log(knowhowId);
  // console.log(state.know_title);
  // console.log(state.know_creDate);
  // console.log(state.know_content);
  // console.log(state.know_path);

  return (
    <>
      <MainLayout>
        {/* <div>노하우 상세</div> */}
        <li>
          <div className="knowWrap">
            <h2>| Knowhow |</h2>
            <div className="knowDetailTitle knowBorder">{state.know_title}</div>
            <div className="knowDetailDate">{state.know_creDate}</div>
            {/* <div className='center'> */}
            <img
              className="knowDetailImage"
              src={state.know_path}
              alt={state.know_path}
            />

            <div className="knowDetailContent">{state.know_content}</div>
          </div>
        </li>
        {/* <Link className="mt-3 left btn btn-outline-secondary" to={"/admin"}> 이전으로</Link> */}
      </MainLayout>
    </>
  );
};

export default KnowhowDetailPage;
