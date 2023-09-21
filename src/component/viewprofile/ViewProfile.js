import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./viewprofile.css";
import Editprofile from "../editprofile/Editprofile";
import { viewProfile, getUserID, CountryDetail, GetCountry } from "../../serverRequest/Index";

const ViewProfile = ({ profile, viewhandleClose }) => {
  const [edit, setEdit] = useState(false);
  const [viewUser, setViewUser] = useState([]);
  // const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  // const [countrytitle, setCountryTitle] = useState("");
  const [flag, setFlag] = useState("");
  
  useEffect(() => {
    // localContent();
    // window.scrollTo(0, 0);
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
                  // setCountry(res[0]?.name);
                  setCountryCode(res[0]?.callingCodes[0]);
                  // setCountryCode()
                  // setCountryCurrency(res[0]?.currencies[0]?.symbol);
                  // setCountryCurrency(res[0]?.currencies[0]?.code);
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
    // showcart();
    // arrivalProductList();
    userDetail();
  }, []);

 
  const userDetail = async () => {
    const UserId = await getUserID();
    viewProfile(UserId).then((res) => {
      if (res.status == true) {
        setViewUser(res.data);
      } else {
      }
    });
  };

  const edithandleOpen = () => setEdit(true);
  const edithandleClose = () => setEdit(false);
  return (
    <div>
      <Modal
        open={profile}
        onClose={viewhandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="viewprofile_style">
          <div className="my_profile">
            <div
              style={{
                width: "87%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: "3%",
                paddingTop: "22px",
                cursor: "pointer",
              }}
            >
              <h5>My Profile</h5>
              <span onClick={edithandleOpen}>Edit</span>
            </div>
          </div>
          {/* information_section */}
          <div className="information_container">
            <div className="profile_picture">
              <div className="profile_picture_name">
                <p>{viewUser?.name?.slice(0, 1)}</p>
              </div>
            </div>
            <div className="basic_information">
              <p>Basic Information</p>
            </div>
            {/* first_name */}
            <div className="first_name">
              <span>
                Name <br />
                <p>{viewUser?.name}</p>
              </span>
            </div>
            {/* mobile_no */}

            <div className="first_name">
              <span>
                Mobile No <br />
                <p> <img src={flag}/> +{countryCode} {viewUser?.mobile?.number}</p>
              </span>
            </div>
            {/* email_id */}

            <div className="first_name">
              <span>
                Email ID <br />
                <p>{viewUser?.email}</p>
              </span>
            </div>
            {/* gender */}

            <div className="first_name">
              <span>
                Gender <br />
                <p>{viewUser.gender}</p>
              </span>
            </div>
          </div>
        </Box>
      </Modal>
      <Editprofile edit={edit} edithandleClose={edithandleClose} />
    </div>
  );
};

export default ViewProfile;
