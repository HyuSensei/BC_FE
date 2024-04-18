import banner1 from "../../assets/customer/images/banner1.png";
import banner2 from "../../assets/customer/images/banner2.png";
import banner3 from "../../assets/customer/images/banner3.png";
import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

const Banner = () => {
  return (
    <>
      <MDBCarousel showControls>
        <MDBCarouselItem itemId={1}>
          <img src={banner1} className="d-block w-100" alt="..." />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2}>
          <img src={banner2} className="d-block w-100" alt="..." />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={3}>
          <img src={banner3} className="d-block w-100" alt="..." />
        </MDBCarouselItem>
      </MDBCarousel>
    </>
  );
};
export default Banner;
