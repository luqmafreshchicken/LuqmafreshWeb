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
  productDeatail,
  whistUserIDproductId,
  resendOTP,
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
import SearchModal from "../../customcomponent/searchmodal/SearchModal";
import WhistList from "../../customcomponent/whistlist/WhistList";
import TopHeader from "../../component/topheader/TopHeader";
import ModalCart from "../modalcart/ModalCart";
import MobileBottomtab from "../../mobilecomponent/mobilebottomtab/MobileBottomtab";
const TodayDeals = () => {
  let navigate = useNavigate();

  let location1 = useLocation();
  const data = location1?.state?.id;

  console.log(data, "1234567890");
  let location = useLocation();
  const [subcategorie, setSubcategorie] = useState([]);
  const [product, setProduct] = useState([]);
  const [load, setLoad] = useState(false);
  const [country, setCountry] = useState("");
  const [countrycurrency, setCountryCurrency] = useState("");
  const [countrytitle, setCountryTitle] = useState("");
  const [flag, setFlag] = useState("");
  const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartPrice] = useState("");
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
  const [whistList, setWhistList] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [todayView, setTodayView] = useState([]);
  const [whistlistOpen, setWhistlistOpen] = useState(false);
  const [colorId, setColorId] = useState("");

  useEffect(() => {
    setLoad(true);
    window.scrollTo(0, 0);
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
    subCategorie();
    productAll();
    categoryProduct1(data);
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
    setColorId(id);
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
  const categoryProduct1 = async (id) => {
    setLoad(true);
    setColorId(id);
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
        showcart();
        localContent();
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
      setLoad(false);
    }
  };
  const localContent = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    const items1 = JSON.parse(localStorage.getItem("modalCount"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartPrice = JSON.parse(localStorage.getItem("cartPrice"));
    if (items) {
      setLoginStatus(true);
    } else {
      setCartProduct(cart);
      cart?.map((item) => {
        setCartPrice((prev) => prev + item?.productId?.price * item?.quantity);
      });
      setCartPrice(cartPrice?.price);
      localStorage.setItem(
        "cartPrice",
        JSON.stringify({ price: cartPrice?.price })
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
        autoClose: 5000,
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
      const existItem = cart.find((x) => x._id === id);
      if (existItem) {
        // update quantity in cart local storage
        const newCart = cart.map((x) =>
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
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        // let total = 0;
        // const updatedCart = JSON.parse(localStorage.getItem("cart"));
        // updatedCart?.map((item) => {
        //   total = total + item?.productId?.price * item?.quantity;
        // });
        // console.log(total, "==================update count product")
        // localStorage.setItem("cartPrice", JSON.stringify({ price: total }));
        // console.log(total, "==================update count product")
        // setCartPrice(total);

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
          autoClose: 5000,
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
        total = total + item.productId.price;
      });
      setCartPrice(total);
      setLoginStatus(false);
    }
  };

  const fullView = async (id) => {
    setLoad(true);
    if (id === undefined || id === null || id === "") {
      toast.error("Please enter product id", {
        position: "top-right",
        autoClose: 5000,
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
        setTodayView(res.data);
        setLoad(false);
      } else {
        setLoad(false);
      }
    });
  };

  const handleSearchClose = () => setSearchOpen(false);

  const handleWhistlist = async (id) => {
    const userId = await getUserID();
    const data = {
      userId: userId,
      productId: id,
    };
    const res = await whistUserIDproductId(data);
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
      setWhistList(res.data);
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

  const handlewhistlistClose = () => {
    setWhistlistOpen(false);
    let data = {
      modalCount: false,
    };
    localStorage.setItem("modalCount", JSON.stringify({ data: data }));
  };

  const handleResendOTP = () => {
    // email validation
    if (mobileNumber === "") {
      toast.error("Please enter email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    } else if (!mobileNumber.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error("Please enter valid email address", {
        position: "top-right",
        autoClose: 5000,
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
          autoClose: 5000,
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
    setOpen(true);
  };

  const handleHome = () => {
    setCartOpen(false);
    setOpen(true);
  };

  return (
    <>
      <TopHeader handleclear={() => handleclear(4)} loginStatus={loginStatus} />
      <div className="todayDealsHeader">
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
      </div>
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
      <div>
        {subcategorie?.length >= 1 ? (
          <div className="subCategorieContaner">
            <div className="subCategorieContent">
              <SubCategorieList
                selID={colorId == "" ? "123" : colorId}
                catId={"123"}
                // img={category.subcategoryImage}
                name="All"
                onclick={() => productAll()}
              />
              {subcategorie?.map((category) => (
                <>
                  <SubCategorieList
                    selID={colorId}
                    catId={category?._id}
                    // img={category.subcategoryImage}
                    name={category?.subcategoryName}
                    onclick={() => categoryProduct(category?._id)}
                  />
                </>
              ))}
            </div>
            <Loader loading={load} />
          </div>
        ) : null}

        {product?.length >= 1 ? (
          <div className="main_today_card">
            <div className="todayCardContainer">
              {product.map((item) => (
                <>
                  {loginStatus == false ? (
                    <CustomTodayCard
                      offer={item?.discount}
                      productName={item?.name}
                      weight={item?.quantity + "  " + item?.unit}
                      total={item?.price}
                      cutotal={item?.originalPrice}
                      offer1={item?.discount}
                      today={moment(item?.discountExpiryDate).format("dddd")}
                      date={item?.deliveryTime}
                      totalpayment={item?.price}
                      img={item?.image}
                      rating={item?.rating}
                      id={{ id: item?._id }}
                      to={`/product/${item?.nameString}`}
                      onclick={() => {
                        // setShow(!show);
                        loginStatus == true
                          ? handleCart(item?._id)
                          : AddLocalCart(
                              item._id,
                              item.name,
                              item.price,
                              item.originalPrice,
                              item.discount,
                              item.quantity,
                              item.unit,
                              item.image
                            );
                      }}
                      onclick1={() => fullView(item?._id)}
                      onclick2={() => setWhistlistOpen(true)}
                      // onclick={() => handleCart(item._id)}/
                    />
                  ) : (
                    <CustomTodayCard
                      offer={item?.discount}
                      productName={item?.name}
                      weight={item?.quantity + "  " + item?.unit}
                      total={item?.price}
                      cutotal={item?.originalPrice}
                      offer1={item?.discount}
                      today={moment(item?.discountExpiryDate).format("dddd")}
                      date={item?.deliveryTime}
                      totalpayment={item?.price}
                      img={item?.image}
                      rating={item?.rating}
                      id={{ id: item._id }}
                      to={`/product/${item?.nameString}`}
                      onclick={() => {
                        // setShow(!show);
                        loginStatus == true
                          ? handleCart(item?._id)
                          : AddLocalCart(
                              item._id,
                              item.name,
                              item.price,
                              item.originalPrice,
                              item.discount,
                              item.quantity,
                              item.unit,
                              item.image
                            );
                      }}
                      onclick1={() => fullView(item?._id)}
                      onclick2={() => handleWhistlist(item?._id)}
                      // onclick={() => handleCart(item._id)}/
                    />
                  )}
                </>
              ))}
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
                image={todayView?.image}
                name={todayView?.name}
                description={todayView?.description}
                description1={todayView?.description1}
                description2={todayView?.description2}
                description3={todayView?.description3}
                qty={todayView?.quantity}
                unit={todayView?.unit}
                price={todayView?.price}
                ogp={todayView?.originalPrice}
                discount={todayView?.discount}
              />
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
        <MobileBottomtab handleMobile={() => setCartOpen(true)} />
      </div>
    </>
  );
};

export default TodayDeals;
