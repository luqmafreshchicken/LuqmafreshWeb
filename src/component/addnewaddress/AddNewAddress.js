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
} from "../../serverRequest/Index";
import Header from "../header/Header";

const AddNewAddress = ({ id }) => {
  const [getData, setGetData] = useState([]);
  const [length, setLength] = useState("");
  const [addressid, setAddressId] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
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

  const handleEdit = async (id) => {
    console.log(id);
  };

  return (
    <>
      <div className="addaddress_mobile_header">
        <Header />
      </div>
      <div className="main_addaddress_container">
        <div className="addaddress_container">
          <div className="addaddress_content_text">
            {/* add new Address */}
            <div className="add_new_address_container">
              <div className="add_new_address_text">
                <NavLink to="/usercontactdetail" className="nav_list">
                  <h5>+Add New Address</h5>
                </NavLink>
              </div>
            </div>
            {/* end new Address */}

            {/* saved Address */}
            <div className="saved_address">
              <h5>Saved Address</h5>
              <p>{length} Saved Address</p>
            </div>
            {/* end saved Address */}

            <div className="select_saved_address_container">
              {getData.map((add) => (
                <div className="select_saved_address">
                  <div className="input_radio">
                    <input
                      type="radio"
                      onChange={() => setAddressId(add._id)}
                    />
                  </div>

                  <div className="saved_text_area">
                    <div className="local_area">
                      <h6>{add.address}</h6>
                    </div>
                    {/*  saved Area */}

                    <div className="all_detail_text">
                      <p>{add.address1}</p>
                      <p>{add.landmark}</p>
                      <p>{add.city}</p>
                      <p>Mobile Number : {add.mobile}</p>
                    </div>
                    {/* end Area */}

                    <div className="edit_delete_btn">
                      <NavLink
                        to={"/editaddress"}
                        state={{ id: add._id }}
                        className="nav_list"
                      >
                        {" "}
                        <p onClick={() => setAddressId(add._id)}>Edit</p>
                      </NavLink>
                      <p onClick={() => handleDelete(add._id)}>Delete</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* proceed btn */}
            {addressid !== "" ? (
              <NavLink
                to="/selectdeliveryslot"
                className="nav_list"
                state={{ id: addressid }}
              >
                <button className="addaddress_button">
                  Proceed to Shipment
                </button>
              </NavLink>
            ) : null}
          </div>
          <div className="addaddress_steps">
            <Steps img1="mark.png" img2="button.png" img3="button.png" />
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
      </div>
    </>
  );
};

export default AddNewAddress;