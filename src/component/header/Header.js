import React, { useEffect, useState } from "react";
import "./header.css";
import ModalCart from "../../pages/modalcart/ModalCart";
import Options from "../dropdownvalue/Dropdownvalue";
import { NavLink } from "react-router-dom";
import { currentLocation } from "../../serverRequest/Index";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loder/Loader";
import { useNavigate } from "react-router-dom";

const Header = ({
  onchange,
  value,
  code,
  currency,
  flag,
  cartProductlength,
  cartPrice,
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
  handleclear= () => {}
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

  // const handleclear = async (index) => {
  //   window.location.reload();

  //   if (index == 4) {
  //     await localStorage.clear();
  //     navigate("/");
  //     // localContent();
  //   }
  // };

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
                        <img src="user.png" />
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
                        <img src="user1.png" height="17px" width="17px" />
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
                                  onClick={()=>handleclear(index)}
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
                          {cartProductlength?.length} Items <br />
                          <span>
                            {curr} {cartPrice}
                          </span>
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
        loginStatus={loginStatus}
        cartProduct={cartProductlength}
        totalAmount={totalAmount}
        modalcurrency={modalcurrency}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className="handle_login">
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
                <div></div>
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

              {showbtn == true ? (
                <div className="handle_login_otp_container">
                  <div className="handle_login_otp_content">
                    <input
                      placeholder="Enter OTP"
                      onChange={sethandleOtp}
                      // value={otp}
                    />
                    <p>Resend OTP</p>
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
                    <p>Continue</p>
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
          </div>
          <div className="crossbtn" >
           <img src="crossbtn.png"/>
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
