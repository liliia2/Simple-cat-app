import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory, History } from "history";
import { Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import { store } from "./store/store";
import "antd/dist/antd.css";
import "./index.css";

const customHistory = createBrowserHistory() as History;

ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
