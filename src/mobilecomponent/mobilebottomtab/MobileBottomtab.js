import React, { useState } from "react";
import "./mobilebottom.css";

import { NavLink } from "react-router-dom";
import ModalCart from "../../pages/modalcart/ModalCart";

const MobileBottomtab = () => {
  const [cartopen, setCartopen] = useState(false);

  const carthandleOpen = () => setCartopen(true);
  const carthandleClose = () => setCartopen(false);
  return (
    <div className="mobile_bottom_container">
      <div className="mobile_bottom">
        <div className="bottom_tab1 " style={{marginBottom:"0.4rem"}}>
          <NavLink to="/" className="mob_nav active" style={{display:"grid", placeItems:"center"}}>
              <img src="ICON LOGO.png" height='39px' width='32px' />
          </NavLink>
        </div>

        <div className="bottom_tab1">
          <NavLink to="/mobilecategorie" className="mob_nav">
            <div className="bottom_top_image">
              <img src="application.png" className="home" />
            </div>
            <p>Categories</p>
          </NavLink>
        </div>
        <div className="bottom_tab1" onClick={carthandleOpen}>
          <div className="bottom_top_image">
            <img src="cart1.png" className="home" />
          </div>
          <p>My Cart</p>
        </div>
        <div className="bottom_tab1">
          <NavLink to="/mobileaccount" className="mob_nav">
            <div className="bottom_top_image">
              <img src="user (1).png" className="home" />
            </div>
            <p>Account</p>
          </NavLink>
        </div>
      </div>
      <ModalCart cartopen={cartopen} carthandleClose={carthandleClose} />
    </div>
  );
};

export default MobileBottomtab;
