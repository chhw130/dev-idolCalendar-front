import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";

import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
const Client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  /**리액트 redux provider store저장소 참조시켜주기 */

  <Provider store={store}>
    <QueryClientProvider client={Client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

reportWebVitals();
