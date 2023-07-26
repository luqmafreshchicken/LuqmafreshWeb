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
      <div className="topheader_content">
        {/* left side */}
        <div className="topheader_location">
          <div className="top_location">
            <img src="pin.png" />
            <p>
              <span>Lucknow</span>
              <br /> A Store Near Wazirgunj Aminabad, Lucknow
            </p>
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
          {/*<p>Login</p>
        <p>|</p>
  <p>Sign in</p>*/}

          <a href="https://www.facebook.com/" target="_blank" rel="">
            <FaFacebookF className="icon facebook" />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <FaInstagram className="icon insta" />
          </a>
          <a href="https://twitter.com/i/flow/login?redirect_after_login=%2F" target="_blank">
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
