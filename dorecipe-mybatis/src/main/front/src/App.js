import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import NoticePage from "./pages/noticePage/noticeListPage";
import NoticeDetailPage from "./pages/noticePage/noticeDetailPage";
import NoticeUpdatePage from "./pages/noticePage/noticeFormPage";

import KnowhowDetailPage from "./pages/knowhowPage/knowhowDetailPage";

import EventPage from "./pages/eventPage";
import EventDetailPage from "./pages/eventPage/eventDetailPage";
// import EventModify from "./pages/eventPage/eventModPage";

import MyPage from "./pages/myPage";
import AdminPostMng from "./pages/adminPage";
import JoinMemberPage from "./pages/joinMemberPage";

import MainPage from "./pages/mainPage";
import CreateRecipePage from "./pages/createRecipePage";

import LoginPage from "./pages/loginPage";
import SearchRecipePage from "./pages/searchRecipePage";

import SearchByCategoryPage from "./pages/detailSearchPage";
import DetailRecipePage from "./pages/recipeDetailsPage";

import NotFoundPage from "./pages/errorPage";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "./reduxRefresh/actions/auth";
import { clearMessage } from "./reduxRefresh/actions/message";
import { history } from "./reduxRefresh/helpers/history";

import EventBus from "./reduxRefresh/common";

import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import "./App.css";

import ModifyRecipePage from "./pages/modifyRecipePage";

function App() {
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, []);
  const userMsg = useSelector((state) => state.message);
  const user = useSelector((auth) => auth);
  const dispatch = useDispatch();

  console.log("user", user);
  console.log("userMsg", userMsg);
  const [userState, setCurrentUser] = useState(user);

  useEffect(() => {
    user.state = {
      //마운트 되었을때 상태 설정
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
    dispatch(clearMessage());
  }, []);

  useEffect(() => {
    dispatch(clearMessage());
    const currentUser = user.auth.user;
    if (currentUser) {
      setCurrentUser({
        currentUser: currentUser,
        showModeratorBoard: currentUser.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: currentUser.roles.includes("ROLE_ADMIN"),
      });
      user.state = userState;
      console.log("currentUser", currentUser);
    } else {
      setCurrentUser({
        showModeratorBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
      });
    }
    EventBus.on("logout", () => {
      logOut();
    });

    EventBus.remove("logout");
  }, []);

  const logOut = () => {
    dispatch(logout());
    setCurrentUser({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
    user.state = userState;
  };

  const { currentUser } = user;

  return (
    <ThemeProvider theme={theme}>
      <Routes history={history}>
        {/* <Routes> */}
        <Route path={"/notice/list"} element={<NoticePage />} user={user} />
        <Route
          path={"/notice/detail/:noticeId"}
          element={<NoticeDetailPage />}
          user={user}
        />
        <Route
          path={"/notice/update/:noticeId"}
          element={<NoticeUpdatePage />}
        />
        <Route
          path={"/knowhow/detail/:knowhowId"}
          element={<KnowhowDetailPage />}
        />

        <Route path={"/event/list"} element={<EventPage />} auth={user} />
        <Route path={"/event/detail/:detailId"} element={<EventDetailPage />} />
        {/* <Route path={"/event/update/:detailId"} element={<EventModify />} /> */}

        <Route path={"/join"} element={<JoinMemberPage />} />

        <Route path={"/member/info/:memberId"} element={<MyPage />} />
        {user.auth.user ? (
          user.auth.user.roles.includes("ROLE_ADMIN") && (
            <Route path={"/admin"} element={<AdminPostMng />} />
          )
        ) : (
          <Route path={"/"} element={<MainPage />} />
        )}

        {currentUser ? (
          <Route path={"/member/info"} element={<MyPage />} />
        ) : (
          <Route path={"/"} element={<MainPage />} />
        )}
        <Route path={"/member/info"} element={<MyPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route exact path={"/"} element={<MainPage />} />
        {currentUser ? (
          <Route
            path={"/recipe/create/:recipeId"}
            element={<CreateRecipePage />}
          />
        ) : (
          <Route path={"/"} element={<MainPage />} />
        )}

        <Route path={"/recipes/search"} element={<SearchByCategoryPage />} />
        <Route
          path={"/recipe/search/details/:recipeId"}
          element={<DetailRecipePage />}
        />
        <Route
          path={"/recipe/search/:searchId"}
          element={<SearchRecipePage />}
        />
        <Route
          path={"/recipe/search/:searchId"}
          element={<SearchRecipePage />}
        />
        <Route path={"/recipe/create"} element={<CreateRecipePage />} />
        <Route
          path={"/recipe/update/:recipeId"}
          element={<ModifyRecipePage />}
        />
        <Route
          path={"/recipes/search/details/:recipeId"}
          element={<DetailRecipePage />}
        />
        <Route path={"/*"} element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
