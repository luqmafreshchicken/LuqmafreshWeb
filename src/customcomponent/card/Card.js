import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { NavLink } from "react-router-dom";
import "./card.css";
import SearchModal from "../searchmodal/SearchModal";
import WhistList from "../whistlist/WhistList";
import { FaSearch, FaHeart, FaShareSquare } from "react-icons/fa";
import { RWebShare } from "react-web-share";
import { Tooltip as ReactTooltip } from "react-tooltip";

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
  onclick = () => {},
  id,
  to,
  rating,
  img,
  onclick1 = () => {},
  onclick2 = () => {},
  whist
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
          <img src={img} />
        </div>
      </NavLink>

      {/* <div className="offer_singlecard">
        <h4>{offer}%</h4>
      </div> */}
      <div className="icons_img">
        {/* <FaSearch
          className="fa_search"
          onClick={onclick1}
          data-tooltip-id="my-tooltip-1"
        /> */}
        {whist == false ? (
          <FaHeart
            className="fa_search"
            onClick={onclick2}
            data-tooltip-id="my-tooltip-2"
          />
        ) : (
          <FaHeart
            className="fa_search"
            onClick={onclick2}
            data-tooltip-id="my-tooltip-2"
            style={{color:"#ff0040"}}
          />
        )}

        {/* <RWebShare
          data={{
            text: "Luqmafresh",
            url: "https://www.luqmafresh.com/",
            title: "Luqmafresh",
          }}
        >
          <FaShareSquare
            className="fa_search"
            onClick={onclick2}
            data-tooltip-id="my-tooltip-3"
          />
        </RWebShare>
        <ReactTooltip id="my-tooltip-1" place="bottom" content="Quick View" />
        <ReactTooltip
          id="my-tooltip-2"
          place="bottom"
          content="Add Whistlist"
        /> */}
        {/* <ReactTooltip id="my-tooltip-3" place="bottom" content="Share Link" /> */}
      </div>
      <div className="rating">
        <Rating
           readOnly
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
     {/* <div className="today_singlecard">
        <p>{today}</p>
      </div>
      <div className="time_singlecard">
        <p>{date}</p>
      </div> */}
      <NavLink to={to} state={{ id: id }} className="nav_list">
        <div className="shop_now_btn">SHOP NOW</div>
      </NavLink>
    </div>
  );
};

export default Card;
