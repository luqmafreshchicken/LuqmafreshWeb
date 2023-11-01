import * as React from "react";
import "./whysection.css";
import Header from "../../component/header/Header";
import { useEffect, useState } from "react";
import {
  CountryDetail,
  GetCountry,
  Show_Cart,
  getUserID,
  loginRegister,
  otpVerify,
  removeFromCart,
  resendOTP,
} from "../../serverRequest/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import TopHeader from "../../component/topheader/TopHeader";

export default function WhySection() {
  let navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [btn, setBtn] = useState(false);
  const [otp, setOtp] = useState("");
  const [load, setLoad] = useState(false);
  const [country, setCountry] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [hideOTP, setHideOTP] = useState(false);
  const [countrycurrency, setCountryCurrency] = useState("");
  const [countrytitle, setCountryTitle] = useState("");
  const [flag, setFlag] = useState("");
  const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState(false);

  useEffect(() => {
    localContent();
    window.scrollTo(0, 0);
    setLoad(true);
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
    // localContent();
    showcart();
    // arrivalProductList();
  }, []);

  const localContent = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    const items1 = JSON.parse(localStorage.getItem("modalCount"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartPrice = JSON.parse(localStorage.getItem("cartPrice"));

    if (items) {
      // setWhistlistOpen(false);
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
        // setWhistlistOpen(false);
      } else {
        // setWhistlistOpen(true);
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
        // updatelocalcartindb();
        // localContent();
        // localContent1();
        // setWhistlistOpen(false);
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
  const carthandleOpen = () => setCartOpen(true);
  const carthandleClose = () => setCartOpen(false);

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
        // arrivalProductList();
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
  const handleclear = async (index) => {
    if (index == 4) {
      await localStorage.clear();
      navigate("/");
      window.location.reload();
    }
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
    <div>
      <TopHeader handleclear={() => handleclear(4)} loginStatus={loginStatus} />
     <div className="mobile_header">
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
        // removeProduct={(id) => removeCartProduct(id)} removeLocalCart
        removeProduct={(id) =>
          loginStatus == true ? removeCartProduct(id) : removeLocalCart(id)
        }
        handleResendOTP={() => handleResendOTP()}
        handleCartLogin={() => handleCartLogin()}
        handleHome={() => handleHome()}
      />
      </div>
      <div className="why_section_heading">
        {/* <h3>Why Luqmafresh</h3> */}
      </div>
      <div className="why_section_banner">
        <img src="about-new.jpg" />
      </div>
      <div className="why_section_container">
        {/* section1 */}

        <div className="why_section_content">
          <div className="why_section_text">
            <h3>ABOUT LUQMAFRESH</h3>
            <h6>Understanding the Concept of Nutritious Meat</h6>
            <p>
              The increasing focus on leading a healthy lifestyle has sparked a
              shift in people's choices, leading to a higher demand for natural
              and organic ingredients. It is now widely recognized that meat and
              poultry offer valuable nutritional benefits. When it comes to
              ensuring the elimination of blood toxicity, the Zabiha Halal
              method, which involves the ritualistic slaughter of animals for
              meat, has proven to be highly effective.
            </p>
            <p>
              The earliest documented instance of this ritualistic slaughter can
              be found in Judaism's oral Torah, where animals were sacrificed by
              precisely severing the trachea, carotid arteries, jugular veins,
              and esophagus with an exceptionally sharp knife, allowing the
              blood to drain from the body. The scientific basis supporting this
              method has only recently come to light, leading to a growing
              number of abattoirs worldwide adopting this approach to obtain
              healthier meat options.
            </p>
          </div>
          <div className="why_section_image">
            <img src="whyImage1.png" />
          </div>
        </div>
        {/* end section1 */}

        {/* section2 */}

        <div className="why_section_content reverse" >
          <div className="why_section_image">
            <img src="whyImage2.png" />
          </div>
          <div className="why_section_text">
            <h3>OUR MISSION & VISSION</h3>
            <h6>
              Consumer-Centric Commitment: Upholding Health, Hygiene, and
              Nourishment
            </h6>
            <p>
              At the core of our philosophy lies the belief that every endeavor
              should be geared towards benefiting the consumer. In line with
              this principle, we proudly deliver a range of wholesome and
              hygienic products, be it meat and poultry or any other food items.
              We consider it our duty to provide our customers with food that is
              not only Our Vision and Mission - nourishing but also meets the
              highest standards of quality and production.
            </p>
            <p>
              To ensure this, all our products adhere strictly to international
              benchmarks encompassing aspects such as quality, health,
              production, maintenance, packaging, and retailing. By upholding
              these comprehensive standards, we uphold our commitment to
              offering consumers nothing short of excellence in every bite.
            </p>
          </div>
        </div>
        {/* end section2 */}
        {/* section3 */}

        <div className="why_section_content">
          <div className="why_section_text">
            <h3>OUR HISTORY</h3>
            <h6>Unveiling the Historical Journey</h6>
            <p>
              Luqmafresh Middle East strong belief in meeting the high demand
              for fresh, hygienic, halal, and nutritious meat in the Middle East
              and Gulf regions. To fulfill this commitment, we import
              premium-quality beef, mutton, and chicken that undergo the Zabiha
              halal method of preparation and processing. Through extensive
              laboratory tests comparing various brands, we have discovered that
              this method not only ensures the safety of the meat but also
              guarantees a significantly higher nutritional value compared to
              meat processed through alternative methods.
            </p>
          </div>
          <div className="why_section_image">
            <img src="whyImage3.png" />
          </div>
        </div>
        {/* end section3 */}
        {/* section4 */}

        <div className="why_section_content reverse">
          <div className="why_section_image">
            <img src="whyImage2.png" />
          </div>
          <div className="why_section_text">
            <h3>ABOUT LUQMAFRESH</h3>
            <h6>Understanding the Concept of Nutritious Meat</h6>
            <p>
              The increasing focus on leading a healthy lifestyle has sparked a
              shift in people's choices, leading to a higher demand for natural
              and organic ingredients. It is now widely recognized that meat and
              poultry offer valuable nutritional benefits. When it comes to
              ensuring the elimination of blood toxicity, the Zabiha Halal
              method, which involves the ritualistic slaughter of animals for
              meat, has proven to be highly effective.
            </p>
            <p>
              The earliest documented instance of this ritualistic slaughter can
              be found in Judaism's oral Torah, where animals were sacrificed by
              precisely severing the trachea, carotid arteries, jugular veins,
              and esophagus with an exceptionally sharp knife, allowing the
              blood to drain from the body. The scientific basis supporting this
              method has only recently come to light, leading to a growing
              number of abattoirs worldwide adopting this approach to obtain
              healthier meat options.
            </p>
          </div>
        </div>
        {/* end section4 */}
      </div>
    </div>
  );
}
