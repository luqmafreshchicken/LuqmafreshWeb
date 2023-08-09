import React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

import Modal from "@mui/material/Modal";
import "./whistlist.css";

const SearchModal = ({
  whistlistOpen,
  handlewhistlistClose,
  onclick,
  proceedOTP,
  proceedsubmit,
  onclick1,
  onclick2,
  onChange,
  onChange1,
  value,
  value1,
  otpHide = false,
  btnShow = true,
  email,
  handleResendOTP = () =>{}
}) => {
  return (
    <div>
      <Modal
        open={whistlistOpen}
        onClose={handlewhistlistClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className="whist_list">
            <img
              src="cross.png"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1.5rem",
                cursor: "pointer",
              }}
              onClick={onclick}
            />

            <div className="whist_list_image_container">
              <img src="whist.png" />
            </div>
            <div className="whist_list_content_container">
              <div className="whist_list_input_container">
                <h4>Sign In</h4>
                <input
                  placeholder="Enter Email..."
                  value={value}
                  onChange={onChange}
                  type="email"
                  name="email"
                />
                {otpHide === true && (
                  <>
                    <input
                      placeholder="Enter OTP..."
                      value={value1}
                      onChange={onChange1}
                    />
                    <span>
                      One Time Password Send to <b>{email}</b>
                      .com. Please enter to complete verification
                    </span>
                    <p onClick={handleResendOTP}>Resend OTP</p>
                  </>
                )}
                {btnShow == false ? (
                  <button onClick={onclick1}>{proceedOTP}</button>
                ) : (
                  <button onClick={onclick2}>{proceedsubmit}</button>
                )}
              </div>
            </div>
          </div>
          <div className="predefine_massege_container">
            <div className="predefine_massege_content">
              <p>
                Note : Our website is now desktop-friendly, and we're diligently
                working on making it mobile-friendly too. Stay tuned for the
                mobile version coming soon! Enjoy it ! And we are also coming
                soon on Android and iOs App.
              </p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SearchModal;
