import React, { useEffect, useState } from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { getProductDetail } from "../../redux/silce/customer/productSilce";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { UrlImage } from "../../url";
import { FaStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { addTocartDetail } from "../../redux/silce/customer/cartSlice";
import { FaUserCircle } from "react-icons/fa";
import { Image, Spin } from "antd";

const ProductDetail = () => {
  const URL_IMAGE = UrlImage();
  let { product_id } = useParams();
  const dispatch = useDispatch();
  const { rate, productDetail, countRate, countStar } = useSelector(
    (state) => state.customer.product
  );

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    dispatch(getProductDetail(product_id));
  }, []);

  const addTocartClick = (product, cartQuantity) => {
    let product_cart = { ...product, cartQuantity: cartQuantity };
    dispatch(addTocartDetail(product_cart));
    setQuantity(1);
  };

  const displayRate = (rate) => {
    let starContent;
    switch (rate) {
      case 1:
        starContent = (
          <div>
            <FaStar style={{ color: "#e3c01c" }} />
          </div>
        );
        break;
      case 2:
        starContent = (
          <div>
            <FaStar style={{ color: "#e3c01c" }} />
            <FaStar style={{ color: "#e3c01c" }} />
            <FaStar style={{ color: "#e3c01c" }} />
            <FaStar style={{ color: "#e3c01c" }} />
            <FaStar style={{ color: "#e3c01c" }} />
          </div>
        );
        break;
      case 3:
        starContent = (
          <div>
            <FaStar style={{ color: "#e3c01c" }} />
            <FaStar style={{ color: "#e3c01c" }} />
            <FaStar style={{ color: "#e3c01c" }} />
          </div>
        );
        break;
      case 4:
        starContent = (
          <div>
            <FaStar style={{ color: "#e3c01c" }} />
            <FaStar style={{ color: "#e3c01c" }} />
            <FaStar style={{ color: "#e3c01c" }} />
            <FaStar style={{ color: "#e3c01c" }} />
          </div>
        );
        break;
      case 5:
        starContent = (
          <div>
            <FaStar style={{ color: "#e3c01c" }} />
            <FaStar style={{ color: "#e3c01c" }} />
            <FaStar style={{ color: "#e3c01c" }} />
            <FaStar style={{ color: "#e3c01c" }} />
            <FaStar style={{ color: "#e3c01c" }} />
          </div>
        );
        break;
      default:
        starContent = <div>Invalid star value</div>;
        break;
    }

    return <div>{starContent}</div>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);
    return `${day}/${month}/${year}`;
  };

  if (!productDetail || !countStar) {
    const contentStyle = {
      padding: 50,
      background: "rgba(0, 0, 0, 0.05)",
      borderRadius: 4,
    };
    const content = <div style={contentStyle} />;
    return (
      <Spin tip="Loading" size="small">
        {content}
      </Spin>
    );
  }

  return (
    <>
      <div
        style={{ marginBottom: "50px", marginTop: "20px" }}
        className="container"
      >
        <h5>
          CHI TIẾT SẢN PHẨM
        </h5>
        <div className="row">
          <div className="col-6">
            <div style={{ width: "60%" }}>
              <MDBCarousel showControls>
                <MDBCarouselItem itemId={1}>
                  <Image width={400} src={URL_IMAGE + productDetail.image} />
                </MDBCarouselItem>
                <MDBCarouselItem itemId={2}>
                  <Image width={400} src={URL_IMAGE + productDetail.image} />
                </MDBCarouselItem>
                <MDBCarouselItem itemId={3}>
                  <Image width={400} src={URL_IMAGE + productDetail.image} />
                </MDBCarouselItem>
              </MDBCarousel>
            </div>
          </div>
          <div className="col-6">
            <div>
              <p style={{ fontSize: "20px" }}>{productDetail.name}</p>
            </div>
            <div>
              <p
                style={{
                  fontWeight: "bold",
                  color: "#883731 ",
                  fontSize: "18px",
                }}
              >
                {productDetail.price.toLocaleString("vi-VN")} đ
              </p>
            </div>
            <div>
              <p
                style={{
                  marginBottom: "10xp",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Mô tả:
              </p>
              <p style={{ textAlign: "justify", fontSize: "15px" }}>
                {productDetail.description}
              </p>
            </div>
            <div
              style={{
                marginBottom: "10xp",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Số lượng:
            </div>
            <div>
              <input
                style={{ width: "10%" }}
                className="form-control"
                type="number"
                min="1"
                max="100"
                step="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </div>
            <div style={{ marginTop: "10px", fontSize: "18px" }}>
              (Đánh giá: {countRate} lượt)
            </div>
            <div>
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
              {countStar.fine})
            </div>
            <div>
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
              {countStar.four})
            </div>
            <div>
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
              {countStar.three})
            </div>
            <div>
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
              {countStar.two})
            </div>
            <div>
              <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
              {countStar.one})
            </div>
            <div style={{ marginTop: "20px" }}>
              <button
                style={{
                  backgroundColor: "#883731 ",
                  borderColor: "#883731 ",
                }}
                type="button"
                className="btn btn-primary"
                onClick={() => addTocartClick(productDetail, quantity)}
              >
                <FaCartShopping /> Thêm giỏ hàng
              </button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "80px" }} className="container">
          <h5 style={{ marginBottom: "40px", color: "gray" }}>
            ĐÁNH GIÁ SẢN PHẨM
          </h5>
          {rate && rate.length > 0 ? (
            rate.map((item, index) => {
              return (
                <div key={`rate-${index}`}>
                  <div>
                    <FaUserCircle style={{ fontSize: "40px" }} />{" "}
                    {item.User.name}
                  </div>
                  <div style={{ marginLeft: "40px" }}>
                    <div>{formatDate(item.createdAt)}</div>
                    <div>{displayRate(item.star)}</div>
                    <p style={{ fontSize: "18px" }}>{item.comment}</p>
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <div style={{ fontSize: "18px", color: "gray" }}>
              Sản phẩm chưa có đánh giá !
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ProductDetail;
