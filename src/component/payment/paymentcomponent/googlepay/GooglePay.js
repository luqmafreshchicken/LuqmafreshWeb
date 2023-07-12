import "./googlepay.css";
import React, { useState } from "react";


const GooglePay = () => {
  const [googlepay, setGooglepay] = useState(false);

  return (
    <div className="googlepay_container">
      {/* radio & googlepay image */}
      <div className="googlepay_select_content">
        <div className="radio_googlepay_image">
          {/* googlepay caontainer */}
          <div className="googlepay_radio_btn"></div>
          <div className="googlepay_image_container">
            <img src="GooglePay.png" height="30px" width="150px" />
          </div>
          <div
            className="googlepay_linkaccount_text"
            onClick={() => setGooglepay(true)}
          >
            <p>Link Account</p>
          </div>
          {/* end googlepay caontainer */}
        </div>
      </div>
      {googlepay == true ? (
        <div className="googlepay_inputotp_container">
          <div className="googlepay_inputotp_content">
            <div className="input_resend">
              <input placeholder="Enter OTP" type="" />
              <p> Resend </p>
            </div>
          </div>
        </div>
      ) : null}
      {googlepay == true ? (
        <div className="googlepay_payment_btn_container">
          <div className="googlepay_payment_btn_content">
            <div className="googlepay_payment_btn">
              <p>4653.33</p>
            </div>
          </div>
        </div>
      ) : null}
      {googlepay == false ? (
        <div className="googlepay_payment_btn_container">
          <div className="googlepay_payment_btn_content">
            <div
              className="googlepay_payment_btn"
              style={{ backgroundColor: "#a2a2a2", color: "white" }}
            >
              <p>653.33</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GooglePay;

