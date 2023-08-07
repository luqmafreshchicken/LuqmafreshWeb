import React from "react";
import "./myaccount.css";
import { useEffect, useState } from "react";
import { currentLocation, getUserID, viewProfile } from "../../serverRequest/Index";
const MyAccount = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState("");
  const [viewUser, setViewUser] = useState([]);


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
            // setAddress(loc.results[0]?.address_components?.[3]?.long_name);
            // setAddress1(loc.results[0]?.address_components?.[5]?.long_name);
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
    userDetail()
  });

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

  return (
    <>
      <div className="order_historylist_container">
        <h5>My Account</h5>
      </div>
      <div className="myaccount_username_container">
        <p>Name :</p>
        <p>{viewUser?.name}</p>
      </div>

      <div className="myaccount_username_container">
        <p>Email :</p>
        <p>{viewUser?.email}</p>
      </div>

      <div className="myaccount_username_container">
        <p>Mobile :</p>
        <p>+91 {viewUser?.mobile?.number}</p>
      </div>
      <div className="myaccount_username_container">
        <p>Address :</p>
        <p>{city}</p>
      </div>
    </>
  );
};

export default MyAccount;
