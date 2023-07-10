import React, { useState } from "react";
import "./amazonpay.css";

const AmazonPay = () => {
  const [amazon, setAmazon] = useState(false);

  return (
    <div className="amazon_container">
      {/* heading */}
      {/* <div className="amazon_heading">
        <p>Amazon Pay</p>
  </div>*/}
      {/* end heading */}
      {/* radio & amazon image */}
      <div className="amazon_select_content">
        <div className="amazon_radio_btn"></div>
        <div className="amazon_image_container">
          <img src="Amazon.svg" />
        </div>
        <div className="amazon_link_account" onClick={() => setAmazon(true)}>
          <p>Link Account</p>
        </div>
      </div>
      {/* end radio & amazon image */}
      {/* input otp */}
      {amazon == true ? (
        <div className="amazon_inputotp_container">
          <div className="amazon_inputotp_content">
            <input placeholder="Enter OTP" type="" />
            <p> Resend </p>
          </div>
        </div>
      ) : null}
      {/* end input otp */}
      {amazon == true ? (
        <div className="amazon_payment_btn_container">
          <p>1246.65</p>
        </div>
      ) : (
        <div
          className="amazon_payment_btn_container"
          style={{ backgroundColor: "#a2a2a2", color: "white" }}
        >
          <p>1246.65</p>
        </div>
      )}
    </div>
  );
};

export default AmazonPay;
