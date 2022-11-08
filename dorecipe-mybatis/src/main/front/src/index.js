import { React } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals.js";
// import createStore from "./store/store";/
import setupInterceptors from "./reduxRefresh/services/setupInterceptors";
import { Provider } from "react-redux";
import store from "./reduxRefresh/store";

// const store = createStore();/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

setupInterceptors(store);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
