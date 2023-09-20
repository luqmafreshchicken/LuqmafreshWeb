import React, { useEffect, useState } from "react";
import { Show_Cart, getUserID } from "../../../serverRequest/Index";

const OnlineDelivery = ({ onClick, cartProduct, currency }) => {
  const [cartProduct1, setCartProduct1] = useState([]);

  // const incre = () => {
  //   setCount(count + 1);
  // };
  // const decre = () => {
  //   if (count > 0) {
  //     setCount(count - 1);
  //   } else {
  //     setCount(0);
  //   }
  // };
  useEffect(() => {
    window.scrollTo(0, 0);

    showcart();
  }, []);
  const showcart = async () => {
    const userId = await getUserID();
    const data = {
      userId: userId,
    };
    const res = await Show_Cart(data);
    if (res.status == true) {
      console.log(
        res.data.totalAmount,
        "===============kwbgckgfiugesri========================================kugfigiu="
      );
      setCartProduct1(res.data.cart);
    } else {
    }
  };

  // const calculateTotalBill = () => {
  //   const amount = cartProduct?.totalAmount;
  //   const vat = (cartPrice * 5) / 100;
  //   // setVatAmount(amount + vat)
  //   return amount + vat;
  // };

  // const removeProduct = async (productId) => {
  //   const userId = await getUserID();
  //   if (!userId) {
  //     console.log("User ID not found");
  //     return false;
  //   }
  //   if (!productId) {
  //     console.log("Product ID not found");
  //     return false;
  //   }
  //   const data = {
  //     userId: userId,
  //     productId: productId,
  //   };
  //   removeFromCart(data).then((res) => {
  //     showcart();
  //     console.log(res);
  //   });
  // };
  return (
    <div className="CashDelivery_container">
      <div className="cash_delivery_heading"></div>
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
      {cartProduct1?.length >= 1 ? (
        <button className="order_confirm_btn" onClick={onClick}>
          Pay {currency} {cartProduct}
        </button>
      ) : (
        <button className="order_confirm_btn disabled">
          Pay {currency} {cartProduct}
        </button>
      )}
    </div>
  );
};

export default OnlineDelivery;
