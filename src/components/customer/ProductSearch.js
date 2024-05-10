import React, { useEffect, useState } from "react";
import { UrlImage } from "../../url";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getProductSearch } from "../../axios/services";
import { Image, Pagination, Spin } from "antd";

const URL_IMAGE = UrlImage();
const ProductSearch = () => {
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPage, setTotalPage] = useState(0);
  const location = useLocation();
  let name = new URLSearchParams(location.search).get("name");

  const fetchProductSearch = async (page) => {
    try {
      let res = await getProductSearch({ name, page, limit: pageSize });
      setListProduct(res.data.products);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProductSearch(page);
  }, [page, name, pageSize]);

  if (listProduct.length === 0) {
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
        SẢN PHẨM CẦN TÌM
      </h3>

      {listProduct && listProduct.length > 0 ? (
        <>
          <div className="row">
            {listProduct.map((item, index) => {
              return (
                <div
                  key={`product-${index}`}
                  style={{ marginBottom: "50px" }}
                  className="col-3"
                >
                  <div>
                    <Image
                      style={{ width: "100%" }}
                      src={URL_IMAGE + item.image}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        overflow: "hidden",
                        maxHeight: "2.8em",
                        lineHeight: "1.4em",
                        textAlign: "center",
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
        </>
      ) : (
        <>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h4>Không tìm thấy sản phẩm</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSearch;
