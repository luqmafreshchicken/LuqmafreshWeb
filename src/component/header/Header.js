import React, { useEffect, useState } from "react";
import "./header.css";
import ModalCart from "../../pages/modalcart/ModalCart";
import Options from "../dropdownvalue/Dropdownvalue";
import { NavLink } from "react-router-dom";
import {
  Show_Cart,
  currentLocation,
  getUserID,
} from "../../serverRequest/Index";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRegister, otpVerify } from "../../serverRequest/Index";
import Card from "../../customcomponent/card/Card";

const Header = ({ onchange, value }) => {
  const [open, setOpen] = useState(false);
  const [cartopen, setCartopen] = useState(false);
  const [ishover, sethover] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [btn, setBtn] = useState(false);
  const [otp, setOtp] = useState("");
  const [showbtn, setShowbtn] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [add1, setAdd1] = useState(null);
  const [add2, setAdd2] = useState(null);
  const [add3, setAdd3] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          currentLocation(
            position.coords.latitude,
            position.coords.longitude
          ).then((loc) => {
            setAdd1(loc.results[0]?.address_components?.[3]?.long_name);
            setAdd2(loc.results[0]?.address_components?.[5]?.long_name);
            setAdd3(loc.results[0].formatted_address);
          });
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  });

  // useEffect(() => {
  //   localContent();
  //   showcart();
  // }, []);
  useEffect(() => {
    localContent();
    showcart();
    const interval = setInterval(showcart, localContent, 3000); // Call showcart every four seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const localContent = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    if (items) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  };
  function MouseOver(e) {
    e.stopPropagation();
    sethover(true);
  }
  function MouseOut(e) {
    e.stopPropagation();
    sethover(false);
  }

  const handleclear = async (index) => {
    window.location.reload();
    if (index == 4) {
      await localStorage.clear();
      localContent();
    }
  };
  const showcart = async () => {
    const userId = await getUserID();
    const data = {
      userId: userId,
    };
    const res = await Show_Cart(data);
    if (res.status == true) {
      setCartProduct(res.data.cart);
      setCartPrice(res.data.totalAmount);
    } else {
      setCartProduct([]);
      setCartPrice("");
    }
  };
  const handleLogin = () => {
    const requestData = { email: mobileNumber };
    loginRegister(requestData).then((res) => {
      setShowInput(!showInput);
      setShowbtn(true);
    });
  };

  const handleOTP = () => {
    const requestData = { email: mobileNumber, otp: otp };
    otpVerify(requestData).then((res) => {
      if (res.status == true) {
        toast.success(res.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem("userDetail", JSON.stringify(res.data));
        localContent();
        setOpen(false);
      } else {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const carthandleOpen = () => setCartopen(true);
  const carthandleClose = () => setCartopen(false);

  return (
    <>
      <div className="mobile_input">
        <NavLink
          to="/search"
          className="nav_list"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="mobile_input_search">
            <input
              placeholder="Search for any delicious product"
              disabled={false}
              onChange={onchange}
              value={value}
            />
            <img src="search.png" height="17px" width="17px" />
          </div>
        </NavLink>
      </div>

      <div className="navbar">
        <div className="desktop_herder_content">
          <nav className="main_nav">
            <NavLink to="/">
              <div className="luqma_logo">
                <img src="MAIN LOGO.png" />
              </div>
            </NavLink>

            <div className="luqma_location">
              <div className="luqma_location_top">
                <img src="pin.png" />
                <p>{add1}</p>
                <img src="down (2).png" />
              </div>
              <div className="luqma_location_bottom">
                <p>{add3}</p>
              </div>
            </div>
            <div className="luqma_input">
              <NavLink to="/search" className="nav_list">
                <input
                  placeholder="Search for any delecious product"
                  type="search"
                  onChange={onchange}
                  value={value}
                />
                <img src="search.png" height="20px" width="20px" />
              </NavLink>
            </div>

            <div className="luqma_option">
              <ul>
                <NavLink className="nav_list">
                  <li>
                    <div className="currency_container">
                      <img src="menu (4).png" />
                      <p>Currency</p>
                    </div>
                  </li>
                </NavLink>
                {loginStatus == false ? (
                  <NavLink className="nav_list">
                    <li>
                      <div className="currency_container" onClick={handleOpen}>
                        <img src="user (3).png" />
                        <p>Login</p>
                      </div>
                    </li>
                  </NavLink>
                ) : (
                  <div>
                    <li
                      // className="nav-item4"
                      onMouseOver={(e) => MouseOver(e)}
                      onMouseOut={(e) => MouseOut(e)}
                    >
                      <div className="header_currency">
                        <img src="user (3).png" height="17px" width="17px" />
                        <span
                          style={{
                            fontSize: "13px",
                            paddingLeft: "5px",
                            paddingTop: "15px",
                          }}
                        >
                          Profile
                          {ishover ? (
                            <ul
                              style={{
                                flexDirection: "column",
                                // gap: "15px",
                                position: "absolute",
                                backgroundColor: "white",
                                padding: "4px",
                                paddingLeft: "0px",
                                textDecoration: "none",
                                width: "13%",
                                height: "auto",
                                borderRadius: "10px",
                                zIndex: 4,
                                border: "1px solid lightgray",
                              }}
                            >
                              <li
                                style={{
                                  listStyle: "none",
                                  color: "#ee1d23",
                                  fontWeight: 900,
                                  fontSize: "17px",
                                  paddingTop: "10px",
                                  width: "100%",
                                  paddingLeft: "20px",
                                  paddingBottom: "25px",
                                }}
                              >
                                LUQMA FRESH
                              </li>
                              {Options.map((option, index) => (
                                <li
                                  style={{
                                    listStyle: "none",
                                    width: "100%",
                                    paddingLeft: "20px",
                                    height: "20px",
                                    marginBottom: "0.5rem",
                                    lineHeight: 0.1,
                                  }}
                                  onClick={() => handleclear(index)}
                                >
                                  <NavLink
                                    style={{
                                      color: "black",
                                      fontWeight: "400",
                                      textDecoration: "none",
                                      listStyle: "none",
                                      fontSize: "0.7rem",
                                    }}
                                    to={option.route}
                                  >
                                    {option.routeName}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </span>
                      </div>
                    </li>
                  </div>
                )}

                <NavLink className="nav_list">
                  <li>
                    <div
                      className="cart_border_container"
                      onClick={carthandleOpen}
                    >
                      <div className="cart_border_content1">
                        <img src="grocery-store.png" />
                      </div>
                      <div className="cart_border_content2">
                        <p>
                          {cartProduct.length} Items <br />
                          <span>₹{cartPrice}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </NavLink>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <ModalCart
        cartopen={cartopen}
        carthandleClose={carthandleClose}
        onclose={carthandleClose}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="handle_login">
          <div className="sign_in_logo">
            <img src="01.jpg" />
          </div>

          <div className="handle_login_container">
            {/* heading */}
            <div className="handle_login_heading">
              <p>Sign In</p>
            </div>
            {/* end heading */}
            {/* input number */}
            {showbtn == true ? (
              <></>
            ) : (
              <div className="handle_login_number_container">
                <div className="handle_login_number_content">
                  <input
                    placeholder="Enter your email"
                    value={mobileNumber}
                    onChange={handleMobileNumber}
                    type="email"
                  />
                  <p>Edit</p>
                </div>
              </div>
            )}

            {/* input number */}
            {/* input otp */}
            {showbtn == true ? (
              <div className="handle_login_otp_container">
                <div className="handle_login_otp_content">
                  <input
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <p>Resend OTP</p>
                </div>

                <div className="email_verify">
                  <p>
                    One Time Password Send to{" "}
                    <span>gauravjoshi897@gmail.com</span>. Please enter it below
                    to complete verification
                  </p>
                </div>
              </div>
            ) : null}

            {/* input otp */}
            {/* submit btn */}
            {showbtn == false ? (
              <div className="handle_login_btn_container">
                <div
                  className="handle_login_btn_content"
                  onClick={() => handleLogin()}
                  disabled={btn}
                  style={{
                    backgroundColor: btn === true ? "#FF0040" : "#FF0040",
                    opacity: btn === true ? 0.4 : 100,
                    color: btn === true ? "white" : "white",
                  }}
                >
                  <p>Continue</p>
                </div>
              </div>
            ) : null}

            {showbtn == true ? (
              <>
                <div className="handle_login_proceed_container">
                  <div
                    className="handle_login_proceed_content"
                    onClick={() => handleOTP()}
                  >
                    <p>Submit</p>
                  </div>
                </div>
              </>
            ) : null}
            <div className="continue_or_container">
              <div className="continue_or_content">
                <img src="or.png" />
              </div>
            </div>
            <div className="continue_google_container">
              <div className="continue_google_content">
                <img src="Google1.png" />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
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
    </>
  );
};

export default Header;
