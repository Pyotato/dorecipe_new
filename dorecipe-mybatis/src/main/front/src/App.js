import { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import NoticePage from "./pages/noticePage/noticeListPage";
import NoticeDetailPage from "./pages/noticePage/noticeDetailPage";
import NoticeUpdatePage from "./pages/noticePage/noticeFormPage";

import KnowhowPage from "./pages/knowhowPage/knowhowListPage";
import KnowhowDetailPage from "./pages/knowhowPage/knowhowDetailPage";
import KnowhowUpdatePage from "./pages/knowhowPage/knowhowFormPage";

import EventPage from "./pages/eventPage/eventListPage";
import EventDetailPage from "./pages/eventPage/eventDetailPage";
import EventModify from "./pages/eventPage/eventMod";

import MyPage from "./pages/myPage";
import AdminPostMng from "./pages/adminPage";
import JoinMemberPage from "./pages/joinMemberPage";

import MainPage from "./pages/mainPage";
import CreateRecipePage from "./pages/createRecipePage";

import LoginPage from "./pages/loginPage";
import SearchRecipePage from "./pages/searchRecipePage";

import DetailSearchPage from "./pages/detailSearchPage";
import DetailRecipePage from "./pages/recipeDetailsPage";

import NotFoundPage from "./pages/errorPage";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "./reduxRefresh/actions/auth";
import { clearMessage } from "./reduxRefresh/actions/message";
import { history, historylocation } from "./reduxRefresh/helpers/history";

import EventBus from "./reduxRefresh/common";

import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import EditRecipeForm from "./components/editRecipeCp";
import ModifyRecipePage from "./pages/modifyRecipePage";

function App() {
  const userMsg = useSelector((state) => state.message);
  const user = useSelector((auth) => auth);
  const dispatch = useDispatch();

  console.log("user", user);
  console.log("userMsg", userMsg);
  const [userState, setCurrentUser] = useState(user);
  const recipeID = useParams();

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
    console.log("logOut", user);
  };

  const { currentUser, showModeratorBoard, showAdminBoard } = user;

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

        <Route path={"/knowhow/list"} element={<KnowhowPage />} user={user} />
        <Route
          path={"/knowhow/detail/:knowhowId"}
          element={<KnowhowDetailPage />}
        />
        <Route
          path={"/knowhow/update/:knowhowId"}
          element={<KnowhowUpdatePage />}
        />

        <Route path={"/event/list"} element={<EventPage />} auth={user} />
        <Route path={"/event/detail/:detailId"} element={<EventDetailPage />} />
        <Route path={"/event/update/:detailId"} element={<EventModify />} />

        <Route path={"/admin"} element={<AdminPostMng />} />
        <Route path={"/join"} element={<JoinMemberPage />} />

        {currentUser ? (
          <Route path={"/member/info/"} element={<MyPage />} />
        ) : (
          // <Route path={"/member/info/:memberId"} element={<MyPage />} />
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
        {/* {currentUser &&  (
          <Route
            path={"/recipe/create/:recipeId"}
            element={<CreateRecipePage />}
          />
        )} */}
        <Route path={"/recipes/search"} element={<DetailSearchPage />} />
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
          path={"/recipe/update/:recipeID"}
          element={<ModifyRecipePage />}
        />
        <Route
          path={"/recipes/search/details/:recipeid"}
          element={<DetailRecipePage />}
        />
        <Route path={"/*"} element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
