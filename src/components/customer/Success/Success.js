import React, { useEffect } from "react";
import "./Success.css";
import { FaRegFaceKissWinkHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/silce/customer/cartSlice";
import { Button, Result } from "antd";

export default function Success() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, []);
  return (
    <Result
      status="success"
      title="Đặt hàng thành công !"
      subTitle="Đơn hàng của bạn sẽ sớm được vận chuyển, vui lòng kiểm tra trạng thái đơn hàng để biết được thông tin nhận hàng"
      extra={[
        <Button onClick={() => navigate("/")} type="primary" key="console">
          Home
        </Button>,
        <Button onClick={() => navigate("/cart")} key="buy">
          Mua hàng
        </Button>,
      ]}
    />
  );
}
