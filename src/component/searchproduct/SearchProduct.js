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
} from "../../serverRequest/Index";
import SearchProductList from "../../customcomponent/searchproductlist/SearchProductList";
import Header from "../header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loder/Loader";

const SearchProduct = () => {
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
    async function getData() {
      setLoad(true);
      const newData = await productCategorie();
      setData(newData.data);
      setLoad(false);
    }
    window.scrollTo(0, 0);
    getData();
  }, []);

  // search api
  const handleSearch = async (e) => {
    setLoad(true);

    setSearchItem(e);
    if (e.length >= 3) {
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

  const handleCartLogin = () => {
    setCartOpen(false);
  };
  const handleView = (id) => {};
  return (
    <>
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
        handleCartLogin={()=>handleCartLogin()}
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
                  today="/todaydeals"
                  height="160px"
                  width="160px"
                  id={{ id: cat._id }}
                  // onclick={() => handleNav(cat._id)}
                  style={{ backgroundColor: "red" }}
                />
              ))}
            </div>
          ) : null}
          {data1.length >= 1 ? (
            <>
              <div className="searchsroductlist_container">
                {data1.map((search) => (
                  <SearchProductList
                    name={search.name}
                    qty={search.qty}
                    // offername={search.name}
                    price={search.price}
                    originprice={search.originalPrice}
                    img={search.image}
                    to="/carddetail"
                    id={{ id: search._id }}
                    onclick={() => handleView(search._id)}
                    discount={search.discount}
                    currency={countrycurrency}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <Loader loading={load} />
    </>
  );
};

export default SearchProduct;
