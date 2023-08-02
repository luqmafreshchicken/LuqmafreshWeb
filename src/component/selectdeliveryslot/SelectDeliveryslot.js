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
import { borderBottom } from "@mui/system";
const user = [
  {
    name: "Gaurav",
    email: "gauravjoshi@gmail.com",
    mob: "9181146725",
    dob: "13/03/2023",
    loc: "Luckow",
  },
  {
    name: "Gaurav",
    email: "gauravjoshi@gmail.com",
    mob: "9181146725",
    dob: "13/03/2023",
    loc: "Luckow",
  },
];

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

  useEffect(() => {
    setLoad(true);
    async function timeSlot() {
      const newData = await getTimeslot();
      setTime(newData.data);
      setLoad(false);

      const myDate = new Date(
        moment(newData.data[0].date).format("DD/MM/YYYY")
      );
      const month = myDate.toLocaleString("default", { month: "long" });
      const day = myDate.getDate();
      setDaySlot(` ${day} ${month}`);
    }
    timeSlot();
    showcart();
  }, []);

  // const showcart = async () => {
  //   setLoad(true);

  //   const userId = await getUserID();
  //   const data = {
  //     userId: userId,
  //   };
  //   const res = await Show_Cart(data);
  //   if (res.status == true) {
  //     setCartProduct(res.data.cart);
  //     setLoad(false);
  //   } else {
  //   }
  // };
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
    setLoad(true)
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
        setLoad(false)

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
                      <th scope="col">Quantity</th>
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
                              </div>
                            </div>
                          </td>
                          <td>
                            {countrycurrency} {item?.productId?.price}
                          </td>
                          <td>
                            {" "}
                            {item?.productId?.quantity +
                              " " +
                              item?.productId?.unit}
                          </td>
                          <td>
                            {countrycurrency}{" "}
                            {item?.productId?.quantity * item?.productId?.price}
                          </td>
                        </tr>
                      </MDBTableBody>
                    );
                  })}
                </MDBTable>
                <div className="stot_content_total">
                  <p>
                    {" "}
                    Total : {countrycurrency} {cartPrice}
                  </p>
                </div>
              </Card>
            </div>
            
            <div className="select_delivery_time" onClick={handleOpen1}>
              <p>
                {slotId != ""
                  ? select
                  : "Select Delivery time Slot"}
              </p>
            </div>
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
            <div className="select_slot_shipment">
              <h5>Select slot for Shipment 1 of 1</h5>
            </div>
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
                  style={{
                    borderColor: slotId != "" ? "#ff0040" : "lightgray",
                  }}
                >
                  <p style={{ color: slotId != "" ? "#ff0040" : "black" }}>
                    {slots.time1}AM
                  </p>
                  <p style={{ color: slotId != "" ? "#ff0040" : "black" }}>-</p>
                  <p style={{ color: slotId != "" ? "#ff0040" : "black" }}>
                    {slots.time2}PM
                  </p>
                </div>
              ))}
            </div>
            <div className="select_proceed">
              <div className="selectdeliveryslot_btn1" onClick={handleClose1}>
                <p>Select & Proceed</p>
              </div>
            </div>
          </Box>
        </Modal>
        <Loader loading={load} />
      </div>
    </>
  );
};

export default SelectDeliveryslot;
