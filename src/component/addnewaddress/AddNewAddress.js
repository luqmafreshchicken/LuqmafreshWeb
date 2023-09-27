import React, { useEffect, useState } from "react";
import "./addnewaddress.css";
import Steps from "../../customcomponent/steps/Steps";
import Loader from "../loder/Loader";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAddress,
  getUserID,
  deleteAddress,
  updataAddress,
  CountryDetail,
  GetCountry,
  Show_Cart,
  removeFromCart,
} from "../../serverRequest/Index";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import TopHeader from "../topheader/TopHeader";
import MobileBottomtab from "../../mobilecomponent/mobilebottomtab/MobileBottomtab";
import ModalCart from "../../pages/modalcart/ModalCart";

const AddNewAddress = ({ id }) => {
  let navigate = useNavigate();

  const [getData, setGetData] = useState([]);
  const [length, setLength] = useState("");
  const [addressid, setAddressId] = useState("");
  const [load, setLoad] = useState(false);
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
    window.scrollTo(0, 0);
    getAllAddress();
  }, []);

  const getAllAddress = async () => {
    setLoad(true);
    const id = await getUserID();
    const requestData = {
      userId: id,
    };
    getAddress(requestData).then((res) => {
      if (res.status == true) {
        setGetData(res.data);
        setLoad(false);
        setLength(res.data.length);
      }
    });
  };

  const handleDelete = async (id) => {
    const requestData = {
      id: id,
    };
    deleteAddress(requestData).then((res) => {
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
        getAllAddress();
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

  const handleCartEmpty = () => {
    toast.error("Your cart is empty", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <TopHeader handleclear={() => handleclear(4)} loginStatus={loginStatus} />

      <div className="addaddress_mobile_header">
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
          // removeProduct={(id) => removeCartProduct(id)}
        />
      </div>

      <ModalCart
        // cartopen={cartopen}
        cartopen={cartOpen}
        carthandleClose={carthandleClose}
        onclose={carthandleClose}
        loginStatus={loginStatus}
        cartProduct={cartProduct}
        totalAmount={cartPrice}
        modalcurrency={countrycurrency}
        removeProduct={(id) => removeCartProduct(id)}
      />
      <div className="main_addaddress_container">
        <div className="addaddress_container">
          <div className="addaddress_content_text">
            {/* saved Address */}
            <div className="saved_address">
              <h5>Your Saved Addresses</h5>
              <p>Please select one of your saved delivery address</p>
            </div>
            {/* end saved Address */}

            <div className="select_saved_address_container">
              {getData.map((add) => (
                <div className="select_saved_address">
                  <div className="saved_text_area">
                    <div className="local_area">
                      <h6>{add.address}</h6>
                    </div>
                    {/*  saved Area */}

                    <div className="all_detail_text">
                      <div>{add?.city}</div>
                      <div>Mobile Number : {add?.mobile}</div>
                    </div>
                    {/* end Area */}

                    <div className="edit_delete_btn" key={add._id}>
                      <div className="input_radio">
                        <input
                          type="radio"
                          onChange={() => setAddressId(add?._id)}
                          checked={addressid === add._id}
                          // onChange={() => console.log(add._id)}
                        />
                        <p
                          htmlFor={`address_${add._id}`}
                          onClick={() => setAddressId(add._id)}
                        >
                          Select
                        </p>
                      </div>
                      
                      <p onClick={() => handleDelete(add._id)}>Delete</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="address_proceed_btn">
              {" "}
              {/* proceed btn */}
              {addressid !== "" ? (
                <>
                  {cartProduct?.length >= 1 ? (
                    <NavLink
                      to="/selectdeliveryslot"
                      className="nav_list"
                      state={{ id: addressid }}
                    >
                      <button className="addaddress_button">Proceed</button>
                    </NavLink>
                  ) : (
                    <button
                      className="addaddress_button"
                      onClick={() => handleCartEmpty()}
                    >
                      Proceed
                    </button>
                  )}
                </>
              ) : null}
            </div>

            {/* add new Address */}
            <div className="add_new_address_container">
              <div className="add_new_address_text">
                <NavLink to="/usercontactdetail" className="nav_list">
                  <h5>Add New Address</h5>
                </NavLink>
              </div>
            </div>
            {/* end new Address */}
          </div>
          <div className="addaddress_steps">
            <Steps img1="mark.png" img2="radio.png" img3="radio.png" />
          </div>
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
        <MobileBottomtab handleMobile={() => setCartOpen(true)} />
      </div>
    </>
  );
};

export default AddNewAddress;
