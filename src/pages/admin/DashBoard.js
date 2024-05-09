import React, { useEffect, useMemo, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { HiMiniArchiveBox } from "react-icons/hi2";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHome } from "../../redux/silce/admin/orderSlice";
import { getOrderAdmin } from "../../axios/services";
import { useNavigate } from "react-router-dom";
import LayoutComponent from "../../components/admin/LayoutComponent";
import { Table, Tag, Tooltip, Pagination } from "antd";

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [listOrder, setListOrder] = useState([]);
  const dataDashBoard = useSelector((state) => state.admin.order.listOrderHome);
  const isAuth = useSelector((state) => state.admin.auth.isAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [arrow, setArrow] = useState("Show");
  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/admin");
    }
    dispatch(getOrderHome({ page, limit: pageSize }));
    fetchAllOrder();
  }, [page, isAuth]);

  const fetchAllOrder = async () => {
    try {
      setIsLoading(true);
      const res = await getOrderAdmin({ page, limit: pageSize });
      setIsLoading(false);
      setListOrder(res.data.orders);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
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
      title: "Khách Hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        if (text === 0) {
          return <Tag color={"#fab40a"}>ĐANG CHỜ</Tag>;
        }
        if (text === 1) {
          return <Tag color={"#5bc0de"}>ĐANG GIAO</Tag>;
        }
        if (text === 2) {
          return <Tag color={"#19c37d"}>ĐÃ NHẬN</Tag>;
        }
        if (text === 3) {
          return <Tag color={"#ce1515"}>ĐÃ HỦY</Tag>;
        }
      },
    },
    {
      title: "Thanh Toán",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      render: (text) => <p>{text.toLocaleString("vi-VN")} đ</p>,
    },
  ];
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  return (
    <LayoutComponent>
      <div className="container-fluid">
        <div className="row g-3 my-2">
          <Tooltip
            placement="top"
            title={"Số lượng sản phẩm"}
            arrow={mergedArrow}
          >
            <div className="col-md-3 p-1">
              <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                <div>
                  {dataDashBoard && dataDashBoard.count_product && (
                    <h3 className="fs-2">{dataDashBoard.count_product}</h3>
                  )}
                  <p className="fs-5">Sản Phẩm</p>
                </div>
                <RiShoppingBag3Fill
                  style={{ fontSize: "30px", color: "#19c37d" }}
                />
              </div>
            </div>
          </Tooltip>
          <Tooltip
            placement="top"
            title={"Số lượng đơn hàng"}
            arrow={mergedArrow}
          >
            <div className="col-md-3 p-1">
              <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                <div>
                  {dataDashBoard && dataDashBoard.count_order && (
                    <h3 className="fs-2">{dataDashBoard.count_order}</h3>
                  )}
                  <p className="fs-5">Đơn Hàng</p>
                </div>
                <HiMiniArchiveBox
                  style={{ fontSize: "30px", color: "#d1402c" }}
                />
              </div>
            </div>
          </Tooltip>
          <Tooltip
            placement="top"
            title={"Số lượng đơn hàng đang giao"}
            arrow={mergedArrow}
          >
            <div className="col-md-3 p-1">
              <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                <div>
                  {dataDashBoard && dataDashBoard.count_order_ship && (
                    <h3 className="fs-2">{dataDashBoard.count_order_ship}</h3>
                  )}
                  <p className="fs-5">Đang Giao</p>
                </div>
                <MdLocalShipping
                  style={{ fontSize: "30px", color: "#e3c01c" }}
                />
              </div>
            </div>
          </Tooltip>
          <Tooltip
            placement="top"
            title={"Số lượng lượng người dùng"}
            arrow={mergedArrow}
          >
            <div className="col-md-3 p-1">
              <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                <div>
                  {dataDashBoard && dataDashBoard.count_user && (
                    <h3 className="fs-2">{dataDashBoard.count_user}</h3>
                  )}
                  <p className="fs-5">Người Dùng</p>
                </div>
                <FaRegUserCircle
                  style={{ fontSize: "30px", color: "#5bc0de" }}
                />
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
      <h5 style={{ marginTop: "50px" }}>DANH SÁCH ĐƠN HÀNG</h5>
      <Table
        scroll={{ x: true }}
        loading={isLoading}
        columns={columns}
        dataSource={listOrder}
        pagination={false}
      />
      <div style={{ marginTop: "30px" }}>
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
      </div>
    </LayoutComponent>
  );
};

export default DashBoard;
