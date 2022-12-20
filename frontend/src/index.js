import React, { useLayoutEffect } from "react";
import ReactDOM from "react-dom/client";
import AppRoute from "./route";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./assets/styles/index.css";
import "./assets/styles/tailwind.css";

const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Wrapper>
          <AppRoute />
        </Wrapper>
      </Router>
    </PersistGate>
  </Provider>
);
