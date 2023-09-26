import React, { useState } from "react";
import "./mobilebottom.css";

import { NavLink } from "react-router-dom";
import imageAssets from "../../imageAssets";

const MobileBottomtab = ({ handleMobile }) => {
  return (
    <div className="mobile_bottom_container">
      <div className="mobile_bottom">
        <div className="bottom_tab1 " style={{ marginBottom: "0.4rem" }}>
          <NavLink
            to="/"
            className="mob_nav active"
            style={{ display: "grid", placeItems: "center" }}
          >
            <img src={imageAssets.icon} height="39px" width="32px" />
          </NavLink>
        </div>

        <div className="bottom_tab1">
          <NavLink to="/mobilecategorie" className="mob_nav">
            <div className="bottom_top_image">
              <img src={imageAssets.category} className="home" />
            </div>
            <p>Categories</p>
          </NavLink>
        </div>
        <div className="bottom_tab1" onClick={() => handleMobile()}>
          <div className="bottom_top_image">
            <img src={imageAssets.cart} className="home" />
          </div>
          <p>My Cart</p>
        </div>
        <div className="bottom_tab1">
          <NavLink to="/mobileaccount" className="mob_nav">
            <div className="bottom_top_image">
              <img src={imageAssets.account} className="home" />
            </div>
            <p>Account</p>
          </NavLink>
        </div>
      </div>
      {/* <ModalCart cartopen={cartopen} carthandleClose={carthandleClose} />*/}
    </div>
  );
};

export default MobileBottomtab;
