import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/customer/Home";
import Login from "../pages/customer/Login";
import Register from "../pages/customer/Register";
import Detail from "../pages/customer/Detail";
import Cart from "../pages/customer/Cart";
import OrderWait from "../pages/customer/OrderWait";
import OrderShip from "../pages/customer/OrderShip";
import OrderComplete from "../pages/customer/OrderComplete";
import OrderCancel from "../pages/customer/OrderCancel";
import Search from "../pages/customer/Search";
import CategorySkincare from "../pages/customer/CategorySkincare";
import CategoryMakeup from "../pages/customer/CategoryMakeup";
import Rate from "../pages/customer/Rate";
import NotFound from "../pages/404";
import OrderSuccess from "../pages/customer/OrderSuccess";
import CancelPage from "../pages/customer/CancelPage";
import OrderHistory from "../pages/customer/OrderHistory";

const CustomerRoute = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/detail/:product_id" element={<Detail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order_wait/:user_id" element={<OrderWait />} />
      <Route path="/order_ship/:user_id" element={<OrderShip />} />
      <Route path="/order_complete/:user_id" element={<OrderComplete />} />
      <Route path="/order_cancel/:user_id" element={<OrderCancel />} />
      <Route path="/order_history/:user_id" element={<OrderHistory />} />
      <Route path="/search" element={<Search />} />
      <Route
        path="/category_skincare/:category_id"
        element={<CategorySkincare />}
      />
      <Route
        path="/category_makeup/:category_id"
        element={<CategoryMakeup />}
      />
      <Route path="/rate" element={<Rate />} />
      <Route path="/order_success" element={<OrderSuccess />} />
      <Route path="/order_failed" element={<CancelPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CustomerRoute;
