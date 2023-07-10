import React from "react";
import "./support.css";

const Support = ({src, h6, p}) => {
  return (
    <div className="content_support">
      <img src={src} />
      <div style={{paddingTop:"15px"}}>
        <h6>{h6}</h6>
        <p>{p}</p>
      </div>
    </div>
  );
};

export default Support;
