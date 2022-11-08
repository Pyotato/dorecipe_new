import { createSlice } from "@reduxjs/toolkit";
export const userReducer = createSlice({
  name: "user",
  initialState: {
    userInfo: null, //로그인/회원가입한 유저 정보 담기
    isLoading: false, //로딩여부
    isDone: false, //완료 여부
    error: null, //에러 메세지
  },
  reducers: {
    loginUser: (state) => {
      //로그인 시도
      state.isLoading = true;
      state.isDone = true;
      state.error = null;
    },
    loginUserSucces: (state, action) => {
      //로그인 성공
      state.isLoading = false;
      state.isDone = true;
      state.error = action.payload;
    },
    loginUserFail: (state, action) => {
      //로그인 실패
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },
  },
  /** 다시 로그인 시도 */
  reloginUser: (state) => {
    state.isLoading = true;
    state.isDone = false;
    state.error = null;
  },
  reLoginUserSucess: (state, action) => {
    state.isLoading = false;
    state.isDone = false;
    state.userInfo = action.payload;
  },
  reLoginUserFail: (state, action) => {
    state.isLoading = false;
    state.isDone = true;
    state.userInfo = action.error;
  },

  /** 로그아웃 */
  logOutUser: (state) => {
    state.isLoading = true;
    state.isDone = false;
    state.error = null;
  },
  logOutUserSuccess: (state) => {
    state.isLoading = false;
    state.isDone = true;
    state.userInfo = null;
  },

  /**회원가입 */
  signUser: (state) => {
    state.isLoading = true;
    state.isDone = false;
    state.error = null;
  },
  /**회원가입 성공사 */
  signUserSucess: (state) => {
    state.isLoading = false;
    state.isDone = true;
  },
  signUserFail: (state, action) => {
    state.isLoading = false;
    state.isDone = true;
    state.error = action.error;
  },

  //로그인한 회원의 개인정보 수정
  infoUpdate: (state) => {
    state.isLoading = true; ////고친부분
    state.isDone = false; ////고친부분
  },
  infoUpdateSucess: (state, action) => {
    state.isLoading = false;
    state.isDone = true;
    state.userInfo = action.payload;
  },
  infoUpdateFail: (state, action) => {
    state.isLoading = false;
    state.isDone = true;
    state.userInfo = action.error;
  },
});
export const {
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
} = userReducer.actions;
