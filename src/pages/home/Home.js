import React, { useEffect, useState } from "react";
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
} from "../../serverRequest/Index";

import * as moment from "moment";
import { useNavigate } from "react-router-dom";
// import Loader from "../loder/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../customcomponent/card/Card";
import WhistList from "../../customcomponent/whistlist/WhistList";
import SearchModal from "../../customcomponent/searchmodal/SearchModal";

const Home = () => {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
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
  const [product,setProduct] = useState([]);

  // const handlewhistlistOpen = () => setWhistlistOpen(true);
  const handlewhistlistClose = () => setWhistlistOpen(false);
  const handleSearchClose = () => setSearchOpen(false);

  useEffect(() => {
    localContent();
    // showcart();
    // const interval = setInterval(showcart, 4000); // Call showcart every four seconds
    // return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  const localContent = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    if (items) {
      setWhistlistOpen(false);
    } else {
      setWhistlistOpen(true);
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

  {
    /* login api */
  }
  const handleLogin = () => {
    const requestData = { email: mobileNumber };
    loginRegister(requestData).then((res) => {
      setShowInput(!showInput);
      setHideOTP(true);
      setBtn(true)
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
        setSearchOpen(true)
        setProduct(res.data);
        setLoad(false);
      } else {
        setLoad(false);
      }
    });
  };

  
  { /* end full view */}
  console.log(product,"========================================")
  return (
    <>
      <Header />
      <BannerCard />
      {/*<Twobanner />*/}
      <Text heading1="New Arrivals" text1="Most popular products near you!" />
      {/* new arrival section */}
      <div className="carouselitem">
        <div className="cardswrapper">
          <div className="card_slider">
            {data.length >= 1 ? (
              <>
              
                {data.map((detail, index) => (
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
                ))}
              </>
            ) : null}
            <div className="slider_next_btn">
              <img src="rtarrow.png" height="20px" width="20px" />
            </div>
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
      {/* end new arrival section */}
      <CountDown />
      <TopSeverWeek />
      <Text
        heading1="Shop by Categories"
        text1="Most popular products near you!"
      />
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
      <Text heading1="Today’s deals" text1="Offers curated only for you!" />
      <DiscountSection />
      <Offer />
      <Text heading1="Bestsellers" text1="Most popular products near you!" />
      <Bestseller />
      <Text heading1="Combos for you" text1="Savour the savings!" />
      <CardSliderOne />
      <Loader loading={load} />
    </>
  );
};

export default Home;
