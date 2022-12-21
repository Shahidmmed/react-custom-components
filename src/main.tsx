import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./core/stores";
import "./index.scss";
import { AppRoutes } from "./components/pages/app_routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);
