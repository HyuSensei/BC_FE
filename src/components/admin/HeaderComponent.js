import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { SmileOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { authLoginAdmin } from "../../redux/silce/admin/authSlice";

export default function HeaderComponent() {
  const dispatch = useDispatch();
  const { dataAdmin } = useSelector((state) => state.admin.auth);
  useEffect(() => {
    dispatch(authLoginAdmin());
  }, []);
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand style={{ fontWeight: "bold" }}>
            ADMIN SKINLELE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {dataAdmin && dataAdmin.name && (
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  <SmileOutlined
                    style={{ fontSize: "20px", color: "#3b71ca" }}
                  />{" "}
                  Xin Chào - {dataAdmin.name}
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
