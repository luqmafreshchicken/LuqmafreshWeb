import React, { useEffect } from "react";
import "./topheader.css";
import Location from "../../assest/Image/pin.png"
import Phone from "../../assest/Image/smartphone.png"

import {
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

const TopHeader = ({ handleclear, loginStatus }) => {
 
  return (
    <div className="topheader_container">
      <div className="topheader_content">
        {/* left side */}
        <div className="topheader_location">
          <div className="top_location">
            <img src={Location} />
            <p>
              <span>Our Shop Location</span>
              <br /> Lawnz Block 3, Al Warsan First, UAE
            </p>
          </div>

          <div className="toplemail_mob">
            <img src={Phone} />
            <p>
              <b> Customer Care : +971</b>
            </p>
          </div>
         
        </div>

        {/* end left side */}
        {/* right side */}

        <div className="topheader_icon">
          {loginStatus == true ? <p onClick={handleclear}>Logout</p> : null}

          <a href="https://www.facebook.com/" target="_blank" rel="">
            <FaFacebookF className="icon facebook" />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <FaInstagram className="icon insta" />
          </a>
          <a
            href="https://twitter.com/i/flow/login?redirect_after_login=%2F"
            target="_blank"
          >
            <FaTwitter className="icon twitter" />
          </a>
          <a href="https://www.youtube.com/" target="_blank">
            <FaYoutube className="icon youtube" />
          </a>
          <a href="https://www.linkedin.com/" target="_blank">
            <FaLinkedinIn className="icon in" />
          </a>
        </div>
        {/* end right side */}
      </div>
    </div>
  );
};

export default TopHeader;
