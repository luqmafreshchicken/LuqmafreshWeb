import * as React from "react";
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
import "./termcondition.css";

export default function TermsConditions() {
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
      <div className="termcondition_header">
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
          <h2>LUQMAFRESH TERM & CONDITION </h2>
          <p>
            These Terms of Use ("Agreement") pertain to the utilization of the
            website – www.luqmafresh.com ("Website") and the Luqmafresh mobile
            application on iOS or Android devices, encompassing phones, tablets,
            or any other electronic device ("Luqmafresh App"). Within the scope
            of this Agreement, the terms "you" or "User" refer to any
            individual, including natural or legal persons, engaging with the
            Platform or purchasing any Luqmafresh product using a computer
            system or electronic device, such as mobile devices, handheld
            devices, and tablets. The terms "Luqmafresh" or "we" denote JIO
            GENERAL TRADING L.L.C{" "}
          </p>
          <h5>ACCEPTANCE</h5>
          <p>
            We encourage you to review this Agreement each time you visit the
            Platform to ensure your understanding of the terms and conditions
            governing Platform use and/or product purchases (referred to as
            "Products" herein). This Agreement does not alter the terms or
            conditions of any other existing agreement you may have with
            Luqmafresh for other products or services. In cases where a conflict
            arises between the terms of this Agreement and any other executed
            agreement, the latter shall take precedence concerning the
            respective subject matter. If you do not agree with this Agreement,
            including referenced policies or guidelines, kindly terminate your
            Platform use promptly. To print this Agreement, please utilize the
            print function on your browser toolbar.
          </p>
          <h5>ELIGIBILITY </h5>
          <p>
            By agreeing to this Agreement, you represent and affirm that you are
            a minimum of eighteen (18) years old or older, possessing the
            capacity to comprehend and accept the terms outlined in this
            Agreement. Luqmafresh retains the right to terminate your membership
            and/or deny access to the Platform if you are under eighteen (18)
            years of age or lack contractual competency as per relevant laws.
          </p>

          <h5>TERMS OF USE </h5>
          <p>
            We extend a limited, non-exclusive, non-transferable, and revocable
            license for your Platform use, contingent upon the conditions
            delineated in this Agreement. You undertake not to contravene any
            laws while engaging with the Platform or attempting to disrupt its
            functionality. You acknowledge and consent that all
            materials—comprising information, data, text, software, music,
            sound, photographs, graphics, audio, video, messages, or other
            content—displayed on the Platform, including the brand name
            "Luqmafresh" (collectively referred to as "Content"), are the
            proprietary assets of Luqmafresh or its licensors. Unauthorized use
            of any Content, absent express written permission from Luqmafresh or
            its licensors, is explicitly prohibited. Except where specified
            otherwise in this Agreement, none of the Content may be replicated,
            distributed, republished, downloaded, exhibited, posted,
            transmitted, or duplicated in any form or by any means without prior
            written consent from Luqmafresh and/or the pertinent licensor. You
            are granted permission to display, copy, distribute, and download
            Platform materials solely for personal, non-commercial usage,
            provided that no modifications are made to the materials and all
            copyright and proprietary notices are retained. You are forbidden
            from 'mirroring' any Platform materials on any other server without
            explicit written consent from Luqmafresh. Permission granted under
            this Agreement terminates automatically without prior notification
            upon violation of the aforementioned terms. Upon such termination,
            you agree to promptly delete any downloaded and/or printed Content.
            You are prohibited from hosting, displaying, uploading, modifying,
            publishing, transmitting, updating, or sharing any information on
            the Platform that:
          </p>
          <h6>
            a. Belongs to another individual without rightful authorization;{" "}
          </h6>
          <h6>
            b. Is egregiously harmful, harassing, blasphemous, defamatory,
            obscene, pornographic, pedophilic, libelous, invades privacy,
            promotes hate or racial or ethnic bias, disparages, relates to money
            laundering or gambling, or violates laws in any way;{" "}
          </h6>
          <h6>c. Harms minors in any capacity; </h6>
          <h6>
            d. Infringes upon patents, trademarks, copyrights, or other
            proprietary rights;{" "}
          </h6>
          <h6>e. Breaches existing laws; </h6>
          <h6>
            f. Misleads or deceives the recipient about message origins or
            conveys grossly offensive or menacing information;{" "}
          </h6>

          <p>
            <h6>g. Assumes another person's identity;</h6>
            <h6>
              h. Contains viruses or any other computer code, files, or programs
              designed to disrupt, destroy, or impair Platform functionality;
            </h6>
            <h6>
              {" "}
              i. Threatens the unity, integrity, defense, security, or
              sovereignty of India, international relations, public order,
              incites offense, or impedes the investigation of offenses, or
              insults any nation. You agree not to amass information about other
              users from the Platform, nor to download or replicate any
              information through unsolicited access for the purpose of direct
              communication or any other intent.
            </h6>
            <p>
              ANY UTILIZATION OF THE PLATFORM NOT SPECIFICALLY GRANTED UNDER
              THIS AGREEMENT IS STRICTLY FORBIDDEN.
            </p>
            <h5>PRODUCTS, ORDERING, AND PRICING</h5>
            Currently, Luqmafresh is exclusively delivering the products listed
            on the Platform ("Products") and providing various offers ("Offers")
            solely within designated locations in UAE cities ("Operating
            Locations"). Orders cannot be accommodated outside of these
            Operating Locations. Any alterations to Luqmafresh's Operating
            Locations will be duly indicated on the Platform. Availability of
            all Products is contingent upon supply, and we reserve the right to
            impose order quantity restrictions, reject partial or complete
            orders, and discontinue Products without prior notice, even if an
            order has been placed. While we make every effort to accurately
            depict Product descriptions, colors, and images, we cannot guarantee
            or assume responsibility for any disparities in visual
            representations or color discrepancies arising from technical
            factors. Product prices and descriptions may change at our sole
            discretion and at any time without prior notification. We shall bear
            no liability, neither to you nor to any third party, for alterations
            in pricing, suspension, or discontinuation of Products. The Platform
            facilitates orders for Products in standard quantities, and the
            displayed price for each Product is calculated based on the standard
            quantity. However, due to inherent product characteristics,
            variations may exist between ordered and supplied quantities. You
            will only be charged for the quantity of Product delivered to you.
            If the supplied quantity is less than the ordered quantity, any
            excess payments made by you will be promptly refunded in a manner
            determined by Luqmafresh, such as mobile wallet credits. Should the
            quantity of supplied Product exceed the ordered quantity, any
            additional due amount will be adjusted against your subsequent
            order. Given the perishable nature of the Products, we strongly
            recommend reading the instructions on each Product's packaging
            attentively before use. Any offers presented on the Platform shall
            be subject to terms and conditions listed alongside this Agreement
            on the Platform. Luqmafresh holds proprietary rights and trade
            secrets concerning the Products. You are prohibited from copying,
            reproducing, reselling, or redistributing any Product produced
            and/or distributed by Luqmafresh.
            <h5> DELIVERY, HANDLING CHARGES, AND TAXES</h5>
            Delivery and handling charges, along with applicable taxes, may be
            imposed by Luqmafresh at its discretion. Despite our efforts for
            timely deliveries, actual delivery times for Products may differ
            from those indicated during ordering. Luqmafresh will notify you of
            any delivery delays. In response to the ongoing Covid-19 pandemic,
            Luqmafresh has introduced contactless delivery to safeguard the
            health of customers and delivery personnel. This service is
            available at an additional cost of AED 10 per order.
            <h5>PLATFORM</h5>
            Intellectual Property and Third-Party Links Luqmafresh possesses
            exclusive rights, titles, and ownership of all intellectual property
            arising from its brand and the Platform. Luqmafresh may occasionally
            feature links to third-party websites or services on the Platform.
            Usage of third-party services linked from the Platform is at your
            own risk, and Luqmafresh is absolved of responsibility for any
            ensuing loss or damage. In addition to Product availability, this
            Platform provides information—directly and through third-party
            links—pertaining to nutritional and dietary supplements. Such
            information is for general use, and you solely rely on it at your
            own risk. We disclaim liability for any direct, indirect,
            consequential, or other damages connected to the utilization of this
            information. Furthermore, for third-party content accessible through
            the Platform, responsibility rests with the person or entity making
            the content available.
            <h5> User Account</h5>
            Accessing and utilizing the Platform may necessitate registration by
            providing requisite information. Accuracy of this information is
            your responsibility. You are accountable for safeguarding your
            password. We shall not be liable for any losses or damages resulting
            from inadequate account security. Billing details, including payment
            information, are subject to the same accuracy standards as other
            identifying information. Providing false data or engaging in
            fraudulent or unlawful activities through the Platform may lead to
            immediate termination of this Agreement. By posting, storing, or
            transmitting content on the Platform, you grant Luqmafresh a
            perpetual, worldwide, non-exclusive, royalty-free, assignable, and
            licensable right to use, copy, display, perform, create derivatives,
            distribute, transmit, and assign said content in any form, in all
            media now known or hereafter created, worldwide. Luqmafresh lacks
            control over user-generated content and is not liable for
            interactions between users or posted content. Luqmafresh reserves
            the right, although not obligated, to monitor user interactions and
            to remove objectionable content at its discretion.
            <h5>Reverse Engineering & Security</h5>
            You agree not to engage in the following activities: Reverse
            engineer, attempt to reverse engineer, or disassemble any code or
            software from the Platform; Breach Platform security through
            unauthorized access, encryption circumvention, data mining, or
            interfering with hosts, users, or networks; Employ the Platform for
            illegal spam activities, including harvesting email addresses and
            personal data or sending mass commercial emails.
            <h5>Customer Solicitation</h5>
            Unless notified in writing of your intention to opt out, you agree
            to receive marketing communications and solicitations via various
            mediums for Product offers.
            <h5>Opt-Out Procedure</h5>
            You can opt out from future marketing communications by following
            these steps: Send an email to: info@luqmafres.com
            <h5>DISCLAIMER OF WARRANTIES</h5>
            Your utilization of this Platform is exclusively undertaken at your
            own risk. The Platform, Products, and offers are provided on an "as
            is" and "as available" basis. In compliance with applicable laws,
            Luqmafresh explicitly disclaims all types of warranties, whether
            expressed or implied, including but not limited to implied
            warranties of merchantability, fitness for a specific purpose, and
            non-infringement, pertaining to the Products or Platform, or any
            reliance on or usage of the Platform or Products. By no means
            limited to the foregoing, Luqmafresh offers no assurance that the
            content and links to third-party platforms featured on this Platform
            are precise, reliable, comprehensive, or prompt. No advice or
            information, whether verbal or written, garnered from this Platform,
            will create any warranty beyond what is expressly stated in this
            Agreement, regarding the results that might arise from Product use,
            or the correction of any defects in the Products.
            <h5> LIMITATION OF LIABILITY</h5>
            Luqmafresh's total liability and your sole recourse, under law,
            equity, or any other means, concerning Platform usage, Products,
            offers, and/or any breaches of this Agreement, is solely restricted
            to the amount you paid in the last month for any such claims
            arising, excluding shipping, handling costs, and taxes, for Products
            purchased through the Platform. Subject to applicable laws,
            Luqmafresh shall not be accountable for any direct, indirect,
            incidental, special, or consequential damages associated with this
            Agreement or Platform, Product, and offer usage, including
            liabilities resulting from (1) Platform, Product, or offer usage or
            inability to use them; (2) procuring substitute Products; or (3)
            lost profits, goodwill loss, loss, theft, or corruption of user
            information that you might allege.
            <h5>INDEMNIFICATION</h5>
            You commit to releasing, indemnifying, defending, and safeguarding
            Luqmafresh and its contractors, agents, employees, officers,
            directors, shareholders, affiliates, and assigns from any and all
            liabilities, claims, damages, costs, and expenses, including
            reasonable attorney fees, arising from third parties connected to or
            resulting from (1) your breach of any provision in this Agreement,
            including your warranties, representations, and obligations; (2)
            your usage of the Platform, Products, or offers; (3) infringement on
            any intellectual property or proprietary rights, including
            Luqmafresh's, by you; or (4) information or data furnished to
            Luqmafresh by you. In the event that Luqmafresh faces a lawsuit or
            threat of one from a third party, Luqmafresh may seek written
            assurances from you pertaining to your indemnification pledge;
            failure to provide such assurances could be considered a substantial
            breach of this Agreement. Luqmafresh has the right to participate in
            your defense against a third-party claim concerning your use of the
            Platform, Products, or offers, employing counsel of its choice at
            its expense. Luqmafresh will reasonably cooperate with your defense
            of a third-party claim at your request and expense. You bear the
            primary responsibility to defend Luqmafresh against any claim, but
            prior written consent from Luqmafresh is mandatory for any related
            settlement. The terms of this provision endure beyond the
            termination or annulment of this Agreement or Platform and Product
            usage by you.
            <h5>MODIFICATION</h5>
            Luqmafresh retains the right to modify this Agreement at any time,
            as per relevant laws, by publishing the amendments or the revised
            Agreement on this Platform. Notification of amendments may occur by
            indicating the date of the last revision atop this Agreement or
            through alternative means. The updated Agreement becomes effective
            immediately upon posting on this Platform. Any use of the Platform
            post-amendment posting signifies your ongoing acceptance of the
            Agreement and its amendments.
            <h5>PRIVACY</h5>
            Luqmafresh values safeguarding user privacy and provides
            notification regarding your data's utilization. Refer to
            Luqmafresh's Privacy Policy, which is integrated herein by
            reference.
            <h5>GENERAL</h5>
            Force Majeure Luqmafresh will not be in default or liable for
            cessation, disruption, or delay in performing obligations due to
            forces like earthquake, flood, fire, storm, act of God, war,
            terrorism, pandemic, lockdown, conflict, labor strike, or boycott.
            <h5>Cessation of Operation</h5>
            Luqmafresh, at its sole discretion and without advance notice, may
            discontinue Platform operation, Product distribution, and/or
            Platform-offered offers.
            <h5>Entire Agreement</h5>
            This Agreement, inclusive of incorporated policies and guidelines,
            constitutes the complete agreement between you and Luqmafresh,
            superseding prior agreements on the subject. Effect of Waiver
            Luqmafresh's failure to exercise or enforce any right or provision
            of this Agreement does not amount to a waiver of said right or
            provision. If a court of competent jurisdiction determines any
            provision herein as invalid, the parties agree that the court should
            attempt to fulfill the parties' intentions expressed in the
            provision, and other Agreement provisions remain valid and
            effective.
            <h5>Governing Law and Jurisdiction</h5>
            This Agreement is governed by UAE laws, subject to UAE courts'
            exclusive jurisdiction.
            <h5>Dispute Resolution</h5>
            In case of a dispute arising from Platform usage, you and Luqmafresh
            shall refer the matter to a sole arbitrator appointed by a neutral
            third-party arbitral institution identified by Luqmafresh.
            Arbitration shall be held in UAE, conducted in English, and governed
            by applicable laws. This arbitration provision endures
            post-Agreement termination.
            <h5>Waiver of Class Action Rights</h5>
            Upon entering this Agreement, you irrevocably relinquish your right
            to join claims as a class action or similar procedural device.
            Claims related to this Agreement must be pursued individually.
            <h5>Termination</h5>
            Luqmafresh may terminate your Platform access without notice if it
            deems, in its sole discretion, that you breached this Agreement.
            Post-termination, you won't access the Platform, and Luqmafresh may,
            at its discretion and without notice, cancel outstanding Product
            orders. Platform access cessation allows Luqmafresh to take
            necessary measures to prevent unauthorized access. This Agreement
            persists until Luqmafresh decides, at its sole discretion and
            without notice, to terminate it.
            <h5>Use of Platform outside Operating Locations</h5>
            Luqmafresh doesn't assert that the Platform, Products, or offers are
            fit or available outside Operating Locations.
            <h5>Assignment</h5>
            Transferring rights or responsibilities pursuant to this Agreement
            is not permitted. Luqmafresh may assign rights and obligations per
            applicable law, without notice.
            <h5>Severability</h5>
            If a provision is deemed unlawful, void, or unenforceable, it
            remains enforceable to the fullest extent permitted by law, and the
            unenforceable part is severed. The Agreement's remaining provisions
            remain valid.
            <h5>Conflict</h5>
            This Agreement integrates by reference Luqmafresh's Privacy Policy,
            rules, and policies on the Platform, encompassing additional or
            modified terms, and current or future services. In the event of
            conflict, this Agreement's terms prevail concerning its subject
            matter, and policy/guideline terms prevail concerning their
            respective subject matter. Review all such policies and guidelines
            carefully on the Platform.
            <h5>Contact Us</h5>
            For inquiries, including unrelated copyright infringement, about
            this Platform, please contact us. Grievance Officer Grievance
            Officer: Mohammad Momin Sohail Owner Name: Kashish Khan, Mohammad
            Momin Sohail Company Address: Shop 10, Danube Lawnz, International
            City, Dubai, UAE Company Email: jiotrading@yahoo.com This electronic
            document conforms to the Information Technology Act in UAE and
            associated amendments regarding electronic records. Generated by a
            computer system, it requires no physical or digital signatures.
          </p>
        </div>
      </div>
    </div>
  );
}
