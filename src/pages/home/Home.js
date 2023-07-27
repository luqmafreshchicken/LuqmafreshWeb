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
import { productCategorie, productDeatail } from "../../serverRequest/Index";
import TopSeverWeek from "../../component/topseverweek/TopSeverWeek";
import Bestseller from "../../component/bestseller/BestSeller";
import Header from "../../component/header/Header";
import Loader from "../../component/loder/Loader";
// import React, { useEffect, useState } from "react";
// import Card from "../../customcomponent/card/Card";
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
} from "../../serverRequest/Index";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import * as moment from "moment";
import { useNavigate } from "react-router-dom";
// import Loader from "../loder/Loader";
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

const Home = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [today, setToday] = useState([]);

  const [showInput, setShowInput] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [btn, setBtn] = useState(false);
  const [otp, setOtp] = useState("");
  const [showbtn, setShowbtn] = useState(false);
  const [load, setLoad] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [whistlistOpen, setWhistlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showSubmit, setshowSubmit] = useState(false);
  const [hideOTP, setHideOTP] = useState(false);
  const [product, setProduct] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef(null);

  // const handlewhistlistOpen = () => setWhistlistOpen(true);
  const handlewhistlistClose = () => {
    setWhistlistOpen(false);
    let data = {
      modalCount: false,
    };
    localStorage.setItem("modalCount", JSON.stringify({ data: data }));
  };
  const handleSearchClose = () => setSearchOpen(false);

  useEffect(() => {
    localContent();
  }, []);
  const localContent = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    const items1 = JSON.parse(localStorage.getItem("modalCount"));
    if (items) {
      setWhistlistOpen(false);
    } else {
      if (items1) {
        setWhistlistOpen(false);
      } else {
        setWhistlistOpen(true);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoad(true);
    async function getData(res) {
      const newData = await productCategorie();
      setData1(newData.data);
    }
    getData();
    const timer = setTimeout(() => {
      setLoad(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const handleNav = (id) => {
    //  console.log(id);
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

  // topsever week

  useEffect(() => {
    async function getData() {
      const newData = await topSeverweek();
      setData2(newData.data);
    }
    getData();
  }, []);

  // const AddToCart = async (id) => {
  //   const UserId = await getUserID();
  //   const data = {
  //     userId: UserId,
  //     productId:id,
  //     quantity:"1"
  //   };
  //   const res = await Add_to_cart(data);
  //   if (res.status == true) {
  //     toast.success(res.message, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   } else {
  //     toast.error(res.message, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // };
  // end topseverweek

  // bestSeller api
  useEffect(() => {
    async function getData() {
      const newData = await bestSeller();
      setData3(newData.data);
    }
    window.scrollTo(0, 0);
    getData();
  }, []);
  // end bestSeller api

  // todeal deals Api
  useEffect(() => {
    async function today() {
      const newData = await todayDeals();
      setToday(newData.data);
    }
    today();
  }, []);
  // end today deals Api
  {
    /* login api */
  }
  const handleLogin = () => {
    const requestData = { email: mobileNumber };
    loginRegister(requestData).then((res) => {
      setShowInput(!showInput);
      setHideOTP(true);
      setBtn(true);
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

  const handleOTP = () => {
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
        setWhistlistOpen(false);
        // navigate('/')
        window.location.reload();
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

  {
    /* end login api */
  }

  const fullView = async (id) => {
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

  const swiperNavPrevRef = useRef(null);
  const swiperNavNextRef = useRef(null);

  return (
    <>
      <Header />
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
                        to="/carddetail"
                        onclick={() => AddToCart(detail._id)}
                        id={{ id: detail._id }}
                        rating={detail.rating}
                        img={detail.image}
                        onclick1={() => fullView(detail._id)}
                        onclick2={() => setWhistlistOpen(true)}
                      />
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
      {/**************************** end new arrival section ***************************/}
      {/************************ topserverweek *********************************/}
      <div>
        <div className="next_prev_btn_container">
          <div className="next_prev_btn">
            <div className="head_box">
              <CountDown />
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
                  {data2.map((detail, index) => (
                    <SwiperSlide>
                      <Card
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
                        to="/carddetail"
                        onclick={() => AddToCart(detail._id)}
                        id={{ id: detail._id }}
                        rating={detail.rating}
                        img={detail.image}
                        onclick1={() => fullView(detail._id)}
                        onclick2={() => setWhistlistOpen(true)}
                      />
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
              today="/todaydeals"
              height="160px"
              width="160px"
              id={{ id: cat._id }}
              onclick={() => handleNav(cat._id)}
            />
          ))}
        </div>
      </div>
      <div className="todaydeals_container">
        <div className="todaydeals_content">
          <h5>Today’s deals</h5>
          <p>Offers curated only for you!</p>
        </div>
      </div>
      {/**************** today Deals Section **************************/}
      <div className="main_discountsection">
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
            />
          ))}

          <Discount
            bgColor="#C42118"
            src="Eggs.png"
            percen="40"
            text="On Mutton"
            br="25px"
          />
        </div>
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
        />
      </div>
      {/**************** today Deals Section **************************/}

      <Offer />
      {/****************bestSeller*********************/}
      <div>
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
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
           
              modules={[Navigation, Parallax]}
            >
              {data.length >= 1 ? (
                <>
                  {data3.map((detail, index) => (
                    <SwiperSlide>
                      <Card
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
                        to="/carddetail"
                        onclick={() => AddToCart(detail._id)}
                        id={{ id: detail._id }}
                        rating={detail.rating}
                        img={detail.image}
                        onclick1={() => fullView(detail._id)}
                        onclick2={() => setWhistlistOpen(true)}
                      />
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
      {/* **************** end bestSeller********************* */}
      {/* <Text heading1="Combos for you" text1="Savour the savings!" />
                  <CardSliderOne />*/}
      <Loader loading={load} />
    </>
  );
};

export default Home;
