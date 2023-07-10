import React from "react";
import "./imagecard.css";
const ImagesCard = () => {
  return (
    <div className="mainimagecard">
      <div className="imagecard">
        <div className="imagecard1">
          <img src="USP1.webp" />
          <p>Premium produce, sourced directly from the origin</p>
        </div>
        <div className="imagecard1">
          <img src="USP2.webp" />
          <p>Scientifically designed central production Unit</p>
        </div>
        <div className="imagecard1">
          <img src="USP3.webp" />
          <p>Compliance to stringent quality checks</p>
        </div>
        <div className="imagecard1">
          <img src="USP4.webp" />
          <p>Delivered fresh everyday</p>
        </div>
        <div className="imagecard1">
          <img src="USP5.webp" />
          <p>Experience extraordinary cooking</p>
        </div>
      </div>
    </div>
  );
};

export default ImagesCard;
