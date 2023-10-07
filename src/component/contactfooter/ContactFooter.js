import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./contactfooter.css";
import { NavLink } from "react-router-dom";
import {
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import Android from "../../customcomponent/androidmodal/Android";
import Ard from "../../assest/Image/App2.png"
import IOS from "../../assest/Image/App3.png"
import Payment from "../../assest/Image/payment1.png"



export default function ContactFooter() {
  const [androidopen, setAndroidopen] = React.useState(false);
  const [iOsopen, setIOsopen] = React.useState(false);

  const handleAndroid = () => setAndroidopen(true);
  const handleClose = () => setAndroidopen(false);

  const handleiOs = () => setIOsopen(true);
  const handleCloseIos = () => setIOsopen(false);
  return (
    <Box className="maincontactfooter">
      <Grid className="contactfooter">
        {/* card1 */}
        <Grid item className="contact1">
          <p>EXPERIENCE LUQMAFRESH APP ON MOBILE</p>
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
            className="store_img"
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.luqmafresh"
              target="_blank"
            >
              <img src={Ard} />
            </a>
            <img src={IOS} onClick={handleiOs} />
          </div>
          <p
            style={{
              paddingTop: "1.5rem",
            }}
          >
            FOLLOW ON US
          </p>
          <div className="all_icons">
            <a href="https://www.facebook.com/" target="_blank">
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
        </Grid>
        {/* card2 */}

        <Grid item className="contact2">
          <h6>USEFUL LINKS</h6>
          <NavLink to="whyluqmafresh" className="nav_list">
            <p>Why Luqmafresh?</p>
          </NavLink>
          <NavLink to="affliatemarket" className="nav_list">
            <p>Affliate Market</p>
          </NavLink>
          <NavLink to="https://www.youtube.com/" className="nav_list">
            <p>Careers</p>
          </NavLink>
          <NavLink to="franchies" className="nav_list">
            <p>For Franchies</p>
          </NavLink>
          <NavLink to="blog" className="nav_list">
            <p>Blog</p>
          </NavLink>
          <NavLink to="recipies" className="nav_list">
            <p>Recipies</p>
          </NavLink>
        </Grid>

        {/* card3 */}

        <Grid item className="contact3">
          <h6>Customer Policies</h6>
          <NavLink to="privacypolicy" className="nav_list">
            <p>Privacy Policy</p>
          </NavLink>
          <NavLink to="termsconditions" className="nav_list">
            <p>Terms & Conditions</p>
          </NavLink>
          <NavLink to="faq" className="nav_list">
            <p>FAQ</p>
          </NavLink>
          <NavLink to="track" className="nav_list">
            {" "}
            <p>Track Order</p>
          </NavLink>
          <NavLink className="nav_list">
            <p>Cancellation</p>
          </NavLink>
          {/* <NavLink to="blog" className="nav_list">
            <p>BLOG</p>
          </NavLink>*/}
        </Grid>

        {/* card4 */}

        <Grid item className="contact4">
          <h6>Customer Care</h6>
          <p>Call: +971</p>
          <p>info@luqmafresh.com</p>
          <p>REGISTERED OFFICE ADDRESS</p>
          <p>House of Luqmafresh, UAE</p>
          <p>Dubai.</p>
          <h5>PAYMENT OPTIONS</h5>
          <img src={Payment} />
          <h6>HAVE ANY CONCERN?</h6>

          <p>mail : info@luqmafresh.com</p>
        </Grid>
      </Grid>
      <Android
        androidopen={androidopen}
        handleAndroid={handleClose}
        heading="Android Application"
        para="Luqmafresh,  Android Application are coming soon few days then enjoy it."
      />
      <Android
      androidopen={iOsopen}
      handleAndroid={handleCloseIos}
      heading="iOs Application"
      para="Luqmafresh,  iOs Application are coming soon then enjoy it."
    />
    </Box>
  );
}
