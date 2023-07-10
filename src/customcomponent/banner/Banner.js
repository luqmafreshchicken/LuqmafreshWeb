import React from "react";
import "./banner.css";

const Banner = ({sty}) => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://badshahmasala.com/wp-content/uploads/2022/11/blog-1-nov-1.jpg"
            className="d-block w-100"
            alt="..."
            style={sty}
          />
        </div>
        <div className="carousel-item">
          <img
            src="BANNERS.jpeg"
            className="d-block w-100"
            alt="..."
            style={sty}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://rayalaseemaruchulu.com/assets/images/new_reservation-banner-2.jpg"
            className="d-block w-100"
            alt="..."
            style={sty}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Banner;
