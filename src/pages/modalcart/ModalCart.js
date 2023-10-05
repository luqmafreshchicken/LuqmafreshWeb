import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./modalcart.css";
import { NavLink } from "react-router-dom";
import { newArrival } from "../../serverRequest/Index";
import CrossBtn from "../../assest/Image/crossbtn.png";
import Lock from "../../assest/Image/lock.png";
import Cross from "../../assest/Image/cross.png";
import Empty from "../../assest/Image/emty cart.png";

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
  handleCartLogin = () => {},
  handleHome = () => {},
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
        <Box>
          <div className="style2">
            {loginStatus == true ? (
              <>
                {cartProduct?.length >= 1 ? (
                  <div className="modalcart_scroll_bar_container">
                    <div className="order_summary">
                      <p>Your Order List</p>
                    </div>

                    {cartProduct?.map((option, index) => (
                      <div className="product_card">
                        <div className="product_detail">
                          <div className="subproduct_detail">
                            <div className="number">
                              <p>{index + 1}</p>
                            </div>

                            <div className="product_name">
                              <p>
                                {option?.productId?.name} - {option?.quantity}{" "}
                                Qty
                              </p>
                            </div>
                          </div>

                          <div
                            onClick={() => removeProduct(option?._id)}
                            className="product_cross"
                          >
                            <img src={Cross} height="22px" width="22px" />
                          </div>
                        </div>
                        <div className="peices_content">
                          <div className="peices_price">
                            <div className="color_count">
                              <p>
                                {modalcurrency}
                                {option?.productId?.price}
                              </p>
                            </div>
                            <div className="cut_count">
                              <p>
                                {modalcurrency}
                                {option?.productId?.originalPrice}
                              </p>
                            </div>
                            <div className="total_cart_amount">
                              <p>
                                {modalcurrency}
                                {option?.quantity * option?.productId?.price}
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
                          Amount {modalcurrency} :
                        </p>
                        <p style={{ paddingRight: "15px", paddingTop: "15px" }}>
                          {totalAmount}
                        </p>
                      </div>
                      <div
                        className="subbill_Detail"
                        style={{ color: "lightgray" }}
                      >
                        <p style={{ paddingLeft: "15px", paddingTop: "15px" }}>
                          VAT (Include) 5% :
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
                        {totalAmount}
                      </p>
                    </div> */}
                      <div className="border_line"></div>
                      <div className="total_payments">
                        <p style={{ paddingTop: "10px" }}>
                          Total Amount {modalcurrency} :
                        </p>
                        <p style={{ paddingTop: "10px", color: "#FF0040" }}>
                          {totalAmount}
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
                            {modalcurrency} {totalAmount}
                          </p>
                        </div>
                        <div className="proceed_btn" onClick={onclick}>
                          <NavLink to="/addnewaddress" className="nav_list">
                            <p> Checkout</p>
                          </NavLink>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <>
                    <div className="cartEmptyContainer">
                      <div className="cartEmptyContent">
                        <div className="cartEmptyImg">
                          <img src={Empty} />
                        </div>
                        <h5>Your cart is empty</h5>
                        <p>
                          It appears that your cart is currently empty.
                          <br /> Feel free to explore our top categories and add
                          items to your cart.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : null}

            {loginStatus == false ? (
              <>
                {cartProduct?.length >= 1 ? (
                  <div className="modalcart_scroll_bar_container">
                    <div className="order_summary">
                      <p>Your Order List</p>
                    </div>

                    {cartProduct.map((option, index) => (
                      <div className="product_card">
                        <div className="product_detail">
                          <div className="subproduct_detail">
                            <div className="number">
                              <p>{index + 1}</p>
                            </div>

                            <div className="product_name">
                              <p>
                                {option?.productId?.name} -{" "}
                                {option?.productId?.quantity} Qty
                              </p>
                            </div>
                          </div>

                          <div
                            onClick={() => removeProduct(option?._id)}
                            className="product_cross"
                          >
                            <img src={Cross} height="22px" width="22px" />
                          </div>
                        </div>
                        <div className="peices_content">
                          <div className="peices_price">
                            <div className="color_count">
                              <p>
                                {" "}
                                {modalcurrency}
                                {option?.productId?.price}
                              </p>
                            </div>
                            <div className="cut_count">
                              <p>
                                {" "}
                                {modalcurrency}
                                {option?.productId?.originalPrice}
                              </p>
                            </div>

                            <div className="total_cart_amount">
                              <p>-</p>
                            </div>
                            <div className="total_cart_amount">
                              <p>
                                {modalcurrency}
                                {option?.productId?.quantity *
                                  option?.productId?.price}
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
                          Amount {modalcurrency} :
                        </p>
                        <p style={{ paddingRight: "15px", paddingTop: "15px" }}>
                          {totalAmount}
                        </p>
                      </div>
                      <div className="subbill_Detail">
                        <p style={{ paddingLeft: "15px", paddingTop: "15px" }}>
                          Vat {modalcurrency} 5% :
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
                     
                      <div className="border_line"></div>
                      <div className="total_payments">
                        <p style={{ paddingTop: "10px" }}>
                          Total Amount {modalcurrency} :
                        </p>
                        <p style={{ paddingTop: "10px", color: "#FF0040" }}>
                          {totalAmount}
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
                            {modalcurrency} {totalAmount}
                          </p>
                        </div>
                        <div
                          className="proceed_btn"
                          onClick={handleHome}
                          style={{ cursor: "pointer" }}
                        >
                          <p> Checkout</p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <>
                    <div className="mobile_cart_nologin">
                      <div className="noLoginUser">
                        <img src={Lock} />
                      </div>
                    </div>
                    <div className="cart_empty">
                      <div className="emptyText">
                        <h5>Please Login First</h5>
                        <p>
                          It seems that you haven't logged in yet. Please feel
                          welcome to log in and explore our premium categories,
                          as well as add items to your cart.
                        </p>
                      </div>
                      <button onClick={handleCartLogin}>
                        Continue Shopping
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : null}
          </div>
          <div className="crossbtn" onClick={carthandleClose}>
            <img src={CrossBtn} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCart;
