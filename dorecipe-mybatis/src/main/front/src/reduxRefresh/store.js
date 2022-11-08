// import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import logger from "redux-logger";
// const middleware = [thunk];

// const store = configureStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

const store = () => {
  const createStore = configureStore(
    {
      reducer: rootReducer,
      middleware: [thunk, logger],

      //   middleware: middleware,
    }
    // applyMiddleware()
  );
  return createStore;
};

export default store;
