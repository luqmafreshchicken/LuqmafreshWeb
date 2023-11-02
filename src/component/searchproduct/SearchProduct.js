import React, { useEffect, useState } from "react";
import "./searchproduct.css";
import CategorieCard from "../categoriecard/CategorieCard";
import {
  productCategorie,
  searchProduct,
  productDeatail,
  Add_to_cart,
  getUserID,
  getAllProductImage,
  loginRegister,
  otpVerify,
  Show_Cart,
  CountryDetail,
  GetCountry,
  removeFromCart,
} from "../../serverRequest/Index";
import SearchProductList from "../../customcomponent/searchproductlist/SearchProductList";
import Header from "../header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loder/Loader";
import TopHeader from "../topheader/TopHeader";
import { useNavigate } from "react-router-dom";
import ProductNotFound from "../../customcomponent/productnotfound/ProductNotFound";
import ModalCart from "../../pages/modalcart/ModalCart"

const SearchProduct = () => {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [show, setShow] = useState(false);
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
  const [load, setLoad] = useState(false);

  // categorie api

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    handleSearch();
  }, []);

  async function getData() {
    setLoad(true);
    const newData = await productCategorie();
    setData(newData.data);
    setLoad(false);
  }
  // search api
  const handleSearch = async (e) => {
    setSearchItem(e);
    if (e.length >= 1) {
      const requestData = { search: e };
      searchProduct(requestData).then((res) => {
        if (res.status == true) {
          setData1(res.data);
          setShow(true);
          setLoad(false);
        } else {
          setLoad(false);

          setShow(false);
        }
      });
    } else {
      getData();
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
      localContent();
    }
  };
  const localContent = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    const items1 = JSON.parse(localStorage.getItem("modalCount"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartPrice = JSON.parse(localStorage.getItem("cartPrice"));

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

  const handleCartLogin = () => {
    setCartOpen(false);
  };
  const handleView = (id) => {};

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
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    localContent();
  };
  const handleHome = () => {
    setCartOpen(false);
    setOpen(true);
  };
  return (
    <>
      <TopHeader handleclear={() => handleclear(4)} loginStatus={loginStatus} />
      <Header
        onchange={(e) => handleSearch(e.target.value)}
        value={searchItem}
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
        handleCartLogin={() => handleCartLogin()}
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
      <div className="search_container">
        <div className="search_content">
          {show == false ? (
            <div className="search_text">
              <h5>Shop by Categories</h5>
              <p>Freshest meats just for you</p>
            </div>
          ) : null}
          {show == false ? (
            <div className="search_categoriecard">
              {data.map((cat) => (
                <CategorieCard
                  text={cat.categoryName}
                  img={cat.categoryImage}
today={`/category/${cat?.categoryName}`}
                  // today="/todaydeals"
                  id={{ id: cat._id }}
                  // onclick={() => handleNav(cat._id)}
                  // style={{ backgroundColor: "red" }}
                />
              ))}
            </div>
          ) : null}
          {data1.length >= 1 ? (
            <>
              <div className="searchsroductlist_container">
                {data1.map((search) => (
                  <SearchProductList
                    name={search?.name}
                    qty={search?.qty}
                    price={search?.price}
                    originprice={search?.originalPrice}
                    img={search?.image}
                    to={`/product/${search?.nameString}`}
                    id={{ id: search._id }}
                    onclick={() => handleView(search._id)}
                    discount={search?.discount}
                    currency={countrycurrency}
                  />
                ))}
              </div>
            </>
          ) : (
            <>{show == true ? <ProductNotFound /> : null}</>
          )}
        </div>
      </div>
      <Loader loading={load} />
    </>
  );
};

export default SearchProduct;
