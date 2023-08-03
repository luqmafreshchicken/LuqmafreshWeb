import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { NavLink } from "react-router-dom";
import "./customtodaycard.css";
import { FaSearch, FaHeart, FaShareSquare } from "react-icons/fa";

export default function CustomTodayCard({
  offer,
  productName,
  weight,
  total,
  cutotal,
  offer1,
  today,
  date,
  totalpayment,
  img,
  rating,
  id,
  to,
  onclick = () => {},
}) {
  const [incre, setIncre] = useState(1);
  const [showData, setShowData] = useState(false);

  const increment = () => {
    setIncre(incre + 1);
  };
  const decrement = () => {
    if (incre > 0) {
      setIncre(incre - 1);
    } else {
      setIncre(0);
    }
  };

  function handleShow() {
    setShowData(true);
  }
  return (
    <div className="singlecard_container">
      <div className="image_singlecard_detail">
        <NavLink to={to} state={{ id: id }} className="nav_list">
          <img src={img} />
        </NavLink>
      </div>
      <div className="offer_singlecard">
        <h4>{offer}%</h4>
      </div>
      <div className="icons_img">
        <FaSearch className="fa_search" />
        <FaHeart className="fa_search" />
        <FaShareSquare className="fa_search" />
      </div>
      <div className="rating">
        <Rating
          name="size-small"
          defaultValue={rating}
          size="small"
          style={{ fontSize: "20px", color: "#ff0040" }}
        />
      </div>
      <div className="name_singlecard">
        <p>{productName}</p>
      </div>
      <div className="weight_singlecard">
        <p>{weight}</p>
      </div>
      <div className="price_singlecard">
        <p style={{ color: "black" }}>₹{total}</p>
        <p style={{ textDecoration: "line-through", color: "grey" }}>
          ₹{cutotal}
        </p>
        <p style={{ color: "green" }}>{offer1}%off</p>{" "}
      </div>
      <div className="today_singlecard">
        <p>{today}</p>
      </div>
      <div className="time_singlecard">
        <p>{date}</p>
      </div>
      <div className="total_singlecard">
        {!showData && (
          <button
            onClick={() => {
              handleShow();
              onclick();
            }}
          >
            ADD
          </button>
        )}
        {showData && (
          <div className="incre_decre_btn" onClick={() => onclick()}>
            <p onClick={() => decrement()}>-</p>
            <p>{incre}</p>
            <p onClick={() => increment()}>+</p>
          </div>
        )}
       {/* <div className="ammount_singlecard">
          <p>
            Total <span>₹{totalpayment}</span>
          </p>
        </div>*/}
      </div>
    </div>
  );
}
