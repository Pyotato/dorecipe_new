// import { createSlice } from "@reduxjs/toolkit";

// import {
//   REGISTER_SUCCESS,
//   REGISTER_FAIL,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT,
//   REFRESH_TOKEN,
// } from "../actions/types";

// const user = JSON.parse(localStorage.getItem("user"));

// // const initialState = user
// //   ? { isLoggedIn: true, user }
// //   : { isLoggedIn: false, user: null };

// export const authReducer = createSlice({
//   name: user,
//   initialState: {
//     isLoggedIn: false,
//     user: null,
//   },
//   reducers: {
//     REGISTER_SUCCESS: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//     },
//     REGISTER_FAIL: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//     },
//     LOGIN_SUCCESS: (state, action) => {
//       state.isLoggedIn = true;
//       state.user = action.payload;
//     },
//     LOGIN_FAIL: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//     },
//     LOGOUT: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//     },
//     REFRESH_TOKEN: (state, action) => {
//       state.isLoggedIn = false;
//       state.user = { ...user, accessToken: action.payload };
//     },
//   },
// });
