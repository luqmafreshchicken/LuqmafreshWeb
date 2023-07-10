import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRegister, otpVerify } from "../../serverRequest/Index";

const LoginPage = ({ open1, handleClose }) => {
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [btn, setBtn] = useState(false);
  const [otp, setOtp] = useState("");
  const [showbtn, setShowbtn] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    localContent();
  }, []);

  const localContent = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    if (items) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  };

  const handleLogin = () => {
    const requestData = { countryCode: "+91", mobile: mobileNumber };
    loginRegister(requestData).then((res) => {
      setShowInput(!showInput);
      setShowbtn(true);
    });
  };

  const handleOTP = () => {
    const requestData = { mobile: mobileNumber, otp: otp };
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
        open1(false)
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
    if (e.target.value.length == 10) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  };

  return (
    <div>
      <Modal
        open={open1}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="style">
          <div className="close_btn_cross" onClick={handleClose}>
            <img src="crossbtn.png" className="cross_img" />
          </div>
          <img
            src="https://images.unsplash.com/photo-1606471191009-63994c53433b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
            className="sign_in_logo"
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="modal_style"
          >
            <div className="sign_up">
              <p
                style={{
                  padding: "0px 20px",
                  paddingTop: "20px",
                  color: "#d11243",
                  fontWeight: "bold",
                }}
              >
                Sign in
              </p>
            </div>
            <div className="text_feild">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "30.5ch" },
                }}
                noValidate
                autoComplete="off"
                style={{ padding: "0px 17px", display: "flex" }}
              >
                <TextField
                  id="standard-basic"
                  label="Mobile Number"
                  variant="standard"
                  value={mobileNumber}
                  onChange={handleMobileNumber}
                />
                <p className="edit_mobile">edit</p>
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "30.5ch" },
                }}
                noValidate
                autoComplete="off"
                style={{ padding: "0px 17px", display: "flex" }}
                hidden={!showInput}
              >
                <TextField
                  id="standard-basic"
                  label="Enter OTP"
                  variant="standard"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <p className="resend_otp">Resend</p>
              </Box>

              <div style={{ padding: "30px 24px" }} className="via_btn_btn">
                {showbtn == false ? (
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: btn === true ? "#C42118" : "#C42118",
                      opacity: btn === true ? 0.4 : 100,
                      color: btn === true ? "white" : "white",
                    }}
                    className="otp_btn"
                    // onClick={() => setShowInput(!showInput)}
                    onClick={() => handleLogin()}
                    disabled={btn}
                  >
                    Proceed Via OTP
                  </Button>
                ) : null}
                {showInput == true ? (
                  <button
                    onClick={() => handleOTP()}
                    style={{
                      backgroundColor: "#C42118",
                      width: "100%",
                      height: "6vh",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Submit
                  </button>
                ) : null}
              </div>
            </div>
          </Typography>
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
    </div>
  );
};

export default LoginPage;