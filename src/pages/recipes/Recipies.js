import React from "react";
import Header from "../../component/header/Header";
import { useEffect } from "react";

const Recipies = () => {
  useEffect(() => window.scrollTo(0, 0));
  return (
    <div>
      <Header />
      <div className="affliate_heading">
        <h1>Recipies</h1>
        <p>Coming Soon</p>
      </div>
    </div>
  );
};

export default Recipies;
