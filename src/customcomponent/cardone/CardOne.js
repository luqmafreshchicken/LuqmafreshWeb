import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { NavLink } from "react-router-dom";
import "./cardone.css";
import { Add_to_cart, getUserID } from "../../serverRequest/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardOne = ({
  img1,
  img2,
  discount,
  name,
  qty,
  unit,
  price,
  originalprice,
  days,
  time,
  rating,
  to,
  id,
  onclick
}) => {
  const [incre, setIncre] = useState(1);
  const [showData, setShowData] = useState(false);

  

  function handleShow() {
    setShowData(true);
  }


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

  
  
  return (
    <div className="singlecard_combo">
      <NavLink to={to} className="nav_list" state={{id:id}}>
        <div className="image_doublecard">
          <img src={img1}  />
        </div>
      </NavLink>

        <div className="offer_singlecard">
          <h4>{discount}%</h4>
        </div>
        <div className="icons_img">
          <img src="sea.png" height="24px" width="24px" />
          <img src="heart.png" height="18px" width="18px" />
          <img src="bag.png" height="19px" width="19px" />
        </div>
        <div className="rating">
          <Rating name="size-small" defaultValue={rating} size="small" />
        </div>
        <div className="name_singlecard_combo">
          <p>{name}</p>
        </div>
        <div className="weight_singlecard">
          <p>
            {qty}
            {unit}
          </p>
        </div>
        <div className="price_singlecard">
          <p style={{ color: "black"}}>₹{price}</p>
          <p style={{ textDecoration: "line-through", color: "grey" }}>
            {" "}
            ₹{originalprice}
          </p>
          <p style={{ color: "green" }}>{discount}%off </p>{" "}
        </div>
        <div className="today_singlecard">
          <p>{days}</p>
        </div>
        <div className="time_singlecard">
          <p>{time}</p>
        </div>
        <div className="total_singlecard">
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
              Total <span>₹542</span>
            </p>
          </div>
        </div>
    </div>
  );
};

export default CardOne;
