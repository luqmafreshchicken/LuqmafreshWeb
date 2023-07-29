import * as React from "react";
import "./cardfulldetail.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  productDeatail,
  Add_to_cart,
  getUserID,
  getAllProductImage,
  loginRegister,
  otpVerify,
  Show_Cart,
  CountryDetail,
  GetCountry,
} from "../../serverRequest/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../component/header/Header";
import Loader from "../../component/loder/Loader";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper";
import "swiper/css/navigation";

export default function CardFullDetail({ id }) {
  let location = useLocation();
  const [show, setShow] = useState(false);
  const [incre, setIncre] = useState(1);
  const [product, setProduct] = useState([]);
  const [allImage, setAllImage] = useState([]);
  const [load, setLoad] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [btn, setBtn] = useState(false);
  const [otp, setOtp] = useState("");
  const [whistlistOpen, setWhistlistOpen] = useState(false);
  const [hideOTP, setHideOTP] = useState(false);
  const [country, setCountry] = useState("");
  const [countrycurrency, setCountryCurrency] = useState("");
  const [countrytitle, setCountryTitle] = useState("");
  const [flag, setFlag] = useState("");
  const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState(false);

  const increment = () => {
    setIncre(incre + 1);
  };
  const decrement = () => {
    if (incre > 1) {
      setIncre(incre - 1);
    } else {
      setIncre(1);
    }
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
    fullView();
    all_Image();
  }, []);

  const fullView = async () => {
    // setLoad(true);
    const id = location.state.id.id;
    const requestData = {
      productId: id,
    };
    productDeatail(requestData).then((res) => {
      if (res.status == true) {
        setProduct(res.data);
        setLoad(false);
      } else {
        setLoad(false);
      }
    });
  };

  const all_Image = async () => {
    const id = location.state.id.id;
    getAllProductImage(id).then((res) => {
      if (res.status == true) {
        setAllImage(res.data);
      } else {
      }
    });
  };
  const AddToCart = async () => {
    setLoad(true);
    const UserId = await getUserID();
    const data = {
      userId: UserId,
      productId: product._id,
      quantity: incre,
    };
    const res = await Add_to_cart(data);
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
      setLoad(false);
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
  };
  {
    /* login api */
  }
  const handleLogin = () => {
    setLoad(true);
    let newEmail = mobileNumber;
    const requestData = { email: mobileNumber };
    loginRegister(requestData).then((res) => {
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
        setShowInput(!showInput);
        setHideOTP(true);
        setBtn(true);
        setStore(newEmail);
        setLoad(false);
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

  const handleMobileNumber = (e) => {
    setMobileNumber(e.target.value);
    if (e.target.value.length <= 40) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  };
  const sethandleOtp = (e) => {
    setOtp(e.target.value);
  };

  const handleOTP = () => {
    setLoad(true);
    const requestData = { email: mobileNumber, otp: otp };
    otpVerify(requestData).then((res) => {
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
        localStorage.setItem("userDetail", JSON.stringify(res.data));
        localContent();
        localContent1();
        // setWhistlistOpen(false);
        setOpen(false);
        setLoad(false);

        // window.location.reload();
      } else {
        console.log(res);
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

  {
    /* end login api */
  }

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
  const localContent = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    const items1 = JSON.parse(localStorage.getItem("modalCount"));
    if (items) {
      // setWhistlistOpen(false);
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
      if (items1) {
        // setWhistlistOpen(false);
      } else {
        // setWhistlistOpen(true);
        setLoginStatus(false);
      }
    }
  };

  const localContent1 = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    if (items) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  };

  const carthandleOpen = () => setCartOpen(true);
  const carthandleClose = () => setCartOpen(false);

  return (
    <>
      <div className="fullview_search_mobile">
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
          handleOpen={() => setOpen(true)}
          handleClose={() => setOpen(false)}
          open={open}
          showbtn={btn}
          handleLogin={() => handleLogin()}
          handleOTP={() => handleOTP()}
          mobileNumber={mobileNumber}
          handleMobileNumber={(e) => handleMobileNumber(e)}
          sethandleOtp={(e) => sethandleOtp(e)}
          otp={otp}
          totalAmount={cartPrice}
          store={store}
        />
      </div>
      <div className="cardetail_container" state={{ productId: id }}>
        <div className="cardetail">
          {/* image_card */}
          <div className="image_cardetail">
            <div className="image_cardetail_slider">
              <Swiper
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 2500,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
              >
                {allImage.map((img) => (
                  <SwiperSlide>
                    <img src={img.image} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          {/* card_content */}
          <div className="cardetail_content">
            <div className="cardetail1">
              <h4>{product.name}</h4>
              <p> {product.description}</p>
              <hr style={{ height: "1px" }} />
              <p>{product.description1} </p>
              <p> {product.description2}</p>
              <p>{product.description3}</p>

              <div className="image_text_container">
                <div className="image_text_content1">
                  <div style={{ display: "flex" }}>
                    <img src="usp.png" />
                    <span>No. of Pieces 3-4</span>
                  </div>
                </div>

                <div
                  style={{
                    height: "6vh",
                    width: "100%",
                  }}
                >
                  <div className="image_text_content3">
                    <img src="usp8.png" />
                    <span>
                      Net wt.{product.quantity}
                      {product.unit}
                    </span>
                  </div>
                </div>
              </div>
              <div className="cardfull_detail_text">
                <div className="cardfull_detail_container_text">
                  <p style={{ color: "#d11243" }}>₹{product.price}</p>
                  <p style={{ color: "grey", textDecoration: "line-through" }}>
                    MRP: ₹{product.originalPrice}
                  </p>
                  <p style={{ color: "green" }}>{product.discount}% OFF</p>
                </div>
                {show === false ? (
                  <div className="Add_to_cart_btn">
                    <button
                      onClick={() => {
                        setShow(!show);
                        AddToCart();
                      }}
                    >
                      ADD
                    </button>
                  </div>
                ) : (
                  <div
                    hidden={!show}
                    onClick={() => AddToCart()}
                    className="full_view_incre_btn"
                  >
                    <p onClick={decrement}>-</p>
                    <p>{incre}</p>
                    <p onClick={increment}>+</p>
                  </div>
                )}
              </div>
              <hr style={{ height: "1px" }} />
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Loader loading={load} />
      </div>
    </>
  );
}
