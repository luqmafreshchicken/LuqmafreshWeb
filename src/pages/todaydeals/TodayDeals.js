import React, { useEffect, useState } from "react";
import SubCategorieList from "./component/subcategorielist/SubCategorieList";
import { useLocation } from "react-router-dom";
import "./todaydeal.css";
import {
  Add_to_cart,
  getAllSubcategoryByCategoryId,
  getUserID,
  ProductBySubCategoryId,
  productbyCategorie,
  Show_Cart,
  CountryDetail,
  GetCountry,
  loginRegister,
  otpVerify,
  removeFromCart,
} from "../../serverRequest/Index";
import Header from "../../component/header/Header";
import Loader from "../../component/loder/Loader";
import * as moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../customcomponent/card/Card";
import ProductNotFound from "../../customcomponent/productnotfound/ProductNotFound";
import { useNavigate } from "react-router-dom";
import CustomTodayCard from "./customtodaycomponent/customtodaycard/CustomTodayCard";

const TodayDeals = () => {
  let navigate = useNavigate();

  let location = useLocation();
  const [subcategorie, setSubcategorie] = useState([]);
  const [product, setProduct] = useState([]);
  const [load, setLoad] = useState(false);
  const [country, setCountry] = useState("");
  const [countrycurrency, setCountryCurrency] = useState("");
  const [countrytitle, setCountryTitle] = useState("");
  const [flag, setFlag] = useState("");
  const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [btn, setBtn] = useState(false);
  const [otp, setOtp] = useState("");
  const [hideOTP, setHideOTP] = useState(false);
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState(false);

  useEffect(() => {
    setLoad(true);
    subCategorie();
    productAll();
    window.scrollTo(0, 0);
  }, []);

  const subCategorie = () => {
    setLoad(true);
    const categoryId = location?.state?.id?.id;
    const requestData = {
      id: categoryId,
    };
    getAllSubcategoryByCategoryId(requestData).then((res) => {
      if (res.status == true) {
        setSubcategorie(res.data);
        setLoad(false);
        // categoryProduct(res?.data[0]?._id);
      } else {
        setLoad(false);
      }
    });
  };

  const categoryProduct = async (id) => {
    setLoad(true);

    const requestData = {
      subCategoryId: id,
    };
    ProductBySubCategoryId(requestData).then((res) => {
      if (res.status == true) {
        setProduct(res.data);
        setLoad(false);
      } else {
        setLoad(false);
      }
    });
  };

  const productAll = async (id) => {
    setLoad(true);
    const categoryId = location?.state?.id?.id;

    const requestData = {
      categoryId: categoryId,
    };

    productbyCategorie(requestData).then((res) => {

      if (res.status == true) {
        setProduct(res.data);
        setLoad(false);
      } else {
        setLoad(false);
      }
    });
  };
  const handleCart = async (id) => {
    setLoad(true);
    const UserId = await getUserID();
    const data = {
      userId: UserId,
      productId: id,
      quantity: "1",
    };
    console.log(data, "gaurav joshi");

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
      showcart();
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
      setLoad(false);
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
        showcart();
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
        handleclear={(index) => handleclear(index)}
        removeProduct={(id) => removeCartProduct(id)}
        modalcurrency={countrycurrency}
      />
      <div>
        {subcategorie.length >= 1 ? (
          <div className="subcategorie_contaner">
            <div className="subcategorie_content">
              {subcategorie.map((category) => (
                <SubCategorieList
                  // img={category.subcategoryImage}
                  name={category.subcategoryName}
                  onclick={() => categoryProduct(category._id)}
                />
              ))}
            </div>
            <Loader loading={load} />
          </div>
        ) : null}

        {product.length >= 1 ? (
          <div className="main_today_card">
            <div className="today_card">
              {product.map((item) => (
                <CustomTodayCard
                  offer={item?.discount}
                  productName={item?.name}
                  weight={item?.quantity + "  " + item.unit}
                  total={item?.price}
                  cutotal={item?.originalPrice}
                  offer1={item?.discount}
                  today={moment(item?.discountExpiryDate).format("dddd")}
                  date={item?.deliveryTime}
                  totalpayment={item?.price}
                  img={item?.image}
                  rating={item?.rating}
                  id={{ id: item._id }}
                  to="/carddetail"
                  onclick={() => handleCart(item._id)}
                />
              ))}
              <Loader loading={load} />
            </div>
          </div>
        ) : (
          <>
            <ProductNotFound />
          </>
        )}

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
        <ToastContainer />
      </div>
    </>
  );
};

export default TodayDeals;
