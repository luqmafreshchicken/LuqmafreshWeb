import React, { useState } from "react";
import "./paytm.css";

const Paytm = () => {
  const [paytm, setPaytm] = useState(false);

  return (
    <div className="paytm_container">
      {/* heading */}
      {/* <div className="paytm_heading">
        <p>paytm Pay</p>
  </div>*/}
      {/* end heading */}
      {/* radio & paytm image */}
      <div className="paytm_select_content">
        <div className="paytm_radio_btn"></div>
        <div className="paytm_image_container">
          <img src="paytm.png" />
        </div>
        <div className="paytm_link_account" onClick={() => setPaytm(true)}>
          <p>Link Account</p>
        </div>
      </div>
      {/* end radio & paytm image */}
      {/* input otp */}
      {paytm == true ? (
        <div className="paytm_inputotp_container">
          <div className="paytm_inputotp_content">
            <input placeholder="Enter OTP" type="" />
            <p> Resend </p>
          </div>
        </div>
      ) : null}
      {/* end input otp */}
      {paytm == true ? (
        <div className="paytm_payment_btn_container">
          <p>1246.65</p>
        </div>
      ) : (
        <div
          className="paytm_payment_btn_container"
          style={{ backgroundColor: "#a2a2a2", color: "white" }}
        >
          <p>1246.65</p>
        </div>
      )}
    </div>
  );
};

export default Paytm;
