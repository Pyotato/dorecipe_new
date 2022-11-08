import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useInput } from "../../../hooks/useInput";
import "./style.css";
import MainLayout from "../../../layout/mainLayOut";

const KnowhowUpdatePage = () => {
  let { knowhowId } = useParams();

  // 기존에 있던 값 가져오기
  const [state, setState] = useState([
    {
      know_num: 0,
      know_title: "",
      know_content: "",
      know_creDate: "",
      know_path: "",
    },
  ]);

  function KnowAxios_get() {
    axios({
      url: "/knowhow/detail/" + knowhowId,
      method: "get",
      data: {
        know_num: "",
        know_title: "",
        know_content: "",
        know_creDate: "",
        know_path: "",
      },
      baseURL: "http://localhost:9000",
      // baseURL: process.env.REACT_APP_HOST,
    }).then(function (response) {
      setState(response.data);
    });
  }

  // 파일 보내기

  const [files, setFiles] = useState("");

  const onLoadFile = (e) => {
    onChangeKnowhowPath(e);

    const file = e.target.files;
    setFiles(file);
  };

  useEffect(() => {
    KnowAxios_get();

    preview();
    return () => preview();
  }, []);
  // 미리보기
  const preview = () => {
    if (!files) return false;
    const imgEl = document.querySelector(".img_box");
    const reader = new FileReader();

    reader.onload = () =>
      (imgEl.style.backgroundImage = `url(${reader.result})`);

    reader.readAsDataURL(files[0]);
  };

  // --

  // 수정한 값 보내기
  let [know_title, onChangeKnowhowTitle, setKnowhowTitle] = useInput("");
  let [know_content, onChangeKnowhowContent, setKnowhowContent] = useInput("");
  let [know_path, onChangeKnowhowPath, setKnowhowPath] = useInput("");

  const modHandler = useCallback(
    (e) => {
      e.preventDefault(); // 정리~

      know_title = document.getElementsByName("know_title")[0].value;
      know_content = document.getElementsByName("know_content")[0].value;
      know_path = document.getElementsByName("know_path")[0].value;

      // console.log(document.getElementsByName("know_title")[0].value);
      // console.log(document.getElementsByName("know_content")[0].value);
      // console.log(document.getElementsByName("know_path")[0].value);

      // 노하우 데이터
      const data = {
        know_num: `${knowhowId}`,
        know_title: `${know_title}`,
        know_content: `${know_content}`,
        know_path: `${know_path.replace(/c:\\fakepath\\/i, "")}`,
      };

      const formData = new FormData();

      formData.append("know_image", files[0]);
      formData.append("know_num", knowhowId);
      formData.append("know_title", data.know_title);
      formData.append("know_content", data.know_content);
      formData.append("know_path", data.know_path);

      if (data.know_title === "" || data.know_content === "")
        alert("제목과 내용을 입력해 주세요.");
      else {
        axios({
          method: "post",
          url: "http://localhost:9000/knowhow/update",
          // url: process.env.REACT_APP_HOST + "/knowhow/update",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        }).then((response) => {
          console.log(response.data);
          alert("수정되었습니다.");
          //노하우 리스트로 이동
          window.location.href = "http://localhost:3000/admin";
        });
      }
    },
    [knowhowId, know_title, know_content, know_path]
  );

  return (
    <>
      <MainLayout>
        <div>
          <li>
            <div className="knowhowWrap">
              <h2>| Knowhow |</h2>
              <div className="knowhowBorder" />
            </div>
          </li>
          <form>
            <table className="left dpib">
              <thead>
                <tr>
                  <td>글번호</td>
                  <td>
                    <input
                      type="text"
                      className="text center"
                      defaultValue={state.know_num}
                      disabled
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>제목</td>
                  <td>
                    <input
                      name="know_title"
                      className="text"
                      type="text"
                      id="postTitle"
                      defaultValue={state.know_title}
                      placeholder=" 제목을 입력해주세요"
                      onChange={onChangeKnowhowTitle}
                    />
                  </td>
                </tr>
                <tr>
                  <td>파일 첨부</td>
                  <td>
                    <input
                      name="know_path"
                      type="file"
                      id="postTitle"
                      onChange={onLoadFile}
                      defaultValue={state.know_path}
                    />
                  </td>
                </tr>
                <tr>
                  <td>내용</td>
                  <td>
                    <textarea
                      name="know_content"
                      className="text"
                      rows="4"
                      cols="50"
                      defaultValue={state.know_content}
                      placeholder="내용을 입력해주세요"
                      onChange={onChangeKnowhowContent}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 이미지 */}
            <div className="mt-5 imgPreview floatRight">
              <div className="img_box" />
              {/* src={state.event_path}  */}
            </div>

            <Link
              className="mt-3 left2 btn btn-outline-secondary"
              to={"/knowhow/list"}
            >
              목록으로 돌아가기
            </Link>
            <button
              type="button"
              className="left2 btn btn-outline-secondary"
              onClick={modHandler}
            >
              수정
            </button>
          </form>
        </div>
      </MainLayout>
    </>
  );
};
export default KnowhowUpdatePage;
