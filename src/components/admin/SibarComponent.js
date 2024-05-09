import React, { useState } from "react";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  ProductOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import logo from "../../assets/customer/images/logo2.png";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../redux/silce/admin/authSlice";
import { useDispatch } from "react-redux";
const { Sider } = Layout;

const SideBarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutClick = () => {
    dispatch(logoutAdmin()).then((res) => {
      if (res.payload && res.payload.success === true) {
        navigate("/admin");
      }
    });
  };
  const items = [
    {
      key: "menu1",
      icon: <DashboardOutlined style={{ fontSize: "18px" }} />,
      label: "DASHBOARD",
    },
    {
      key: "menu2",
      icon: <ShoppingCartOutlined style={{ fontSize: "18px" }} />,
      label: "ĐƠN HÀNG",
    },
    {
      key: "menu3",
      icon: <ProductOutlined style={{ fontSize: "18px" }} />,
      label: "SẢN PHẨM",
    },
    {
      key: "menu4",
      icon: <LogoutOutlined style={{ fontSize: "18px" }} />,
      label: "ĐĂNG XUẤT",
    },
  ];
  const handleClick = (item) => {
    if (item.key === "menu1") {
      navigate("/admin/dashboard");
    }
    if (item.key === "menu2") {
      navigate("/admin/orders");
    }
    if (item.key === "menu3") {
      navigate("/admin/products");
    }
    if (item.key === "menu4") {
      logoutClick();
    }
  };
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={210}
      >
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
          }}
          className="container"
        >
          <img
            onClick={() => {
              window.location.href = "/";
            }}
            style={{
              width: "70px",
              borderRadius: "60px",
              cursor: "pointer",
            }}
            src={logo}
            alt=""
          />
        </div>
        <p style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>
          SKINLELE
        </p>
        <Menu theme="dark" mode="inline" onClick={handleClick}>
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </>
  );
};
export default SideBarComponent;
