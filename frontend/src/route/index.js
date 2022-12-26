import { Route, Routes } from "react-router-dom";
import Path from "./Path";
import Home from "../pages/home";
import UserInfo from "../pages/userInfo";
import UserEdit from "../pages/userInfo/components/UserEdit";
import UserProducts from "../pages/user-products";
import { Login, Signup } from "../pages/login";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";

export default function AppRoute() {
  return (
    <Routes>
      <Route path={Path.home} element={<Home />} />
      <Route path={Path.login} element={<Login />} />
      <Route path={Path.signup} element={<Signup />} />
      <Route path={Path.userInfo} element={<UserInfo />} />
      <Route path={Path.userProducts} element={<UserProducts />} />
      <Route path={Path.userEdit} element={<UserEdit />} />
      <Route path={Path.cart} element={<Cart />} />
      <Route path={Path.checkOut} element={<Checkout />} />
    </Routes>
  );
}
