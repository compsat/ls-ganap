import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import axios from "axios";

import "reset-css";
import "style/style-global";
import AppContainer from "./containers/AppContainer";
import rootReducer from "reducers";
import registerServiceWorker from "registerServiceWorker";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
