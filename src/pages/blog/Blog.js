import React from "react";
import "./blog.css";
import Header from "../../component/header/Header";
import { useEffect } from "react";

export default function Blog() {
  useEffect(() => window.scrollTo(0, 0));
  return (
    <div>
      <Header />
      <div className="affliate_heading">
        <h1>BLogs</h1>
        <p>Coming Soon</p>
      </div>
    </div>
  );
}
