import React from "react";
import ReactDOM from "react-dom/client";
import AppRoute from "./route";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/styles/tailwind.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppRoute />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
