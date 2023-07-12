import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import "./payment.css";
import Steps from "../../customcomponent/steps/Steps";
import CashDelivery from "./paymentcomponent/CashDelivery";
import OnlineDelivery from "./paymentcomponent/OnlineDelivery";
import CouponModal from "./paymentcomponent/couponmodal/CouponModal";
import { NavLink, useLocation } from "react-router-dom";
import {
  Show_Cart,
  createOrder,
  getUserID,
  verifyPayment,
} from "../../serverRequest/Index";
import Account from "../accountsection/Account";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import Loader from "../loder/Loader";
import AmazonPay from "./paymentcomponent/amazonpay/AmazonPay";
import GooglePay from "./paymentcomponent/googlepay/GooglePay";
import Paytm from "./paymentcomponent/paytm/Paytm";
import PayUsingUPI from "./paymentcomponent/payusingupi/PayUsingUPI";
import Credit from "./paymentcomponent/credit/Credit";
import NetBanking from "./paymentcomponent/netbanking/NetBanking";

const Payment = () => {
  let navigate = useNavigate();
  const Razorpay = useRazorpay();

  const location = useLocation();
  const addressID = location.state.addressId;
  const slotID = location.state.slotId;

  const [open, setOpen] = useState(0);
  const [couponModal, setCouponModal] = React.useState(false);
  const [method, setMethod] = React.useState("cod");
  const [load, setLoad] = React.useState(false);
  const [cartProduct, setCartProduct] = useState([]);

  const handleOpen = () => setCouponModal(true);
  const handleClose = () => setCouponModal(false);

  const paymentMethods = async () => {
    setLoad(true);
    const id = await getUserID();
    const requestData = {
      userId: id,
      addressId: addressID,
      timeSlotId: slotID,
      method: method,
      couponCode: "",
    };
    createOrder(requestData).then((res) => {
      if (res.status == true) {
        if (method === "online") {
          setLoad(false);
          handlePayment(res.data.data);
        } else {
          setLoad(false);
          navigate("/account");
        }
      } else {
        console.log("Error in create order");
      }
    });
  };
  const handlePayment = async (params) => {
    // const order = await createOrder(params); //  Create order on your backend

    const options = {
      key: "rzp_test_tOH1E84QsR3LSK",
      amount: params.amount,
      currency: "INR",
      name: "Luqmafresh Private Limited",
      description: "Luqmafresh Online",
      image: "https://example.com/your_logo",
      order_id: params.id,
      handler: function (response) {
        if (response != "") {
          setLoad(true);
          const requestData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          verifyPayment(requestData).then((res) => {
            if (res.status == true) {
              setLoad(false);
              navigate("/account");
            } else {
              setLoad(false);
              console.log("Payment Error");
            }
          });
        }
      },
      prefill: {
        name: "Gaurav Joshi",
        email: "gauravjoshi@example.com",
        contact: "8565002333",
      },
      notes: {
        address: "Lucknow Uttar Pradesh",
      },
      theme: {
        color: "#C42118",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      setLoad(false);
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
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
      setCartProduct(res.data);
    } else {
    }
  };

  const calculateTotalBill = () => {
    const subtotal = cartProduct.totalAmount;
    const deliveryCharge = cartProduct.totalAmount > 199 ? 0 : 40;
    const discount = 0;
    const luqmaFreshWallet = 0;

    return subtotal + deliveryCharge - discount - luqmaFreshWallet;
  };

  return (
    <>
      <div className="mobile_payment">
        <Header />
      </div>
      <div className="payment_container">
        {/* main container */}
        <div className="payment_section">
          {/* main container payment */}

          <div className="online_payment">
            {/* sidebar Container */}
            <div className="online_payment_sidebar">
              <div
                className="cash_on_delivery"
                onClick={() => {
                  setOpen(0);
                  setMethod("cod");
                }}
                value={open}
              >
                <p>Cash On Delivery</p>
              </div>
              <div
                className="cash_on_delivery"
                onClick={() => {
                  setOpen(1);
                  setMethod("online");
                }}
                value={open}
              >
                <p>Debit/Credit/UPI Card</p>
              </div>
              <div
                className="cash_on_delivery"
                onClick={() => {
                  setOpen(2);
                  setMethod("online");
                }}
                value={open}
              >
                <p>Amazon Pay</p>
              </div>
              <div
                className="cash_on_delivery"
                onClick={() => {
                  setOpen(3);
                  setMethod("online");
                }}
                value={open}
              >
                <p>Google Pay</p>
              </div>
              <div
                className="cash_on_delivery"
                onClick={() => {
                  setOpen(4);
                  setMethod("online");
                }}
                value={open}
              >
                <p>Paytm</p>
              </div>
             {/* <div
                className="cash_on_delivery"
                onClick={() => {
                  setOpen(6);
                  setMethod("online");
                }}
                value={open}
              >
                <p>Debit/Credit/UPI Card</p>
              </div>*/}
              <div
                className="cash_on_delivery"
                onClick={() => {
                  setOpen(7);
                  setMethod("online");
                }}
                value={open}
              >
                <p>NetBanking</p>
              </div>
            </div>
            {/* end sidebar Container  */}

            <div className="online_payment_content">
              {open == 0 && <CashDelivery onClick={() => paymentMethods()} />}
              {open == 1 && <OnlineDelivery onClick={() => paymentMethods()} />}
              {open == 2 && <AmazonPay onClick={() => paymentMethods()} />}
              {open == 3 && <GooglePay onClick={() => paymentMethods()} />}
              {open == 4 && <Paytm onClick={() => paymentMethods()} />}
              {open == 5 && <PayUsingUPI onClick={() => paymentMethods()} />}
              {/*open == 6 && <Credit onClick={() => paymentMethods()} />*/}
              {open == 7 && <NetBanking onClick={() => paymentMethods()} />}
            </div>
          </div>
          {/* end main container payment */}
          {/* main payment steps */}

          <div className="online_payment_steps">
            <div className="mobile_steps">
              <Steps img1="mark.png" img2="mark.png" img3="radio.png" />
            </div>
            {/* online_coupon payment */}

            <div className="online_coupon">
              <div className="apply_coupon_btn">
                <h6>Apply Coupon</h6>
                <img
                  src="next.png"
                  height="40px"
                  width="50px"
                  onClick={handleOpen}
                />
              </div>
              <div className="coupon_avilable">
                <img src="coupon.svg" height="28px" width="28px" />
                <div className="coupon_avilable_text">
                  <p>6 Coupon Available</p>
                </div>
              </div>
              <div className="bank_offer">
                <p>Bank offers are now part of coupons. Apply now!</p>
              </div>
            </div>
            {/* end online_coupon payment */}
            <div className="mobile_dashed_border">
              <div className="online_bill_payment">
                <h5>Bill Details</h5>
              </div>
              <div className="payment_online_total">
                <div className="online_subtotal">
                  <p>Subtotal</p>
                  <p>₹{cartProduct.totalAmount}</p>
                </div>
                <div className="online_subtotal">
                  <p>Delivery Charge</p>
                  <p>₹ {cartProduct?.totalAmount > 199 ? 0 : 40}</p>
                </div>
                <div className="online_subtotal">
                  <p>Discount</p>
                  <p>₹ 0</p>
                </div>
              </div>
              <div className="online_total_count">
                <p>Total</p>
                <p style={{color:"#FF0040"}}>₹ {calculateTotalBill()}</p>
              </div>
            </div>
          </div>
          {/* end main payment steps */}
        </div>
        {/* end main container */}
      </div>
      <CouponModal open={couponModal} handleClose={handleClose} />
      <Loader loading={load} />
    </>
  );
};

export default Payment;
