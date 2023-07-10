import React from "react";
import "./text.css";

const Text = ({ heading1, text1 }) => {
  return (
    <div className="head_text_container">
      <div className="head_text">
        <h5>{heading1}</h5>
        <p>{text1}</p>
      </div>
    </div>
  );
};

export default Text;
