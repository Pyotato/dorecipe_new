import { all, delay, fork, takeLatest, put, call } from "redux-saga/effects";
import {
  loginUser,
  loginUserSucces,
  loginUserFail,
  reloginUser,
  reLoginUserSucess,
  reLoginUserFail,
  logOutUser,
  logOutUserSuccess,
  signUser,
  signUserSucess,
  signUserFail,
  infoUpdate,
  infoUpdateSucess,
  infoUpdateFail,
} from "../reducer/userReducer";

import UserService from "../services/userService";

function* login(action) {
  try {
    const userInfo = yield call(UserService.prototype.login, action.payload);
    yield put(loginUserSucces(userInfo.info));
    yield action.payload.navigate("/");
  } catch (e) {
    yield put(loginUserFail(new Error("UNKNOWN ERR")));
  }
}
function* relogin(action) {
  try {
    const userInfo = yield call(UserService.prototype.relogin, action.payload);
    yield put(loginUserSucces(userInfo.info));
    yield action.payload.navigate("/");
  } catch (e) {
    yield put(loginUserFail(new Error("UNKNOWN ERR")));
  }
}
function* logout(action) {
  try {
    yield call(UserService.prototype.logout, "test");
    yield put(logOutUserSuccess(action.payload.action));
    yield action.payload.navigate("/join");
  } catch (e) {
    console.log(e);
  }
}
