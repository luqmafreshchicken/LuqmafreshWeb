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
  CountryDetail,
  GetCountry,
  removeFromCart,
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  let navigate = useNavigate();
  const Razorpay = useRazorpay();

  const location = useLocation();
  const addressID = location?.state?.addressId;
  const slotID = location?.state?.slotId;

  const [open1, setOpen1] = useState(0);
  const [couponModal, setCouponModal] = React.useState(false);
  const [method, setMethod] = React.useState("cod");
  const [load, setLoad] = React.useState(false);
  const [userId, setUserId] = useState("");
  const [longitude, setLongitude] = useState(null);

  const [latitude, setLatitude] = useState(null);
  const [cartProduct, setCartProduct] = useState([]);
  const [country, setCountry] = useState("");
  const [countrycurrency, setCountryCurrency] = useState("");
  const [countrytitle, setCountryTitle] = useState("");
  const [flag, setFlag] = useState("");
  // const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [btn, setBtn] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  }, []);

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
    localContent();
    showcart();
  }, []);
  const localContent = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    const items1 = JSON.parse(localStorage.getItem("modalCount"));
    if (items) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
      if (items1) {
      } else {
        setLoginStatus(false);
      }
    }
  };
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
      setCartProduct([]);
      setCartPrice("");
    }
  };

  const carthandleOpen = () => setCartOpen(true);
  const carthandleClose = () => setCartOpen(false);

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

  // const showcart = async () => {
  //   const userId = await getUserID();
  //   const data = {
  //     userId: userId,
  //   };
  //   const res = await Show_Cart(data);
  //   if (res.status == true) {
  //     setCartProduct(res.data);
  //   } else {
  //   }
  // };

  const calculateTotalBill = () => {
    const subtotal = cartProduct.totalAmount;
    const deliveryCharge = cartProduct.totalAmount > 199 ? 0 : 40;
    const discount = 0;
    const luqmaFreshWallet = 0;

    return subtotal + deliveryCharge - discount - luqmaFreshWallet;
  };
  const handleclear = async (index) => {
    if (index == 4) {
      await localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  };

  // remove cart
  const removeCartProduct = async (id) => {
    const userId = await getUserID();
    const data = {
      userId: userId,
      productId: id,
    };
    removeFromCart(data).then((res) => {
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
        showcart();
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
      }
    });
  };
  // end remove cart
  return (
    <>
      <div className="mobile_payment">
        <Header
          code={countrytitle}
          currency={countrycurrency}
          flag={flag}
          cartPrice={cartPrice}
          cartProductlength={cartProduct}
          curr={countrycurrency}
          cartopen={cartOpen}
          carthandleClose={carthandleClose}
          carthandleOpen={carthandleOpen}
          loginStatus={loginStatus}
          // s
          handleOpen={() => setOpen(true)}
          handleClose={() => setOpen(false)}
          open={open}
          showbtn={btn}
          totalAmount={cartPrice}
          modalcurrency={countrycurrency}
          handleclear={(index) => handleclear(index)}
          removeProduct={(id) => removeCartProduct(id)}
        />
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
                  setOpen1(0);
                  setMethod("cod");
                }}
                value={open1}
              >
                <p>Cash On Delivery</p>
              </div>
              <div
                className="cash_on_delivery"
                onClick={() => {
                  setOpen1(1);
                  setMethod("online");
                }}
                value={open1}
              >
                <p>Debit/Credit/UPI Card</p>
              </div>
              <div
                className="cash_on_delivery"
                onClick={() => {
                  setOpen1(2);
                  setMethod("online");
                }}
                value={open1}
              >
                <p>Amazon Pay</p>
              </div>
              <div
                className="cash_on_delivery"
                onClick={() => {
                  setOpen1(3);
                  setMethod("online");
                }}
                value={open1}
              >
                <p>Google Pay</p>
              </div>
              <div
                className="cash_on_delivery"
                onClick={() => {
                  setOpen1(4);
                  setMethod("online");
                }}
                value={open1}
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
                  setOpen1(7);
                  setMethod("online");
                }}
                value={open1}
              >
                <p>NetBanking</p>
              </div>
            </div>
            {/* end sidebar Container  */}

            <div className="online_payment_content">
              {open1 == 0 && <CashDelivery onClick={() => paymentMethods()} />}
              {open1 == 1 && (
                <OnlineDelivery onClick={() => paymentMethods()} />
              )}
              {open1 == 2 && <AmazonPay onClick={() => paymentMethods()} />}
              {open1 == 3 && <GooglePay onClick={() => paymentMethods()} />}
              {open1 == 4 && <Paytm onClick={() => paymentMethods()} />}
              {open1 == 5 && <PayUsingUPI onClick={() => paymentMethods()} />}
              {/*open1 == 6 && <Credit onClick={() => paymentMethods()} />*/}
              {open1 == 7 && <NetBanking onClick={() => paymentMethods()} />}
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
                <p style={{ color: "#FF0040" }}>₹ {calculateTotalBill()}</p>
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
