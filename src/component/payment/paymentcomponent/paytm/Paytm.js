import React, { useState } from "react";
import "./paytm.css";

const Paytm = () => {
  const [paytm, setPaytm] = useState(false);

  return (
    <div className="paytm_container">
      {/* radio & paytm image */}
      <div className="paytm_select_content">
        <div className="radio_paytm_image">
          {/* paytm caontainer */}
          <div className="paytm_radio_btn"></div>
          <div className="paytm_image_container">
            <img src="paytm.png" height="35px" width="130px" />
          </div>
          <div
            className="paytm_linkaccount_text"
            onClick={() => setPaytm(true)}
          >
            <p>Link Account</p>
          </div>
          {/* end paytm caontainer */}
        </div>
      </div>
      {paytm == true ? (
        <div className="paytm_inputotp_container">
          <div className="paytm_inputotp_content">
            <div className="input_resend">
              <input placeholder="Enter OTP" type="" />
              <p> Resend </p>
            </div>
          </div>
        </div>
      ) : null}
      {paytm == true ? (
        <div className="paytm_payment_btn_container">
          <div className="paytm_payment_btn_content">
            <div className="paytm_payment_btn">
              <p>4653.33</p>
            </div>
          </div>
        </div>
      ) : null}
      {paytm == false ? (
        <div className="paytm_payment_btn_container">
          <div className="paytm_payment_btn_content">
            <div
              className="paytm_payment_btn"
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

export default Paytm;

