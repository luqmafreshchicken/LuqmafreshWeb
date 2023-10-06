import React, { useEffect, useState } from "react";
import "./cashdelivery.css";
import {
  Show_Cart,
  getUserID,
  removeFromCart,
} from "../../../serverRequest/Index";

const CashDelivery = ({ onClick }) => {
  const [cartProduct, setCartProduct] = useState([]);
  useEffect(() => {

    showcart();
  });
  const showcart = async () => {
    const userId = await getUserID();
    const data = {
      userId: userId,
    };
    const res = await Show_Cart(data);
    if (res.status == true) {
      console.log(res.data);
      setCartProduct(res.data.cart);
    } else {
    }
  };
  const removeProduct = async (productId) => {
    const userId = await getUserID();
    if (!userId) {
      console.log("User ID not found");
      return false;
    }
    if (!productId) {
      console.log("Product ID not found");
      return false;
    }
    const data = {
      userId: userId,
      productId: productId,
    };
    removeFromCart(data).then((res) => {
      showcart();
      console.log(res);
    });
  };
  return (
    <div className="CashDelivery_container">
      {/*cartProduct.map((option, index) => (
        <div className="cash_delivery_card">
          <div className="cash_delivery_image">
            <img src={option.image} />
          </div>
          <div className="cash_delivery_content_text">
            <div className="cash_delivery_content_name">
              <p>{option.productId.name}</p>
            </div>
            <div className="cash_delivery_content_weight">
              <p style={{ color: "gray" }}>{option.productId.quantity}gms</p>
              <p style={{ color: "lightgreen" }}> ₹{option.productId.price}</p>

              <p style={{ textDecoration: "line-through" }}>
                {" "}
                ₹{option.productId.originalPrice}
              </p>
            </div>
          </div>
        </div>
      ))*/}
      {cartProduct?.length >= 1 ? (
        <button className="order_confirm_btn" onClick={onClick}>
          Proceed
        </button>
      ) : (
        <button className="order_confirm_btn disabled" disabled>
          Proceed
        </button>
      )}
    </div>
  );
};

export default CashDelivery;

{
  /*
 <div className="product_detail">
            <div className="subproduct_detail">
              <div className="number">
                <p>{index + 1}</p>
              </div>

              <div className="product_name">
                <p>{option.productId.name}</p>
              </div>
            </div>

            <div
              onClick={() => removeProduct(option._id)}
              className="product_cross"
            >
              <img src="cross.png" height="22px" width="22px" />
            </div>
          </div>
          <div className="peices_content">
            <div className="peices_price">
              <div className="border_peices">
              </div>
              <div className="color_count">
              </div>
              <div className="cut_count">
              </div>
            </div>
          </div>
*/
}
