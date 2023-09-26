import React from "react";
import "./supportsection.css";
import Support from "../../customcomponent/customsupport/Support";
import Free from "../../assest/Image/mission.png";
import Time from "../../assest/Image/timer (1).png";
import Secure from "../../assest/Image/shield (1).png";
import SupportImg from "../../assest/Image/24-7 (1).png";
import Offer from "../../assest/Image/price-tag.png";
import imageAssets from "../../imageAssets";

const SupportSection = () => {
  return (
    <div className="main_sopportsection">
      <div className="submain_sopportsection">
        <Support src={Free} h6="Free Shipping" p="For all orders $200" />
        <Support src={Time} h6="1 & 1 Return" p="Cancelation after 1 day" />
        <Support src={Secure} h6="100% Secure " p=" secure payments" />
        <Support src={SupportImg} h6="24/7 Supoort" p="Anywhere & anytime" />
        <Support
          src={imageAssets.priceTag}
          h6="Daily Offers"
          p="Discount up to 70% OFF"
        />
      </div>
    </div>
  );
};

export default SupportSection;
