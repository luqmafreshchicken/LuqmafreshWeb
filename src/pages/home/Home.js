import React, { useEffect, useState, useRef } from "react";
import BannerCard from "../../component/bannercard/BannerCard";
import CategorieCard from "../../component/categoriecard/CategorieCard";
import Text from "../../component/text/Text";
import CardSlider from "../../component/newarrival/CardSlider";
import "./home.css";
import Twobanner from "../../component/twobanner/Twobanner";
import DiscountSection from "../../component/discountsection/DiscountSection";
import Offer from "../../component/offer/Offer";
import CardSliderOne from "../../component/cardsliderone/CardSliderOne";
import CountDown from "../../component/countdown/CountDown";
import {
  CountryDetail,
  GetCountry,
  catProduct,
  comBos,
  productCategorie,
  productDeatail,
  removeFromCart,
  resendOTP,
  whistUserIDproductId,
} from "../../serverRequest/Index";
import TopSeverWeek from "../../component/topseverweek/TopSeverWeek";
import Header from "../../component/header/Header";
import Loader from "../../component/loder/Loader";
import "react-multi-carousel/lib/styles.css";
// import "./slider.css";
import {
  Add_to_cart,
  getUserID,
  newArrival,
  loginRegister,
  otpVerify,
  topSeverweek,
  bestSeller,
  todayDeals,
  Show_Cart,
  currentLocation,
} from "../../serverRequest/Index";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import * as moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../customcomponent/card/Card";
import WhistList from "../../customcomponent/whistlist/WhistList";
import SearchModal from "../../customcomponent/searchmodal/SearchModal";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Autoplay, Parallax } from "swiper";
import "swiper/css/navigation";
import Discount from "../../customcomponent/discount/Discount";
import ModalCart from "../modalcart/ModalCart";
import { useNavigate } from "react-router-dom";
import TopHeader from "../../component/topheader/TopHeader";
import MobileBottomtab from "../../mobilecomponent/mobilebottomtab/MobileBottomtab";

