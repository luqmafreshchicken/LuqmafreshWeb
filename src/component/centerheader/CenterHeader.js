import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import "./centerheader.css";
const CenterHeader = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = () => {
    setOpen(false);
    setOpen1(true);
  };
  const handleClose1 = () => setOpen1(false);
  return (
    <>
      <div className="center_header">
        <div className="firstcard_header">
          <p style={{fontSize:"40px", fontWeight:"bold", fontFamily:"italic", color:"#d11243"}}>Luqmafresh</p>
        </div>
        <div className="secondcard_header">
          <div class="input-group">
            <input
              type="text"
              className="form-control"
              aria-label="Dollar amount (with dot and two decimal places)"
              placeholder="Search..."
              style={{
                backgroundColor: "#e9ecef",
                height: "7vh",
                borderTopLeftRadius: "35px",
                borderBottomLeftRadius: "35px",
              }}
            />
            <span
              class="input-group-text"
              style={{
                borderTopRightRadius: "35px",
                borderBottomRightRadius: "35px",
              }}
            >
              <img src="search.png" height="20px" width="20px" />
            </span>
          </div>
        </div>
        <div className="subcenter_header">
          <div className="thirdcard_header">
            <img
              src="user (2).png"
              height="50px"
              width="50px"
              onClick={handleOpen}
            />
            <img src="heart.png" height="50px" width="50px" />
            <img src="web.png" height="50px" width="50px" />
          </div>
        </div>
      </div>

      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="style">
          <Button onClick={handleClose}>
            <img src="cross.png" className="cross_img" />
          </Button>

          <img
            src="https://www.itechscripts.com/blog/wp-content/uploads/2020/10/0-RHHxKod5FoRBI8Fk.png"
            className="sign_in_logo"
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="modal_style"
          >
            <div>
              <p style={{ padding: "0px 20px" }}>Sign in</p>
            </div>
            <div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "33ch" },
                }}
                noValidate
                autoComplete="off"
                style={{ padding: "0px 17px" }}
              >
                <TextField
                  id="standard-basic"
                  label="Mobile Number"
                  variant="standard"
                />
              </Box>
              <div style={{ padding: "30px 24px" }}>
                {" "}
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#d11243" }}
                  className="otp_btn"
                >
                  Proceed Via OTP
                </Button>
              </div>
              <div style={{ padding: "0px 24px" }}>
                {" "}
                <button
                  style={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "5px",
                    color: "blue",
                    fontSize: "15px",
                  }}
                  onClick={handleOpen1}
                >
                  Sign up?
                </button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>

      {/* Sign up */}
      <Modal
        open={open1}
        // onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="style1">
          <Button onClick={handleClose1}>
            <img src="cross.png" className="cross_img1" />
          </Button>
          <img src="food.png" className="sign_in_logo" />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="modal_style1"
          >
            <div>
              <p style={{ padding: "0px 20px", paddingBottom: "20px" }}>
                Sign up
              </p>
            </div>
            <div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "30ch" },
                }}
                noValidate
                autoComplete="off"
                style={{ padding: "0px 17px", marginTop: "-10%" }}
              >
                <TextField
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  label="Mobile"
                  variant="standard"
                />
              </Box>
              <div style={{ padding: "40px 24px" }}>
                {" "}
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#d11243" }}
                  className="res_btn"
                >
                  Register
                </Button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default CenterHeader;
