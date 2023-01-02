import { React } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals.js";
// import createStore from "./store/store";/
import setupInterceptors from "./reduxRefresh/services/setupInterceptors";
import { Provider } from "react-redux";
import store from "./reduxRefresh/store";
import { ThemeProvider } from "./context/themeProvider";
import axios from "axios";

//리액트 쿼리 도입!
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0, useErrorBoundary: true },
    mutations: { useErrorBoundary: true },
  },
});

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "/"
    : process.env.REACT_APP_HOST_DEPlOY;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    {/* ReactQueryDevtools: don't wrap all other components or else won't render */}
    <ReactQueryDevtools initialIsOpen={false} />
    <Provider store={store()}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);

setupInterceptors(store);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
