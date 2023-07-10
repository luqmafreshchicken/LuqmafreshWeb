import React, { useState } from "react";
import "./googlepay.css";

const GooglePay = () => {
  const [googlepay, setgooglepay] = useState(false);

  return (
    <div className="googlepay_container">
      {/* heading */}
      {/* <div className="googlepay_heading">
        <p>googlepay Pay</p>
  </div>*/}
      {/* end heading */}
      {/* radio & googlepay image */}
      <div className="googlepay_select_content">
        <div className="googlepay_radio_btn"></div>
        <div className="googlepay_image_container">
          <img src="GooglePay.png" />
        </div>
        <div className="googlepay_link_account" onClick={() => setgooglepay(true)}>
          <p>Link Account</p>
        </div>
      </div>
      {/* end radio & googlepay image */}
      {/* input otp */}
      {googlepay == true ? (
        <div className="googlepay_inputotp_container">
          <div className="googlepay_inputotp_content">
            <input placeholder="Enter OTP" type="" />
            <p> Resend </p>
          </div>
        </div>
      ) : null}
      {/* end input otp */}
      {googlepay == true ? (
        <div className="googlepay_payment_btn_container">
          <p>1246.65</p>
        </div>
      ) : (
        <div
          className="googlepay_payment_btn_container"
          style={{ backgroundColor: "#a2a2a2", color: "white" }}
        >
          <p>1246.65</p>
        </div>
      )}
    </div>
  );
};

export default GooglePay;
