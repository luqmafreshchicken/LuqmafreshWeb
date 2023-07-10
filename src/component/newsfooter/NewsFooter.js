import React from "react";
import "./newsfooter.css";

const NewsFooter = () => {
  return (
    <div className="main_newsfooter">
      <div className="submain_newsfooter">
        {/* first card */}
        <div className="newsletter">
          <img src="email (1).png" height="50px" width="50px" />
          <div style={{ paddingRight: "40px", height: "6vh", lineHeight: 1 }}>
            <h5>Sign up to Newsletter</h5>
            <p>and receive ₹20 Coupon for first shopping</p>
          </div>
        </div>

        {/* second card */}

        <div className="subscribe">
          <input placeholder="Your Email Address..."/>
          <div className="subscribe_btn">
            <p style={{ textAlign: "center", paddingTop: "11px" }}>
              Subscribe!
            </p>
          </div>
        </div>

        {/* third card */}

        <div className="whatsapp">
          <img src="whatsapp.png" height="50px" width="50px" />
          <div
            style={{
              height: "5vh",
              lineHeight: 0.1,
            }}
          >
            <p>Call us 24/7</p>
            <h6>91 9695854347</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFooter;
