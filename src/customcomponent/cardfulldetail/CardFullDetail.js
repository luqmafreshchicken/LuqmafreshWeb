import * as React from "react";
import "./cardfulldetail.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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
  removeFromCart,
  newArrival,
  resendOTP,
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
import { useNavigate } from "react-router-dom";
import ImagesCard from "../imagescard/ImagesCard";
import Text from "../../component/text/Text";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import * as moment from "moment";
import { Navigation, Parallax } from "swiper";
import Card from "../card/Card";
import CustomAddToCartButton from "../../component/AddToCart";
import TopHeader from "../../component/topheader/TopHeader";

export default function CardFullDetail({ id }) {
  let navigate = useNavigate();
  let location = useLocation();
  const [data, setData] = useState([]);
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
  const [hideOTP, setHideOTP] = useState(false);
  const [country, setCountry] = useState("");
  const [countrycurrency, setCountryCurrency] = useState("");
  const [countrytitle, setCountryTitle] = useState("");
  const [flag, setFlag] = useState("");
  const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartPrice] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState(false);
  const [whistlistOpen, setWhistlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [count, setCount] = useState(0);

  const handleSearchClose = () => setSearchOpen(false);

  useEffect(() => {
    // localStorage.clear();
    async function getData(res) {
      const newData = await newArrival();
      setData(newData.data);
    }
    window.scrollTo(0, 0);
    getData();
  }, []);

  const swiperNavPrevRef = useRef(null);
  const swiperNavNextRef = useRef(null);
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
    showcart();
    setLoad(true);
    const id = location?.state?.id?.id;
    findProductCount(id);
    const requestData = {
      productId: id,
    };
    productDeatail(requestData).then((res) => {
      if (res?.status == true) {
        setProduct(res?.data);
        setLoad(false);
        showcart();
      } else {
        setLoad(false);
        showcart();
      }
    });
  };

  const findProductCount = async (id) => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    if (items) {
      const userId = await getUserID();
      const data = {
        userId: userId,
      };
      const res = await Show_Cart(data);
      if (res?.status == true) {
        const findProduct = res?.data?.cart.find(
          (item) => item?.productId?._id === id
        );
        setCount(findProduct?.quantity || 0);
        let qty = findProduct?.quantity;
        qty > 0 ? setShow(true) : setShow(false);
      }
    } else {
      const localCArt = JSON.parse(localStorage.getItem("cart"));
      const findProduct = localCArt?.find((item) => item?._id === id);
      setCount(findProduct?.productId?.quantity || 0);
      let qty = findProduct?.productId?.quantity;
      qty > 0 ? setShow(true) : setShow(false);
    }
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
  const AddToCart = async (count) => {
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
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setLoad(false);
      showcart();
    } else {
      toast.error(res.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
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
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
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
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
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
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem("userDetail", JSON.stringify(res.data));
        updatelocalcartindb();
        localContent();
        localContent1();
        showcart();
        fullView();
        // setWhistlistOpen(false);
        setOpen(false);
        setLoad(false);
      } else {
        setLoad(false);
        console.log(res);
        toast.error(res.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
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
    setCartPrice(res?.data?.totalAmount);
    if (res.status == true) {
      setCartProduct(res?.data?.cart);
      setCartPrice(res?.data?.totalAmount);
      localContent();
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
  const updatelocalcartindb = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setWhistlistOpen(false);
      setLoginStatus(true);
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
        autoClose: 2000,
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
        console.log(total, "==================update count product");
        localStorage.setItem("cartPrice", JSON.stringify({ price: total }));
        setCartPrice(total);
        toast.success("Product quantity update in cart", {
          position: "top-right",
          autoClose: 2000,
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
          autoClose: 2000,
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

  const carthandleOpen = () => setCartOpen(true);
  const carthandleClose = () => setCartOpen(false);

  const handleclear = async (index) => {
    if (index == 4) {
      await localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  };
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
    // setShowCartBtn(false);
    setCount(0);
    setShow(false);
    toast.success("Product remove from cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    localContent();
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
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        showcart();
        setCount(0);
        setShow(false);
      } else {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };
  // end remove cart

  const handleResendOTP = () => {
    // email validation
    if (mobileNumber === "") {
      toast.error("Please enter email", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return false;
    } else if (!mobileNumber.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error("Please enter valid email address", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    setLoad(true);
    const requestData = { email: mobileNumber };
    resendOTP(requestData).then((res) => {
      if (res.status === true) {
        toast.success(res.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });

        setLoad(false);
      } else {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
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

  const handleIncrement = () => {
    setShow(true);
    setCount(count + 1);
    loginStatus == true
      ? AddToCart()
      : AddLocalCart(
          product._id,
          product.name,
          product.price,
          product.originalPrice,
          product.discount,
          product.quantity,
          product.unit,
          product.image
        );
  };
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      loginStatus == true
        ? handleDecre(count - 1)
        : handleLocalCartQuantity(product._id, count - 1);
    }
  };
  const handleLocalCartQuantity = (id, quantity) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartPrice = JSON.parse(localStorage.getItem("cartPrice"));
    const product = cart?.find((item) => item?.productId?._id === id);
    console.log(product);
    console.log(cartPrice);
    if (quantity < product?.productId?.quantity) {
      const updateQuantity = cart?.map((item) => {
        if (item?.productId?._id === id) {
          item.productId.quantity = quantity;
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updateQuantity));
      localStorage.setItem(
        "cartPrice",
        JSON.stringify({ price: cartPrice?.price - product?.productId?.price })
      );
      setCartPrice(cartPrice?.price - product?.productId?.price);
      setCartProduct(updateQuantity);
      toast.success("Product quantity updated", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      localContent();
    }
  };
  const handleDecre = async (quantity) => {
    setLoad(true);
    const userId = await getUserID();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userId: userId,
      ProductId: product._id,
      quantity: quantity,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://luqmafresh-beckend.onrender.com/product/UpdateCartQuantityByid",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.status == true) {
          toast.success(res.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          // setIncre()
          showcart();
          setLoad(false);
        } else {
          toast.error(res.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setLoad(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <TopHeader handleclear={() => handleclear(4)} loginStatus={loginStatus} />

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
          modalcurrency={countrycurrency}
          handleclear={(index) => handleclear(index)}
          // removeProduct={(id) => removeCartProduct(id)}
          removeProduct={(id) =>
            loginStatus == true ? removeCartProduct(id) : removeLocalCart(id)
          }
          handleCartLogin={() => handleCartLogin()}
          handleResendOTP={() => handleResendOTP()}
          handleHome={() => handleHome()}
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
                  <p style={{ color: "#d11243" }}>
                    {countrycurrency}
                    {product.price}
                  </p>
                  <p style={{ color: "grey", textDecoration: "line-through" }}>
                    MRP: {countrycurrency}
                    {product.originalPrice}
                  </p>
                  <p style={{ color: "green" }}>{product.discount}% OFF</p>
                </div>
                <CustomAddToCartButton
                  // show={show}
                  show={show}
                  onShow={() => setShow(true)}
                  quantity={count}
                  onIncrement={() => handleIncrement()}
                  onDecrement={() => handleDecrement()}
                />
                {/* {show === false ? (
                  <div className="Add_to_cart_btn">
                    <button
                      onClick={() => {
                        setShow(!show);
                        loginStatus == true
                          ? AddToCart()
                          : AddLocalCart(
                              product._id,
                              product.name,
                              product.price,
                              product.originalPrice,
                              product.discount,
                              product.quantity,
                              product.unit,
                              product.image
                            );
                      }}
                    >
                      ADD
                    </button>
                  </div>
                ) : (
                  <div
                    hidden={!show}
                    // onClick={() => AddToCart()}
                    onClick={() =>
                      // AddToCart(detail._id)
                      loginStatus == true
                        ? AddToCart()
                        : AddLocalCart(
                            product._id,
                            product.name,
                            product.price,
                            product.originalPrice,
                            product.discount,
                            product.quantity,
                            product.unit,
                            product.image
                          )
                    }
                    className="full_view_incre_btn"
                  >
                    <p onClick={decrement}>-</p>
                    <p>{incre}</p>
                    <p onClick={increment}>+</p>
                  </div>
                )} */}
              </div>
              <hr style={{ height: "1px" }} />
            </div>
          </div>
        </div>
        <ImagesCard />
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
    </>
  );
}
