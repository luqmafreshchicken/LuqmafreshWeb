import React from "react";
import "./searchproductlist.css";
import { NavLink } from "react-router-dom";
const SearchProductList = ({
  name,
  qty,
  offername,
  price,
  originprice,
  img,
  onclick,
  to,
  id,
  discount,
  currency
}) => {
  return (
    <div className="searchproductlist_component">
      <div className="searchproduct_img">
        <img src={img} />
      </div>
      <div className="searchproduct_content">
        <div className="searchproduct_weight_qty">
          <p>{name}</p>
        </div>
        <div className="searchproduct_name_price">
          {/* product name price */}
          <div className="productnameprice">
            <p>
              <span style={{ color: "black" }}> {currency}{price}</span>
              <span
                style={{
                  textDecoration: "line-through",
                  padding:"0rem 0.6rem"
                }}
              >
                {currency}{originprice}
              </span>
              <span style={{color:"green"}}>{discount}%</span>
            </p>
          </div>
          {/* end product name price */}
          <div className="producticon">
            <NavLink
              to={to}
              state={{ id: id }}
              className="nav_list"
              style={{ width: "100%" }}
            >
              <div className="add_to_cart" onClick={onclick}>
                Shop Now
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProductList;
