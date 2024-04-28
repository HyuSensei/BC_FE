import React, { useEffect } from "react";
import "./Success.css";
import { FaRegFaceKissWinkHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/silce/customer/cartSlice";

export default function Success() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, []);
  return (
    <div style={{ marginTop: "200px" }} className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="message-box _success">
            <i className="fa fa-check-circle" aria-hidden="true"></i>
            <h4> Đặt hàng thành công ! </h4>
            <p>
              <FaRegFaceKissWinkHeart
                style={{ fontSize: "20px", color: "#dc0000" }}
              />{" "}
              Cảm ơn quý khách hàng{" "}
              <FaRegFaceKissWinkHeart
                style={{ fontSize: "20px", color: "#dc0000" }}
              />
              <div>
                <button
                  style={{ marginTop: "10px" }}
                  type="button"
                  class="btn btn-success"
                  onClick={() => navigate("/")}
                >
                  Home
                </button>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
