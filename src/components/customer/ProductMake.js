import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UrlImage } from "../../url";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { getProductCategory } from "../../axios/services";

const URL_IMAGE = UrlImage();
const ProductMakeup = () => {
  const { category_id } = useParams();
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const { listCategorySkincare, listCategoryMakeup } = useSelector(
    (state) => state.customer.category
  );

  useEffect(() => {
    fetchAllProduct(page);
  }, [page, category_id]);

  const fetchAllProduct = async (page) => {
    try {
      let res = await getProductCategory(category_id, page);
      setListProduct(res.data.products);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = async (e) => {
    setPage(e.selected + 1);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <h3>DANH MỤC</h3>
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
                              <Link to={`/detail/${item.id}`}>
                                <img
                                  width={"100%"}
                                  src={URL_IMAGE + item.image}
                                  alt=""
                                />
                              </Link>
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
                    <ReactPaginate
                      nextLabel=" >"
                      onPageChange={(e) => handlePageClick(e)}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageCount={totalPage}
                      previousLabel="< "
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      activeClassName="active"
                      renderOnZeroPageCount={null}
                    />
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
