import React, { useEffect, useState } from "react";
import "./mobileaccount.css";
import { NavLink } from "react-router-dom";
import ViewProfile from "../../component/viewprofile/ViewProfile";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  getUserID,
  loginRegister,
  otpVerify,
  viewProfile,
} from "../../serverRequest/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../component/loder/Loader";

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

  useEffect(() => {
    localContent();
    userDetail();
    setLoad(true);
  }, []);

  const userDetail = async () => {
    const UserId = await getUserID();
    viewProfile(UserId).then((res) => {
      console.log(res.data);
      if (res.status == true) {
        setViewUser(res.data);
        setLoad(false);
      } else {
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
    const requestData = { email: mobileNumber };
    setLoad(true);
    loginRegister(requestData).then((res) => {
      setLoad(false);
      setShowInput(!showInput);
      setShowbtn(true);
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
        setLoad(false);
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
      setLoad(false);
    });
  };

  const viewhandleOpen = () => setProfile(true);
  const viewhandleClose = () => setProfile(false);
  return (
    <div className="mobile_account_container">
      {/* name */}
      {loginStatus == true ? (
        <div className="mobile_user_profile">
          <div className="mobile_user_name">
            <p style={{ paddingLeft: "20px" }}>{viewUser.name}</p>
            <span style={{ paddingRight: "20px" }} onClick={viewhandleOpen}>
              View Profile
            </span>
          </div>
          <div className="mobile_user_email">
            <p style={{ paddingLeft: "20px" }}>
              + 971 {viewUser?.mobile?.number} | {viewUser.email}
            </p>
          </div>
        </div>
      ) : null}
      {loginStatus == false ? (
        <div className="mobile_login">
          <h5>Hey Meatlover</h5>
          <p>
            Welcome to Luqmafresh. Manage your orders, address, LuqmaFresh
            wallet & other details.{" "}
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
                <NavLink to="/addnewaddress" className="nav_list">
                  <p>Addresses</p>
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
                <p>Luqmafresh Wallet</p>
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
            <div className="mobile_list_box">
              <div className="reward_img">
                <img src="phone.png" />
              </div>
              <div className="reward_text">
                <p>Contact us</p>
              </div>
              <div className="reward_arrow">
                <img src="rtarrow.png" />
              </div>
            </div>
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
                  placeholder="Enter Your Email..."
                  value={mobileNumber}
                  onChange={handleMobileNumber}
                  // maxLength="10"
                />
                <p>edit</p>
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
                  <p>ResendOTP</p>
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
    </div>
  );
};

export default MobileAccount;
