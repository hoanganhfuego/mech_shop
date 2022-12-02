import { Route, Routes } from "react-router-dom";
import Path from "./Path";
import Home from "../pages/home";
import UserInfo from "../pages/userInfo"
import { Login, Signup } from "../pages/login";

export default function AppRoute() {
  return (
    <Routes>
      <Route path={Path.home} element={<Home />} />
      <Route path={Path.login} element={<Login />} />
      <Route path={Path.signup} element={<Signup />} />
      <Route path={Path.userInfo} element={<UserInfo />} />
    </Routes>
  );
}
