import React, { useEffect } from "react";
import "./account.css";
import List from "./Accountlist";
import ViewProfile from "../viewprofile/ViewProfile";
import { useState } from "react";
import Orderhistory from "../orderhistory/Orderhistory";
import Header from "../header/Header";
import {
  viewProfile,
  getUserID,
  CountryDetail,
  GetCountry,
  Show_Cart,
  removeFromCart,
} from "../../serverRequest/Index";
import Notification from "../notification/Notification";
import WhistListDetail from "../whistlistdetail/WhistListDetail";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyAccount from "../myaccount/MyAccount";
import TopHeader from "../topheader/TopHeader";

const Account = () => {
  let navigate = useNavigate();

  const [profile, setProfile] = useState(false);
  const [open2, setOpen2] = useState(0);
  const [viewUser, setViewUser] = useState([]);
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
  const [countryCode, setCountryCode] = useState("");


  const handleOpen = () => {
    if (open2 === 0) {
      return <MyAccount />;
    }
    if (open2 === 1) {
      return <Orderhistory countyCurrency={countrycurrency} />;
    }
    if (open2 === 2) {
      return <WhistListDetail />;
    }
    if (open2 === 3) {
      return <Notification />;
    }
    if (open2 === 4) {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  };
  useEffect(() => {
    userDetail();
  }, []);

  const userDetail = async () => {
    const UserId = await getUserID();
    viewProfile(UserId).then((res) => {
      console.log(res.data);
      if (res.status == true) {
        setViewUser(res.data);
      } else {
      }
    });
  };

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
                  setCountryCode(res[0]?.callingCodes[0])
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

  const handleEdit = async (id) => {
    console.log(id);
  };
  const handleclear = async (index) => {
    if (index == 4) {
      await localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  };
  const viewhandleOpen = () => setProfile(true);
  const viewhandleClose = () => setProfile(false);
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
      <TopHeader handleclear={() => handleclear(4)} loginStatus={loginStatus} />
      <div className="account_header">
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
      </div>
      <div className="account_section">
        <div className="account_content">
          <div className="account_text">
            <h3>{viewUser.name}</h3>
            <div className="account_profile">
              <p>
                <img src={flag} /> +{countryCode} {viewUser?.mobile?.number} |{" "}
                {viewUser.email}
              </p>
              <span onClick={viewhandleOpen}>View profile</span>
            </div>
          </div>
          <div className="account_banner">
            <img src="about-new.jpg" />
          </div>
          {/* show data */}
          <div className="account_list_section">
            <div className="account_list_show">
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                {List.map((list, index) => (
                  <l1
                    style={{
                      listStyle: "none",
                      color: "black",
                      fontWeight: 600,
                      fontSize: "17px",
                      paddingTop: "10px",
                    }}
                  >
                    <div
                      className="hover_bottom"
                      onClick={() => setOpen2(index)}
                    >
                      {list.routeName}
                    </div>
                  </l1>
                ))}
              </ul>
            </div>
            <div className="show_data">{handleOpen(open2)}</div>
          </div>
          {/* end show data */}
        </div>
        <ViewProfile profile={profile} viewhandleClose={viewhandleClose} />
      </div>
    </>
  );
};

export default Account;
