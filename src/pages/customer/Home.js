import React from "react";
import Header from "../../components/customer/Header/Header";
import Banner from "../../components/customer/Banner";
import ProductHome from "../../components/customer/ProductHome";
import Footer from "../../components/customer/Footer/Footer";
import Stack from "react-bootstrap/Stack";

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <ProductHome />
      <Footer />
    </>
  );
};
export default Home;
