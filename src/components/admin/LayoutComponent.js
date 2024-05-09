import React, { useMemo } from "react";
import { Layout, theme } from "antd";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import SideBarComponent from "./SibarComponent";
const { Content, Footer } = Layout;
export default function LayoutComponent({ children }) {
  const memoizedSidebar = useMemo(() => <SideBarComponent />, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {memoizedSidebar}
      <Layout>
        <HeaderComponent />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer>
          <FooterComponent />
        </Footer>
      </Layout>
    </Layout>
  );
}
