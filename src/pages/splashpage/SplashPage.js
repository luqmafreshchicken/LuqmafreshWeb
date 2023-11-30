import React from "react";
import "./splashpage.css";

const SplashPage = () => {
  return (
    <div className="splash-container">
      <div className="splash-box">
        {/* logo */}
        <div className="splash-logo">
          <img src="MAIN LOGO2.png" />
        </div>
        {/* end logo */}

        {/* heading */}
        <div className="splash-heading">
          <h1>Non Vegeterien</h1>
          <p>ON 500+ Delights</p>
        </div>
        {/* end heading */}

        {/* list */}
        <div className="splash-list">
          <img src="checked (1).png" />
          <strong>500+ Delights</strong>to choose from
        </div>
        <div className="splash-list">
          <img src="checked (1).png" />
          <strong>No question asked</strong>return policy
        </div>
        <div className="splash-list">
          <img src="checked (1).png" />
          <strong>Free delivery</strong>on orders above Rs 100
        </div>

        {/* end list */}
        {/*  delivey logo */}
        <div className="splash-delevery">
          <img src="scooter1.png" />
        </div>
        {/* end delivey logo */}
        <p className="avilable-text">AVAILABLE ON</p>
        {/*  store */}
        <div className="app-store">
          <a href="https://play.google.com/store/apps/details?id=com.luqmafresh&hl=en&gl=US">
            <img src="App2.png" />
          </a>
          <a href="https://apps.apple.com/mn/app/luqmafresh-fish-chicken-meat/id6471521340">
            <img src="App3.png" />
          </a>
        </div>
        {/* end store */}
      </div>
    </div>
  );
};

export default SplashPage;
