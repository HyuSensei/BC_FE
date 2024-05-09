import React, { useEffect, useState } from "react";
import Header from "../../components/customer/Header/Header";
import Footer from "../../components/customer/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UrlImage } from "../../url";
import { fetchAllOrder } from "../../axios/services";
import { Avatar, List } from "antd";

export default function OrderHistory() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [orderWaits, setOrderWaits] = useState([]);
  const [orderShips, setOrderShips] = useState([]);
  const [orderCompletes, setOrderCompletes] = useState([]);
  const [orderCancels, setOrderCancels] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const getOrderHistory = async () => {
    try {
      setIsloading(true);
      const [waits, ships, completes, cancels] = await fetchAllOrder(user_id);
      setOrderWaits(waits.data.orders);
      setOrderShips(ships.data.orders);
      setOrderCompletes(completes.data.orders);
      setOrderCancels(cancels.data.orders);
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    getOrderHistory();
  }, [isAuth]);

  return (
    <>
      <Header />
      <List
        itemLayout="horizontal"
        dataSource={orderWaits}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <img
                  width={"100px"}
                  src={UrlImage + item.products[0].image}
                  alt=""
                />
              }
            />
          </List.Item>
        )}
      />
      <Footer />
    </>
  );
}
