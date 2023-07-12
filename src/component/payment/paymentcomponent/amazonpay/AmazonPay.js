import React, { useState } from "react";
import "./amazonpay.css";

const AmazonPay = () => {
  const [amazon, setAmazon] = useState(false);

  return (
    <div className="amazon_container">
      {/* radio & amazon image */}
      <div className="amazon_select_content">
        <div className="radio_amazon_image">
          {/* amazon caontainer */}
          <div className="amazon_radio_btn"></div>
          <div className="amazon_image_container">
            <img src="Amazon.svg" height="100px" width="200px" />
          </div>
          <div
            className="amazon_linkaccount_text"
            onClick={() => setAmazon(true)}
          >
            <p>Link Account</p>
          </div>
          {/* end amazon caontainer */}
        </div>
      </div>
      {amazon == true ? (
        <div className="amazon_inputotp_container">
          <div className="amazon_inputotp_content">
            <div className="input_resend">
              <input placeholder="Enter OTP" type="" />
              <p> Resend </p>
            </div>
          </div>
        </div>
      ) : null}
      {amazon == true ? (
        <div className="amazon_payment_btn_container">
          <div className="amazon_payment_btn_content">
            <div className="amazon_payment_btn">
              <p>4653.33</p>
            </div>
          </div>
        </div>
      ) : null}
      {amazon == false ? (
        <div className="amazon_payment_btn_container">
          <div className="amazon_payment_btn_content">
            <div
              className="amazon_payment_btn"
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

export default AmazonPay;

{
  /*
 <div className="amazon_radio_btn"></div>
        <div className="amazon_image_container">
        <img src="Amazon.svg" height="100px" width="200px"/>
        </div>
        <div className="amazon_link_account" onClick={() => setAmazon(true)}>
          <p>Link Account</p>
        </div>
*/
}

{
  /* end radio & amazon image */
}
{
  /* input otp */
}
{
  /*amazon == true ? (
        <div className="amazon_inputotp_container">
          <div className="amazon_inputotp_content">
            <input placeholder="Enter OTP" type="" />
            <p> Resend </p>
          </div>
        </div>
      ) : null}
      {/* end input otp */
}
{
  /*amazon == true ? (
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
      )*/
}
