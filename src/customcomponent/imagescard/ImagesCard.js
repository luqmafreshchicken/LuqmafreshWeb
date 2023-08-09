import React from "react";
import "./imagecard.css";
const ImagesCard = () => {
  return (
    <div className="mainimagecard">
      <div className="imagecard">
        <div className="imagecard1">
          <img src="quality.png" />
          <div className="imagecard1_text">
            <p>
              Exquisite harvest, directly procured from its place of origin.
            </p>
          </div>
        </div>
        <div className="imagecard1">
          <img src="store.png" />
          <div className="imagecard1_text">
            <p>
              Specially crafted core manufacturing facility based on
              scientific principles.
            </p>
          </div>
        </div>
        <div className="imagecard1">
          <img src="badge.png" />
          <div className="imagecard1_text">
            <p>Adherence to rigorous quality inspections.</p>
          </div>
        </div>
        <div className="imagecard1">
          <img src="meat.png" />
          <div className="imagecard1_text">
            <p>Freshly delivered each day.</p>
          </div>
        </div>
        <div className="imagecard1">
          <img src="frying-pan.png"  style={{height:"120px", width:"180px"}} />
          <div className="imagecard1_text">
            <p>Embark on an exceptional culinary journey</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesCard;
