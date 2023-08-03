import React, { useEffect, useState, useRef } from "react";
import Card from "../../customcomponent/card/Card";

import CardFullDetail from "../../customcomponent/cardfulldetail/CardFullDetail";
import ImagesCard from "../../customcomponent/imagescard/ImagesCard";
import "./carddetail.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {
  Add_to_cart,
  getUserID,
  newArrival,
  productDeatail,
  whistUserIDproductId,
  loginRegister,
  otpVerify,
  Show_Cart,
} from "../../serverRequest/Index";
import * as moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Text from "../../component/text/Text";
import { Navigation, Parallax } from "swiper";
import Loader from "../../component/loder/Loader";
import SearchModal from "../../customcomponent/searchmodal/SearchModal";
import WhistList from "../../customcomponent/whistlist/WhistList";

const CardDetail = ({id}) => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [whistlistOpen, setWhistlistOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [countrycurrency, setCountryCurrency] = useState("");
  const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
  const [whistList, setWhistList] = useState([]);
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState(false);
  // const [showInput, setShowInput] = useState(false);
  // const [mobileNumber, setMobileNumber] = useState("");
  // const [btn, setBtn] = useState(false);
  // const [otp, setOtp] = useState("");
  // const [hideOTP, setHideOTP] = useState(false);

  useEffect(() => {
    async function getData(res) {
      const newData = await newArrival();
      setData(newData.data);
    }
    // window.scrollTo(0, 0)
    getData();
    // localContent()
    // localContent1()
  }, []);

  const swiperNavPrevRef = useRef(null);
  const swiperNavNextRef = useRef(null);

  const handleSearchClose = () => setSearchOpen(false);

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
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartPrice = JSON.parse(localStorage.getItem("cartPrice"));
    setCartPrice(cartPrice?.price);
    if (items) {
      setWhistlistOpen(false);
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

  // local cart data after login add in cart

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
        toast.success("Product already in cart", {
          position: "top-right",
          autoClose: 5000,
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

  // new arrial section

  useEffect(() => {
    async function getData(res) {
      const newData = await newArrival();
      setData(newData.data);
    }
    window.scrollTo(0, 0);
    getData();
  }, []);

  const AddToCart = async (id) => {
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
      window.location.reload();

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
  };
  // end new arrival

  const fullView = async (id) => {
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
        setProduct(res.data);
        setLoad(false);
      } else {
        setLoad(false);
      }
    });
  };

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

  return (
    <div>
      <CardFullDetail />
      {/*<div>
        <div className="next_prev_btn_container">
          <div className="next_prev_btn">
            <div className="head_box">
              <Text
                heading1="You May Also Like"
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
        <d className="carouselitem">
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
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
              }}
              modules={[Navigation, Parallax]}
            >
              {data.length >= 1 ? (
                <>
                  {data.map((detail, index) => (
                    <SwiperSlide>
                      <Card
                        currency={countrycurrency}
                        offer={detail.discount}
                        productName={detail.name}
                        weight={detail.quantity}
                        unit={detail.unit}
                        total={detail.price}
                        cutotal={detail.originalPrice}
                        offer1={detail.discount}
                        today={moment(detail.discountExpiryDate).format("dddd")}
                        date={detail.deliveryTime}
                        totalpayment={detail.price}
                        // to="/youmaylike"
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
                      />
                    </SwiperSlide>
                  ))}
                </>
              ) : null}
            </Swiper>

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
          <Loader loading={load} />
        </d>
       </div>*/}
    </div>
  );
};

export default CardDetail;

{
  /*
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}
*/
}
