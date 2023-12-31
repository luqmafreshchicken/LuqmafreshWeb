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
  sendRating,
} from "../../../serverRequest/Index";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import Loader from "../../loder/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopHeader from "../../topheader/TopHeader";
import SendRating from "../sendrating/SendRating";

const ViewDetail = () => {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [address, setAddress] = useState([]);
  const [user, setUser] = useState([]);
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
  const [load, setLoad] = useState(false);
  const [cancelStatus, setCancelStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState(false);
  const [rating, setRating] = useState(false);
  const [ratingShow, setRatingShow] = useState(0);
  const [ratingMess, setRatingMess] = useState("");
  const [proID, setProID] = useState("");
  const [regionCancle, setRegionCancle] = useState(false)

  let location = useLocation();
  const id = location?.state?.orderId;

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
    orderDetails();
  }, []);

  const orderDetails = async (id) => {
    setLoad(true);
    const requestData = {
      id: location?.state?.orderId,
    };
    getOrderById(requestData).then((res) => {

      if (res.status == true) {
        setCancelStatus(res?.data?.orders[0]?.orderStatus);
        setUser(res?.data?.user[0]);
        setData(res?.data?.orders[0]?.productId);
        // console.log(
        //   res?.data?.orders[0]?.productId[0]?.id,
        //   "===========jhvjfiviv================="
        // );

        setOrder(res?.data?.orders[0]);
        setAddress(res?.data?.address[0]);
        setorderId(res?.data?.orders[0]?.orderId);
        setProID(res?.data?.orders[0]?.productId[0]?.id);
        setLoad(false);
      } else {
        setLoad(false);
      }
    });
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleOpen = () => setRegionCancle(true);
  const handleClose = () => setRegionCancle(false);

  const handleCancle = async () => {
    setLoad(true);
    const id = await getUserID();
    const requestData = {
      userId: id,
      orderId: location?.state?.orderId,
      remark: gender,
    };
    cancleOrder(requestData).then((res) => {
      if (res.status == true) {
        toast.success(res.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCancle(res.data);
        setLoad(false);
        // setOpen(false);
        setRegionCancle(false)
        orderDetails();
        setOrderStatus(true);
      } else {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoad(false);
      }
    });
  };

  const handleCartLogin = () => {
    setCartOpen(false);
  };

  const handleHome = () => {
    setCartOpen(false);
    setOpen(true);
  };

  const carthandleOpen = () => setCartOpen(true);
  const carthandleClose = () => setCartOpen(false);

  const handleclear = async (index) => {
    if (index == 4) {
      await localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  };
  const handleSubmit = () => {
    const requestData = {
      productId: proID,
    };
    sendRating(requestData).then((res) => {
      if (ratingShow == "") {
        toast.error("please select rating", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return false;
      }
      if (res.status == true) {
        toast.success(res.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRating(false);

        setLoad(false);
      } else {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoad(false);
      }
    });
  };

  const handleOpenRating = () => {
    setRating(true);
  };
  const handleRating = () => {
    setRating(false);
  };
  return (
    <>
      <TopHeader handleclear={() => handleclear(4)} />

      <div className="view_detail_header">
        <Header
          code={countrytitle}
          currency={countrycurrency}
          flag={flag}
          cartPrice={cartPrice}
          curr={countrycurrency}
          cartopen={cartOpen}
          carthandleClose={carthandleClose}
          carthandleOpen={carthandleOpen}
          totalAmount={cartPrice}
          handleclear={(index) => handleclear(index)}
          handleCartLogin={() => handleCartLogin()}
          handleHome={() => handleHome()}
          handleOpen={() => setOpen(true)}
          handleClose={() => setOpen(false)}
          open={open}
          modalcurrency={countrycurrency}
        />
      </div>
      <div className="order_view_detail">
        <div className="order_view_detail_container">
          {/* order heading */}
          <div className="order_heading ">
            {orderStatus == false ? (
              <h5>
                Thanks for your order,
                <br /> <span>{user?.name}</span>
              </h5>
            ) : (
              <h5>
                Your order has been cancelled!
                <br /> <span>{user?.name}</span>
              </h5>
            )}
          </div>
          {/* end order heading */}
          {/* order id para */}
          <div className="order_id_para ">
            <p>
              Here your conformation for Order Id <span>{orderId}</span>
            </p>
          </div>
          {/* end order para */}
          {/* order location */}

          {/* shipmenet cancle */}
          <div className="shipmenet_cancle_address">
            <p>
              <span>Delivery Address : </span>
              {address?.city}
            </p>
          </div>
          {/* end shipmenet cancle */}
          {/* order name */}
          <div className="order_name">
            {data.map((item, index) => (
              <div className="order_name_container">
                <span>{index + 1}</span>
                <div>
                  <div className="order_name_container_box">
                    <p>{item?.name}</p>
                  </div>
                  <div className="order_name_container_box_name">
                    <p>
                      {item?.quantity} {item?.unit}
                    </p>
                    <p>
                      {countrycurrency} {item?.price}
                    </p>
                    <p
                      style={{ textDecoration: "line-through", color: "gray" }}
                    >
                      {countrycurrency} {item?.originalPrice}
                    </p>
                    <p style={{ color: "green" }}>{item?.discount} %off</p>
                    <p>{item?.quantity} Qty</p>
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
                <p>
                  {countrycurrency} {order?.subtotal}
                </p>
              </div>
              <div className="bill_detail_price">
                <p style={{ color: "lightgray" }}>VAT 5% (Included)</p>
                <p>
                  {countrycurrency} {(order?.subtotal * 5) / 100}
                </p>
              </div>
              <div className="bill_detail_total">
                <p>Total</p>
                <p>
                  {countrycurrency} {order?.subtotal}
                </p>
              </div>
            </div>
          </div>
          {/* end bill detail */}

          {/* btn */}
          {cancelStatus != "cancelled" ? (
            <>
              <div className="bill_detail_container">
                <div className="bill_detail_button">
                  <div
                    className="bill_detail_button1"
                    onClick={() => handleOpenRating()}
                  >
                    Rating
                  </div>
                  <div className="bill_detail_button2" onClick={handleOpen}>
                    Order cancel
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {/* end btn */}
        </div>
      </div>
      <div>
        <Modal
          open={regionCancle}
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
            </div>
            {/* **************** */}
            <div className="conform_order_content">
              {/* **************** */}

              <div className="conform_order_button">
                <div className="do_not_cancle" onClick={() => setRegionCancle(false)}>
                  DO NOT CANCEL
                </div>

                <div className="do_not_cancle1" onClick={() => handleCancle()}>
                  CANCEL ORDER
                </div>
              </div>
              {/* **************** */}
            </div>
            {/* **************** */}
          </Box>
        </Modal>
        <Loader loading={load} />
      </div>
      <SendRating
        open={rating}
        handleClose={() => handleRating()}
        ratingShow={ratingShow}
        onchange1={(e) => setRatingShow(e.target.value)}
        value={ratingMess}
        onchange={(e) => setRatingMess(e.target.value)}
        onclick={() => handleSubmit()}
      />
    </>
  );
};

export default ViewDetail;
