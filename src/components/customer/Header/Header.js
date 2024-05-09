import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../../assets/customer/images/logoskinlele.PNG";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, logout } from "../../../redux/silce/customer/authSilce";
import { toast } from "react-toastify";
import { IoBagHandle } from "react-icons/io5";
import { getTotal } from "../../../redux/silce/customer/cartSlice";
import { fetchAllCategory } from "../../../redux/silce/customer/categorySlice";
import SearchInput from "../SearchInput";
import { Badge, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.customer.auth.isAuthSucess);
  const userLogin = useSelector((state) => state.customer.auth.dataUser);
  const { listCategorySkincare, listCategoryMakeup } = useSelector(
    (state) => state.customer.category
  );
  const { cartTotalQuantity, cartItem } = useSelector(
    (state) => state.customer.cart
  );
  const navigatePage = (page) => {
    navigate(page);
  };
  useEffect(() => {
    dispatch(getTotal());
    dispatch(fetchAllCategory());
    dispatch(authLogin());
  }, [cartItem]);
  const logoutClick = () => {
    dispatch(logout()).then((result) => {
      if (result.payload.success && result.payload.success === true) {
        toast.success(`${result.payload.message}`);
        navigate("/login");
      }
    });
  };
  return (
    <>
      <div
        className="container-fluid"
        style={{ backgroundColor: "#4e7661", height: "50px" }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            paddingTop: "10px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Chào Mừng Đến Với SkinLeLe
        </p>
      </div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container style={{ backgroundColor: "white", borderRadius: "50px" }}>
          <Navbar.Brand href="">
            <img width={"100px"} height={"50px"} src={logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigatePage("/")}>Trang Chủ</Nav.Link>
              <NavDropdown title="Trang Điểm" id="collapsible-nav-dropdown">
                {listCategoryMakeup &&
                  listCategoryMakeup.length > 0 &&
                  listCategoryMakeup.map((item, index) => {
                    return (
                      <NavDropdown.Item
                        onClick={() =>
                          navigatePage(`/category_makeup/${item.id}`)
                        }
                        key={`category-skincare-${index}`}
                      >
                        {item.name}
                      </NavDropdown.Item>
                    );
                  })}
              </NavDropdown>
              <NavDropdown title="Chăm sóc da" id="collapsible-nav-dropdown">
                {listCategorySkincare &&
                  listCategorySkincare.length > 0 &&
                  listCategorySkincare.map((item, index) => {
                    return (
                      <NavDropdown.Item
                        onClick={() =>
                          navigatePage(`/category_skincare/${item.id}`)
                        }
                        key={`category-makeup-${index}`}
                      >
                        {item.name}
                      </NavDropdown.Item>
                    );
                  })}
              </NavDropdown>
              <Nav.Link href="">Liên Hệ</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <Badge color="#923731" count={cartTotalQuantity}>
                  <IoBagHandle
                    onClick={() => navigatePage("/cart")}
                    style={{ fontSize: "35px", color: "#4e7661 " }}
                  />
                </Badge>
              </Nav.Link>
              {isAuth && isAuth.success === true ? (
                <>
                  <NavDropdown
                    style={{ marginRight: "20px" }}
                    title={
                      <Avatar
                        style={{
                          backgroundColor: "#87d068",
                        }}
                        icon={<UserOutlined />}
                      />
                    }
                    id="collapsible-nav-dropdown"
                  >
                    {userLogin && userLogin.name && (
                      <NavDropdown.Item>
                        Hello ! {userLogin.name}
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item
                      onClick={() =>
                        navigatePage(`/order_wait/${userLogin.id}`)
                      }
                    >
                      Đơn Hàng
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => logoutClick()}>
                      Đăng Xuất
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <NavDropdown title="Tài Khoản" id="collapsible-nav-dropdown">
                    <NavDropdown.Item onClick={() => navigatePage("/login")}>
                      Đăng Nhập
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigatePage("/register")}>
                      Đăng Ký
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SearchInput />
    </>
  );
};

export default Header;
