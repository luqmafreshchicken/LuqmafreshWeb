import React from "react";
import "./discount.css";

const Discount = ({
  bgColor,
  src,
  percen,
  text,
  radius,
  height,
  width,
  br,
}) => {
  return (
    <div className="main_discount">
      <div className="main_discount1">
        <div
          style={{
            backgroundColor: bgColor,
            borderRadius: br,
          }}
          className="main_discount2"
        >
        <div className="upto_text_center">
          <h1>
            UPTO <br />
            {percen}%
            <br /> OFF
          </h1>
          <p>{text}</p>
          </div>
        </div>
        <div className="discount_image">
          <img
            src={src}
            style={{ borderRadius: radius, height: height, width: width }}
          />
        </div>
      </div>
    </div>
  );
};

export default Discount;
