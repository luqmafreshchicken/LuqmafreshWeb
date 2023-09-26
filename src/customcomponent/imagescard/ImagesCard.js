import React from "react";
import "./imagecard.css";
import Image1 from "../../assest/Image/quality.png"
import Image2 from "../../assest/Image/store.png"
import Image3 from "../../assest/Image/badge.png"
import Image4 from "../../assest/Image/meat.png"
import Image5 from "../../assest/Image/frying-pan.png"

const ImagesCard = () => {
  return (
    <div className="mainimagecard">
      <div className="imagecard">
        <div className="imagecard1">
          <img src={Image1} />
          <div className="imagecard1_text">
            <p>
              Exquisite harvest, directly procured from its place of origin.
            </p>
          </div>
        </div>
        <div className="imagecard1">
          <img src={Image2} />
          <div className="imagecard1_text">
            <p>
              Specially crafted core manufacturing facility based on
              scientific principles.
            </p>
          </div>
        </div>
        <div className="imagecard1">
          <img src={Image3} />
          <div className="imagecard1_text">
            <p>Adherence to rigorous quality inspections.</p>
          </div>
        </div>
        <div className="imagecard1">
          <img src={Image4} />
          <div className="imagecard1_text">
            <p>Freshly delivered each day.</p>
          </div>
        </div>
        <div className="imagecard1">
          <img src={Image5}  />
          <div className="imagecard1_text">
            <p>Embark on an exceptional culinary journey</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesCard;
