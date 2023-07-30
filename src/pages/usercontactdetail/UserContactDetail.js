import React, { useEffect, useState } from "react";
import "./usercontact.css";
import Input from "../../customcomponent/input/Input";
import Button from "../../customcomponent/button/Button";
import Steps from "../../customcomponent/steps/Steps";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createAddress,
  getUserID,
  CountryDetail,
  GetCountry,
  Show_Cart,
  removeFromCart,
  viewProfile,
  currentLocation
} from "../../serverRequest/Index";
import Header from "../../component/header/Header";
import { useNavigate } from "react-router-dom";
import Loader from "../../component/loder/Loader";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const UserContactDetail = () => {
  let navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [address1, setAddress1] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [load, setLoad] = useState(false);
  const [userId, setUserId] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [country, setCountry] = useState("");
  const [countrycurrency, setCountryCurrency] = useState("");
  const [countrytitle, setCountryTitle] = useState("");
  const [flag, setFlag] = useState("");
  const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [btn, setBtn] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);


  useEffect(() => {
    userDetail();
  }, []);

  const userDetail = async () => {
    const UserId = await getUserID();
    viewProfile(UserId).then((res) => {
      if (res.status == true) {
        setEmail(res?.data?.email);
        setMobile(res?.data?.mobile?.number);
        setFullName(res?.data?.name);
      } else {
      }
    });
  };

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLatitude(position.coords.latitude);
  //         setLongitude(position.coords.longitude);
  //       },
  //       (error) => {
  //         console.error("Error retrieving location:", error);
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by your browser.");
  //   }
  // }, []);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          currentLocation(
            position.coords.latitude,
            position.coords.longitude
          ).then((loc) => {
            setAddress(loc.results[0]?.address_components?.[3]?.long_name);
            setAddress1(loc.results[0]?.address_components?.[5]?.long_name);
            setCity(loc.results[0].formatted_address);
          });
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  });

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

  console.error("Geolocation is not supported by your browser.");

  const localContent = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    const items1 = JSON.parse(localStorage.getItem("modalCount"));
    if (items) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
      if (items1) {
      } else {
        setLoginStatus(false);
      }
    }
  };
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

  const carthandleOpen = () => setCartOpen(true);
  const carthandleClose = () => setCartOpen(false);

  useEffect(() => {
    getUserID().then((res) => {});
  });

  const handleCreateAdd = async () => {
    const id = await getUserID();
    // console.log(id) ispe set h id isko use kar lo jha v jarurat padega
    if (address === "") {
      toast.error("Please enter Address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    } else if (address1 === "") {
      toast.error("Please enter Address1", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    } else if (landmark === "") {
      toast.error("Please enter landmark", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    }
    if (city === "") {
      toast.error("Please enter city", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    }
    if (mobile === "") {
      toast.error("Please enter Address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    } else if (!mobile.match(phoneRegExp)) {
      toast.error("Please enter valid mobile No", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    }
    if (email === "") {
      toast.error("Please enter Address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error("Please enter valid email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    }
    if (fullName == "") {
      toast.error("Please enter name", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      return false;
    }

    const requestData = {
      userId: id,
      address: address,
      address1: address1,
      landmark: landmark,
      city: city,
      mobile: mobile,
      email: email,
      name: fullName,
      latitude: latitude,
      longitude: longitude,
      type: "Office",
    };
    createAddress(requestData).then((res) => {
      setLoad(true);
      console.log(res.message);
      if (res.status == true) {
        toast.success(res.message + "Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/addnewaddress");
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

  return (
    <>
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
        totalAmount={cartPrice}
        modalcurrency={countrycurrency}
        handleclear={(index) => handleclear(index)}
        removeProduct={(id) => removeCartProduct(id)}
      />
      <div className="main_usercontact">
        <div className="main_user_contact_location">
          {/* contact page */}
          <div className="user_contact_location">
            <div className="user_contact_detail">
              <Input
                lable="Current Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                lable="Adress"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <Input
                lable="Landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
              />
              <Input
                lable="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                lable="Mobile No"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <Input
                lable="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                lable="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Button onclick={() => handleCreateAdd(userId)} />
            </div>
            <div className="user_contact_location_steps">
              <Steps img1="radio.png" img2="radio.png" img3="radio.png" />
            </div>
          </div>
          {/* end contact page */}
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
        <ToastContainer />
        <Loader loading={load} />
      </div>
    </>
  );
};

export default UserContactDetail;
