import React, { useEffect, useState } from "react";
import "./selectdeliveryslot.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Show_Cart,
  getTimeslot,
  getUserID,
  CountryDetail,
  GetCountry,
  removeFromCart,
  increaseQuantity,
} from "../../serverRequest/Index";
import * as moment from "moment";
import Header from "../header/Header";
import Steps from "../../customcomponent/steps/Steps";
import { NavLink, useLocation } from "react-router-dom";
import Loader from "../loder/Loader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { FaEdit } from "react-icons/fa";
import TopHeader from "../topheader/TopHeader";

const SelectDeliveryslot = () => {
  let navigate = useNavigate();

  const location = useLocation();
  const id = location?.state?.id;
  console.log(id);

  const [time, setTime] = useState([]);
  const [daySlot, setDaySlot] = useState("");
  // const [open, setOpen] = useState(false);
  // const [cartProduct, setCartProduct] = useState([]);
  const [select, setSelect] = useState("");
  const [slotId, setSlotId] = useState("");
  const [load, setLoad] = useState(false);
  const [country, setCountry] = useState("");
  const [countrycurrency, setCountryCurrency] = useState("");
  const [countrytitle, setCountryTitle] = useState("");
  const [flag, setFlag] = useState("");
  const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [btn, setBtn] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [incre, setIncre] = useState(1);

  useEffect(() => {
    setLoad(true);
    async function timeSlot() {
      const newData = await getTimeslot();
      setTime(newData.data);
      setLoad(false);

   const formattedDate = moment().format('D MMM YYYY');
    setDaySlot(formattedDate);
    timeSlot();
    showcart();
  }, []);

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
    console.log(userId, "gaurav user Id");
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

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleclear = async (index) => {
    if (index == 4) {
      await localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  };

  // remove cart
  const removeCartProduct = async (id) => {
    setLoad(true);
    const userId = await getUserID();
    const data = {
      userId: userId,
      productId: id,
    };
    removeFromCart(data).then((res) => {
      if (res.status == true) {
        toast.success(res.message, {
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
      }
    });
  };
  // end remove cart
  const handleIncre = async (id, quantity) => {
    setLoad(true);
    let qty = quantity + 1;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      cartProductId: id,
      quantity: qty,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://luqmafresh-beckend.onrender.com/product/UpdateCartQuantity",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.status == true) {
          toast.success(res.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // setIncre()
          showcart();
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
      })
      .catch((error) => console.log("error", error));
  };
  // end remove cart

  // const handleIncre = () => {
  //   setIncre(incre + 1);
  // };
  const handleDecre = (id, quantity) => {
    if (quantity > 1) {
      setLoad(true);
      let qty = quantity - 1;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        cartProductId: id,
        quantity: qty,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://luqmafresh-beckend.onrender.com/product/UpdateCartQuantity",
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.status == true) {
            toast.success(res.message, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // setIncre()
            showcart();
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
        })
        .catch((error) => console.log("error", error));
      setIncre(quantity - 1);
    } else {
      setIncre(1);
    }
  };
  const handleSelTImeslot = () => {
    toast.error("Please select time slot", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

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

      <div className="mobile_selectdeliveryslot_container">
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
          // handleOpen={() => setOpen(true)}
          // handleClose={() => setOpen(false)}
          // open={open}
          showbtn={btn}
          totalAmount={cartPrice}
          modalcurrency={countrycurrency}
          handleclear={(index) => handleclear(index)}
          removeProduct={(id) => removeCartProduct(id)}
        />
      </div>
      <div className="selectdeliveryslot_container">
        <div className="selectdeliveryslot_content">
          {/* /************************************** */}
          <div className="selectime_container">
            <div className="select_text_container">
              <h5>Your Order List</h5>
              <p>
                Kindly review the list of orders and choose your preferred time
                slot for completing the payment.
              </p>
              <h6>{cartProduct?.length} Items order</h6>
            </div>

            <div>
              <Card style={{ boxShadow: "none", border: "none" }}>
                <MDBTable align="middle" className="bor_bottom">
                  <MDBTableHead className="slots_heading">
                    <tr>
                      <th scope="col" style={{ textAlign: "left" }}>
                        Delete
                      </th>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Items</th>
                      <th scope="col">Add to Cart</th>
                      <th scope="col" style={{ textAlign: "right" }}>
                        SubTotal
                      </th>
                    </tr>
                  </MDBTableHead>

                  {cartProduct.map((item) => {
                    return (
                      <MDBTableBody key={item} className="stot_content">
                        <tr>
                          <td>
                            <img
                              src="cross.png"
                              onClick={() => removeCartProduct(item?._id)}
                            />
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img src={item?.productId?.image} />
                              <div className="ms-3">
                                <p className="fw-bold mb-1">
                                  {item?.productId?.name}
                                </p>
                                <p>
                                  {item?.productId?.quantity}{" "}
                                  {item?.productId?.unit}{" "}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            {countrycurrency} {item?.productId?.price}
                          </td>
                          <td> {item?.quantity}</td>
                          <td>
                            <div className="table_addtocart">
                              <div
                                className="table_dre"
                                onClick={() =>
                                  handleDecre(item?._id, item?.quantity)
                                }
                              >
                                -
                              </div>
                              <div className="table_count">
                                {item?.quantity}
                              </div>
                              <div
                                className="table_incre"
                                onClick={() =>
                                  handleIncre(item?._id, item.quantity)
                                }
                              >
                                +
                              </div>
                            </div>
                          </td>
                          <td>
                            {countrycurrency}{" "}
                            {item?.quantity * item?.productId?.price}
                          </td>
                        </tr>
                      </MDBTableBody>
                    );
                  })}
                </MDBTable>
                <div className="stot_content_total">
                  <p>
                    {" "}
                    <span>Total :</span> {countrycurrency} {cartPrice}
                  </p>
                </div>
              </Card>
            </div>

            {slotId == false ? (
              <div className="select_delivery_time" onClick={handleOpen1}>
                Select Delivery time Slot
              </div>
            ) : (
              <div className="primary_select_slots">
                <div className="selectslots_delivery_time">
                  <p>{select}</p>
                </div>
                <div className="select_slots_edit_para">
                  <FaEdit className="slots_edit_icon" onClick={handleOpen1} />
                </div>
              </div>
            )}

            {slotId === "" ? (
              // <NavLink
              //   to="/payment"
              //   className="nav_list"
              //   state={{ addressId: id, slotId: slotId }}
              // >
              <div
                onClick={() => handleSelTImeslot()}
                className="selectdeliveryslot_btn"
              >
                <div className="selectdeliveryslot_btn_proceed">
                  Proceed to Payment
                </div>
              </div>
            ) : (
              // </NavLink>
              <>
                {cartProduct.length >= 1 ? (
                  <NavLink
                    to="/payment"
                    className="nav_list"
                    state={{ addressId: id, slotId: slotId }}
                  >
                    <div className="selectdeliveryslot_btn">
                      <div className="selectdeliveryslot_btn_proceed">
                        Proceed to Payment
                      </div>
                    </div>
                  </NavLink>
                ) : (
                  // <NavLink
                  //   to="/payment"
                  //   className="nav_list"
                  //   state={{ addressId: id, slotId: slotId }}
                  // >
                  <div
                    className="selectdeliveryslot_btn"
                    onClick={() => handleCartEmpty()}
                  >
                    <div className="selectdeliveryslot_btn_proceed">
                      Proceed to Payment
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {/***************************end******************************* */}
          <div className="selectime_steps">
            <Steps img1="mark.png" img2="mark.png" img3="radio.png" />
          </div>
        </div>

        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="selectdeliveryslot_modal">
            <img src="cross.png" onClick={handleClose1} />
            {slotId == false ? (
              <div className="select_slot_shipment">
                <h5>Select slot for Shipment 1 of 1</h5>
              </div>
            ) : (
              <div className="select_slot_shipment">
                <h5>Edit Your Time Slot</h5>
              </div>
            )}

            <div className="selectdeliveryslot_day">
              <p>Today {daySlot}</p>
            </div>

            <div className="selectdeliveryslot_timer">
              {time.map((slots) => (
                <div
                  className="selectdeliveryslot_time_slot"
                  onClick={() => {
                    setSlotId(slots._id);
                    setSelect(slots.time1 + " - " + slots.time2);
                    setOpen1(false);
                  }}
                >
                  {slots.time1} AM - {slots.time2} PM
                </div>
              ))}
            </div>
            {/* <div className="select_proceed">
              <div className="selectdeliveryslot_btn1" onClick={handleClose1}>
                <p>Select & Proceed</p>
              </div>
                </div>*/}
          </Box>
        </Modal>
        <Loader loading={load} />
      </div>
    </>
  );
};

export default SelectDeliveryslot;
