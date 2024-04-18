import React, { useState, useEffect } from "react";
import Header from "../../components/customer/Header/Header";
import Footer from "../../components/customer/Footer/Footer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/silce/customer/authSilce";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.customer.auth.isLoadingLogin);
  const isSuccessLogin = useSelector(
    (state) => state.customer.auth.isSuccessLogin
  );
  const isErrorLogin = useSelector((state) => state.customer.auth.isErrorLogin);
  const isAuth = useSelector((state) => state.customer.auth.isAuthSucess);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const isValidInput = () => {
    if (!username) {
      toast.error("Vui lòng nhập tên đăng nhập !");
      return false;
    }
    if (!password) {
      toast.error("Vui lòng nhập mật khẩu !");
      return false;
    }
    return true;
  };

  const loginClick = (e) => {
    e.preventDefault();
    let check = isValidInput();
    if (check === true) {
      let data_user = {
        username: username,
        password: password,
      };
      dispatch(login(data_user));
      //   .then((result) => {
      //   if (result.payload.success && result.payload.success === true) {
      //     toast.success(`${result.payload.message}`);
      //     navigate("/");
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
    if (isSuccessLogin && isSuccessLogin.success === true) {
      toast.success(`${isSuccessLogin.message}`);
      navigate("/");
    }
    if (isErrorLogin && isErrorLogin.detail) {
      toast.error(`${isErrorLogin.detail}`);
    }
  }, [isSuccessLogin, isErrorLogin, isAuth]);

  const registerClick = () => {
    navigate("/register");
  };
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
                ĐĂNG NHẬP
              </h3>
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
                  }}
                  type="submit"
                  className="btn btn-primary"
                  onClick={(event) => loginClick(event)}
                >
                  {isLoading === true ? "LOADING.." : "ĐĂNG NHẬP"}
                </button>
              </div>
            </form>
            <div
              style={{
                width: "80%",
                height: "50px",
                backgroundColor: "#f5f6f9",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  paddingTop: "10px",
                }}
              >
                TẠO TÀI KHOẢN NGAY
              </div>
            </div>
            <div>
              <button
                style={{
                  backgroundColor: "#c4c4c4",
                  borderColor: "#c4c4c4",
                  width: "80%",
                }}
                type="button"
                className="btn btn-primary"
                onClick={() => registerClick()}
              >
                ĐĂNG KÝ
              </button>
            </div>
          </div>
          <div className="col-sm-6">
            <img
              src={
                "https://templates.g5plus.net/glowing-bootstrap-5/assets/images/hero-slider/hero-slider-white-14.jpg"
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
export default Login;
