import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { UrlImage } from "../../url";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import {
  removeCart,
  decreaseCart,
  addTocart,
  getTotal,
} from "../../redux/silce/customer/cartSlice";
import Order from "./Order";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import {
  CloseCircleOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

const CartItem = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.customer.cart.cartItem);
  const cartTotalAmount = useSelector(
    (state) => state.customer.cart.cartTotalAmount
  );

  const removeCartClick = (product) => {
    dispatch(removeCart(product));
  };

  const decreaseCartClick = (product) => {
    dispatch(decreaseCart(product));
  };

  const increaseCartClick = (product) => {
    dispatch(addTocart(product));
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [cart]);

  const columns = [
    {
      title: "Sản phẩm",
      key: "image",
      dataIndex: "image",
      render: (text) => {
        return <img width={"120px"} src={URL_IMAGE + text} alt="" />;
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "cartQuantity",
      key: "cartQuantity",
      render: (text, record, _) => {
        return (
          <>
            <PlusCircleOutlined
              onClick={() => {
                increaseCartClick(record);
              }}
              style={{
                fontSize: "25px",
                marginRight: "15px",
                color: "#3c763d",
                cursor: "pointer",
              }}
            />
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>{text}</span>
            <MinusCircleOutlined
              onClick={() => {
                decreaseCartClick(record);
              }}
              style={{
                fontSize: "25px",
                marginLeft: "15px",
                color: "#3c763d",
                cursor: "pointer",
              }}
            />
          </>
        );
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <p style={{ color: "#820813", fontWeight: "bold" }}>
          {text.toLocaleString("vi-VN")} đ
        </p>
      ),
    },
    {
      title: "Xóa",
      key: "delete",
      render: (_, record) => (
        <CloseCircleOutlined
          onClick={() => removeCartClick(record)}
          style={{ fontSize: "25px", color: "#923731", cursor: "pointer" }}
        />
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: "100px" }} className="container">
        <h5 style={{ marginBottom: "20px" }}>GIỎ HÀNG CỦA BẠN</h5>
        <Table
          scroll={{ x: true }}
          columns={columns}
          dataSource={cart}
          pagination={false}
        />
        <Order />
      </div>
    </>
  );
};
export default CartItem;
