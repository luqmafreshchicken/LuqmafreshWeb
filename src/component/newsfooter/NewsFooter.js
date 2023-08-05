import React, { useState } from "react";
import "./newsfooter.css";
import { emailRegister } from "../../serverRequest/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewsFooter = () => {
  const [email, setEmail] = useState("");

 const handleSubscribe = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.trim() === "") {
    toast.error("Please enter your email", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (!emailRegex.test(email)) {
    toast.error("Invalid email format", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    const data = {
      email: email,
    };
    const res = await emailRegister(data);
    if (res.status == true) {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
};

  return (
    <div className="main_newsfooter">
      <div className="submain_newsfooter">
        {/* first card */}
        <div className="newsletter">
          <img src="email (1).png" />
          <div style={{ paddingRight: "40px", height: "6vh", lineHeight: 1 }}>
            <h5>Sign up to Newsletter</h5>
            <p>and receive ₹20 Coupon for first shopping</p>
          </div>
        </div>

        {/* second card */}

        <div className="subscribe">
          <input
            placeholder="Your Email Address..."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="subscribe_btn" onClick={() => handleSubscribe()}>
            <p>Subscribe!</p>
          </div>
        </div>

        {/* third card */}

        <div className="whatsapp">
          <img src="whatsapp.png" />
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
