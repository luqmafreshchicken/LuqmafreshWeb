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
  applyCoupon,
  getAllCoupon,
  updateTimeSlot,
  viewProfile,
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
import Swal from "sweetalert2";
import TopHeader from "../topheader/TopHeader";
import ModalCart from "../../pages/modalcart/ModalCart";
import MobileBottomtab from "../../mobilecomponent/mobilebottomtab/MobileBottomtab";
import { useMediaQuery } from "react-responsive";

const Payment = () => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const Razorpay = useRazorpay();

  const location = useLocation();
  const addressID = location?.state?.addressId;
  const slotID = location?.state?.slotId;

  const [open1, setOpen1] = useState(0);
  const [couponModal, setCouponModal] = React.useState(false);
  const [method, setMethod] = React.useState("cod");
  const [load, setLoad] = React.useState(false);
  const [user, setUser] = useState([]);
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
  const [coupon, setCoupon] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [vatAmount, setVatAmount] = React.useState(0);

  const [couponLen, setCouponLen] = useState([]);

  useEffect(() => {
    userDetail();
    async function getData() {
      const newData = await getAllCoupon();
      setCouponLen(newData.data);
    }
    getData();
  }, []);
  const userDetail = async () => {
    const UserId = await getUserID();
    viewProfile(UserId).then((res) => {
      console.log(res.data);
      if (res.status == true) {
        setUser(res.data);
        setLoad(false);
      } else {
      }
    });
  };

  console.log(user?.name, "coupon");
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

  const updateSlot = async () => {
    const data = {
      id: slotID,
    };
    const res = await updateTimeSlot(data);
    console.log(res);
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
      couponCode: coupon === "" ? "" : coupon,
      currency: countrytitle,
    };
    createOrder(requestData).then((res) => {
      if (res.status == true) {
        if (method === "online") {
          // console.log(res?.data, "-------------------------------");
          handlePayment(res.data.data);
          setLoad(false);
          // updateSlot();
        } else {
          Swal.fire("Your Order Confirm Successfully", "", "success");
          setLoad(false);
          updateSlot();
          if (isMobile) {
            navigate("/mobileaccount");
          } else {
            navigate("/account");
          }
        }
      } else {
        Swal.fire("Something went Wrong", "", "error");
        setLoad(false);
        console.log("Error in create order");
      }
    });
  };
  const handlePayment = async (params) => {
    console.log(params, "============");

    const vat = (cartPrice * 5) / 100;
    const totalAmount = cartPrice + vat;
    const couponAmount = coupon === "" ? 0 : amount;
    const fAmount = totalAmount - couponAmount * 100;
    const options = {
      key: "rzp_live_55ZIuRP4gr00Pu",
      amount: params?.amount,
      currency: countrytitle,
      name: "Luqmafresh Private Limited",
      description: "Luqmafresh Online",
      image: "https://res.cloudinary.com/dgghwthdr/image/upload/v1694800122/krhfhi3ava2bybwjuc81.png",
      order_id: params?.id,
      handler: function (response) {
        console.log(response, "======Kishan 1======",options);
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
              updateSlot();
              if (isMobile) {
                navigate("/mobileaccount");
              } else {
                navigate("/account");
              }
            } else {
              setLoad(false);
              console.log("Payment Error");
            }
          });
        }
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: "",
      },
      notes: {
        address: "",
      },
      theme: {
        color: "#C42118",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.log(
        params?.order_id,
        response.error.description,
        "================jgfgi========"
      );
      setLoad(false);
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  // const handlePost = async () => {
  //   const userID = await getUserID();

  //   const data = {
  //     userId: userID,
  //     orderId: params.id,
  //     remark: remark,
  //   };
  // };

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
    const amount = cartPrice;
    const vat = (cartPrice * 5) / 100;
    // setVatAmount(amount + vat)
    return amount + vat;
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

  const handleApplyCoupon = async (couponCode, discount) => {
    setLoad(true);
    const userId = await getUserID();
    const data = {
      userId: userId,
      couponCode: couponCode,
      discount: discount,
      amount: cartPrice,
    };
    fetch("https://luqmafresh-beckend.onrender.com/coupon/applyCoupon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === true) {
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
          setCouponModal(false);
          setLoad(false);
          setCoupon(couponCode);
          setAmount(discount);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <TopHeader handleclear={() => handleclear(4)} loginStatus={loginStatus} />

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
          // removeProduct={(id) => removeCartProduct(id)}
          // headerCart = {false}
        />
        <ModalCart
          // cartopen={cartopen}
          cartopen={cartOpen}
          carthandleClose={carthandleClose}
          onclose={carthandleClose}
          loginStatus={loginStatus}
          cartProduct={cartProduct}
          // cartProductlength={cartProduct}
          totalAmount={cartPrice}
          modalcurrency={countrycurrency}
          // totalAmount={totalAmount}
          // modalcurrency={modalcurrency}
          // removeProduct={removeProduct}
          // removeProduct={(id) =>
          //   loginStatus == true ? removeCartProduct(id) : removeLocalCart(id)
          // }
          // handleCartLogin={handleCartLogin}
          // handleHome={handleHome}
          // handleHome={() => handleHome()}
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
              {/* <div
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
              </div>
              <div
                className="cash_on_delivery"
                onClick={() => {
                  setOpen1(7);
                  setMethod("online");
                }}
                value={open1}
              >
                <p>NetBanking</p>
              </div>*/}
            </div>
            {/* end sidebar Container  */}

            <div className="online_payment_content">
              {open1 == 0 && <CashDelivery onClick={() => paymentMethods()} />}
              {open1 == 1 && (
                <OnlineDelivery
                  onClick={() => paymentMethods()}
                  cartProduct={cartPrice}
                  currency={countrycurrency}
                />
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
                  {coupon.length >= 1 ? (
                    <p>{coupon.length} Coupon Avialable</p>
                  ) : (
                    <p>No Coupon Avialable</p>
                  )}
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
                  <p>Amount</p>
                  <p>
                    {countrycurrency}
                    {cartPrice}
                  </p>
                </div>
                {/* <div className="online_subtotal">
                  <p>Delivery Charge</p>
                  <p>₹ {cartProduct?.totalAmount > 199 ? 0 : 40}</p>
              </div>*/}

                <div className="online_subtotal">
                  <p>VAT (Include) 5%</p>
                  <p>
                    {countrycurrency} {(cartPrice * 5) / 100}
                  </p>
                </div>
                <div className="online_subtotal">
                  <p>Coupon Discount</p>
                  <p>
                    {countrycurrency} {amount == "" ? 0 : amount}
                  </p>
                </div>
              </div>
              <div className="online_total_count">
                <p>Total Amount</p>
                <p style={{ color: "#FF0040" }}>
                  {countrycurrency} {cartPrice}
                </p>
              </div>
            </div>
          </div>
          {/* end main payment steps */}
        </div>
        {/* end main container */}
      </div>

      <CouponModal
        open={couponModal}
        handleClose={handleClose}
        handleApplyCoupon={(list) =>
          handleApplyCoupon(list?.couponCode, list?.discount)
        }
      />
      <Loader loading={load} />
      <MobileBottomtab handleMobile={() => setCartOpen(true)} />
    </>
  );
};

export default Payment;
