import * as React from "react";
import "./privacypolicy.css";
import Header from "../../component/header/Header";
import TopHeader from "../../component/topheader/TopHeader";
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

export default function PrivacyPolicy() {
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
      <div className="privacy_header">
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
      <div className="pravacy_container">
        <div className="pravacy_content">
          <h2>LUQMAFRESH PRIVACY POLICY </h2>
          <h5>Disclaimer</h5>
          <p>
            The Company reserves the right to modify this Policy unilaterally at
            any time without notice. Such changes may be necessary to comply
            with applicable laws and regulations or accommodate organizational
            changes within the Company. Please visit this page regularly to stay
            informed about any updates we make. If you disagree with any part of
            this Policy, kindly refrain from using our Platform immediately.{" "}
          </p>
          <h5>The website </h5>
          <p>
            <tr>
              www.luqmafresh.com ("Website"), the Luqmafresh mobile application
              ("luqmafresh App"), and the combined platform ("Platform") are
              provided by JIO GENERAL TRADING L.L.C (“Company” or “Luqmafresh”
              or “we”). Luqmafresh has created this privacy policy (“Privacy
              Policy” or “Policy”) to demonstrate our strong commitment to
              protecting the information you submit while using our Platform.
              This Policy outlines how we collect, retain, share, store, and
              process your information.
            </tr>
            • This Policy encompasses and comprises our Terms of Service
            ("Terms").Words and phrases not defined in this Policy have the same
            meanings as provided in the Terms.
            <tr>
              • By using the Platform (or even just browsing it), you expressly
              consent to our use and disclosure of your personal information in
              accordance with this Privacy Policy.
            </tr>
          </p>

          <h5>
            A. What kind of personal information do we collect from you and when
            is it collected?{" "}
          </h5>
          <p>
            {" "}
            Information Gathered During Registration and Account Creation: In
            order to make use of our Products and Offers, you will need to
            create a user account using your email account. When placing orders
            for Products, it is necessary to provide your name, phone number,
            email ID, physical address, and PIN code.
            <h5> 2. Visitor Information and Participation Data:</h5>
            Individuals visiting our Platform have the option to submit their
            name, email address, and/or additional details for the purpose of
            learning about our Products, Offers, participating in
            Company-sponsored events, or engaging in surveys, among other
            activities.
            <h5> 3. Financial and KYC Details:</h5>
            Razorpay and others payment options secure online payment system may
            collect your information, including credit/debit card number, UPI
            ID, billing address, and payment instrument particulars. Credit card
            data stored on the Platform is securely maintained by Razorpay and
            other payment options and is accessible to us for a maximum of 30
            days. This information is subject Razorpay and others payment
            options privacy policy.
            <h5> 4.Feedback Data and Other Information:</h5>
            This encompasses: a. Recording of information shared by you during
            customer service calls, either for assistance or for quality and
            training purposes. b. Data input during participation in our loyalty
            programs or utilization of provided discount codes. c. Feedback or
            comments provided by you on the Platform.
            <h5>5.Data Pertaining to Other Individuals:</h5>
            Should you order Products or make use of Offers on behalf of someone
            else (such as for gifting), you must provide their names, mobile
            numbers, email IDs, and addresses. We rely on you to obtain consent
            from the intended recipient for our limited use of their personal
            information.
            <h5>6.Usage Data:</h5>
            We amass information about your interactions with our Platform,
            encompassing patterns of engagement (like screen actions and
            gestures such as taps and scrolls), dates and times of access,
            viewed App features or pages, occurrences of App crashes, and other
            system activities, browser type, and any third-party sites or
            services used prior to or during interaction with our Platform.
            <h5>7.Device Information:</h5>
            We collect data regarding the devices used to access our Platform,
            including device IP addresses, unique identifiers, advertising
            identifiers, serial numbers, device motion data, and mobile network
            data.
            <h5>8.Data Collected via Cookies:</h5>
            "Cookies" are utilized on websites to collect data. They typically
            capture information about user preferences, language settings, and
            other miscellaneous details, including the duration of time spent on
            our Platform. Information gathered through cookies is employed to
            analyze your interactions with our website, gauge responses to
            marketing promotions, and enhance your shopping experience. Although
            you can deactivate our cookies in your browser settings, this might
            limit your access to all the features of our Platform and require
            repeated password entry for your account (if applicable).
            <h5>9.Information Acquired via Advertisements:</h5>
            Our Platform may employ third-party advertising agencies for serving
            ads during your visits. We collect, analyze, and store data relating
            to your interactions with these ads. This data empowers ad networks
            to provide targeted advertisements that align with your interests.
            This Policy, however, does not encompass the use of cookies by these
            advertisers.
            <h6>B. How is your information utilized?</h6>
            Your personal details may be employed for the Company's valid
            business interests related to your Platform usage, encompassing
            registration, order verification, delivery particulars, addressing
            user queries, fulfilling requests, finalizing transactions,
            delivering customer support, sending administrative notices, and
            tailoring your Platform experience. This data might also be utilized
            to enhance our understanding of our users collectively and improve
            the Platform's content and functionality. Additionally, it may be
            employed for investigating and prosecuting potential violations of
            Company security or license agreements. Occasionally, your email
            address may be used to communicate information and updates regarding
            Products and Offers that could be of interest to you. Furthermore,
            your contact information may be leveraged to reach out concerning
            matters related to your Platform usage, including modifications to
            this Policy. When you provide personal information about others (for
            instance, furnishing a name and address for a gift recipient), this
            data is utilized to process deliveries and, in certain instances, to
            update the intended recipient on delivery status. We rely on your
            efforts to secure the intended recipient's permission for our
            limited use of their personal information. The financial and KYC
            data gathered by Razorpay and other payment options serve the
            purpose of facilitating seamless payment processes. If issues arise
            during order processing, you might receive email communication from
            them. Periodically, we may contact you with updates, newsletters,
            event notifications, and seminars that fall under the category of
            Marketing Communications. Moreover, your personal information may be
            used to address your queries or process recruitment application
            forms that you've completed and consented to on our Platform.
            <h6>C. Is your personal information shared with third parties?</h6>
            Our customers' personal information is not sold to external parties.
            Additionally, we refrain from sharing such data with third-party
            commercial entities for their marketing or advertising objectives
            unless you explicitly grant permission. In specific scenarios, it
            becomes necessary to share your information with third parties.
            These third parties might include: a. Third-party service providers:
            Our operational activities involve multiple external organizations
            and individuals who contribute to our functions. Certain personally
            identifiable details, such as name, member ID, email, mobile number,
            address, or information gathered from your Platform access and
            utilization (including device data, location, and network carrier),
            may be disclosed to these service providers. Additionally, these
            service providers may employ cookies on our behalf and obtain
            insights into your browsing and purchasing behavior. This
            information is shared to personalize the Platform, conduct
            behavioral analyses, and comprehend consumer trends. It is also
            shared with logistics companies and payment service providers to
            facilitate Product delivery and payments on the Platform. We
            establish contractual agreements with these parties to ensure the
            safeguarding of your data.
            <h6>D. How do we safeguard your personal data?</h6>
            The Company restricts access to personal information to authorized
            personnel, associates, partners, and officials. Additionally, our
            third-party service providers are held to rigorous standards of
            privacy and confidentiality. We employ physical, electronic, and
            procedural safeguards to shield the data from loss, misuse, damage,
            modification, unauthorized access, or disclosure. Several key
            elements of our information security protocol include: Utilization
            of specialized technologies like firewalls. Prior testing of product
            and service security and functionality by the IT department before
            internet deployment, along with continuous scans for known
            vulnerabilities in the technology. Implementation of controls to
            identify, authenticate, and authorize access to various systems or
            sites. Limitation on the use of external data devices on Company
            systems. Provision of relevant training to Company personnel and
            continuous updates to security practices in response to emerging
            risks and technological advancements. However, we are unable to
            guarantee the privacy of personal information transmitted over the
            web or via insecure channels.
            <h6>
              E. What are your rights concerning the collected personal data?
            </h6>
            It is essential for us that you retain control over your personal
            data. Should you desire modifications, deletions, or withdrawal of
            consent regarding any collected personal information, please send an
            email to info@luqmafresh.com with 'REMOVE' indicated in the subject
            line. Please note that such actions might render you unable to
            utilize our Platform following the deletion or withdrawal of
            consent.
            <h6>F. Data retention</h6>
            We retain your personal information solely to facilitate your
            seamless and uninterrupted use of the Platform. Your personal
            information is not retained beyond the lawful necessity for the
            intended purpose.
            <h6>G. Privacy for children</h6>
            Our Platform is intended for adult use, and we do not knowingly
            solicit or gather personal information from individuals under the
            age of 18 (eighteen). In the event that we become aware of a child
            providing us with personal data, we will take steps to erase that
            information and terminate the associated user account.
            <h6>H. Addressing Concerns</h6>
            For any concerns you may have regarding the processing of your
            personal information, please feel free to reach out to: Name – Mr.
            Mohammad Momin Sohail Company Name – JIO GENERAL TRADING L.L.C
            Company Registered Office: SHOP 10, DANUBE LAWNZ, INTERNATIONAL
            CITY, DUBAI, UAE Email: jiotrading@yahoo.com Hours: 9:00 to 17:00
            Please be aware that all email communications exchanged with the
            Company may be subject to monitoring, in line with internal policies
            aimed at ensuring compliance and safeguarding our business
            interests. This document constitutes an electronic record as per the
            provisions of the Information Technology Act in UAE, and relevant
            regulations, including amendments related to electronic records in
            various statutes, as amended by the Information Technology Act in
            UAE. This electronic record is generated by a computer system and
            does not necessitate physical or digital signatures.
          </p>
        </div>
      </div>
    </div>
  );
}
