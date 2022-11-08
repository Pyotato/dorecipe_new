import { combineReducers } from "redux";
import UserState from "./auth.js";
import Message from "./message.js";

export default combineReducers({
  auth: UserState,
  message: Message,
});
