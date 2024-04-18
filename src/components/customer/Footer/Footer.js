import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "../../../assets/customer/images/logo2.png";

const Footer = () => {
  return (
    <>
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div>
            <span style={{ textAlign: "center" }}></span>
          </div>
        </section>
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <img src={logo} alt="" />
                <p>Đem lại sự tự tin cho phái đẹp !</p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Chăm Sóc Da</h6>
                <p>Sữa Rửa Mặt</p>
                <p>Tẩy Trang</p>
                <p>Kem Chống Nắng</p>
                <p>Serum</p>
                <p>Kem Dưỡng</p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">TRANG ĐIỂM</h6>
                <p>Mắt</p>
                <p>Mặt</p>
                <p>Môi</p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">LIÊN HỆ</h6>
                <p>
                  <MDBIcon color="secondary" icon="home" className="me-2" />
                  Đường 422- Cát Quế- Hoài Đức- Hà Nội
                </p>
                <p>
                  <MDBIcon color="secondary" icon="envelope" className="me-3" />
                  skinlele@gmail.com
                </p>
                <p>
                  <MDBIcon color="secondary" icon="phone" className="me-3" />{" "}
                  0986538387
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </MDBFooter>
    </>
  );
};
export default Footer;
