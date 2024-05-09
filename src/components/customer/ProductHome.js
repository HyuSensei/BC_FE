import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductHome } from "../../redux/silce/customer/productSilce";
import { UrlImage } from "../../url";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Image, Spin, Pagination } from "antd";
import { fetchAllProduct } from "../../axios/services";

const URL_IMAGE = UrlImage();
const ProductHome = () => {
  const navigate = useNavigate();
  // const listProduct = useSelector(
  //   (state) => state.customer.product.listProduct
  // );
  // const dispatch = useDispatch();
  const [listProduct, setListProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPage, setTotalPage] = useState(0);
  const fetchAll = async () => {
    try {
      let res = await fetchAllProduct({
        page,
        limit: pageSize,
      });
      setListProduct(res.data.products);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [page, pageSize]);

  if (!listProduct || listProduct.length === 0) {
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
    <div
      style={{ marginTop: "40px", marginBottom: "40px" }}
      className="container"
    >
      <h3 style={{ marginBottom: "20px", color: "gray", textAlign: "center" }}>
        SẢN PHẨM NỔI BẬT
      </h3>
      <div className="row">
        {listProduct.map((item, index) => {
          return (
            <div
              key={`product-${index}`}
              style={{ marginBottom: "50px" }}
              className="col-3"
            >
              <div>
                <Image style={{ width: "100%" }} src={URL_IMAGE + item.image} />
              </div>
              <div>
                <p
                  style={{
                    overflow: "hidden",
                    maxHeight: "2.8em",
                    lineHeight: "1.4em",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/detail/${item.id}`)}
                >
                  {item.name}
                </p>
              </div>
              <div>
                <FaStar style={{ color: "#e3c01c" }} />
                <FaStar style={{ color: "#e3c01c" }} />
                <FaStar style={{ color: "#e3c01c" }} />
                <FaStar style={{ color: "#e3c01c" }} />
                <FaStar style={{ color: "#e3c01c" }} />
              </div>
              <div>
                <p style={{ color: "#883731", fontWeight: "bold" }}>
                  {item.price.toLocaleString("vi-VN")} đ
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {listProduct.length > 0 && (
        <Pagination
          onChange={(pageValue, _) => {
            setPage(pageValue);
          }}
          onShowSizeChange={(_, size) => {
            setPageSize(size);
          }}
          current={page}
          pageSize={pageSize}
          total={totalPage * pageSize}
        />
      )}
    </div>
  );
};

export default ProductHome;
