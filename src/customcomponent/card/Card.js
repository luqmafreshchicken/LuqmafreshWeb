import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { NavLink } from "react-router-dom";
import "./card.css";
import SearchModal from "../searchmodal/SearchModal";
import WhistList from "../whistlist/WhistList";
import { FaSearch, FaHeart, FaShareSquare } from "react-icons/fa";
import { RWebShare } from "react-web-share";


const Card = ({
  currency,
  offer,
  productName,
  weight,
  unit,
  total,
  cutotal,
  offer1,
  today,
  date,
  totalpayment,
  onclick,
  id,
  to,
  rating,
  img,
  onclick1 = () => {},
  onclick2 = () => {},
}) => {
  const [showData, setShowData] = useState(false);
  const [incre, setIncre] = useState(1);
  const [product, setProduct] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleDre = () => {
    if (incre >= 1) {
      setIncre(incre - 1);
    } else {
      setIncre(0);
    }
  };
  const handleIncre = () => {
    setIncre(incre + 1);
  };
  function handleShow() {
    setShowData(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <div className="singlecard">
      <NavLink to={to} state={{ id: id }} className="nav_list">
        <div className="image_singlecard">
          <img src={img} height="200" width="300" />
        </div>
      </NavLink>

      <div className="offer_singlecard">
        <h4>{offer}%</h4>
      </div>
      <div className="icons_img">
        <FaSearch className="fa_search" onClick={onclick1} />
        <FaHeart className="fa_search" onClick={onclick2} />
        <RWebShare
          data={{
            text: "Luqmafresh",
            url: "https://www.luqmafresh.com/",
            title: "Luqmafresh",
          }}
        >
          <FaShareSquare className="fa_search" onClick={onclick2} />
        </RWebShare>
      </div>
      <div className="rating">
        <Rating
          name="size-small"
          defaultValue={rating}
          style={{ fontSize: "20px", color: "#ff0040", gap: "0.2rem" }}
        />
      </div>
      <div className="name_singlecard">
        <p>{productName}</p>
      </div>
      <div className="weight_singlecard">
        <p>
          {weight}
          {unit}
        </p>
      </div>
      <div className="price_singlecard">
        <p style={{ color: "black" }}>
          {currency}
          {total}
        </p>
        <p style={{ textDecoration: "line-through", color: "grey" }}>
          {currency}
          {cutotal}
        </p>
        <p style={{ color: "green" }}>{offer1}%off</p>{" "}
      </div>
      <div className="today_singlecard">
        <p>{today}</p>
      </div>
      <div className="time_singlecard">
        <p>{date}</p>
      </div>
      <div onClick={onclick} className="total_singlecard">
        {!showData && <button onClick={handleShow}>ADD</button>}
        {showData && (
          <div className="incre_decre_btn" onClick={onclick}>
            <p onClick={() => handleDre()}>-</p>
            <p>{incre}</p>
            <p onClick={() => handleIncre()}>+</p>
          </div>
        )}

        <div className="ammount_singlecard">
          <p>
            Total{" "}
            <span>
              {currency}
              {totalpayment}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
