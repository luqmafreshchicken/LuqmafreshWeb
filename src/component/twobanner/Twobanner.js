import React from "react";
import "./twobanner.css";
import Banner from "../../customcomponent/banner/Banner";
const Twobanner = () => {
  return (
    <div className="main_twobanner">
      <div className="onebanner">
        <Banner sty={{height:"45vh", borderTopRightRadius:"20px" , borderBottomRightRadius:"20px"}}/>
      </div>
      <div className="twobanner">
        <Banner sty={{height:"45vh", borderTopLeftRadius:"20px" , borderBottomLeftRadius:"20px"}}/>
      </div>
    </div>
  );
};

export default Twobanner;
