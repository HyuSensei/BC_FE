import React, { useState, useEffect } from "react";
import Header from "../../components/customer/Header/Header";
import Footer from "../../components/customer/Footer/Footer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/silce/customer/authSilce";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSuccess = useSelector(
    (state) => state.customer.auth.isSuccessRegister
  );
  const isError = useSelector((state) => state.customer.auth.isErrorRegister);
  const isAuth = useSelector((state) => state.customer.auth.isAuthSucess);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const isValidInput = () => {
    if (!name) {
      message.error("Vui lòng điền họ và tên !");
      return false;
    }
    if (!email) {
      message.error("Vui lòng điền email !");
      return false;
    }
    if (!phone) {
      message.error("Vui lòng điền số điện thoại !");
      return false;
    }
    if (!username) {
      message.error("Vui lòng điền tên đăng nhập !");
      return false;
    }
    if (!password) {
      message.error("Vui lòng điền mật khẩu !");
      return false;
    }
    return true;
  };

  const registerClick = () => {
    let check = isValidInput();
    let data_user = {
      name: name,
      email: email,
      phone: phone,
      username: username,
      password: password,
    };
    if (check === true) {
      dispatch(register(data_user));
      //   .then((result) => {
      //   if (result.payload.success && result.payload.success === true) {
      //     toast.success(`${result.payload.message}`);
      //     navigate("/login");
      //   }
      //   if (result.payload.detail) {
      //     toast.error(`${result.payload.detail}`);
      //   }
      // });
    }
  };

  useEffect(() => {
    if (isAuth && isAuth.success === true) {
      navigate("/");
    }
    if (isSuccess && isSuccess.success === true) {
      message.success(`${isSuccess.message}`);
      navigate("/login");
    }
    if (isError && isError.detail) {
      message.error(`${isError.detail}`);
    }
  }, [isSuccess, isError, isAuth]);
  return (
    <>
      <Header />
      <div
        className="container"
        style={{ marginTop: "100px", marginBottom: "100px" }}
      >
        <div className="row">
          <div className="col-sm-6">
            <form>
              <h3 style={{ color: "gray", textAlign: "center", width: "80%" }}>
                ĐĂNG KÝ
              </h3>
              <div className="form-group">
                <label
                  style={{
                    fontSize: "17px",
                    marginBottom: "20px",
                  }}
                >
                  Họ và tên:
                </label>
                <input
                  style={{ height: "40px", width: "80%", fontSize: "14px" }}
                  type="text"
                  className="form-control"
                  placeholder="Nhập họ và tên..."
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <br />
              <div className="form-group">
                <label
                  style={{
                    fontSize: "17px",
                    marginBottom: "20px",
                  }}
                >
                  Email:
                </label>
                <input
                  style={{ height: "40px", width: "80%", fontSize: "14px" }}
                  type="text"
                  className="form-control"
                  placeholder="Nhập email..."
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <br />
              <div className="form-group">
                <label
                  style={{
                    fontSize: "17px",
                    marginBottom: "20px",
                  }}
                >
                  Số điện thoại:
                </label>
                <input
                  style={{ height: "40px", width: "80%", fontSize: "14px" }}
                  type="text"
                  className="form-control"
                  placeholder="Nhập số điện thoại..."
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
              <br />
              <div className="form-group">
                <label
                  style={{
                    fontSize: "17px",
                    marginBottom: "20px",
                  }}
                >
                  Tên đăng nhập:
                </label>
                <input
                  style={{ height: "40px", width: "80%", fontSize: "14px" }}
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên đăng nhập..."
                  value={username}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </div>
              <br />
              <div className="form-group">
                <label
                  style={{
                    fontSize: "17px",
                    marginBottom: "20px",
                  }}
                >
                  Mật khẩu:
                </label>
                <input
                  style={{ height: "40px", width: "80%", fontSize: "14px" }}
                  type="password"
                  className="form-control"
                  placeholder="Nhập mật khẩu..."
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <br />
              <div className="form-group">
                <button
                  style={{
                    backgroundColor: "#883731",
                    borderColor: "#883731",
                    width: "80%",
                    height: "100%",
                  }}
                  type="button"
                  className="btn btn-primary"
                  onClick={() => registerClick()}
                >
                  ĐĂNG KÝ
                </button>
              </div>
            </form>
          </div>
          <div className="col-sm-6">
            <img
              src={
                "https://templates.g5plus.net/glowing-bootstrap-5/assets/images/banner/banner-32.jpg"
              }
              alt=""
              width={"100%"}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Register;
