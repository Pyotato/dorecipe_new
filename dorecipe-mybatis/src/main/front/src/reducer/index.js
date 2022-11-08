import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { recipeReducer } from "./recipeReducer";
import { messageReducer } from "./messageReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  user: userReducer.reducer,
  recipe: recipeReducer.reducer,
  message: messageReducer.reducer,
  auth: authReducer.reducer,
});
