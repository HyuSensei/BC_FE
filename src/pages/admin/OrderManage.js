import React, { useState, useEffect, useMemo } from "react";
import { getOrder } from "../../axios/services";
import ModalOrder from "../../components/admin/ModalOrder";
import {
  getOrderDetail,
  handleConfirmOrder,
  handleDeleteOrder,
} from "../../redux/silce/admin/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LayoutComponent from "../../components/admin/LayoutComponent";
import { Table, Tag, Pagination, Tooltip } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const OrderManage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccessConfirmOrder, isSuccessDeleteOrder } = useSelector(
    (state) => state.admin.order
  );
  const isAuth = useSelector((state) => state.admin.auth.isAuth);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [listOrder, setListOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataOrder, setDataOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [arrow, setArrow] = useState("Show");
  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/admin");
    }
    fetchAllOrder();
  }, [page, isSuccessConfirmOrder, isSuccessDeleteOrder, isAuth]);

  const fetchAllOrder = async () => {
    try {
      setIsLoading(true);
      const res = await getOrder({ page, limit: pageSize });
      setListOrder(res.data.orders);
      setTotalPage(res.data.total_page);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const OrderDetail = (order) => {
    dispatch(getOrderDetail(order.id)).then((res) => {
      if (res.payload && res.payload.success) {
        setDataOrder(res.payload);
        setShowModal(true);
      }
    });
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const confirmClick = (order_id) => {
    dispatch(handleConfirmOrder(order_id));
  };

  const deleteClick = (order_id) => {
    dispatch(handleDeleteOrder(order_id));
  };
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
      title: "Số Điện Thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => {
        if (text === 0) {
          return (
            <Tooltip
              placement="top"
              title={"Duyệt đơn hàng ngay"}
              arrow={mergedArrow}
            >
              <Tag
                style={{ cursor: "pointer" }}
                onClick={() => confirmClick(record.id)}
                color={"#fab40a"}
              >
                ĐANG CHỜ
              </Tag>
            </Tooltip>
          );
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
    {
      title: "Thao Tác",
      key: "action",
      render: (_, record) => (
        <>
          <DeleteOutlined
            style={{
              marginRight: "30x",
              fontSize: "20px",
              cursor: "pointer",
              color: "#883731",
            }}
            onClick={() => deleteClick(record.id)}
          />{" "}
          <EyeOutlined
            style={{ fontSize: "20px", cursor: "pointer", color: "#d3bb75" }}
            onClick={() => OrderDetail(record)}
          />
        </>
      ),
    },
  ];
  return (
    <LayoutComponent>
      <ModalOrder
        dataOrder={dataOrder}
        showModal={showModal}
        handleClose={handleClose}
      />
      <h5 style={{ marginTop: "50px", marginBottom: "30px" }}>
        DANH SÁCH ĐƠN HÀNG
      </h5>
      <Table
        scroll={{ x: true }}
        loading={isLoading}
        columns={columns}
        dataSource={listOrder}
        pagination={false}
      />
      <div style={{ marginTop: "30px" }}>
        {listOrder.length > 0 && (
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
export default OrderManage;
