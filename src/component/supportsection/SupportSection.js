import React from "react";
import "./supportsection.css";
import Support from "../../customcomponent/customsupport/Support";
const SupportSection = () => {
  return (
    <div className="main_sopportsection">
      <div className="submain_sopportsection">
        <Support src="mission.png" h6="Free Shipping" p="For all orders $200" />
        <Support
          src="timer (1).png"
          h6="1 & 1 Return"
          p="Cancelation after 1 day"
        />
        <Support src="shield (1).png" h6="100% Secure " p=" secure payments" />
        <Support src="24-7 (1).png" h6="24/7 Supoort" p="Anywhere & anytime" />
        <Support
          src="price-tag.png"
          h6="Daily Offers"
          p="Discount up to 70% OFF"
        />
      </div>
    </div>
  );
};

export default SupportSection;
