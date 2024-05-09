import React from "react";
import "./Cancel.css";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

export default function Cancel() {
  const navigate = useNavigate();
  return (
    <Result
      status="error"
      title="Thanh toán không thành công"
      subTitle="Khách hàng vui lòng kiểm tra lại thông tin thanh toán"
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
