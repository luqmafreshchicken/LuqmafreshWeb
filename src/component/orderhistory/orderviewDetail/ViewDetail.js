import React, { useEffect, useState } from "react";
import "./viewdetail.css";
import Header from "../../header/Header";
import { useLocation } from "react-router-dom";
import {
  CountryDetail,
  GetCountry,
  cancleOrder,
  getOrderById,
  getUserID,
} from "../../../serverRequest/Index";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const ViewDetail = () => {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [address, setaddress] = useState([]);
  const [orderId, setorderId] = useState("");
  const [cancle, setCancle] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartPrice, setCartPrice] = useState([]);
  const [country, setCountry] = useState("");
  const [countrycurrency, setCountryCurrency] = useState("");
  const [countrytitle, setCountryTitle] = useState("");
  const [flag, setFlag] = useState("");
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState("");

  let location = useLocation();
  const id = location.state.orderId;

  useEffect(() => {
    orderDetails();
  }, []);
  const orderDetails = async (id) => {
    const requestData = {
      id: location?.state?.orderId,
    };

    getOrderById(requestData).then((res) => {
      if (res.status == true) {
        setData(res?.data?.orders[0]?.productId);
        setOrder(res?.data?.orders[0]);
        // console.log(res?.data?.orders[0].subtotal);
        setaddress(res?.data?.address[0]);
        setorderId(res?.data?.orders[0]?.orderId);
      } else {
      }
    });
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const calculateTotalBill = () => {
    const subtotal = order.subtotal;
    const deliveryCharge = order.subtotal > 199 ? 0 : 40;
    return subtotal + deliveryCharge;
  };
  const handleCancle = async () => {
    const id = await getUserID();
    const requestData = {
      userId: id,
      id: location.state.orderId,
    };
    cancleOrder(requestData).then((res) => {
      if (res.status == true) {
        setCancle(res.data);
      } else {
      }
    });
  };

  const handleCartLogin = () => {
    setCartOpen(false);
  };

  const handleHome = () =>{
    setCartOpen(false)
    setOpen(true)
  }

  const carthandleOpen = () => setCartOpen(true);
  const carthandleClose = () => setCartOpen(false);

  const handleclear = async (index) => {
    if (index == 4) {
      await localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position?.coords?.latitude) {
            GetCountry(
              position?.coords?.latitude,
              position?.coords?.longitude
            ).then((res) => {
              if (res?.address?.country) {
                CountryDetail(res?.address?.country).then((res) => {
                  setCountry(res[0]?.name);
                  setCountryCurrency(res[0]?.currencies[0]?.symbol);
                  setCountryTitle(res[0]?.currencies[0]?.code);
                  setFlag(res[0]?.flags?.png);
                });
              }
            });
          }
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
    // localContent();
    // showcart();
  }, []);
  return (
    <>
      <div className="view_detail_header">
        <Header
        code={countrytitle}
        currency={countrycurrency}
        flag={flag}
        cartPrice={cartPrice}
        // cartProductlength={cartProduct}
        curr={countrycurrency}
        cartopen={cartOpen}
        carthandleClose={carthandleClose}
        carthandleOpen={carthandleOpen}
        // loginStatus={loginStatus}
        // handleOpen={() => setOpen(true)}
        // handleClose={() => setOpen(false)}
        // open={open}
        // showbtn={btn}
        // handleLogin={() => handleLogin()}
        // handleOTP={() => handleOTP()}
        // mobileNumber={mobileNumber}
        // handleMobileNumber={(e) => handleMobileNumber(e)}
        // sethandleOtp={(e) => sethandleOtp(e)}
        // otp={otp}
        totalAmount={cartPrice}
        // store={store}
        // modalcurrency={countrycurrency}
        handleclear={(index) => handleclear(index)}
        // removeProduct={(id) => removeCartProduct(id)}
        // handleResendOTP={() => handleResendOTP()}
        handleCartLogin={() => handleCartLogin()}
        handleHome ={() => handleHome()}
        />
      </div>
      <div className="order_view_detail">
        <div className="order_view_detail_container">
          {/* order heading */}
          <div className="order_heading ">
            <h5>Order Details</h5>
          </div>
          {/* end order heading */}
          {/* order id para */}
          <div className="order_id_para ">
            <p>
              Order ID: <span>{orderId}</span>
            </p>
          </div>
          {/* end order para */}
          {/* order location */}

          {/* end order location */}
          {/* order_cancelled */}
          <div className="order_cancelled">
            <div className="order_cancelled_container">
              <div className="order_cancelled_img_text">
                <img src="https://static.vecteezy.com/system/resources/previews/001/251/976/original/stocked-shelves-and-empty-shopping-cart-vector.jpg" />
                <p>
                  Your order was successfully cancelled! We would love to see
                  you back
                </p>
              </div>
            </div>
          </div>

          {/* end order_cancelled */}
          {/* items order */}
          <div className="items_ordered">
            <p>Order cancelled on May 19, 01:22 PM</p>
          </div>
          {/* end items order */}
          {/* shipmenet cancle */}
          <div className="shipmenet_cancle">
            <div className="shipmenet_cancle_address">
              <p>Rajaji puram, alamnagar saripura kanakcity, Lucknow </p>
            </div>
          </div>
          {/* end shipmenet cancle */}
          {/* order name */}
          <div className="order_name">
            {data.map((item) => (
              <div className="order_name_container">
                <h5>
                  Items Ordered<span> (1 items)</span>
                </h5>

                <div className="order_name_container_box">
                  <div className="order_name_container_box_image">
                    <img src={item.image} />
                  </div>
                  <div className="order_name_container_box_name">
                    <p>Chicken Breast Boneless</p>
                    <span>
                      {item.quantity}
                      {item.unit} x 1 qty
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* end order name */}
          {/* bill detail */}
          <div className="bill_detail">
            <div className="bill_full_detail">
              <h5>Bill Details</h5>
              <div className="bill_detail_price">
                <p>Subtotal</p>
                <p>₹{order.subtotal}</p>
              </div>
              <div className="bill_detail_price">
                <p>Delivery charge</p>
                <p>₹{order.subtotal > 199 ? 0 : 40}</p>
              </div>
              <div className="bill_detail_total">
                <p>Total</p>
                <p>₹{calculateTotalBill()}</p>
              </div>
            </div>
          </div>
          {/* end bill detail */}

          {/* btn */}
          <div className="bill_detail_container">
            <div className="bill_detail_button">
              <div className="bill_detail_button1">
                <p>Rating</p>
              </div>
              <div className="bill_detail_button2" onClick={handleOpen}>
                <p>Order cancelled</p>
              </div>
            </div>
          </div>
          {/* end btn */}
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="cancle_modal">
            <div className="Order_cancellation_head">
              <p>Order Cancellation</p>
            </div>
            <div className="select_cancle_reason">
              <p>Please select your reason for Cancellation</p>
            </div>
            {/* ********************** */}
            <div className="select_cancle_container">
              <div className="select_cancle_option">
                <div className="select_input_radio">
                  <input
                    type="radio"
                    checked={gender === "I choose a wrong address"}
                    value="I choose a wrong address"
                    onChange={handleGender}
                  />
                </div>
                <p>I choose a wrong address</p>
              </div>

              <div className="select_cancle_option">
                <div className="select_input_radio">
                  <input
                    type="radio"
                    checked={gender === "I forgot to add/remove items"}
                    value="I forgot to add/remove items"
                    onChange={handleGender}
                  />
                </div>
                <p>I forgot to add/remove items</p>
              </div>

              <div className="select_cancle_option">
                <div className="select_input_radio">
                  <input
                    type="radio"
                    checked={gender === "I forgot to apply coupon"}
                    value="I forgot to apply coupon"
                    onChange={handleGender}
                  />
                </div>
                <p>I forgot to apply coupon</p>
              </div>

              <div className="select_cancle_option">
                <div className="select_input_radio">
                  <input
                    type="radio"
                    checked={gender === "I am not at home"}
                    value="I am not at home"
                    onChange={handleGender}
                  />
                </div>
                <p>I am not at home</p>
              </div>

              <div className="select_cancle_option">
                <div className="select_input_radio">
                  <input
                    type="radio"
                    checked={
                      gender === "Item/items from order are no longer in stock"
                    }
                    value="Item/items from order are no longer in stock"
                    onChange={handleGender}
                  />
                </div>
                <p>Item/items from order are no longer in stock</p>
              </div>

              <div className="select_cancle_option">
                <div className="select_input_radio">
                  <input
                    type="radio"
                    checked={gender === "Other (please specify)"}
                    value="Other (please specify)"
                    onChange={handleGender}
                  />
                </div>
                <p>Other (please specify)</p>
              </div>
            </div>
            {/* **************** */}
            <div className="conform_order_content">
              {/* **************** */}

              <div className="conform_order_button">
                <div className="do_not_cancle">
                  <p>DO NOT CANCEL</p>
                </div>

                <div className="do_not_cancle1" onClick={() => handleCancle()}>
                  <p>CANCEL ORDER</p>
                </div>
              </div>
              {/* **************** */}
            </div>
            {/* **************** */}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ViewDetail;