const Home = () => {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);

  const [today, setToday] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [btn, setBtn] = useState(false);
  const [otp, setOtp] = useState("");
  const [load, setLoad] = useState(false);
  const [whistlistOpen, setWhistlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hideOTP, setHideOTP] = useState(false);
  const [product, setProduct] = useState([]);
  const [country, setCountry] = useState("");
  const [countrycurrency, setCountryCurrency] = useState("");
  const [countrytitle, setCountryTitle] = useState("");
  const [flag, setFlag] = useState("");
  const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
  const [whistList, setWhistList] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState(false);
  const [emailStore, setEmailStore] = useState(false);

  const handlewhistlistClose = () => {
    setWhistlistOpen(false);
    let data = {
      modalCount: false,
    };
    localStorage.setItem("modalCount", JSON.stringify({ data: data }));
  };
  const handleSearchClose = () => setSearchOpen(false);

  // useEffect(() => {
  //   // localContent();
  //   window.scrollTo(0, 0);
  //   setLoad(true);

  //   // localContent();
  //   // showcart();
  //   // arrivalProductList();
  // }, []);

  // fisrt call handle location function then after call arrivalProductList function
  useEffect(() => {
    window.scrollTo(0, 0);
    arrivalProductList();
    // setLoad(true);
    showcart();
    handleLocation();
    localContent();
    topSaverWeekList();
    bestSellerList();
    comboList();
    categoryList();
    todayDealList();
    chickenProductList();
    muttonProductList();
    fishProductList();
  }, []);

  const handleLocation = () => {
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
  };

  const categoryList = async () => {
    const newData = await productCategorie();
    if (newData?.status === true) {
      setData1(newData?.data);
      // topSaverWeekList();
    } else {
      setLoad(false);
    }
  };

  const arrivalProductList = async () => {
    const UserId = await getUserID();
    const data = {
      id: UserId ? UserId : "",
    };
    const res = await newArrival(data);
    if (res?.status === true) {
      setData(res?.data);
      setLoad(false);
    } else {
      setLoad(false);
    }
  };

  const chickenProductList = async () => {
    const UserId = await getUserID();
    const data = {
      categoryName: "Chicken",

      userId: UserId ? UserId : "",
    };
    const res = await catProduct(data);
    if (res?.status === true) {
      setData5(res?.data);
      setLoad(false);
    } else {
      setLoad(false);
    }
  };
  const muttonProductList = async () => {
    const UserId = await getUserID();
    const data = {
      categoryName: "Mutton",

      userId: UserId ? UserId : "",
    };
    const res = await catProduct(data);
    if (res?.status === true) {
      setData6(res?.data);
      setLoad(false);
    } else {
      setLoad(false);
    }
  };
  const fishProductList = async () => {
    const UserId = await getUserID();
    const data = {
      categoryName: "Beaf",
      userId: UserId ? UserId : "",
    };
    const res = await catProduct(data);
    if (res?.status === true) {
      setData7(res?.data);
      setLoad(false);
    } else {
      setLoad(false);
    }
  };
  const topSaverWeekList = async () => {
    const UserId = await getUserID();
    const data = {
      userID: UserId ? UserId : "",
    };
    const res = await topSeverweek(data);
    if (res?.status === true) {
      setData2(res.data);
      // bestSellerList();
    } else {
      setLoad(false);
    }
  };

  const bestSellerList = async () => {
    const UserId = await getUserID();
    const data = {
      id: UserId ? UserId : "",
    };
    const res = await bestSeller(data);
    if (res?.status === true) {
      setData3(res?.data);
      // todayDealList();
      setLoad(false);
    } else {
      setLoad(false);
    }
  };
  const comboList = async () => {
    const UserId = await getUserID();
    const data = {
      id: UserId ? UserId : "",
    };
    const res = await comBos(data);
    if (res?.status === true) {
      setData4(res?.data);
      // todayDealList();
      setLoad(false);
    } else {
      setLoad(false);
    }
  };

  const todayDealList = async () => {
    const res = await todayDeals();
    if (res?.status === true) {
      setToday(res?.data);
      // localContent();
      // setLoad(false);
    } else {
      setLoad(false);
    }
  };

  const localContent = () => {
    const items = JSON.parse(localStorage?.getItem("userDetail"));
    const items1 = JSON.parse(localStorage?.getItem("modalCount"));
    const cart = JSON.parse(localStorage?.getItem("cart"));
    const cartPrice = JSON.parse(localStorage?.getItem("cartPrice"));

    if (items) {
      setWhistlistOpen(false);
      setLoginStatus(true);
    } else {
      setCartProduct(cart ? cart : []);
      cart?.map((item) => {
        setCartPrice((prev) => prev + item?.productId?.price * item?.quantity);
      });
      setCartPrice(cart?.length > 0 ? cartPrice?.price : 0);
      setCartPrice(cartPrice?.price);
      localStorage.setItem(
        "cartPrice",
        JSON.stringify({ price: cart?.length > 0 ? cartPrice?.price : 0 })
      );
      setLoginStatus(false);
      if (items1) {
        setWhistlistOpen(false);
      } else {
        setWhistlistOpen(true);
        setLoginStatus(false);
      }
    }
  };

  // Remove local cart data throught id
  const removeLocalCart = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartPrice = JSON.parse(localStorage.getItem("cartPrice"));
    const cartData = cart?.filter((item) => item?.productId?._id !== id);
    const product = cart?.find((item) => item?.productId?._id === id);
    const removeProduct = cart?.filter((item) => item?.productId?._id !== id);
    cart?.length >= 1 &&
      localStorage.setItem(
        "cartPrice",
        JSON.stringify({ price: cartPrice?.price - product?.productId?.price })
      );
    cart?.length < 1 &&
      localStorage.setItem("cartPrice", JSON.stringify({ price: 0 }));
    localStorage.setItem("cart", JSON.stringify(cartData));
    setCartProduct(removeProduct);
    setCartPrice(
      cartPrice?.price -
        product?.productId?.price * product?.productId?.quantity
    );
    toast.success("Product remove from cart", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    if (cart?.length === 1) {
      localStorage.removeItem("cart");
      localStorage.removeItem("cartPrice");
      setCartProduct([]);
      setCartPrice(0);
    }
    localContent();
  };

  // local cart data after login add in cart

  const updatelocalcartindb = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setWhistlistOpen(false);
      setLoginStatus(true);
      // bulk add to cart api
      const cartData = cart;
      if (cartData?.length > 0) {
        for (let i = 0; i < cartData?.length; i++) {
          const data = {
            userId: items?._id,
            productId: cartData[i]?.productId?._id,
            quantity: cartData[i]?.productId?.quantity,
          };
          Add_to_cart(data).then((res) => {
            if (res?.data?.status) {
              localStorage.removeItem("cart");
            }
            showcart();
          });
        }
      }
    } else {
      setCartProduct(cart);
      let total = 0;
      cart?.map((item) => {
        total = total + item?.productId?.price;
      });
      setCartPrice(total);
      setLoginStatus(false);
    }
  };

  // local add to cart
  const AddLocalCart = async (
    id,
    name,
    price,
    originalPrice,
    discount,
    quantity,
    unit,
    image
  ) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == null) {
      const newCart = [
        {
          _id: id,
          productId: {
            _id: id,
            quantity: 1,
            name: name,
            price: price,
            originalPrice: originalPrice,
          },
        },
      ];
      localStorage.setItem("cart", JSON.stringify(newCart));
      localContent();
      toast.success("Product added to cart successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setCartPrice(newCart[0]?.productId?.price);
      localStorage.setItem(
        "cartPrice",
        JSON.stringify({ price: newCart[0]?.productId?.price })
      );
      localContent();
    } else {
      const existItem = cart?.find((x) => x._id === id);
      if (existItem) {
        // update quantity in cart local storage
        const newCart = cart?.map((x) =>
          x._id === id
            ? {
                _id: id,
                productId: {
                  _id: id,
                  quantity: x?.productId?.quantity + 1,
                  name: name,
                  price: price,
                  originalPrice: originalPrice,
                },
              }
            : x
        );
        localStorage.setItem("cart", JSON.stringify(newCart));

        const updatedCart = JSON.parse(localStorage.getItem("cart"));
        const cartPrice = JSON.parse(localStorage.getItem("cartPrice"));
        let total = 0;
        updatedCart?.map((item) => {
          total = total + item?.productId?.price * item?.productId?.quantity;
        });
        localStorage.setItem("cartPrice", JSON.stringify({ price: total }));
        setCartPrice(total);
        toast.success("Product quantity update in cart", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });

        localContent();
      } else {
        const newCart = [
          ...cart,
          {
            _id: id,
            productId: {
              _id: id,
              quantity: 1,
              name: name,
              price: price,
              originalPrice: originalPrice,
            },
          },
        ];
        localStorage.setItem("cart", JSON.stringify(newCart));
        toast.success("Product added to cart successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        const updatedCart = JSON.parse(localStorage.getItem("cart"));
        let total = 0;
        updatedCart?.map((item) => {
          total = total + item?.productId?.price * item?.productId?.quantity;
        });
        localStorage.setItem("cartPrice", JSON.stringify({ price: total }));
        setCartPrice(total);
        localContent();
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
  const AddToCart = async (id) => {
    console.log("kwbdkiwbgdkbekjbgfkihvkefviefv");
    setLoad(true);
    const UserId = await getUserID();
    const data = {
      userId: UserId,
      productId: id,
      quantity: "1",
    };

    const res = await Add_to_cart(data);
    if (res.status == true) {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      showcart();
      setLoad(false);
      arrivalProductList();
    } else {
      toast.error(res.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  // end new arrival

  // topsever week

  // end today deals Api
  {
    /* login api */
  }
  const handleLogin = () => {
    // email validation
    if (mobileNumber === "") {
      toast.error("Please enter email", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    } else if (!mobileNumber.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error("Please enter valid email address", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    }
    setLoad(true);
    let newEmail = mobileNumber;

    const requestData = { email: mobileNumber };
    loginRegister(requestData).then((res) => {
      if (res.status === true) {
        toast.success(res?.message, {
          position: "top-right",
          autoClose: 1000,
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
        toast.error(res?.message, {
          position: "top-right",
          autoClose: 1000,
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

  const handleMobileNumber = (e) => {
    setMobileNumber(e.target.value);
    if (e?.target?.value?.length <= 40) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  };
  const sethandleOtp = (e) => {
    setOtp(e.target.value);
  };

  const handleOTP = () => {
    // otp validation
    if (otp === "") {
      toast.error("Please enter otp", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    } else if (!otp.match(/^[0-9]{4}$/)) {
      toast.error("Please enter 4 digit otp number", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    }
    setLoad(true);
    const requestData = { email: mobileNumber, otp: otp };
    otpVerify(requestData).then((res) => {
      if (res?.status == true) {
        toast.success(res?.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem("userDetail", JSON.stringify(res.data));
        updatelocalcartindb();
        localContent();
        localContent1();
        setWhistlistOpen(false);
        setOpen(false);
        setLoad(false);
        showcart();
        // window.location.reload();
      } else {
        setLoad(false);
        toast.error("Invalid OTP", {
          position: "top-right",
          autoClose: 1000,
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

  const fullView = async (id) => {
    if (id === undefined || id === null || id === "") {
      toast.error("Please enter product id", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    }
    setLoad(true);
    const requestData = {
      productId: id,
    };
    productDeatail(requestData).then((res) => {
      if (res.status == true) {
        setSearchOpen(true);
        setProduct(res?.data);
        setLoad(false);
      } else {
        setLoad(false);
      }
    });
  };

  const swiperNavPrevRef = useRef(null);
  const swiperNavNextRef = useRef(null);

  const showcart = async () => {
    setLoad(true);

    const userId = await getUserID();
    const data = {
      userId: userId,
    };
    const res = await Show_Cart(data);
    if (res.status == true) {
      setCartProduct(res?.data?.cart);
      setCartPrice(res?.data?.totalAmount);
      setLoad(false);
    } else {
      setLoad(false);
    }
  };

  const handleWhistlist = async (id) => {
    setLoad(true);
    const userId = await getUserID();
    const data = {
      userId: userId,
      productId: id,
    };
    const res = await whistUserIDproductId(data);
    if (res.status == true) {
      toast.success(res?.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // setWhistList(res.data);
      arrivalProductList();
      topSaverWeekList();
      bestSellerList();
      chickenProductList();
      muttonProductList();
      fishProductList();
      setLoad(false);
    } else {
      toast.error(res?.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoad(false);
    }
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

  const removeCartProduct = async (id) => {
    setLoad(true);
    const userId = await getUserID();
    const data = {
      userId: userId,
      productId: id,
    };
    removeFromCart(data).then((res) => {
      if (res?.status == true) {
        toast.success(res?.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        showcart();
        setLoad(false);
        arrivalProductList();
      } else {
        toast.error(res?.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const handleResendOTP = () => {
    // email validation
    if (mobileNumber === "") {
      toast.error("Please enter email", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    } else if (!mobileNumber.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error("Please enter valid email address", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    }
    setLoad(true);
    const requestData = { email: mobileNumber };
    resendOTP(requestData).then((res) => {
      if (res.status === true) {
        toast.success(res.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setLoad(false);
      } else {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 1000,
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

  return (
    <div className="homepagecontainer">
      <TopHeader handleclear={() => handleclear(4)} loginStatus={loginStatus} />
      <Header
        code={countrytitle}
        currency={countrycurrency}
        flag={flag}
        cartPrice={cartPrice}
        cartProductlength={cartProduct}
        curr={countrycurrency}
        // cartopen={cartOpen}
        // carthandleClose={carthandleClose}
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
        // totalAmount={cartPrice}
        store={store}
        // modalcurrency={countrycurrency}
        handleclear={(index) => handleclear(index)}
        removeProduct={(id) =>
          loginStatus == true ? removeCartProduct(id) : removeLocalCart(id)
        }
        // removeLocalCart
        // removeProduct={(id) =>
        //   loginStatus == true ? removeCartProduct(id) : removeLocalCart(id)
        // }
        handleResendOTP={() => handleResendOTP()}
        handleCartLogin={() => handleCartLogin()}
        handleHome={() => handleHome()}
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
        removeProduct={(id) =>
          loginStatus == true ? removeCartProduct(id) : removeLocalCart(id)
        }
        handleCartLogin={handleCartLogin}
        // handleHome={handleHome}
        handleHome={() => handleHome()}
      />
      <BannerCard />
      {/*<Twobanner />*/}
      {/********************************new arrival section****************************** */}
      <div>
        <div className="next_prev_btn_container">
          <div className="next_prev_btn">
            <div className="head_box">
              <Text
                heading1="New Arrivals"
                text1="Most popular products near you!"
              />
            </div>
            <div className="next_prev_btn_content">
              <div className="swiperNavPrev" ref={swiperNavPrevRef}>
                <FaArrowLeft className="FaArrowLeft" />
              </div>
              <div className="swiperNavNext" ref={swiperNavNextRef}>
                <FaArrowRight className="FaArrowRight" />
              </div>
            </div>
          </div>
        </div>
        <div className="carouselitem">
          <div className="cardswrapper">
            <Swiper
              slidesPerView={1.5}
              spaceBetween={8}
              pagination={{
                clickable: true,
              }}
              parallax={true}
              navigation={{
                prevEl: "swiperNavPrevRef.current",
                nextEl: "swiperNavNextRef.current",
              }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = swiperNavPrevRef.current;
                swiper.params.navigation.nextEl = swiperNavNextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                400: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                },
                500: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2.3,
                  spaceBetween: 30,
                },
                900: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              modules={[Navigation, Parallax]}
            >
              {data?.length >= 1 ? (
                <>
                  {data.map((detail, index) => (
                    <SwiperSlide>
                      {loginStatus == false ? (
                        <Card
                          currency={countrycurrency}
                          offer={detail.discount}
                          productName={detail.name}
                          weight={detail.quantity}
                          unit={detail.unit}
                          total={detail.price}
                          cutotal={detail.originalPrice}
                          offer1={detail.discount}
                          today={moment(detail.discountExpiryDate).format(
                            "dddd"
                          )}
                          date={detail.deliveryTime}
                          totalpayment={detail.price}
                          // to="/carddetail"
                          to={`/carddetail/${detail?.nameString}`}
                          // onclick={() => AddToCart(detail._id)}
                          onclick={() =>
                            // AddToCart(detail._id)
                            loginStatus == true
                              ? AddToCart(detail._id)
                              : AddLocalCart(
                                  detail._id,
                                  detail.name,
                                  detail.price,
                                  detail.originalPrice,
                                  detail.discount,
                                  detail.quantity,
                                  detail.unit,
                                  detail.image
                                )
                          }
                          // id={{ id: detail._id }}
                          rating={detail.rating}
                          img={detail.image}
                          // onclick1={() => fullView(detail._id)}
                          onclick2={() => setWhistlistOpen(true)}
                          // cartStatus={detail?.isAddedToCart}
                          // qty={detail?.qty}
                          whist={detail?.inWishlist}
                        />
                      ) : (
                        <Card
                          currency={countrycurrency}
                          offer={detail.discount}
                          productName={detail.name}
                          weight={detail.quantity}
                          unit={detail.unit}
                          total={detail.price}
                          cutotal={detail.originalPrice}
                          offer1={detail.discount}
                          today={moment(detail.discountExpiryDate).format(
                            "dddd"
                          )}
                          date={detail.deliveryTime}
                          totalpayment={detail.price}
                          to={`/carddetail/${detail?.nameString}`}
                          onclick={() =>
                            // AddToCart(detail._id)
                            loginStatus == true
                              ? AddToCart(detail._id)
                              : AddLocalCart(
                                  detail._id,
                                  detail.name,
                                  detail.price,
                                  detail.originalPrice,
                                  detail.discount,
                                  detail.quantity,
                                  detail.unit,
                                  detail.image
                                )
                          }
                          id={{ id: detail._id }}
                          rating={detail.rating}
                          img={detail.image}
                          onclick1={() => fullView(detail._id)}
                          onclick2={() => handleWhistlist(detail._id)}
                          // cartStatus={detail?.isAddedToCart}
                          // qty={detail?.qty}
                          whist={detail?.inWishlist}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </>
              ) : null}
            </Swiper>
          </div>

          <WhistList
            whistlistOpen={whistlistOpen}
            handlewhistlistClose={handlewhistlistClose}
            onclick={handlewhistlistClose}
            proceedOTP="Proceed Via OTP"
            proceedsubmit="Submit"
            onChange={handleMobileNumber}
            value={mobileNumber}
            onChange1={(e) => setOtp(e.target.value)}
            onclick1={() => handleLogin()}
            onclick2={() => handleOTP()}
            otpHide={hideOTP}
            btnShow={btn}
            email={store}
            handleResendOTP={() => handleResendOTP()}
          />

          <SearchModal
            searchOpen={searchOpen}
            handleSearchClose={handleSearchClose}
            onclick={handleSearchClose}
            image={product.image}
            name={product.name}
            description={product.description}
            description1={product.description1}
            description2={product.description2}
            description3={product.description3}
            qty={product.quantity}
            unit={product.unit}
            price={product.price}
            ogp={product.originalPrice}
            discount={product.discount}
            // handleViewCart={() => console.log("view cart")
            // loginStatus == true
            //   ? AddToCart(product._id)
            //   : AddLocalCart(
            //     product._id,
            //     product.name,
            //     product.price,
            //     product.originalPrice,
            //     product.discount,
            //     product.quantity,
            //     product.unit,
            //     product.image
            //   )
            // }
          />
        </div>
      </div>
      {/**************************** end new arrival section ***************************/}

      {/********************************Chicken Product section****************************** */}
      {data5?.length >= 1 ? (
        <>
          <div>
            <div className="next_prev_btn_container">
              <div className="next_prev_btn">
                <div className="head_box">
                  <Text
                    heading1="Chicken Product"
                    text1="Most popular products near you!"
                  />
                </div>
                <div className="next_prev_btn_content">
                  <div className="swiperNavPrev" ref={swiperNavPrevRef}>
                    <FaArrowLeft className="FaArrowLeft" />
                  </div>
                  <div className="swiperNavNext" ref={swiperNavNextRef}>
                    <FaArrowRight className="FaArrowRight" />
                  </div>
                </div>
              </div>
            </div>
            <div className="carouselitem">
              <div className="cardswrapper">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={8}
                  pagination={{
                    clickable: true,
                  }}
                  parallax={true}
                  navigation={{
                    prevEl: "swiperNavPrevRef.current",
                    nextEl: "swiperNavNextRef.current",
                  }}
                  onInit={(swiper) => {
                    swiper.params.navigation.prevEl = swiperNavPrevRef.current;
                    swiper.params.navigation.nextEl = swiperNavNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    400: {
                      slidesPerView: 1.2,
                      spaceBetween: 20,
                    },
                    500: {
                      slidesPerView: 1.5,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2.3,
                      spaceBetween: 30,
                    },
                    900: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    1200: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                  }}
                  modules={[Navigation, Parallax]}
                >
                  {data5.map((detail, index) => (
                    <SwiperSlide>
                      {loginStatus == false ? (
                        <Card
                          currency={countrycurrency}
                          offer={detail.discount}
                          productName={detail.name}
                          weight={detail.quantity}
                          unit={detail.unit}
                          total={detail.price}
                          cutotal={detail.originalPrice}
                          offer1={detail.discount}
                          today={moment(detail.discountExpiryDate).format(
                            "dddd"
                          )}
                          date={detail.deliveryTime}
                          totalpayment={detail.price}
                          to={`/carddetail/${detail?.nameString}`}
                          // onclick={() => AddToCart(detail._id)}
                          onclick={() =>
                            // AddToCart(detail._id)
                            loginStatus == true
                              ? AddToCart(detail._id)
                              : AddLocalCart(
                                  detail._id,
                                  detail.name,
                                  detail.price,
                                  detail.originalPrice,
                                  detail.discount,
                                  detail.quantity,
                                  detail.unit,
                                  detail.image
                                )
                          }
                          id={{ id: detail._id }}
                          rating={detail.rating}
                          img={detail.image}
                          // onclick1={() => fullView(detail._id)}
                          onclick2={() => setWhistlistOpen(true)}
                          // cartStatus={detail?.isAddedToCart}
                          // qty={detail?.qty}
                          whist={detail?.inWishlist}
                        />
                      ) : (
                        <Card
                          currency={countrycurrency}
                          offer={detail.discount}
                          productName={detail.name}
                          weight={detail.quantity}
                          unit={detail.unit}
                          total={detail.price}
                          cutotal={detail.originalPrice}
                          offer1={detail.discount}
                          today={moment(detail.discountExpiryDate).format(
                            "dddd"
                          )}
                          date={detail.deliveryTime}
                          totalpayment={detail.price}
                          to={`/carddetail/${detail?.nameString}`}
                          onclick={() =>
                            // AddToCart(detail._id)
                            loginStatus == true
                              ? AddToCart(detail._id)
                              : AddLocalCart(
                                  detail._id,
                                  detail.name,
                                  detail.price,
                                  detail.originalPrice,
                                  detail.discount,
                                  detail.quantity,
                                  detail.unit,
                                  detail.image
                                )
                          }
                          id={{ id: detail._id }}
                          rating={detail.rating}
                          img={detail.image}
                          onclick1={() => fullView(detail._id)}
                          onclick2={() => handleWhistlist(detail._id)}
                          // cartStatus={detail?.isAddedToCart}
                          // qty={detail?.qty}
                          whist={detail?.inWishlist}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <WhistList
                whistlistOpen={whistlistOpen}
                handlewhistlistClose={handlewhistlistClose}
                onclick={handlewhistlistClose}
                proceedOTP="Proceed Via OTP"
                proceedsubmit="Submit"
                onChange={handleMobileNumber}
                value={mobileNumber}
                onChange1={(e) => setOtp(e.target.value)}
                onclick1={() => handleLogin()}
                onclick2={() => handleOTP()}
                otpHide={hideOTP}
                btnShow={btn}
                email={store}
                handleResendOTP={() => handleResendOTP()}
              />

              <SearchModal
                searchOpen={searchOpen}
                handleSearchClose={handleSearchClose}
                onclick={handleSearchClose}
                image={product.image}
                name={product.name}
                description={product.description}
                description1={product.description1}
                description2={product.description2}
                description3={product.description3}
                qty={product.quantity}
                unit={product.unit}
                price={product.price}
                ogp={product.originalPrice}
                discount={product.discount}
                // handleViewCart={() => console.log("view cart")
                // loginStatus == true
                //   ? AddToCart(product._id)
                //   : AddLocalCart(
                //     product._id,
                //     product.name,
                //     product.price,
                //     product.originalPrice,
                //     product.discount,
                //     product.quantity,
                //     product.unit,
                //     product.image
                //   )
                // }
              />
            </div>
          </div>
        </>
      ) : null}
      {/**************************** end new arrival section ***************************/}

      {/********************************new arrival section****************************** */}
      {data6?.length >= 1 ? (
        <>
          <div>
            <div className="next_prev_btn_container">
              <div className="next_prev_btn">
                <div className="head_box">
                  <Text
                    heading1="Mutton Product"
                    text1="Most popular products near you!"
                  />
                </div>
                <div className="next_prev_btn_content">
                  <div className="swiperNavPrev" ref={swiperNavPrevRef}>
                    <FaArrowLeft className="FaArrowLeft" />
                  </div>
                  <div className="swiperNavNext" ref={swiperNavNextRef}>
                    <FaArrowRight className="FaArrowRight" />
                  </div>
                </div>
              </div>
            </div>
            <div className="carouselitem">
              <div className="cardswrapper">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={8}
                  pagination={{
                    clickable: true,
                  }}
                  parallax={true}
                  navigation={{
                    prevEl: "swiperNavPrevRef.current",
                    nextEl: "swiperNavNextRef.current",
                  }}
                  onInit={(swiper) => {
                    swiper.params.navigation.prevEl = swiperNavPrevRef.current;
                    swiper.params.navigation.nextEl = swiperNavNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    400: {
                      slidesPerView: 1.2,
                      spaceBetween: 20,
                    },
                    500: {
                      slidesPerView: 1.5,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2.3,
                      spaceBetween: 30,
                    },
                    900: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    1200: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                  }}
                  modules={[Navigation, Parallax]}
                >
                  {data6.map((detail, index) => (
                    <SwiperSlide>
                      {loginStatus == false ? (
                        <Card
                          currency={countrycurrency}
                          offer={detail.discount}
                          productName={detail.name}
                          weight={detail.quantity}
                          unit={detail.unit}
                          total={detail.price}
                          cutotal={detail.originalPrice}
                          offer1={detail.discount}
                          today={moment(detail.discountExpiryDate).format(
                            "dddd"
                          )}
                          date={detail.deliveryTime}
                          totalpayment={detail.price}
                          to={`/carddetail/${detail?.nameString}`}
                          // onclick={() => AddToCart(detail._id)}
                          onclick={() =>
                            // AddToCart(detail._id)
                            loginStatus == true
                              ? AddToCart(detail._id)
                              : AddLocalCart(
                                  detail._id,
                                  detail.name,
                                  detail.price,
                                  detail.originalPrice,
                                  detail.discount,
                                  detail.quantity,
                                  detail.unit,
                                  detail.image
                                )
                          }
                          id={{ id: detail._id }}
                          rating={detail.rating}
                          img={detail.image}
                          // onclick1={() => fullView(detail._id)}
                          onclick2={() => setWhistlistOpen(true)}
                          // cartStatus={detail?.isAddedToCart}
                          // qty={detail?.qty}
                          whist={detail?.inWishlist}
                        />
                      ) : (
                        <Card
                          currency={countrycurrency}
                          offer={detail.discount}
                          productName={detail.name}
                          weight={detail.quantity}
                          unit={detail.unit}
                          total={detail.price}
                          cutotal={detail.originalPrice}
                          offer1={detail.discount}
                          today={moment(detail.discountExpiryDate).format(
                            "dddd"
                          )}
                          date={detail.deliveryTime}
                          totalpayment={detail.price}
                          to={`/carddetail/${detail?.nameString}`}
                          onclick={() =>
                            // AddToCart(detail._id)
                            loginStatus == true
                              ? AddToCart(detail._id)
                              : AddLocalCart(
                                  detail._id,
                                  detail.name,
                                  detail.price,
                                  detail.originalPrice,
                                  detail.discount,
                                  detail.quantity,
                                  detail.unit,
                                  detail.image
                                )
                          }
                          id={{ id: detail._id }}
                          rating={detail.rating}
                          img={detail.image}
                          onclick1={() => fullView(detail._id)}
                          onclick2={() => handleWhistlist(detail._id)}
                          // cartStatus={detail?.isAddedToCart}
                          // qty={detail?.qty}
                          whist={detail?.inWishlist}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <WhistList
                whistlistOpen={whistlistOpen}
                handlewhistlistClose={handlewhistlistClose}
                onclick={handlewhistlistClose}
                proceedOTP="Proceed Via OTP"
                proceedsubmit="Submit"
                onChange={handleMobileNumber}
                value={mobileNumber}
                onChange1={(e) => setOtp(e.target.value)}
                onclick1={() => handleLogin()}
                onclick2={() => handleOTP()}
                otpHide={hideOTP}
                btnShow={btn}
                email={store}
                handleResendOTP={() => handleResendOTP()}
              />

              <SearchModal
                searchOpen={searchOpen}
                handleSearchClose={handleSearchClose}
                onclick={handleSearchClose}
                image={product.image}
                name={product.name}
                description={product.description}
                description1={product.description1}
                description2={product.description2}
                description3={product.description3}
                qty={product.quantity}
                unit={product.unit}
                price={product.price}
                ogp={product.originalPrice}
                discount={product.discount}
                // handleViewCart={() => console.log("view cart")
                // loginStatus == true
                //   ? AddToCart(product._id)
                //   : AddLocalCart(
                //     product._id,
                //     product.name,
                //     product.price,
                //     product.originalPrice,
                //     product.discount,
                //     product.quantity,
                //     product.unit,
                //     product.image
                //   )
                // }
              />
            </div>
          </div>
        </>
      ) : null}
      {/**************************** end new arrival section ***************************/}

      {/********************************new arrival section****************************** */}
      {data7?.length >= 1 ? (
        <>
          <div>
            <div className="next_prev_btn_container">
              <div className="next_prev_btn">
                <div className="head_box">
                  <Text
                    heading1="Beaf Product"
                    text1="Most popular products near you!"
                  />
                </div>
                <div className="next_prev_btn_content">
                  <div className="swiperNavPrev" ref={swiperNavPrevRef}>
                    <FaArrowLeft className="FaArrowLeft" />
                  </div>
                  <div className="swiperNavNext" ref={swiperNavNextRef}>
                    <FaArrowRight className="FaArrowRight" />
                  </div>
                </div>
              </div>
            </div>
            <div className="carouselitem">
              <div className="cardswrapper">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={8}
                  pagination={{
                    clickable: true,
                  }}
                  parallax={true}
                  navigation={{
                    prevEl: "swiperNavPrevRef.current",
                    nextEl: "swiperNavNextRef.current",
                  }}
                  onInit={(swiper) => {
                    swiper.params.navigation.prevEl = swiperNavPrevRef.current;
                    swiper.params.navigation.nextEl = swiperNavNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    400: {
                      slidesPerView: 1.2,
                      spaceBetween: 20,
                    },
                    500: {
                      slidesPerView: 1.5,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2.3,
                      spaceBetween: 30,
                    },
                    900: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    1200: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                  }}
                  modules={[Navigation, Parallax]}
                >
                  {data7.map((detail, index) => (
                    <SwiperSlide>
                      {loginStatus == false ? (
                        <Card
                          currency={countrycurrency}
                          offer={detail.discount}
                          productName={detail.name}
                          weight={detail.quantity}
                          unit={detail.unit}
                          total={detail.price}
                          cutotal={detail.originalPrice}
                          offer1={detail.discount}
                          today={moment(detail.discountExpiryDate).format(
                            "dddd"
                          )}
                          date={detail.deliveryTime}
                          totalpayment={detail.price}
                          to={`/carddetail/${detail?.nameString}`}
                          // onclick={() => AddToCart(detail._id)}
                          onclick={() =>
                            // AddToCart(detail._id)
                            loginStatus == true
                              ? AddToCart(detail._id)
                              : AddLocalCart(
                                  detail._id,
                                  detail.name,
                                  detail.price,
                                  detail.originalPrice,
                                  detail.discount,
                                  detail.quantity,
                                  detail.unit,
                                  detail.image
                                )
                          }
                          id={{ id: detail._id }}
                          rating={detail.rating}
                          img={detail.image}
                          // onclick1={() => fullView(detail._id)}
                          onclick2={() => setWhistlistOpen(true)}
                          // cartStatus={detail?.isAddedToCart}
                          // qty={detail?.qty}
                          whist={detail?.inWishlist}
                        />
                      ) : (
                        <Card
                          currency={countrycurrency}
                          offer={detail.discount}
                          productName={detail.name}
                          weight={detail.quantity}
                          unit={detail.unit}
                          total={detail.price}
                          cutotal={detail.originalPrice}
                          offer1={detail.discount}
                          today={moment(detail.discountExpiryDate).format(
                            "dddd"
                          )}
                          date={detail.deliveryTime}
                          totalpayment={detail.price}
                          to={`/carddetail/${detail?.nameString}`}
                          onclick={() =>
                            // AddToCart(detail._id)
                            loginStatus == true
                              ? AddToCart(detail._id)
                              : AddLocalCart(
                                  detail._id,
                                  detail.name,
                                  detail.price,
                                  detail.originalPrice,
                                  detail.discount,
                                  detail.quantity,
                                  detail.unit,
                                  detail.image
                                )
                          }
                          id={{ id: detail._id }}
                          rating={detail.rating}
                          img={detail.image}
                          onclick1={() => fullView(detail._id)}
                          onclick2={() => handleWhistlist(detail._id)}
                          // cartStatus={detail?.isAddedToCart}
                          // qty={detail?.qty}
                          whist={detail?.inWishlist}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <WhistList
                whistlistOpen={whistlistOpen}
                handlewhistlistClose={handlewhistlistClose}
                onclick={handlewhistlistClose}
                proceedOTP="Proceed Via OTP"
                proceedsubmit="Submit"
                onChange={handleMobileNumber}
                value={mobileNumber}
                onChange1={(e) => setOtp(e.target.value)}
                onclick1={() => handleLogin()}
                onclick2={() => handleOTP()}
                otpHide={hideOTP}
                btnShow={btn}
                email={store}
                handleResendOTP={() => handleResendOTP()}
              />

              <SearchModal
                searchOpen={searchOpen}
                handleSearchClose={handleSearchClose}
                onclick={handleSearchClose}
                image={product.image}
                name={product.name}
                description={product.description}
                description1={product.description1}
                description2={product.description2}
                description3={product.description3}
                qty={product.quantity}
                unit={product.unit}
                price={product.price}
                ogp={product.originalPrice}
                discount={product.discount}
                // handleViewCart={() => console.log("view cart")
                // loginStatus == true
                //   ? AddToCart(product._id)
                //   : AddLocalCart(
                //     product._id,
                //     product.name,
                //     product.price,
                //     product.originalPrice,
                //     product.discount,
                //     product.quantity,
                //     product.unit,
                //     product.image
                //   )
                // }
              />
            </div>
          </div>
        </>
      ) : null}
      {/**************************** end new arrival section ***************************/}

      {/************************ topserverweek *********************************/}
      <div>
        <div className="next_prev_btn_container">
          <div className="next_prev_btn">
            <div className="head_box">
              <Text
                heading1="Top Rated"
                text1="Most popular products near you!"
              />
            </div>
            <div className="next_prev_btn_content">
              <div className="swiperNavPrev" ref={swiperNavPrevRef}>
                <FaArrowLeft className="FaArrowLeft" />
              </div>
              <div className="swiperNavNext" ref={swiperNavNextRef}>
                <FaArrowRight className="FaArrowRight" />
              </div>
            </div>
          </div>
        </div>
        <div className="carouselitem">
          <div className="cardswrapper">
            <Swiper
              slidesPerView={1}
              spaceBetween={8}
              pagination={{
                clickable: true,
              }}
              parallax={true}
              navigation={{
                prevEl: "swiperNavPrevRef.current",
                nextEl: "swiperNavNextRef.current",
              }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = swiperNavPrevRef.current;
                swiper.params.navigation.nextEl = swiperNavNextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                400: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                },
                500: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2.3,
                  spaceBetween: 30,
                },
                900: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              modules={[Navigation, Parallax]}
            >
              {data?.length >= 1 ? (
                <>
                  {data2.map((detail, index) => (
                    <SwiperSlide>
                      {loginStatus == false ? (
                        <Card
                          currency={countrycurrency}
                          offer={detail.discount}
                          productName={detail.name}
                          weight={detail.quantity}
                          unit={detail.unit}
                          total={detail.price}
                          cutotal={detail.originalPrice}
                          offer1={detail.discount}
                          today={moment(detail.discountExpiryDate).format(
                            "dddd"
                          )}
                          date={detail.deliveryTime}
                          totalpayment={detail.price}
                          to={`/carddetail/${detail?.nameString}`}
                          onclick={() =>
                            // AddToCart(detail._id)
                            loginStatus == true
                              ? AddToCart(detail._id)
                              : AddLocalCart(
                                  detail._id,
                                  detail.name,
                                  detail.price,
                                  detail.originalPrice,
                                  detail.discount,
                                  detail.quantity,
                                  detail.unit,
                                  detail.image
                                )
                          }
                          id={{ id: detail._id }}
                          rating={detail.rating}
                          img={detail.image}
                          onclick1={() => fullView(detail._id)}
                          onclick2={() => setWhistlistOpen(true)}
                          whist={detail?.inWishlist}
                        />
                      ) : (
                        <Card
                          currency={countrycurrency}
                          offer={detail.discount}
                          productName={detail.name}
                          weight={detail.quantity}
                          unit={detail.unit}
                          total={detail.price}
                          cutotal={detail.originalPrice}
                          offer1={detail.discount}
                          today={moment(detail.discountExpiryDate).format(
                            "dddd"
                          )}
                          date={detail.deliveryTime}
                          totalpayment={detail.price}
                          to={`/carddetail/${detail?.nameString}`}
                          onclick={() =>
                            // AddToCart(detail._id)
                            loginStatus == true
                              ? AddToCart(detail._id)
                              : AddLocalCart(
                                  detail._id,
                                  detail.name,
                                  detail.price,
                                  detail.originalPrice,
                                  detail.discount,
                                  detail.quantity,
                                  detail.unit,
                                  detail.image
                                )
                          }
                          id={{ id: detail._id }}
                          rating={detail.rating}
                          img={detail.image}
                          onclick1={() => fullView(detail._id)}
                          onclick2={() => handleWhistlist(detail._id)}
                          whist={detail?.inWishlist}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </>
              ) : null}
            </Swiper>
          </div>
          <WhistList
            whistlistOpen={whistlistOpen}
            handlewhistlistClose={handlewhistlistClose}
            onclick={handlewhistlistClose}
            proceedOTP="Proceed Via OTP"
            proceedsubmit="Submit"
            onChange={handleMobileNumber}
            value={mobileNumber}
            onChange1={(e) => setOtp(e.target.value)}
            // value1={}
            onclick1={() => handleLogin()}
            onclick2={() => handleOTP()}
            otpHide={hideOTP}
            btnShow={btn}
          />

          <SearchModal
            currency={countrycurrency}
            searchOpen={searchOpen}
            handleSearchClose={handleSearchClose}
            onclick={handleSearchClose}
            image={product.image}
            name={product.name}
            description={product.description}
            description1={product.description1}
            description2={product.description2}
            description3={product.description3}
            qty={product.quantity}
            unit={product.unit}
            price={product.price}
            ogp={product.originalPrice}
            discount={product.discount}
          />
        </div>
      </div>
      {/*********************  end topserverweek *************************/}
      <div className="todaydeals_container">
        <div className="todaydeals_content">
          <h5>Shop by Categories</h5>
          <p>Offers curated only for you!</p>
        </div>
      </div>
      <div className="main_categorie_container">
        <div className="categoriecard_content">
          {data1.map((cat) => (
            <CategorieCard
              text={cat.categoryName}
              img={cat.categoryImage}
               today={`/category/${cat?.categoryName}`}
              height="160px"
              width="160px"
              id={{ id: cat._id }}
              // onclick={() => handleNav(cat._id)}
            />
          ))}
        </div>
      </div>
      {/*<div className="todaydeals_container">
        <div className="todaydeals_content">
          <h5>Today’s deals</h5>
          <p>Offers curated only for you!</p>
        </div>
          </div>*/}
      {/**************** today Deals Section **************************/}
      {/*<div className="main_discountsection">
        <div className="submain_discountsection">
          {today.map((deals) => (
            <Discount
              bgColor={deals.color}
              src={deals.image}
              percen={deals.discount}
              text={deals.dealsName}
              radius="100px"
              br="25px"
              onclick={() => fullView(deals._id)}
              // id={deals.productId}
              to={"/carddetail"}
              state={{
                id: {
                  id: deals.productId,
                },
              }}
            />
          ))}
        </div>
        <SearchModal
          currency={countrycurrency}
          searchOpen={searchOpen}
          handleSearchClose={handleSearchClose}
          onclick={handleSearchClose}
          image={product.image}
          name={product.name}
          description={product.description}
          description1={product.description1}
          description2={product.description2}
          description3={product.description3}
          qty={product.quantity}
          unit={product.unit}
          price={product.price}
          ogp={product.originalPrice}
          discount={product.discount}
        />
            </div>*/}
      {/**************** today Deals Section **************************/}

      {/*<Offer />*/}
      {/****************bestSeller*********************/}
      {/*<div>
        <div className="next_prev_btn_container">
          <div className="next_prev_btn">
            <div className="head_box">
              <Text
                heading1="Bestsellers"
                text1="Most popular products near you!"
              />
            </div>
            <div className="next_prev_btn_content">
              <div className="swiperNavPrev" ref={swiperNavPrevRef}>
                <FaArrowLeft className="FaArrowLeft" />
              </div>
              <div className="swiperNavNext" ref={swiperNavNextRef}>
                <FaArrowRight className="FaArrowRight" />
              </div>
            </div>
          </div>
        </div>
        <div className="carouselitem">
          <div className="cardswrapper">
            <Swiper
              slidesPerView={1}
              spaceBetween={8}
              pagination={{
                clickable: true,
              }}
              parallax={true}
              navigation={{
                prevEl: "swiperNavPrevRef.current",
                nextEl: "swiperNavNextRef.current",
              }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = swiperNavPrevRef.current;
                swiper.params.navigation.nextEl = swiperNavNextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                400: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                },
                500: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2.3,
                  spaceBetween: 30,
                },
                900: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              modules={[Navigation, Parallax]}
            >
              {data?.length >= 1 ? (
                <>
                  {data3.map((detail, index) => (
                    <SwiperSlide>
                      {loginStatus == false ? (
                        <Card
                          currency={countrycurrency}
                          offer={detail.discount}
                          productName={detail.name}
                          weight={detail.quantity}
                          unit={detail.unit}
                          total={detail.price}
                          cutotal={detail.originalPrice}
                          offer1={detail.discount}
                          today={moment(detail.discountExpiryDate).format(
                            "dddd"
                          )}
                          date={detail.deliveryTime}
                          totalpayment={detail.price}
                          to="/carddetail"
                          onclick={() =>
                            // AddToCart(detail._id)
                            loginStatus == true
                              ? AddToCart(detail._id)
                              : AddLocalCart(
                                  detail._id,
                                  detail.name,
                                  detail.price,
                                  detail.originalPrice,
                                  detail.discount,
                                  detail.quantity,
                                  detail.unit,
                                  detail.image
                                )
                          }
                          id={{ id: detail._id }}
                          rating={detail.rating}
                          img={detail.image}
                          onclick1={() => fullView(detail._id)}
                          onclick2={() => setWhistlistOpen(true)}
                          whist={detail?.inWishlist}
                        />
                      ) : (
                        <Card
                          currency={countrycurrency}
                          offer={detail.discount}
                          productName={detail.name}
                          weight={detail.quantity}
                          unit={detail.unit}
                          total={detail.price}
                          cutotal={detail.originalPrice}
                          offer1={detail.discount}
                          today={moment(detail.discountExpiryDate).format(
                            "dddd"
                          )}
                          date={detail.deliveryTime}
                          totalpayment={detail.price}
                          to="/carddetail"
                          onclick={() =>
                            // AddToCart(detail._id)
                            loginStatus == true
                              ? AddToCart(detail._id)
                              : AddLocalCart(
                                  detail._id,
                                  detail.name,
                                  detail.price,
                                  detail.originalPrice,
                                  detail.discount,
                                  detail.quantity,
                                  detail.unit,
                                  detail.image
                                )
                          }
                          id={{ id: detail._id }}
                          rating={detail.rating}
                          img={detail.image}
                          onclick1={() => fullView(detail._id)}
                          onclick2={() => handleWhistlist(detail._id)}
                          whist={detail?.inWishlist}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </>
              ) : null}
            </Swiper>
          </div>
          <WhistList
            whistlistOpen={whistlistOpen}
            handlewhistlistClose={handlewhistlistClose}
            onclick={handlewhistlistClose}
            proceedOTP="Proceed Via OTP"
            proceedsubmit="Submit"
            onChange={handleMobileNumber}
            value={mobileNumber}
            onChange1={(e) => setOtp(e.target.value)}
            // value1={}
            onclick1={() => handleLogin()}
            onclick2={() => handleOTP()}
            otpHide={hideOTP}
            btnShow={btn}
          />

          <SearchModal
            currency={countrycurrency}
            searchOpen={searchOpen}
            handleSearchClose={handleSearchClose}
            onclick={handleSearchClose}
            image={product.image}
            name={product.name}
            description={product.description}
            description1={product.description1}
            description2={product.description2}
            description3={product.description3}
            qty={product.quantity}
            unit={product.unit}
            price={product.price}
            ogp={product.originalPrice}
            discount={product.discount}
          />
        </div>
                        </div>*/}

      {/* **************** end bestSeller********************* */}
      {/* ******************** combo ***************** */}

      <div>
        <div className="next_prev_btn_container">
          <div className="next_prev_btn">
            <div className="head_box">
              <Text heading1="Combo for you" text1="Savour the savings!" />
            </div>
            <div className="next_prev_btn_content">
              <div className="swiperNavPrev" ref={swiperNavPrevRef}>
                <FaArrowLeft className="FaArrowLeft" />
              </div>
              <div className="swiperNavNext" ref={swiperNavNextRef}>
                <FaArrowRight className="FaArrowRight" />
              </div>
            </div>
          </div>
        </div>
        <div className="carouselitem">
          <div className="cardswrapper">
            <Swiper
              slidesPerView={1}
              spaceBetween={8}
              pagination={{
                clickable: true,
              }}
              parallax={true}
              navigation={{
                prevEl: "swiperNavPrevRef.current",
                nextEl: "swiperNavNextRef.current",
              }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = swiperNavPrevRef.current;
                swiper.params.navigation.nextEl = swiperNavNextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                400: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                },
                500: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2.3,
                  spaceBetween: 30,
                },
                900: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              modules={[Navigation, Parallax]}
            >
              {data?.length >= 1 ? (
                <>
                  {data4.map((detail, index) => (
                    <SwiperSlide>
                      {loginStatus == false ? (
                        <Card
                          currency={countrycurrency}
                          offer={detail.discount}
                          productName={detail.name}
                          weight={detail.quantity}
                          unit={detail.unit}
                          total={detail.price}
                          cutotal={detail.originalPrice}
                          offer1={detail.discount}
                          today={moment(detail.discountExpiryDate).format(
                            "dddd"
                          )}
                          date={detail.deliveryTime}
                          totalpayment={detail.price}
                          to={`/carddetail/${detail?.nameString}`}
                          onclick={() =>
                            // AddToCart(detail._id)
                            loginStatus == true
                              ? AddToCart(detail._id)
                              : AddLocalCart(
                                  detail._id,
                                  detail.name,
                                  detail.price,
                                  detail.originalPrice,
                                  detail.discount,
                                  detail.quantity,
                                  detail.unit,
                                  detail.image
                                )
                          }
                          id={{ id: detail._id }}
                          rating={detail.rating}
                          img={detail.image}
                          onclick1={() => fullView(detail._id)}
                          onclick2={() => setWhistlistOpen(true)}
                          whist={detail?.inWishlist}
                        />
                      ) : (
                        <Card
                          currency={countrycurrency}
                          offer={detail.discount}
                          productName={detail.name}
                          weight={detail.quantity}
                          unit={detail.unit}
                          total={detail.price}
                          cutotal={detail.originalPrice}
                          offer1={detail.discount}
                          today={moment(detail.discountExpiryDate).format(
                            "dddd"
                          )}
                          date={detail.deliveryTime}
                          totalpayment={detail.price}
                          to={`/carddetail/${detail?.nameString}`}
                          onclick={() =>
                            // AddToCart(detail._id)
                            loginStatus == true
                              ? AddToCart(detail._id)
                              : AddLocalCart(
                                  detail._id,
                                  detail.name,
                                  detail.price,
                                  detail.originalPrice,
                                  detail.discount,
                                  detail.quantity,
                                  detail.unit,
                                  detail.image
                                )
                          }
                          id={{ id: detail._id }}
                          rating={detail.rating}
                          img={detail.image}
                          onclick1={() => fullView(detail._id)}
                          onclick2={() => handleWhistlist(detail._id)}
                          whist={detail?.inWishlist}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </>
              ) : null}
            </Swiper>
          </div>
          <WhistList
            whistlistOpen={whistlistOpen}
            handlewhistlistClose={handlewhistlistClose}
            onclick={handlewhistlistClose}
            proceedOTP="Proceed Via OTP"
            proceedsubmit="Submit"
            onChange={handleMobileNumber}
            value={mobileNumber}
            onChange1={(e) => setOtp(e.target.value)}
            // value1={}
            onclick1={() => handleLogin()}
            onclick2={() => handleOTP()}
            otpHide={hideOTP}
            btnShow={btn}
          />

          <SearchModal
            currency={countrycurrency}
            searchOpen={searchOpen}
            handleSearchClose={handleSearchClose}
            onclick={handleSearchClose}
            image={product.image}
            name={product.name}
            description={product.description}
            description1={product.description1}
            description2={product.description2}
            description3={product.description3}
            qty={product.quantity}
            unit={product.unit}
            price={product.price}
            ogp={product.originalPrice}
            discount={product.discount}
          />
        </div>
      </div>
      {/* **************** end combo ********************* */}

      <Loader loading={load} />
      <MobileBottomtab handleMobile={() => setCartOpen(true)} />
    </div>
  );
};

export default Home;
