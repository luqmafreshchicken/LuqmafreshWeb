import React, { useEffect, useState } from "react";
import "./mobileaccount.css";
import { NavLink } from "react-router-dom";
import ViewProfile from "../../component/viewprofile/ViewProfile";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  CountryDetail,
  GetCountry,
  Show_Cart,
  getUserID,
  loginRegister,
  otpVerify,
  removeFromCart,
  resendOTP,
  viewProfile,
} from "../../serverRequest/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../component/loder/Loader";
import ModalCart from "../../pages/modalcart/ModalCart";
import MobileBottomtab from "../mobilebottomtab/MobileBottomtab";

const MobileAccount = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [profile, setProfile] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [showInput, setShowInput] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [btn, setBtn] = useState(false);
  const [otp, setOtp] = useState("");
  const [showbtn, setShowbtn] = useState(false);
  const [viewUser, setViewUser] = useState([]);
  const [load, setLoad] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cartOpen, setCartOpen] = useState("");
  const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartPrice] = useState("");
  // const [countryCode, setCountryCode] = useState("");
  const [countrycurrency, setCountryCurrency] = useState("");


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position?.coords?.latitude) {
            GetCountry(
              position?.coords?.latitude,
              position?.coords?.longitude
            ).then((res) => {
              if (res?.address?.country) {
                CountryDetail(res?.address?.country).then((res) => {
                  setCountryCurrency(res[0]?.currencies[0]?.symbol);
                  // setCountryTitle(res[0]?.currencies[0]?.code);
                });
              }
            });
          }
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
    localContent();
    userDetail();
    setLoad(true);
    showcart();
  }, []);

  const showcart = async () => {
    const userId = await getUserID();
    const data = {
      userId: userId,
    };
    const res = await Show_Cart(data);
    setCartPrice(res?.data?.totalAmount);
    if (res.status == true) {
      setCartProduct(res?.data?.cart);
      setCartPrice(res?.data?.totalAmount);
      localContent();
    } else {
      localContent();
      setLoad(false);

    }
  };

  const userDetail = async () => {
    const UserId = await getUserID();
    viewProfile(UserId).then((res) => {
      setLoad(true);
      console.log(res.data);
      if (res.status == true) {
        setViewUser(res.data);
        setLoad(false);
      } else {
        setLoad(false);

      }
    });
  };

  const localContent = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    if (items) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  };

  const handleclear = async () => {
    await localStorage.clear();
    localContent();
  };

  const handleLogin = () => {
    if (mobileNumber === "") {
      toast.error("Please enter email", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    } else if (!mobileNumber.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error("Please enter valid email address", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    }
    const requestData = { email: mobileNumber };
    setLoad(true);
    loginRegister(requestData).then((res) => {
      if (res.status === true) {
        toast.success(res?.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoad(false);
        setShowInput(!showInput);
        setShowbtn(true);
      } else {
        toast.error(res?.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoad(false);
      }
     
    });
  };

  const handleMobileNumber = (e) => {
    
    setMobileNumber(e.target.value);
    if (e.target.value.length <= 40) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  };
  const handleOTP = () => {
    const requestData = { email: mobileNumber, otp: otp };
    setLoad(true);
    otpVerify(requestData).then((res) => {
      if (res.status == true) {
        toast.success(res.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem("userDetail", JSON.stringify(res.data));
        localContent();
        setOpen(false);
        setLoad(false);
      } else {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setLoad(false);
    });
  };
    // remove cart
    const removeCartProduct = async (id) => {
      const userId = await getUserID();
      const data = {
        userId: userId,
        productId: id,
      };
      removeFromCart(data).then((res) => {
        if (res.status == true) {
          toast.success(res.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          showcart();
          // setCount(0);
          // setShow(false);
        } else {
          toast.error(res.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      });
    };
    // end remove cart

    // remove local cart
    const removeLocalCart = (id) => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const cartPrice = JSON.parse(localStorage.getItem("cartPrice"));
      const cartData = cart?.filter((item) => item?.productId?._id !== id);
      const product = cart?.find((item) => item?.productId?._id === id);
      const removeProduct = cart?.filter((item) => item?.productId?._id !== id);
      cart?.length >= 1 &&
        localStorage.setItem(
          "cartPrice",
          JSON.stringify({ price: cartPrice?.price - product?.productId?.price })
        );
      cart?.length < 1 &&
        localStorage.setItem("cartPrice", JSON.stringify({ price: 0 }));
      localStorage.setItem("cart", JSON.stringify(cartData));
      setCartProduct(removeProduct);
      setCartPrice(
        cartPrice?.price -
          product?.productId?.price * product?.productId?.quantity
      );
      // setShowCartBtn(false);
      // setCount(0);
      // setShow(false);
      toast.success("Product remove from cart", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      localContent();
    };
    const handleResendOTP = () => {
      // email validation
      if (mobileNumber === "") {
        toast.error("Please enter email", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
        return false;
      } else if (!mobileNumber.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        toast.error("Please enter valid email address", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
        return false;
      }
      setLoad(true);
      const requestData = { email: mobileNumber };
      resendOTP(requestData).then((res) => {
        if (res.status === true) {
          toast.success(res.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
  
          setLoad(false);
        } else {
          toast.error(res.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoad(false);
        }
      });
    };

  const carthandleClose = () => setCartOpen(false);
  const viewhandleOpen = () => setProfile(true);
  const viewhandleClose = () => setProfile(false);
  return (
    <div className="mobile_account_container">
      {/* name */}
      {loginStatus == true ? (
        <div className="mobile_user_profile">
          <div className="mobile_user_name">
            <h1>{viewUser?.name?.slice(0, 1)}</h1>
          </div>
          <div className="mobile_user_email">
            <h6>{viewUser.name}</h6>
            <p>{viewUser.email}</p>
            <button onClick={viewhandleOpen}>View profile</button>
          </div>
        </div>
      ) : null}
      {loginStatus == false ? (
        <div className="mobile_login">
          <h5>Hey Meatlover</h5>
          <p>
            Welcome to Luqmafresh. Manage your orders, address
             & other details.{" "}
          </p>
          <div style={{ display: "grid", placeItems: "center" }}>
            <div className="mobile_login_btn" onClick={handleOpen}>
              <h6>Login/Sign Up</h6>
            </div>
          </div>
        </div>
      ) : null}
      {/* end name */}
      <div className="mobile_list">
        {loginStatus == true ? (
          <>
            <div className="mobile_list_box">
              <div className="reward_img">
                <img src="shop.png" />
              </div>
              <div className="reward_text">
                <NavLink to="/orderhistory" className="nav_list">
                  <p>Orders</p>
                </NavLink>
              </div>
              <div className="reward_arrow">
                <img src="rtarrow.png" />
              </div>
            </div>
            <div className="mobile_list_box">
              <div className="reward_img">
                <img src="address.png" />
              </div>
              <div className="reward_text">
                <NavLink to="/whylicious" className="nav_list">
                  <p>Why Luqmafresh?</p>
                </NavLink>
              </div>
              <div className="reward_arrow">
                <img src="rtarrow.png" />
              </div>
            </div>
            <div className="mobile_list_box">
              <div className="reward_img">
                <img src="wallet.png" />
              </div>
              <div className="reward_text">
                <NavLink to="/whistlistdetail" className="nav_list">
                  <p>WhistList</p>
                </NavLink>
              </div>
              <div className="reward_arrow">
                <img src="rtarrow.png" />
              </div>
            </div>
            <div className="mobile_list_box">
              <div className="reward_img">
                <img src="bell.png" />
              </div>
              <div className="reward_text">
                <NavLink to="/notification" className="nav_list">
                  <p>Notification</p>
                </NavLink>
              </div>
              <div className="reward_arrow">
                <img src="rtarrow.png" />
              </div>
            </div>
            {/* <div className="mobile_list_box">
              <div className="reward_img">
                <img src="phone.png" />
              </div>
              <div className="reward_text">
                <p>Contact us</p>
              </div>
              <div className="reward_arrow">
                <img src="rtarrow.png" />
              </div>
        </div>*/}
          </>
        ) : null}

        <div className="mobile_list_box">
          <div className="reward_img">
            <img src="privacy.png" />
          </div>
          <div className="reward_text">
            <NavLink to="/termsconditions" className="nav_list">
              <p>Terms & Conditions</p>
            </NavLink>
          </div>
          <div className="reward_arrow">
            <img src="rtarrow.png" />
          </div>
        </div>
        {/* end 6box */}

        {/* 7box */}

        <div className="mobile_list_box">
          <div className="reward_img">
            <img src="security.png" />
          </div>
          <div className="reward_text">
            <NavLink to="/privacypolicy" className="nav_list">
              <p>Privacy Policy</p>
            </NavLink>
          </div>
          <div className="reward_arrow">
            <img src="rtarrow.png" />
          </div>
        </div>
        {/* end 7box */}
        {/* 8box */}

        {loginStatus == true ? (
          <div className="mobile_list_box">
            <div className="reward_img">
              <img src="logout.png" />
            </div>
            <div className="reward_text" onClick={() => handleclear()}>
              <p>Logout</p>
            </div>

            <div className="reward_arrow">
              <img src="rtarrow.png" />
            </div>
          </div>
        ) : null}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="mobile_login_container">
            <div className="mobile_login_heading">
              <p>Sign In</p>
            </div>
            <div className="mobile_number_login">
              <div className="mobile_number_login_content">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email..."
                  value={mobileNumber}
                  onChange={handleMobileNumber}
                  // maxLength="10"
                />
              </div>
            </div>
            {showbtn == true ? (
              <div className="mobile_otp_login">
                <div className="mobile_otp_login_content">
                  <input
                    type="number"
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <p onClick={() => handleResendOTP()}>ResendOTP</p>
                </div>
              </div>
            ) : null}

            {showbtn == false ? (
              <div className="mobile_submit_login">
                <div
                  className="mobile_submit_login_content"
                  onClick={() => handleLogin()}
                  style={{
                    backgroundColor: btn === true ? "#C42118" : "#C42118",
                    opacity: btn === true ? 0.4 : 100,
                    color: btn === true ? "white" : "white",
                  }}
                >
                  <p>Proceed Via OTP</p>
                </div>
              </div>
            ) : null}
            {showbtn == true ? (
              <div className="mobile_submit_login">
                <div
                  className="mobile_submit_login_content"
                  onClick={() => handleOTP()}
                >
                  <p>Submit</p>
                </div>
              </div>
            ) : null}
          </Box>
        </Modal>
      </div>
      <ViewProfile profile={profile} viewhandleClose={viewhandleClose} />
      <Loader loading={load} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <ModalCart
        // cartopen={cartopen}
        cartopen={cartOpen}
        carthandleClose={carthandleClose}
        onclose={carthandleClose}
        loginStatus={loginStatus}
        cartProduct={cartProduct}
        // // cartProductlength={cartProduct}
        totalAmount={cartPrice}
        modalcurrency={countrycurrency}
        // // totalAmount={totalAmount}
        // // modalcurrency={modalcurrency}
        // // removeProduct={removeProduct}
        removeProduct={(id) =>
          loginStatus == true ? removeCartProduct(id) : removeLocalCart(id)
        }
        // handleCartLogin={handleCartLogin}
        // // handleHome={handleHome}
        // handleHome={() => handleHome()}
      />
      <MobileBottomtab handleMobile={() => setCartOpen(true)} />
    </div>
  );
};

export default MobileAccount;
