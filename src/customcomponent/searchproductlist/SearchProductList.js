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
}) => {
  return (
    <div className="searchproductlist_component">
      <div className="searchproduct_img">
        <img src={img} />
      </div>
      <div className="searchproduct_content">
        <div className="searchproduct_weight_qty">
          <p>{name}-</p>
        </div>
        <div className="searchproduct_name_price">
          {/* product name price */}
          <div className="productnameprice">
            <p>
              {offername}
              <span style={{ color: "black" }}> ₹{price}</span>{" "}
              <span
                style={{
                  textDecoration: "line-through",
                }}
              >
                ₹{originprice}
              </span>
              <span> ₹200</span>
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
                <p>View</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProductList;
