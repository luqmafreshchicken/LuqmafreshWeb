import * as React from "react";
import "./customtext.css";

export default function CustomText({ head, paratext }) {
  return (
    <div className="main_custom">
      <h6>{head}</h6>

      <p>{paratext}</p>
    </div>
  );
}
