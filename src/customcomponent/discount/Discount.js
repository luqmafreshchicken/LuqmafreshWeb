import React from "react";
import "./discount.css";
import { NavLink } from "react-router-dom";

const Discount = ({
  bgColor,
  src,
  percen,
  text,
  radius,
  height,
  width,
  br,
  onclick,
  to,
  state,
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
          onClick={onclick}
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
          <NavLink to={to} state={state}>
            <img
              src={src}
              style={{ borderRadius: radius, height: height, width: width }}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Discount;
