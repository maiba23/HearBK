import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import cx from "classnames";
import * as serviceWorker from "./serviceWorker";
import Router from "./routes";
import store from "./state/store";
import "antd/dist/antd.css";
import "./style.scss";
import "./scss/common.styles.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initMixpanel } from "./mixpanel";
import LogRocket from "logrocket";

toast.configure({
  autoClose: 4000,
  draggable: false,
  position: toast.POSITION.TOP_LEFT,
});

initMixpanel();

const App = () => {
  LogRocket.init("v9ooyp/breaker-nation");
  window.onbeforeunload = () => {
    localStorage.removeItem("access-token-verified");
  };
  return (
    <main className={cx("mainContainer")}>
      <Provider store={store}>
        <Router />
      </Provider>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
