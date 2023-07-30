import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./modalcart.css";
import { NavLink } from "react-router-dom";
import {
  getUserID,
  removeFromCart,
  newArrival,
  Show_Cart,
} from "../../serverRequest/Index";

const ModalCart = ({
  cartopen,
  carthandleClose,
  onclick,
  onclose,
  loginStatus,
  cartProduct,
  totalAmount,
  modalcurrency,
  removeProduct = () => {},
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData(res) {
      const newData = await newArrival();
      setData(newData.data);
    }
    getData();
  }, []);

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
                            <p>
                              {" "}
                              {modalcurrency}
                              {option.productId.price}
                            </p>
                          </div>
                          <div className="cut_count">
                            <p>
                              {" "}
                              {modalcurrency}
                              {option.productId.originalPrice}
                            </p>
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
                        Amount {modalcurrency}
                      </p>
                      <p style={{ paddingRight: "15px", paddingTop: "15px" }}>
                        {totalAmount}
                      </p>
                    </div>
                    <div className="subbill_Detail">
                      <p style={{ paddingLeft: "15px", paddingTop: "15px" }}>
                        Vat {modalcurrency}
                      </p>
                      <p style={{ paddingRight: "15px", paddingTop: "15px" }}>
                        {(totalAmount * 5) / 100}
                      </p>
                    </div>
                    {/* <div className="delivery_charge">
                      <p style={{ paddingLeft: "15px", paddingTop: "10px" }}>
                        Delivery Charge
                      </p>
                      <p style={{ paddingRight: "15px", paddingTop: "10px" }}>
                        {modalcurrency}
                        {totalAmount > 200 ? 0 : 50}
                      </p>
                    </div> */}
                    <div className="cong_charge_section">
                      <p style={{ paddingLeft: "15px" }}>
                        Congratulations, Your delivery charge is waived off!!!
                      </p>
                    </div>
                    <div className="border_line"></div>
                    <div className="total_payments">
                      <p style={{ paddingTop: "10px" }}>Total Amount {modalcurrency} </p>
                      <p style={{ paddingTop: "10px", color: "#FF0040" }}>
                        {/* {modalcurrency}
                        {totalAmount > 200
                          ? totalAmount + (totalAmount * 5) / 100
                          : totalAmount + 50 + (totalAmount * 5) / 100} */}
                        {totalAmount + (totalAmount * 5) / 100}
                      </p>
                    </div>
                  </div>
                  {cartProduct?.length >= 1 ? (
                    <div className="proceed_section">
                      <div className="proceed_payment">
                        <p>
                          {/* {" "}
                          Total : {modalcurrency}
                          {totalAmount > 200
                            ? totalAmount + (totalAmount * 5) / 100
                            : totalAmount + 50 + (totalAmount * 5) / 100} */}
                            {modalcurrency} {totalAmount + (totalAmount * 5) / 100}
                        </p>
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
                      It appears that your cart is currently empty.
                      <br /> Feel free to explore our top categories and add
                      items to your cart.
                    </p>
                  </div>
                </>
              )}
            </>
          ) : null}

          {loginStatus == false ? (
            <>
              <div className="mobile_cart_nologin">
                <img src="lock.png" />
              </div>
              <div className="cart_empty">
                <h5>Please Login First</h5>
                <p>
                  It seems that you haven't logged in yet. Please feel welcome
                  to log in and explore our premium categories, as well as add
                  items to your cart.
                </p>
              </div>
            </>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCart;
