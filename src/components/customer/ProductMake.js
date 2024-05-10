import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UrlImage } from "../../url";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getProductCategory } from "../../axios/services";
import { Image, Spin, Pagination } from "antd";

const URL_IMAGE = UrlImage();
const ProductMakeup = () => {
  const { category_id } = useParams();
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPage, setTotalPage] = useState(0);
  const { listCategorySkincare, listCategoryMakeup } = useSelector(
    (state) => state.customer.category
  );

  useEffect(() => {
    fetchAllProduct(page);
  }, [page, category_id, pageSize]);

  const fetchAllProduct = async () => {
    try {
      let res = await getProductCategory({
        category_id,
        page,
        limit: pageSize,
      });
      setListProduct(res.data.products);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };

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
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <h5>DANH MỤC</h5>
            <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
              CHĂM SÓC DA
            </div>
            {listCategorySkincare &&
              listCategorySkincare.length > 0 &&
              listCategorySkincare.map((item, index) => {
                return (
                  <Link
                    to={`/category_skincare/${item.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <p
                      style={{
                        marginLeft: "20px",
                        color: "black",
                      }}
                      key={`category-skincare-${index}`}
                    >
                      {item.name}
                    </p>
                  </Link>
                );
              })}

            <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
              TRANG ĐIỂM
            </div>
            {listCategoryMakeup &&
              listCategoryMakeup.length > 0 &&
              listCategoryMakeup.map((item, index) => {
                return (
                  <Link
                    to={`/category_makeup/${item.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <p
                      style={{
                        marginLeft: "20px",
                        color: "black",
                      }}
                      key={`category-makeup-${index}`}
                    >
                      {item.name}
                    </p>
                  </Link>
                );
              })}
          </div>
          <div className="col-9">
            <div>
              <img
                width={"100%"}
                src={
                  "https://file.hstatic.net/1000006063/collection/makeup_trendy_ef942aa7ddcc473e83e1f5fabed4c5cf.png"
                }
                alt=""
              />
              <div
                style={{ marginTop: "40px", marginBottom: "40px" }}
                className="container"
              >
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
                              <p
                                style={{ color: "#883731", fontWeight: "bold" }}
                              >
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
                      <h4>Không có sản phẩm !</h4>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductMakeup;
