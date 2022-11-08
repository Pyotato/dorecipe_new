import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga";
import logger from "redux-logger";
import { rootReducer } from "../reducer";

const sagaMiddleware = createSagaMiddleware();

const store = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === "development",
    middleware:
      process.env.NODE_ENV === "production"
        ? [sagaMiddleware]
        : [sagaMiddleware, logger],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};
export default store;
