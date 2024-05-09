import React, { useState, useEffect } from "react";
import { getProductAdmin } from "../../axios/services";
import { useDispatch, useSelector } from "react-redux";
import { UrlImage } from "../../url";
import ModalAddProduct from "../../components/admin/ModalAddProduct";
import ModalEditProduct from "../../components/admin/ModalEditProduct";
import { handleDeleteProduct } from "../../redux/silce/admin/productSlice";
import { useNavigate } from "react-router-dom";
import { Table, Pagination, Button, Popconfirm, message } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import LayoutComponent from "../../components/admin/LayoutComponent";

const ProductManage = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [listProduct, setListProduct] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [productEdit, setProductEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const deleteProduct = useSelector(
    (state) => state.admin.product.deleteProduct
  );
  const updateProduct = useSelector(
    (state) => state.admin.product.updateProduct
  );
  const storeProduct = useSelector((state) => state.admin.product.storeProduct);
  const isAuth = useSelector((state) => state.admin.auth.isAuth);
  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/admin");
    }
    fetchAllProduct();
  }, [page, pageSize, deleteProduct, updateProduct, storeProduct, isAuth]);

  const fetchAllProduct = async () => {
    try {
      setIsLoading(true);
      const res = await getProductAdmin({ page, limit: pageSize });
      setListProduct(res.data.products);
      setTotalPage(res.data.total_page);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowModalAdd(false);
  };
  const handleCloseEdit = () => {
    setShowModalEdit(false);
  };

  const displayAdd = () => {
    setShowModalAdd(true);
  };

  const showEdit = (product) => {
    setShowModalEdit(true);
    setProductEdit(product);
  };

  const deleteClick = (product_id) => {
    dispatch(handleDeleteProduct(product_id)).then((res) => {
      if (res.payload && res.payload.success === true) {
        message.success("Xóa sản phẩm thành công");
      }
      if (res.payload && res.payload.detail) {
        message.warning(`${res.payload.detail}`);
      }
    });
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => {
        const displayIndex = (page - 1) * pageSize + index + 1;
        return <p>{displayIndex}</p>;
      },
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => {
        return <img width={"100px"} src={URL_IMAGE + text} alt="" />;
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => <p>{text.toLocaleString("vi-VN")} đ</p>,
    },
    {
      title: "Danh Mục",
      dataIndex: "CategoryId",
      key: "CategoryId",
      render: (text) => {
        if (text === 1) return <p>Tẩy Trang</p>;
        if (text === 2) return <p>Sữa Rửa Mặt</p>;
        if (text === 3) return <p>Serum</p>;
        if (text === 4) return <p>Kem Chống Nắng</p>;
        if (text === 5) return <p>Mắt</p>;
        if (text === 6) return <p>Mặt</p>;
        if (text === 7) return <p>Môi</p>;
      },
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (_, record) => (
        <>
          <Popconfirm
            title="Xác nhận xóa sản phẩm"
            description="Bạn có muốn xóa sản phẩm này không ?"
            onConfirm={() => deleteClick(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              style={{
                marginRight: "30x",
                fontSize: "20px",
                cursor: "pointer",
                color: "#883731",
              }}
            />
          </Popconfirm>{" "}
          <EyeOutlined
            onClick={() => showEdit(record)}
            style={{ fontSize: "20px", cursor: "pointer", color: "#d3bb75" }}
          />
        </>
      ),
    },
  ];

  return (
    <LayoutComponent>
      <h5 style={{ marginBottom: "30px" }}>DANH SÁCH SẢN PHẨM</h5>
      <ModalAddProduct
        setShowModalAdd={setShowModalAdd}
        showModalAdd={showModalAdd}
        handleClose={handleClose}
      />
      <ModalEditProduct
        setShowModalEdit={setShowModalEdit}
        showModalEdit={showModalEdit}
        handleCloseEdit={handleCloseEdit}
        productEdit={productEdit}
      />
      <Button
        onClick={displayAdd}
        style={{ marginBottom: "20px" }}
        type="primary"
      >
        THÊM SẢN PHẨM MỚI
      </Button>
      <Table
        scroll={{ x: true }}
        loading={isLoading}
        columns={columns}
        dataSource={listProduct}
        pagination={false}
      />
      <div style={{ marginTop: "30px" }}>
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
    </LayoutComponent>
  );
};
export default ProductManage;
