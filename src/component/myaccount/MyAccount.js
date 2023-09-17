import React from "react";
import "./myaccount.css";
import { useEffect, useState } from "react";
import {
  CountryDetail,
  GetCountry,
  currentLocation,
  getUserID,
  viewProfile,
} from "../../serverRequest/Index";
import Loader from "../loder/Loader";
const MyAccount = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState("");
  const [viewUser, setViewUser] = useState([]);
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countrycurrency, setCountryCurrency] = useState("");
  const [countrytitle, setCountryTitle] = useState("");
  const [flag, setFlag] = useState("");
  const [load, setLoad] = useState("");

  useEffect(() => {
    // localContent();
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
                  // setCountryCode(res[0]?.countryCode[0].code)
                  setCountryCurrency(res[0]?.currencies[0]?.symbol);
                  setCountryTitle(res[0]?.currencies[0]?.code);
                  setFlag(res[0]?.flags?.png);
                  setCountryCode(res[0]?.callingCodes[0])
                  setLoad(false);
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
    // showcart();
    // arrivalProductList();
  }, []);

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
    userDetail();
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
        <p>
         
          <img src={flag} /> +{countryCode} {viewUser?.mobile?.number}
        </p>
      </div>
      <div className="myaccount_username_container">
        <p>Address :</p>
        <p>{city}</p>
      </div>
      <Loader loading={load} />
    </>
  );
};

export default MyAccount;
