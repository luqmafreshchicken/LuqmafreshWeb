import React, { useEffect, useState } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { currentLocation } from "../../serverRequest/Index";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loder/Loader";
import { useNavigate } from "react-router-dom";
import Logo from "../../assest/Image/MAIN LOGO.png";
import Search from "../../assest/Image/search.png";
import Location from "../../assest/Image/pin.png";
import User from "../../assest/Image/user.png";
import Profile from "../../assest/Image/user1.png";
import cart from "../../assest/Image/grocery-store.png";

const Header = ({
  onchange,
  value,
  code,
  currency,
  flag,
  cartProductlength,
  cartPrice = 0,
  curr,
  cartopen = () => {},
  carthandleClose = () => {},
  carthandleOpen = () => {},
  loginStatus,
  handleOpen = () => {},
  handleClose = () => {},
  open,
  showbtn,
  handleLogin = () => {},
  handleOTP = () => {},
  mobileNumber,
  handleMobileNumber = () => {},
  sethandleOtp = () => {},
  btn,
  totalAmount,
  store,
  modalcurrency,
  handleclear = () => {},
  removeProduct = () => {},
  handleResendOTP = () => {},
  handleCartLogin = () => {},
  handleHome = () => {},
  headerCart = true,
}) => {
  // let navigate = useNavigate();

  const [ishover, sethover] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [add1, setAdd1] = useState(null);
  const [add2, setAdd2] = useState(null);
  const [add3, setAdd3] = useState(null);
  const [load, setLoad] = useState(false);

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

  const localContent = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    if (items) {
      // setLoginStatus(true);
      loginStatus = true;
    } else {
      // setLoginStatus(false);
      loginStatus = false;
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
              type="text"
            />
            <img src={Search} height="17px" width="17px" />
          </div>
        </NavLink>
      </div>

      <div className="navbar">
        <div className="desktop_herder_content">
          <nav className="main_nav">
            <NavLink to="/">
              <div className="luqma_logo">
                <img src={Logo} />
              </div>
            </NavLink>

            <div className="luqma_location">
              <div className="luqma_location_top">
                <img src={Location} />
                <p>Your Loction</p>
              </div>

              <div className="luqma_location_bottom">
                <p>
                  <span>{add1}</span>,{add3}
                </p>
              </div>
            </div>
            <div className="luqma_input">
              <NavLink to="/search" className="nav_list">
                <input
                  placeholder="Search for any delecious product"
                  // type="search"
                  onChange={onchange}
                  value={value}
                />
                <img src={Search} height="20px" width="20px" />
              </NavLink>
            </div>

            <div className="luqma_option">
              <ul>
                <NavLink className="nav_list">
                  <li>
                    <div className="currency_container">
                      <img src={flag} />
                      <p>
                        {code} {currency}
                      </p>
                    </div>
                  </li>
                </NavLink>
                {loginStatus == false ? (
                  <NavLink className="nav_list">
                    <li>
                      <div className="currency_container" onClick={handleOpen}>
                        <img src={User} />
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
                        <NavLink
                          style={{
                            color: "black",
                            fontWeight: "400",
                            textDecoration: "none",
                            listStyle: "none",
                            fontSize: "0.7rem",
                          }}
                          to="/account"
                        >
                          <img src={Profile} height="17px" width="17px" />
                          <span
                            style={{
                              fontSize: "13px",
                              paddingLeft: "5px",
                              paddingTop: "15px",
                            }}
                          >
                            My Account
                          </span>
                        </NavLink>
                      </div>
                    </li>
                  </div>
                )}
                {headerCart == true && (
                  <NavLink className="nav_list">
                    <li>
                      <div
                        className="cart_border_container"
                        onClick={carthandleOpen}
                      >
                        <div className="cart_border_content1">
                          <img src={cart} />
                        </div>
                        <div className="cart_border_content2">
                          <p>
                            {cartProductlength?.length} Items <br />
                            <span>
                              {curr} {cartPrice}
                            </span>
                          </p>
                        </div>
                      </div>
                    </li>
                  </NavLink>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
      {/* <ModalCart
        cartopen={cartopen}
        carthandleClose={carthandleClose}
        onclose={carthandleClose}
        loginStatus={loginStatus}
        cartProduct={cartProductlength}
        totalAmount={totalAmount}
        modalcurrency={modalcurrency}
        removeProduct={removeProduct}
        handleCartLogin={handleCartLogin}
        handleHome={handleHome}
                          />*/}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className="handle_login">
            <div className="loginLogoContainer">
              <div className="loginLogo">
                <img src={Logo} />
              </div>
            </div>

            <div className="handlelogin_container">
              {/* heading */}
              <div className="handle_login_heading">
                <p>Sign In</p>
              </div>
              {/* end heading */}
              {/* input number */}
              {showbtn == true ? (
                <div></div>
              ) : (
                <div className="handle_login_number_container">
                  <div className="handle_login_number_content">
                    <input
                      placeholder="Enter your email"
                      value={mobileNumber}
                      onChange={handleMobileNumber}
                      type="email"
                      name="email"
                    />
                  </div>
                </div>
              )}

              {showbtn == true ? (
                <div className="handle_login_otp_container">
                  <div className="handle_login_otp_content">
                    <input
                      placeholder="Enter OTP"
                      onChange={sethandleOtp}
                      // value={otp}
                      type="otp"
                      name="otp"
                    />
                    <p onClick={handleResendOTP}>Resend OTP</p>
                  </div>

                  <div className="email_verify">
                    <p>
                      One Time Password Send to <span>{store}</span>. Please
                      enter to complete verification
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
                    onClick={handleLogin}
                    disabled={btn}
                    style={{
                      backgroundColor: btn === true ? "#FF0040" : "#FF0040",
                      opacity: btn === true ? 0.4 : 100,
                      color: btn === true ? "white" : "white",
                    }}
                  >
                    Continue
                  </div>
                </div>
              ) : null}

              {showbtn == true ? (
                <>
                  <div className="handle_login_proceed_container">
                    <div
                      className="handle_login_proceed_content"
                      onClick={handleOTP}
                    >
                      Submit
                    </div>
                  </div>
                </>
              ) : null}
              {/* <div className="continue_or_container">
                <div className="continue_or_content">
                  <img src="or.png" />
                </div>
              </div>
              <div className="continue_google_container">
                <div className="continue_google_content">
                  <img src="Google1.png" />
                </div>
              </div> */}
            </div>
          </div>
          <div className="crossbtn" onClick={handleClose}>
            <img src="crossbtn.png" />
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
      <Loader loading={load} />
    </>
  );
};

export default Header;
