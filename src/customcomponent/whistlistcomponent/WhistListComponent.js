import React from "react";
import "./whistlistcomponent.css";
import { NavLink } from "react-router-dom";

const WhistListComponent = ({
  name,
  qty,
  price,
  ogp,
  dis,
  unit,
  img,
  onclick,
  id,
  to
}) => {
  return (
    <div>
      {/* order list */}
      <div className="whist_list_component_container">
        <div className="whist_list_image">
          <img src={img} />
        </div>
        <div className="whist_list_text">
          <div className="whist_list_text_name">
            <p>{name}</p>
          </div>
          <div className="whist_list_text_qty">
            <p>
              {qty}
              {unit}
            </p>
            <p>{price}₹</p>
            <p style={{ textDecoration: "line-through", color: "grey" }}>
              {ogp}₹
            </p>
            <p style={{ color: "green" }}>{dis}%</p>
          </div>
        </div>
        <div className="whist_list_addtocart">
          <div className="remove_whist_list">
            <img src="cross.png" onClick={onclick} />
          </div>
          <NavLink to={to} state={{ id: id }} className="nav_list" >
          <div className="addto_cart">SHOP NOW</div>
          </NavLink>
        </div>
      </div>
      {/* end end list */}
    </div>
  );
};

export default WhistListComponent;
