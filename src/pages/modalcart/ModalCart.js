import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./modalcart.css";
import { NavLink } from "react-router-dom";
import {
  getUserID,
  Show_Cart,
  removeFromCart,
  newArrival,
} from "../../serverRequest/Index";

const ModalCart = ({ cartopen, carthandleClose, onclick, onclose }) => {
  const [count, setCount] = useState(0);
  const [cartProduct, setCartProduct] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);
  const [data, setData] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);

  useEffect(() => {
    async function getData(res) {
      const newData = await newArrival();
      setData(newData.data);
    }
    getData();
  }, []);

  useEffect(() => {
    localContent();
    showcart();
    const interval = setInterval(showcart, 4000); // Call showcart every four seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // useEffect(() => {
  //   localContent();
  // }, []);

  const localContent = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    if (items) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  };

  const incre = () => {
    setCount(count + 1);
  };
  const decre = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };
  useEffect(() => {
    showcart();
  }, []);
  const showcart = async () => {
    const userId = await getUserID();
    const data = {
      userId: userId,
    };
    const res = await Show_Cart(data);
    if (res.status == true) {
      setCartProduct(res.data.cart);
      setCartPrice(res.data.totalAmount);
    } else {
    }
  };
  const removeProduct = async (productId) => {
    const userId = await getUserID();
    if (!userId) {
      return false;
    }
    if (!productId) {
      return false;
    }
    const data = {
      userId: userId,
      productId: productId,
    };
    removeFromCart(data).then((res) => {
      showcart();
    });
  };
  return (
    <div>
      <Modal
        open={cartopen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={onclose}
      >
        <Box className="style2">
          <button onClick={carthandleClose} className="modalcart_btn">
            <img src="cross.png" className="close_modal" />
          </button>
          {loginStatus == true ? (
            <>
              {cartProduct?.length >= 1 ? (
                <div className="modalcart_scroll_bar_container">
                  <div className="order_summary">
                    <p>Order Summary</p>
                  </div>
                  <div className="Cong_section">
                    <p> Your delivery charge is waived off!!!</p>
                  </div>
                  <div className="save_section">
                    <p>Congratulations! You've saved ₹24</p>
                  </div>
                  {cartProduct.map((option, index) => (
                    <div className="product_card">
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
                            <p>{option.productId.quantity}gms</p>
                          </div>
                          <div className="color_count">
                            <p> ₹{option.productId.price}</p>
                          </div>
                          <div className="cut_count">
                            <p> ₹{option.productId.originalPrice}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="biil_payment">
                    <div className="bill_name">
                      <p>Bill Details</p>
                    </div>
                    <div className="subbill_Detail">
                      <p style={{ paddingLeft: "15px", paddingTop: "15px" }}>
                        SubTotal
                      </p>
                      <p style={{ paddingRight: "15px", paddingTop: "15px" }}>
                        ₹ {cartPrice}
                      </p>
                    </div>
                    <div className="delivery_charge">
                      <p style={{ paddingLeft: "15px", paddingTop: "10px" }}>
                        Delivery Charge
                      </p>
                      <p style={{ paddingRight: "15px", paddingTop: "10px" }}>
                        ₹ 0
                      </p>
                    </div>
                    <div className="cong_charge_section">
                      <p style={{ paddingLeft: "15px" }}>
                        Congratulations, Your delivery charge is waived off!!!
                      </p>
                    </div>
                    <div className="border_line"></div>
                    <div className="total_payments">
                      <p style={{ paddingTop: "10px" }}>Total</p>
                      <p style={{ paddingTop: "10px", color: "#FF0040" }}>
                        ₹ {cartPrice}
                      </p>
                    </div>
                  </div>
                  {cartProduct?.length >= 1 ? (
                    <div className="proceed_section">
                      <div className="proceed_payment">
                        <p>Total : ₹{cartPrice}</p>
                      </div>
                      <div className="proceed_btn" onClick={onclick}>
                        <NavLink to="/addnewaddress" className="nav_list">
                          <p>Proceed to Checkout</p>
                        </NavLink>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <>
                  <div className="mobile_cart_nologin">
                    <img src="emty cart.png" />
                  </div>
                  <div className="cart_empty">
                    <h5>Your cart is empty</h5>
                    <p>
                      It appears that your cart is currently empty.<br/> Feel free to
                      explore our top categories and add items to your cart.
                    </p>
                  </div>
                </>
              )}
            </>
          ) : null}

          {loginStatus == false ? (
            <>
              <div className="mobile_cart_nologin">
                <img src="https://static.vecteezy.com/system/resources/previews/001/251/976/original/stocked-shelves-and-empty-shopping-cart-vector.jpg" />
              </div>
              <div className="mobile_shopping">
                <button>
                  <h6>Continue Shopping</h6>
                </button>
              </div>
            </>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCart;
