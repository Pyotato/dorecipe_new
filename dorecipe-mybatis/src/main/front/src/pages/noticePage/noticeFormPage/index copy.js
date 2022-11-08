// <<<<<<< HEAD
// import axios from "axios";
// import { useCallback, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./style.css";
// import { useInput } from "../../../hooks/useInput";
// =======
// import axios from 'axios';
// import { useCallback, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './style.css';
// import { useInput } from '../../../hooks/useInput';
// import MainLayout from '../../../layout/mainLayOut';
// >>>>>>> 6468cbe61904082926b85971c0be5a38ad647588

// const NoticeUpdatePage = (auth) => {
//   let { noticeId } = useParams();

//   const [state, setState] = useState([
//     {
//       notice_num: 0,
//       notice_title: "",
//       notice_content: "",
//       notice_creDate: "",
//     },
//   ]);

//   function testAxios() {
//     //detail가져오기
//     axios({
//       url: "/notice/detail/" + noticeId,
//       method: "get",
//       data: {
//         notice_num: "",
//         notice_title: "",
//         notice_content: "",
//         notice_creDate: "",
//       },
//       baseURL: "http://localhost:9000",
//     }).then(function (response) {
//       console.log(response.data);
//       setState(response.data);
//     });
//   }
//   useEffect(() => {
//     console.log("Noticeauth", auth);
//     testAxios();
//   }, []);

//   // ------------------------------------------------

//   let [notice_num] = useInput("");
//   let [notice_title, onChangeNoticeTitle, setNoticeTitle] = useInput("");
//   let [notice_content, onChangeNoticeContent, setNoticeContent] = useInput("");

//   const updateEvent = useCallback(
//     (e) => {
//       e.preventDefault();

// <<<<<<< HEAD
//       notice_title = document.getElementById("noticeTitle").value;
//       notice_content = document.getElementById("noticeContent").value;

//       const noticeData = {
//         notice_num: `${notice_num}`,
//         notice_title: `${notice_title}`,
//         notice_content: `${notice_content}`,
//       };

//       const formData = new FormData();
//       formData.append("notice_num", noticeId);
//       formData.append("notice_title", noticeData.notice_title);
//       formData.append("notice_content", noticeData.notice_content);

//       if (noticeData.notice_title === "" || noticeData.notice_content === "") {
//         alert("제목과 내용을 입력해주세요.");
//       } else {
//         axios({
//           method: "POST",
//           url: "http://localhost:9000/notice/update",
//           headers: { "Content-Type": "multipart/form-data" },
//           data: formData,
//         }).then((response) => {
//           console.log(response.data);
//           alert("공지사항이 수정되었습니다.");
//           window.location.href = "http://localhost:3000/notice/list";
//         });
//       }
//     },
//     [notice_num, notice_title, notice_content]
//   );

//   return (
//     <>
//       <div>
//         <div className="noticeWrap">
//           <h2>| Notice |</h2>
//           <div className="noticeBorder" />
//         </div>
//         <form>
//           <table className="left">
//             <thead>
//               <tr>
//                 <td>글번호</td>
//                 <td>
//                   <input
//                     type="text"
//                     className="text"
//                     defaultValue={state.notice_num}
//                     disabled
//                   />
//                 </td>
//               </tr>
//             </thead>
//             <thead>
//               <tr>
//                 <td>제목</td>
//                 <td>
//                   <input
//                     id="noticeTitle"
//                     className="text"
//                     type="text"
//                     name="notice_title"
//                     placeholder=" 제목을 입력해주세요"
//                     defaultValue={state.notice_title}
//                     onChange={onChangeNoticeTitle}
//                   ></input>
//                 </td>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>내용</td>
//                 <td>
//                   <textarea
//                     id="noticeContent"
//                     className="text"
//                     rows="4"
//                     cols="50"
//                     name="notice_content"
//                     placeholder=" 내용을 입력해주세요"
//                     defaultValue={state.notice_content}
//                     onChange={onChangeNoticeContent}
//                   ></textarea>
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           <button
//             type="button"
//             className="left2 btn btn-outline-secondary"
//             onClick={updateEvent}
//           >
//             수정
//           </button>
//         </form>
//       </div>
//     </>
//   );
// =======
// 	return (
// 		<>
// 		<MainLayout>
// 		<div className='bottom'>
// 			<div className="noticeWrap">
// 				<h2>| Notice |</h2>
// 				<div className="noticeBorder" />
// 			</div>
// 				<table className="left">
// 					<thead>
// 			          <tr>
// 			            <td>글번호</td>
// 			             <td>
// 			              <input type="text" className="text"
// 			                     defaultValue={state.notice_num}
// 			                     disabled/>
// 			            </td>
// 			          </tr>
// 			        </thead>
// 					<thead>
// 						<tr>
// 							<td>제목</td>
// 							<td>
// 								<input
// 									id="noticeTitle"
// 									className="text"
// 									type="text"
// 									name="notice_title"
// 									placeholder=" 제목을 입력해주세요"
// 									defaultValue={state.notice_title}
// 									onChange={onChangeNoticeTitle}
// 								></input>
// 							</td>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						<tr>
// 							<td>내용</td>
// 							<td>
// 								<textarea
// 									id="noticeContent"
// 									className="text"
// 									rows="4"
// 									cols="50"
// 									name="notice_content"
// 									placeholder=" 내용을 입력해주세요"
// 									defaultValue={state.notice_content}
// 									onChange={onChangeNoticeContent}
// 								></textarea>
// 							</td>
// 						</tr>
// 					</tbody>
// 				</table>
// 				<button type="button" className="left2 btn btn-outline-secondary"
// 					onClick={updateEvent}>수정</button>
// 		</div>
// 		</MainLayout>
// 		</>
// 	)
// >>>>>>> 6468cbe61904082926b85971c0be5a38ad647588
// };
// export default NoticeUpdatePage;
