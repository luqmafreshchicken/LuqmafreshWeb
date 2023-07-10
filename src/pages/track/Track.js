import * as React from "react";
// import "./privacypolicy.css";
import Header from "../../component/header/Header";
import { useEffect } from "react";

export default function Track() {
  useEffect(() => window.scrollTo(0, 0));

  return (
    <div>
      <Header />
      <div className="pravacy_container">
        <div className="pravacy_content">
          <h2>Track Your Order</h2>
          <p>Coming Soon</p>
        </div>
      </div>
    </div>
  );
}
