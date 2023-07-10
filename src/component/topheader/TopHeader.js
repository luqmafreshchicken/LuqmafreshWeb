import React from "react";
import "./topheader.css";

import {
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

const TopHeader = () => {
  return (
    <div className="topheader_container">
      {/* left side */}
      <div className="topheader_location">
        <div className="top_location">
          <img src="pin.png" />
          <p><span>Lucknow</span><br/> A Store Near Wazirgunj Aminabad, Lucknow</p>
        </div>
        <div className="toplemail_mob">
          <img src="smartphone.png" />
          <p>
            <b>+971 56 655 1636</b>
          </p>
        </div>
      </div>
      {/* end left side */}
      {/* right side */}

      <div className="topheader_icon">
        <FaFacebookF className="icon facebook" />
        <FaInstagram className="icon insta" />
        <FaTwitter className="icon twitter" />
        <FaYoutube className="icon youtube" />
        <FaLinkedinIn className="icon in" />
      </div>
      {/* end right side */}
    </div>
  );
};

export default TopHeader;
